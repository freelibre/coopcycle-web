<?php

namespace AppBundle\Sylius\Order;

use Sylius\Bundle\OrderBundle\NumberGenerator\OrderNumberGeneratorInterface;

class ShortOrderNumberGenerator implements OrderNumberGeneratorInterface
{
    public function generate(OrderInterface $order): string
    {
        // Convert from base 10 to base 36
        return base_convert($order->getId(), 10, 36));
    }
}
