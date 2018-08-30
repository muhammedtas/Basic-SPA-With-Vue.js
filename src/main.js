import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    // key=API_KEY, // Let lecturer to use his key instead of this. Do not forget it! 
    key: "AIzaSyAqGoLCEn75lTN7vjPLCBRQ6NzC6BqDUHQ",
    libraries: "places"
  }
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
