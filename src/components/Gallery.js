import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Gallery = ({ images }) => {

  return (
    <div className="mt-5 d-flex justify-content-center">
      <div className="text-center">
        <div>
          <h2>Gallery</h2>
        </div>
        <div>
          {images.map((image) => (
            <Link to={`/image/${image._id}`} key={image._id}>
              <img
                src={`http://localhost:3001/${image.imageUrl}`}
                alt={image.title}
                style={{ width: "20rem", margin: "10px" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
