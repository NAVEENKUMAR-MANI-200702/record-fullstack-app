import { makeAutoObservable } from "mobx";
import makeApiCall from "../services/apiCall";
import { URLS } from "../services/urls";

class AuthStore {
  user = null;
  token = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);

    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }

    if (savedToken) {
      this.token = savedToken;
    }
  }

  async register(email, password) {
    this.loading = true;

    const res = await makeApiCall({
      url: URLS.register,
      method: "POST",
      data: { email, password },
    });

    if (res?.token) {
      this.user = res.user;
      this.token = res.token;
      localStorage.setItem("token", res.token);
    }

    this.loading = false;
  }

  async login(email, password) {
    this.loading = true;

    const res = await makeApiCall({
      url: URLS.login,
      method: "POST",
      data: { email, password },
    });

    this.loading = false;

    if (res?.token) {
      this.user = res.user;
      this.token = res.token;
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      return { success: true, data: res };
    }

    return { success: false, message: res?.message };
  }
}

export default new AuthStore();
