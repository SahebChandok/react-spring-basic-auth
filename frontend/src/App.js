import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("password");

  const handleLogin = () => {
    const token = btoa(`${username}:${password}`);

    fetch("http://localhost:8080/api/hello", {
      method: "GET",
      headers: {
        "Authorization": `Basic ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.text();
      })
      .then((data) => setMessage(data))
      .catch((err) => setMessage(err.message));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>React + Spring Security (Basic Auth)</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <div>{message}</div>
    </div>
  );
}

export default App;
