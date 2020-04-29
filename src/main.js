import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/tailwind.pcss'

import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyAyAPdMdDRFsMlUQbZ917ifOHMJR8Pr9f8',
  authDomain: 'rapidroutegame.firebaseapp.com',
  projectId: 'rapidroutegame',
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
