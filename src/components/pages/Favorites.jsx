import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ProductsList from "../Ui/ProductsList";
import "../../styles/Favorites.css";

const Favorites = () => {
  const favoritesItems = useSelector((state) => state.favorites.favoritesItems);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="favorites__container">
              <ProductsList data={favoritesItems} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Favorites;
