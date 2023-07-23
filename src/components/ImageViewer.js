import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ImageViewer = () => {
  const id = useParams().id;
  const [image, setImage] = useState(null);
  // const [likes, setLikes] = useState(0);
  // const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked]= useState(false);

  useEffect(() => {
    fetchImageDetails();
  }, []);

  const fetchImageDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/images/${id}`
      );

      setImage(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // const fetchLikes = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/posts/images/${id}/likes`);
  //     setLikes(response.data);
  //   } catch (error) {
  //     console.error('Error fetching likes:', error);
  //   }
  // };

  // const fetchComments = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3001/posts/images/${id}/comments`);
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //   }
  // };

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:3001/posts/images/${id}/likes`, {isLiked });
      setIsLiked(!isLiked);
      console.log(isLiked);
      fetchImageDetails();
    } catch (error) {
      console.error("Error liking image:", error);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(`http://localhost:3001/posts/images/${id}/comments`, {
        text: newComment,
        username: "user1",
      });
      fetchImageDetails();
      setNewComment(""); // Clear the comment input field
    } catch (error) {
      console.error("Error commenting on image:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/images/${id}/download`, {
        responseType: "blob",
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download",image.imageUrl); // Set the image name for download
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleShare = () => {
    // Generate sharing URLs for Facebook, Twitter, and Pinterest
    const twitterShareUrl = `http://twitter.com/share?url=http://localhost:3001/${image.imageUrl}`

    // Open sharing links in a new window
    window.open(twitterShareUrl, '_blank');
  };

  return (
    <div className=" d-flex justify-content-center vh-100 align-items-center">
      <div className="p-5 border border-2 border-subtle-dark rounded">
        <div className="mb-3">
          <a className="btn btn-secondary" href="/feed">
            Back
          </a>
        </div>
        {image && (
          <div>
            <div className="mb-3">
              <img
                style={{ maxWidth: "50rem" }}
                src={`http://localhost:3001/${image.imageUrl}`}
                alt={image.title}
              />
            </div>
            <div className="mb-3">
              <h2>{image.title}</h2>
            </div>
            <div className="mb-3 d-flex">
              <button className="btn btn-success" onClick={handleDownload}>
                Download
              </button>
              <button className="btn btn-info mx-2" onClick={handleShare}>
                Share
              </button>
            </div>
            <div className="d-flex mb-3">
              <p className="m-2">Likes: {image.likes}</p>
              <button className="btn btn-danger" onClick={handleLike}>
                {isLiked? 'Unlike' : 'Like'}
              </button>
            </div>
          </div>
        )}
        <div className="mb-3">
          <h3>Comments</h3>
        </div>
        <div className="mb-3">
          {image &&
            image.comments.map((comment) => (
              <p key={comment._id}>{comment.text}</p>
            ))}
        </div>

        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleComment}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
