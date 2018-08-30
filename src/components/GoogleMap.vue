<template>
  <div>
    <div>
      <h1>Google Map App</h1>
      <label>
        <gmap-autocomplete id="gmapSearch"
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker" class="btn btn-primary">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      // Sabanci University
      center: { lat: 40.8908117, lng: 29.3506093 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped>
#gmapSearch {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
}
button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #0066c0;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
}
</style>
