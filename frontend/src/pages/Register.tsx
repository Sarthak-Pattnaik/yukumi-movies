import { useState } from "react";

import AuthLayout
  from "../components/layout/AuthLayout";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Register = () => {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const login =
    useAuthStore(
      (state) =>
        state.login
    );


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

      alert("User registered");
      login(res.data);
      navigate("/profile");

    } catch (error: any) {

      console.log(error.response.data);

      alert(error.response.data.message);

    }
  };

  return (

    <AuthLayout

      title="Create Account"

      subtitle="
    Join the cinematic community
    and start building your
    movie journey.
  "
    >

      <form
        onSubmit={handleRegister}

        className="space-y-5"
      >

        <input
          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          className="auth-input"
        />

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

          Create Account

        </button>

        <p
          className="pt-4 text-center text-zinc-500"
        >

          Already have an account?

          {" "}

          <Link
            to="/login"

            className="text-[#10b981] transition-colors hover:text-white"
          >

            Login

          </Link>

        </p>

      </form>

    </AuthLayout>
  );
};

export default Register;