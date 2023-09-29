"use client"
import ListProduct from "../../components/ListProduct/index"
import { useState } from "react"
import SelectDropdown from "../../components/SelectDropdown/index"
import style from "./index.module.css"
import { GrClose } from "react-icons/gr"
import { AiOutlinePlus } from "react-icons/ai"
import { IoRemove } from "react-icons/io5"


export default function PagesShoppingCart(){
    const handleSelectColor = (id,name) =>{
        console.log(id,name)
    }
    const text_shopping_cart = 'Shopping Cart';
    const items_shopping_cart =  [{
        name:'Name 1',
        img: '',
        sale: 20,
        type: 'EYE CARE',
        price: 25
    },
    {
        name:'Name 2',
        img: '',
        sale: 10,
        type: 'SUN CARE',
        price: 30
    },
    {
        name:'Name 3',
        img: '',
        sale: 15,
        type: 'TREATMENTS',
        price: 20
    },
    {
        name:'Name 4',
        img: '',
        sale: 10,
        type: 'MOISTURIZERS',
        price: 40
    },
    {
        name:'Name 5',
        img: '',
        sale: 0,
        type: 'FEATURED',
        price: 60
    }];
    const count_items_shopping_cart = items_shopping_cart.length;
   
    
    return(
        <div>
            <div className={style.title_shopping_cart}>- Your Cart -</div>
            <div className={style.text_shopping_cart}>{text_shopping_cart}</div>
            <div className={style.body_shopping_cart}>
                <div className={style.list_item_shopping_cart}>
                    {items_shopping_cart.map((item, index) => (
                        <div className={style.item_cart} key={index}>
                            <div className={style.img_item_cart}>
                                <img src="https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png" alt="" />
                            </div>
                            <div className={style.info_item_cart}>
                                <b className="text-2xl">{item.name}</b>
                                <b className="text-xl">${item.price}</b>
                                <div className={style.footer_item_cart}>
                                    <div className={style.count_item}>
                                       <AiOutlinePlus className={style.plus_count_item}/>
                                        <div className={style.number_count_item}>11</div>
                                      <IoRemove className={style.remove_count_item}/>
                                    </div>
                                    <div className={style.cancel_item}>
                                        <GrClose/>
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
                        <p className={style.price_child}>$500</p>
                    </div>
                    <div className={style.text_total_child}>
                        <p>Tax</p>
                        <p className={style.price_child}>$500</p>
                    </div>
                    <div className={style.text_total_child}>
                        <p>Shipping</p>
                        <p className={style.price_child}>$500</p>
                    </div>
                    <hr></hr>
                    <div className={style.total_price}>
                        <p>Total</p>
                        <p className={style.price_child}>$500</p>
                    </div>
                    <div className={style.btn_checkout_cart}>Check Out</div>
                </div>
            </div>
        </div>
    )
}