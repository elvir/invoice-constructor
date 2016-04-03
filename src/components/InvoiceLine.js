import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import ItemTypes from 'constants/ItemTypes'
import { DragSource, DropTarget } from 'react-dnd'
import LineForm from 'components/LineForm'

const lineSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      mode: props.mode
    }
  }
}

const lineTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveLine(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

export default class InvoiceLine extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    displayTitle: PropTypes.string.isRequired,
    displaySubtotal: PropTypes.string.isRequired,
    moveLine: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { mode: 'view' }
    this.deleteInvoiceLine = this.deleteInvoiceLine.bind(this)
    this.updateInvoiceLine = this.updateInvoiceLine.bind(this)
    this.editInvoiceLine = this.editInvoiceLine.bind(this)
  }

  deleteInvoiceLine () {
    if (window.confirm(`Delete invoice line ${this.props.displayTitle}?`)) {
      this.props.deleteInvoiceLine({
        id: this.props.id,
        index: this.props.index
      })
    }
  }

  updateInvoiceLine (payload) {
    this.props.updateInvoiceLine(payload)
    this.setState({mode: 'view'})
  }

  editInvoiceLine () {
    this.setState({mode: 'edit'})
  }


  render() {
    const { displayTitle, isDragging, connectDragSource, connectDropTarget } = this.props
    const { displaySubtotal } = this.props
    const opacity = isDragging ? 0 : 1
    const { mode } = this.state

    const itemStyle = mode === 'edit' ? {display: 'none'} : {display: 'block'}
    const formStyle = mode === 'view' ? {display: 'none'} : {display: 'block'}
    return connectDragSource(connectDropTarget(
      <li className='list-group-item invoice-line' style={{opacity}}>
        <div className='row' style={itemStyle}>
          <div className='col-xs-6'>
            {displayTitle}
          </div>
          <div className='col-xs-4' dangerouslySetInnerHTML={{__html: displaySubtotal}}>
          </div>
          <div className='col-xs-2'>
            <button onClick={this.editInvoiceLine}  type='button' className='btn btn-default' aria-label="Edit">
              <span className='glyphicon glyphicon-edit' aria-hidden='true'></span>
            </button>&nbsp;
            <button onClick={this.deleteInvoiceLine} type='button' className='btn btn-default' aria-label="Delete">
              <span className='glyphicon glyphicon-trash' aria-hidden='true'></span>
            </button>
          </div>
        </div>
        <div style={formStyle}>
          <LineForm {...this.props} saveInvoiceLine={this.updateInvoiceLine} mode='edit'/>
        </div>
      </li>
    ))
  }
}

export default DropTarget(ItemTypes.LINE, lineTarget, collectTarget)(
  DragSource(ItemTypes.LINE, lineSource, collect)(InvoiceLine)
)
