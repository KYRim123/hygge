"use client";
import Input from "../Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewLetter = () => {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const gotopageSignIn = () => {
    router.push("/sign-in");
  };
  const onChageInput = (e) => {
    setEmail(e.target.value);
  };
  console.log(email);
  return (
    <div className="p-20 text-center bg-gray-100 mt-20 rounded-3xl">
      <span className="label-1">- Our Newsletter</span>
      <h1 className="title-1">Sign Up to our Newsletter</h1>
      <div className="flex items-center gap-6 mt-20">
        <Input
          placeholder={"Your email"}
          className="outline-main-100 text-xl py-5 px-5 rounded-full"
          onChange={onChageInput}
        />
        <Button
          className={"bg-main-100 text-white"}
          onClick={gotopageSignIn}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default NewLetter;
