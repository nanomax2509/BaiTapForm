import React, { Component } from 'react'
import FormDangKy from './components/form-dang-ky/form-dang-ky'
import ListProduct from './components/list-product/list-product'
export default class ReactForm extends Component {
  render() {
    return (
      <div>
        <FormDangKy/>
        <ListProduct/>
      </div>
    )
  }
}
