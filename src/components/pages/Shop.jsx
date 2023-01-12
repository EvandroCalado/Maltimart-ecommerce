import React from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../Ui/CommonSection";
import "../../styles/Shop.css";
import { useState } from "react";
import productsData from "../../assets/data/products";
import ProductsList from "../Ui/ProductsList";

const Shop = () => {
  const [products, setProducts] = useState(productsData);

  const heandleFilter = (e) => {
    const filterValue = e.target.value;
    console.log(products);

    if (filterValue === "sofa") {
      const filteredProducts = productsData.filter(
        (item) => item.category === "sofa"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "mobile") {
      const filteredProducts = productsData.filter(
        (item) => item.category === "mobile"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "chair") {
      const filteredProducts = productsData.filter(
        (item) => item.category === "chair"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "watch") {
      const filteredProducts = productsData.filter(
        (item) => item.category === "watch"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "wireless") {
      const filteredProducts = productsData.filter(
        (item) => item.category === "wireless"
      );

      setProducts(filteredProducts);
    }

    if (filterValue === "all") {
      setProducts(productsData);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;

    const searchProducts = productsData.filter((item) =>
      item.productName
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    );

    setProducts(searchProducts);
  };

  return (
    <Helmet title="shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={heandleFilter}>
                  <option value="all">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search..."
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {products.length === 0 ? (
              <h1 className="text-center fs-1">No products are found !</h1>
            ) : (
              <ProductsList data={products} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
