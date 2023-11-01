"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const VietQR = ({ bin, amount, accountNo }) => {
  const [data, set_data] = useState("");
  const dataPost = {
    accountNo: accountNo * 1,
    accountName: "BUY PRODUCT AT HYGGE",
    acqId: bin * 1,
    amount: amount * 100,
    addInfo: "Buy Product At Hygge",
    format: "text",
    template: "compact",
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post("https://api.vietqr.io/v2/generate", dataPost, {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CLIENT_ID_VIETQR,
          "x-api-key": process.env.API_KEY_VIETQR,
        },
      });
      if (response.data.code == "00") {
        set_data(response.data.data);
      } else {
        console.log(response.data.desc);
      }
    } catch (error) {
      console.error("Lỗi khi tạo QR code:", error);
    }
  };

  useEffect(() => {
    handlePayment();
  }, [bin]);

  return (
    <div className="flex justify-center">
      <Image
        src={data.qrDataURL}
        alt="QR Code"
        width={600}
        height={600}
      />
    </div>
  );
};

export default VietQR;
