<template>
  <div class="ArticleAdmin">
    <div class="searchClass">
      <input type="text" v-model="search" class="form-control" id="username" placeholder="Search here ...">
      <button type="button" class="btn btn-dark" @click="searchField">search</button>
    </div>
    <section class="section">
      <div v-for="article in renderArticles" :key="article" class="tableArticle">
          <th>Implement<input @change="checked($event, article)" class="leftCheckbox" type="checkbox" /></th>
          <th>{{ article.title }}</th>
          <th><a class="card-link" v-bind:href="article.link" target="_blank">Full article here</a></th>
          <th>{{ article.creator }}</th>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ArticleAdmin",
  data() {
    return {
      articles: [],
      search: '',
      renderArticles: []
    };
  },
  created() {
    this.axios
      .get("http://localhost:8081/articles")
      .then((response) => {
        this.articles = response.data;
        console.log(response.data); // This will give you access to the full object
        this.renderArticles = response.data;
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  methods: {
    checked (event, article) {
      if (event.target.checked) {
        this.$store.commit('article/addArticle', article)
      }
      else {
        this.$store.commit('article/removeArticle', article)
      }
    },
    searchField () {
      let tmp = []
      tmp = this.articles.filter((article) => {
        return article.title.includes(this.search)
      })
      this.renderArticles = tmp
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");
  th {
    width: 60vw;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  tr {
    text-align: center;
    margin: 1px;
    font-family: "Roboto", sans-serif;
  }
  table {
      table-layout: fixed;
      border-collapse: collapse;
  }
  section {
    height: 15vw;
    width: 70vw;
    overflow-y: auto;
  }
  .tableArticle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .leftCheckbox{
    margin-left: 30px;
  }
</style>
