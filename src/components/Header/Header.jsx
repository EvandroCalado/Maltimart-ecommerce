import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { motion } from "framer-motion";
import useAuth from "../../custom/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import "./Header.css";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const profileActionsRef = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const favoritesItems = useSelector((state) => state.favorites.favoritesItems);

  const menuToggle = () => menuRef?.current?.classList?.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToFavorites = () => {
    const userId = currentUser?.reloadUserInfo?.localId;

    navigate(`/favorites/${userId}`);
  };

  const toggleProfileActions = () => {
    profileActionsRef.current.classList.toggle("show__profileActions");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="header__back"></div>
      <header className="header">
        <Container>
          <Row>
            <div className="nav__wrapper">
              <div className="logo">
                <img src={logo} alt="Logo" />
                <div>
                  <h1>Multimart</h1>
                </div>
              </div>

              <div className="navgation" ref={menuRef} onClick={menuToggle}>
                <ul className="menu">
                  {nav__links.map((item, index) => {
                    return (
                      <li key={index} className="nav__item">
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "nav__active" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="nav__icons">
                <span className="fav__icon" onClick={navigateToFavorites}>
                  <i className="ri-heart-line"></i>
                  <span className="badge">{favoritesItems.length}</span>
                </span>
                <span className="cart__icon" onClick={navigateToCart}>
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge">{totalQuantity}</span>
                </span>
                <div className="profile">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt="User Icon"
                    ref={profileActionsRef}
                    onClick={toggleProfileActions}
                  />

                  <div
                    className="profile__actions"
                    ref={profileActionsRef}
                    onClick={toggleProfileActions}
                  >
                    {currentUser?.displayName === "Admin" && (
                      <Link to="/dashboard">Dashboard</Link>
                    )}
                    {currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <Link to="/signup">Signup</Link>{" "}
                        <Link to="/login">Login</Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mobile__menu">
                  <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
