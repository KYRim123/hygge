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
    Pusher.logToConsole = true;

    const pusher = new Pusher("186ee310c9ca72d2af51", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      allMessage.push(data);
      set_messages(allMessage);
    });
  });

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get("http://127.0.0.1:8000/api/user/name").then((res) => {
        set_list_user(res.data.data);
      });
    };
    fetchUser();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/message",
        {
          userId: 0,
          username: username,
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
              .filter((messagef) => messagef.toId == to_id || messagef.userId == to_id)
              .map((message, index) => (
                <div key={index}>
                  {message.userId == to_id ? (
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
