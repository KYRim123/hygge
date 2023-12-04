"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { NAME_MK, NAME_TK } from "@/app/lib/constants";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [data, setData] = useState({
    tai_khoan: "xuantuyen",
    mat_khau: "123456aA",
    role: "admin",
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
      router.push("/admin");
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
      </div>
    </div>
  );
};

export default LoginPage;
