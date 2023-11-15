"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Invoice from "@/app/components/Invoice";

export default function PageInvoice() {
  const [data_invoice, set_data_invoice] = useState();
  const PARAMS = useParams().id;
  useEffect(() => {
    const getInvoice = async () => {
      await axios
        .get(`${process.env.HTTPS_URL}/api/hoa-don/get/` + PARAMS)
        .then((res) => {
          if (res.data.status == true) {
            set_data_invoice(res.data.data);
          }
        })
        .catch((err) => {});
    };
    getInvoice();
  }, [PARAMS]);
  return (
    <div>
      <Invoice data={data_invoice} />
    </div>
  );
}
