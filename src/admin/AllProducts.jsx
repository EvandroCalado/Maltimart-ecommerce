import useGetData from "../custom/useGetData";
import Spinning from "../components/Ui/Spinning";
import { Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Deleted product !");
  };

  return (
    <Container className="my-5">
      <Row>
        <Col lg="12">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td>
                    {/* <h2 className="text-center py-5">Loading...</h2> */}
                    <Spinning />
                  </td>
                </tr>
              </tbody>
            ) : (
              productsData.map((item) => {
                return (
                  <tbody key={item.id}>
                    <tr>
                      <td>
                        <img src={item.imgUrl} alt={item.title} />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllProducts;
