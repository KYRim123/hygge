import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Input from "../Input";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function Review() {
  const router = useRouter();
  const gotopageSignIn = () => {
    router.push("/sign-in");
  };
  return (
    <div className="rounded-3xl  bg-gray-100">
      <div className="flex items-center gap-4 p-20">
        <div>
          <span className="label-1">- our reviews</span>
          <h1 className="title-1">What our Customers are Saying</h1>
        </div>
        <div>
          <Image
            width={80}
            height={80}
            src={avaReview1}
            className="p-1 rounded-full border-main-100 border-2"
          />
          <h3 className="title-1">amy smith</h3>
          <p>
            This is the best website I have ordered something from. I highly recommend. I highly recommend.
          </p>
          <div className="flex gap-1 my-10">
            <span className="cursor-pointer w-3 h-3 bg-main-100 rounded-full"></span>
            <span className="cursor-pointer w-3 h-3 bg-white rounded-full border-main-100 border-[1px]"></span>
            <span className="cursor-pointer w-3 h-3 bg-main-100 rounded-full"></span>
          </div>
          <div className="inline-flex gap-2">
            <div className="wrapper-icon--2 hover-icon w-12 h-12">
              <GrFormPrevious size={26} />
            </div>
            <div className="wrapper-icon--2 hover-icon w-12 h-12">
              <GrFormNext size={26} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-20 text-center">
        <span className="label-1">- Our Newsletter</span>
        <h1 className="title-1">Sign Up to our Newsletter</h1>
        <div className="flex items-center gap-6 mt-20">
          <Input
            placeholder={"Your email"}
            className="outline-main-100 text-xl py-5 px-5 rounded-full"
          />
          <Button
            className={"bg-main-100 text-white"}
            onClick={gotopageSignIn}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
