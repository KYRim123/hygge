import React from 'react'
import style from './index.module.css'
import ProductItem from '../ProductItem/index'

export default function ListProduct({prop_items}){
    return (
        <div className={style.list_product}>
             {prop_items.map((item, index) => (
                <ProductItem key={index} name={item.name} img={item.img} sale={item.sale} type={item.type} price={item.price}>
                </ProductItem>))}
        </div>
    )
}
