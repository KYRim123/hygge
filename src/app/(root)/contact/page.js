"use client";
import BreadcrumbsList from "@/app/components/BreadcrumbsList";
import Input from "@/app/components/Input";
import { useState } from "react";
import Button from "@/app/components/Button";
import SelectDropdown from "@/app/components/SelectDropdown";

const breadcrumbsList = [
  {
    name: "Home",
    link: "#",
  },
  {
    name: "Categories",
    link: "#",
  },
  {
    name: "Contact Us",
    link: "#",
  },
];

export default function PageContact() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    subject: 1,
    message: "",
  });

  const send = () => {
    console.log(data);
  };

  return (
    <div className="">
      <BreadcrumbsList arr={breadcrumbsList} />
      <p className="text-blue-500 text-base italic font-semibold mb-2">- Find the Answers</p>
      <div className="text-[40px] font-bold leading-[56px] mb-[72px]">
        <p>We are always here to </p>
        <p>help you</p>
      </div>
      <div className="grid grid-cols-2 gap-y-10 gap-x-24 mb-36">
        <div>
          <p className="text-2xl font-semibold mb-4">Customer Services</p>
          <p className="leading-8">
            Please send us an email at
            <span className="font-semibold ml-1">
              <a
                className="decoration-solid underline"
                href="#"
              >
                customercare@hygge.com
              </a>
            </span>
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Public Relations</p>
          <p className="leading-8">
            You can contact our media team by sending them an email at
            <span className="font-semibold ml-1">
              <a
                className="decoration-solid underline"
                href="#"
              >
                media@hygge.com
              </a>
            </span>
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Large Orders</p>
          <p className="leading-8">
            If you are thinking of making a very large order, plese feel free to contact us at
            <span className="font-semibold ml-1 mr-1 ">
              <a
                className="decoration-solid underline"
                href="#"
              >
                sales@hygge.com
              </a>
            </span>
            and we will give you a special discount
          </p>
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Other Enquiries</p>
          <p className="leading-8">
            For all of your other questions, please send us an email at
            <span className="font-semibold ml-1">
              <a
                className="decoration-solid underline"
                href="#"
              >
                general@hygge.com
              </a>
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 mb-36">
        <div className="pl-12 pr-12">
          <p className="text-blue-500 text-base italic font-semibold mb-2">- Find the Answers</p>
          <div className="text-[40px] font-bold leading-[56px] mb-[72px]">
            <p>Please fill out the</p>
            <p>contact form</p>
          </div>
        </div>
        <div className="pl-12 pr-12">
          <div className="mb-12">
            <p className="mb-2">Full Name</p>
            <Input
              width={"w-full"}
              onChange={(e) =>
                setData({
                  ...data,
                  fullName: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-12">
            <p className="mb-2">Email Address</p>
            <Input
              width={"w-full"}
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-12">
            <p className="mb-2">Subject</p>
            <SelectDropdown title_select="Color"></SelectDropdown>
          </div>
          <div className="mb-12">
            <p className="mb-2">Message</p>
            <textarea
              id="message"
              rows="9"
              class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-200 resize-none active:outline-main-100 focus:outline-main-100"
              onChange={(e) =>
                setData({
                  ...data,
                  message: e.target.value,
                })
              }
            ></textarea>
          </div>
          <Button
            className=" bg-main-100 text-button text-[15px]"
            onClick={send}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
