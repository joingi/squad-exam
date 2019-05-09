<template>
      <!-- <transition name="list" class="ejotestAnimation" >  -->
     <div class="event" >
          <span class="color" :class="{group: eventType, 'single': !eventType}"></span>
          <DeleteConfirmation 
             v-if='confirmModal' 
             @confirm='deleteEvent' 
             @cancel="cancelDelete"
             :event="selectedEvent"
             />
          <div class="info">
            <p v-if="eventType === true">
              {{training.group}}
            </p>
              <p v-else>
             {{training.single}}
            </p>
            <router-link class="sportName" :to="{name: this.getChildRoutes(), params: {id: objectId}}"> {{title}} </router-link>

            <span v-if="dateTime[0].date !== '' "> 
              {{dateTime[0].date}} 
            </span>
            <span v-else >
              -
            </span>

            <span v-if="this.$store.state.trainer === true && this.eventType === true"> 
              {{participants.total.length + ' / '  + participants.max }} 
            </span>
            <span v-else>
              -
            </span>
            <div class="icons" v-if="this.$store.state.trainer === true">
                <router-link :to="{name: this.getEditRoutes(), params: {id: objectId}}"> 
                  <div class="icon"
                    :style="{backgroundImage: 'url(' + require('@/assets/icons/'+edit+'.svg') + ')'}"
                    @click="editEvent(objectId)"
                    ></div>
                </router-link>
              <div class="icon"
              :style="{backgroundImage: 'url(' + require('@/assets/icons/'+trash+'.svg') + ')'}"
                @click="deleteButton(objectId)"
              ></div>

            </div>
          </div>
            
      </div>
      <!-- </transition> -->
</template>

<script>
import axios from 'axios';
import DeleteConfirmation from '@/components/Modal/DeleteConfirmation';

export default {
  components: {
    DeleteConfirmation: DeleteConfirmation
  },
  props: {
    // id: {
    //   type: String,
    //   required: true
    // },
    title: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    objectId: {
      type: String
    },
    dateTime: {
      type: Array
    },
    eventType: {
      type: Boolean
    },
    participants: {
      type: Object
    }
  },
  data () {
    return {
      trash: 'rusl',
      edit: 'edit',
      confirmModal: false,
      selectedEvent: null,
      training: {
        group: '',
        single: ''
      },
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      if (this.window.width < 600) {
        this.training.single = 'Einka.';
        return (this.training.group = 'Hóp.')
      } else {
        this.training.single = 'Einkaþjálfun';
        return (this.training.group = 'Hópþjálfun')
      }
      this.window.height = window.innerHeight
    },
    editEvent (e) {
      console.log('elo', e)

      var userToken = this.$cookie.get('token')
      return axios({
        method: 'get',
        url: 'http://localhost:3000/event/edit/',
        params: { id: e },
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(res => {
          console.log('res pro', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    cancelDelete () {
      this.confirmModal = false
      this.selectedEvent = null
    },
    deleteEvent () {
      console.log('delete delete', this.selectedEvent)

      var updateArray = this.$store.state.allEvents

      var testtest = updateArray.findIndex(x => {
        // console.log("xxx", x._id === this.selectedEvent);
        return x._id === this.selectedEvent
      })

      updateArray.splice(testtest, 1)

      var userToken = this.$cookie.get('token')
      return axios({
        method: 'get',
        url: 'http://localhost:3000/event/delete/',
        params: { id: this.selectedEvent },
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(res => {
          // console.log('res pro', res)
          this.confirmModal = false
          this.$store.commit('GET_ALL_EVENTS', updateArray)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteButton (e) {
      // console.log('elo', e)
      this.selectedEvent = e
      this.confirmModal = true
    },
    getChildRoutes () {
      if (
        this.$router.currentRoute.fullPath === '/admin' &&
        this.eventType === false
      ) {
        return this.$router.options.routes[9].children[0].name
      }
      if (
        this.$router.currentRoute.fullPath === '/admin' &&
        this.eventType === true
      ) {
        return this.$router.options.routes[7].children[0].name
      }
    },
    getEditRoutes () {
      if (
        this.$router.currentRoute.fullPath === '/admin' &&
        this.eventType === false
      ) {
        return this.$router.options.routes[11].children[0].name
      }
      if (
        this.$router.currentRoute.fullPath === '/admin' &&
        this.eventType === true
      ) {
        return this.$router.options.routes[11].children[0].name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
/* vue animation */

.list-enter-active {
  transition: all 2s;
}
.list-leave-active {
  transition: all 2s;
}

.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  transition: all 2s;
}
/* */
.icons {
  position: relative;
  height: 100%;
  padding: 10px;
  grid-area: edit;
  a {
    padding: 0;
  }
}
.icon {
  cursor: pointer;
  background-repeat: no-repeat;

  background-size: contain;
  position: relative;
  height: 15px;
  width: 15px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
}

.event-container {
  margin-top: 5px;
}
.event {
  position: relative;
  margin-top: 15px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
}
.info {
  margin-left: 0px;
  display: grid;
  align-items: center;
  height: 100%;
  grid-template-areas: "training trainingName date people edit";
  grid-template-columns: 19% 24% 23% 27% 5%;

  a {
    color: $mainBlack;
    cursor: pointer;
  }

  p {
    &:nth-child(1) {
      padding-left: 30px;
      grid-area: training;
    }
  }
  .sportName {
    padding-left: 30px;
    grid-area: trainingName;
  }
  span {
    padding-left: 30px;
    text-align: left;
    &:nth-child(3) {
      grid-area: date;
    }
    &:nth-child(4) {
      grid-area: people;
    }
  }
}
.color.single {
  position: absolute;
  background: #f5c98c;
  border-radius: 4px;
  height: 100%;
  width: 15px;
  left: 0;
}
.color.group {
  position: absolute;
  background: #f3bdbd;
  border-radius: 4px;
  height: 100%;
  width: 15px;
  left: 0;
}
@media screen and (max-width: 780px) {
  .info {
    a,
    span,
    p {
      font-size: 14px;
    }
  }
  .color.single,
  .color.group {
    width: 12px;
  }
}
@media screen and (max-width: 700px) {
  .icons {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
}

@media screen and (max-width: 600px) {
  .color.single,
  .color.group {
    width: 10px;
  }
  .event {
    height: 100%;
  }
  .info {
    padding: 10px 15px 10px 15px;
    grid-template-areas: "training trainingName date people edit";
    grid-template-columns: 8% 32% 25% 23% 12%;
    span {
      text-align: left;
    }
    p {
      &:nth-child(1) {
        padding-left: 10px;
        grid-area: training;
      }
    }
    a {
      padding-left: 22px;
      grid-area: trainingName;
    }
    span {
      // padding-left: 30px;
      // text-align: left;
      &:nth-child(3) {
        padding-left: 15px;
        grid-area: date;
      }
      &:nth-child(4) {
        grid-area: people;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .info {
    padding: 15px 15px 15px 5px;
  }
}
@media screen and (max-width: 430px) {
  .info {
    grid-template-columns: 8% 29% 27% 25% 12%;
  }
}
</style>
