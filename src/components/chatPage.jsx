import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./loginPage";
import ChatPageHeader from "./chatPageHeader";
import ChatElement from "./chats";
import NewUser from "./newUser";

function Chat() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <>
              <ChatPageHeader />
              <ChatElement />
            </>
          }
        />
        <Route path="/new-user" element={<NewUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Chat;
