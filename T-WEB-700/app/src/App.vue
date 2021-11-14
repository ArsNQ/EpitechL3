<template>
  <Auth>
    <div class="navBar">
      <router-link to="/"><img class="logoClass" src="./assets/Logo.png" /></router-link>
      <router-link to="/signIn" style="color: black">
        <b-icon-person-circle scale="1" style="width:65px; height:65px" class="side"></b-icon-person-circle>
      </router-link>
    </div>
    <router-view>
    </router-view>
  </Auth>
</template>

<script>

import Auth from "@/components/Auth/Auth";

export default {
  name: 'App',
  components: {Auth},
  component: {
    Auth
  },
  data() {
    return{
      user: null
    }
  },
}
</script>

<style>
  .logoClass{
    width: 20%
  }
  .navBar {
    width: 98vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
