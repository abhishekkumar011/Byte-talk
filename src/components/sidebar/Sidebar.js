import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./sidebar.css";
import SidebarChat from "./SidebarChat";
import { useEffect, useState } from "react";
import db from "../firebase";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    db.collection("rooms").onSnapshot(snapshot => {
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className="sidebar">
      {/* Siderbar header part */}
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* Sidebar Search */}
      <div className="sidebar-search">
        <div className="search-container">
          <SearchIcon />
          <input type="text" placeholder="search or start a new chat" />
        </div>
      </div>

      {/* Sidebar chat container  */}
      <div className="sidebarChat-container">
        <SidebarChat addnewchat />
        {
          rooms.map(room => {
            return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          })
        }
      </div>
    </div>
  );
};

export default Sidebar;
