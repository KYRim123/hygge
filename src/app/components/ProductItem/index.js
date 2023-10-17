import { AiOutlineShoppingCart } from "react-icons/ai";
import style from "./index.module.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TypeProduct from "../TypeProduct";
import Link from "next/link";
import { BG_BLUE, BG_GREEN, BG_ORANGE } from "../../lib/constants";
import Image from "next/image";

export default function ProductItem({ name, img, sale, type, price }) {
  const ChiLayDu = (number) => {
    const x = number % 5;
    if (x == 1) {
      return BG_BLUE;
    } else if (x == 2) {
      return BG_YELLOW;
    } else if (x == 3) {
      return BG_GREEN;
    } else if (x == 4) {
      return BG_ORANGE;
    } else return BG_ORANGE;
  };

  return (
    <div className={style.product_item}>
      <div className={style.body_product}>
        <div className={style.img_product}>
          <Image
            src={`${process.env.HTTPS_URL}/upload/${img}`}
            alt="aa"
            width={500}
            height={500}
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
            <TypeProduct type={ChiLayDu(type)} />
            <div className={`${style.price_product} font-semibold`}>${price}</div>
          </div>
        </div>
      </div>
      {sale != 0 ? <div className={style.product_sale}>{sale}% OFF</div> : ""}
    </div>
  );
}
