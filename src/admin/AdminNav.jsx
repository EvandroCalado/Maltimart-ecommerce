import { Container, Row } from "reactstrap";
import useAuth from "../custom/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/AdminNav.css";

const admin__nav = [
  {
    id: 1,
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    display: "All-Products",
    path: "/dashboard/all-products",
  },
  {
    id: 3,
    display: "Add-Products",
    path: "/dashboard/add-product",
  },
  {
    id: 4,
    display: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate()

const handleLogoClick = () => {
  navigate("/home")
}

  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo" onClick={handleLogoClick}>
                <h2>Multimart</h2>
              </div>

              <div className="search__box">
                <input type="text" placeholder="Search..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-3-line"></i>
                </span>
                <img
                  src={currentUser && currentUser.photoURL}
                  alt={currentUser && currentUser.displayName}
                />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item) => {
                  return (
                    <li key={item.id} className="admin__menu-item">
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__admin-menu" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
