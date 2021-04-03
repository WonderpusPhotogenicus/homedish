import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const Reviews = ({user}) => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([{user: "LeoEats", content: "Food is yum."}])

  const addReview = () => {
    setReviews(reviews.concat({user: user && user.name || "Anonymous Eater", content: review}));
    setReview("");
  };
  return (
    <>
      <div style={{padding: "20px", display: "flex", justifyContent: "center"}}>
        <TextField
          label="Leave a review"
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          variant="outlined"
          style={{width: "75%"}}
        />
        <button className="sign-up-button" onClick={addReview}>
          Add Review
        </button>
      </div>
      {reviews.map((review) => {
        return (
          <div>
            {review.user}: {review.content}
          </div>
        );
      })}
    </>
  );
};

export default Reviews;
