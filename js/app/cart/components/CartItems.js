import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import CartItem from './CartItem'

class CartItems extends React.Component {

  render() {

    if (this.props.items.length === 0) {
      return (
        <div className="alert alert-warning">{ this.props.t("CART_EMPTY") }</div>
      )
    }

    return (
      <div className="cart__items">
        { this.props.items.map((item, key) => (
          <CartItem
            key={ key }
            id={ item.id }
            name={ item.name }
            total={ item.total }
            quantity={ item.quantity }
            adjustments={ item.adjustments }
            onClickRemove={ () => console.log('REMOVE') } />
        )) }
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    items: state.items,
  }
}

export default connect(mapStateToProps)(translate()(CartItems))
