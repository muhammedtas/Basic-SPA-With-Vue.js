import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    // Use Your own GoogleMap api key in here! 
    key: "YOUR_API_KEY",
    libraries: "places"
  }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
