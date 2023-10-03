import { AiOutlineShoppingCart } from "react-icons/ai";
import style from "./index.module.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TypeProduct from "../TypeProduct";
import Link from "next/link";

export default function ProductItem({ name, img, sale, type, price }) {
  return (
    <div className={style.product_item}>
      <div className={style.body_product}>
        <div className={style.img_product}>
          <img
            src={img ? img : "https://ui8-hygge.herokuapp.com/hugge/img/card-pic-2.png"}
            alt="aa"
          />
          <div className={`${style.add_to_cart} flex gap-5`}>
            <div>
              <AiOutlineShoppingCart
                size={26}
                className="text-white hover:opacity-50"
              />
            </div>
            <Link href={`http://localhost:3000/products/1`}>
              <IoMdInformationCircleOutline
                size={26}
                className="text-white hover:opacity-50"
              />
            </Link>
          </div>
        </div>
        <div className={style.footer_product}>
          <div className={style.name_product}>{name}</div>
          <div className={style.price_body}>
            <TypeProduct type={type} />
            <div className={`${style.price_product} font-semibold`}>${price}</div>
          </div>
        </div>
      </div>
      {sale != 0 ? <div className={style.product_sale}>{sale}% OFF</div> : ""}
    </div>
  );
}
