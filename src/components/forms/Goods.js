import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import update from 'react/lib/update'
import Gadgets from 'constants/Gadgets'

export default class Goods extends Component {
  static propTypes = {
    saveInvoiceLine: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onGadgetChange = this.onGadgetChange.bind(this)
    this.onCountChange = this.onCountChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      gadget_id: this.props.gadget_id,
      value: this.props.value,
      count: this.props.count
    }

  }

  static gadgetOptions () {
    return (
      Gadgets.map(
        function(gadget) {
          return {
            value: gadget.id,
            label: `${gadget.name} ($${gadget.price})`,
            price: gadget.price
          }
        }
      )
    )
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.saveInvoiceLine({
      id: this.props.id,
      kind: 'GOODS',
      index: this.props.index,
      gadget_id: this.state.gadget_id,
      value: this.state.value,
      count: this.state.count
    })
  }

  onCountChange (event) {
    let value = parseInt(event.target.value)
    if (isNaN(value)) { value = 0 }
    let newState = Object.assign({}, this.state)
    newState.count = value
    this.setState(newState)
  }

  onGadgetChange (value) {
    let newState = Object.assign({}, this.state)
    newState.gadget_id = value
    newState.value = Gadgets.find((g) => g.id === value).price
    this.setState(newState)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Gadget:</label>
          <Select
            onChange={this.onGadgetChange}
            name='gadget_id'
            required={true}
            value={this.state.gadget_id}
            options={Goods.gadgetOptions()}
            placeholder='Select type...'
          />
        </div>
        <div className='form-group'>
          <label>Count:</label>
          <input required={true} type={'number'} value={this.state.count}
            onChange={this.onCountChange} name='count'
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
    )
  }
}
