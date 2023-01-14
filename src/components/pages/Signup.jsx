import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../Helmet/Helmet";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../../firebase.config";
import { storage } from "../../firebase.config";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    // e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });
        });
      });

      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  return (
    <Helmet title="Signup">
      <Container>
        <Row>
          {loading ? (
            <Col lg="12" className="text-center">
              <h5 className="fs-bold fs-1 m-5">Loading...</h5>
            </Col>
          ) : (
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>

              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>

                <button type="submit" className="buy__btn auth__btn">
                  {" "}
                  Create an Account
                </button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Signup;
