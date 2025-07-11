import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

function NewUser() {
  const [username, setName] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  async function verifyLogin() {
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    if (password.length < 8) {
      alert("Password must be exactly 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch(`http://localhost:9899/auth/new-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        phone,
      }),
    });
    const data = await response.json();
    if (data.success) {
      navigate("/chat", {
        state: { user: username, userId: response.userId },
      });
    } else {
      alert("user already exist");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffe6f0",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#ff99cc",
          padding: "40px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          className="headings"
          style={{
            marginBottom: "30px",
            textAlign: "center",
            color: "white",
          }}
        >
          CREATE ACCOUNT
        </h1>

        <input
          className="input"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #fff",
            fontSize: "16px",
          }}
        />

        <input
          className="input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #fff",
            fontSize: "16px",
          }}
        />

        <input
          className="input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPass(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #fff",
            fontSize: "16px",
          }}
        />

        <input
          className="input"
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "30px",
            borderRadius: "5px",
            border: "1px solid #fff",
            fontSize: "16px",
          }}
        />

        <button
          onClick={() => {
            verifyLogin();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "centre",
            width: "30%",
            margin: "0 auto",
            background: "white",
            color: "#ff3399",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default NewUser;
