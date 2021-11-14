<template>
  <section class="section">
    <h4>Searching by Title</h4>
    <div class="searchClass">
      <input type="text" v-model="search" class="form-control" id="username" placeholder="search here ...">
      <button type="button" class="btn btn-dark" @click="searchField">search</button>
    </div>
    <hr />
    <div v-for="article in renderArticles" :key="article._id">
      <div class="card" style="width: 30rem">
        <div class="card-body">
          <h5 class="card-title">{{ article.title }}</h5>
          <hr class="red" />
          <h6 class="card-subtitle mb-2 text-muted">
            <th>{{ article.creator }}</th>
          </h6>
          <p class="card-text">{{ article.content }}</p>
          <a class="card-link" v-bind:href="article.link" target="_blank">Full article here</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "articlePanel",
  data: () => ({
    articles: [],
    errors: [],
    info: "",
    search: '',
    renderArticles: []
  }),
  created() {
    this.axios
        .get("http://localhost:8081/articles")
        .then((response) => {
          this.articles = response.data;
          this.renderArticles = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
  },
  methods: {
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

  .red {
    background: red;
    height: 2px;
  }
  .card {
    width: 30rem;
    margin-bottom: 2rem;
    border: solid 1px;
    box-shadow: 6px 7px 5px -6px rgba(0, 0, 0, 0.75);
  }
  .section {
    display: flex;
    flex-direction: column;
    height: 40.5vh;
  }
</style>
