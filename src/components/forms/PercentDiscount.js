import React, { Component, PropTypes } from 'react'

export default class PercentDiscount extends Component {
  static propTypes = {
    saveInvoiceLine: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.state = {
      title: this.props.title,
      value: this.props.value
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.saveInvoiceLine({
      id: this.props.id,
      kind: 'PERCENT_DISCOUNT',
      index: this.props.index,
      value: this.state.value,
      title: this.state.title
    })
  }

  onInputChange (name, event) {
    let newState = Object.assign({}, this.state)
    const value = name === 'value' ? parseInt(event.target.value) : event.target.value
    newState[name] = value
    this.setState(newState)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Discount title:</label>
          <input required={true} value={this.state.title}
            onChange={this.onInputChange.bind(this, 'title')}
            name='count' className='form-control'
          />
        </div>
        <div className='form-group'>
          <label>Discount percents, %:</label>
          <input type='number' required={true} min={'1'} max={'100'}
            value={this.state.value}
            onChange={this.onInputChange.bind(this, 'value')} n
            ame='count' className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
    )
  }
}
