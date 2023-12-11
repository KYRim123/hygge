"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import {
  api_post_changePass,
  api_post_getEmail,
  api_post_sendPwToEmail,
  api_post_vertiCode,
} from "@/app/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPwPage = () => {
  const [index, setIndex] = useState(0);
  const [idUser, setIdUser] = useState();
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    code: "",
    newPassword: "",
  });
  const inputs = [
    {
      id: "1",
      name: "username",
      type: "text",
      errorMessage: "Please enter username!",
      label: "Username",
      value: data.username,
    },
    {
      id: "2",
      name: "code",
      type: "text",
      errorMessage: "Please enter code!",
      label: "verification codes",
      value: data.code,
    },
    {
      id: "3",
      name: "newPassword",
      type: "text",
      errorMessage: "Please enter new password!",
      label: "Change password",
      value: data.newPassword,
    },
  ];
  const objectPW = [
    {
      btnName: "Send new password to email",
      clickBtn: () => {
        handleSendCode();
      },
    },
    {
      btnName: "send",
      clickBtn: () => {
        handleVertiCode();
      },
    },
    {
      btnName: "change",
      clickBtn: () => {
        handleChangePass();
      },
    },
  ];

  var handleSendCode = async () => {
    if (data.username !== "") {
      const username = data.username;
      const getEmail = await axios.post(api_post_getEmail, { username });
      const resultGetEmail = await getEmail.data;
      if (resultGetEmail?.status) {
        const sendPw = await axios.post(api_post_sendPwToEmail, { id: resultGetEmail?.data.id });
        setIdUser(resultGetEmail?.data.id);
        if (sendPw.status) {
          const role = 1;
          setIndex(role);
          toast.success("Code is sent to " + resultGetEmail?.data?.email);
        } else {
          toast.success("The email was not found!");
        }
      } else {
        toast.error("The account's username was not found!");
      }
    }
  };
  var handleVertiCode = async () => {
    if (data.code !== "") {
      const code = data.code;
      const verti = await axios.post(api_post_vertiCode, { id: idUser, code });
      const result = await verti.data;
      if (result?.status) {
        const role = 2;
        setIndex(role);
        toast.success("Confirmation code is correct!");
      } else {
        toast.error("Confirmation code is incorrect!");
      }
    }
  };
  var handleChangePass = async () => {
    if (data.code !== "") {
      const code = data.code;
      const password = data.newPassword;
      console.log({ id: idUser, code, password });
      const changePw = await axios.post(api_post_changePass, { id: idUser, code, password });
      const result = await changePw?.data;
      if (result?.status) {
        toast.success("Change password successfully!");
        router.push("/login");
      } else {
        toast.error("Password change failed!");
      }
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <span className="label-1">-forgot password -</span>
      <div className="max-w-md mx-auto">
        <Input
          {...inputs[index]}
          onChange={onChange}
        />
        <Button
          onClick={objectPW[index].clickBtn}
          className={"bg-main-100 text-white hover:bg-red-600 mt-2"}
          disabled={data[inputs[index].name] === "" ? true : false}
        >
          {objectPW[index]?.btnName}
        </Button>
      </div>
    </>
  );
};

export default ForgotPwPage;
