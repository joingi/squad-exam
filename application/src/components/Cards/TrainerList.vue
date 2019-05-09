<template>
    <div class="container">
      <div class="trainer-card-wrapper list-card-wrapper">
        <TrainerCard
        v-for="(persons,index) in trainer"
        :key="index"
        :personId="persons._id"
        :firstName="persons.firstName"
        :lastName="persons.lastName"
        :profileImage="persons.image"
        :categories="persons.categories"
        :location="persons.location" />
      </div>
    </div>
</template>

<script>
import TrainerCard from '@/components/Cards/TrainerCard'
export default {
  props: ['trainer'],
  components: {
    TrainerCard
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.list-card-wrapper{
  padding-bottom: 50px;
}
</style>
