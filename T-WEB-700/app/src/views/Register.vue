<template>
    <div class="FormPage">
        <div>
            <h1> Register now </h1>
            <div class="FormStyle">
                <form
                 id="app"
                @submit="checkForm"
                method="post"
                >
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" v-model="username" class="form-control" id="username" name='username' placeholder="Entrer votre username :">

                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" name="email" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Password">
                    </div>
                    <div class="ButtonClass">
                        <button  type="submit" class="btn btn-primary">Submit</button>
                        <button type="submit" class="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import axios from 'axios'


    export default {
        name: "Register",
        data(){
            return{
                username:'',
                email:'',
                password:'',
                user:[]
            }
        },
    methods:{
       createUser() {
        this.$store.dispatch('user/register', {username:this.username, email:this.email, password: this.password})

    },
     checkForm: function (e) {
      axios({
        method: "POST",
        url: "http://localhost:8081/users/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username:this.username, email:this.email, password: this.password
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));

      e.preventDefault();
    }

    }
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
        border: solid 1px rgba(34,36,38,.15);
        width: 450px;
    }
    h1 {
        margin-bottom: 15px;
        font-family: 'Roboto', sans-serif;

    }
    label {
        font-family: 'Roboto', sans-serif;
    }
    .ButtonClass {
        margin-top: 25px;
        display: flex;
        justify-content: space-around;
        width: 400px;
    }

</style>
