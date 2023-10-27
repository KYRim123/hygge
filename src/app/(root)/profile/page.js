"use client";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    ten_nguoi_dung: "nguyen thanh luong",
    email: "luong@gmail.com",
    dia_chi: "quang nam",
    so_dien_thoai: "12333344",
    anh_dai_dien: "",
  });

  // const radios = [
  //   {
  //     id: "male",
  //     name: "gender",
  //     type: "radio",
  //     value: "male",
  //   },
  //   {
  //     id: "female",
  //     name: "gender",
  //     type: "radio",
  //     value: "female",
  //   },
  //   ,
  //   {
  //     id: "other",
  //     name: "gender",
  //     type: "radio",
  //     value: "other",
  //   },
  // ];

  const uploadImg = (e) => {
    const file = e.target?.files[0];
    const newUrl = URL.createObjectURL(file);
    const formdata = new FormData();
    if (file) {
      formdata.append("file", file);
      setData({ ...data, anh_dai_dien: formdata });
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    router.push("/");
  };
  const handleSubmit = () => {
    // axios
    //   .post(`${process.env.HTTPS_URL}/api/user/update`, data, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => console.log(res.data))
    //   .then((err) => console.log(err));
    console.log(data);
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex gap-4 items-center max-w-xl mx-auto">
          <label
            htmlFor="upImg"
            className="block w-[250px] h-[250px] cursor-pointer"
          >
            <Image
              src={data.url === "" ? avaReview1 : data.url}
              alt="avatar"
              width={500}
              height={500}
              priority
              className="object-cover w-full h-full rounded-2xl hover:opacity-70"
            />
          </label>
          <input
            type="file"
            name="upImg"
            id="upImg"
            className="hidden"
            onChange={uploadImg}
          />
          <Input
            label="Full name"
            value={data.ten_nguoi_dung}
            name="ten_nguoi_dung"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 my-10">
        <Input
          label="Email"
          type="email"
          value={data.email}
          name="email"
          onChange={onChange}
        />
        <Input
          label="Phone number"
          type="text"
          value={data.so_dien_thoai}
          name="so_dien_thoai"
          onChange={onChange}
        />
        <Input
          label="Address"
          type="text"
          value={data.dia_chi}
          name="dia_chi"
          onChange={onChange}
        />
        <Link
          className="underline text-xl hover:text-main-100"
          href={"/"}
        >
          Change password
        </Link>
        {/* <div className="flex gap-5 items-center">
          <label>Gender</label>
          {radios.length > 0 &&
            radios.map((radio, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <label
                  htmlFor={radio.id}
                  className={`${
                    radio.id === data.gender ? "bg-main-100" : ""
                  } border-main-100 block border-[2px] w-5 h-5 rounded-full cursor-pointer`}
                ></label>
                <label className="capitalize">{radio.id}</label>
                <input
                  type={radio.type}
                  name={radio.name}
                  id={radio.id}
                  value={radio.value}
                  className="hidden"
                  onChange={onChange}
                />
              </div>
            ))}
        </div> */}
      </div>
      <div className="mt-5 flex gap-2 justify-center">
        <Button
          onClick={handleCancel}
          className={"text-black-100 border-[2px] border-gray-300 mr-2 w-[160px]"}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className={"bg-main-100 text-white border-[2px] border-gray-300 w-[160px]"}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
