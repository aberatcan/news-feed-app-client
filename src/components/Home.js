import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>Home Page</div>
      <div>
        <Link to={"/login"}>Login Page</Link>
      </div>
      <div>
        <Link to={"/register"}>Register Page</Link>
      </div>
      <div>
        <Link to={"/search"}>Search</Link>
      </div>
    </div>
  );
};

export default Home;
