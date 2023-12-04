"use client";
import BreadcrumbsList from "@/app/components/BreadcrumbsList";
import NewLetter from "@/app/components/Newletter";
import SelectDropdown from "@/app/components/SelectDropdown";
import axios from "axios";
import { api_get_FaqTitleList, api_get_faq } from "@/app/lib/api";
import LoadingA from "@/app/components/LoadingA";
import QuestionFaq from "./QuestionFaq";
import { useEffect, useState } from "react";

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

export default function FaqPage() {
  const [listFaq, setListFaq] = useState([]);
  const [listTitle, setListTile] = useState();
  const [crIdtitle, setCrIdTitle] = useState();

  useEffect(() => {
    const fetchFAQ = axios
      .get(api_get_faq)
      .then((res) => res?.data.data)
      .catch((err) => err);
    const fetchSelect = axios
      .get(api_get_FaqTitleList)
      .then((res) => res?.data.data)
      .catch((err) => err);

    Promise.all([fetchFAQ, fetchSelect])
      .then(([listFaq, listSelect]) => {
        setListFaq(listFaq);
        const newListTitle = listSelect.map((item) => {
          return { id: item.id, name: item.ten_chu_de };
        });
        newListTitle.push({ id: null, name: "All" });
        setListTile(newListTitle);
      })
      .catch((err) => console.log(err));
  }, []);

  if (listFaq.length === 0) {
    return <LoadingA />;
  }

  const handleSelectColor = (id, name) => {
    setCrIdTitle(id);
  };

  function findArrayInTitle(array, targetId) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === targetId) {
        return [array[i]];
      }
    }
    return array;
  }

  return (
    <div>
      {/* <BreadcrumbsList arr={breadcrumbsList} /> */}
      <p className="text-blue-500 text-base italic font-semibold mb-2">- Find the Answers</p>
      <div className="text-[40px] font-bold leading-[56px] mb-[72px]">
        <p>Frequently Asked </p>
        <p>Questions</p>
      </div>
      <div className="w-full ml-[100%]">
        <SelectDropdown
          items={listTitle}
          title_select="All"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
      </div>
      {listFaq &&
        findArrayInTitle(listFaq, crIdtitle).map((item, index) => {
          return (
            <div
              className="mb-36"
              key={index}
            >
              <h1 className="text-[32px] font-bold leading-[48px] mb-12">{item?.ten_chu_de}</h1>
              <div className="flex gap-8 justify-between flex-wrap">
                {item?.f_a_q.map((contentItem, contentIndex) => (
                  <QuestionFaq
                    key={contentIndex}
                    contentItem={contentItem}
                    contentIndex={contentIndex}
                  />
                ))}
              </div>
            </div>
          );
        })}

      <NewLetter />
    </div>
  );
}
