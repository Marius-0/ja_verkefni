<template>
  <h1>Random Matstaður</h1>
  <button @click="getRandomRestaurant">Finna Stað</button>
  <main>
    <div id="filters">
      <span class="filterItem">
        <input type="checkbox" id="open" v-model="isOpen" />
        <label for="open">Opið núna</label>
      </span>
      <span class="filterItem">
        <input type="checkbox" id="takeAway" v-model="isTakeAway" />
        <label for="takeAway">Take-Away</label>
      </span>
      <BoxList :list="mealTimes" @update:list="handleUpdateMealTimes" />
      <BoxList
        :list="restaurantTypes"
        @update:list="handleUpdateRestaurantTypes"
      />
      <BoxList :list="municipalities" @update:list="handleUpdateRegion" />
      <BoxList :list="areas" @update:list="handleUpdateRegion" />
      <BoxList :list="regions" @update:list="handleUpdateRegion" />
    </div>
    <div v-if="backupInfo" class="backup">{{ backupInfo }}</div>
    <RestaurantInfo v-if="dispInfo" :info="dispInfo" />
  </main>
</template>

<script>
import get from "./services/request.js";
import BoxList from "./components/BoxList";
import RestaurantInfo from "./components/RestaurantInfo";
import data from "./data/data.json";

const mealTimes = data[0];
const restaurantTypes = data[1];
const municipalities = data[2];
const areas = data[3];
const regions = data[4];

export default {
  name: "App",
  components: {
    BoxList,
    RestaurantInfo,
  },
  data() {
    return {
      mealTimes,
      selectedMealTimes: [],
      restaurantTypes,
      selectedRestaurantTypes: restaurantTypes.items[0].val,
      municipalities,
      areas,
      regions,
      selectedRegion: areas.items[0].val,
      isOpen: false,
      isTakeAway: false,
      urlParams: "",
      dispInfo: null,
      data: {},
      backupInfo: "Click the button",
    };
  },
  emits: ["update:list"],
  methods: {
    handleUpdateMealTimes(selected) {
      this.selectedMealTimes = selected;
    },
    handleUpdateRestaurantTypes(selected) {
      this.selectedRestaurantTypes = selected;
    },
    handleUpdateRegion(selected) {
      this.selectedRegion = selected;
    },
    setURLParams() {
      let params = new URLSearchParams();
      let q = [this.selectedRestaurantTypes];
      let filter = [];
      let fields = [
        "address",
        "email",
        "hours",
        "logo_url_medium",
        "phone",
        "municipality",
        "name",
        "url",
        "url_pretty",
      ];

      if (this.isTakeAway) q.push("takeaway");
      if (this.selectedMealTimes.length) q.push(...this.selectedMealTimes);
      params.append("q", q.join(" "));

      if (this.isOpen) filter.push("open");
      if (this.selectedRegion) filter.push("region:" + this.selectedRegion);
      if (filter.length) params.append("filter", filter.join(","));

      params.append("scope", "businesses");
      params.append("fields", fields.join(","));

      this.urlParams = params;
    },
    getRandomRestaurant() {
      this.backupInfo = null;
      this.setURLParams();
      this.urlParams.append("count", 1);

      get(this.urlParams)
        .then((res) => {
          if (res) {
            let totalItems = res.data.meta.total_items;

            if (totalItems > 0) {
              let randNo = Math.floor(Math.random() * totalItems) + 1;
              this.urlParams.append("start", randNo);
              get(this.urlParams).then(
                (res) => (this.dispInfo = res.data.items[0])
              );
            } else {
              this.backupInfo = "Nothing found";
            }
          } else {
            this.backupInfo =
              "Eitthvað fór úskeiðis. (Network Error, Authentication, etc.)";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: "Trebuchet MS", sans-serif;
  margin: 0 auto;
  width: 640px;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#filters {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-content: left;
  text-align: left;
  width: 200px;
}

main {
  display: grid;
  grid-template-columns: 200px auto;
}
button {
  margin-bottom: 12px;
  padding: 8px 24px;
  border: none;
  font-family: inherit;
  font-size: 100%;
  border-radius: 6px;
}
button:hover {
  filter: brightness(85%);
}
</style>
