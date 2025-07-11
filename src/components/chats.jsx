import { useEffect, useRef, useState } from "react";
import createSocket from "../socket";
import { useLocation } from "react-router-dom";

function ChatElement() {
  const location = useLocation();
  const user = location.state?.user;
  const userId = location.state?.userId;

  const [recieverName, setRecieverName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");

  const [addFriends, setAddFriends] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [friends, setFriends] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [notification, setNoti] = useState(0);
  const [friendsNotifactions, setFriendsNoti] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = createSocket(user);

    socket.on("message", (message) => {
      if (message.senderName === recieverName) {
        setMessages((prev) => [
          ...prev,
          { text: message.input, sender: "receiver" },
        ]);
      } else {
        setFriendsNoti((prev) => {
          const uniqueSenders = new Set(prev);
          uniqueSenders.add(message.senderName);
          const updatedArray = Array.from(uniqueSenders);
          console.log("Updated friendsNotifactions:", updatedArray);
          return updatedArray;
        });
        setNoti((prev) => prev + 1);
      }
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [user]);

  function handleMessage() {
    if (socketRef.current && input.trim()) {
      socketRef.current.emit("message", {
        user,
        recieverName,
        input,
        chatId,
      });

      setMessages((prev) => [...prev, { text: input, sender: "me" }]);
      setInput("");
    }
  }

  async function getChat(name) {
    if (!name) return;

    let res = await fetch(
      `http://localhost:9899/chats/get-chats/${user}/${name}`
    );
    res = await res.json();

    const formatted = res.messages.map((msg) => ({
      text: msg.text,
      sender: msg.senderId === userId ? "me" : "receiver",
    }));

    setMessages(formatted);
    setChatId(res.chatId);
  }

  async function fetchFriends() {
    let res = await fetch(`http://localhost:9899/chats/friends/${user}`);
    res = await res.json();

    setFriends(res.friends || []);
    setShowFriends(true);
  }

  async function handleFriendClick(friendName) {
    setRecieverName(friendName);
    setShowFriends(false);
    await getChat(friendName);
  }

  async function searchUsers(query) {
    let res = await fetch(`http://localhost:9899/chats/search-users/${query}`);
    res = await res.json();
    setMatchedUsers(res.users || []);
    setAddFriends(false);
  }

  async function addNewFriend(friendName) {
    let res = await fetch(
      `http://localhost:9899/chats/new-friend/${friendName}`,
      { method: "POST" }
    );
    res = await res.json();

    setRecieverName(friendName);
    await getChat(friendName);
    setAddFriends(false);
    setSearchQuery("");
    setMatchedUsers(res.users || []);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#007bff" }}>{recieverName}</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setAddFriends(true)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Make Friend
        </button>

        <button
          onClick={fetchFriends}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Friends
        </button>

        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            onClick={() => setShowNotificationModal(true)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Notification
          </button>
          {notification > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {notification}
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === "me" ? "#dcf8c6" : "#f1f0f0",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "60%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "mistyrose",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "600px",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="enter your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flexGrow: 1,
              flexShrink: 1,
              minWidth: 0,
              padding: "10px 12px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMessage();
              }
            }}
          />
          <button
            onClick={handleMessage}
            style={{
              padding: "10px 16px",
              borderRadius: "15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              fontSize: "14px",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Send
          </button>
        </div>
      </div>

      {showFriends && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2>My Friends</h2>
            {friends.length === 0 ? (
              <p>No friends found.</p>
            ) : (
              friends.map((friendName, idx) => (
                <div key={idx} style={{ margin: "10px 0" }}>
                  <button
                    onClick={() => handleFriendClick(friendName)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {friendName}
                  </button>
                </div>
              ))
            )}
            <button
              onClick={() => setShowFriends(false)}
              style={{
                marginTop: "20px",
                padding: "8px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              BACK
            </button>
          </div>
        </div>
      )}
      {addFriends && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <h2>Add a Friend</h2>

            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input
                type="text"
                value={searchQuery}
                placeholder="Search user"
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
              />
              <button
                onClick={() => {
                  if (searchQuery.trim()) {
                    searchUsers(searchQuery.trim());
                  } else {
                    setMatchedUsers([]);
                  }
                }}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Search
              </button>
            </div>

            <div style={{ maxHeight: "250px", overflowY: "auto" }}>
              {matchedUsers.length > 0 ? (
                matchedUsers.map((name, idx) => (
                  <div key={idx} style={{ margin: "10px 0" }}>
                    <button
                      onClick={() => addNewFriend(name)}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      {name}
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ color: "#666" }}>No matches yet. Try searching!</p>
              )}
            </div>

            <button
              onClick={() => {
                setAddFriends(false);
                setSearchQuery("");
                setMatchedUsers([]);
              }}
              style={{
                marginTop: "20px",
                padding: "8px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              BACK
            </button>
          </div>
        </div>
      )}

      {showNotificationModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2>New Messages From:</h2>
            {friendsNotifactions.length > 0 ? (
              friendsNotifactions.map((name, idx) => (
                <div key={idx} style={{ margin: "10px 0" }}>
                  <button
                    onClick={async () => {
                      setRecieverName(name);
                      await getChat(name);

                      setFriendsNoti((prev) => {
                        const updated = prev.filter((n) => n !== name);
                        if (updated.length === 0) {
                          setNoti(0);
                        } else {
                          setNoti((prev) => prev - 1);
                        }
                        return updated;
                      });

                      setShowNotificationModal(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {name}
                  </button>
                </div>
              ))
            ) : (
              <p>No new messages.</p>
            )}

            <button
              onClick={() => setShowNotificationModal(false)}
              style={{
                marginTop: "20px",
                padding: "8px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatElement;
