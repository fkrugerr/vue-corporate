import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#0f6bcf',
        secondary: '#424242',
        accent: '#0a7f60',
        error: '#FF5252',
        info: '#3f8ad7',
        success: '#0ab78e',
        warning: 'fad633',
      },
    },
  },
});
