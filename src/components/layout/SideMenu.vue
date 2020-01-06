<template>
  <v-list>
    <template v-for="item in permissions">
      <v-list-item :key="item._id" link :to="item.path.web">
        <v-list-item-action>
          <v-icon>mdi-arrow-right-bold-circle-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      permissions: 'auth/permissions',
    }),
  },
  data() {
    return {
      items: [
        {
          icon: 'mdi-contacts',
          text: 'Contacts',
        },
        {
          icon: 'mdi-history',
          text: 'Frequently contacted',
        },
        {
          icon: 'mdi-content-copy',
          text: 'Duplicates',
        },
      ],
    };
  },
};
</script>
