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
      <v-btn icon>
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
    <v-btn bottom color="green" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt
                  />
                </v-avatar>
                <v-text-field placeholder="Name" />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-domain" placeholder="Company" />
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title" />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-email" placeholder="Email" />
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
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
    isDrawer: false,
  }),
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
