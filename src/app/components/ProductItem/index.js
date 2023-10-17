import TypeProduct from "../TypeProduct";
import Link from "next/link";
import { BG_BLUE, BG_GREEN, BG_ORANGE } from "../../lib/constants";
import Image from "next/image";

export default function ProductItem({ name, img, sale, type, price }) {
  const priceNew = price - (price * sale) / 100;
  const handleType = (number) => {
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
    <div className="w-[250px] mt-10 border-[2px] border-gray-200 rounded-3xl">
      <Link
        href={`http://localhost:3000/products/1`}
        className="relative block bg-gray-100 w-full rounded-3xl hover:opacity-80"
      >
        <Image
          width={300}
          height={250}
          src={`${process.env.HTTPS_URL}/upload/${img}`}
          className="w-full h-[250px] object-cover rounded-3xl"
          alt="mm"
        />
        {sale !== 0 && (
          <span className="absolute top-11 -right-10 bg-red-500 text-white font-semibold text-lg py-2 px-4 rounded-full">
            {sale}% off
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-3 p-2">
        <div className="text-lg font-bold capitalize">{name}</div>
        <div className="flex gap-2 justify-between items-center">
          <TypeProduct type={handleType(type)} />
          <div>
            <span className="text-gray-500 line-through mr-5 text-base">${price}</span> <br />
            <span className="font-bold text-xl">$ {priceNew}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
