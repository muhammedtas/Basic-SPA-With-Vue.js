<template>
        <mat-card>
        <mat-form-field>
        <div class="container-fluid"  v-bind:key="city">
        <h1> Weather Map App  </h1>
        
          <h2>{{ weather.name }} Weather</h2>
          <div class="description">{{ weather.description }}</div>
          <div class="temp">It's currently {{ weather.temp }}° F.</div>
          <div class="highlow">High: {{ weather.high }}° F. Low: {{ weather.low }}° F.</div>
      </div>
      </mat-form-field>
    </mat-card>
</template>

<script>
export default {
  name: "OpenWeatherMap",
  data() {
    return {
      city: "",
      weather: {}
    };
  },
  methods: {
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
  }
};
</script>

<style scoped>
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
</style>
