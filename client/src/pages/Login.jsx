import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authStore.login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 px-4">
      <div className="rounded-xl w-full max-w-md md:max-w-lg">
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-start font-semibold text-gray-700 mb-6">
            LOGIN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-pink-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-pink-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me?
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
            >
              LOGIN
            </button>
          </form>

          <p className="text-right text-sm text-gray-400 mt-2 cursor-pointer">
            Forgot Password?
          </p>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Need an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}>SIGN UP</span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Login;