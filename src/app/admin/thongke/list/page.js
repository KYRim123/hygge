"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import style from "./index.module.css";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import { Tabs } from "antd";
dayjs.extend(customParseFormat);
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { api_get_HoaDonThongKe, api_get_ListProductAdmin, api_post_bestSell } from "@/app/lib/api";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Title, Tooltip, Legend);

const dateFormat = "YYYY/MM/DD";

const { RangePicker } = DatePicker;

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Biểu Đồ Thống Kê",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
    },
  },
};

const day = new Date();
const preDay = new Date(day);
preDay.setDate(day.getDate() - 30);
const formatDate = (day) => {
  const year = day.getFullYear();
  const month = (day.getMonth() + 1).toString().padStart(2, "0");
  const date = day.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${date}`;
};
const dayFormat = formatDate(day);
const preDayFormat = formatDate(preDay);

const list_tab = [
  { label: "Số Lượng Đặt Hàng", key: 1 },
  { label: "Xem Doanh Thu", key: 2 },
  { label: "Sản Phẩm Bán Chạy Nhất", key: 3 },
];

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
];
const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];

export default function ListStatistics() {
  const [list_product, set_list_product] = useState([]);
  const [choose_id_product, set_choose_id_product] = useState();
  const [month, set_month] = useState();
  const [key_list_tab, set_key_list_tab] = useState(1);
  const [days, set_days] = useState([]);
  const [data, set_data] = useState();
  const [data_chart, set_data_chart] = useState();
  const [data_chart2, set_data_chart2] = useState();
  const [data_chart3, set_data_chart3] = useState();
  const [date_from, set_date_from] = useState(preDayFormat);
  const [date_to, set_date_to] = useState(dayFormat);
  const [price, set_price] = useState();
  const [month2, set_month2] = useState();

  const dataChart = (items, labels) => {
    let data = [];
    labels?.forEach((el) => {
      const sum = items?.reduce(
        (accumulator, currentItem) =>
          el == currentItem.Date ? accumulator * 1 + currentItem.Count * 1 : accumulator * 1,
        0,
      );
      data.push(sum);
    });
    return {
      labels: labels,
      datasets: [{ label: "Số Sản Phẩm", data: data, backgroundColor: "rgb(255, 99, 132)" }],
    };
  };

  const dataChart3 = (items) => {
    let data = [];
    let labels = [];
    let backgroundColor2 = [];
    let borderColor2 = [];
    items?.forEach((item, index) => {
      labels.push(item?.Item);
      data.push(item?.Count);
      backgroundColor2.push(backgroundColor[index]);
      borderColor2.push(borderColor[index]);
    });
    return {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: data,
          backgroundColor: backgroundColor2,
          borderColor: borderColor2,
          borderWidth: 1,
        },
      ],
    };
  };

  const dataChart2 = (items, labels) => {
    let data = [];
    labels?.forEach((el) => {
      const sum = items?.reduce(
        (accumulator, currentItem) =>
          el == currentItem.Date ? accumulator * 1 + currentItem.Price * 1 : accumulator * 1,
        0,
      );
      data.push(sum);
    });
    return {
      labels: labels,
      datasets: [{ label: "Doanh Thu", data: data, backgroundColor: "#00cc98" }],
    };
  };
  const fetchDataProduct = async () => {
    await axios
      .get(api_get_ListProductAdmin)
      .then((res) => {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          name: item.ten_san_pham,
        }));
        set_list_product([{ id: 0, name: "All" }, ...formattedData]);
      })
      .catch((res) => {});
  };

  const fetchDataBestSell = useCallback(async () => {
    await axios
      .post(api_post_bestSell, { month: month2 })
      .then((res) => {
        if (res?.data?.status == true) {
          const data_chart_pre3 = dataChart3(res?.data?.data);
          set_data_chart3(data_chart_pre3);
        } else {
        }
      })
      .catch((res) => {});
  }, [month2]);

  const fetchDataThongKe = useCallback(async () => {
    await axios
      .post(api_get_HoaDonThongKe, {
        id_product: choose_id_product,
        day_from: date_from,
        day_to: date_to,
      })
      .then((res) => {
        if (res.data.status == true) {
          set_days(res.data.days);
          set_data(res.data.data);
          const data_chart_pre = dataChart(res.data.data, res.data.days);
          const data_chart_pre2 = dataChart2(res.data.data, res.data.days);
          set_data_chart(data_chart_pre);
          set_data_chart2(data_chart_pre2);
          set_price(res.data.price);
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_product, date_from, date_to]);

  useEffect(() => {
    fetchDataProduct();
  }, []);

  useEffect(() => {
    fetchDataBestSell();
  }, [fetchDataBestSell]);

  useEffect(() => {
    fetchDataThongKe();
  }, [fetchDataThongKe]);

  const handleSelectProduct = (id, name) => {
    set_choose_id_product(id);
  };

  const handleExportPDF = () => {
    generatePDF();
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    autoTable(pdf, {
      html: "#list_thongke",
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
    });
    pdf.save(`quan_ly_thongke.pdf`);
  };

  const handleDateChange = (date, dateString) => {
    set_date_from(dateString[0]);
    set_date_to(dateString[1]);
  };

  const onChangeListTab = (key) => {
    set_key_list_tab(key);
  };

  const handleMonthChange = (date, dateString) => {
    set_month2(dateString);
  };
  return (
    <div className="px-6 mb-8">
      {key_list_tab != 3 && (
        <div className="flex justify-start">
          <div className="w-[250px]">
            <label>Chọn Sản Phẩm</label>
            <SelectDropdownAdmin
              title_select="Chọn Sản Phẩm"
              items={list_product}
              handleSelect={handleSelectProduct}
            ></SelectDropdownAdmin>
          </div>
          <div className={`${"w-[300px] ml-14"}`}>
            <label>Chọn Thời Gian : </label>
            <RangePicker
              className={style.custom_daytime}
              defaultValue={[dayjs(preDayFormat, dateFormat), dayjs(dayFormat, dateFormat)]}
              format={dateFormat}
              onChange={handleDateChange}
            />
          </div>
        </div>
      )}
      {key_list_tab == 3 && (
        <div className="flex justify-start">
          <div className={`${"w-[300px] ml-14"}`}>
            <label>Chọn Tháng : </label>
            <DatePicker
              onChange={handleMonthChange}
              picker="month"
            />
          </div>
        </div>
      )}
      <div className="mt-5">
        <Tabs
          onChange={onChangeListTab}
          type="card"
          items={list_tab}
        />
        <div>
          {key_list_tab == 1
            ? data != null && (
                <Fragment>
                  {data_chart != null ? (
                    <div className="w-[800px] m-auto">
                      <Bar
                        options={options}
                        data={data_chart}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={style.pdf}>
                    <div
                      className={style.btn_pdf}
                      onClick={handleExportPDF}
                    >
                      PDF
                    </div>
                  </div>
                  <table
                    className={style.table_list_thongke}
                    id="list_thongke"
                  >
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Số Lượng Bán Ra</th>
                      </tr>
                    </thead>
                    <tbody>
                      {days?.map((date, index) => (
                        <Fragment key={index}>
                          <tr>
                            <td className={` ${style.title_date} ${"col-3"}`}>Ngày : {date}</td>
                          </tr>
                          {data?.map((item, index_item) =>
                            item.Date === date ? (
                              <tr key={index_item}>
                                <td></td>
                                <td>{item.Item}</td>
                                <td className={style.price}>{item.Count}</td>
                              </tr>
                            ) : null,
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </Fragment>
              )
            : ""}
          {key_list_tab == 2
            ? data != null && (
                <Fragment>
                  <div className="flex">
                    <div className="text-[#00cc98]">Tổng Tiền Nhận Về : ${price?.total}</div>
                    <div className="ml-10 text-[#00cc98]">Tổng Tiền Thuế : ${price?.tax}</div>
                    <div className="ml-10 text-[#00cc98]">Tổng Tiền Ship : ${price?.ship}</div>
                  </div>
                  {data_chart != null ? (
                    <div className="w-[800px] m-auto">
                      <Bar
                        options={options}
                        data={data_chart2}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={style.pdf}>
                    <div
                      className={style.btn_pdf}
                      onClick={handleExportPDF}
                    >
                      PDF
                    </div>
                  </div>
                  <table
                    className={style.table_list_thongke}
                    id="list_thongke"
                  >
                    <thead>
                      <tr>
                        <th>Ngày</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Số Tiền Sản Phẩm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {days?.map((date, index) => (
                        <Fragment key={index}>
                          <tr>
                            <td className={` ${style.title_date} ${"col-3"}`}>Ngày : {date}</td>
                          </tr>
                          {data?.map((item, index_item) =>
                            item.Date === date ? (
                              <tr key={index_item}>
                                <td></td>
                                <td>{item.Item}</td>
                                <td className={style.price}>${item.Price}</td>
                              </tr>
                            ) : null,
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </Fragment>
              )
            : ""}
          {key_list_tab == 3
            ? data != null && (
                <Fragment>
                  {data_chart3 != null ? (
                    <div className="w-[800px] m-auto">
                      <Pie data={data_chart3} />
                    </div>
                  ) : (
                    ""
                  )}
                </Fragment>
              )
            : ""}
        </div>
      </div>
    </div>
  );
}
