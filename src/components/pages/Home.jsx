import React from "react";
import Helmet from "../Helmet/Helmet";
import { Col, Container, Row } from "reactstrap";
import heroImg from "../../assets/images/hero-img.png";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductsList from "../Ui/ProductsList";
import products from "../../assets/data/products";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(products);

  useEffect(() => {
    const filteredProducts = products.filter(
      (item) => item.category === "chair"
    );
    setData(filteredProducts);
  }, []);

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
            <ProductsList data={data} />
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
