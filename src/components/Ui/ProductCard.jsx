import { motion } from "framer-motion";
import "../../styles/ProductCard.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.title,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );
    toast.success("Product added successfully");
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <motion.div whileHover={{ scale: 0.9 }} className="product__img">
          <img src={item.imgUrl} alt="Product" />
        </motion.div>
        <div className="product__info p-2">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.title}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card-button d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileHover={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
