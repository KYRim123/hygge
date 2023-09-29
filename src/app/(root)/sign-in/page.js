"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useRouter } from "next/navigation";
import React from "react";

const SignIn = () => {
  const router = useRouter();
  const handleOnLogin = () => {
    router.push("/login");
  };
  const handleSubmit = (e) => {};

  const inputs = [
    {
      id: "1",
      name: "tai_khoan",
      type: "text",
      errorMessage: "User name should be 3-16 characters and shouldn't include any special character!",
      label: "User Name",
      pattern: "[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: "2",
      name: "ten_nguoi_dung",
      type: "text",
      errorMessage: "Please enter full name!",
      label: "Full Name",
      pattern: "[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: "3",
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: "4",
      name: "mat_khau",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: "(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$",
      required: true,
    },
    {
      id: "5",
      name: "dia_chi",
      type: "textArea",
      errorMessage: "Please enter address!",
      label: "Address",
      pattern: "",
      required: true,
    },
    {
      id: "6",
      name: "so_dien_thoai",
      type: "text",
      errorMessage: "Please enter phone number!",
      label: "Phone Number",
      pattern: "",
      required: true,
    },
  ];

  return (
    <div>
      <div>
        <span className="label-1">- Sign Up</span>
        <h1 className="title-1">Create Account</h1>
      </div>
      {/* form */}
      <form>
        <div className="flex flex-wrap gap-4 dadada">
          {inputs?.map((input) => (
            <Input
              key={input.id}
              {...input}
            />
          ))}
        </div>
        <div className="flex gap-2 justify-center mt-3">
          <Button
            className={"bg-main-100 text-white w-[250px]"}
            onClick={handleSubmit}
            type="submit"
          >
            Create Account
          </Button>
          <Button
            className={"bg-white text-black-100 border-2 border-gray-200 w-[250px]"}
            onClick={handleOnLogin}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
