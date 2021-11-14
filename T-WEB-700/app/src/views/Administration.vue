<template>
    <div class="AdminClass">
      <div class="CoreClass">
        <div class="logoutTop"><button type="button" class="btn btn-dark" @click="logout()">Logout</button></div>
            <div class="CryptoClass">
              <cryptoBoard />
            </div>
              <div class="ButtonClass">
                <div id="app">
                      <button type="button" class="btn btn-dark" @click="showModal">Add your Crypto</button>
                      <modal v-show="isModalVisible" @close="closeModal"/>
                </div>
                <div class="inter"></div>
                <div id="app2">
                  <button type="button" class="btn btn-danger" @click="showModal2">Delete a Crypto</button>
                  <modal2 v-show="isModalVisible2" @close="closeModal2"/>
                </div>
              </div>
        <div class="articleAdmin">
          <ArticleAdmin/>
        </div>

        </div>
    </div>
</template>

<script>
    import CryptoBoard from "../components/HomePanel/CryptoBoard";
    import ArticleAdmin from "../components/AdminPanel/ArticleAdmin";
    import modal from "../components/AdminPanel/addCrypto";
    import modal2 from "../components/AdminPanel/removeCrypto";

    export default {
        name: "Administration",
        components: {
            ArticleAdmin,
            CryptoBoard,
            modal,
            modal2
        },
        data () {
            return {
                isModalVisible: false,
                isModalVisible2: false,
            };
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            showModal2() {
                this.isModalVisible2 = true;
            },
            closeModal2() {
                this.isModalVisible2 = false;
          },
          logout: function() {
            this.$store.dispatch('user/logout')
                .then(() => {
                  this.$router.push('/')
                })
          }
        },
    }
</script>

<style scoped>
    .AdminClass {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .CoreClass {
        width: 65vw;
    }
    .ButtonClass {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      margin-bottom: 15px;
      padding-bottom: 15px;
      padding-top: 15px;
      width: 69vw;
      border-bottom: 2px solid #c3c3c3;
      border-top: 2px solid #c3c3c3;
    }
    .CryptoClass {
      height: 35vh;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .inter {
      margin-left: 50px;
      margin-right: 50px;
    }
    .logoutTop {
      position: absolute;
      display: flex;
      top: 95px;
      right: 32px;
    }
</style>