import axios from "axios";
import { SERVER_URL } from "../static/Constant";

const URLS = {
  loginValidation: `${SERVER_URL}/api/auth/isLoggedIn`,
  login: `${SERVER_URL}/api/auth/login`,
  register: `${SERVER_URL}/api/auth/register`,
  saveStep: `${SERVER_URL}/api/form/save-step`,
  addProfileImg: `${SERVER_URL}/api/form/upload`,
  getForm: (userId) => `${SERVER_URL}/api/form/${userId}`,
  getSkills: `${SERVER_URL}/api/skills`,
  completeForm: `${SERVER_URL}/api/form/complete`,
  googleOAuth: `${SERVER_URL}/api/auth/google`,
};

const MakeApiCall = async (config) => {
  config.method = config.method || "GET";

  const isFormData = config.data instanceof FormData;
  config.headers = isFormData
    ? { Accept: "application/json" }
    : { Accept: "application/json", "Content-Type": "application/json" };

  config.withCredentials = true;

  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong!",
      status: error.response?.status || 500,
      error,
    };
  }
};

export default MakeApiCall;
export { MakeApiCall, URLS };
