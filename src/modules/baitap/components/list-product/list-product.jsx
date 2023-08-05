import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  chinhSuaSinhVienCreator,
  xoaSinhVienCreator,
} from "../../../../../redux/react-form.action";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const { searchTerm } = this.state;
    const filteredSV = this.props.mangSV.filter((sv) =>
      sv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <div>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={this.handleSearchChange}
            placeholder="Tìm kiếm"
          />
          <div className="input-group-append">
            <button className="btn btn-success" type="button">
              Tìm
            </button>
          </div>
        </div>
        </div>

        <table className="table mt-4">
          <thead>
            <tr className='bg-dark text-white text-center'>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredSV.map((sv) => (
              <tr key={sv.id} className='text-center'>
                <th scope="row">{sv.id}</th>
                <td>{sv.name}</td>
                <td>{sv.sdt}</td>
                <td>{sv.email}</td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm("Bạn có chắc chắn muốn xóa hay không?")) {
                        this.props.dispatch(xoaSinhVienCreator({ id: sv.id }));
                      }
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => {
                      this.props.dispatch(chinhSuaSinhVienCreator(sv));
                    }}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  componentWillUnmount() {
    console.log("ListProduct - unmount");
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSV: rootReducer.reactFormReducer.mangSV,
  };
};

export default connect(mapStateToProps)(ListProduct);