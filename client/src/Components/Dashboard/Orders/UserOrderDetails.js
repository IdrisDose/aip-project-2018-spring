import React from "react";
import {Carousel, CarouselInner, CarouselItem, Container,Card,CardImage,CardBody,CardTitle,CardText,Button,Input  } from 'mdbreact';
import {Component} from "react";
import {connect} from 'react-redux';
import {fetchProductById} from "../../../Actions/ProductAction";
import {fetchOrderById} from "../../../Actions/OrderAction";
import {fetchProfileByUserId} from "../../../Actions/AuthActions";
class ProductDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id : null,
      isRequested:false
    }
    this.onBuyClicked = this.onBuyClicked.bind(this);
  }
  componentWillMount () {

    this.setState({id : this.props.match.params.id});
    this.props.fetchOrderById(this.props.match.params.id);


  }
  componentWillReceiveProps(newProps) {
    if(newProps.order.product.userId != null && !this.state.isRequested) {
      this.props.fetchProfileByUserId(newProps.order.product.userId);
      this.setState({isRequested:true});
    }

  }
  onBuyClicked() {
    this.setState({ischeckout:true})
  }
  render() {
    const {name,description,price,img,userId} = this.props.order.product;
    const {qty,time,id} = this.props.order;
    let productImgs = null;
    let noImg = null;
    if(img) {
      productImgs = img.map((im, index) => (
        <CarouselItem itemId={index+1} key={index}>
          <img className="d-block w-100" src={im} alt="First slide"/>
        </CarouselItem>
      ));
    } else {
      noImg = <h1>No img avaiable</h1>;
    }

      return (
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4">
              {noImg}
              <Carousel
                activeItem={1}
                length={img ? img.length : 0}
                showControls={true}
                showIndicators={true}
                thumbnails
                className="z-depth-1">
                <CarouselInner>
                  {productImgs}
                </CarouselInner>
              </Carousel>

            </div>
            <div className="col-md-8">
              <h1>{name}<small className="text-info"> {id}</small>
                <hr/>
              </h1>
              <Card cascade>
                <CardBody cascade>
                  <h4 className="card-title">Order information</h4><hr/>

              <p>Order ID: <strong>{id}</strong></p>
              <p>Description: <strong>{description}</strong></p>
              <p>Price: <strong>${price}</strong></p>
              <p>Qty: <strong>{qty}</strong></p>
              <p>Order Time: <strong>{time}</strong></p>
                </CardBody>
              </Card>
              <Card cascade>
                <CardBody cascade>
                  <h4 className="card-title">Selller information</h4><hr/>
                <p>UserName: <strong>{this.props.seller.userName}</strong></p>
                <p>ID: <strong>{this.props.seller.id}</strong></p>
                <p>Contact: <strong>{this.props.seller.email}</strong></p>

                </CardBody>
              </Card>


            </div>

          </div>
        </div>
      );

  }
}
const mapStateToProps = state => ({
  seller: state.auth.requesedUserInfo,
  order: state.orders.orderItem
})

export default connect(mapStateToProps,{fetchOrderById,fetchProfileByUserId})(ProductDetail);