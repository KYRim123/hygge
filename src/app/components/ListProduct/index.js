import React from 'react'
import style from './index.module.css'
import ProductItem from '../ProductItem/index'

export default function ListProduct(){
    const items = [{
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
    return (
        <div className={style.list_product}>
             {items.map((item, index) => (
                <ProductItem key={index} name={item.name} img={item.img} sale={item.sale} type={item.type} price={item.price}>

                </ProductItem>))}
        </div>
    )
}
