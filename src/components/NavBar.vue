<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div id="nav-bar">
    <!-- <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header"> -->
    <div class="mdl-layout mdl-layout--fixed-header">
      <div class="mdl-layout__header navbarcolour">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <!-- <span class="mdl-layout-title"><img class="logo" src="../../public/logo.svg" height="48px"/>Homelink</span> -->
          <span class="mdl-layout-title"><img class="logo" src="../assets/logo.png"></span>
          <!-- Add spacer, to align navigation to the right -->
          
          <!-- Navigation. We hide it in small screens. -->

                      <div class="user-and-state">
              
              <span class="sync-status">
                <i class="material-icons">{{ syncIcon }}</i>
              </span>
              <br>
              <!-- <span class="sync-status">
                {{ state.syncStatus }}
              </span> -->
              
            </div>

          <div class="mdl-layout-spacer"></div>

          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <div class='username'>
              User: {{ userName }}<br>
            </div>
            <NavBarLink name="tasks"/>
            <NavBarLink name="projects" defaultRoute/>
          </nav>

          

          <nav class="mdl-navigation mdl-layout--large-screen-only">

            <a
              class="mdl-navigation__link"
              v-on:click="signOut"
            >
              Sign out
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import NavBarLink from './NavBarLink.vue';
import Blockchain from '../modules/blockchain'
import State from '../modules/state'

export default {
  name: "NavBar",
  data() {
    State.loadStateFromBlockchain()

    return {
      userName: Blockchain.getUserName(),
      state: State
    }
  },
  computed: {
    path() {
      return this.$route.fullPath
    },
    syncIcon() {
      switch (this.state.syncStatus) {
        case 'Synced':
          return 'cloud_done'
        case 'Syncing failed':
          return 'cloud_off'
        default:
          return 'cloud_upload'
      }
    }
  },
  components: {
    NavBarLink
  },
  methods: {
    signOut() {
      Blockchain.signOut()
    }
  }
};
</script>

<style scoped>
.mdl-layout__header-row {
  background: green;
}

.username {
  margin-right: 30px;
}

.sync-status {
  font-size: 10px;
}

.material-icons {
  color: white;
}

.user-and-state {
  text-align: center;
}

a {
  cursor: pointer;
  text-decoration: none;
}

.logo {
  height: 60px;
}

.selected {
 font-weight: 500 !important;
 color: #FFF;
 opacity: 1;
 background-color: lightblue;
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
