import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../../utils/ApiUrl";

export class AuthStore {
  isLoggedIn = false;
  isOnboardingCompleted = false;
  loading = true;
  error = null;
  userObj = {};
  userDetails = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setState(stateObj) {
    runInAction(() => Object.assign(this, stateObj));
  }

  setAuthToken(token) {
    token
      ? localStorage.setItem("authToken", token)
      : localStorage.removeItem("authToken");
  }

  async checkLoginStatus() {
    this.setState({ loading: true, error: null });

    try {
      const response = await MakeApiCall({
        url: URLS.loginValidation,
        method: "GET",
      });

      runInAction(() => {
        console.log("Login Validation Response:", response);

        const loggedIn =
          response?.data?.status === 200 &&
          response?.data?.response?.isLoggedIn;

        this.setState({
          isLoggedIn: loggedIn,
          userObj: loggedIn ? response.data.response.user : {},
          isOnboardingCompleted: response?.data?.response?.completed || false,
          userDetails: loggedIn ? response?.data?.response : {},
        });
        this.setAuthToken(loggedIn ? response?.data?.response?.token : null);
      });
    } catch (error) {
      this.setState({
        isLoggedIn: false,
        error: error.response?.response?.message || "Network error occurred.",
        userObj: {},
      });
      this.setAuthToken(null);
    } finally {
      this.setState({ loading: false });
    }
  }
}

const authStore = new AuthStore();
export default authStore;
export { authStore };
