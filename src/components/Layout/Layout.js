import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children, hideHeader }) => {
  return (
    <>
      <Header hideHeader={hideHeader} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
