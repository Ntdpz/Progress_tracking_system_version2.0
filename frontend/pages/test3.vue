<template>
  <div class="ma-4">
    <h1>hello</h1>
    <v-text-field
      v-model="feelingNow"
      @input="life()"
      label="พิมพ์ true จะทำให้คุณมีกำลังใจในการทำงาน"
    ></v-text-field>
    <h1>{{ now }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: null,
      feelingNow: null,
    };
  },
  created() {
    // this.life();
  },
  methods: {
    life() {
      const motivation = this.feelingNow === "true";
      this.now =
        this.morningRoutine(motivation) && this.music(motivation)
          ? this.workingTime()
          : this.gameTime();
    },
    morningRoutine(event) {
      const result = event ? "ตื่นและหาไรแดก" : null;
      return result;
    },
    workingTime() {
      return "ทำงานได้ละ";
    },
    music(event) {
      const result = event ? "ฟังเพลง" : null;
      return result;
    },
    gameTime() {
      return this.playPokemonGo();
    },
    playPokemonGo() {
      return "เดินล่า Pokémon และตีบอส";
    },
    sleep() {
      return "นอนหลับ";
    },
  },
};
</script>

<style></style>