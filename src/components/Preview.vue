<template>
 <mat-card>
<mat-form-field>

  <!-- <div class="card mb-4">

  <div class="card-img-wrapper">
    <img class="card-img-top" src="" alt="">
  </div>
  </div> -->

  <!-- <div class="container-fluid"> -->
    <div class="card mb-4">
      <div class="card-img-wrapper">
    <ul>
      <li v-bind:key="gifs"  v-for="gif in gifs">
        <span class="border-top">
        <img :src="gif.images.fixed_height.url" class="card-img-top rounded"/>
        </span>
      </li>
    </ul>
      </div>
  </div>
   </mat-form-field>
    </mat-card>
</template>

<script>
/* eslint-disable */
export default {
  props: ['gifs']
};
</script>

<style>
  li {
    list-style: none;
    float: left;
    margin: 20px;
  }

</style>
