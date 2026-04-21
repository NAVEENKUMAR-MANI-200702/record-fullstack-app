import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../../utils/ApiUrl";

export class SignupStore {
  loading = false;
  error = null;
  signupData = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async signup(email, password) {
    this.loading = true;
    this.error = null;
    this.signupData = null;

    const response = await MakeApiCall({
      url: URLS.register,
      method: "POST",
      data: { email, password },
    });

    runInAction(() => {
      this.loading = false;
      if (response?.success && response?.data?.status === 201) {
        this.signupData = response.data.response;
      } else {
        this.error = response?.data?.message || response?.message || "Signup failed";
      }
    });

    return response;
  }

  resetSignupState() {
    runInAction(() => {
      this.loading = false;
      this.error = null;
      this.signupData = null;
    });
  }
}

const signupStore = new SignupStore();
export default signupStore;
export { signupStore };