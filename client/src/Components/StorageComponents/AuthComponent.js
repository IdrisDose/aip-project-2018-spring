import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import setAuthorizationToken from "../../Utils/AuthorizationToken";
import { userSet } from "../../Actions/AuthActions";

export class AuthComponent extends Component {
  static propTypes = {
    userSet: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (localStorage.token) {
      console.log("SETUP User");
      setAuthorizationToken(localStorage.token);
      this.props.userSet(localStorage.token);
    }
  }

  render() {
    return <div className="d-none" />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  userSet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent);
