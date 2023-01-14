import { Col, Container, Row } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../Ui/CommonSection";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ProductList from "../Ui/ProductsList";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { db } from "../../firebase.config";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import useGetData from "../../custom/useGetData";
import { favoritesActions } from "../../redux/slices/favoritesSlice";
import "../../styles/ProductDetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const [isFavotite, setIsFavotire] = useState();
  const { id } = useParams();
  const reviewUser = useRef("");
  const reviewMessage = useRef("");
  const dispatch = useDispatch();

  const { data: products } = useGetData("products");
  const docRef = doc(db, "products", id);

  const { imgUrl, title, price, reviews, description, shortDesc, category } =
    product;

  const relatedProducts = products.filter((item) => item.category === category);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("no product !");
      }
    };

    window.scrollTo(0, 0);
    getProduct();
  }, [id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMessage.current.value;

    const reviewObj = {
      user: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    const addReview = async () => {
      await setDoc(
        doc(db, "products", id),

        { reviews: arrayUnion(reviewObj) },
        { merge: true }
      );
    };

    addReview();
    toast.success("Review submitted");
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        imgUrl,
        productName: title,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  const addFavorites = () => {
    dispatch(
      favoritesActions.addItem({
        id,
        imgUrl,
        productName: title,
        price,
      })
    );
    setIsFavotire(true);
    toast.success("Added to favorites !");
  };

  const deleteFavorites = () => {
    dispatch(favoritesActions.deleteItem(id));
    setIsFavotire(false);
    toast.error("Removed to favorites !");
  };

  const avgRating = (
    reviews
      ?.map((user) => {
        return +user.rating;
      })
      .reduce((acc, cur) => {
        return acc + cur;
      }) / reviews?.length
  ).toFixed(1);

  return (
    <Helmet title={title}>
      <CommonSection title={title} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={title} />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{title}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-4">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span>)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category?.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <div className="d-flex align-items-end justify-content-between">
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="buy__btn"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </motion.button>

                  <span>
                    {isFavotite ? (
                      <i
                        style={{ color: "red" }}
                        onClick={deleteFavorites}
                        className="ri-heart-fill fs-1 mx-3"
                      ></i>
                    ) : (
                      <i
                        onClick={addFavorites}
                        className="ri-heart-fill fs-1 mx-3"
                      ></i>
                    )}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, index) => {
                        return (
                          <li key={index}>
                            <h6 className="fs-4">{item?.user}</h6>
                            <span>{item?.rating} (rating)</span>
                            <p>{item?.text}</p>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            ref={reviewMessage}
                            rows={4}
                            type="text"
                            placeholder="Review Message..."
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
