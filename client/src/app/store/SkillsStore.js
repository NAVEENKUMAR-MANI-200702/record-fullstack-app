import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../utils/ApiUrl";

class SkillsStore {
  skills = {};
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchSkills() {
    if (Object.keys(this.skills).length > 0) return;
    if (this.loading) return;
    this.loading = true;
    this.error = null;

    const response = await MakeApiCall({
      url: URLS.getSkills,
      method: "GET",
    });

    runInAction(() => {
      this.loading = false;
      if (response?.success && response?.data?.status === 200) {
        this.skills = response.data.response || {}; 
      } else {
        this.error = response?.data?.message || "Failed to fetch skills";
      }
    });
  }

  reset() {
    runInAction(() => {
      this.skills = [];
      this.loading = false;
      this.error = null;
    });
  }
}

const skillsStore = new SkillsStore();
export default skillsStore;
export { skillsStore };
