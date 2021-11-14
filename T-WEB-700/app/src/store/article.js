const state = {
    articles: []
};

const mutations = {
    addArticle: (state, payload) => {
        state.articles.push(payload)
    },
    removeArticle: (state, payload) => {
        state.articles=state.articles.filter((element) => {
            return element._id !== payload._id
        })
    }
};

const getters = {
    getArticles: state =>  state.articles,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
