import HomePage from "@/common_pages/HomePage";
import Navbar from "@/components/navBar/Navbar";
import { loggedOutOnlyRoutes } from "@/routes";
import React from "react";
const Home = () => {
  return (
    <div>
      <Navbar routes={loggedOutOnlyRoutes} />
      <HomePage />
    </div>
  );
};

export default Home;
