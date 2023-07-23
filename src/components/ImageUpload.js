import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageUpload = ({ fetchImages }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags]= useState([]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("tags",tags);
      
      console.log(formData.title);
      const response = await axios.post(
        "http://localhost:3001/posts/upload",
        formData
      );

      if (
        response.data &&
        response.data.message === "Image uploaded successfully"
      ) {
        fetchImages();
        setImage(null);
        setTitle("");
        setTags([]);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleTags= (e) =>{
    setTags(e.target.value.split(','));
  }

  return (
    <div className="d-flex justify-content-center">
      <div>
        <div className="text-center mb-4">
          <h2>Image Upload</h2>
        </div>
        <div>
          <div className="mb-3">
            <input
            className="w-100"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="w-100"
              type="text"
              placeholder="Enter image title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="w-100"
              type="text"
              placeholder="Enter tags seperated by ',' "
              value={tags}
              onChange={handleTags}
            />
          </div>
          <div className="mb-3 text-center">
            <button className="btn btn-info" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
