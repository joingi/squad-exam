<template>
  <div class="container">
    <transition name="fadeEvent" mode="out-in">
    
    <div class="event-container" v-for="(data, index) in eventData"  :key="index">
      <PaymentForm
        v-if='paymentModal' 
        :closeModal="paymentModal"
        @closeModalReset="paymentModal = $event"
      />
      <div class="left">
        <section class="trainer">
          <div class="trainer-image" v-if="data.person.image != null" :style="{backgroundImage: 'url(' + data.person.image + ')'}" />
          <div class="trainer-image"  v-else :style="{backgroundImage: 'url(' + require('@/assets/images/no-user.png') + ')'}" />
          <p >{{ data.person.firstName + ' ' + data.person.lastName}}</p>
          <span class="line"/>
        </section>
        <div class="info">

          <section class="price">
            <p class="title">Verð</p>
            <span>{{data.price}} kr</span>
          </section>
          <section class="content">
            <p class="title">Innihald viðburðar</p>
            <div v-for="(content, index) in data.content "  :key="index">
              <span>{{content.value}}</span>
            </div>
          </section>
          <section class="practice">
            <p class="title">Æfing</p>
            <span v-for="(dateTime , index) in data.dateTime " :key="index">
                {{index + 1 + ' x ' + dateTime.timeLength + ' min'}}
              </span>

          </section>
          <section class="device">
            <p class="title">Áhöld</p>
            <div v-for="(equipment , index) in data.equipment " :key="index">
              <span>{{equipment.value}}</span>
            </div>
          </section>
          <section class="location">
            <p class="title">Staðsetning</p>
            <span>{{data.location.address}}, {{data.location.zip}} {{data.location.city}}</span>
            <span>Leiðbeinandi kemur af {{ data.person.location}}</span>
          </section>

          <a @click="openPaymentForm"  class="largeButton"  v-if="trainer === false">Skrá sig </a>

        </div>
      </div>
      <div class="right">
        <section class="images" >
          <div class="main-image" :style="{backgroundImage: 'url(' + `${data.eventImages[chosenImage]}` + ')'}">
            <div class="child-images">
              <div
              v-for="(image , index) in data.eventImages" :key="index"
              :style="{backgroundImage: 'url(' + `${data.eventImages[index]}` + ')'}"
              @click="changeImage(index)"
              />
            </div>
          </div>

        </section>
        <section class="about">
          <h3 class="title">{{data.title}}</h3>
          <p class="text">
            {{data.about}}
          </p>
        </section>
        <section class="level">
          <h3 class="title">Level</h3>
          <p class="text">{{data.level}}</p>
        </section>
        <section class="practice">
          <h3 class="title">Æfing</h3>
          <div class="chart">
            <ul>
              <li>#</li>
              <li>Dagsetning</li>
              <li>Tími</li>
              <li>Tímalengd</li>
            </ul>
            <ul  v-for="(dateTime , index) in data.dateTime " :key="index">
              <li>{{index + 1}}</li>
              <li>{{dateTime.date}}</li>
              <li>{{dateTime.timeOfEvent}}</li>
              <li>{{dateTime.timeLength}} min</li>
            </ul>
          </div>
        </section>
        <section class="location">
          <h3 class="title">Staðsetning</h3>
             <div id="myMap"></div>
        </section>

      </div>
    </div>
    </transition>
  </div>

</template>

<script>
import axios from "axios";
import LargeButton from "@/components/Buttons/LargeButton";
import PaymentForm from "@/components/Modal/PaymentForm";
var SquadApi = `${process.env.API_PATH}`;

export default {
  components: {
    LargeButton,
    PaymentForm
  },
  data() {
    return {
      eventData: [],
      chosenImage: 0,
      paymentModal: false,
      trainer: this.$store.state.trainer
    };
  },
  mounted() {
    this.myMap();
  },
  methods: {
    myMap() {
      setTimeout(function() {
        var myLatLng = { lat: 64.128288, lng: -21.827774 };

        var map = new google.maps.Map(document.getElementById("myMap"), {
          zoom: 11,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: "Hello World!"
        });
      }, 1000);
    },
    openPaymentForm() {
      this.paymentModal = true;
    },
    changeImage(imageID) {
      console.log("eventt", imageID);
      this.chosenImage = imageID;
    }
  },
  created() {
    var userId = this.$route.params.id;
    axios
      .get(`${SquadApi}/hopthjalfun/` + userId)
      .then(response => {
        console.log("routes", response.data);
        this.eventData.push(response.data);
      })
      .catch(err => {
        console.log("err", err);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

#myMap {
  height: 300px;
  width: 100%;
}
p {
  margin: 0;
}
.event-container {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-top: 60px;
}

.left {
  padding-right: 20px;
  .trainer-location {
    padding-bottom: 0;
    margin-bottom: 20px;
  }
  .line {
    position: absolute;
    width: 100%;
    max-width: 160px;
    border: 1px solid rgba(1, 13, 23, 0.1);
  }
  .title {
    font-size: 18px;
    color: #02c39a;
    padding-bottom: 5px;
    margin-top: 10px;
  }
  .trainer {
    position: relative;
    padding-bottom: 20px;
    p {
      padding-bottom: 5px;
    }
  }
  .trainer-image {
    height: 70px;
    width: 65px;
    background: #d8d8d8;
    border-radius: 100%;
    background-position: center;
    background-size: cover;
    margin-bottom: 15px;
  }
  .info {
    section {
      padding-bottom: 15px;
      display: flex;
      flex-direction: column;
    }
    span {
      font-size: 16px;
      color: #393735;
    }

    ul {
      padding: 0;
      margin: 0;
      li {
        font-size: 16px;
        color: #393735;
        list-style: none;
      }
    }
  }
}
.right {
  display: flex;
  flex-direction: column;

  .main-image {
    position: relative;
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .child-images {
    display: flex;
    position: absolute;
    height: 60px;
    width: 100%;
    bottom: 0;
    div {
      position: relative;
      height: 100%;
      max-height: 60px;
      width: 100px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  section {
    padding: 15px 0 5px 0;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-family: $fontSemibold;
    font-size: 20px;
    color: #393735;
    margin: 0;
    padding-bottom: 15px;
  }
  .text {
    font-size: 16px;
    color: #393735;
    margin: 0;
  }
  .chart {
    max-width: 585px;
    width: 100%;
    margin: 0 auto;
    background: white;

    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
    ul {
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      &:nth-child(1) {
        background: #02c39a;
        border-radius: 4px;
        padding: 10px 0 7px 0;
        color: white;
      }
      &:nth-child(2) {
        font-family: $fontSemibold;
        font-size: 16px;
        color: #393735;
        padding: 15px 0 13px 0;
      }
      li {
        list-style-type: none;
        text-align: center;
      }
    }
  }
  .map {
    width: 100%;
    height: 155px;
    border: 4px;
  }
}

.images {
  height: 315px;
  width: 100%;
  padding: 0 !important;
}

@media screen and (max-width: 700px) {
  .chart {
    ul li {
      font-size: 14px;
    }
  }
}
</style>
