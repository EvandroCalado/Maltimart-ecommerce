import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import useGetData from "../../custom/useGetData";
import Helmet from "../Helmet/Helmet";
import heroImg from "../../assets/images/hero-img.png";
import Services from "../../services/Services";
import ProductsList from "../Ui/ProductsList";
import counterImg from "../../assets/images/counter-timer-img.png";
import Clock from "../Ui/Clock";
import Spinning from "../Ui/Spinning";
import "../../styles/Home.css";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const { data: products, loading } = useGetData("products");

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  const year = new Date().getFullYear();

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  aliquam ullam eaque illum, quia, provident libero qui suscipit
                  possimus odio quisquam modi? Fuga aspernatur, facere dicta
                  consequatur magni culpa molestias.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>{" "}
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="Hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <div className=" my-5 w-100 d-flex align-items-center justify-content-center">
                <Spinning width={100} height={100} />
              </div>
            ) : (
              <ProductsList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {loading ? (
              <div className=" my-5 w-100 d-flex align-items-center justify-content-center">
                <Spinning width={100} height={100} />
              </div>
            ) : (
              <ProductsList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="clock__top-content">
                <h4 className="text-white fs-8 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-10 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end counter__img">
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center md-5">
              <h2 className="section__title">New Arriavals</h2>
            </Col>
            {loading ? (
              <div className=" my-5 w-100 d-flex align-items-center justify-content-center">
                <Spinning width={100} height={100} />
              </div>
            ) : (
              <ProductsList data={mobileProducts} />
            )}
            {loading ? (
              <div className=" my-5 w-100 d-flex align-items-center justify-content-center">
                <Spinning width={100} height={100} />
              </div>
            ) : (
              <ProductsList data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            {loading ? (
              <div className=" my-5 w-100 d-flex align-items-center justify-content-center">
                <Spinning width={100} height={100} />
              </div>
            ) : (
              <ProductsList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
