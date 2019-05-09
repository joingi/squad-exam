<template>
<div class="container">
    <transition name="fadeEvent" mode="out-in">
    <div class="event-container" >
        <div class="left">
            <section class="trainer">
              <div class="trainer-image" v-if="userData[0].image != null" :style="{backgroundImage: 'url(' + userData[0].image + ')'}" />
              <div class="trainer-image"  v-else :style="{backgroundImage: 'url(' + require('@/assets/images/no-user.png') + ')'}" />
                <p>{{userData[0].firstName + ' ' + userData[0].lastName}}</p>
                <span class="trainer-line"/>
          </section>

        <div class="info">
          <section class="trainer-location">
            <span>Leiðbeinandi kemur af {{userData[0].location}}</span>
            </section>
                <SendMsgButton @click="onLoadUsers" class="send-message" >Skilaboð</SendMsgButton>
        </div>
    </div>

    <div class="right">
        <section class="about">
            <h3 class="title">{{userData[0].firstName + ' ' + userData[0].lastName}}</h3>
            <p class="text" v-if="userData[0].about > 0 ||userData[0].about == null ">
              Leiðbeinandi vantar texta
            </p>
            <p class="text" v-else>
                {{userData[0].about }}
            </p>
        </section>
        <section class="category">
            <span class="line"/>
          <ul  class="categories">
            <li v-for="(cat, index) in userData[0].categories" :key="index">{{cat}}</li>
          </ul>
      </section>
    </div>

    </div>

     </transition>   
      <div class="bottom-line-wrapper">
        <span class="bottom-line"/>
      </div>

      <ActivityList  :events="eventData[0]" v-if="eventData[0].length > 0"  />

      <NoEventsModal v-else >
        <div class="inner-container">
          <span >
               Engar viðburðir skráðir
          </span>
        </div>
     </NoEventsModal>
  </div>
</template>

<script>
import ActivityList from '@/components/Cards/ActivityList';
import SmallButton from '@/components/Buttons/SmallButton';
import NoEventsModal from '@/components/Modal/NoEventsModal';
import axios from 'axios';
var SquadApi = `${process.env.API_PATH}`

export default {
  components: {
    SmallButton,
    ActivityList,
    NoEventsModal
  },
  head () {
    return {
      script: [
        {
          src:
            'https://test.borgun.is/resources/js/borgunpayment-js/borgunpayment.v1.min.js',
          type: 'text/javascript'
        }
      ]
    }
  },
  data () {
    return {
      userData: [],
      eventData: []
    }
  },
  mounted () {
    this.onLoadTrainer()
  },
  created () {
    this.onLoadTrainer()
  },
  methods: {
    onLoadTrainer () {
      console.log('hey', this.eventData)
      var userId = this.$route.params.id
      return axios
        .get(`${SquadApi}/leidbeinandi/` + userId)
        .then(response => {
          console.log('user response test', response.data.user)
          this.userData.push(response.data.user)
          this.eventData.push(response.data.events)
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    onLoadUsers () {
      var users = {
        author: this.$store.state.userData._id,
        to: this.$route.params.id
      }
      var userToken = this.$cookie.get('token')
      axios({
        method: 'post',
        url: `${SquadApi}/chat/room`,
        params: users,
        headers: { Authorization: 'Bearer ' + userToken }
      })
        .then(response => {
          console.log('create room response', response)
          // this.userData.push(response.data.user);
          // this.eventData.push(response.data.events);
        })
        .catch(err => {
          console.log('err', err)
        })
      this.$router.push(`/skilabod/${this.$route.params.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.categories {
  display: flex;
}

.training {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
}

.event-container {
  position: relative;
  display: grid;
  grid-template-columns: 30% 70%;
  margin-top: 60px;
}

.left {
  padding-right: 20px;

  .trainer-location {
    padding-bottom: 0;

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
    }
  }

  margin-bottom: 20px;
}

.trainer-image {
  position: relative;
  height: 165px;
  width: 100%;
  max-width: 160px;
  background: #d8d8d8;
  background-position: center;
  background-size: cover;
  margin-bottom: 15px;
  border-radius: 4px;
}

// Button send message
.send-message {
  position: relative;
  margin: 1rem 0;
  background: #02c39a;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  height: 100%;
  top: 20px;
}

.trainer-line {
  position: absolute;
  width: 100%;
  max-width: 160px;
  height: 1px;
  background-color: rgba(1, 13, 23, 0.1);
}

.title {
  font-size: 18px;
  color: #02c39a;
  padding-bottom: 5px;
}

.trainer {
  position: relative;
  padding-bottom: 20px;

  p {
    &:nth-child(1) {
      font-size: 18px;
    }

    padding-bottom: 5px;
  }
}

.right {
  position: relative;
  display: flex;
  flex-direction: column;

  .line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: rgba(1, 13, 23, 0.1);
  }

  .category {
    margin-top: 25px;
    position: relative;

    ul {
      display: flex;
      flex-direction: row;
      padding: 0;

      li {
        list-style-type: none;
        padding: 5px 10px;
        margin-left: 5px;
        background-image: linear-gradient(-180deg, #16f3da 0%, #02c39a 100%);
        border-radius: 4px;
        color: white;
      }
    }
  }

  .title {
    font-family: $fontSemibold;
    font-size: 25px;
    color: #393735;
    margin: 0;
    padding-bottom: 15px;
  }

  .text {
    font-size: 16px;
    color: #393735;
    margin: 0;
  }
}

.bottom-line-wrapper {
  position: relative;
  padding: 3rem 0;
  padding-left: 0;
  margin-bottom: 2rem;

  .bottom-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: rgba(1, 13, 23, 0.1);
    margin: 1rem 0;
  }
}

// .images {
//   height: 315px;
//   width: 100%;
//   padding: 0 !important;
// }
</style>
