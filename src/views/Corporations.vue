<template>
  <div class="px-4">
    <v-card class="mb-4">
      <v-card-title>
        Corporations
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-database-search"
          label="Search"
          single-line
          hide-details
        />
        <v-spacer />
        <div class="ml-5">
          <v-btn depressed color="primary" @click="createItem">New</v-btn>
        </div>
      </v-card-title>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="corporations"
        :search="search"
        :items-per-page="15"
        :loading="isLoading"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-square-edit-outline
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-trash-can-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" width="800px">
      <form-component
        :title="formTitle"
        :closeModal="closeModal"
        :corporationId="corporationId"
        v-if="dialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from '../store/modules/corporations';
import formComponent from '../components/forms/Corporation.vue';
import { corporationsTableHeaders } from '../static/tableHeaders';

export default {
  components: {
    formComponent,
  },
  data() {
    return {
      dialog: false,
      corporationId: null,
      search: '',
      headers: corporationsTableHeaders,
    };
  },
  computed: {
    ...mapGetters(['corporations', 'isLoading']),
    formTitle() {
      return `${this.corporationId ? 'Edit' : 'Create'} Corporation`;
    },
  },
  methods: {
    ...mapActions(['fetchCorporations']),
    createItem() {
      this.corporationId = null;
      this.dialog = true;
    },
    editItem(item) {
      this.corporationId = item.uid;
      this.dialog = true;
    },
    deleteItem(item) {
      console.log(item);
    },
    closeModal() {
      this.dialog = false;
      this.corporationId = null;
    },
  },
  created() {
    this.fetchCorporations();
  },
};
</script>
