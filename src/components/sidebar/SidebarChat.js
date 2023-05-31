import { Avatar } from "@mui/material";
import "./sidebar.css";
import { useEffect, useState } from "react";

const SidebarChat = ({ id, name, addnewchat }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return !addnewchat ? (
    <div className="sidebar-chat">
      <Avatar src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`} />
      <div className="sidebar-chatInfo">
        <h3>{name}</h3>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div className="sidebar-chat">
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
