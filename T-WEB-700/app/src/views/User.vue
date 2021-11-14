<template>
    <div class="user">
        <div class="container">
            <div class="crypto-container">
                <h1>Top Crypto Currencies</h1>
                <div class="CryptoClass">
                    <CryptoBoard />
                </div>
            </div>
            <div class="article-container">
                <h1>Crypto Article</h1>
                <span class="ArticleClass">
                    <Articles />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import Articles from "../components/HomePanel/Articles";
    import CryptoBoard from "../components/HomePanel/CryptoBoard";

    export default {
        name: "User",
        components: {
            Articles,
            CryptoBoard,
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

    .user {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80vh;
        width: 98vw;
    }
    .CryptoClass {
        width: 69vw;
    }
    .ArticleClass {
        width: 28vw;
        height: 77vh;
        display: flex;
        overflow-y: auto;
    }

    h1 {
        margin-bottom: 15px;
        font-family: 'Roboto', sans-serif;
    }
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 99vh;
        width: 97vw;
    }
    .crypto-container {
        margin-right: 15px;
    }
</style>
