import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="app-body">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Chat />} />
            <Route path="/room/:roomId" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
