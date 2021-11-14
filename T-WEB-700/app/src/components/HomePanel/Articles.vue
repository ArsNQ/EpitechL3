<template>
  <section class="section">
    <div v-for="article in _self['article/getArticles']" :key="article">
      <div class="card" style="width: 32rem;">
        <div class="card-body">
          <h5 class="card-title">{{article.title}}</h5>
          <hr class="red" />
          <h6 class="card-subtitle mb-2 text-muted"><th>{{article.creator}}</th></h6>
          <p class="card-text">{{article.content}}</p>
          <a class="card-link" v-bind:href="article.link" target="_blank">Full article here</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: "ArticleUserSelected",
  data: () => ({
    articles: [],
    errors: [],
    info: "",
  }),
  created() {
    this.axios
      .get("http://localhost:8081/articles")
      .then((response) => {
        this.articles = response.data;
        console.log(response.data); // This will give you access to the full object
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
  computed: {
    ...mapGetters(['article/getArticles'])
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

.red {
  background: red;
  height: 2px;
}
.card {
  margin-bottom: 2rem;
  border: solid 1px;
  box-shadow: 6px 7px 5px -6px rgba(0, 0, 0, 0.75);
}
.section {
  display: flex;
  flex-direction: column;
  height: 46.5vh;
}
</style>
