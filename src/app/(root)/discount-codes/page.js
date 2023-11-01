"use client";
import { Tabs } from "antd";
import { BiSolidDiscount } from "react-icons/bi";
import Button from "@/app/components/Button";
import { useState } from "react";

const ListDiscount = [
  {
    content: "1412412412412",
    task: ["1414", "hung"],
  },
  {
    content: "1412412412412",
    task: ["1414", "hung"],
  },
  {
    content: "1412412412412",
    task: ["1414", "hung"],
  },
  {
    content: "1412412412412",
    task: ["1414", "hung"],
  },
];

const ItemDiscount = (list) => {
  const [data, setData] = useState(ListDiscount);

  return (
    <div className="grid grid-cols-2 gap-3">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full h-auto min-h-[88px] border-4 border-pink-500 rounded-xl flex items-center p-2"
          >
            <div className="w-8 h-8 rounded-full bg-rose-400 flex justify-center items-center ">
              <BiSolidDiscount
                color="white"
                size={20}
              />
            </div>
            <div className="w-full h-full ml-1">
              <p className="mb-1">{item.content}</p>
              <div className="flex justify-between">
                <div className="w-[70%] flex">
                  {item.task.map((taskItem, itemIndex) => {
                    return (
                      <div
                        className="px-2 py-1 bg-rose-100 rounded-md text-rose-400 font-medium w-auto mr-2"
                        key={itemIndex}
                      >
                        {taskItem}
                      </div>
                    );
                  })}
                </div>
                <Button className="px-0 py-0 text-rose-400">Áp Dụng</Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function DiscountsPage() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Mã Giảm Giá Hot",
      children: <ItemDiscount list={ListDiscount} />,
    },
    {
      key: "2",
      label: "Dành Riêng Cho Bạn",
      children: <ItemDiscount list={ListDiscount} />,
    },
    {
      key: "3",
      label: "Vouchers",
      children: <ItemDiscount list={ListDiscount} />,
    },
  ];

  return (
    <div className="flex">
      <div className="w-[30%] flex flex-col items-center">
        <div className="w-36 h-36 rounded-full bg-black-100"></div>
        <p>Name</p>
      </div>
      <div className="w-[70%]">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
