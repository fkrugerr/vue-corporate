<template>
  <v-card>
    <v-card-title class="grey">{{ title }}</v-card-title>
    <v-tabs v-model="tab" fixed-tabs background-color="indigo" dark>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        General
      </v-tab>

      <v-tab href="#tab-2">
        Passport
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-row class="mx-2">
                <v-col cols="6">
                  <v-text-field
                    prepend-icon="mdi-domain"
                    placeholder="Coorporation Name"
                    v-model="name"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    prepend-icon="mdi-email"
                    placeholder="Admin Email"
                    v-model="adminEmail"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    disabled
                    prepend-icon="mdi-dialpad"
                    placeholder="Code"
                    v-model="registrationCode"
                  />
                </v-col>
                <v-col cols="4">
                  <v-btn text color="primary" @click="generateCode"
                    >Generate Code</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-card flat>
          <v-card-text>tab 2</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-card-actions>
      <v-spacer />
      <v-btn text color="primary" @click="closeModal">Cancel</v-btn>
      <v-btn text @click="closeModal">Save</v-btn>
    </v-card-actions>
    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { generateCode } from '../../helpers/corporations';
import restApi from '../../api';

export default {
  props: {
    title: String,
    closeModal: Function,
    corporationId: String,
  },
  data() {
    return {
      tab: null,
      loading: false,
      name: '',
      adminEmail: '',
      registrationCode: '',
    };
  },
  methods: {
    generateCode() {
      this.registrationCode = generateCode();
    },
    initForm(data) {
      this.name = data.corporation.name;
      this.adminEmail = data.corporation.admin_email;
      this.registrationCode = data.corporation.registration_code;
    },
  },
  async created() {
    if (this.corporationId) {
      this.loading = true;
      const res = await restApi(`admin/corporations/${this.corporationId}`);
      this.initForm(res);
      this.loading = false;
    } else this.generateCode();
  },
};
</script>
