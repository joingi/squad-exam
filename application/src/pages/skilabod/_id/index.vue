<template>
  <div class="container">

    <div class="message-container">
      <div class="message-conntacts">
        <div class="message-conntacts-inner">

          <ChatList :userList="getUserList" />
        </div>
      </div>

      <div class="message-wrapper">
          <ul class="chat-window">
          <li class="chat">
            <div class="chatArea">
              <ul ref="messages" class="messages">
                <small v-if="typing" class="is-typing float-right">{{ typing }} er að skrifa</small>
                <li v-for="(message, index) in messages" :key="index" class="message">
                  <span :class="{'float-right':(message.author === 'Ég')}">
                    <small>{{message.author}}:  </small>
                    {{ message.message }}
                    </span><br>
                </li>
              </ul>
            </div>
            <form @submit.prevent="sendMessage">
              <div class="message-controll">
              <input v-model="newMessage" class="inputMessage" type="text" placeholder="Type here...">  
            </div>
            </form>

          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import smallButton from '@/components/Buttons/SmallButton';
import axios from 'axios';
import * as io from 'socket.io-client';
import ChatList from '@/components/Chat/ChatList';
import { mapGetters } from 'vuex';
var SquadApi = `${process.env.API_PATH}`

export default {
  components: {
    smallButton,
    ChatList
  },
  data () {
    return {
      error: {},
      test: [],
      typing: false,
      userRecive: this.$route.params.id,
      userSend: this.$store.state.userData._id,
      room: null,
      userList: [],
      name: this.$route.params.id,
      ready: false,
      info: [],
      newMessage: null,
      messages: [],
      conversation: [],
      socket: io(`${SquadApi}`, { path: '/chat/socket.io' })
    }
  },
  mounted () {
    this.scrollToBottom()
    this.createRoom()
    this.chatListData()
  },
  created () {
    this.chatListData()
    this.getFullChat()
  },
  computed: {
    ...mapGetters(['getUserList'])
  },
  methods: {
    chatListData () {
      var userToken = this.$cookie.get('token')
      this.$store.dispatch('chatList', userToken)
    },
    createRoom () {
      var users = {
        author: this.$store.state.userData._id,
        to: this.$route.params.id
      }
      console.log('room123123 ', users)
      var userToken = this.$cookie.get('token')
      axios({
        method: 'get',
        url: `${SquadApi}/chat`,
        params: users,
        headers: { Authorization: 'Bearer ' + userToken }
      }).then(response => {
        console.log('asd', this.$route)
        this.room = response.data.conversation._id

        const conversation = {}
        conversation.room = this.room
        conversation.user = this.$store.state.userData._id
        conversation.to = this.$route.params.id

        this.socket.emit('join', conversation)
      })

      this.socket.on('chat-message', data => {
        console.log('chat-message', data)

        var user

        if (data.user === this.$store.state.userData._id) {
          user = 'Ég';
        } else if (data.user === this.$route.params.id) {
          user = 'Þú';
        }

        return this.messages.push({
          message: data.msg,
          type: 1,
          author: user
        })
      })
    },

    sendMessage () {
      var converstation = {
        body: { user: this.$store.state.userData._id, msg: this.newMessage },
        author: this.$store.state.userData._id,
        to: this.$route.params.id
      }

      var userToken = this.$cookie.get('token')
      axios({
        method: 'post',
        url: `${SquadApi}/chat`,
        data: converstation,
        headers: { Authorization: 'Bearer ' + userToken }
      }).then(response => {
        console.log('post msg ', response)
        if (response.data._id !== null) {
          this.room = response.data._id
        }
      })

      const conversation = {}
      conversation.room = this.room
      conversation.user = this.$store.state.userData._id
      conversation.to = this.userRecive
      console.log('post msg conversation', conversation)
      this.socket.emit('join', conversation)

      this.newMessage = null
    },
    setName () {
      this.ready = true
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
    },
    getFullChat () {
      // Clear previous chat values
      this.messages = []
      // Switch between rooms
      const conversation = {}
      conversation.room = this.room
      conversation.user = this.userSend
      conversation.to = this.userRecive
      console.log(
        'this.$store.state.userData._id;',
        this.$store.state.userData
      )

      console.log('room', conversation)
      this.socket.emit('join', conversation)
      // get previous chat
      var users = {
        author: this.$store.state.userData._id,
        to: this.$route.params.id
      }
      // console.log('fullchat user', users)
      var userToken = this.$cookie.get('token')
      axios({
        method: 'get',
        url: `${SquadApi}/chat`,
        params: users,
        headers: { Authorization: 'Bearer ' + userToken }
      }).then(response => {
        console.log('hey', response.data.conversation.body)
        this.room = response.data.conversation._id
        for (let i = 0; i < response.data.conversation.body.length; i++) {
          const msg = response.data.conversation.body[i]
          console.log(
            'response.data.conversation',
            response.data.conversation.body[i]
          )
          console.log('msgmsg', msg)
          var user

          if (msg.user === this.$store.state.userData._id) {
            user = 'Ég';
          } else if (msg.user === this.$route.params.id) {
            user = 'Þú';
          }

          this.messages.push({
            message: msg.msg,
            // type: 0,
            author: user
          })
        }
      })
      console.log('this.messages', this.messages)
    }
  },
  watch: {
    newMessage (value) {
      value
        ? this.socket.emit('typing', this.name)
        : this.socket.emit('stopTyping')
    },
    messages: 'scrollToBottom',
    $route (id) {
      // this.socket.disconnect()
      this.getFullChat()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.float-right {
  float: right;
  clear: right;
  background-color: $mainBlue !important;
  color: $mainWhite;
}

.is-typing {
  color: red;
}

.message-container {
  display: grid;
  grid-template-columns: 35% 65%;
  grid-gap: 35px;
  position: relative;
  max-height: 495px;
  margin-top: 67px;
}

.message-conntacts {
  position: relative;
  padding: 2rem;
  height: auto;

  .message-conntacts-inner {
    position: relative;
    width: 100%;
    height: 495px;
    border: 1px solid $mainGrey;
    overflow: hidden;
    overflow-y: scroll;
  }
}
.message-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.chat-window {
  position: absolute;
  width: 100%;
  top: 0;
}

/* Messages */
.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;

  .message {
    position: relative;
    color: $mainBlack;
    margin-top: 51px;

    span {
      background-color: $mainGrey;
      border-radius: 5px;
      padding: 1rem;
    }
  }
}

ul {
  list-style: none;
  word-wrap: break-word;
}

.chatArea {
  height: 357px;
  padding-bottom: 60px;
  border: 1px solid $mainGrey;
}

.message-controll {
  position: relative;
  margin-top: 18px;
}

/* Input */

.inputMessage {
  position: relative;
  border: 1px solid $mainGrey;
  height: 51px;
  outline: none;
  padding-left: 10px;
  width: 100%;
  margin-bottom: 1.6rem;
}

.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}
</style>
