"use client";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import LoadingA from "@/app/components/LoadingA";
import { api_get_UserProfile, api_post_PwProfile, api_post_UserUpdate } from "@/app/lib/api";
import Modal from "@/app/components/Modal";
import { NAME_DC, NAME_EMAIL, NAME_MK, NAME_SDT, NAME_TK, NAME_TND } from "@/app/lib/constants";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const idUser = session?.user?.id;
  const [newImg, setNewImg] = useState("");
  const [data, setData] = useState();
  const [showMdPw, setShowMdPw] = useState(false);
  const [newPw, setNewPw] = useState("");
  const disabledBtChangePw = newPw === "" ? true : false;

  useEffect(() => {
    if (idUser !== null) {
      axios.post(api_get_UserProfile, { id: idUser }).then((res) => setData(res.data.data));
    }
  }, [idUser]);

  if (!data) {
    return <LoadingA />;
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadImg = (e) => {
    const file = e.target?.files[0];
    const newUrl = URL.createObjectURL(file);
    setNewImg(newUrl);
    if (file) {
      setData({ ...data, anh_dai_dien: file });
    }
  };

  async function postProfile(newData) {
    const res = await axios.post(api_post_UserUpdate, newData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const result = await res.data;
    return result;
  }
  const handleSubmit = () => {
    if (newImg === "") {
      const newData = { ...data };
      delete newData.anh_dai_dien;
      postProfile(newData).then((res) => {
        if (res?.status) {
          toast.success("updated !");
        } else {
          toast.success("failed !");
        }
      });
    } else {
      postProfile(data).then((res) => {
        if (res?.status) {
          toast.success("updated !");
        } else {
          toast.success("failed !");
        }
      });
    }
  };

  const handleShowMdPw = () => {
    setShowMdPw(true);
  };

  const handleChagePw = () => {
    axios
      .post(api_post_PwProfile, { id: idUser, mat_khau: newPw })
      .then((res) => {
        toast.success("Password changed successfully!");
      })
      .catch((err) => {
        toast.error("Password change failed!");
      });
  };

  const handleCancel = () => {
    router.push("/");
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
  ];

  return (
    <div>
      <div className="w-full">
        <div className="flex gap-4 items-center max-w-xl mx-auto">
          <label
            htmlFor="upImg"
            className="block w-[250px] h-[250px] cursor-pointer"
          >
            <Image
              src={
                newImg
                  ? newImg
                  : data?.anh_dai_dien === null
                  ? avaReview1
                  : `${process.env.HTTPS_URL}/upload/${data?.anh_dai_dien}`
              }
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
            value={data?.ten_nguoi_dung}
            name="ten_nguoi_dung"
            onChange={onChange}
            errorMessage="It should be a valid email address!"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 my-10 items-center">
        <Input
          label="Email"
          type="email"
          value={data?.email}
          name={NAME_EMAIL}
          onChange={onChange}
          errorMessage="It should be a valid email address!"
        />
        <Input
          label="Phone number"
          type="text"
          value={data?.so_dien_thoai}
          name={NAME_SDT}
          onChange={onChange}
          errorMessage="Please enter phone number!"
        />
        <Input
          label="Address"
          type="text"
          value={data?.dia_chi}
          name={NAME_DC}
          onChange={onChange}
          errorMessage="Please enter address!"
        />
        <div
          className="hover:text-main-100 cursor-pointer text-lg border-[1px] border-white-300 py-1 px-1 rounded-xl w-max bg-gray-300"
          onClick={handleShowMdPw}
        >
          Change password
        </div>
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
      {/* quen mat khau */}
      {showMdPw && (
        <Modal
          setShowModal={setShowMdPw}
          title="Do you want to change your password ?"
          nameButton="Change"
          handleOnClick={handleChagePw}
          disabled={disabledBtChangePw}
        >
          <Input
            label="New Password"
            type="text"
            value={newPw}
            name={NAME_MK}
            onChange={(e) => setNewPw(e.target.value)}
            errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
          />
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
