<template>
  <div>
    <button @click="toggleDisplay">Toggle Display</button>
    <p v-show="isDisplayed">
      This text is displayed when the `isDisplayed` variable is set to `true`
    </p>
    <p v-show="PNC">
      This text is displayed when the `isDisplayed` variable is set to `true`
    </p>
  </div>
</template>

<script>
export default {
  layout:"test",
  data() {
    return {
      isDisplayed: true,
      PNC: true,
    };
  },
  methods: {
    toggleDisplay() {
      this.isDisplayed = !this.isDisplayed;
    },
    
  },
};
</script>