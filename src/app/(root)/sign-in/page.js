"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NAME_TK, NAME_TND, NAME_EMAIL, NAME_MK, NAME_DC, NAME_SDT } from "../../../app/lib/constants";
import { api_get_UserCreate } from "@/app/lib/api";

const SignInPage = () => {
  const router = useRouter();
  const emailInLocalStore = localStorage.getItem("email");
  const [data, setData] = useState({
    tai_khoan: "",
    mat_khau: "",
    ten_nguoi_dung: "",
    email: emailInLocalStore,
    dia_chi: "",
    so_dien_thoai: "",
  });
  const checkInputEmpt = Object.values(data).includes("");

  const handleOnLogin = (e) => {
    e.preventDefault();
    router.push("/login");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(api_get_UserCreate, data)
      .then((res) => {
        if (res?.data?.status == true) {
          toast.success("Create Anaccount is successfull !");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => toast.error("Create Anaccount is failure !"));
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: "1",
      name: NAME_TK,
      type: "text",
      errorMessage: "User name must be 3-16 characters and only lowercase letters!",
      label: "Username",
      value: data.tai_khoan,
    },
    {
      id: "2",
      name: NAME_TND,
      type: "text",
      errorMessage: "Full name must be 9-50 characters and shouldn't include any special character!",
      label: "Full Name",
      value: data.ten_nguoi_dung,
    },
    {
      id: "3",
      name: NAME_EMAIL,
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      value: data.email,
    },
    {
      id: "4",
      name: NAME_MK,
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$",
      value: data.mat_khau,
    },
    {
      id: "5",
      name: NAME_DC,
      type: "text",
      errorMessage: "Please enter address!",
      label: "Address",
      value: data.dia_chi,
    },
    {
      id: "6",
      name: NAME_SDT,
      type: "text",
      errorMessage: "Please enter phone number!",
      label: "Phone Number",
      value: data.so_dien_thoai,
    },
  ];

  return (
    <div>
      <div>
        <span className="label-1">- Sign Up</span>
        <h1 className="title-1">Create Account</h1>
      </div>
      {/* form */}
      <form id="form">
        <div className="flex flex-wrap gap-4">
          {inputs?.map((input) => (
            <Input
              key={input.id}
              width={"w-[350px]"}
              {...input}
              onChange={onChange}
            />
          ))}
        </div>
        <div className="flex gap-2 justify-center mt-3">
          <Button
            className={"bg-main-100 text-white w-[250px] hover:bg-red-600"}
            onClick={handleSubmit}
            type={"submit"}
            disabled={checkInputEmpt}
          >
            Create Account
          </Button>
          <Button
            className={"bg-white text-black-100 border-2 border-gray-200 w-[250px] hover:border-black-100"}
            onClick={handleOnLogin}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
