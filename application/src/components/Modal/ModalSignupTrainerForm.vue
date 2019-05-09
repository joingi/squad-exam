<template>
  <transition name="modal" >
    <div class="modal-mask" @click="close" v-if="show">
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
              :class="{invalid: $v.email.$error}"
            >
                          <!-- Email required -->
              <div class="error" v-if="$v.email.$dirty && !$v.email.required">Email is required</div>
                <input
                  type="email"
                  placeholder="Email"
                  v-model="email"

                  >
              <!-- First name required -->
              <div class="error" v-if="$v.firstName.$dirty && !$v.firstName.required">firstName is required</div>
              <input type="text" placeholder="Fornafn" v-model.trim="firstName">

              <!-- Last name required -->
              <div class="error" v-if="$v.lastName.$dirty && !$v.lastName.required">lastName is required</div>
              <input type="text" placeholder="Eftirnafn" v-model.trim="lastName">

              <input type="file" @change="onFileChanged" name="profileImage" class="custom-file-input " >

            <!-- Location required -->
            <div  class="error" v-if="this.errorLocation !== null">
              <span>{{errorLocation}}</span>
            </div>
            <div class="form-group">
              <div class="cat-wrap"  @click="openLocationList" v-bind:style= "[this.errorLocation ? {'border': '1px solid red'} : {'border': 'none'} ]">
                <div  class="main-bar" :class="{ selected : chosenLocation.length > 0 } " >
                  <div class="filter">
                    <label class="ejo"  v-if="chosenLocation.length > 0">{{chosenLocation}}</label >
                    <label  v-else>Staðsetning</label >
                  </div>
                </div>
                 </div>

                <!-- FILTER LOCATION DROPDOWN -->
                <transition name="fade">
                <ul class="dropdown"  v-show="isOpen">
                    <li
                      v-for="(exercise, index) in cityOptions" :key="index"
                      @mouseover="selectLocation = index"
                      :class="{'selectedTrain' : isLocationSelected(index)}"
                      @click="filterLocation(exercise)"
                    >
                    <a >{{ exercise }}</a>
                    </li>
                </ul>
                </transition>
              </div>
              <!-- Password required -->
              <div class="error" v-if="$v.password.$dirty && !$v.password.required">Password is required</div>
              <input type="password" placeholder="Búa til lykilorð" v-model.trim="password">

              <button  type="submit"  class="largeButton" >Skrá sig</button>
              <!-- <MediumButton text="Sign Up"/> -->
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
const objectToFormData = require('object-to-formdata')

var SquadApi = `${process.env.API_PATH}`

export default {
  props: ['show'],
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      location: '',
      password: '',
      labelOptions1: 'Þjálfun',
      labelOptions2: 'Staður',
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
      chosenLocation: '',
      selectLocation: null,
      isOpen: false,
      errorLocation: null,
      clearError: '1px solid rgba(151, 151, 151, 0.3)',
      selectedFile: null
    }
  },
  validations: {
    email: {
      required: required,
      email: email
    },
    password: {
      required: required
    },
    firstName: {
      required: required
    },
    lastName: {
      required: required
    },
    chosenLocation: {
      required: required
    }
  },
  mounted () {},
  components: {
    MediumButton
  },
  methods: {
    openLocationList () {
      this.isOpen = !this.isOpen
    },
    clearLocationFilter () {
      this.selectLocation = null
      this.isOpen = false
      this.chosenLocation = '';
    },
    isLocationSelected (cardIndex) {
      return this.selectLocation === cardIndex
    },
    filterLocation (val) {
      this.chosenLocation = val
      this.isOpen = false
    },
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
    },
    onSubmit () {
      this.$v.$touch()

      if (!this.$v.$invalid && this.chosenLocation !== null) {
        // image
        var existingFormData = new FormData()
        existingFormData.append('profileImage', this.selectedFile)
        const options = {
          /**
         * whether or not to include array indices in FormData keys
         * defaults to false
         */
          indices: true
        }

        const formData = {
          email: this.email,
          firstName: this.firstName,
          trainer: true,
          lastName: this.lastName,
          location: this.chosenLocation,
          password: this.password
        }
        this.errorLocation = null
        const formData2 = objectToFormData(formData, options, existingFormData)
        return axios({
          method: 'post',
          url: `${SquadApi}/signup`,
          data: formData2
        })
          .then(tokenCall => {
            this.$cookie.set('token', tokenCall.data.token, '1D')

            return axios({
              method: 'get',
              url: `${SquadApi}/profill`,
              headers: {
                Authorization: 'Bearer ' + tokenCall.data.token
              }
            })
              .then(res => {
                this.close()
                this.$store.commit('SET_USER', res.data)
                return this.$router.push('/profill')
              })
              .catch(err => {
                console.log('profill page: get status error func', err)
              })
          })
          .catch(err => {
            console.log('err ', err)
          })
      } else {
        if (this.chosenLocation === '') {
          this.errorLocation = 'Please select location';
          console.log('please fill in form')
        }
      }
    },
    close () {
      this.$emit('close')
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    switchingFu () {
      this.$emit('switching')
      this.$nextTick(() => {
        this.$v.$reset()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

form {
  position: relative;
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
  padding-top: 40px;
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
.largeButton {
  font-size: 16px;
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

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/////********* DROPDOWN ********** /

//
.main-bar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  top: 10px;
  right: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  top: 0;
  right: 0;
  cursor: pointer;
  background: white;
  z-index: 11;
  margin: 10px;
}

.cat-wrap {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  cursor: pointer;
  .main-bar {
    position: relative;
    background: #ffffff;
    border: 1px solid rgba(151, 151, 151, 0.3);
    border-radius: 4px;
    padding: 18px 0 15px 15px;
    font-size: 16px;
    font-weight: 600;
    color: #82c9bd;
    padding: 10px;
    min-height: 40px;
    text-align: left;
  }

  .main-bar:hover {
    background: #f9f9f9;
  }

  .main-bar > span {
    position: absolute;
    top: 10px;

    right: 20px;

    cursor: pointer;
  }

  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  a,
  a:visited {
    text-decoration: none;
    padding-left: 0;
    color: #777;
    padding: 15px;
    display: block;
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    border-right: 4px solid #fff;
  }
  .filter:hover {
    label {
      color: black;
    }
  }

  a:hover {
    background: #f4f4f4;
    border-right: 4px solid #ccc;
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
  }
}

.form-group {
  position: relative;
}

.dropdown {
  top: 45px;
  bottom: 0;
  padding: 0;
  li {
    width: 100%;
    padding: 10px;
    text-align: left;
    border: none;
  }
  .clear {
    margin-top: 5px;
    width: 100%;
    text-align: right;
    font-size: 14px;
    color: #02c39a;
    border-radius: 4px;
    padding: 0 10px;
  }
  .selectedTrain {
    color: white;
    background: #02c39a;
  }
}
.cat-wrap .selected {
  background: #02c39a;
}
.cat-wrap .selected label {
  color: white;
}

.filter {
  label {
    font-size: 16px;
    font-family: $fontLight;
    font-weight: 100;
    // padding: 10px 15px;
  }
}

.dropdown-date {
  left: 163px;
  top: 75px;
}

.custom-file-input {
  padding: 0;
  border: none;
}
</style>
