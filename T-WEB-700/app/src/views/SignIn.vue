<template>
  <div class="FormPage">
    <div>
      <h1> Sign In </h1>
      <div class="FormStyle">
        <form
            id="signin"
            @submit.prevent="checkSignin"
            method="post"
        >
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp"
                   mail="email" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" mail="password"
                   placeholder="Password">
          </div>
          <div class="ButtonClass">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="submit" class="btn btn-danger">Cancel</button>
          </div>
          <div class="border"></div>
          <LoginTwitter/>
          <div class="border"></div>
          <p class="RegisterText"> Don't have an account?
            <router-link to="/register">Register now</router-link>
          </p>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import LoginTwitter from "../components/login-twitter/LoginTwitter.vue"


export default {
  name: "SignIn",
  components: {
    LoginTwitter
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    checkSignin: function () {
      this.$store.dispatch('user/signIn',{email: this.email, password: this.password})
          .then((res) => {
            if (res.data.role === "User") {
              this.$router.push('/profile')
          } else if (res.data.role === "admin") {
              this.$router.push('/admin')
          }
      })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

.FormPage {
  display: flex;
  justify-content: center;
  align-items: center;
}

.FormStyle {
  padding: 25px;
  border-radius: 10px;
  border: solid 1px rgba(34, 36, 38, .15);
}

h1 {
  margin-bottom: 15px;
  font-family: 'Roboto', sans-serif;

}

label {
  font-family: 'Roboto', sans-serif;
}

.ButtonClass {
  margin-top: 15px;
  width: 275px;
  display: flex;
  justify-content: space-between;
}

.RegisterText {
  margin-top: 25px;
}

input {
  margin-top: 10px;
  margin-bottom: 5px;
}

.twitter {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.border {
  border: 1.5px solid #c3c3c3;
  margin-top: 15px;
  margin-bottom: 15px;
}

.btn-large {
  background-color: #24292e;
  border-color: #24292e;
}
</style>
