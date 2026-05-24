import { useState } from "react";

import { useAuthStore }from "../store/authStore";
import AuthLayout from "../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const login =
    useAuthStore(
      (state) =>
        state.login
    );

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        const res =
          await api.post(
            "/auth/login",

            {
              email,
              password,
            }
          );

        login(res.data);

        navigate(
          "/profile"
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <AuthLayout

      title="Welcome Back"

      subtitle="
    Continue tracking films,
    reviewing movies,
    and exploring the community.
  "
    >

      <form
        onSubmit={handleLogin}

        className="space-y-5"
      >

        <input
          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          className="auth-input"
        />

        <input
          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          className="auth-input"
        />

        <button
          type="submit"

          className="emerald-button h-14 w-full text-lg font-semibold"
        >

          Login

        </button>

      </form>

      <p
          className="pt-4 text-center text-zinc-500"
        >

          Don't have an account?

          {" "}

          <Link
            to="/register"

            className="text-[#10b981] transition-colors hover:text-white"
          >

            Register

          </Link>

        </p>

    </AuthLayout>
  );
};

export default Login;