import React from 'react'
import InvoiceLines from 'components/InvoiceLines'

export default class Invoice extends React.Component {

  _saveBtnHtml () {
    if(this.props.invoiceLines.length > 0) {
      return (
        <div className='row'>
          <div className='col-xs-6'>
            <strong className='pull-right'>
             Total:
            </strong>
          </div>
          <div className='col-xs-4'>
            <strong className='pull-left'>
              { `=  $${this.props.total}` }
            </strong>
          </div>
          <div className='col-xs-2'>
            <button className='btn btn-success pull-right' type='submit' onClick={this.props.saveInvoice}>
              Save Invoice
            </button>
          </div>
        </div>
      )
    }
    else {
      return(null)
    }
  }

  render () {
    return (
      <div className='form-group'>
        <InvoiceLines {...this.props}/>
        { this._saveBtnHtml() }
      </div>
    )
  }
}
