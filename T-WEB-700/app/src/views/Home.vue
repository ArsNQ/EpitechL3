<template>
    <div class="HomeClass">
        <div class="StructurePage">
            <div class="FirstColumn">
                <h1>Top Crypto Currencies</h1>
                <div class="CryptoClass">
                    <CryptoBoard />
                </div>
            </div>
            <div class="SecondColumn">
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
        name: "Home",
        components: {
            Articles,
            CryptoBoard,
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

    .HomeClass {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80vh;
        width: 98vw;
    }
    .CryptoClass {
      height: 77vh;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .FirstColumn {
      margin-right: 15px;
      height: 10.5vh;
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
    .StructurePage {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 99vh;
        width: 97vw;
    }
</style>
