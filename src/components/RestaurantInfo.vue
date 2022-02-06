<template>
  <div>
    <div v-if="info.logo_url_medium" id="logo">
      <img :src="logo_url_base + info.logo_url_medium" alt="logo" />
    </div>
    <h1 id="restaurantName">{{ info.name }}</h1>
    <div id="restaurantInfo">
      <span>Sími:</span>
      <span>{{ info.phone.pretty }}</span>
      <span>Vefsíða: </span>
      <span
        ><a :href="info.url" target="_blank" rel="noopener noreferrer">{{
          info.url_pretty
        }}</a></span
      >
      <span>Tölvupóstur: </span>
      <span
        ><a :href="'mailto:' + info.email">{{ info.email }}</a></span
      >
      <span>Heimilisfang: </span>
      <span>{{ info.address }}, {{ info.municipality }}</span>
      <span>Opnunartímar: </span>
      <span style="white-space: pre-line">{{ info.hours }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RestaurantInfo",
  props: {
    info: {},
  },
  data() {
    return {
      logo_url_base: "https://media.ja.is/",
    };
  },
};
</script>

<style scoped>
#restaurantInfo {
  display: grid;
  grid-template-columns: auto auto;
  gap: 6px;
  justify-content: center;
}
span:nth-child(odd) {
  text-align: right;
  font-weight: bold;
}
span:nth-child(even) {
  text-align: left;
}
#restaurantName {
  text-align: center;
}
#logo {
  display: flex;
  justify-content: center;
}
</style>
