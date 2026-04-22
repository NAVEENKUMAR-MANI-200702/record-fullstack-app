import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../utils/ApiUrl";

const isEqual = (a, b) => {
  if (a === b) return true;
  if (!a || !b) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

class FormStore {
  currentStep = 1;
  TOTAL_STEPS = 6;
  formData = {};
  loading = false;
  saving = false;
  error = null;
  userId = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        this.userId = parsed._id || parsed.id;
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
  }

  nextStep() {
    if (this.currentStep < this.TOTAL_STEPS) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep <= 1) return;
    this.currentStep--;
  }

  async saveStep(stepKey, stepData) {
    const existing = this.formData[stepKey];

    if (isEqual(existing, stepData)) {
      console.log(`[${stepKey}] No changes detected, skipping save.`);
      return true;
    }

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

  async completeOnboarding() {
    const res = await MakeApiCall({
      url: URLS.completeForm,
      method: "PUT",
      data: {
        userId: this.userId,
      },
    });

    return res?.success;
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
    localStorage.removeItem("user");
  }
}

const formStore = new FormStore();
export default formStore;
export { formStore };
