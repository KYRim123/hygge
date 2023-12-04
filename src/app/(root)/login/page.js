"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [data, setData] = useState({
    tai_khoan: "",
    mat_khau: "",
  });

  const inputs = [
    {
      id: "1",
      name: "",
      ten_input: "tai_khoan",
      type: "text",
      errorMessage: "Please Username!",
      label: "Username",
      value: data.tai_khoan,
    },
    {
      id: "2",
      name: "",
      ten_input: "mat_khau",
      type: "password",
      errorMessage: "Please Enter Your Password!",
      label: "Password",
      value: data.mat_khau,
    },
  ];
  const onChange = (e, ten_input) => {
    setData({ ...data, [ten_input]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.error) {
      toast.error("User name or password incorrect!");
    } else {
      router.push("/");
      router.refresh();
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
                width={"w-[350px]"}
                {...input}
                onChange={(e) => onChange(e, input.ten_input)}
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
            href={"/forgot_pw"}
          >
            Forgot Password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
