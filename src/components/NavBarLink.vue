<template>
  <router-link v-bind:to="'/' + name">
    <a
      class="mdl-navigation__link"
      v-bind:class="{selected: (path == '/' + name || (defaultRoute && path == '/') )}"
    >
      {{ Utils.capitalizeFirst(name) }}
    </a>
  </router-link>
</template>

<script>
import Utils from '../modules/utils'

export default {
  name: "NavBarLink",
  data() {
    return {
      Utils
    }
  },
  props: {
    name: String,
    defaultRoute: Boolean
  },
  computed: {
    path() {
      return this.$route.fullPath
    }
  }
};
</script>

<style scoped>

.selected {
 font-weight: 500 !important;
 color: #FFF;
 opacity: 1;
 background-color: lightseagreen;
}

.mdl-navigation__link {
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight:300;
}

.mdl-navigation__link:hover {
  background-color: lightseagreen;
  transition: 0.3s;
}
</style>
