import React from "react";
import ReactStars from 'react-rating-stars-component';
import "./ReviewSummary.css";

const ReviewSummary = ({ reviews, rating }) => {
  const ratingList = [5, 4, 3, 2, 1];

  const calculateStarsTotal = (star) => {
    let count = 0;
    
    reviews.forEach((element) => {
      if (element.rating === star) {
        count++;
      }
    });

    return reviews.length === 0 ? 0 :(100 * count) / reviews.length;
  };

  return (
    <div className="review-summary-container">
      
      <div className="total-summary">
        <div className="total-rating">
          <p style={{'fontSize': '20px'}}>
          <span style={{'fontSize': '40px'}}>{rating.toFixed(2)} </span>
           out of <span style={{'fontSize': '35px'}}>5</span>
          </p>
         
      
        </div>
        <div className="d-flex flex-wrap align-items-center mt-2">
        <ReactStars
            classNames='mr-2'
            size={20}
            edit={false}
            color={'#adb5bd'}
            activeColor={'#ffb302'}
            a11y={true}
            isHalf={true}
            emptyIcon={<i className='fa fa-star' />}
            halfIcon={<i className='fa fa-star-half-alt' />}
            filledIcon={<i className='fa fa-star' />}
            value={rating}
          />
          <span style={{fontSize: '20px'}}>({reviews.length} reviews)</span>
        </div>
      </div>
      <div className="review-summary">
        {ratingList.map((rating) => (
          <div key={rating} className="d-flex align-items-center">
            <div className="left">
              <span>{rating} Star</span>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div
                  className={`bar-${rating}`}
                  style={{ width: `${calculateStarsTotal(rating)}%` }}
                ></div>
              </div>
            </div>
            <div className="right">
              <span>{calculateStarsTotal(rating)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
