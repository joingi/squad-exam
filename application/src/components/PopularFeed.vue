<template>
  <div class="popular-section">
    <h1>Nýjustu tímarnir</h1>

    <h3 class="activity-title">Einkaþjálfun</h3>
    <h2 v-if=" !loadSingle">  No Single events </h2>

    <ActivityList :events="loadSingle.slice(0).slice(-3)"  />

    <h3 class="activity-title">Hópþjálfun</h3>
    <h2 v-if=" !loadGroup">  No loadGroup events </h2>

    <ActivityList v-else :events="loadGroup.slice(0).slice(-3)"  />

  </div>
</template>

<script>
import ActivityList from '@/components/Cards/ActivityList';
export default {
  components: {
    ActivityList
  },
  computed: {
    loadGroup () {
      return this.$store.getters.loadedEventsGroup
    },
    loadSingle () {
      return this.$store.getters.loadedEventsSingle
    }
  },
  created () {
    this.$store.dispatch('fetchApiData')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

h1 {
  color: $mainBlack;
}
h2 {
  color: $mainBlack;
}

.activity-title {
  padding: 1rem;
  color: $mainBlack;
}
</style>
