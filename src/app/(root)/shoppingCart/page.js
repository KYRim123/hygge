"use client";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import { GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemove } from "react-icons/io5";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/app/store/slide/cartSlide";
import { api_delete_ProductCart, api_get_ChangeCart, api_get_MyCart } from "@/app/lib/api";

export default function PagesShoppingCart() {
  const text_shopping_cart = "Shopping Cart";
  const [data, set_data] = useState([]);
  const SHIP = 10;
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(api_get_MyCart, { id: session?.user?.id })
          .then((res) => {
            if (res.data.status == true) {
              set_data(res.data.data.chi_tiet_gio_hang);
            } else {
            }
          })
          .catch((err) => {});
      };
      fetchData();
    }
  }, [session?.user?.id]);
  const SUBTOTAL = data.reduce((accumulator, item) => {
    return (
      accumulator + (item.san_pham.gia - (item.san_pham.gia * item.san_pham.khuyen_mai) / 100) * item.so_luong
    );
  }, 0);
  const TAX = SUBTOTAL * 0.1;
  const TOTAL = SUBTOTAL + TAX + SHIP;
  const handlePlusItemCart = (id) => {
    const updatedData = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].id === id) {
        updatedData[i].so_luong = updatedData[i].so_luong * 1 + 1;
        changeNumberItemCard(updatedData[i].id, updatedData[i].so_luong);
        break;
      }
    }
    set_data(updatedData);
  };

  const handleMinusItemCart = (id) => {
    const updatedData = [...data];
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].id === id) {
        if (updatedData[i].so_luong > 1) {
          updatedData[i].so_luong = updatedData[i].so_luong * 1 - 1;
          changeNumberItemCard(updatedData[i].id, updatedData[i].so_luong);
        }
        break;
      }
    }
    set_data(updatedData);
  };

  const changeNumberItemCard = async (id, number) => {
    await axios
      .post(api_get_ChangeCart, { id: id, so_luong: number })
      .then((res) => {
        if (res.data.status == true) {
        } else {
        }
      })
      .catch((err) => {});
  };

  const handleRemoveItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    set_data(updatedData);
    RemoveItemCard(id);
  };

  const RemoveItemCard = async (id) => {
    if (session?.user?.id != null) {
      const fetchData = async () => {
        await axios
          .post(api_delete_ProductCart, { id: session?.user?.id, id_item: id })
          .then((res) => {
            if (res.data.status == true) {
              toast.success("Removed item");
              dispatch(fetchCart(session?.user.id));
            } else {
            }
          })
          .catch((err) => {});
      };
      fetchData();
    }
  };

  return (
    <div>
      <div className={style.title_shopping_cart}>- Your Cart -</div>
      <div className={style.text_shopping_cart}>{text_shopping_cart}</div>
      <div className={style.body_shopping_cart}>
        <div className={style.list_item_shopping_cart}>
          {data.map((item, index) => (
            <div
              className={style.item_cart}
              key={index}
            >
              <div className={style.img_item_cart}>
                <Image
                  alt="aa"
                  className={style.image_item}
                  width={300}
                  height={250}
                  src={`${process.env.HTTPS_URL}/upload/${item.san_pham.hinh_anh[0]?.hinh_anh_san_pham}`}
                />
              </div>
              <div className={style.info_item_cart}>
                <b className="text-2xl">{item.san_pham.ten_san_pham}</b>
                <div>
                  <b className="text-xl">
                    ${item.san_pham.gia - (item.san_pham.gia * item.san_pham.khuyen_mai) / 100}
                  </b>
                  {item.san_pham.khuyen_mai > 0 ? (
                    <span className="text-xl ml-5 line-through">&nbsp;${item.san_pham.gia}&nbsp;</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className={style.footer_item_cart}>
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
                  <div className={style.cancel_item}>
                    <GrClose
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={style.cart_total}>
          <div className={style.title_cart_total}>Cart Total</div>
          <hr></hr>
          <div className={style.text_total_child}>
            <p>SubTotal</p>
            <p className={style.price_child}>${SUBTOTAL.toFixed(2)}</p>
          </div>
          <div className={style.text_total_child}>
            <p>Tax</p>
            <p className={style.price_child}>${TAX.toFixed(2)}</p>
          </div>
          <div className={style.text_total_child}>
            <p>Shipping</p>
            <p className={style.price_child}>${SHIP.toFixed(2)}</p>
          </div>
          <hr></hr>
          <div className={style.total_price}>
            <p>Total</p>
            <p className={style.price_child}>${TOTAL.toFixed(2)}</p>
          </div>
          <Link href={"/checkout"}>
            <div className={style.btn_checkout_cart}>Check Out</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
