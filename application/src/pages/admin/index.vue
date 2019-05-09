<template>
  <div >
      <FilterListPage   />
      <div class="container">
        <section>
          <div class="labels">
            <span>Þjálfun</span>
            <span>Nafn</span>
            <span>Dagsetning</span>
            <span>Þáttakendur</span>
          </div>
          <span class="line"/>
        </section>

        <Events :dataInfo="loadGroup" />

      </div>
    
  </div>
</template>

<script>
import FilterListPage from '@/components/Filters/FilterListPage';
import Events from '@/components/Events/Events';
import axios from 'axios';

export default {
  components: {
    FilterListPage,
    Events
  },
  data () {
    return {
      eventData: []
    }
  },
  created () {
    this.getDataTest
    this.getAllUserEvents
  },
  updated () {
    this.getDataTest
  },
  computed: {
    getDataTest () {
      return this.$store.dispatch(
        'fetchUserEventData',
        this.$cookie.get('token')
      )
    },
    loadGroup () {
      return this.$store.getters.loadedEventsAdminFilter(
        this.$store.state.filterTraining
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
section {
  height: 100%;
  position: relative;
}
.labels {
  display: grid;
  grid-template-columns: 19% 24% 23% 34%;
  margin-bottom: 15px;
  grid-template-areas: "training trainingName date people";
  span {
    padding-left: 30px;
    font-size: 16px;
    color: $mainBlack;
    font-weight: 600;
    &:nth-child(1) {
      grid-area: training;
    }
    &:nth-child(2) {
      grid-area: trainingName;
    }
    &:nth-child(3) {
      grid-area: date;
    }
    &:nth-child(4) {
      grid-area: people;
    }
  }
}

.line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  border: 1px solid rgba(1, 13, 23, 0.1);
}

@media screen and (max-width: 800px) {
  .labels {
    span {
      font-size: 14px;
      color: $mainBlack;
    }
  }
}
@media screen and (max-width: 600px) {
  .container {
    padding: 0;
  }

  .labels {
    padding: 0 30px;
    grid-template-columns: 16% 21% 26% 31%;
    span {
      &:nth-child(1) {
        padding-left: 0px;
      }
      &:nth-child(2) {
        padding-left: 0px;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .labels {
    grid-template-columns: 16% 19% 26% 31%;
    span {
      &:nth-child(1) {
        grid-area: training;
      }
      &:nth-child(2) {
        grid-area: trainingName;
      }
      &:nth-child(3) {
        grid-area: date;
      }
      &:nth-child(4) {
        grid-area: people;
      }
    }
  }
}
@media screen and (max-width: 430px) {
  .labels {
    // grid-template-columns: 16% 15% 26% 31%;
    grid-template-columns: 17% 21% 32% 33%;
    span {
      padding: 0;
      font-weight: 400;
    }
  }
}
</style>
