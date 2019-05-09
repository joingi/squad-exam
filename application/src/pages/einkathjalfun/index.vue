<template>
  <div class="full-container container-cards">
    <FilterListPage />
      <ActivityList :events="loadSingleGroup"   v-if="loadSingleGroup !== null  && loadSingleGroup.length > 0" />
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

import ActivityList from '@/components/Cards/ActivityList'
import FilterListPage from '@/components/Filters/FilterListPage'
import NoEventsModal from '@/components/Modal/NoEventsModal'

export default {
  components: {
    ActivityList,
    FilterListPage,
    NoEventsModal
  },
  // computed: {
  //   loadSingle() {
  //     return this.$store.getters.loadedSingle;
  //   }
  // },
  created () {
    this.$store.dispatch('fetchApiData')
  },
  computed: {
    listenToFilter () {
      return this.$store.state.filterPlace
    },
    loadSingleGroup () {
      return this.$store.getters.loadedEventsSingleFilter(
        this.$store.state.filterPlace
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

</style>
