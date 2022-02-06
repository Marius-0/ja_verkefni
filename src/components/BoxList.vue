<template>
  <span class="filterGroup">{{ list.title }}</span>
  <span class="filterItem" v-for="(item, index) in list.items" :key="index">
    <input
      :name="list.groupname ? list.groupname : list.val"
      :type="list.type"
      :id="item.val"
      :value="item.val"
      v-model="selected"
      @change="updateSelected"
      :checked="item.default"
    />
    <label :for="item.val">{{ item.name ? item.name : item.val }}</label>
  </span>
</template>

<script>
export default {
  name: "BoxList",
  props: {
    list: Object,
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    updateSelected() {
      this.$emit("update:list", this.selected);
    },
  },
};
</script>

<style>
.filterGroup {
  border-bottom: 1px solid lightgray;
  width: 100%;
  text-align: left;
  margin: 8px 0px;
  font-size: 90%;
  font-weight: 600;
}
.filterItem {
  font-size: 80%;
}

.filterItem input {
  margin-right: 10px;
}
</style>
