import { useState } from "react";
import HomePage from "../components/Home/HomePage";
import Layout from "../components/Layout/Layout";

const Home = () => {
  const [hideHeader, setHideHeader] = useState(false);

  return (
    <Layout hideHeader={hideHeader}>
      <div className="d-flex">
        <HomePage setHideHeader={setHideHeader} />
      </div>
    </Layout>
  );
};

export default Home;