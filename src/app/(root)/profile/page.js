"use client";
import Image from "next/image";
import { avaReview1 } from "../../../../public/assets";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import LoadingA from "@/app/components/LoadingA";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const idUser = session?.user?.id;
  const [newImg, setNewImg] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    if (idUser !== null) {
      axios
        .post(`${process.env.HTTPS_URL}/api/user/profile`, { id: idUser })
        .then((res) => setData(res.data.data));
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
    const res = await axios.post(`${process.env.HTTPS_URL}/api/user/update`, newData, {
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

  const handleCancel = () => {
    router.push("/");
  };

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
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 my-10 items-center">
        <Input
          label="Email"
          type="email"
          value={data?.email}
          name="email"
          onChange={onChange}
        />
        <Input
          label="Phone number"
          type="text"
          value={data?.so_dien_thoai}
          name="so_dien_thoai"
          onChange={onChange}
        />
        <Input
          label="Address"
          type="text"
          value={data?.dia_chi}
          name="dia_chi"
          onChange={onChange}
        />
        <Link
          className="underline text-xl hover:text-main-100"
          href={"/"}
        >
          Change password
        </Link>
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
    </div>
  );
};

export default ProfilePage;
