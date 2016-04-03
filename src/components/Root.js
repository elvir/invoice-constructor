import React from 'react'
import update from 'react/lib/update'
import Content from 'components/Content'
import ExampleInvoiceState from 'constants/ExampleInvoiceState'
import Gadgets from 'constants/Gadgets'
import Calculator from 'services/Calculator'

export default class Root extends React.Component {

  constructor (props) {
    super(props)
    let lines = ExampleInvoiceState.invoiceLines
    const total = Calculator.fillSubtotalsAndGetTotal(lines)
    this.state = {
      invoiceLines: lines.sort((a,b) => a.position - b.position),
      total: total
    }
    this.saveInvoice = this.saveInvoice.bind(this)
    this.moveLine = this.moveLine.bind(this)
    this.addInvoiceLine = this.addInvoiceLine.bind(this)
    this.updateInvoiceLine = this.updateInvoiceLine.bind(this)
    this.deleteInvoiceLine = this.deleteInvoiceLine.bind(this)
  }

  calculateTotalAndSetState (lines) {
    const total = Calculator.fillSubtotalsAndGetTotal(lines)
    this.setState({
      invoiceLines: lines.sort((a,b) => a.position - b.position),
      total: total
    })
  }

  saveInvoice () {
    const data = {
      total: this.state.total,
      invoice_lines: this.state.invoiceLines.map(
        function(line) {
          return {
            kind: line.kind,
            value: line.value,
            count: line.count,
            gadget_id: line.gadget_id,
            title: line.title
          }
        }
      )
    }
    console.log('SENDING INVOICE TO SERVER', data)
    window.alert(`Request payload: \n\n ${JSON.stringify(data)}`)
  }


  assignGadget (line) {
    let gadget = Gadgets.find((g) => g.id === line.gadget_id)
    line.good = { name: gadget.name }
    line.value = gadget.price
  }

  addInvoiceLine (payload) {
    const index = this.state.invoiceLines.length
    let line = Object.assign({}, payload)
    line.position = index
    line.id = new Date().getTime()
    delete(line.index)
    if (line.kind === 'GOODS') {
      this.assignGadget(line)
    }
    let lines = update(this.state, {
      invoiceLines: {
        $push: [line]
      }
    }).invoiceLines
    this.calculateTotalAndSetState(lines)
  }

  updateInvoiceLine (payload) {
    const { index } = payload
    const { invoiceLines } = this.state
    let line = invoiceLines[index]
    line = Object.assign(line, payload)
    delete(line.index)
    if (line.kind === 'GOODS') {
      this.assignGadget(line)
    }
    let lines = update(this.state, {
      invoiceLines: {
        $splice: [
          [index, 1],
          [index, 0, line]
        ]
      }
    }).invoiceLines
    this.calculateTotalAndSetState(lines)
  }

  moveLine(dragPosition, hoverPosition) {
    const { invoiceLines } = this.state
    let dragLine = Object.assign(invoiceLines[dragPosition], { position: hoverPosition })
    let hoverLine = Object.assign(invoiceLines[hoverPosition], { position: dragPosition })
    let lines = update(this.state, {
      invoiceLines: {
        $splice: [
          [dragPosition, 1],
          [hoverPosition, 0, dragLine]
        ]
      }
    }).invoiceLines
    this.calculateTotalAndSetState(lines)
  }

  deleteInvoiceLine (payload) {
    const { id, index } = payload

    let lines = update(this.state, {
      invoiceLines: {
        $splice: [[index, 1]]
      }
    }).invoiceLines.sort((a,b) => a.position - b.position).map(
      (l,i) => Object.assign({ position: i},l)
    )
    this.calculateTotalAndSetState(lines)
  }

  render () {
    const contentProps = {
      saveInvoice: this.saveInvoice,
      updateInvoiceLine: this.updateInvoiceLine,
      addInvoiceLine: this.addInvoiceLine,
      deleteInvoiceLine: this.deleteInvoiceLine,
      moveLine: this.moveLine,
      invoiceLines: this.state.invoiceLines,
      total: this.state.total
    }

    return (
      <Content {...contentProps}/>
    )
  }
}
