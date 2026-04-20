// import { makeAutoObservable } from "mobx";
// import makeApiCall from "../../services/apiCall";
// import { URLS } from "../../services/urls";

// class FormStore {
//   currentStep = 1;
//   TOTAL_STEPS = 6;
//   formData = {};
//   loading = false;

//   constructor() {
//     makeAutoObservable(this);

//     const savedStep = localStorage.getItem("step");
//     if (savedStep) {
//       this.currentStep = Number(savedStep);
//     }
//   }

//   nextStep() {
//     this.currentStep++;
//     localStorage.setItem("step", this.currentStep);
//   }

//   prevStep() {
//     this.currentStep--;
//     localStorage.setItem("step", this.currentStep);
//   }

//   async saveStep(userId, step, data) {
//     await makeApiCall({
//       url: URLS.saveStep,
//       method: "POST",
//       data: { userId, step, data },
//     });

//     this.formData[step] = data;
//   }

//   async fetchForm(userId) {
//     const res = await makeApiCall({
//       url: URLS.getForm(userId),
//       method: "GET",
//     });

//     if (res) {
//       this.formData = res;
//     }
//   }

//   get progress() {
//     return (this.currentStep / this.TOTAL_STEPS) * 100;
//   }
// }

// export default new FormStore();
