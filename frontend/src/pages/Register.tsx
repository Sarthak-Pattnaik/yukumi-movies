import { useState } from "react";

import api from "../services/api";

const Register = () => {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      console.log(res.data);

      alert("User registered");

    } catch (error: any) {

      console.log(error.response.data);

      alert(error.response.data.message);

    }
  };

  return (

    <div>

      <h1>Register</h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;