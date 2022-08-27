import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewList = ({ review }) => {
  const createdAt = new Date(review.createdAt).toLocaleDateString();
  return (
    <div style={{ backgroundColor: "white" }} className="py-3 my-3">
      <div className="d-flex flex-column">
        <div
          className="d-flex justify-content-between py-3 review-box  "
          key={review._id}
        >
          <div className="d-flex justify-content-start">
          <div className="mx-3 pt-3">
            <div
              className="d-flex flex-column justify-content-center align-items-center fw-1 text-white avatar rounded-circle"
              style={{
                backgroundColor: "green",
                width: "60px",
                height: "60px",
                fontSize: "25px",
              }}
            >
              {review.name.split("")[0].toUpperCase()}
            </div>
          </div>
          <h4 className="mt-3  one-line-ellipsis align-self-center">{review.name}</h4>
          </div>
         
          <div className="p-4 p-lg-4 ">
            <div className="d-flex align-items-start justify-content-between">
              <ReactStars
                size={18}
                edit={false}
                color={"#adb5bd"}
                activeColor={"#ffb302"}
                a11y={true}
                isHalf={true}
                emptyIcon={<i className="fa fa-star" />}
                halfIcon={<i className="fa fa-star-half-alt" />}
                filledIcon={<i className="fa fa-star" />}
                value={review.rating}
              />
            </div>
           
          </div>
        </div>
        <div>
        <p
              style={{ textAlign: "start" }}
              className="px-4 three-line-ellipsis word-break-all "
            >
             {review.comment}
            </p>
        </div>
        <div className="d-flex justify-content-end align-items-end ">
          <p className="px-3 fs-12">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
