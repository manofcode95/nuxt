import { fbAuth } from "@/firebase/fireinit";
import Cookies from "js-cookie";

export const state = () => ({
  uid: null,
  user: null
});

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid;
    else return null;
  },

  user(state) {
    return state.user;
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid;
  }
};

export const mutations = {
  saveUID(state, uid) {
    console.log("[STORE MUTATIONS] - saveUID:", uid);
    state.uid = uid;
  },
  setUSER(state, user) {
    console.log("[STORE MUTATIONS] - setUSER:", user);
    state.user = user;
  }
};

export const actions = {
  authenticate({ commit }, payload) {
    if (payload.isLogin) {
      fbAuth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          this.$router.replace("/");
        })
        .catch(err => alert(err.message));
    } else {
      fbAuth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          this.$router.replace("/");
        })
        .catch(err => alert(err.message));
    }
  },

  async login({ dispatch, state }, user) {
    console.log("[STORE ACTIONS] - login");
    const token = await fbAuth.currentUser.getIdToken(true);
    const loadedPosts = await dispatch("modules/posts/loadPosts", null, {
      root: true
    });
    console.log(loadedPosts);
    const userInfo = {
      email: user.email,
      uid: user.uid
    };

    Cookies.set("access_token", token); // saving token in cookie for server rendering
    await dispatch("setUSER", userInfo);
    await dispatch("saveUID", userInfo.uid);
    console.log("[STORE ACTIONS] - in login, response:", status);
  },

  async logout({ commit, dispatch }) {
    console.log("[STORE ACTIONS] - logout");
    await fbAuth.signOut();

    Cookies.remove("access_token");
    commit("setUSER", null);
    commit("saveUID", null);
  },

  saveUID({ commit }, uid) {
    console.log("[STORE ACTIONS] - saveUID");
    commit("saveUID", uid);
  },

  setUSER({ commit }, user) {
    commit("setUSER", user);
  }
};
