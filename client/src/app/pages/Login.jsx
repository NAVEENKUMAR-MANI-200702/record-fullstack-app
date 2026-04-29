import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import loginStore from "../store/auth/LoginStore";
import authStore from "../store/auth/authStore";
import { InputField } from "../components/ui/InputField";
import { Button } from "../components/ui/button";
import { openGoogleLogin } from "../../utils/googleLogin";
import signupStore from "../store/auth/SignupStore";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {
      email: !email.trim(),
      password: !password.trim(),
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const response = await loginStore.login(email, password);

    if (response?.success && response?.data?.status === 200) {
      navigate("/onboarding");
      authStore.checkLoginStatus();
    }
  };

  const handleGoogleLogin = () => {
    openGoogleLogin(async (code) => {
      console.log("AUTH CODE:", code);

      const res = await signupStore.googleLogin(code);

      if (res?.success) {
        const { user, token } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        authStore.setUser(user);
        navigate("/onboarding");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 px-4">
      <div className="rounded-xl w-full max-w-md md:max-w-lg">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-start font-semibold text-gray-700 mb-6">LOGIN</h2>

          <form onSubmit={handleLogin} className="space-y-4">
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

            {loginStore.error && (
              <p className="text-red-500 text-sm text-center">
                {loginStore.error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loginStore.loading}
              className="w-full bg-pink-500 hover:bg-pink-600 transition disabled:opacity-60"
            >
              {loginStore.loading ? "Logging in..." : "LOGIN"}
            </Button>
          </form>

          <p className="text-right text-sm text-gray-400 mt-2 cursor-pointer">
            Forgot Password?
          </p>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-500 shadow-sm hover:bg-gray-100 transition"
            >
              <span className="text-lg font-bold text-red-500">
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="google"
                  className="w-5 h-5"
                />
              </span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Need an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              SIGN UP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Login;
