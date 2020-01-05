<template>
  <v-list dense>
    <template v-for="item in items">
      <v-list-item :key="item.text" link>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
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
