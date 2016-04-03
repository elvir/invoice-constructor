import React from 'react'
import Header from 'components/Header'
import Invoice from 'components/Invoice'
import AddInvoiceForm from 'components/AddInvoiceForm'

export default class Content extends React.Component {

  render () {
    return (
      <div>
        <Header/>
        <div className=''>
          <Invoice {...this.props}/>
          <AddInvoiceForm {...this.props}/>
        </div>
      </div>
    )
  }
}
