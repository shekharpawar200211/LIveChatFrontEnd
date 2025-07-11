import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

function Login() {
  const [username, setName] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();

  async function verifyLogin() {
    let response = await fetch(
      `http://localhost:9899/auth/validate/${username}/${password}`,
      {
        method: "GET",
      }
    );
    response = await response.json();
    if (response.success) {
      navigate("/chat", {
        state: { user: username, userId: response.userId },
      });
    } else {
      alert("user already exists");
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
          style={{
            marginBottom: "30px",
            textAlign: "center",
            color: "white",
          }}
        >
          PLEASE LOGIN
        </h1>

        <input
          type="text"
          placeholder="enterUserName"
          value={username}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "95%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #fff",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="EnterPassword"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          style={{
            width: "95%",
            padding: "12px",
            marginBottom: "30px",
            borderRadius: "5px",
            border: "1px solid #fff",
            fontSize: "16px",
          }}
        />

        <button
          onClick={verifyLogin}
          style={{
            display: "block",
            width: "50%",
            margin: "0 auto",
            background: "white",
            color: "#ff3399",
            padding: "10px 14px",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          Submit
        </button>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link
            to="/new-user"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "white",
              color: "#ff3399",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
