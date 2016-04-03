import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import InvoiceLine from 'components/InvoiceLine'

class InvoiceLines extends Component {

  propsForLines () {
    return this.props.invoiceLines.map(item => this.reducedProps(item))
  }

  discountedSubtotalStr (item) {
    const { subtotal } = item
    if (subtotal.value != subtotal.withDiscount) {
      return `= <strike>$${subtotal.value}</strike> (-${subtotal.discountPercent}% = $${subtotal.withDiscount})`
    }
    else {
      return `= $${subtotal.value}`
    }

  }

  reducedProps (item) {
    let newProps = Object.assign({}, item)

    switch (item.kind) {
      case 'GOODS':
        newProps.displayTitle = `${item.count} x ${item.good.name} (${item.value}$ each)`
        newProps.gadget_id = item.gadget_id
        newProps.displaySubtotal = this.discountedSubtotalStr(item)
        break
      case 'PRICE_MARKUP':
        newProps.displaySubtotal = this.discountedSubtotalStr(item)
        newProps.displayTitle = `${item.title} ($${item.value})`
        break
      case 'FIXED_DISCOUNT':
        newProps.displaySubtotal = `= -$${item.value}`
        newProps.displayTitle = `${item.title} ($${item.value})`
        break
      case 'PERCENT_DISCOUNT':
        newProps.displaySubtotal = `= (Total discount: -$${item.subtotal.discountAmount})`
        newProps.displayTitle = `${item.title} (${item.value}%)`
        break
    }
    return newProps
  }

  render () {
    return (
      <ul className='list-group'>
        {this.propsForLines().map((item, i) =>
        <InvoiceLine
          index={i}
          key={item.id}
          moveLine={this.props.moveLine}
          deleteInvoiceLine={this.props.deleteInvoiceLine}
          updateInvoiceLine={this.props.updateInvoiceLine}
          {...item}
        />
       )}
      </ul>
    )
  }
}

export default DragDropContext(HTML5Backend)(InvoiceLines)
