import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../Ui/CommonSection";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { cartActions } from "../../redux/slices/cartSlice";
import "../../styles/Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet>
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-2 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      return <Tr item={item} key={index} />;
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal <span className="fs-2 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-4 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy__btn w-100">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt={item.title} />
      </td>
      <td>{item.productName}</td>
      <td>${item.totalPrice}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-delete-bin-line"
          onClick={deleteProduct}
        ></motion.i>
      </td>
    </tr>
  );
};

export default Cart;
