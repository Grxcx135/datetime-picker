import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@/styles/main.scss';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {
  mdiChevronDown,
  mdiCloseCircle,
  mdiEye,
  mdiEyeOff,
  mdiCalendarMonthOutline
} from '@mdi/js';

import { VDateInput } from 'vuetify/labs/VDateInput';
import { VTimePicker } from 'vuetify/labs/VTimePicker';

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#4C6FFF',
    primaryDarken: '#003660',
    secondary: '#E4ECF7',
    tertiary: '#FF92AE',
    success: '#66CB9F',
    warning: '#F7936F',
    danger: '#F16063',
    dark: '#16192C',
    surfacePrimary: '#FFFFFF',
    surfaceSecondary: '#F7FAFC',
    surfaceThird: '#e6e6e6',
    surfaceLight: '#D5D5DC',
    surfaceLight2: '#C4C4C4',
    surfaceLight3: '#BDBDBD',
    surfaceLight4: '#F2F2F2',
    greyDarken1: '#636363',
    greyDarken2: '#515151',
    greyDarken3: '#878787',
    greyDarken4: '#8A8A8A',
    stageLight1: '#D9D9D9',
    stageLight2: '#FFEE8D',
    stageDark2: '#B69A00',
    stageLight3: '#C2E5FE',
    stageDark3: '#035A9D',
    stageLight4: '#F4C2FE',
    stageDark4: '#90039D',
    stageLight5: '#A9F599',
    stageDark5: '#028315',
    stageLight6: '#F59999',
    stageDark6: '#830202',
    red: '#C30000',
    bootstrap: '#17171B',
    facebook: '#3B5999',
    twitter: '#1DA1F2',
    instagram: '#E4405F',
    pinterest: '#BD081C',
    youtube: '#CD201F',
    dribbble: '#EA4C89',
    github: '#222222',
    reddit: '#FF4301',
    uploadErrorText: '#F37261',
    green: '#17B978',
    greenLight1: '#99d98c'
  }
};

const vuetify = createVuetify({
  components: {
    VDateInput,
    VTimePicker
  },
  directives,

  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      chevronDown: mdiChevronDown,
      closeCircle: mdiCloseCircle,
      eyeOpen: mdiEye,
      eyeClose: mdiEyeOff,
      calendarMonthOutline: mdiCalendarMonthOutline
    },
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme: {
        ...myCustomLightTheme,
        variables: {
          fontFamily: '"Roboto", sans-serif'
        }
      }
    }
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      rounded: 'lg',
      class: 'text-capitalize'
    },
    VSelect: {
      variant: 'outlined',
      rounded: 'lg',
      density: 'compact',
      singleLine: true
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'compact',
      rounded: 'lg',
      hideDetails: 'auto'
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
      rounded: 'lg',
      hideDetails: 'auto'
    }
  }
});

export default vuetify;
