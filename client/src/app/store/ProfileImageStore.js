import { makeAutoObservable, runInAction } from "mobx";
import { MakeApiCall, URLS } from "../../utils/ApiUrl";

class ProfileImageStore {
  uploading = false;
  imageUrl = null;
  error = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async uploadImage(file) {
    if (!file) return null;

    this.uploading = true;
    this.error = null;

    const formData = new FormData();
    formData.append("image", file);

    const response = await MakeApiCall({
      url: URLS.addProfileImg,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    runInAction(() => {
      this.uploading = false;
      if (response?.success && response?.data?.status === 200) {
        this.imageUrl = response.data.response?.url || null;
      } else {
        this.error = response?.data?.message || "Failed to upload image";
      }
    });

    return this.imageUrl;
  }

  reset() {
    runInAction(() => {
      this.uploading = false;
      this.imageUrl = null;
      this.error = null;
    });
  }
}

const profileImageStore = new ProfileImageStore();
export default profileImageStore;
export { profileImageStore };