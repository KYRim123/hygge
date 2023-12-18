"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { api_post_PayMent } from "@/app/lib/api";

const VietQR = ({ bin, amount, accountNo, id_invoice }) => {
  const [data, set_data] = useState("");
  const amount2 = (amount * 24000).toFixed(0);
  const dataPost = {
    accountNo: accountNo * 1,
    accountName: "BUY PRODUCT AT HYGGE",
    acqId: bin * 1,
    amount: amount2 * 1,
    addInfo: `Number Invoice : ${id_invoice}`,
    format: "text",
    template: "compact",
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post(api_post_PayMent, dataPost, {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CLIENT_ID_VIETQR,
          "x-api-key": process.env.API_KEY_VIETQR,
        },
      });
      if (response.data.code == "00") {
        set_data(response.data.data);
      } else {
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
