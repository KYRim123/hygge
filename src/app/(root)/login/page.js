"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { NAME_MK, NAME_TK } from "@/app/lib/constants";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();

  const [data, setData] = useState({
    tai_khoan: "luong12345",
    mat_khau: "123456aA",
  });

  const inputs = [
    {
      id: "1",
      name: NAME_TK,
      type: "text",
      errorMessage: "Please user name email!",
      label: "User name",
      value: data.tai_khoan,
    },
    {
      id: "2",
      name: NAME_MK,
      type: "password",
      errorMessage: "Please enter your password!",
      label: "Password",
      value: data.mat_khau,
    },
  ];
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.error) {
      toast.error("User name or password incorrect!");
    } else {
      router.push("/");
    }
  };

  const handleCreateAccount = () => {
    router.push("/sign-in");
  };

  return (
    <div>
      <span className="label-1">- login</span>
      <h1 className="title-1">Login to Your Account</h1>
      <div className="flex gap-4 flex-col items-center ">
        <form id="form">
          <div>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={onChange}
              />
            ))}
          </div>
          <Button
            className={"bg-main-100 text-white w-full hover:bg-red-600"}
            onClick={handleLogin}
            type={"submit"}
          >
            Login
          </Button>
        </form>
        <div className="flex gap-5 items-center">
          <Button
            className={"bg-white text-black-100 border-2 border-gray-200 w-[250px] hover:border-black-100"}
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
          <Link
            className="underline text-xl hover:text-main-100"
            href={"/"}
          >
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
