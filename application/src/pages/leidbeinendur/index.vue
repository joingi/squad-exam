<template>
  <div class="full-container container-cards">
    <FilterListPage />
    <TrainerList :trainer="loadTrainers"  v-if="loadTrainers !== null  && loadTrainers.length > 0" />
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
import FilterListPage from '@/components/Filters/FilterListPage';
import TrainerList from '@/components/Cards/TrainerList';
import NoEventsModal from '@/components/Modal/NoEventsModal';

export default {
  components: {
    FilterListPage,
    TrainerList,
    NoEventsModal
  },
  data () {
    return {
      trainers: []
    }
  },
  created () {
    this.$store.dispatch('fetchApiTrainers')
  },
  computed: {
    listenToFilter () {
      return this.$store.state.filterPlace
    },
    loadTrainers () {
      return this.$store.getters.loadedTrainersFilter(
        this.$store.state.filterPlace
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
</style>
