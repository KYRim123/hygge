"use client";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function PageCheckOut() {
  const [payment_amount, set_payment_amount] = useState(0);
  const [list_shopping_cart, set_list_shopping_cart] = useState([]);
  const text_checkout = "Check out";
  const [step, set_step] = useState(1);
  const [profile, set_profile] = useState();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(`${process.env.HTTPS_URL}/api/cart/my-cart`, { id: session?.user?.id })
          .then((res) => {
            if (res.data.status == true) {
              set_list_shopping_cart(res.data.data.chi_tiet_gio_hang);
            } else {
            }
          })
          .catch((err) => {});
      };
      fetchData();
    }
  }, [session?.user?.id]);
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
  console.log(payment_amount);

  useEffect(() => {
    if (session?.user?.id != null) {
      if (step == 3) {
        axios
          .post(`${process.env.HTTPS_URL}/api/cart/get-payment-amount`, {
            id: session.user.id,
          })
          .then((response) => {
            set_payment_amount(response.data.amount);
          })
          .catch((error) => {
            console.error("Error fetching payment amount:", error);
          });
      } else if (step == 2) {
        axios
          .post(`${process.env.HTTPS_URL}/api/user/profile`, { id: 10 })
          .then((response) => {
            set_profile(response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching payment amount:", error);
          });
      }
    } else {
    }
  }, [step, session?.user?.id]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: payment_amount,
          },
        },
      ],
    });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Xử lý sau khi thanh toán thành công
    });
  };

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
              <div
                className={`${"relative overflow-x-auto shadow-md sm:rounded-lg"} ${
                  style.list_item_checkout
                }`}
              >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className={style.header_item_checkout}>
                    <tr>
                      <th scope="col">Product name</th>
                      <th scope="col">Number</th>
                      <th scope="col">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list_shopping_cart?.map((item, index) => (
                      <tr
                        className={style.item_checkout}
                        key={index}
                      >
                        <td
                          scope="row"
                          className={style.name_item}
                        >
                          {item?.san_pham?.ten_san_pham}
                        </td>
                        <td className={`${""} ${style.number_item}`}>{item?.so_luong}</td>
                        <td className="p-2">
                          <Image
                            alt="aa"
                            className={style.image_item}
                            width={300}
                            height={250}
                            src={`${process.env.HTTPS_URL}/upload/${item?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                          />
                        </td>
                      </tr>
                    ))}
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
                <div className={style.title_form_input}>Recipient s Name</div>
                <input
                  className={style.input_form_input}
                  type="text"
                  value={profile?.ten_nguoi_dung}
                ></input>
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>Recipient s Phone</div>
                <input
                  className={style.input_form_input}
                  type="text"
                  value={profile?.so_dien_thoai}
                ></input>
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>Shipping Address</div>
                <input
                  className={style.input_form_input}
                  type="text"
                  value={profile?.dia_chi}
                ></input>
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>Email</div>
                <input
                  className={style.input_form_input}
                  type="email"
                  value={profile?.email}
                ></input>
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
            <div className={style.information_checkout}>
              <div>Tổng Tiền Cần Thanh Toán : ${payment_amount}</div>
              <PayPalScriptProvider options={{ clientId: process.env.CLIENT_ID_PAYPAL }}>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={createOrder}
                  onApprove={handleApprove}
                />
              </PayPalScriptProvider>
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
