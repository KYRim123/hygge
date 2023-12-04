"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { api_post_getEmail, api_post_sendPwToEmail } from "@/app/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPwPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleSendUn = async () => {
    if (username !== "") {
      const getEmail = await axios.post(api_post_getEmail, { username });
      const resultGetEmail = await getEmail.data;
      if (resultGetEmail?.status) {
        const sendPw = await axios.post(api_post_sendPwToEmail, { id: resultGetEmail?.data.id });
        if (sendPw.status) {
          toast.success("New password is sent to your email!");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          toast.success("The email was not found!");
        }
      } else {
        toast.error("The account's username was not found!");
      }
    }
  };

  const onChange = (e) => {
    setUsername(e.target.value);
  };
  const input = {
    id: "1",
    name: "",
    type: "text",
    errorMessage: "Please enter username!",
    label: "Username",
    value: username,
    onChange: onChange,
  };

  return (
    <>
      <span className="label-1">- forgot password -</span>
      <div className="max-w-md mx-auto">
        <Input {...input} />
        <Button
          onClick={handleSendUn}
          className={"bg-main-100 text-white hover:bg-red-600 mt-2"}
          disabled={username === "" ? true : false}
        >
          Send new password to email
        </Button>
      </div>
    </>
  );
};

export default page;
