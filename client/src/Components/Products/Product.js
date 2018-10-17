import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Fa
} from "mdbreact";
import { Link } from "react-router-dom";
import validator from "validator";

import convertCentsToDollars from "../../Utils/convertCentsToDollars";
import { addToCart } from "../../Actions/CartActions";

export class Product extends Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired
  };

  async itemCartClick(event) {
    event.preventDefault();
    if (this.props.product.hasStock) {
      await this.props.addToCart(this.props.product, this.props.cart);
    }
  }

  itemFavouriteClick(event) {
    event.preventDefault();
    let objectClass = event.target.attributes.class.value.split(" ");
    let newClassList = [];

    if (objectClass.includes("red-text")) {
      newClassList = objectClass.filter(function(ele) {
        return ele !== "red-text";
      });
      objectClass = newClassList;
    } else {
      objectClass.push("red-text");
    }

    event.target.attributes.class.value = objectClass.join(" ");
  }

  render() {
    const {
      seller,
      link,
      name,
      price,
      description,
      image,
      qty,
      hasStock
    } = this.props.product;

    let productContainerStyle = {
      background:
        "linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)), url(http://localhost:3000/" +
        image +
        "), lightgrey",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: ".125rem"
    };

    let isActive = hasStock ? "white-text" : "grey-text";

    let qtyDisplay = hasStock ? qty + " left" : "None Left";

    return (
      <Col className="mb-2" md="2">
        <Card narrow ecommerce className="mb-2" style={productContainerStyle}>
          <CardBody cascade>
            <h5 className="text-white">
              Seller:{" "}
              <Link
                to={"/profile/" + seller.handle}
                className="blue-text"
                title="Seller Info"
              >
                <Fa icon="user" className="mr-1" />
                {seller.handle}
              </Link>
            </h5>

            <CardTitle>
              <strong>
                <Link to={"/product/" + link} className="white-text">
                  {validator.unescape(name)}
                </Link>
              </strong>
            </CardTitle>
            <CardText className="capitalize text-white">
              {validator.unescape(description)}
            </CardText>
            <CardFooter className="px-1">
              <span className="float-left text-white">
                ${convertCentsToDollars(price)} - {qtyDisplay}
              </span>
              <span className="float-right grey-text">
                <Link
                  to="#"
                  className={isActive + " ml-3"}
                  title="Add to cart"
                  onClick={e => this.itemCartClick(e)}
                  disabled={!hasStock}
                >
                  <Fa icon="cart-arrow-down" />
                </Link>
                <Link
                  to={"/product/" + link}
                  className="white-text ml-3"
                  title="Quick look"
                >
                  <Fa icon="eye" />
                </Link>
                <Link
                  to="#"
                  className="white-text ml-3"
                  title="Add to watchlist"
                  onClick={e => this.itemFavouriteClick(e)}
                >
                  <Fa icon="heart" />
                </Link>
              </span>
            </CardFooter>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
