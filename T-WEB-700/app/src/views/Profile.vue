<template>
    <div class="page-profile">
      <div class="logoutTop"><button type="button" class="btn btn-dark" @click="logout()">Logout</button></div>
      <div class="profileColumn">
            <div class="headerProfile">
              <div class="rowProfile">
                <div class="formTitle">
                  <h1>Hello {{_self['user/me'].username}} </h1>
                  <h5>Your address is {{_self['user/me'].email}} </h5>
                  <h5>Your role is {{_self['user/me'].role}}</h5>
                </div>
                <div class="form-group">
                  <h5>Change your informations bellow</h5>
                  <input type="text" v-model="username" class="form-control" id="username" placeholder="New Username">
                  <input type="email" v-model="address" class="form-control" id="email" aria-describedby="emailHelp" mail="email" placeholder="New Address">
                  <div class="ButtonClass">
                    <button @click="updateProfile" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
              <div class="CryptoClass">
                <cryptoBoard />
              </div>
            </div>
          <div class="articleClass">
            <articlePanel />
          </div>
      </div>
    </div>
</template>

<script>
    import CryptoBoard from "@/components/HomePanel/CryptoBoard";
    import articlePanel from "@/components/profilePanel/articlePanel"
    import {mapGetters} from 'vuex'

    export default {
        name: "Profile",
        components: {
          CryptoBoard,
          articlePanel
        },
      data() {
        return({
          username: '',
          address: '',
        })
      },
      computed: {
          ...mapGetters(['user/me'])
      },
      methods: {
          logout: function() {
            this.$store.dispatch('user/logout')
            .then(() => {
              this.$router.push('/')
                })
          },
          updateProfile () {
            this.$store.commit('user/updateUser', {username:this.username, email:this.address})
          }
      }
    }
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

    .page-profile {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .headerProfile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .profileColumn {
      display: flex;
    }
    .rowProfile {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 69vw;
      border: 1px solid #c3c3c3;
      padding: 15px;
      margin: 10px;
      border-radius: 15px;
      background: #e2e2e2;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .form-control {
      margin-bottom: 10px;
    }
    .CryptoClass {
      height: 59vh;
      overflow-y: scroll;
      overflow-x: hidden;
      margin-left: 15px;
    }
    .logoutTop {
      position: absolute;
      display: flex;
      top: 95px;
      right: 25px;
    }
    .articleClass {
      margin-top: 50px;
      margin-left: 10px;
      padding-right: 10px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    h5 {
      font-family: "Roboto", sans-serif;
    }
    h1 {
      font-family: "Roboto", sans-serif;
    }
</style>
