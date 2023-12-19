"use client";
import { useEffect, useState } from "react";
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
import { GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemove } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/app/store/slide/cartSlide";
import {
  api_get_HoaDon,
  api_get_MyCart,
  api_get_Qrbank,
  api_get_UserProfile,
  api_post_CreateHoaDon,
  api_post_InforHoaDon,
  api_post_XacThucHoaDon,
  api_post_XacThucInfor,
} from "@/app/lib/api";

const list_tab = [
  { label: "Cash on delivery", key: 1 },
  { label: "QR Code", key: 2 },
  { label: "Paypal", key: 3 },
];

const accountNo = `0898433473`;

export default function PageCheckOut() {
  const [payment_amount, set_payment_amount] = useState(0);
  const [list_shopping_cart, set_list_shopping_cart] = useState([]);
  const text_checkout = "Check out";
  const [step, set_step] = useState(1);
  const [profile, set_profile] = useState();
  const [key_list_tab, set_key_list_tab] = useState(1);
  const [list_banks, set_list_banks] = useState([]);
  const [selected_option, set_selected_option] = useState(0);
  const { data: session } = useSession();
  const [id_invoice, set_id_invoice] = useState(0);
  const [data_invoice, set_data_invoice] = useState();
  const [validate_step2, set_validate_step2] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(api_get_MyCart, { id: session?.user?.id })
          .then((res) => {
            if (res.data.status == true) {
              set_list_shopping_cart(res.data.data.chi_tiet_gio_hang);
            } else {
              toast.error("No Products In Cart");
              router.push("/shoppingCart");
            }
          })
          .catch((err) => {
            toast.error("No Products In Cart");
            router.push("/shoppingCart");
          });
      };
      fetchData();
    }
  }, [session?.user?.id]);

  const handlePlusItemCart = (id) => {
    const updateData = [...list_shopping_cart];
    for (let i = 0; i < updateData.length; i++) {
      if (updateData[i].id === id) {
        updateData[i].so_luong = updateData[i].so_luong * 1 + 1;
        break;
      }
    }
    set_list_shopping_cart(updateData);
  };

  const handleMinusItemCart = (id) => {
    const updateData = [...list_shopping_cart];
    for (let i = 0; i < updateData.length; i++) {
      if (updateData[i].id === id) {
        if (updateData[i].so_luong > 1) {
          updateData[i].so_luong = updateData[i].so_luong * 1 - 1;
        }
        break;
      }
    }
    set_list_shopping_cart(updateData);
  };

  const handleRemoveItem = (id) => {
    const updatedData = list_shopping_cart.filter((item) => item.id != id);
    set_list_shopping_cart(updatedData);
  };

  const handleRadioChange = (id) => {
    set_selected_option(id);
  };

  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchProfile = async () => {
        await axios
          .post(api_get_UserProfile, { id: session?.user?.id })
          .then((response) => {
            if (response.data.status == true) {
              set_profile(response.data.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching payment amount:", error);
          });
      };
      fetchProfile();
    } else {
    }
  }, [session?.user?.id]);

  const getInvoice = async () => {
    const id_invoice_local = localStorage.getItem("id_invoice");
    await axios
      .get(`${api_get_HoaDon}${id_invoice_local}`)
      .then((res) => {
        if (res.data.status == true) {
          set_data_invoice(res.data.data);
        }
      })
      .catch((err) => {});
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Number Invoice : ${id_invoice}`,
          amount: {
            currency_code: "USD",
            value: payment_amount * 1,
          },
        },
      ],
    });
  };

  const postCreateOrder = async () => {
    if (session?.user?.id == null) {
      return router.push("/login");
    }
    if (list_shopping_cart.length < 1) {
      toast.error("None Product Selected");
      return router.push("/shoppingCart");
    }
    await axios
      .post(api_post_CreateHoaDon, {
        id: session?.user?.id,
        data: list_shopping_cart,
      })
      .then((res) => {
        if (res.data.status == true) {
          set_id_invoice(res.data.invoiceID);
          set_payment_amount(res.data.amount);
          localStorage.setItem("id_invoice", res.data.invoiceID);
          toast.success("Order created successfully");
          set_step(2);
        } else {
          return toast.error("Wrong Information");
        }
      })
      .catch((err) => {
        return toast.error("System error");
      });
  };

  const postInfo = async () => {
    if (session?.user?.id == null) {
      return router.push("/login");
    }
    if (profile.ten_nguoi_dung != null && profile.so_dien_thoai != null && profile.dia_chi != null) {
      await axios
        .post(api_post_InforHoaDon, {
          id: id_invoice,
          name: profile.ten_nguoi_dung,
          phone: profile.so_dien_thoai,
          address: profile.dia_chi,
        })
        .then((res) => {
          if (res.data.status == true) {
            toast.success("Add Info Successfully");
            set_step(3);
          } else {
            return toast.error("Wrong Information");
          }
        })
        .catch((err) => {
          return toast.error("System error");
        });
    } else {
      set_validate_step2(true);
      return toast.error("Wrong Information");
    }
  };

  const handleAccuracy = async (id) => {
    await axios
      .post(api_post_XacThucInfor, {
        id_user: session?.user?.id,
        id: id,
        status: true,
      })
      .then((res) => {
        if (res.data.status == true) {
          set_step(4);
          dispatch(fetchCart(session?.user.id));
        } else {
          return toast.error("Wrong Information");
        }
      })
      .catch((err) => {
        return toast.error("Wrong Information");
      });
  };

  const postAccuracyOrder = async () => {
    const id_invoice_local = localStorage.getItem("id_invoice");
    await axios
      .post(api_post_XacThucHoaDon, {
        id_user: session?.user?.id,
        id: id_invoice_local,
        thanh_toan: key_list_tab == 2 ? "Chờ Xác Nhận Thanh Toán" : "Chưa Thanh Toán",
      })
      .then((res) => {
        if (res.data.status == true) {
          set_step(4);
          dispatch(fetchCart(session?.user.id));
        } else {
          return toast.error("Wrong Information");
        }
      })
      .catch((err) => {
        return toast.error("Wrong Information");
      });
  };
  const handleApprove = async (data, actions) => {
    const id_invoice_local = localStorage.getItem("id_invoice");
    try {
      const details = await actions.order.capture();
      await handleAccuracy(id_invoice_local);
      await getInvoice();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeListTab = (key) => {
    set_key_list_tab(key);
  };

  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = async () => {
    await axios
      .get(api_get_Qrbank)
      .then((res) => set_list_banks(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleOnChangeProfile = (title, value) => {
    const NewProfile = { ...profile };
    NewProfile[title] = value;
    set_profile(NewProfile);
  };
  const handleConfirm = async () => {
    await postAccuracyOrder();
    await getInvoice();
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
                      <th scope="col"></th>
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
                        <td className={`${""} ${style.number_item}`}>
                          <div className={style.count_item}>
                            <AiOutlinePlus
                              className={style.plus_count_item}
                              onClick={() => {
                                handlePlusItemCart(item.id);
                              }}
                            />
                            <div className={style.number_count_item}>{item.so_luong}</div>
                            <IoRemove
                              className={style.remove_count_item}
                              onClick={() => {
                                handleMinusItemCart(item.id);
                              }}
                            />
                          </div>
                        </td>
                        <td className="p-2">
                          <Image
                            alt="aa"
                            className={style.image_item}
                            width={300}
                            height={250}
                            src={`${process.env.HTTPS_URL}/upload/${item?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                          />
                        </td>
                        <td>
                          <div className={style.cancel_item}>
                            <GrClose
                              onClick={() => {
                                handleRemoveItem(item.id);
                              }}
                            />
                          </div>
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
                onClick={() => router.push("/shoppingCart")}
              >
                Close
              </div>
              <div
                className={style.btn_next_step}
                onClick={() => postCreateOrder()}
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
            </div>
            <div className={style.footer_checkout}>
              <div
                className={style.btn_close_step}
                onClick={() => set_step(1)}
              >
                Back
              </div>
              <div
                className={style.btn_next_step}
                onClick={() => postInfo()}
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
                              <Image
                                width={100}
                                height={50}
                                src={bank.logo}
                                alt={bank.short_name}
                                className="object-cover w-[100px] h-[50px]"
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
                      id_invoice={id_invoice}
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
                onClick={() => set_step(2)}
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
