import "./App.css";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import { useEffect } from "react";
import { auth } from "./components/firebase";

function App() {
  const [{user},dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      dispatch({
        type: "SET_USER",
        user: user
      })
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <div className="app-body">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Chat />} />
              <Route path="/room/:roomId" element={<Chat />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
