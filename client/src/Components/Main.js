import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import LandingPage from "./Landing/LandingPage";
import About from "./About/About";
import RegisterPage from "./Auth/Register/RegisterPage";
import Logout from "./Auth/Logout";
import LoginPage from "./Auth/Login/LoginPage";
import Products from "./Products/Products";
import ProductInfo from "./Products/ProductInfo";
import PrivateRoute from "./Auth/PrivateRoute";
import Dashboard from "./Dashboard/DashboardPage";
import HelpPage from "./Help/HelpPage";
import SearchPage from "./Search/SearchPage";
import ErrorCodeComponent from "../Utils/ErrorCodeComponent";
import ServerErrorComponent from "../Utils/ServerErrorComponent";
import CategoriesPage from "./Products/CategoriesPage";
import OrderPage from "./Order/OrderPage";
import ProfilePage from "./Profile/ProfilePage";
import CartPage from "./Cart/CartPage";
import ClothesPage from "./Categories/ClothesPage";
import ToysPage from "./Categories/ToysPage";
import SoftwarePage from "./Categories/SoftwarePage";
import ElectronicsPage from "./Categories/ElectronicsPage";

export class Main extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isLoggedIn } = this.props.auth;
    return (
      <main id="main">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/products/:id" component={ProductInfo} />

          {/* Product Categories */}
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/category/toys" component={ToysPage} />
          <Route path="/category/software" component={SoftwarePage} />
          <Route path="/category/clothes" component={ClothesPage} />
          <Route path="/category/electronics" component={ElectronicsPage} />

          <Route path="/products" component={Products} />
          <Route path="/help" component={HelpPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/profile/:handle" component={ProfilePage} />
          <Route path="/cart" component={CartPage} />

          <PrivateRoute
            path="/dashboard/:page"
            component={Dashboard}
            isLoggedIn={isLoggedIn}
          />
          <Route
            path="/dashboard"
            render={() => <Redirect to="/dashboard/home" />}
          />

          <PrivateRoute
            path="/orders"
            component={OrderPage}
            isLoggedIn={isLoggedIn}
          />
          <PrivateRoute
            path="/logout"
            component={Logout}
            isLoggedIn={isLoggedIn}
          />

          {/* This is an error component for 404s :) */}
          <Route path="/500" component={ServerErrorComponent} />
          <Route path="*" exact={true} component={ErrorCodeComponent} />
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
