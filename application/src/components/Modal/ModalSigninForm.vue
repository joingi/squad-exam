<template>
  <transition name="modal">
    <div class="modal-mask" @click="close" v-show="show">
      <div class="modal-wrapper">
        <div class="container">
          <div class="form-container" @click.stop>
            <div
                class="close"
                @click="close"
                :style="{ backgroundImage: 'url(' + require('@/assets/icons/close.svg') + ')'}"
              />
            <form 
              class="form-group"
              @submit.prevent="onSubmit"
            >
            <p v-if="this.error != null">{{this.error}}</p>
            <!-- <h1>{{this.$v.password.$dirt}}</h1> -->
             <div class="error" v-if="this.$v.email.$dirty && !this.$v.email.required">Email is required</div>
              <input type="text" placeholder="Netfang"  v-model.trim="email" >

              <div class="error" v-if="this.$v.password.$dirty && !this.$v.password.required">Password is required</div>
              <input type="password" placeholder="Lykilorð" v-model.trim="password">
              
              <button type="submit"  class="largeButton" > Log in</button>
              <!-- <MediumButton text="Log in"/>  -->
              <span class="switching">
                Already have an Squad account? <a @click="handler" type="submit">Sign up</a>
              </span>
            </form>            
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MediumButton from '@/components/Buttons/MediumButton';
import axios from 'axios';

import { required, email } from 'vuelidate/lib/validators';

const Cookie = process.client ? require('js-cookie') : undefined

var SquadApi = `${process.env.API_PATH}`

export default {
  props: ['show', 'switching'],
  data () {
    return {
      email: '',
      password: '',
      error: null,
      labelOptions1: 'Þjálfun',
      labelOptions2: 'Staður',
      dor: '',
      exerciseOptions: [
        'Hjól',
        'Golf',
        'Jóga',
        'Ganga',
        'Hlaup',
        'Fitness',
        'Snjór'
      ],
      cityOptions: [
        'Höfuðborgarsvæðið',
        'Akureyri',
        'Ísafjörður',
        'Egilsstaðir'
      ],
      submitStatus: null
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
    }
  },
  components: {
    MediumButton
  },
  methods: {
    onSubmit (context) {
      this.$v.$touch()
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const submitForm = {
          email: this.email,
          password: this.password
        }

        this.error = null
        this.clearValues()
        console.log('submitForm', JSON.stringify(submitForm))
        return axios
          .post(`${SquadApi}/login`, submitForm)
          .then(resToken => {
            console.log('resToken', resToken)
            this.close()
            this.$cookie.set('token', resToken.data.token, '1D')
            this.$cookie.set('user_id', resToken.data.user._id, '1D')

            // Setting tokens in store
            this.$store.commit('SET_USER', resToken.data.user)

            return this.$router.push('/profill')
          })
          .catch(err => {
            this.error = 'wrong email or password ';
            console.log('err ', err)
          })
      } else {
        console.log('err login')
      }
    },
    close () {
      this.$emit('close')
      // reset validate error msg
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    clearValues () {
      (this.email = ''), (this.password = '')
    },
    switchingFu () {
      this.$emit('switching')
      // reset validate error msg
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    handler () {
      this.close()
      this.switchingFu()
      // reset validate error msg
      this.$nextTick(() => {
        this.$v.$reset()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.switching {
  a {
    color: #42b983;
  }
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .container,
.modal-leave-active .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
span {
  font-size: 16px;
  text-align: center;
  padding: 35px 0 5px 0;
  min-width: 100%;
}

body {
  overflow: hidden;
}

.form-container {
  height: 100%;
  width: 100%;
  background: #ffffff;
  max-width: 525px;
  padding: 30px;
  margin: 0 auto;
  margin-top: 130px;
  border-radius: 4px;
}

input {
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 0.3);
  border-radius: 4px;
  padding: 18px 0 15px 15px;
  width: 235px;
  min-width: 100%;
  margin-bottom: 20px;
}

.form-group select {
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 0.3);
  border-radius: 4px;
  padding: 10px;
  width: 235px;
}
// test

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

// .modal-enter .modal-container,
// .modal-leave-active .modal-container {
//   // -webkit-transform: scale(1.1);
//   // transform: scale(1.1);
//   transition: all 2s ease;
// }

.modal-enter,
.modal-enter-active,
.modal-leave-to,
.modal-leave-active {
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
