import React, { Component } from "react";
import { connect } from "react-redux";
import { createUser } from "../../../src/store/actions/user";
import {
  EMAIL_REGEX,
  customErrorMessages,
  MINLENGHT8_REGEX,
  NAME_REGEX
} from "../../utils/validation";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      error: {}
    };
  }

  handleOnChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({
      data
    });
  };

  handleValidation = () => {
    let { password, email, firstName, lastName } = this.state.data;
    let allOk = true;
    const error = { ...this.state.error };
    if (!firstName && !NAME_REGEX.test(firstName)) {
      let { valueMissing, patternMismatch } = customErrorMessages.firstName;
      allOk = false;

      error.firstName = firstName ? patternMismatch : valueMissing;
    } else error.firstName = "";
    if (!lastName && !NAME_REGEX.test(lastName)) {
      let { valueMissing, patternMismatch } = customErrorMessages.lastName;
      allOk = false;
      error.lastName = lastName ? patternMismatch : valueMissing;
    } else error.lastName = "";
    if (!email && !EMAIL_REGEX.test(email)) {
      let { valueMissing, patternMismatch } = customErrorMessages.email;
      allOk = false;
      error.email = email ? patternMismatch : valueMissing;
    } else error.email = "";
    if (!password && !MINLENGHT8_REGEX.test(password)) {
      let { valueMissing, patternMismatch } = customErrorMessages.password;
      allOk = false;
      error.password = password ? patternMismatch : valueMissing;
    } else error.password = "";
    this.setState({ error });
    return allOk;
  };

  handleFormSubmit = async e => {
    const data = { ...this.state.data };
    delete data.confirmPassword;
    const { createUser } = this.props;
    // console.log(e);
    e.preventDefault();
    if (this.handleValidation()) {
      await createUser(data);
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state.data;
    return (
      <div style={{ marginTop: "10px", marginLeft: 30 }}>
        <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
          <div id="legend">
            <legend className="">Register</legend>
          </div>
          <div className="control-group">
            <label className="control-label" htmlFor="firstName">
              First name
            </label>
            <div className="controls">
              <input
                onChange={this.handleOnChange}
                value={firstName}
                type="text"
                id="firstName"
                name="firstName"
                placeholder=""
                className="input-xlarge"
              />
              <p className="help-block">{this.state.error.firstName}</p>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="lastName">
              Last name
            </label>
            <div className="controls">
              <input
                onChange={this.handleOnChange}
                value={lastName}
                type="text"
                id="lastName"
                name="lastName"
                placeholder=""
                className="input-xlarge"
              />
              <p className="help-block">{this.state.error.lastName}</p>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="email">
              E-mail
            </label>
            <div className="controls">
              <input
                onChange={this.handleOnChange}
                value={email}
                type="text"
                id="email"
                name="email"
                placeholder=""
                className="input-xlarge"
              />
              <p className="help-block">{this.state.error.email}</p>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="password">
              Password
            </label>
            <div className="controls">
              <input
                onChange={this.handleOnChange}
                value={password}
                type="password"
                id="password"
                name="password"
                placeholder=""
                className="input-xlarge"
              />
              <p className="help-block">{this.state.error.password}</p>
            </div>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="controls">
              <input
                onChange={this.handleOnChange}
                value={confirmPassword}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=""
                className="input-xlarge"
              />
              <p className="help-block">{this.state.error.confirmPassword}</p>
            </div>
          </div>

          <div className="control-group">
            <div className="controls">
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(createUser(data))
});

export default connect(null, mapDispatchToProps)(LoginPage);
