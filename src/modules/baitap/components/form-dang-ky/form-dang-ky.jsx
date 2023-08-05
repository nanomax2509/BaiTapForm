import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dangKySVCreator,
  hoanThienChinhSuaCreator,
} from "../../../../../redux/react-form.action";
const MAPPER = {
  id: "Id",
  name: "Name",
  sdt: "sdt",
  email: "email",
};

class FormDangKy extends Component {
 

  state = {
    value: {
      id: "",
      name: "",
      sdt: "",
      email: "",
     
    },
    touch: {
      id: false,
      name: false,
      sdt: false,
      email: false,
    },
    error: {
      id: "",
      name: "",
      sdt: "",
      email: "",
    },
  };

  handleChange = (event) => {
   
    const { value, id, name, className } = event.target;

   
    let newError = {};
    for (const key in this.state.touch) {
      if (this.state.touch[key]) {
        const __value = key === id ? value : this.state.value[key];

        switch (key) {
          case "id": {
            if (/^\d*$/.test(__value) === false) {
              newError[key] = "Mã SV phải là số.";
            }
            break;
          }
          case "sdt": {
            const regexPhone =
              /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
            if (regexPhone.test(__value) === false) {
              newError[key] = "Số điện thoại không hợp lệ.";
            }
            break;
          }
          case "email": {
            if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(__value) === false) {
              newError[key] = "email không hợp lệ.";
            }
            break;
          }
         
          default: {
            break;
          }
        }

        if (__value.length === 0) {
          newError[key] = MAPPER[key] + " không được bỏ trống";
        }

      
      }
    }

    this.setState({

      value: {
        ...this.state.value,
        [id]: value,
      },
      error: newError,
    });

  };

  handleFocus = (event) => {
    const { id } = event.target;

    this.setState({
      touch: {
        ...this.state.touch,
        [id]: true,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    for (const key in this.state.value) {
      if (this.state.value[key].length === 0) {
        return;
      }

      if (this.state.error[key]?.length > 0) {
        alert(this.state.error[key]);
        return;
      }
    }

    console.log("submit", this.state.value);

    const creator = this.props.svChinhSua
      ? hoanThienChinhSuaCreator
      : dangKySVCreator;

    this.props.dispatch(creator(this.state.value));


    this.setState({
      value: {
        id: "",
        name: "",
        sdt: "",
        email: "",
      },
    });
  };

  static getDerivedStateFromProps(newProps, currentState) {
    console.log({ newProps, currentState });

  
    if (newProps.svChinhSua) {
      if (newProps.svChinhSua?.id !== currentState.value?.id) {
        return {
          ...currentState,

          value: newProps.svChinhSua,
        };
      }
    }

    return null;
  }

  render() {
    console.log(this.props.svChinhSua);
   
    return (
      <form onSubmit={this.handleSubmit} className="g-3">
        <div className="row">
          <div className="col-6">
            <div>
              <label htmlFor="id">Mã SV</label>
              <input
                name="Id"
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                value={this.state.value?.id}
                type="text"
                className="form-control"
                id="id"
                placeholder=""
              />
              {this.state.touch?.id && this.state.error?.id && (
                <p className="text-danger">{this.state.error?.id}</p>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="name">Họ tên</label>
              <input
                name="Name"
                onFocus={this.handleFocus}
                value={this.state.value?.name}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="name"
                placeholder=""
              />
              {this.state.touch?.name && this.state.error?.name && (
                <p className="text-danger">{this.state.error?.name}</p>
              )}
            </div>
            
          </div>
          <div className="col-6">
            <div>
              <label htmlFor="sdt">Số điện thoại</label>
              <input
                name="sdt"
                value={this.state.value?.sdt}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                type="number"
                className="form-control"
                id="sdt"
                placeholder=""
              />
              {this.state.touch?.sdt && this.state.error?.sdt && (
                <p className="text-danger">{this.state.error?.sdt}</p>
              )}
            </div>
            
            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="email"
                placeholder=""
                value={this.state.value?.email}
              />
              {this.state.touch?.email && this.state.error?.email && (
                <p className="text-danger">{this.state.error?.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          {this.props.svChinhSua ? (
            <button className="btn btn-success mx-4">Chỉnh Sửa</button>
          ) : (
            <button className="btn btn-success mx-4">Đăng Ký</button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    svChinhSua: rootReducer.reactFormReducer.svChinhSua,
  };
};

export default connect(mapStateToProps)(FormDangKy);

