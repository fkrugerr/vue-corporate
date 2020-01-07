<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="isDrawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="isAuthorized"
    >
      <side-menu />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      v-if="isAuthorized"
    >
      <v-app-bar-nav-icon @click.stop="isDrawer = !isDrawer" />
      <v-toolbar-title class="ml-0 px-4 mr-5">
        <span class="hidden-sm-and-down">Administrator Dashboard</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <div>{{ userName }} ({{ userEmail }})</div>
      <v-btn icon @click="doLogout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import sideMenu from './components/layout/SideMenu.vue';

export default {
  props: {
    source: String,
  },
  components: {
    sideMenu,
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'auth/isAuthorized',
      userName: 'auth/userName',
      userEmail: 'auth/userEmail',
    }),
  },
  data: () => ({
    dialog: false,
    isDrawer: null,
  }),
  methods: {
    ...mapActions({
      doLogout: 'auth/logout',
    }),
  },
  watch: {
    isAuthorized(next, prev) {
      if (!prev && next) {
        this.$router.push({
          name: 'home',
        });
        this.loadData();
      }
      if (prev && !next) {
        this.$router.push({
          name: 'login',
        });
      }
    },
  },
};
</script>
