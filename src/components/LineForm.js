import React, { Component, PropTypes } from 'react'
import Goods from 'components/forms/Goods'
import PriceMarkup from 'components/forms/PriceMarkup'
import FixedDiscount from 'components/forms/FixedDiscount'
import PercentDiscount from 'components/forms/PercentDiscount'
import Select from 'react-select'

export default class LineForm extends Component {
  static propTypes = {
    kind: PropTypes.string.isRequired,
    saveInvoiceLine: PropTypes.func.isRequired
  }

  _inputsByTypeHtml () {
    let component = null

    const inputProps = {

    }

    switch (this.props.kind) {
      case 'GOODS':
        component = <Goods {...this.props}/>
        break
      case 'PRICE_MARKUP':
        component = <PriceMarkup {...this.props}/>
        break
      case 'FIXED_DISCOUNT':
        component = <FixedDiscount {...this.props}/>
        break
      case 'PERCENT_DISCOUNT':
        component = <PercentDiscount {...this.props}/>
        break
    }

    return component
  }

  render () {
    return (
      <div>{this._inputsByTypeHtml()}</div>
    )
  }
}
