import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex)
var SquadApi = `${process.env.API_PATH}`
export default new Vuex.Store({
  state: {
    authUser: null,
    loadedEvents: [],
    filterPlace: null,
    filterSport: null,
    filterDate: null,
    filterTraining: null,
    authenticated: null,
    userId: null,
    userData: [],
    loadedTrainer: [],
    trainer: null,
    editEvent: [],
    allEvents: [],
    chatList: []
  },
  mutations: {
    RESET (state) {
      state.authUser = null
      state.loadedEvents = []
      state.filterPlace = null
      state.filterSport = null
      state.filterDate = null
      state.filterTraining = null
      state.authenticated = null
      state.userId = null
      state.userData = []
      state.loadedTrainer = []
      state.trainer = null
      state.editEvent = []
      state.allEvents = []
    },
    SET_USER (state, user) {
      // set authUser value
      // console.log('asdasdasd', user)

      state.authenticated = true
      state.trainer = user.trainer
      state.userData = user
    },
    SET_IMAGE (state, image) {
      // console.log('SET_IMAGE: ', image)
      state.userData.image = image
    },
    SET_EVENTS (state, events) {
      // console.log('event 12312312s', events)
      state.loadedEvents = events
    },
    SET_TRAINER (state, events) {
      // console.log('event 12312312s', events)
      state.loadedTrainer = events
    },
    FILTER_DATE (state, date) {
      // console.log('date date', date)
      state.filterDate = date
    },
    FILTER_PLACE (state, place) {
      // console.log('event place', place)
      state.filterPlace = place
    },
    FILTER_TRAINING (state, training) {
      // console.log('event training', training)
      state.filterTraining = training
    },
    FILTER_SPORT (state, sport) {
      // console.log('event sport', sport)
      state.filterSport = sport
    },
    CHAT_LIST (state, chat) {
      // console.log('event chatList chatList', chat)
      return (state.chatList = chat)
    },
    EDIT_EVENT (state, event) {
      // console.log('event event edit', event)
      return (state.editEvent = event)
    },
    GET_ALL_EVENTS (state, event) {
      // console.log('event event', event)
      // console.log('event state', state.allEvents)
      return (state.allEvents = event)
    }
  },
  actions: {
    async serverInit (context, cookieToken) {
      if (cookieToken == null) {
        console.log('no token')
        return router.push('/')
      } else {
        var AuthStr = 'Bearer '.concat(cookieToken)

        var config = { headers: { Authorization: 'Bearer ' + cookieToken } }
        await axios
          .get(`${SquadApi}/profill`, config)
          .then(res => {
            // console.log('what', res)
            return context.commit('SET_USER', res.data)
          })
          .catch(err => {
            console.log('err serverinit', err)
          })
      }
    },
    async fetchApiData (context) {
      await axios
        .get(`${SquadApi}/activities`)
        .then(res => {
          // console.log('sdf', res)
          return context.commit('SET_EVENTS', res.data)
        })
        .catch(err => {
          console.log('err i fetchapidata', err)
        })
    },
    async fetchApiTrainers (context) {
      // var config = { headers: { Authorization: 'Bearer ' + cookieToken } }
      await axios
        .get(`${SquadApi}/leidbeinendur`)
        .then(res => {
          // console.log('sdf TRAINER', res)
          return context.commit('SET_TRAINER', res.data)
        })
        .catch(err => {
          console.log('err i fetchapidata  as TRAINER', err)
        })
    },
    async chatList (context, chat) {
      console.log('test', chat)
      // var config = { headers: { Authorization: "Bearer " + chat.token } };
      // event/edit/?id=${this.$route.params.id}

      var config = { headers: { Authorization: 'Bearer ' + chat } }
      console.log('config', config)
      await axios.get(`${SquadApi}/chatList`, config).then(response => {
        console.log('skilaaa', response)

        if (response.data.length <= 0) {
          return context.commit('CHAT_LIST', null)
        } else {
          return context.commit('CHAT_LIST', response.data)
        }
      })
    },
    // async fetchEvent (context, user) {
    //   console.log('user', user)
    //   var config = { headers: { Authorization: 'Bearer ' + user.userToken } }
    //   // event/edit/?id=${this.$route.params.id}
    //   await axios
    //     .get(`${SquadApi}/event/edit/` + user.eventId)
    //     .then(res => {
    //       console.log('sdf EDIT_EVENT', res)
    //       context.commit('EDIT_EVENT', res.data.response[0])
    //     })
    //     .catch(err => {
    //       console.log('err i fetchapidata TRAINER ', err)
    //     })
    // },
    async editFetchEvent (context, user) {
      console.log('test', user)
      // var config = { headers: { Authorization: 'Bearer ' + user.userToken } }
      return axios({
        method: 'post',
        url: `${SquadApi}/event/edit`,
        data: user.eventRecord,
        headers: {
          Authorization: 'Bearer ' + user.userToken
        }
      })
        .then(res => {
          // console.log('DATA:::', res.data)
          context.commit('EDIT_EVENT', res.data)
        })
        .catch(e => console.log('ERORRR:::::', e))
    },
    async fetchUserEventData (context, userToken) {
      await axios({
        method: 'get',
        url: `${SquadApi}/event/admin/`,
        // params: context.state.userData._id,
        headers: { Authorization: 'Bearer ' + userToken }
      })
        .then(res => {
          console.log('Get all user events in admin', res.data)
          context.commit('GET_ALL_EVENTS', res.data)
        })
        .catch(err => {
          console.log('err i fetchapidata TRAINER22', err)
        })
    },
    setEvents (vuexContext, events) {
      vuexContext.commit('SET_EVENTS', events)
    }
  },
  getters: {
    getUserList (state) {
      return state.chatList
    },
    checkTrainer (state) {
      return state.trainer
    },
    getAllUserEvents (state) {
      return state.allEvents
    },
    editCurrentEvent (state) {
      return state.editEvent
    },
    loadedEvents (state) {
      return state.loadedEvents
    },
    loadedTrainer (state) {
      return state.loadedTrainer
    },
    loadUserData (state) {
      return state.userData
    },
    loadedEventsGroup (state) {
      return state.loadedEvents.filter(type => type.activityType === true)
    },
    // FILTER ADMIN AREA
    loadedEventsAdminFilter: state => payload => {
      var dateObj = new Date()
      var month = dateObj.getUTCMonth() + 1 // months from 1-12
      var day = dateObj.getUTCDate()
      var year = dateObj.getUTCFullYear()

      var newdate = year + '-' + month + '-' + day

      var dateToday = new Date(newdate)
      // console.log('filterTraining', state.allEvents)
      if (state.filterTraining === null && state.filterDate === null) {
        return state.allEvents
      }

      if (state.filterTraining !== null && state.filterDate === null) {
        return state.allEvents.filter(type => {
          if (state.filterTraining == 'Hópþjálfun') {
            return type.activityType === true
          }
          if (state.filterTraining == 'Einkaþjálfun') {
            return type.activityType === false
          }
        })
      }
      // LIÐIÐ
      if (state.filterDate !== null && state.filterTraining === null) {
        return state.allEvents.filter(type => {
          var eventDate = new Date(type.dateTime[0].date)
          if (state.filterDate == 'Liðið') {
            return eventDate <= dateToday && type.activityType
          }
          if (state.filterDate == 'Komandi') {
            return eventDate >= dateToday && type.activityType
          }
        })
      }

      // LIÐIÐ
      if (state.filterDate !== null && state.filterTraining !== null) {
        return state.allEvents.filter(type => {
          var eventDate = new Date(type.dateTime[0].date)
          if (state.filterDate === 'Liðið') {
            return eventDate <= dateToday
          }
          if (state.filterDate === 'Komandi') {
            return eventDate >= dateToday
          }
        })
      }
    },
    // FILTER GROUP EVENTS
    loadedEventsGroupFilter: state => payload => {
      if (state.filterPlace !== null && state.filterSport == null) {
        return state.loadedEvents.filter(
          type => type.activityType == true && type.location.city == payload
        )
      }
      // Filter location and sport of group event
      if (state.filterPlace !== null && state.filterSport !== null) {
        return state.loadedEvents.filter(
          type =>
            type.activityType === true &&
            type.location.city == payload &&
            type.category == state.filterSport
        )
      }

      if (state.filterPlace == null && state.filterSport !== null) {
        return state.loadedEvents.filter(
          type =>
            type.activityType == true && type.category == state.filterSport
        )
      } else {
        return state.loadedEvents.filter(type => type.activityType == true)
      }
    },
    // FILTER SINGLE EVENTS
    loadedEventsSingle (state) {
      return state.loadedEvents.filter(type => type.activityType == false)
    },
    loadedEventsSingleFilter: state => payload => {
      if (state.filterPlace !== null && state.filterSport == null) {
        return state.loadedEvents.filter(
          type => type.activityType === false && type.location == payload
        )
      }
      if (state.filterPlace !== null && state.filterSport !== null) {
        return state.loadedEvents.filter(
          type =>
            type.activityType == false &&
            type.location == payload &&
            type.category == state.filterSport
        )
      }
      if (state.filterPlace == null && state.filterSport !== null) {
        return state.loadedEvents.filter(
          type =>
            type.activityType == false && type.category == state.filterSport
        )
      } else {
        return state.loadedEvents.filter(type => type.activityType == false)
      }
    },
    // FILTER TRAINERS
    loadedTrainersFilter: state => payload => {
      if (state.filterPlace !== null && state.filterSport == null) {
        return state.loadedTrainer.filter(type => type.location == payload)
      }
      if (state.filterPlace !== null && state.filterSport !== null) {
        console.log('xxx')
        return state.loadedTrainer.filter(type => {
          for (let i = 0, length = type.categories.length; i < length; i++) {
            if (
              type.categories[i] == state.filterSport &&
              type.location == payload
            ) {
              return true
            }
          }
          return false
        })
      }
      if (state.filterPlace === null && state.filterSport !== null) {
        return state.loadedTrainer.filter(type => {
          for (let i = 0, length = type.categories.length; i < length; i++) {
            if (type.categories[i] == state.filterSport) {
              return true
            }
          }
          return false
        })
      } else {
        return state.loadedTrainer.filter(type => type.trainer == true)
      }
    }
  }
})
