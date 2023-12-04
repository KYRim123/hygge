"use client";
import style from "./index.module.css";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api_get_CategoryLSP, api_get_ProductListId, api_get_TypeProduct } from "@/app/lib/api";
import { useSession } from "next-auth/react";

export default function CreateNhapKho() {
  const [quantity, set_quantity] = useState(0);
  const [price, set_price] = useState(1);
  const [list_dsp, set_list_dsp] = useState([]);
  const [list_lsp, set_list_lsp] = useState([]);
  const [list_sp, set_list_sp] = useState([]);
  const [choose_id_dsp, set_choose_id_dsp] = useState(0);
  const [choose_id_lsp, set_choose_id_lsp] = useState(0);
  const [choose_id_sp, set_choose_id_sp] = useState(0);
  const [validate, set_validate] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const fetchDataDSP = async () => {
    await axios
      .get(api_get_TypeProduct)
      .then((res) => {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          name: item.ten_dong_san_pham,
        }));
        set_list_dsp(formattedData);
      })
      .catch((res) => {});
  };

  const fetchDataLSP = useCallback(async () => {
    await axios
      .post(api_get_CategoryLSP, { id: choose_id_dsp })
      .then((res) => {
        if (res.data.status == true) {
          const formattedData = res.data.data.map((item) => ({
            id: item.id,
            name: item.ten_loai_san_pham,
          }));
          set_list_lsp(formattedData);
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_dsp]);

  const fetchDataSP = useCallback(async () => {
    await axios
      .post(api_get_ProductListId, { id: choose_id_lsp })
      .then((res) => {
        if (res.data.status == true) {
          const formattedData = res.data.data.map((item) => ({
            id: item?.id,
            name: item?.ten_san_pham,
          }));
          set_list_sp(formattedData);
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_lsp]);

  useEffect(() => {
    fetchDataDSP();
  }, []);

  useEffect(() => {
    if (choose_id_dsp != null) {
      fetchDataLSP();
    }
  }, [choose_id_dsp, fetchDataLSP]);

  useEffect(() => {
    if (choose_id_lsp != null) {
      fetchDataSP();
    }
  }, [choose_id_lsp, fetchDataSP]);

  const handleSelectDSP = (id, name) => {
    set_choose_id_dsp(id);
  };

  const handleSelectLSP = (id, name) => {
    set_choose_id_lsp(id);
  };

  const handleSelectSP = (id, name) => {
    set_choose_id_sp(id);
  };

  const handlePost = async () => {
    set_validate(true);
    if (choose_id_sp == 0 || quantity == 0 || !session?.admin?.id || price <= 0) {
      return;
    } else {
      await axios
        .post("http://xuantuyen1207.website/api/kho/create", {
          id: session?.admin?.id,
          id_item: choose_id_sp,
          quantity: quantity,
          gia: price,
        })
        .then((res) => {
          if (res.data.status == true) {
            toast.success("Successfully !")
          } else {
            toast.error("Error !")
          }
        })
        .catch((err) => {});
    }
  };
  return (
    <div className="px-[200px] mt-[30px]">
      <div className={style.body_create_product}>
        <div>
          <div className="">
            <div className="mb-[20px]">
              <label>Dòng Sản Phẩm</label>
              <SelectDropdownAdmin
                title_select="Chọn Dòng Sản Phẩm"
                items={list_dsp}
                handleSelect={handleSelectDSP}
              ></SelectDropdownAdmin>
              {validate && choose_id_dsp == 0 && (
                <p className="text-red-500">* Vui Lòng Chọn Dòng Sản Phẩm</p>
              )}
            </div>
            <div className="mb-[20px]">
              <label>Loại Sản Phẩm</label>
              <SelectDropdownAdmin
                title_select="Chọn Loại Sản Phẩm"
                items={list_lsp}
                handleSelect={handleSelectLSP}
              ></SelectDropdownAdmin>
              {validate && choose_id_lsp == 0 && (
                <p className="text-red-500">* Vui Lòng Chọn Loại Sản Phẩm</p>
              )}
            </div>

            <div className="mb-[20px]">
              <label>Sản Phẩm</label>
              <SelectDropdownAdmin
                title_select="Chọn Sản Phẩm"
                items={list_sp}
                handleSelect={handleSelectSP}
              ></SelectDropdownAdmin>
              {validate && choose_id_sp == 0 && <p className="text-red-500">* Vui Lòng Chọn Sản Phẩm</p>}
            </div>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="quantity"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Số Lượng Nhập
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                set_quantity(e.target.value);
              }}
              className={style.input_create}
            />
            {validate && quantity == 0 && <p className="text-red-500">* Vui Lòng Nhập Số Lượng</p>}
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="price"
              className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Giá Nhập
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => {
                set_price(e.target.value);
              }}
              className={style.input_create}
            />
            {validate && price <= 0 && <p className="text-red-500">* Vui Lòng Nhập Giá Nhập</p>}
          </div>
        </div>
      </div>
      <div className={style.footer_btn}>
        <Link href={"/admin/warehouse/list"}>
          <div className={style.btn_close}>Huỷ</div>
        </Link>
        <div
          className={style.btn_save}
          onClick={handlePost}
        >
          Nhập
        </div>
      </div>
    </div>
  );
}
