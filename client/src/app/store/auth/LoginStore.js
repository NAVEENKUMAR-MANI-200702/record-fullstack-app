import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../../utils/ApiUrl";
import { formStore } from "../formStore";

export class LoginStore {
  loading = false;
  error = null;
  loginData = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(email, password) {
    this.loading = true;
    this.error = null;
    this.loginData = null;

    const response = await MakeApiCall({
      url: URLS.login,
      method: "POST",
      data: { email, password },
    });

    runInAction(() => {
      this.loading = false;
      if (response?.success && response?.data?.status === 200) {
        const { token, user } = response.data.response; // ← destructure from response

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        this.loginData = user;
        const userId = user?._id || user?.id;
        formStore.init(userId);
      } else {
        this.error =
          response?.data?.message || response?.message || "Login failed";
      }
    });

    return response;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    runInAction(() => {
      this.loginData = null;
      this.error = null;
    });
  }

  resetLoginState() {
    runInAction(() => {
      this.loading = false;
      this.error = null;
      this.loginData = null;
    });
  }
}

const loginStore = new LoginStore();
export default loginStore;
export { loginStore };
