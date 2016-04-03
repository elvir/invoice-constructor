export default {
  invoiceLines: [
    {
      id: 1,
      position: 0,
      kind: 'GOODS',
      count: 2,
      gadget_id: 1,
      value: 100,
      good: {
        name: 'Gadget 1',
        price: 100,
        id: 2
      }
    },
    {
      id: 2,
      position: 1,
      kind: 'FIXED_DISCOUNT',
      value: 20,
      title: 'Old Client Discount'
    },
    {
      id: 3,
      position: 2,
      kind: 'GOODS',
      count: 3,
      gadget_id: 3,
      value: 50,
      good: {
        name: 'Gadget 3',
        price: 50,
        id: 3
      }
    },
    {
      id: 4,
      position: 3,
      kind: 'PRICE_MARKUP',
      value: 50,
      title: 'Air shipping fee'
    },
    {
      id: 5,
      position: 4,
      kind: 'PERCENT_DISCOUNT',
      value: 20,
      title: 'Student Discount'
    },
    {
      id: 6,
      position: 5,
      kind: 'PRICE_MARKUP',
      value: 20,
      title: 'Courier fee'
    }
  ]
}
