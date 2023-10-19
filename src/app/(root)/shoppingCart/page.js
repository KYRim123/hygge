"use client";
import ListProduct from "../../components/ListProduct/index";
import { useState } from "react";
import SelectDropdown from "../../components/SelectDropdown/index";
import style from "./index.module.css";
import { GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { IoRemove } from "react-icons/io5";
import Image from "next/image";

export default function PagesShoppingCart() {
  const handleSelectColor = (id, name) => {
    console.log(id, name);
  };
  const text_shopping_cart = "Shopping Cart";
  const SHIP = 10;
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
  const count_items_shopping_cart = items_shopping_cart.length;
  const SUBTOTAL = list_shopping_cart.reduce((accumulator, item) => {
    return accumulator + (item.price - (item.price * item.sale) / 100) * item.number;
  }, 0);
  const TAX = SUBTOTAL * 0.05;
  const TOTAL = SUBTOTAL + TAX + SHIP;
  const handlePlusItemCart = (id) => {
    const updatedListShoppingCart = [...list_shopping_cart];
    for (let i = 0; i < updatedListShoppingCart.length; i++) {
      if (updatedListShoppingCart[i].id === id) {
        updatedListShoppingCart[i].number += 1;
        break;
      }
    }
    set_list_shopping_cart(updatedListShoppingCart);
  };

  const handleMinusItemCart = (id) => {
    const updatedListShoppingCart = [...list_shopping_cart];
    for (let i = 0; i < updatedListShoppingCart.length; i++) {
      if (updatedListShoppingCart[i].id === id) {
        if (updatedListShoppingCart[i].number > 1) {
          updatedListShoppingCart[i].number -= 1;
        }
        break;
      }
    }
    set_list_shopping_cart(updatedListShoppingCart);
  };

  return (
    <div>
      <div className={style.title_shopping_cart}>- Your Cart -</div>
      <div className={style.text_shopping_cart}>{text_shopping_cart}</div>
      <div className={style.body_shopping_cart}>
        <div className={style.list_item_shopping_cart}>
          {list_shopping_cart.map((item, index) => (
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
                  src={`${process.env.HTTPS_URL}/upload/${"img"}`}
                />
              </div>
              <div className={style.info_item_cart}>
                <b className="text-2xl">{item.name}</b>
                <div>
                  <b className="text-xl">${item.price - (item.price * item.sale) / 100}</b>
                  {item.sale > 0 ? (
                    <span className="text-xl ml-5 line-through">&nbsp;${item.price}&nbsp;</span>
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
                    <div className={style.number_count_item}>{item.number}</div>
                    <IoRemove
                      className={style.remove_count_item}
                      onClick={() => {
                        handleMinusItemCart(item.id);
                      }}
                    />
                  </div>
                  <div className={style.cancel_item}>
                    <GrClose />
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
            <p className={style.price_child}>${TOTAL}</p>
          </div>
          <div className={style.btn_checkout_cart}>Check Out</div>
        </div>
      </div>
    </div>
  );
}
