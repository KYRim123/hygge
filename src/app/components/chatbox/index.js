"use client";
import { Fragment } from "react";
import style from "./index.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import pusherJs from "pusher-js";
import { BsFillSendCheckFill } from "react-icons/bs";
import axios from "axios";

export default function Chatbox() {
  const [show_chat, set_show_chat] = useState(false);
  const { data: session } = useSession();
  const [username, set_username] = useState("Hygge User");
  const [user_id, set_user_id] = useState();
  const [messages, set_messages] = useState([]);
  const [message, set_message] = useState("");

  let allMessage = [];
  useEffect(() => {
    set_username(session?.user?.name);
    set_user_id(session?.user?.id);
  }, [session]);

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

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/message",
        {
          userId: user_id,
          username: username,
          message: message,
          toId: 0,
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

  console.log(session?.user?.name);
  return (
    <Fragment>
      <div
        className="fixed bottom-5 right-5 bg-[#00cc98] rounded-xl w-[150px] h-[40px] text-center leading-[40px] text-white z-10 cursor-pointer"
        onClick={() => set_show_chat(true)}
      >
        Chat Me
        {show_chat && (
          <div className={style.chat_box}>
            <div className={style.title}>Hygge Shop</div>
            <div className={style.name}>{session?.user?.name}</div>
            <div className={style.list_chat}>
              {messages
                .filter((messagef) => messagef.userId == user_id || messagef.toId == user_id)
                .map((message, index) => (
                  <div key={index}>
                    {message.userId == user_id ? (
                      <div className={style.mess_from_me}>{message.message}</div>
                    ) : (
                      <div className={style.mess_to_me}>{message.message}</div>
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
        )}
      </div>
    </Fragment>
  );
}
