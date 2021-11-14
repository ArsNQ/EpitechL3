<template>
  <transition>
    <div class="CorePage">
      <form id="app" @submit="removeCrypto" method="post">
        <div class="modal" role="dialog" aria-describedby="modalDescription">
          <div class="modal-body" id="modalDescription">
            <h4>Delete a Cryptocurrency</h4>
            <div class="formTag">
              <h6>Cryptocurrency Name</h6>
              <input class="form-control" v-model="cryptoNAME" type="text" id="cryptoNAME">
            </div>
            <div class="formTag">
              <h6>Cryptocurrency Code</h6>
              <input class="form-control" v-model="cryptoID" type="text" id="cryptoID">
            </div>
            <p>Are you sure to delete the current currencie ?</p>
            <div class="ButtonClass">
              <button type="submit" class="btn btn-outline-danger"><div class="fas fa-trash-alt"></div> DELETE</button>
              <button type="button" class="btn btn-outline-danger" @click="close">CANCEL</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </transition>

</template>

<script>
import axios from "axios";

export default {
  name: 'modal2',
  data(){
    return{
      cryptoID:'',
      cryptoNAME:'',
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    removeCrypto: function (e) {
      axios({
        method: "DELETE",
        url: "http://127.0.0.1:8081/cryptos/" + this.cryptoID,
        headers: {
          withCredentials:true,
          'content-type': 'application/json'
        },
        data: {
          cryptoID:this.cryptoID,
          cryptoNAME:this.cryptoNAME
        },
      })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));

      e.preventDefault();
    }
  },
};

</script>

<style>
.modal {
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
}
.modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;
}
.CorePage {
  height: 80vh;
  width: 98vw;
}
.CorePage {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
}
h4 {
  margin-bottom: 15px;
}
.formTag {
  margin-top: 10px;
  margin-bottom: 20px;
}
.ButtonClass {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  width: 220px;
}
.Style {
  padding: 25px;
  border-radius: 10px;
  border: solid 1px rgba(34,36,38,.15);
  width: 450px;
}
</style>