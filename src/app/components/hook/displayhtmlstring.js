import React from "react";
import style from "./index.module.css";

function DisplayHTMLString({ htmlString }) {
  const createMarkup = () => {
    return { __html: htmlString };
  };

  return (
    <div
      className={style.body_figure}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
}
export default DisplayHTMLString;
