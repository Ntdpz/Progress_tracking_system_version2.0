<template>
  <div>
    <v-select
      v-model="selectedScreen"
      :items="screen_selectDefault"
      @change="getUserSystems(id)"
      item-value="id"
      label="Select an item"
    >
      <template #selection="{ item }">
        {{ item.screen_id }}: {{ item.screen_name }}
      </template>
      <template #item="{ item }">
        {{ item.screen_id }}: {{ item.screen_name }}
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedScreen: null,
      screen_selectDefault: [],
    };
  },
  created() {
    this.getScreenDefault();
  },
  methods: {
    async getScreenDefault() {
      try {
        await this.$axios
          .get(
            "/screens/getAll?project_id=" +
              462802381 +
              "&&system_id=" +
              392697303
          )
          .then((data) => {
            this.screen_selectDefault = data.data;
          });
        console.log("this.screen_selectDefault", this.screen_selectDefault);
      } catch (error) {
        console.error(error);
      }
    },
    async getUserSystems(selectedScreenID) {
      console.log("selectedScreenID", selectedScreenID);
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Lato", sans-serif;
}
</style>