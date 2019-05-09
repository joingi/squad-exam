<template>
  <div class="container">
    <div class="message-container">
      <div class="message-conntacts">
        <div class="message-conntacts-inner">
          <ChatList :userList="this.getUserList" />
        </div>
      </div>

       <div class="message-wrapper">
          <ul class="chat-window">
          <li class="chat">
            <div class="chatArea">
              <ul ref="messages" class="messages">
                <h4 > Engin samtöl hafin </h4>
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
import ChatList from '@/components/Chat/ChatList';
import smallButton from '@/components/Buttons/SmallButton';

import { mapGetters } from 'vuex';

export default {
  components: {
    smallButton,
    ChatList
  },
  data () {
    return {
      error: {},
      typing: false,
      ready: false,
      info: [],
      newMessage: null,
      messages: []
    }
  },
  mounted () {
    this.scrollToBottom()
    this.chatListData()
  },
  created () {
    this.chatListData()
  },
  computed: {
    ...mapGetters({
      getUserList: 'getUserList'
    })
  },
  methods: {
    chatListData () {
      var userToken = this.$cookie.get('token')
      console.log('chatList', this.$route)
      this.$store.dispatch('chatList', userToken)
    },
    scrollToBottom () {
      this.$nextTick(() => {
        // this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
      })
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
  height: 495px;
  margin-top: 67px;
}

.message-conntacts {
  position: relative;
  padding: 2rem;

  .message-conntacts-inner {
    width: 100%;
    height: 100%;
    border: 1px solid $mainGrey;
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
