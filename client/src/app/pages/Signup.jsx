import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import signupStore from "../store/auth/SignupStore";
import { InputField } from "../components/ui/InputField";
import { Button } from "../components/ui/button";

const Signup = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    username: false,
  });
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      email: !email.trim(),
      password: !password.trim(),
      username: !username.trim(),
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password && !newErrors.username;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const response = await signupStore.signup( username,email, password);

    if (response?.success && response?.data?.status === 201) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 px-4">
      <div className="rounded-xl w-full max-w-md md:max-w-lg">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-start font-semibold text-gray-700 mb-6">
            SIGN UP
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <InputField
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username)
                    setErrors((prev) => ({ ...prev, username: false }));
                }}
                error={errors.username && "Username is required"}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <InputField
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: false }));
                }}
                error={errors.email && "Email is required"}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <InputField
                name="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: false }));
                }}
                error={errors.password && "Password is required"}
              />
            </div>

            {signupStore.error && (
              <p className="text-red-500 text-sm text-center">
                {signupStore.error}
              </p>
            )}

            <Button
              type="submit"
              disabled={signupStore.loading}
              className="w-full bg-pink-500 hover:bg-pink-600 transition disabled:opacity-60"
            >
              {signupStore.loading ? "Creating account..." : "SIGN UP"}
            </Button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already a user?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Signup;
