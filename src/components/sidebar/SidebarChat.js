import { Avatar } from "@mui/material";
import "./sidebar.css";
import { useEffect, useState } from "react";
import db from "../firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addnewchat }) => {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    db.collection("rooms").doc(id).collection("message").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setLastMessage(snapshot.docs.map(doc => doc.data()))
    })
  }, [id]);

  console.log(lastMessage)

  const createChat = () => {
    const room = prompt("Enter the room name.");
    if (room) {
      db.collection("rooms").add({
        name: room,
      });
    }
  };

  return addnewchat ? (
    <div className="sidebar-chat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  ) : (
    <Link to={`/room/${id}`} style={{textDecoration: 'none',color: 'black'}}>
      <div className="sidebar-chat">
        <Avatar
          src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`}
        />
        <div className="sidebar-chatInfo">
          <h3>{name}</h3>
          <p>{lastMessage[0]?.message}</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
