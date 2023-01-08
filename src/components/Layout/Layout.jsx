import Routers from "../routers/Routers";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routers />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
