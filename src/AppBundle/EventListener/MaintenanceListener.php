<?php

namespace AppBundle\EventListener;

use Jaybizzle\CrawlerDetect\CrawlerDetect;
use Predis\Client as Redis;
use Symfony\Bridge\Twig\TwigEngine;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class MaintenanceListener
{
    private $authorizationChecker;
    private $tokenStorage;
    private $crawlerDetect;
    private $redis;
    private $templating;
    private $patterns = [
        '#^/login#',
    ];

    public function __construct(
        AuthorizationCheckerInterface $authorizationChecker,
        TokenStorageInterface $tokenStorage,
        CrawlerDetect $crawlerDetect,
        Redis $redis,
        TwigEngine $templating)
    {
        $this->authorizationChecker = $authorizationChecker;
        $this->tokenStorage = $tokenStorage;
        $this->crawlerDetect = $crawlerDetect;
        $this->redis = $redis;
        $this->templating = $templating;
    }

    public function onKernelRequest(GetResponseEvent $event)
    {
        if (!$event->isMasterRequest()) {
            return;
        }

        $request = $event->getRequest();

        if (null === $token = $this->tokenStorage->getToken()) {
            return;
        }

        // Let crawlers browse the website
        if ($this->crawlerDetect->isCrawler($request->headers->get('User-Agent'))) {
            return;
        }

        $maintenance = $this->redis->get('maintenance');
        $maintenanceMessage = $this->redis->get('maintenance_message');

        if ($maintenance && !$this->authorizationChecker->isGranted('ROLE_ADMIN')) {

            foreach ($this->patterns as $pattern) {
                if (preg_match($pattern, rawurldecode($request->getPathInfo()))) {
                    return;
                }
            }

            $content = $this->templating->render('@App/maintenance.html.twig', [
                'message' => $maintenanceMessage,
            ]);
            $event->setResponse(new Response($content, 503));
            $event->stopPropagation();
        }
    }
}
