"use client";
import BreadcrumbsList from "@/app/components/BreadcrumbsList";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import NewLetter from "@/app/components/Newletter";
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
    name: "FAQ Page",
    link: "#",
  },
];

const FAQ = [
  {
    title: "General",
    content: [
      {
        id: 1,
        title: "How do I place an order on your website?",
        answer:
          "All you need to do to place an order on our wesbite is to choose the product that you would like to buy, then add it to cart and pay for it using any of the supported payment methods.",
        isHidden: true,
      },
      {
        id: 2,
        title: "What is your return policy?",
        answer:
          "All you need to do to place an order on our wesbite is to choose the product that you would like to buy, then add it to cart and pay for it using any of the supported payment methods.",
        isHidden: true,
      },
      {
        id: 3,
        title: "Do you offer an option to send a product as a gift?",
        answer:
          "All you need to do to place an order on our wesbite is to choose the product that you would like to buy, then add it to cart and pay for it using any of the supported payment methods.",
        isHidden: true,
      },
    ],
  },
  {
    title: "Checkout",
    content: [
      {
        id: 1,
        title: "What payment methods do you accept?",
        answer:
          "All you need to do to place an order on our wesbite is to choose the product that you would like to buy, then add it to cart and pay for it using any of the supported payment methods.",
        isHidden: true,
      },
      {
        id: 2,
        title: "Do you offer an option to pay for the product over time?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
    ],
  },
  {
    title: "Shipping",
    content: [
      {
        id: 1,
        title: "Do I have to pay for the shipping?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
      {
        id: 2,
        title: "How long does it take for you to dispatch my order?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
      {
        id: 3,
        title: "What shipping company do you use?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
      {
        id: 4,
        title: "How long does it usually take for my order to arrive?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
    ],
  },
  {
    title: "Discounts",
    content: [
      {
        id: 1,
        title: "Do you offer any discounts on your website?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
    ],
  },
  {
    title: "Other",
    content: [
      {
        id: 1,
        title: "Where can I find the reviews?",
        answer: "Please visit our reviews page to find out more about that.",
        isHidden: true,
      },
      {
        id: 2,
        title: " How do I contact you?",
        answer: "Yes, we do. We have partnered with a few companies that offer such option.",
        isHidden: true,
      },
    ],
  },
];

const list_color = [
  {
    id: 1,
    name: "Red",
  },
  {
    id: 2,
    name: "Blue",
  },
  {
    id: 3,
    name: "Green",
  },
  {
    id: 4,
    name: "Black",
  },
];

export default function FaqPage() {
  const [data, setData] = useState(FAQ);
  const [firstLoadPage, setFirstLoadPage] = useState(true);

  const showData = (index, contentIndex) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index].content[contentIndex].isHidden = false;
      setFirstLoadPage(false);

      return newData;
    });
  };

  const hiddenData = (index, contentIndex) => {
    setData((prev) => {
      const newData = [...prev];
      newData[index].content[contentIndex].isHidden = true;
      setFirstLoadPage(false);

      return newData;
    });
  };

  const handleSelectColor = (id, name) => {
    console.log(id, name);
  };

  return (
    <div className="">
      <BreadcrumbsList arr={breadcrumbsList} />
      <p className="text-blue-500 text-base italic font-semibold mb-2">- Find the Answers</p>
      <div className="text-[40px] font-bold leading-[56px] mb-[72px]">
        <p>Frequently Asked </p>
        <p>Questions</p>
      </div>
      <div className="mb-[72px] flex justify-between">
        <SelectDropdown
          items={list_color}
          title_select="Color"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
      </div>
      {data.map((item, index) => {
        return (
          <div
            className="mb-36"
            key={index}
          >
            <p className="text-[32px] font-bold leading-[48px] mb-12">{item.title}</p>
            <div className="grid grid-cols-2 ">
              {item.content.map((contentItem, contentIndex) => {
                return (
                  <div
                    className={`${contentIndex % 2 !== 0 ? "pl-12" : "pr-6"}
                    ${contentIndex > 1 ? "mt-[72px]" : null}
                    `}
                    key={contentIndex}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-2xl font-semibold max-w-lg leading-10">
                        {contentIndex + 1}.{contentItem.title}
                      </p>

                      <button
                        className="border-inherit border-[1px] w-12 h-12 flex justify-center items-center rounded-full"
                        onClick={() => {
                          contentItem.isHidden
                            ? showData(index, contentIndex)
                            : hiddenData(index, contentIndex);
                        }}
                      >
                        {contentItem.isHidden ? (
                          <BiChevronDown
                            size={34}
                            className={firstLoadPage || "animate-spin0to180"}
                          />
                        ) : (
                          <BiChevronUp
                            size={34}
                            className={"animate-spin180to0"}
                          />
                        )}
                      </button>
                    </div>
                    {contentItem.isHidden ? null : (
                      <p className="max-w-lg pt-[10px] text-[18px] leading-8 animate-fade-down animate-once animate-ease-out">
                        {contentItem.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <NewLetter />
    </div>
  );
}
