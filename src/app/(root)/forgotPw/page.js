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
  const [crIndex, setCrIndex] = useState(0);
  const [idUser, setIdUser] = useState();
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    code: "",
    newPassword: "",
  });
  const objectPW = [
    {
      btnName: "Send new password to email",
      clickBtn: () => {
        handleSendCode();
      },
      id: "1",
      name: "username",
      type: "text",
      errorMessage: "Please enter username!",
      label: "Username",
      value: data.username,
    },
    {
      btnName: "send",
      clickBtn: () => {
        handleVertiCode();
      },
      id: "2",
      name: "code",
      type: "text",
      errorMessage: "Please enter code!",
      label: "verification codes",
      value: data.code,
    },
    {
      btnName: "change",
      clickBtn: () => {
        handleChangePass();
      },
      id: "3",
      name: "newPassword",
      type: "text",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Change password",
      value: data.newPassword,
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
          setCrIndex(role);
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
        setCrIndex(role);
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
      {objectPW.map(
        (item, index) =>
          crIndex === index && (
            <div key={item.id} className="max-w-md mx-auto">
              <Input
                name={item.name}
                onChange={onChange}
                type={item.type}
                errorMessage={item.errorMessage}
                label={item.label}
                value={item.value}
              />
              <Button
                onClick={item.clickBtn}
                className={"bg-main-100 text-white hover:bg-red-600 mt-2"}
                disabled={item.value === "" ? true : false}
              >
                {item?.btnName}
              </Button>
            </div>
          ),
      )}
    </>
  );
};

export default ForgotPwPage;
