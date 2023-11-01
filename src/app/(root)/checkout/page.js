"use client";
import { Fragment, useEffect, useState } from "react";
import style from "./index.module.css";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import VietQR from "@/app/components/VietQR";
import { Tabs } from "antd";
import Invoice from "@/app/components/Invoice";
import Link from "next/link";
import toast from "react-hot-toast";

const list_tab = [
  { label: "Cash on delivery", key: 1 },
  { label: "QR Code", key: 2 },
  { label: "Paypal", key: 3 },
];

const accountNo = 103878036095;

export default function PageCheckOut() {
  const [payment_amount, set_payment_amount] = useState(0);
  const [tax, set_tax] = useState(0);
  const [ship, set_ship] = useState(0);
  const [list_shopping_cart, set_list_shopping_cart] = useState([]);
  const text_checkout = "Check out";
  const [step, set_step] = useState(1);
  const [profile, set_profile] = useState();
  const [key_list_tab, set_key_list_tab] = useState(1);
  const [list_banks, set_list_banks] = useState([]);
  const [selected_option, set_selected_option] = useState(0);
  const { data: session } = useSession();
  const [id_invoice, set_id_invoice] = useState();
  const [data_invoice, set_data_invoice] = useState();
  const [validate_step2, set_validate_step2] = useState(false);
  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(`${process.env.HTTPS_URL}/api/cart/my-cart`, { id: session?.user?.id })
          .then((res) => {
            if (res.data.status == true) {
              set_list_shopping_cart(res.data.data.chi_tiet_gio_hang);
            } else {
              toast.error("No Products In Cart");
              location.href = "/shoppingCart";
            }
          })
          .catch((err) => {
            toast.error("No Products In Cart");
            location.href = "/shoppingCart";
          });
      };
      fetchData();
    }
  }, [session?.user?.id]);
  const handleClickStep = (text) => {
    if (text == "back") {
      if (step == 1) {
        window.history.back();
        return;
      } else if (step == 2) {
        set_validate_step2(false);
        set_step(step - 1);
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
        if (
          step == 2 &&
          (profile.ten_nguoi_dung == "" || profile.so_dien_thoai.length < 10 || profile.dia_chi == "")
        ) {
          set_validate_step2(true);
        } else {
          set_step(step + 1);
        }
      }
    }
  };

  const handleRadioChange = (id) => {
    set_selected_option(id);
  };

  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchAmount = async () => {
        await axios
          .post(`${process.env.HTTPS_URL}/api/cart/get-payment-amount`, {
            id: session.user.id,
          })
          .then((response) => {
            set_payment_amount(response.data.amount);
            set_tax(response.data.tax);
            set_ship(response.data.ship);
          })
          .catch((error) => {
            console.error("Error fetching payment amount:", error);
          });
      };

      const fetchProfile = async () => {
        await axios
          .post(`${process.env.HTTPS_URL}/api/user/profile`, { id: session?.user?.id })
          .then((response) => {
            if (response.data.status == true) {
              set_profile(response.data.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching payment amount:", error);
          });
      };
      fetchAmount();
      fetchProfile();
    } else {
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (id_invoice != null) {
      const getInvoice = async () => {
        await axios
          .get(`${process.env.HTTPS_URL}/api/hoa-don/get/${id_invoice}`)
          .then((res) => {
            if (res.data.status == true) {
              set_data_invoice(res.data.data);
            }
          })
          .catch((err) => {});
      };
      getInvoice();
    }
  }, [id_invoice]);

  const createOrder = (data, actions) => {
    postCreateOrder();
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: payment_amount * 1,
          },
        },
      ],
    });
  };
  const postCreateOrder = async () => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/hoa-don/create`, {
        id: session?.user?.id,
        status: false,
        amount: payment_amount,
        name: profile.ten_nguoi_dung,
        phone: profile.so_dien_thoai,
        address: profile.dia_chi,
        tax: tax,
        ship: ship,
      })
      .then((res) => {
        if (res.data.status == true) {
          set_id_invoice(res.data.invoiceID);
        } else {
          return toast.error("Thông Tin Không Đầy Đủ");
        }
      })
      .catch((err) => {
        return toast.error("Thông Tin Không Đầy Đủ");
      });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      axios
        .post(`${process.env.HTTPS_URL}/api/hoa-don/xac-thuc`, {
          id: id_invoice,
          status: true,
        })
        .then((res) => {
          if (res.data.status == true) {
            set_step(4);
          } else {
            return toast.error("Thông Tin Không Đầy Đủ");
          }
        })
        .catch((err) => {
          return toast.error("Thông Tin Không Đầy Đủ");
        });
    });
  };

  const onChangeListTab = (key) => {
    set_key_list_tab(key);
  };
  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = async () => {
    await axios
      .get("https://api.vietqr.io/v2/banks")
      .then((res) => set_list_banks(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleOnChangeProfile = (title, value) => {
    const NewProfile = { ...profile };
    NewProfile[title] = value;
    set_profile(NewProfile);
  };
  const handleConfirm = () => {
    postCreateOrder();
    set_step(4);
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
                  className={`${style.input_form_input} ${
                    validate_step2 == true && profile?.ten_nguoi_dung == "" ? style.validate_input : ""
                  }`}
                  type="text"
                  pattern="[A-Za-zÀ-Ỹà-ỹ\s]*"
                  maxLength="24"
                  value={profile?.ten_nguoi_dung}
                  onChange={(e) => handleOnChangeProfile("ten_nguoi_dung", e.target.value)}
                  onInput={(e) => {
                    let inputValue = e.target.value;
                    if (inputValue.length > 50) {
                      inputValue = inputValue.slice(0, 50);
                    }
                    const sanitizedValue = inputValue.replace(/[^A-Za-zÀ-Ỹà-ỹ\s]/g, "");
                    e.target.value = sanitizedValue;
                  }}
                ></input>
                {validate_step2 == true && profile?.ten_nguoi_dung == "" && (
                  <p style={{ color: "red" }}>* Name can not be empty</p>
                )}
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>Recipient s Phone</div>
                <input
                  className={`${style.input_form_input} ${
                    validate_step2 == true && profile?.so_dien_thoai.length < 10 ? style.validate_input : ""
                  }`}
                  type="text"
                  value={profile?.so_dien_thoai}
                  onChange={(e) => handleOnChangeProfile("so_dien_thoai", e.target.value)}
                  onInput={(e) => {
                    let inputValue = e.target.value;
                    if (inputValue.length > 12) {
                      inputValue = inputValue.slice(0, 12);
                    }
                    const sanitizedValue = inputValue.replace(/[^0-9]/g, "");
                    e.target.value = sanitizedValue;
                  }}
                ></input>
                {validate_step2 == true && profile?.so_dien_thoai.length < 10 && (
                  <p style={{ color: "red" }}>* Invalid phone number </p>
                )}
              </div>

              <div className={style.form_input}>
                <div className={style.title_form_input}>Shipping Address</div>
                <input
                  className={`${style.input_form_input} ${
                    validate_step2 == true && profile?.dia_chi == "" ? style.validate_input : ""
                  }`}
                  type="text"
                  value={profile?.dia_chi}
                  onChange={(e) => handleOnChangeProfile("dia_chi", e.target.value)}
                  onInput={(e) => {
                    let inputValue = e.target.value;
                    if (inputValue.length > 200) {
                      inputValue = inputValue.slice(0, 200);
                    }
                    e.target.value = inputValue;
                  }}
                ></input>
                {validate_step2 == true && profile?.dia_chi == "" && (
                  <p style={{ color: "red" }}>* Address can not be empty</p>
                )}
              </div>
              {/* 
              <div className={style.form_input}>
                <div className={style.title_form_input}>Email</div>
                <input
                  className={style.input_form_input}
                  type="email"
                  value={profile?.email}
                ></input>
              </div> */}
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
              <div className={style.total_price_pay}>Amount to be paid : ${payment_amount}</div>
              <div>Payments</div>
              <Tabs
                onChange={onChangeListTab}
                type="card"
                items={list_tab}
              />
              {key_list_tab == 1 && (
                <div>
                  <div className={style.text_key1}>Cash On Delivery</div>
                </div>
              )}
              {key_list_tab == 2 && (
                <div>
                  <div className="flex flex-wrap gap-1">
                    {list_banks?.map((bank, index) =>
                      bank.transferSupported == 1 ? (
                        <div key={index}>
                          <label>
                            <div
                              className={`${"flex rounded pl-1 border"} ${
                                selected_option == bank.bin ? style.checker_radio : ""
                              }`}
                            >
                              <input
                                type="radio"
                                value={bank.bin}
                                checked={selected_option == bank.bin}
                                onChange={() => handleRadioChange(bank.bin)}
                              />
                              <img
                                src={bank.logo}
                                alt={bank.short_name}
                                width="100"
                              />
                            </div>
                          </label>
                        </div>
                      ) : (
                        " "
                      ),
                    )}
                  </div>
                  {selected_option != 0 ? (
                    <VietQR
                      bin={selected_option}
                      amount={payment_amount}
                      accountNo={accountNo}
                    />
                  ) : (
                    ""
                  )}
                </div>
              )}
              {key_list_tab == 3 && (
                <div>
                  <PayPalScriptProvider options={{ clientId: process.env.CLIENT_ID_PAYPAL }}>
                    <PayPalButtons
                      style={{ layout: "horizontal" }}
                      createOrder={createOrder}
                      onApprove={handleApprove}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
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
                onClick={() => handleConfirm()}
              >
                Confirm
              </div>
            </div>
          </div>
        )}
        {step == 4 && (
          <div className={style.info_step_checkout}>
            <div className={style.title_step}>Invoice</div>
            <div className={style.information_checkout}>
              <Invoice data={data_invoice} />
            </div>
            <div
              className={style.footer_checkout}
              style={{ justifyContent: "center" }}
            >
              <Link href={"/products"}>
                <div
                  className={style.btn_next_step}
                  style={{ width: "150px" }}
                >
                  Buy More
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
