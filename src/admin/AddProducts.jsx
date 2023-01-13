import { useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShotDescription, setEnterShotDescription] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterProductImg.name}`
      );
      uploadBytesResumable(storageRef, enterProductImg).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await addDoc(docRef, {
            title: enterTitle,
            shortDesc: enterShotDescription,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL,
          });
        });
      });
      setLoading(false)
      toast.success("product successfully added !");
      navigate("/dashboard/all-products")
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("product not added !");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5 fs-3">Add Products</h4>
            {
              loading ? <Col lg="12"><h2 className="text-center m-5">Loading...</h2> </Col> : <Form onSubmit={addProduct}>
              <FormGroup className="form__group">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double sofa"
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="Lorem..."
                  value={enterShotDescription}
                  onChange={(e) => setEnterShotDescription(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description..."
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                  required
                />
              </FormGroup>

              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form__group flex-grow-1">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="$100"
                    value={enterPrice}
                    onChange={(e) => setEnterPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group rounded">
                  <span>Category</span>
                  <select
                    className="p-3 rounded"
                    value={enterCategory}
                    onChange={(e) => setEnterCategory(e.target.value)}
                  >
                    <option >Select category</option>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="wireless">Wireless</option>
                    <option value="watch">Watch</option>
                  </select>
                </FormGroup>
              </div>

              <div>
                <FormGroup className="form__group">
                  <span>Prodict Image</span>
                  <input
                    type="file"
                    onChange={(e) => setEnterProductImg(e.target.files[0])}
                    required
                  />
                </FormGroup>
              </div>

              <button className="buy__btn" type="submit">
                Add Product
              </button>
            </Form>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
