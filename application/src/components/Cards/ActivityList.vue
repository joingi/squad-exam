<template>
    <div  class="container" :class="{wrap : this.checkLocation}">

      <div class="trainer-card-wrapper list-card-wrapper">
        <ActivityCard
          v-for="event in events"
          :title="event.title"
          :id="event._id"
          :key="event.id"
          :price="event.price"
          :image="event.eventImages"
          :dateTime="event.dateTime"
          :person="event.person"
          :groupLocation="event.location"
          :eventType="event.activityType"
         />

      </div>
    </div>
</template>

<script>
import ActivityCard from "@/components/Cards/ActivityCard";

export default {
  props: ["events"],
  components: {
    ActivityCard
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      frontPage: null
    };
  },
  computed: {
    checkLocation() {
      if (this.$route.fullPath === "/") {
        return (this.frontPage = true);
      } else {
        return (this.frontPage = false);
        // return (this.frontPage = false)
      }
    }
  },
  mounted() {
    this.checkLocation;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.wrap {
  padding: 0;
}

@media screen and (max-width: 750px) {
  .trainer-card-wrapper {
    grid-gap: 20px;
  }
  // .wrap {
  //   padding: 0 20px !important;
  // }
}

@media screen and (max-width: 600px) {
  .trainer-card-wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 25px;
  }
}
@media screen and (max-width: 450px) {
  .trainer-card-wrapper {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 25px;
    padding: 0 18px;
  }
}
</style>
