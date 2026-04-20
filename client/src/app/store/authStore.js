// import { makeAutoObservable, runInAction } from "mobx";
// import makeApiCall from "../../services/apiCall";
// import { URLS } from "../../services/urls";

// class AuthStore {
//   user = null;
//   token = localStorage.getItem("token") || null;
//   isLoggedIn = false;
//   loading = false;
//   error = null;

//   constructor() {
//     makeAutoObservable(this, {}, { autoBind: true });
//   }

//   setState(state) {
//     runInAction(() => Object.assign(this, state));
//   }

//   setToken(token) {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }

//   async register(email, password) {
//     this.setState({ loading: true, error: null });

//     try {
//       const res = await makeApiCall({
//         url: URLS.register,
//         method: "POST",
//         data: { email, password },
//       });

//       if (res?.token) {
//         this.setState({
//           user: res.user,
//           token: res.token,
//           isLoggedIn: true,
//         });

//         this.setToken(res.token);
//       }
//     } catch (err) {
//       this.setState({ error: err.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   async login(email, password) {
//     this.setState({ loading: true, error: null });

//     try {
//       const res = await makeApiCall({
//         url: URLS.login,
//         method: "POST",
//         data: { email, password },
//       });

//       if (res?.token) {
//         this.setState({
//           user: res.user,
//           token: res.token,
//           isLoggedIn: true,
//         });

//         this.setToken(res.token);
//       }
//     } catch (err) {
//       this.setState({ error: err.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   async checkAuth() {
//     console.log("Checking auth...");

//     const token = this.token;

//     if (!token) {
//       console.log("❌ No token");
//       this.setState({ isLoggedIn: false, user: null });
//       return;
//     }

//     this.setState({ loading: true });

//     try {
//       const res = await makeApiCall({
//         url: URLS.isLoggedIn,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res?.loggedIn) {
//         console.log("✅ User valid");

//         this.setState({
//           isLoggedIn: true,
//           user: res.user,
//         });
//       } else {
//         throw new Error("Invalid token");
//       }
//     } catch (error) {
//       console.log("❌ Auth failed");

//       this.setState({
//         isLoggedIn: false,
//         user: null,
//         token: null,
//       });

//       this.setToken(null);
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   logout() {
//     this.setState({
//       user: null,
//       token: null,
//       isLoggedIn: false,
//     });

//     this.setToken(null);
//   }
// }

// const authStore = new AuthStore();
// export default authStore;
