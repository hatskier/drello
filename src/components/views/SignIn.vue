<template>
  <div class="button-container">
    <h4 class="centered">Welcome to drello. please sign in to continue.</h4>
    <button
      v-on:click="signIn"
      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
      Sign in to blockstack
    </button>
  </div>
</template>

<script>
import Blockchain from '../../modules/blockchain'

export default {
  name: 'ShoppingLists',
  props: {
  },
  methods: {
    signIn() {
      Blockchain.signIn()
    }
  }
}
</script>

<style scoped>
h4 {
  margin-top: 50px;
}

button {
  /* height: 100px;
  width: 100px; */
  width: 250px;
  height: 50px;
  position: fixed;
  left: 50vw;
  margin-left: -125px;
  margin-top: -45px;
  top: 50vh;
}
</style>
