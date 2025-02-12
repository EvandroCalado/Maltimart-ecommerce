import Routers from "../../routers/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
