<template>
  <div class="px-4">
    <v-card>
      <v-card-title>
        Corporations
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-database-search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="corporations"
        :search="search"
        @click:row="handleClick"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from '../store/modules/corporations';

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Registration Code',
          align: 'left',
          sortable: false,
          value: 'registration_code',
        },
        {
          text: 'Admin Email',
          align: 'left',
          sortable: true,
          value: 'admin_email',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['corporations']),
  },
  methods: {
    ...mapActions(['fetchCorporations']),
    handleClick(value) {
      console.log(value);
    },
  },
  created() {
    this.fetchCorporations();
  },
};
</script>
