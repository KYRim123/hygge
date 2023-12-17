"client"
import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import style from "./index.module.css";

export const Editor = ({onChange , value}) => {
  return (
    <div className={style.text_editor}>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
