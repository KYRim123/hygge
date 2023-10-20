import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewStar = ({star}) => {
  const qStart = Math.floor(parseInt(star));
  switch (qStart) {
    case 1: {
      return (
        <div className="flex">
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
        </div>
      );
    }
    case 2: {
      return (
        <div className="flex">
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
        </div>
      );
    }
    case 3: {
      return (
        <div className="flex">
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
        </div>
      );
    }
    case 4: {
      return (
        <div className="flex">
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiFillStar
            size={15}
            color="#cc005e"
          />
          <AiOutlineStar
            size={15}
            color="#cc005e"
          />
        </div>
      );
    }
  }
  return (
    <div className="flex">
      <AiFillStar
        size={15}
        color="#cc005e"
      />
      <AiFillStar
        size={15}
        color="#cc005e"
      />
      <AiFillStar
        size={15}
        color="#cc005e"
      />
      <AiFillStar
        size={15}
        color="#cc005e"
      />
      <AiFillStar
        size={15}
        color="#cc005e"
      />
      {/* <AiOutlineStar
        size={15}
        color="#cc005e"
      /> */}
    </div>
  );
};

export default ReviewStar;
