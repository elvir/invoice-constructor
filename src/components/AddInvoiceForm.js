import React from 'react'
import Select from 'react-select'
import InvoiceLineTypes from 'constants/InvoiceLineTypes'
import LineForm from 'components/LineForm'

export default class AddInvoiceForm extends React.Component {

  constructor (props) {
    super(props)
    this.state = {lineKind: null}
    this.onSelectChange = this.onSelectChange.bind(this)
    this.addInvoiceLine = this.addInvoiceLine.bind(this)
  }

  static selectOptions () {
    return (
      Object.keys(InvoiceLineTypes).map(
        function(type) { return { value: type, label: InvoiceLineTypes[type] } }
      )
    )
  }

  onSelectChange (value) {
    this.setState({lineKind: value})
  }

  addInvoiceLine (payload) {
   this.props.addInvoiceLine(payload)
   this.setState({lineKind: null})
  }

  _formHtml () {
    if(this.state.lineKind){
      return (
        <LineForm kind={this.state.lineKind} saveInvoiceLine={this.addInvoiceLine} mode='creation'/>
      )
    }
    else {
      return(null)
    }
  }

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'><h5>New invoice line</h5></div>
        <div className='panel-body'>
          <div className='form-group'>
            <Select
              onChange={this.onSelectChange}
              name='kind'
              value={this.state.lineKind}
              options={AddInvoiceForm.selectOptions()}
              placeholder='Select type...'
            />
          </div>
          {this._formHtml()}
        </div>
      </div>
    )
  }
}
