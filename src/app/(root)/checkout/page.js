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

  const items_shopping_cart = [
    {
      id: 1,
      name: "Name 1",
      img: "",
      sale: 20,
      price: 25,
      number: 5,
    },
    {
      id: 2,
      name: "Name 2",
      img: "",
      sale: 10,
      price: 30,
      number: 1,
    },
    {
      id: 3,
      name: "Name 3",
      img: "",
      sale: 15,
      price: 20,
      number: 1,
    },
    {
      id: 4,
      name: "Name 4",
      img: "",
      sale: 10,
      price: 40,
      number: 1,
    },
    {
      id: 5,
      name: "Name 5",
      img: "",
      sale: 0,
      price: 60,
      number: 1,
    },
  ];
  const [list_shopping_cart, set_list_shopping_cart] = useState(items_shopping_cart);

  return (
    <div>
      <div className={style.title_checkout}>- Almost There -</div>
      <div className={style.text_checkout}>{text_checkout}</div>
      <div className={style.body_checkout}>
        <div className={style.steps_checkout}>
          <div
            className={`${style.step_checkout} ${step > 1 ? style.step_open : ""} ${
              step == 1 ? style.step_choose : ""
            }`}
          >
            1<div className={style.name_step_checkout}>Confirm</div>
          </div>
          <div
            className={`${style.step_checkout} ${step > 2 ? style.step_open : ""} ${
              step == 2 ? style.step_choose : ""
            }`}
          >
            2<div className={style.name_step_checkout}>Information</div>
          </div>
          <div
            className={`${style.step_checkout} ${step > 3 ? style.step_open : ""} ${
              step == 3 ? style.step_choose : ""
            }`}
          >
            3<div className={style.name_step_checkout}>Payment</div>
          </div>
          <div className={`${style.step_checkout} ${step == 4 ? style.step_choose : ""} `}>
            4<div className={style.name_step_checkout}>Invoice</div>
          </div>
        </div>
        {step == 1 && (
          <div className={style.info_step_checkout}>
            <div className={style.title_step}>Confirm</div>
            <div className={style.confirm_checkout}>
              <div className={`${"relative overflow-x-auto shadow-md sm:rounded-lg"} ${style.list_item_checkout}`}>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className={style.header_item_checkout}>
                    <tr >
                      <th
                        scope="col"
                      >
                        Product name
                      </th>
                      <th
                        scope="col"
                      >
                        Number
                      </th>
                      <th
                        scope="col"
                      >
                        Image
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={style.item_checkout}>
                      <td
                        scope="row"
                        className={style.name_item}
                      >
                        Apple MacBook Pro
                      </td>
                      <td className={`${""} ${style.number_item}`}>2</td>
                      <td className="p-2"><img className={style.image_item}
                        src="https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png"
                        alt=""
                      /></td>
                    </tr>
                    <tr className={style.item_checkout}>
                      <td
                        scope="row"
                        className={style.name_item}
                      >
                        Apple MacBook Pro
                      </td>
                      <td className={`${""} ${style.number_item}`}>2</td>
                      <td className="p-2"><img className={style.image_item}
                        src="https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png"
                        alt=""
                      /></td>
                    </tr>
                    <tr className={style.item_checkout}>
                      <td
                        scope="row"
                        className={style.name_item}
                      >
                        Apple MacBook Pro
                      </td>
                      <td className={`${""} ${style.number_item}`}>2</td>
                      <td className="p-2"><img className={style.image_item}
                        src="https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png"
                        alt=""
                      /></td>
                    </tr>
                    <tr className={style.item_checkout}>
                      <td
                        scope="row"
                        className={style.name_item}
                      >
                        Apple MacBook Pro
                      </td>
                      <td className={`${""} ${style.number_item}`}>2</td>
                      <td className="p-2"><img className={style.image_item}
                        src="https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png"
                        alt=""
                      /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
            <div className={style.information_checkout}>
              <div className={style.form_input}>
                <div className={style.title_form_input}>
                  Recipient's Name
                </div>
                <input className={style.input_form_input} type="text" defaultValue={"Đinh Xuân Tuyển"}>
                </input>
              </div>
              
              <div className={style.form_input}>
                <div className={style.title_form_input}>
                  Recipient's Phone
                </div>
                <input className={style.input_form_input} type="text" defaultValue={"Đinh Xuân Tuyển"}>
                </input>
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>
                  Shipping Address
                </div>
                <input className={style.input_form_input} type="text" defaultValue={"Đinh Xuân Tuyển"}>
                </input>
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>
                  Email
                </div>
                <input className={style.input_form_input} type="email" defaultValue={"Đinh Xuân Tuyển"}>
                </input>
              </div>

            </div>
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
