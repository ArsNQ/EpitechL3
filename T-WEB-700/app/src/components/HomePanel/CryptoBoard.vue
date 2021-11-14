<template>
    <section>
      <div class="section">
          <b-table responsive striped hover :sort-direction="sortDirection" :items="coins" :fields="fields"></b-table>
      </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import { TablePlugin } from 'bootstrap-vue';
    Vue.use(TablePlugin);

    export default {
        name: 'TabCrypto',
        data: () => ({
            fields: [{key: 'rank', sortable: true, sortDirection: "asc"}, 'cryptoNAME', 'currentPrice', 'min','max', 'currency', 'symbol'],
            coins: [],
            errors: [],
            result: [{}],
            sortDirection: 'asc',
        }),

        mounted() {
            this.axios.get(`http://localhost:8081/cryptos/`)
                .then(response => {
                    console.log(response.data);
                    this.coins = response.data;
                })
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

    th {
        width: 300px;
        font-family: 'Roboto', sans-serif;
    }
    tr {
        text-align: center;
        margin: 1px;
        font-family: 'Roboto', sans-serif;

    }
    table {
         table-layout: fixed;
         border-collapse: collapse;

    }
    tbody tr:nth-child(odd) {
        background-color: #c3c3c3;
    }

    tbody tr:nth-child(even) {
        background-color: #e2e2e2;
    }
</style>
