"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Invoice from "@/app/components/Invoice";
import { api_get_HoaDon } from "@/app/lib/api";

export default function PageInvoice() {
  const [data_invoice, set_data_invoice] = useState();
  const PARAMS = useParams()?.id;

  useEffect(() => {
    const getInvoice = async () => {
      await axios
        .get(`${api_get_HoaDon}${PARAMS * 1}`)
        .then((res) => {
          if (res.data.status == true) {
            set_data_invoice(res.data.data);
          }
        })
        .catch((err) => {});
    };
    if (PARAMS != null) {
      getInvoice();
    }
  }, [PARAMS]);
  return (
    <div>
      <Invoice data={data_invoice} />
    </div>
  );
}
