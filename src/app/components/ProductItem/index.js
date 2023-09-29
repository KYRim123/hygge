import style from './index.module.css'
export default function ProductItem({name,img,sale,type,price}){
    const BG_BLUE = 'FEATURED'
    const BG_ORANGE = 'SUN CARE'
    const BG_GREEN = 'MOISTURIZERS'
    return (
        <div className={style.product_item}>
            <div className={style.body_product}>
                <div className={style.img_product}>
                    <img src="https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png" alt="" />
                    <div className={style.add_to_cart}>
                Add To Cart
            </div>
                </div>
                <div className={style.footer_product}>
                    <div className={style.name_product}>{name}</div>
                    <div className={style.price_body}>
                        <div className={`${style.style_product} ${type == BG_BLUE ? style.bg_blue : ( type == BG_ORANGE ? style.bg_orange : ( type == BG_GREEN ? style.bg_green : style.bg_pink))}` }>{type}</div>
                        <div className={style.price_product}>${price}</div>
                    </div>
                </div>
            </div>
            { sale != 0 ?
            <div className={style.product_sale}>
                {sale}% OFF
            </div> : ''
            }
        </div>
    )
}