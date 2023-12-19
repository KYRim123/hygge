import TypeProduct from "../TypeProduct";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addItemCart, fetchCart } from "@/app/store/slide/cartSlide";
import { useSession } from "next-auth/react";
import { getStatusCart } from "@/app/store/selector";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProductItem({ id: idProduct, name, img, sale, price, loai_sp }) {
  const priceNew = (price - (price * sale) / 100).toFixed(2);
  const { ten_loai_san_pham } = loai_sp;
  const { data: session } = useSession();
  const idUser = session?.user?.id;
  const dispatch = useDispatch();
  const getStatus = useSelector(getStatusCart);

  const handleAddCart = () => {
    const totalProduct = 1;
    if (idUser != null) {
      dispatch(addItemCart({ idUser, idProduct, totalProduct }));
    } else {
      toast.error("Yêu Cầu Đăng Nhập");
    }
  };

  if (getStatus === "successed_add") {
    dispatch(fetchCart(idUser));
    toast.success("Add to cart successfully!");
  }

  return (
    <div className="group relative w-[250px] mt-10 border-[2px] border-gray-200 rounded-3xl shadow-lg">
      <Link
        href={`/products/${idProduct}`}
        className="relative block bg-gray-100 w-full rounded-3xl hover:opacity-80"
      >
        <Image
          width={300}
          height={250}
          src={`${process.env.HTTPS_URL}/upload/${img}`}
          className="w-full h-[250px] object-cover rounded-3xl"
          alt="mm"
        />
        {sale != 0 && sale !== null && (
          <span className="absolute top-5 -right-10 bg-red-500 text-white font-semibold text-base py-1 px-3 rounded-full">
            {sale}% OFF
          </span>
        )}
      </Link>
      <div
        className="hidden group-hover:block absolute top-1/3 inset-x-0 z-10 cursor-pointer"
        onClick={handleAddCart}
      >
        <div className="text-white w-max bg-main-100 font-bold text-lg p-2 rounded-3xl mx-auto">
          Add to Cart
        </div>
      </div>
      <div className="flex flex-col gap-3 p-2">
        <div className="text-lg font-bold capitalize line-clamp-2">{name}</div>
        <div className="flex gap-2 justify-between items-center">
          <TypeProduct
            text={ten_loai_san_pham}
            price={price}
          />
          <div>
            <span className="text-gray-500 line-through mr-5 text-base">${price}</span> <br />
            <span className="font-bold text-xl">$ {priceNew}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
