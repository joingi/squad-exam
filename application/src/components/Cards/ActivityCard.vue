<template>
  <router-link class="activity-card "  :to="{name: this.getChildRoutes(), params: {id: id}}" >

    <div
        v-if="image.length <= 0"
        class="activity-thumb"
        :style="{backgroundImage: 'url(' + require(`@/assets/uploads/${this.getImage}`) + ')'}"
        >

        <div class="price-tag"> <span> {{ price }} kr </span> </div>
        <div class="card-title"> <span> {{title}}</span>  </div>
        <div class="overlay"></div>
    </div>

      <div
        v-else
        class="activity-thumb"
        :style="{backgroundImage: 'url(' + `${image[0]}` + ')'}"
        >

        <div class="price-tag"> <span> {{ price }}  kr </span> </div>
        <div class="card-title"> <span> {{title}}</span>  </div>
        <div class="overlay"></div>
      </div>
    <article>
<!-- {{this.groupLocation}} -->
      <div class="activity-card-info" v-if="this.groupLocation.city == undefined || this.eventType === false">
        <span class="date"> {{dateTime[0].date}} </span>
        <span class="location"> {{this.locations}} </span>
      </div>

      <div class="activity-card-info" v-else>
        <span class="date"> {{dateTime[0].date}} </span>
        <span class="location"> {{this.groupLocation.city}} </span>
      </div>

      <img class="trainer-img" v-if="person.image != null" :src="person.image" alt="Image of trainer">
      <img class="trainer-img" v-else src="@/assets/images/no-user.png" alt="Image of trainer">
    </article>
    <div class="shadow"></div>
  </router-link>
</template>

<script>
var images = require.context("../../assets/uploads", true);

export default {
  name: "ActivityCard",
  data() {
    return {
      getImage: null
    };
  },
  props: {
    id: {
      type: String,
      required: false
    },
    groupLocation: {
      type: Object,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    image: {
      type: Array,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    dateTime: {
      type: Array,
      required: false
    },
    person: {
      type: Object,
      required: false
    },
    eventType: {
      type: Boolean
    }
  },
  data() {
    return {
      getImage: null
    };
  },
  created() {
    this.getImage = "no-user.png";
    this.getChildRoutes();
  },
  mounted() {
    this.getChildRoutes();
  },
  computed: {
    locations() {
      // console.log("hoalhola", this.person);
      // if (this.person.location === "Höfuðborgarsvæðið") {
      //   return (this.person.location = "Höfuðborgars.");
      // } else {
      return this.person.location;
      // }
    },
    // Alternitive link form admin
    eventLink() {
      return this.isAdmin ? "/admin/" + this.id : "/einkathjalfun/" + this.id;
    }
  },
  methods: {
    getChildRoutes() {
      // console.log("routes", this.$router.options);
      // console.log("routes", this.$router.currentRoute.fullPath);
      if (this.$router.currentRoute.fullPath == "/hopthjalfun") {
        return this.$router.options.routes[7].children[0].name;
      }
      if (this.$router.currentRoute.fullPath == "/einkathjalfun") {
        return this.$router.options.routes[9].children[0].name;
      }
      if (
        this.$router.currentRoute.fullPath === "/" &&
        this.eventType === false
      ) {
        return this.$router.options.routes[9].children[0].name;
      }
      if (
        this.$router.currentRoute.fullPath === "/" &&
        this.eventType === true
      ) {
        return this.$router.options.routes[7].children[0].name;
      }
      if (
        this.$router.currentRoute.name === "leidbeinendurId" &&
        this.eventType === true
      ) {
        return this.$router.options.routes[7].children[0].name;
      }
      if (
        this.$router.currentRoute.name === "leidbeinendurId" &&
        this.eventType === false
      ) {
        return this.$router.options.routes[9].children[0].name;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.shadow {
  max-width: 218px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  margin: 0 auto;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 3px 78px 0 rgba(0, 0, 0, 0.15);
}

@media screen and (max-width: 600px) {
  .activity-card {
    // width: 100%;
    // max-width: 100%;
    // height: 140px;
    .activity-thumb {
      // height: 75px;
    }
    .card-title {
      bottom: 10px;
    }
    .price-tag span {
      font-size: 16px;
    }
    .activity-card-info {
      padding: 10px 10px 10px 5px;
      justify-content: flex-end;
    }
  }
  .trainer-img {
    width: 38px;
    height: 38px;
  }
}

@media screen and (max-width: 450px) {
  .activity-card {
    // height: 150px;
    .activity-thumb {
      height: 100px;
    }
    .card-title span {
      font-size: 16px;
    }
    .price-tag span {
      font-size: 14px;
    }
    .activity-card-info .location,
    .date {
      font-size: 14px;
    }
  }
  .trainer-img {
    width: 38px;
    height: 38px;
  }
}
</style>
