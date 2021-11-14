<template>
    <div class="twitter">
        <p>or Sign in with Twitter</p>
        <button id="twitterButton" @click="twitterSubmit" type="button" class="btn btn-info btn-large"><i class="fab fa-twitter"></i> Twitter</button>
    </div>
</template>
<script>
    import axios from "axios";
    import {parse} from "querystring"

    export default {
        methods: {
            twitterSubmit : function () {
                return axios.get('http://localhost:8081/users/token-twitter')
                    .then (async ({data}) => {
                        const {oauth_token} = data;
                        const popUp = await this.openPopUp(`https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}&force_login=true`)
                        this.polling(popUp);
                    })
            },
            openPopUp:function(url) {
                return window.open(url,"","toolbar=no, location=no,status=no,menubar=no, resizable=no, copyhistory=no,width=600, height=600")
            },
            polling: function(pop) {
              const that=this;
                const polling = setInterval(function() {
                    try {
                        console.log(pop.location.pathname)
                        if (pop.location.pathname.includes('/twitterCallback')) {
                            const query = parse(pop.location.search.replace("?",""))
                            clearInterval(polling);
                            axios.post('http://localhost:8081/users/login-twitter',
                                query,
                            {
                                headers: {
                                    withCredentials:true,
                                    'Access-Control-Allow-Origin': '*',
                                    'content-type': 'application/json'
                                }
                            }).then((res)=> {
                                pop.close()
                              that.$store.dispatch("user/signInTwitterSuccess")
                              that.$router.push('/profile')
                              console.log(res.data)
                            })
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }, 500)
            }
        }
    }
</script>

