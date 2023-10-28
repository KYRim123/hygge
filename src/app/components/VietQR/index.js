"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const VietQR = () => {
  const [data, set_data] = useState("");
  const dataPost = {
    accountNo: 113366668888,
    accountName: "QUY VAC XIN PHONG CHONG COVID",
    acqId: 970415,
    amount: 9000,
    addInfo: "Ung Ho Quy Vac Xin",
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
  }, []);

  return (
    <div>
      <img
        src={data.qrDataURL}
        alt="QR Code"
        width="800"
        height="800"
      />
    </div>
  );
};

export default VietQR;
