"use client";
import Image from "next/image";
import { imageSlide } from "../../public/assets";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
// icons
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import BoxCategory from "./components/BoxCategory";
import { FaShoppingBag } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { MdOutlineMasks } from "react-icons/md";
import { GiEyelashes } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiSolidMoon } from "react-icons/bi";
import { BsSun } from "react-icons/bs";

//  home page
export default function HomePage() {
  const router = useRouter();
  const handleShopNow = () => {
    router.push("/cart");
  };
  const listCategory = [
    { link: "/", icon: FaShoppingBag, text: "On sale" },
    { link: "/", icon: SlGraph, text: "Featured" },
    { link: "/", icon: MdOutlineMasks, text: "Masks" },
    { link: "/", icon: GiEyelashes, text: "Eye Care" },
    { link: "/", icon: IoWaterOutline, text: "Moisturizers" },
    { link: "/", icon: AiFillSafetyCertificate, text: "Treatments" },
    { link: "/", icon: BiSolidMoon, text: "Night Care" },
    { link: "/", icon: BsSun, text: "Sun Care" },
    { link: "/", icon: AiFillSafetyCertificate, text: "Treatments" },
    { link: "/", icon: BiSolidMoon, text: "Night Care" },
    { link: "/", icon: BsSun, text: "Sun Care" },
  ];

  return (
    <>
      {/* // slider */}
      <div className=" bg-gray-100 rounded-3xl">
        <div className="grid grid-cols-2 grid-rows-1 py-14 px-40 center">
          <div className="my-auto">
            <span className="label-1">- Skincare Products</span>
            <h1 className="title-1">
              We Offer the Best <br /> Products for your Skin
            </h1>
            <div className="w-[165px]">
              <Button
                className=" bg-main-100 text-button text-[15px]"
                onClick={handleShopNow}
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div>
            <Image
              src={imageSlide}
              width={500}
              height={500}
              alt="imageSlide"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        </div>
      </div>
      {/* // categories */}
      <div className="mt-10 overflow-hidden">
        <span className="label-1">- The Categories</span>
        <div className="flex items-center justify-between">
          <h1 className="title-1">Browse by Category</h1>
          <div className="flex items-center gap-2">
            <GrFormPrevious
              size={26}
              className="cursor-pointer hover:opacity-50"
            />
            <GrFormNext
              size={26}
              className="cursor-pointer hover:opacity-50"
            />
          </div>
        </div>
        {/* list category */}
        <div className="inline-flex gap-3 mt-5">
          {listCategory?.map((item, index) => (
            <BoxCategory
              key={index}
              Icon={item.icon}
              text={item.text}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}
