import HomePage from "../components/Home/HomePage";
import Layout from "../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="d-flex">
        <HomePage />
      </div>
    </Layout>
  );
};

export default Home;