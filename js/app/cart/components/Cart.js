import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import Sticky from 'react-stickynode'

import AddressPicker from '../../components/AddressPicker'
import CartItems from './CartItems'
import CartHeading from './CartHeading'
import CartTotal from './CartTotal'

class Cart extends Component {

  render() {

    // const { isMobileCart } = this.props

    // let {
    //   availabilities,
    //   items,
    //   toggled,
    //   errors,
    //   date,
    //   geohash,
    //   address,
    //   loading,
    //   addressModalIsOpen,
    //   modalHeadingText,
    //   restaurantModalIsOpen,
    // } = this.state

    // let cartContent
    // if (items.length > 0) {
    //   let cartItemComponents = items.map((item, key) => {
    //     return (
    //       <CartItem
    //         id={item.id}
    //         key={key}
    //         name={item.name}
    //         total={item.total}
    //         quantity={item.quantity}
    //         adjustments={item.adjustments}
    //         onClickRemove={ () => this.props.onRemoveItem(item) } />
    //     )
    //   })

    //   cartContent = (
    //     <div className="cart__items">{cartItemComponents}</div>
    //   )
    // } else {
    //   cartContent = (
    //     <div className="alert alert-warning">{i18n.t("CART_EMPTY")}</div>
    //   )
    // }

    // const warningAlerts = []
    // const dangerAlerts = []

    // if (errors) {
    //   // We don't display the error when restaurant has changed
    //   errors = _.pickBy(errors, (value, key) => key !== 'restaurant')

    //   _.forEach(errors, (messages, key) => {
    //     if (key === 'shippingAddress') {
    //       messages.forEach((message, key) => dangerAlerts.push(message))
    //     } else {
    //       messages.forEach((message, key) => warningAlerts.push(message))
    //     }
    //   })
    // }

    // var btnClasses = ['btn', 'btn-block', 'btn-primary'];

    // if (items.length === 0 || !address || _.size(errors) > 0 || loading) {
    //   btnClasses.push('disabled')
    // }

    const panelClasses = ['panel', 'panel-default']
    const btnClasses = ['btn', 'btn-block', 'btn-primary']

    return (
      <Sticky top={ 30 }>
        <div className={ panelClasses.join(' ') }>
          <CartHeading />
          <div className="panel-body">
            <div className="cart">
              <AddressPicker
                address={ '' }
                geohash={ '' }
                onPlaceChange={ () => console.log('onPlaceChange') } />
              <hr />
              <CartItems />
              <hr />
              <CartTotal />
              <hr />
              <button type="submit" className={ btnClasses.join(' ') }>
                <span>{ this.props.loading && <i className="fa fa-spinner fa-spin"></i> }</span>  <span>{ this.props.t('CART_WIDGET_BUTTON') }</span>
              </button>
            </div>
          </div>
        </div>
      </Sticky>
    );
  }
}

function mapStateToProps (state) {
  return {
    items: state.items,
    loading: state.isFetching
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     toggleFinishedTasks: () => { dispatch(toggleShowFinishedTasks()) },
//     toggleCancelledTasks: () => { dispatch(toggleShowCancelledTasks()) },
//     setSelectedTagList: (tagName) => {  dispatch(setSelectedTagList(tagName)) },
//     toggleShowUntaggedTasks: () => { dispatch(toggleShowUntaggedTasks())}
//   }
// }

export default connect(mapStateToProps)(translate()(Cart))
