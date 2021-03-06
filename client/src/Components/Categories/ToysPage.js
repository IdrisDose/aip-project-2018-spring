import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row, Col } from "mdbreact";

import Product from "../Products/Product";

export class ToysPage extends Component {
  static propTypes = {
    products: PropTypes.object.isRequired
  };

  render() {
    let products = this.props.products.map((item, i) => {
      if (item.category.toLowerCase() === "toys") {
        return <Product key={i} product={item} />;
      } else {
        return "";
      }
    });
    return (
      <Container className="mt-custom" fluid>
        <Row>
          <Col>
            <h1 className="text-center">Toys</h1>
            <hr />
          </Col>
        </Row>
        <Row>{products}</Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.products
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToysPage);
