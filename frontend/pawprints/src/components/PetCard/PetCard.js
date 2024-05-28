import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PetCard.css";

const PetCard = ({ pet, userId }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await axios.post(`/api/petlisting/like/${pet._id}`, { userId });
      alert("Pet liked successfully");
    } catch (error) {
      console.error("Error liking pet", error);
      alert("Failed to like pet");
    }
  };

  const handleComment = async () => {
    if (!comment) {
      return alert("Comment cannot be empty");
    }

    try {
      await axios.post(`/api/petlisting/comment/${pet._id}`, { userId, comment });
      alert("Comment added successfully");
      setComment("");
      setShowCommentBox(false);
    } catch (error) {
      console.error("Error adding comment", error);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="pet-card">
      <h3>{pet.name}</h3>
      <p>Type: {pet.animalType}</p>
      <p>Age: {pet.age}</p>
      <p>Breed: {pet.breed}</p>
      <p>Sex: {pet.sex}</p>
      <p>Colour: {pet.colour}</p>
      <div className="pet-card-actions">
        <button onClick={handleLike}>Like</button>
        <button onClick={() => setShowCommentBox(!showCommentBox)}>Comment</button>
      </div>
      {showCommentBox && (
        <div className="comment-box">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment"
          ></textarea>
          <button onClick={handleComment}>Submit</button>
        </div>
      )}
      <Link to={`/petdetails/${pet._id}`} className="details-link">View Details</Link>
    </div>
  );
};

export default PetCard;
