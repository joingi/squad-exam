<template>
  <div class="full-container container-cards">
    <FilterListPage />

      <ActivityList :events="loadGroup"  v-if="loadGroup !== null  && loadGroup.length > 0"/>
      <NoEventsModal v-else >
        <div class="inner-container">
          <span >
              Engar niðurstöður fundust
          </span>
        </div>
     </NoEventsModal>
  </div>
</template>

<script>
/* eslint-disable */
import ActivityList from "@/components/Cards/ActivityList";
import FilterListPage from "@/components/Filters/FilterListPage";
import NoEventsModal from '@/components/Modal/NoEventsModal'

export default {
  components: {
    ActivityList,
    FilterListPage,
    NoEventsModal
  },
  data() {
    return {
      data: [],
      heyjo: null
    };
  },
  computed: {
    listenToFilter() {
      return this.$store.state.filterPlace;
    },
    loadGroup() {
      return this.$store.getters.loadedEventsGroupFilter(
        this.$store.state.filterPlace
      );
    }
  },
  created() {
    this.$store.dispatch("fetchApiData");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
</style>
