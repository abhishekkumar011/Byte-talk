import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicNoneRoundedIcon from "@mui/icons-material/MicNoneRounded";
import "./chat.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import db from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Chat = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter your message");
    }
    db.collection("rooms").doc(roomId).collection("message").add({
      name: "Abhishek Kumar",
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      {/* Chat header  */}
      <div className="chat-header">
        <div className="header-info">
          <Avatar
            src={"https://api.dicebear.com/6.x/avataaars/svg?seed=$%7Bseed-6D"}
          />
          <div>
            <h3>{roomName}</h3>
            <p>Last seen</p>
          </div>
        </div>

        <div className="header-right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* Chat body */}
      <div className="chat-body">
        {messages.map((message) => {
          return (
            <p className="chat-message chat-receiver">
              <span className="chat-name">{message.name}</span>
              {message.message}
              <span className="chat-time">
                {new Date(
                  message.timestamp?.seconds * 1000
                ).toLocaleTimeString()}
              </span>
            </p>
          );
        })}
      </div>

      {/* Chat footer  */}
      <div className="chat-footer">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <MicNoneRoundedIcon />
      </div>
    </div>
  );
};

export default Chat;
