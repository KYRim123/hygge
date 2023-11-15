import Image from 'next/image';
import Link from 'next/link';
 
const ItemPurchase = ({index, item_child}) => {
  return (
    <div
      key={index}
      className="flex items-center gap-3 px-2 py-4 shadow-md border-[1px] border-gray-100 rounded-md"
    >
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-lg">Code Orders :</h4> <span>{item_child.id}</span>
      </div>
      <div className="flex-grow px-6">
        {item_child?.chi_tiet_hoa_don?.map((item_chi_tiet, key_chi_tiet) => (
          <div
            key={key_chi_tiet}
            className={`flex items-center gap-10 py-2 ${
              key_chi_tiet > 0 ? "border-t-2 border-gray-200-100 border-dotted" : ""
            }`}
          >
            <Image
              src={`${process.env.HTTPS_URL}/upload/${item_chi_tiet?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
              width={50}
              height={50}
              alt="imageSlide"
              style={{ objectFit: "cover" }}
              priority={true}
              className="w-[50px] h-[50px] rounded-xl bg-gray-100 mx-8"
            />
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg">Quantity : </h4> <span>{item_chi_tiet?.so_luong}</span>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg">Name Item : </h4>{" "}
              <span>{item_chi_tiet?.san_pham?.ten_san_pham}</span>
            </div>
            <div></div>
          </div>
        ))}
      </div>
      <Link
        href={`/bill/status/${item_child.id}`}
        className="py-3 px-2 bg-main-100 rounded-xl hover:opacity-70"
      >
        <div className="text-white font-normal">View Status</div>
      </Link>
      <Link
        href={`/invoice/${item_child.id}`}
        className="py-3 px-2 bg-main-100 rounded-xl hover:opacity-70"
      >
        <div className="text-white font-normal">View Invoice</div>
      </Link>
    </div>
  );
}

export default ItemPurchase
