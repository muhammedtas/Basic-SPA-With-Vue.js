<template>
  <div id="app">
    <div class="well well-lg">
    <todo></todo>
    </div>
    <div class="well well-lg">
      <h1>  WeatherMap App </h1>
        <form @submit.prevent="getWeather">
          <input type="text" placeholder="Enter your City then press enter" v-model="city" v-on:keyup.enter= "getWeather">
        </form>
        <br/>
     <div class="card mb-4" v-if="submitted">
       <div class="card-img-wrapper">
          <h2>{{ weather.name }} Weather</h2>
          <div class="description">{{ weather.description }}</div>
          <div class="temp">It's currently {{ weather.temp }}° F.</div>
          <div class="highlow">High: {{ weather.high }}° F. Low: {{ weather.low }}° F.</div>
      </div>
      </div>
    <br/>
    <br/>
    </div>
    <google-map />
    <div class="well well-lg">
    <search v-on:searchRequested="handleSearch"></search>
    <p v-if="isLoading">Loading...</p>
    <preview :gifs=gifs></preview>
    </div>
  </div>
</template>

<script>
import Todo from "./components/Todo.vue";
import OpenWeatherMap from "./components/OpenWeatherMap.vue";
import Search from "./components/Search.vue";
import Preview from "./components/Preview.vue";
import GoogleMap from "./components/GoogleMap.vue";

export default {
  name: "App",
  components: { Todo, OpenWeatherMap, Search, Preview, Location, GoogleMap },
  data() {
    return {
      isLoading: true,
      gifs: [],
      city: "",
      submitted: false,
      weather: {}
    };
  },
  methods: {
    doQuery(url) {
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.gifs = res.data;
          this.isLoading = false;
        });
    },
    handleSearch(query) {
      this.gifs = [];
      this.isLoading = true;
      const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=dc6zaTOxFJmzC`;
      this.doQuery(url);
    },
    getWeather() {
      this.weather = {};
      this.submitted = true;
      fetch(
        `http://api.openweathermap.org/data/2.5/find?q=${
          this.city
        }&units=imperial&appid=5cd21286e8e65dca0865ec4c1f65319d`
      )
        .then(response => response.json())
        .then(response => {
          let data = response.list[0];
          this.submitted = true;
          this.weather.name = data.name;
          this.weather.description = data.weather[0].main;
          this.weather.temp = Math.round(data.main.temp);
          this.weather.high = Math.round(data.main.temp_max);
          this.weather.low = Math.round(data.main.temp_min);
        })
        .catch(error => console.log(error));
      this.city = "";
    }
  },
  created() {
    const url = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    this.doQuery(url);
  }
};
</script>

<style>
@import "./../node_modules/bootstrap/dist/css/bootstrap.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
template {
  background-color: blue;
}
.description {
  color: #2c1886;
  font-weight: bold;
  font-size: 20px;
}

.temp {
  font-size: 18px;
}

.highlow {
  font-size: 14px;
  color: #666;
}
form input {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
}
.card:hover img {
    transform: scale(1.2, 1.2);
    transition-duration: 500ms;
    transition-timing-function: ease-out;
    opacity: 0.7;
  }

.card img {
    transform: scale(1.0, 1.0);
    transition-duration: 500ms;
    transition-timing-function: ease-out;
}

.card-img-wrapper {
    overflow: hidden;
    position: relative;
}

.member-icons {
    position: absolute;
    bottom: -30%;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    opacity: 0;
}

.card-img-wrapper:hover .member-icons {
    bottom: 0;
    opacity: 1;
}

.animate {
    transition: all 0.3s ease-in-out;
}
</style>
