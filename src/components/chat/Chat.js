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

const Chat = () => {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        setRoomName(snapshot.data().name);
      });
  }, [roomId]);

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
        <p className="chat-message chat-receiver">
          <span className="chat-name">Abhishek Kumar</span>
          This is the dummy message
          <span className="chat-time">12:40 PM</span>
        </p>

        <p className="chat-message chat-receiver">
          <span className="chat-name">Abhishek Kumar</span>
          This is the dummy message
          <span className="chat-time">12:40 PM</span>
        </p>

        <p className="chat-message">
          <span className="chat-name">Abhishek Kumar</span>
          This is the dummy message
          <span className="chat-time">12:40 PM</span>
        </p>
      </div>

      {/* Chat footer  */}
      <div className="chat-footer">
        <EmojiEmotionsIcon />
        <AttachFileIcon />
        <form>
          <input type="text" placeholder="Type your message" />
        </form>
        <MicNoneRoundedIcon />
      </div>
    </div>
  );
};

export default Chat;
