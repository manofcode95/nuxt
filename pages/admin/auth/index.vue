<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
        >Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
      </form>
      {{email}}--{{password}}
    </div>
  </div>
</template>

<script>
import { fbAuth } from "@/firebase/fireinit";
import { mapActions } from "vuex";
export default {
  name: "AdminAuthPage",
  layout: "admin",
  middleware: ["handle-login-route"],
  data() {
    return {
      isLogin: true,
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions("modules/user", ["login"]),
    onSubmit() {
      if (this.isLogin) {
        fbAuth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(firebaseUser => {
            return this.login({
              email: this.email,
              uid: firebaseUser.user.uid
            });
          })
          .then(() => {
            this.$router.push("/");
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  }
};
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>

