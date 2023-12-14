import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Review() {
  const [crCmt, setCrCmt] = useState(0);
  const refTimeOut = useRef();
  const dbReviews = [
    {
      name: "amy smith1",
      img: avaReview1,
      cmt: "This is the best website I have ordered something from. I highly recommend. I highly recommend.",
    },
    {
      name: "amy smith2",
      img: avaReview1,
      cmt: "This is the best website I have ordered something from. I highly recommend. I highly recommend.",
    },
    {
      name: "amy smith3",
      img: avaReview1,
      cmt: "This is the best website I have ordered something from. I highly recommend. I highly recommend.",
    },
    {
      name: "amy smith4",
      img: avaReview1,
      cmt: "This is the best website I have ordered something from. I highly recommend. I highly recommend.",
    },
    {
      name: "amy smith5",
      img: avaReview1,
      cmt: "This is the best website I have ordered something from. I highly recommend. I highly recommend.",
    },
  ];
  const lengthdbReviews = dbReviews?.length - 1;
  const delaySlideReview = 6000;

  useEffect(() => {
    refTimeOut.current = setTimeout(() => {
      setCrCmt(crCmt === lengthdbReviews ? 0 : crCmt + 1);
    }, delaySlideReview);
    return () => clearTimeout(refTimeOut.current);
  }, [crCmt]);

  const onClikBtnCmt = useCallback((crIndex) => {
    setCrCmt(crIndex);
    clearTimeout(refTimeOut.current);
  }, []);

  return (
    <div className="rounded-3xl  bg-gray-100">
      <div className="flex items-center gap-4 p-20">
        <div>
          <span className="label-1">- our reviews</span>
          <h1 className="title-1">What our Customers are Saying</h1>
        </div>
        <div className="w-6/12">
          <div className="whitespace-nowrap overflow-hidden">
            {dbReviews?.length > 0 &&
              dbReviews.map((item, index) => (
                <div
                  key={index}
                  className={`w-full whitespace-normal inline-block transition-transform`}
                  style={{ transform: `translateX(calc(-100% * ${crCmt}))` }}
                >
                  <Image
                    width={80}
                    height={80}
                    src={item.img}
                    className="p-1 rounded-full border-main-100 border-2"
                    alt="adas"
                  />
                  <h3 className="title-1">{item?.name}</h3>
                  <p>{item?.cmt}</p>
                </div>
              ))}
          </div>
          <div className="flex gap-2 my-10">
            {dbReviews?.length > 0 &&
              dbReviews.map((item, index) => (
                <span
                  key={index}
                  onClick={() => onClikBtnCmt(index)}
                  className={`cursor-pointer w-3 h-3  rounded-full transition-colors ${
                    crCmt !== index ? "bg-white border-[1px] border-gray-600" : "bg-main-100"
                  }`}
                ></span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
