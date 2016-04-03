const lineSubtotal = (line) => {
  let subtotal = 0
  switch (line.kind) {
    case 'GOODS':
      subtotal = line.count * line.value
      break
    case 'PRICE_MARKUP':
      subtotal = line.value
      break
    case 'FIXED_DISCOUNT':
      subtotal = -(line.value)
      break
    case 'PERCENT_DISCOUNT':
      subtotal = 0
      break
  }

  return subtotal
}

export default class Calculator {

  static fillSubtotalsAndGetTotal (invoiceLines) {
    let currentDiscount = null
    let total = 0
    // console.log(invoiceLines)
    invoiceLines.sort((a,b) => b.position - a.position).forEach( (line) =>
      {
        const subtotal = lineSubtotal(line)
        line.subtotal = { value: subtotal, withDiscount: subtotal }
        if (line.kind === 'PERCENT_DISCOUNT' && !currentDiscount) {
          currentDiscount = line
          currentDiscount.subtotal.discountAmount = 0
        }
        else if (currentDiscount) {
          if (line.kind ===  'FIXED_DISCOUNT' || line.kind === 'PERCENT_DISCOUNT') {
            currentDiscount = null
          }
          else {
            line.subtotal.discountPercent = currentDiscount.value
            const discount = line.subtotal.value * (currentDiscount.value/100)
            line.subtotal.withDiscount = line.subtotal.value - discount

            currentDiscount.subtotal.discountAmount += discount
          }
        }
        total += line.subtotal.withDiscount
      }
    )

    return total
  }
}
