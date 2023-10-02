"use client";
import ListProduct from "../../components/ListProduct/index";
import { useState } from "react";
import SelectDropdown from "../../components/SelectDropdown/index";
import style from "./index.module.css";
import { GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemove } from "react-icons/io5";

export default function PageCheckOut() {
  const text_checkout = "Check out";
  const [step, set_step] = useState(1);
  const handleClickStep = (text) => {
    if (text == "back") {
      if (step == 1) {
        window.history.back();
        return;
      } else if (step > 4) {
        location.href = "/home";
      } else {
        set_step(step - 1);
      }
    } else if (text == "next") {
      if (step < 1) {
        location.href = "/home";
        return;
      } else if (step >= 4) {
        location.href = "/home";
      } else {
        set_step(step + 1);
      }
    }
  };
  return (
    <div>
      <div className={style.title_checkout}>- Almost There -</div>
      <div className={style.text_checkout}>{text_checkout}</div>
      <div className={style.body_checkout}>
        <div className={style.steps_checkout}>
          <div className={`${style.step_checkout} ${ step > 1  ? style.step_open : ''} ${step == 1 ? style.step_choose : ''}`}>
            1<div className={style.name_step_checkout}>Confirm</div>
          </div>
          <div className={`${style.step_checkout} ${ step > 2  ? style.step_open : ''} ${step == 2 ? style.step_choose : ''}`}>
            2<div className={style.name_step_checkout}>Information</div>
          </div>
          <div className={`${style.step_checkout} ${step > 3 ? style.step_open : ''} ${step == 3 ? style.step_choose : ''}`}>
            3<div className={style.name_step_checkout}>Payment</div>
          </div>
          <div className={`${style.step_checkout} ${step == 4 ? style.step_choose : ''} `}>
            4<div className={style.name_step_checkout}>Invoice</div>
          </div>
        </div>
        {step == 1 && (
          <div className={style.info_step_checkout}>
            <div className={style.title_step}>Confirm</div>
            <div className={style.footer_checkout}>
              <div
                className={style.btn_close_step}
                onClick={() => handleClickStep("back")}
              >
                Close
              </div>
              <div
                className={style.btn_next_step}
                onClick={() => handleClickStep("next")}
              >
                Next
              </div>
            </div>
          </div>
        )}
        {step == 2 && (
          <div className={style.info_step_checkout}>
            <div className={style.title_step}>Information</div>
            <div className={style.footer_checkout}>
              <div
                className={style.btn_close_step}
                onClick={() => handleClickStep("back")}
              >
                Back
              </div>
              <div
                className={style.btn_next_step}
                onClick={() => handleClickStep("next")}
              >
                Next
              </div>
            </div>
          </div>
        )}
        {step == 3 && (
          <div className={style.info_step_checkout}>
            <div className={style.title_step}>Payment</div>
            <div className={style.footer_checkout}>
              <div
                className={style.btn_close_step}
                onClick={() => handleClickStep("back")}
              >
                Back
              </div>
              <div
                className={style.btn_next_step}
                onClick={() => handleClickStep("next")}
              >
                Next
              </div>
            </div>
          </div>
        )}
        {step == 4 && (
          <div className={style.info_step_checkout}>
            <div className={style.title_step}>Invoice</div>
            <div className={style.footer_checkout}>
              <div
                className={style.btn_close_step}
                onClick={() => handleClickStep("back")}
              >
                Back
              </div>
              <div
                className={style.btn_next_step}
                onClick={() => handleClickStep("next")}
              >
                Finish
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
