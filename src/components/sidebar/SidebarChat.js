import { Avatar } from "@mui/material";
import "./sidebar.css";
import { useEffect, useState } from "react";
import db from "../firebase";

const SidebarChat = ({ id, name, addnewchat }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const room = prompt("Enter the room name.");
    if (room) {
      db.collection("rooms").add({
        name: room,
      });
    }
  };

  return !addnewchat ? (
    <div className="sidebar-chat">
      <Avatar src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`} />
      <div className="sidebar-chatInfo">
        <h3>{name}</h3>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div className="sidebar-chat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
