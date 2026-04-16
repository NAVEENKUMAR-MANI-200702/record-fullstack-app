import { makeAutoObservable } from "mobx";
import makeApiCall from "../services/apiCall";
import { URLS } from "../services/urls";

class AuthStore {
  user = null;
  token = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
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

    if (res?.token) {
      this.user = res.user;
      this.token = res.token;
      localStorage.setItem("token", res.token);
    }

    this.loading = false;
  }
}

export default new AuthStore();
