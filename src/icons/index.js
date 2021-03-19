import Vue from 'vue';
import IonIcon from '@/components/IonIcon';

// register globally
Vue.component('ion-icon', IonIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
