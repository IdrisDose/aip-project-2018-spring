import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "mdbreact";
import { Link } from "react-router-dom";

import isEmpty from "../../Utils/isEmpty";
import convertCentsToDollars from "../../Utils/convertCentsToDollars";

export default class OrderProductList extends Component {
  render() {
    const { orderitems } = this.props;
    let emptyList = (
      <Row>
        <Col>
          <Card>
            <CardBody className="text-center">
              This user has no product for sale
            </CardBody>
          </Card>
        </Col>
      </Row>
    );

    let productList = !isEmpty(orderitems) ? (
      orderitems.map((item, index) => (
        <tr>
          <th scope="row">{index}</th>
          <td>{item.product.name}</td>
          <td>{item.qty}</td>
          <td>${convertCentsToDollars(item.product.price)}</td>
          <td>
            <Link
              to={"/product/" + item.product.link}
              className="btn btn-primary float-right"
            >
              View Product
            </Link>
          </td>
        </tr>
      ))
    ) : (
      <tr />
    );

    let listBody = !isEmpty(orderitems.length) ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price Per Unit</th>
          </tr>
        </thead>
        <tbody>{productList}</tbody>
      </table>
    ) : (
      emptyList
    );
    return listBody;
  }
}