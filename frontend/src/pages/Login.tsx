import { useState } from "react";

import useAuthStore from "../store/authStore";

const Login = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const { login } =
    useAuthStore();

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    await login(
      email,
      password
    );
  };

  return (

    <div>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

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
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;