import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>404</h1>
        <h2>Oops! Al parecer esta página no existe</h2>
        <div className="d-flex justify-content-center mt-5">
          <Link to="/" className="centered-link">Volver al Home</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
