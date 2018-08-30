<template>
 <mat-card>
 <mat-form-field>
    
  <div class="container-fluid">
    <h1> Giphy's App  </h1>
  <div class="search">
    <input type="text" v-model.trim="query" v-on:keyup.enter="handleSearch">
    <button v-on:click="handleSearch">Search</button>
  </div>

  </div>
      </mat-form-field>
    </mat-card>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  methods: {
    handleSearch() {
      if (this.query.trim()) {
        this.$emit("searchRequested", this.query.trim());
      }
    }
  }
};
</script>

<style scoped>
.search input {
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
