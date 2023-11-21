"use client";

import { useEffect, useState } from "react";
import pusherJs from "pusher-js";
import axios from "axios";
import style from "./index.module.css";
import { Tabs } from "antd";
import { BsFillSendCheckFill } from "react-icons/bs";

export default function Chat() {
  const [username, set_username] = useState("Hygge Shop");
  const [messages, set_messages] = useState([]);
  const [message, set_message] = useState("");
  const [list_user, set_list_user] = useState([]);
  const [to_id, set_to_id] = useState(0);
  const [list_tab, set_list_tab] = useState([]);
  const [key_list_tab, set_key_list_tab] = useState(1);

  let allMessage = [];

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.HTTPS_URL}/api/chat/admin`);
        if (response.data.status == true) {
          set_messages(response.data.data);
        }
      } catch (error) {}
    };
    getNotifications();
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("186ee310c9ca72d2af51", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", function (event) {
      if (event?.id_user == 0 || event?.chat?.to_id == 0) {
        set_messages((prevMessage) => {
          const isMessageExists = prevMessage.some((item) => item.id == event?.chat?.id);

          if (!isMessageExists) {
            return [...prevMessage, event?.chat];
          } else {
            return prevMessage;
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`${process.env.HTTPS_URL}/api/user/name`).then((res) => {
        set_list_user(res.data.data);
      });
    };
    fetchUser();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.HTTPS_URL}/api/message`,
        {
          userId: 0,
          message: message,
          toId: to_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {}
    set_message("");
  };

  const onChangeListTab = (key) => {
    set_key_list_tab(key);
  };

  const handleOnChooseUser = (user) => {
    set_to_id(user.id);
    const new_list_tab = [...list_tab];
    const tabExists = new_list_tab.some((tab) => tab.key == user.id);
    if (!tabExists) {
      new_list_tab.push({ label: user.ten_nguoi_dung, key: user.id });
      set_list_tab(new_list_tab);
    }
  };

  return (
    <div className="">
      <div className="flex">
        <div className="w-full">
          <Tabs
            onChange={onChangeListTab}
            type="card"
            items={list_tab}
          />
          <div className="w-full h-[480px] overflow-auto">
            {messages
              .filter((messagef) => messagef.to_id == to_id || messagef.user_id == to_id)
              .map((message, index) => (
                <div key={index}>
                  {message.user_id == to_id ? (
                    <div className={style.mess_to_me}>{message.message}</div>
                  ) : (
                    <div className={style.mess_from_me}>{message.message}</div>
                  )}
                </div>
              ))}
          </div>
          <form
            className="relative"
            onSubmit={submit}
          >
            <input
              className={style.input_message}
              value={message}
              onChange={(e) => set_message(e.target.value)}
            ></input>
            <BsFillSendCheckFill
              className={style.icon_send}
              onSubmit={submit}
            ></BsFillSendCheckFill>
          </form>
        </div>
        <div className={`${"w-[250px] h-auto overflow-y-scroll"} ${style.box_user}`}>
          {list_user?.map((user, index) => (
            <div
              key={index}
              className={style.user_box}
              onClick={() => handleOnChooseUser(user)}
            >
              {user.ten_nguoi_dung}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
