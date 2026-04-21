import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../utils/ApiUrl";

class FormStore {
  currentStep = 1;
  TOTAL_STEPS = 8;
  formData = {};
  loading = false;
  saving = false;
  error = null;
  userId = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    const savedUser = localStorage.getItem("user");
    const savedStep = localStorage.getItem("currentStep");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        this.userId = parsed._id || parsed.id;
        console.log("FormStore rehydrated userId:", this.userId);
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }

    if (savedStep) {
      this.currentStep = Number(savedStep);
    }
  }

  nextStep() {
    if (this.currentStep < this.TOTAL_STEPS) {
      this.currentStep++;
      localStorage.setItem("currentStep", this.currentStep);
    }
  }

  async saveStep(stepKey, stepData) {
    this.saving = true;
    this.error = null;

    const response = await MakeApiCall({
      url: URLS.saveStep,
      method: "POST",
      data: {
        userId: this.userId,
        step: stepKey,
        data: stepData,
      },
    });

    runInAction(() => {
      this.saving = false;
      if (response?.success && response?.data?.status === 200) {
        this.formData[stepKey] = stepData;
      } else {
        this.error = response?.data?.message || "Failed to save step";
      }
    });

    return response?.success && response?.data?.status === 200;
  }

  async prevStep() {
    if (this.currentStep <= 1) return;

    this.loading = true;
    this.error = null;

    const response = await MakeApiCall({
      url: URLS.getForm(this.userId),
      method: "GET",
    });

    runInAction(() => {
      this.loading = false;
      if (response?.success && response?.data?.status === 200) {
        this.formData = response.data.response || {};
        this.currentStep--;
        localStorage.setItem("currentStep", this.currentStep);
      } else {
        this.error = response?.data?.message || "Failed to fetch form data";
      }
    });
  }

  async fetchForm() {
    if (!this.userId) return;

    this.loading = true;
    this.error = null;

    const response = await MakeApiCall({
      url: URLS.getForm(this.userId),
      method: "GET",
    });

    runInAction(() => {
      this.loading = false;
      if (response?.success && response?.data?.status === 200) {
        this.formData = response.data.response || {};
      } else {
        this.error = response?.data?.message || "Failed to fetch form";
      }
    });
  }

  getStepData(step) {
    return this.formData[`step${step}`] || {};
  }

  get progress() {
    return Math.round((this.currentStep / this.TOTAL_STEPS) * 100);
  }

  reset() {
    runInAction(() => {
      this.currentStep = 1;
      this.formData = {};
      this.loading = false;
      this.saving = false;
      this.error = null;
      this.userId = null;
    });
    localStorage.removeItem("currentStep");
    localStorage.removeItem("userId");
  }
}

const formStore = new FormStore();
export default formStore;
export { formStore };
