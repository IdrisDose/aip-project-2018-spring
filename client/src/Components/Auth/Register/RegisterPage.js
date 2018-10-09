import React, { Component } from "react";
import { Container, Row, Col, Input, Button } from "mdbreact";
import { userRegister } from "../../../Actions/AuthActions";
import { addFlashMessage } from "../../../Actions/FlashActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import validator from "validator";
import { isEmpty } from "../../../Utils/UtilMethods";
import validateInput from "../../../Utils/RegisterInputValidator";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      name: "",
      username: "",
      email: "",
      confirm: "",
      password: "",
      passwordConfirm: "",
      isLoading: false
    };

    this.updateDetails = this.updateDetails.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  submitHandler(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.userRegister(this.state, this.props.history);
    this.setState({ isLoading: false });
  }

  updateDetails(event) {
    this.setState({
      [event.target.name]: validator.escape(event.target.value)
    });
  }

  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    //Get the vars from the state
    const {
      errors,
      username,
      name,
      email,
      confirm,
      password,
      passwordConfirm,
      isLoading
    } = this.state;

    //Error Classes because MDBReact is Bad.
    const nameErrorClass = errors.name ? "invalid" : "";
    const emailErrorClass = errors.email ? "invalid" : "";
    const confirmErrorClass = errors.confirm ? "invalid" : "";
    const passErrorClass = errors.password ? "invalid" : "";
    const passConfErrorClass = errors.passwordConfirm ? "invalid" : "";
    const usernameErrorClass = errors.username ? "invalid" : "";
    const alertError = !isEmpty(errors) ? "alert alert-danger" : "hidden";

    return (
      <Container>
        <Row>
          <Col md="6" className="mx-auto">
            <form className="needs-validation" onSubmit={this.submitHandler}>
              <p className="display-4 h5 text-center mb-4">Sign up</p>
              <div className={alertError} role="alert">
                {errors.name ? errors.confirm : ""}
                {errors.email ? errors.email : ""}
                {errors.confirm ? errors.confirm : ""}
                {errors.password ? errors.password : ""}
                {errors.passwordConfirm ? errors.passwordConfirm : ""}
                {errors.username ? errors.username : ""}
              </div>
              <div className="grey-text">
                <Input
                  label="Pick a username/handle"
                  name="username"
                  icon="user"
                  group
                  type="text"
                  validate
                  value={username}
                  onChange={this.updateDetails}
                  className={usernameErrorClass}
                />
                <Input
                  label="Your name"
                  name="name"
                  icon="user"
                  group
                  type="text"
                  validate
                  value={name}
                  onChange={this.updateDetails}
                  className={nameErrorClass}
                />
                <Input
                  label="Your email"
                  icon="envelope"
                  name="email"
                  group
                  type="email"
                  validate
                  value={email}
                  onChange={this.updateDetails}
                  className={emailErrorClass}
                />
                <Input
                  label="Confirm your email"
                  icon="exclamation-triangle"
                  name="confirm"
                  group
                  type="text"
                  validate
                  value={confirm}
                  onChange={this.updateDetails}
                  className={confirmErrorClass}
                />
                <Input
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  name="password"
                  validate
                  value={password}
                  onChange={this.updateDetails}
                  className={passErrorClass || passConfErrorClass}
                />
                <Input
                  label="Confirm your password"
                  icon="lock"
                  group
                  type="password"
                  name="passwordConfirm"
                  validate
                  value={passwordConfirm}
                  onChange={this.updateDetails}
                  className={passConfErrorClass}
                />
              </div>
              <div className="text-center">
                <Button color="primary" type="submit" disabled={isLoading}>
                  Register
                </Button>
              </div>
              <br />
              <hr />
              <div className="text-center">
                <Link to="/login">Click here to Login</Link>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

RegisterPage.propTypes = {
  userRegister: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = {
  userRegister,
  addFlashMessage
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterPage)
);
