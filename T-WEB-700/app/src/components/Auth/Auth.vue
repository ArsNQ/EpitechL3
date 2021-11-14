<template>
  <fragment>
    <slot ></slot>
  </fragment>
</template>

<script>

export default {
  name: "Auth",
  mounted() {
      this.$store.dispatch('user/auth');
  },
  computed: {
      user:function(){
        console.log(this.$store.getters['user/me'])
        return this.$store.getters['user/me']
      }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
