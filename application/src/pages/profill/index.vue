<template>
  <div class="container profile-container">

    <div class="profile-image-wrapper">
      <div class="wrap"> 
        <img v-if="checkProfileImage !== null" :src="checkProfileImage">
        <img v-else  src="@/assets/uploads/no-user.png" />
        <input type="file" @change="onFileChanged" name="profileImage"  class="custom-file-input">
      </div>
    </div>
    <div class="form-container">
      <form
      class="profile-form-wrapper"
      @submit.prevent="onSubmit"
      >
        <div class="form-group">
          <label for="name">Fornafn</label>
          <input name="firstName" type="text" v-model="firstName">
        </div>
        <div class="form-group">
          <label for="lastname">Eftirnafn</label>
          <input type="text" name="lastName" v-model="lastName">
        </div>
        <div class="form-group"  v-if="checkTrainer === true">
          <label for="about">Um mig</label>
          <textarea class="about-field" v-model="about"/>
        </div>
        <div class="form-group">
          <label for="telefone">Símanúmer</label>
          <input type="tel" name="telefone" v-model.number="telephone">
        </div>
      <div class="form-group location-dropdown">
        <label for="location">Staðsetning</label>
          <div class="cat-wrap"  @click="openLocationList" >
            <div  class="main-bar" :class="{ selected : chosenLocation.length > 0 } " >
              <div class="filter">                
                <label   v-if="chosenLocation.length > 0">{{chosenLocation}}</label >
                <label  v-else>{{location}}</label >
              </div>
            </div>   
          </div>    
          <transition name="fade"> 
            <ul class="dropdown"  v-show="isOpenLocation">
                <li 
                  v-for="(exercise, index) in cityOptions" :key="index"   
                  @mouseover="selectLocation = index" 
                  :class="{'selectedTrain' : isLocationSelected(index)}"
                  @click="filterLocation(exercise)"
                >
                <a >{{ exercise }}</a>
                </li>
            </ul>
          </transition > 
      </div>
      
        <div class="form-group"  v-if=" this.$store.state.trainer === true">
          <label for="category">Flokkar</label>
            <div class="cat-wrap" >
              <span @click="addCategory" class="arrow">
                <img src="https://static.tumblr.com/43vgkmu/ftqmmywe6/drop-down.png"/>
              </span>
              <div  class="main-bar" >
                <div class="tags">                
                    <div class="tag"  v-for="(cat, index) in categoryData" :key="index"  @mouseover="delateTag = index" @mouseleave="delateTag = null"  >
                      <a class="delateTag"  v-if="delateTag === index">
                        <div class="delateTag-wrap">
                        <span
                         @click="deleteTagButton(index)" 
                          class="close"
                          :style="{ backgroundImage: 'url(' + require('@/assets/icons/close.svg') + ')'}"
                        />
                        </div>
                      </a>
                      <label >{{cat}}</label >
                    </div>                
                </div>
              </div>
                <ul class="dropdown category-dropwdown"  v-show="isOpen">
                  <li v-for="(exercise, index) in selectOptions" :key="index"  >
                      <a  @click="addTags(exercise)">{{ exercise }}</a>
                  </li>
                </ul>
            </div>
        </div>
        <div class="form-group"  v-if="checkTrainer === true">
          <label for="serialNo">Kennitala</label>
          <input type="text" name="serialNo" v-model.number="serialNo">
        </div>
        <div class="form-group" v-if="checkTrainer === true">
          <label for="bankInfo">Bankaupplýsingar</label>
          <div class="bankinfo-input">

            <input type="text" name="bankInfo" v-model.number="bankInfo.som1">
            <input type="text" name="bankInfo" v-model.number="bankInfo.som2">
            <input type="text" name="bankInfo" v-model.number="bankInfo.som3">
          </div>
        </div>
        <!-- Button -->
        <div class="save-row">
          <div class="save-row-info">
            <span class="danger" v-if="this.errorMsg != null">{{errorMsg}}</span>
            <span class="success"  v-if="this.successMsg != null">{{successMsg}}</span>
          </div>
          <SmallButton text="Vista" />
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import SmallButton from '@/components/Buttons/SmallButton';
import axios from 'axios';

// import { required, minLength, between } from 'vuelidate/lib/validators'
var SquadApi = `${process.env.API_PATH}`

export default {
  components: {
    SmallButton
  },
  data () {
    return {
      name: '',
      age: 0,
      profileImage: null,
      submitStatus: null,
      authin: null,
      firstName: null,
      lastName: '',
      email: null,
      location: '',
      about: '',
      telephone: '',
      categoryData: [],
      serialNo: null,
      selectedFile: null,
      setImage: null,
      error: false,
      isOpen: false,
      selectOptions: [
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
      bankInfo: { som1: null, som2: null, som3: null },
      testToken: null,
      delateTag: null,
      chosenLocation: '',
      selectLocation: null,
      isOpenLocation: false,
      errorMsg: null,
      successMsg: null
    }
  },
  computed: {
    checkTrainer () {
      return this.$store.state.trainer
    },
    userData () {
      return this.$store.getters.loadUserData
    },
    checkProfileImage () {
      return this.$store.state.userData.image
    },
    getStatus () {
      var userToken = this.$cookie.get('token')
      // console.log('userToken', userToken)

      var config = { headers: { Authorization: 'Bearer ' + userToken } }
      console.log('await config', config)
      return axios
        .get(`${SquadApi}/profill`, config)
        .then(res => {
          let area = res.data
          this.firstName = area.firstName
          this.lastName = area.lastName
          this.location = area.location
          this.profileImage = area.image
          this.email = area.email
          this.about = area.about
          this.telephone = area.telephone
          this.serialNo = area.serialNo

          if (area.categories !== null) {
            this.categoryData = area.categories
          }
          if (area.bankInfo !== undefined) {
            this.bankInfo.som1 = area.bankInfo.som1
            this.bankInfo.som2 = area.bankInfo.som2
            this.bankInfo.som3 = area.bankInfo.som3
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created () {
    // updates values on refreash
    this.getStatus
  },
  mounted () {
    this.getStatus
  },
  methods: {
    // LOCATION DROPDOWN FUNCTION
    openLocationList () {
      // this.isOpenDate = false;
      this.isOpenLocation = !this.isOpenLocation
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
      this.isOpenLocation = false
    },
    // END
    deleteTagButton (e) {
      // console.log("deleteTagButton", e);
      this.categoryData.splice(e, 1)
    },
    mouseOver: function () {
      this.delateTag = !this.delateTag
    },
    addCategory () {
      this.isOpen = !this.isOpen
    },
    addTags (val) {
      if (this.categoryData.includes(val)) {
        return (this.isOpen = false)
      } else {
        this.categoryData.push(val)
      }
      this.isOpen = false
    },
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
      const formData = new FormData()
      formData.append('profileImage', this.selectedFile)
      formData.append('email', this.email)

      var userToken = this.$cookie.get('token')
      return axios({
        method: 'post',
        url: `${SquadApi}/profill/image`,
        data: formData,
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(resToken => {
          var newImg = resToken.data.file
          console.log('asdasdas', resToken.data.file)
          this.successMsg = 'Mynd uppfærð';
          this.$store.commit('SET_IMAGE', newImg)
          this.error = false
        })
        .catch(err => {
          console.log('err ', err)
          this.error = true
        })
    },
    onSubmit () {
      var correctLocation
      if (this.chosenLocation == '') {
        correctLocation = this.location
      } else {
        correctLocation = this.chosenLocation
      }

      var formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        location: correctLocation,
        about: this.about,
        email: this.email,
        telephone: this.telephone,
        categories: this.categoryData,
        serialNo: this.serialNo,
        bankInfo: this.bankInfo
      }
      console.log('formdata', formData)

      var userToken = this.$cookie.get('token')

      return axios({
        method: 'post',
        url: `${SquadApi}/profill/edit`,
        data: formData,
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      })
        .then(res => {
          // console.log("asd", res);
          this.successMsg = 'Upplýsingar uppfærðar';
          this.$store.commit('SET_USER', res.data)
        })
        .catch(err => {
          this.errorMsg = 'Eitthvað fór úrskeiðiðs';
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.filter {
  label {
    color: $mainBlack !important;
  }
}

.location-dropdown {
  position: relative;
}
.dropdown {
  top: 60px;
  padding: 10px 0;
  left: auto;

  li {
    padding: 7px 10px;

    a {
      padding: 15px 10px 10px 10px;
    }
  }
}

.category-dropwdown {
  padding: 0;
  li {
    padding: 0;
    a {
      color: $mainBlack;
    }
  }
}

.profile-image {
  height: 100px;
  width: 100px;
  background-size: contain;
  background-repeat: no-repeat;
}
.profile-container {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-top: 4rem;

  .profile-image-wrapper {
    position: relative;

    img {
      position: relative;
      width: 157px;
      height: auto;
      border-radius: 4px;
      padding-bottom: 10px;
    }
  }
}

.profile-form-wrapper {
  position: relative;

  .form-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid $mainGrey;
    padding: 1rem 0 1.6rem 0;

    input {
      max-width: 356px;
      width: 100%;
      height: 30px;
      border: 1px solid $mainGrey;
      padding: 10px;
      border-radius: 5px;
    }

    .about-field {
      max-width: 356px;
      width: 100%;
      height: 120px;
      padding: 10px;
      border: 1px solid $mainGrey;
      border-radius: 5px;
    }

    .bankinfo-input {
      position: relative;
      max-width: 356px;

      display: grid;
      grid-template-columns: 20% 25% 45%;
      grid-gap: 20px;

      input {
        max-width: 100%;
      }
    }
  }
}

.save-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;

  .save-row-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .danger,
    .success {
      font-size: 16px;
      padding: 10px 15px;
      text-align: center;
      border-radius: 5px;
    }
    .danger {
      color: rgba($color: $dangerColor, $alpha: 0.4);
      border: 1px solid rgba($color: $dangerColor, $alpha: 0.4);
      margin-right: 2rem;
    }
    .success {
      color: rgba($color: $primaryColor, $alpha: 0.4);
      border: 1px solid rgba($color: $primaryColor, $alpha: 0.4);
    }
  }
}
@media screen and (max-width: 850px) {
  .form-group label {
    font-size: 16px;
  }
}
@media screen and (max-width: 790px) {
  .profile-container {
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 600px) {
  .profile-form-wrapper .form-group {
    flex-direction: column;
  }
}
</style>
