
<template>
  <div>

    <!-- Navigation -->
    <div class="nav-wrapper">

      <!-- <label for="type">Activity Type</label> -->
      <nav>
        <SingleGroupBtn id="groupActive" v-model="groupActive" @input="listenToClick"/>
      </nav>
    </div>
    <form @submit.prevent="onSave" enctype="multipart/form-data">
      <!-- Title -->
      <div class="form-group" >
        <label class="label-title" for="title">Titill</label>
        <div :class="{invalid : $v.about.$dirty && !$v.title.required}">
           <input name="title"  v-model="title">
        </div>
      </div>
      <!-- About -->
      <div class="form-group">
        <label class="label-title" for="about">Lýsing</label>
        <div  :class="{invalid : $v.about.$dirty && !$v.about.required}">
          <textarea class="about-field" v-model="about" minlength="20" />
        </div>
      </div>
      <!-- Category -->
        <div class="form-group">
          <label for="category">Flokkar</label>
            <div class="cat-wrap" :class="{invalid :$v.categoryData.$dirty && !$v.categoryData.required}">
              <span @click="addCategory" class="arrow"><img src="https://static.tumblr.com/43vgkmu/ftqmmywe6/drop-down.png"/></span>
              <div  class="main-bar" >
                <div class="tags">
                    <div class="tag"  v-for="(cat, index) in categoryData" :key="index"  @mouseover="delateTag = index" @mouseleave="delateTag = null"  >
                      <a class="delateTag" v-if="delateTag === index" @click="deleteTagButton(index)">X</a>
                      <label >{{cat}}</label >
                    </div>
                </div>
              </div>
              <transition name="fade"> 
                <ul class="dropdown"  v-show="isOpen">
                  <li v-for="(exercise, index) in selectOptions" :key="index"  >
                      <a  @click="addTags(exercise)">{{ exercise }}</a>
                  </li>
                </ul>
                </transition>
            </div>
        </div>
      <!-- Content -->
      <div class="form-group inhold">
        <label class="label-title" for="inhold">Innihald viðburðs</label>
        <div class="inhold-wrapper">
          <div class="wrap">
            <div v-for="(contentItem, index) in content" :key="index"  :class="{invalid : $v.content.$each[index].value.$dirty && !$v.content.$each[index].value.required}">
              <input name="inhold" v-model="contentItem.value">
            </div>
          </div>
          <div class="button-wrap">
            <button type="button" class="btn-add" @click.prevent="addContent">+</button>
          </div>
        </div>
      </div>
      <!-- Location -->
      <div v-if="groupActive === true" class="form-group">
        <label class="label-title" for="location">Staðsetning</label>
          <div class="location-container">
            <input  v-model="address"  type="text" placeholder="Heimilsfang">
            <input  v-model="zip" type="text" placeholder="Postnúmer"> 
            <div class="form-group location-dropdown">
                <div class="cat-wrap"  @click="openLocationList" >
                  <div  class="main-bar" :class="{ selected : chosenLocation.length > 0 } " >
                    <div class="filter">                
                      <label   v-if="chosenLocation.length > 0">{{chosenLocation}}</label >
                      <label  v-else>Veldu stað</label >
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
          </div>
      </div>
      <!-- Date -->
      <div v-if="groupActive === true" class="form-group">
        <label class="label-title" for="date">Dagsetning</label>
        <div class="date-info-input input-date">
        <!-- Datetime Object -->
          <ul v-for="(item, index) in dateTime" :key="index"   >
            <li  >
              <input
                :class="{errorDatetime : errorDatetime}"
                type="date"
                name="date"
                v-model="item.date" id="dateofevent"
                >
            </li>
            <li >
                <label for="time"></label>
                <input
                  :class="{errorDatetime : errorDatetime}"
                  type="time"
                  name="time"
                  v-model="item.timeOfEvent"
                  id="timeofevent"
                >
            </li>
            <li >
              <label for="hours">mín:</label>
              <input
                :class="{errorDatetime : errorDatetime}"
                name="hours"
                v-model="item.timeLength"
                class="timeLength"
                id="timeLength"
                >
            </li>
          </ul>

        </div>

        <div class="button-wrap">
          <button v-if="false"  type="button" class="btn-add" text="+" @click.prevent="addDates">+</button>
        </div>
      </div>
      <!-- Level -->
      <div v-if="groupActive === true" class="form-group" :class="{invalid : $v.level.$dirty && !$v.level.required}">
        <label class="label-title" for="level">Level</label>
        <input name="level" v-model="level">
      </div>
      <!-- SingleFjöldi -->
      <div v-if="groupActive === false" class="form-group">
        <label class="label-title">Fjöldi æfinga</label>
        <div class="date-info-input" :class="{invalid : $v.singleEvent.numberOfEvents.$dirty && !$v.singleEvent.numberOfEvents.required}" >
          <div class="single-date-wrap">
            <label for="hours">Fjöldi</label>
            <input class="timepicker" v-model="singleEvent.numberOfEvents" />
            <label for="hours">Mín:</label>
            <input type="text" name="hours" v-model="singleEvent.eventTime">
          </div>
        </div>
      </div>
      <!-- Equipment -->
      <div class="form-group inhold">
        <label class="label-title" for="equipment">Áhöld</label>
        <div class="inhold-wrapper">
          <div class="wrap">
            <div v-for="(equipmentItem, index) in equipment" :key="index" :class="{invalid : $v.equipment.$each[index].value.$dirty && !$v.equipment.$each[index].value.required}">
              <input name="equipment" v-model="equipmentItem.value">
            </div>
          </div>
          <div class="button-wrap">
            <button type="button" class="btn-add" @click.prevent="addEqipment">+</button>
          </div>
        </div>
      </div>
      <!-- Images -->
      <div class="form-group">
        <label class="label-title" for="images">Myndir</label>
        <input
          :class="{errorImage : errorImage}"
          type="file"
          multiple
          name="eventImages"
          class="custom-file-input "
          @change="onImageSelected"
        >
      </div>
      <!-- Participants -->
      <div v-if="groupActive === true" class="form-group">
        <div class="participants-label">
          <label class="label-title" for="participants">Þáttakendur</label>
          <small>
            <br>Viðburði þínum verður aflýst ef lágmarksfjöldi þáttakenda er ekki uppfyllt á þeim tíma
          </small>
        </div>
        <!-- Date -->
        <div class="date-info-input"  :class="{invalid : $v.participants.min.$dirty && !$v.participants.min.required ||  $v.participants.max.$dirty && !$v.participants.max.required}" >
          <label for="min">Min</label>
          <input name="min" v-model="participants.min">
          <label for="max">Max</label>
          <input name="max" v-model="participants.max"  >
        </div>
      </div>
      <!-- Price -->
      <div class="form-group">
        <div class="participants-label">
          <label class="label-title" for="price">Verð fyrir alla þjálfun sem fer fram</label>
        </div>
        <div class="price-input-group" :class="{invalid : $v.price.$dirty && !$v.price.required}">
          <input name="price" v-model="price">
          <label for="max">ISK</label>
        </div>
      </div>
      <!-- Button Save form -->
      <div class="form-group form-group-btn">
        <div class="save-row-info" v-if="message" :class="{invalid : this.error, success: !this.error }">
          <span>{{message}}</span>
        </div>
        <button type="submit" class="btnSaveButton">Vista og birta</button>
      </div>
    </form>
  </div>
</template>

<script>
import SmallButton from '@/components/Buttons/SmallButton';
import BtnSaveForm from '@/components/Buttons/BtnSaveForm';
import SingleGroupBtn from '@/components/Form/SingleGroupBtn';
import FormValDisplay from '@/components/Form/FormValDisplay';

import axios from 'axios';

import {
  required,
  email,
  alphaNum,
  minValue,
  numeric,
  minLength,
  minLen,
  requiredUnless,
  requiredIf
} from 'vuelidate/lib/validators';

const objectToFormData = require('object-to-formdata')

export default {
  components: {
    SmallButton,
    BtnSaveForm,
    SingleGroupBtn,
    FormValDisplay
  },
  data () {
    return {
      errorImage: null,
      isOpenLocation: false,
      categoryData: [],
      title: '',
      about: '',
      content: [{ value: '' }],
      zip: '',
      level: '',
      address: '',
      equipment: [{ value: '' }],
      eventImages: [],
      participants: { min: null, max: null, total: [] },
      price: '',
      // Single
      singleEvent: {
        numberOfEvents: null,
        eventTime: null
      },
      groupActive: true,
      selectLocation: null,
      // if category open
      isOpen: false,
      // Flokkar fyrir utan eventData object
      selectOptions: [
        'Hjól',
        'Golf',
        'Jóga',
        'Ganga',
        'Hlaup',
        'Fitness',
        'Snjór'
      ],
      delateTag: null,
      dateTime: [
        {
          date: '',
          timeOfEvent: '',
          timeLength: ''
        }
      ],
      error: null,
      cityOptions: [
        'Höfuðborgarsvæðið',
        'Akureyri',
        'Ísafjörður',
        'Egilsstaðir'
      ],
      errorDatetime: false,
      message: '',
      chosenLocation: '',
      files: []
    }
  },
  validations () {
    if (this.groupActive) {
      return {
        title: {
          required: required
        },
        about: {
          required: required
        },
        level: {
          required: required
        },
        price: {
          required: required
        },
        participants: {
          min: {
            required,
            numeric
          },
          max: {
            required,
            numeric
          }
        },
        dateTime: {
          minLen: minLength(1),
          $each: {
            date: {
              required: requiredIf(vm => {
                return vm.groupActive === true
              })
            },
            timeOfEvent: {
              required: requiredIf(vm => {
                return vm.groupActive === true
              })
            },
            timeLength: {
              required: requiredUnless(vm => {
                return vm.groupActive === true
              })
            }
          }
        },
        categoryData: {
          minLen: minLength(1),
          required
        },
        content: {
          minLen: minLength(1),
          $each: {
            value: {
              required
            }
          }
        },
        equipment: {
          minLen: minLength(1),
          $each: {
            value: {
              required
            }
          }
        }
      }
    } else {
      return {
        title: {
          required: required
        },
        about: {
          required: required
        },
        price: {
          required: required
        },
        singleEvent: {
          numberOfEvents: {
            required
          },
          eventTime: {
            required
          }
        },
        categoryData: {
          minLen: minLength(1),
          required
        },
        content: {
          minLen: minLength(1),
          $each: {
            value: {
              required
            }
          }
        },
        equipment: {
          minLen: minLength(1),
          $each: {
            value: {
              required
            }
          }
        }
      }
    }
  },
  methods: {
    openLocationList () {
      // this.isOpenDate = false;
      this.isOpenLocation = !this.isOpenLocation
    },
    isLocationSelected (cardIndex) {
      return this.selectLocation === cardIndex
    },
    filterLocation (val) {
      this.chosenLocation = val
      this.isOpenLocation = false
    },
    listenToClick (val) {
      this.errorImage = false
      if (val === false) {
        this.$v.$reset()
      } else {
        this.$v.$reset()
      }
    },
    deleteTagButton (e) {
      this.categoryData.splice(e, 1)
    },
    mouseOver: function () {
      this.delateTag = !this.delateTag
    },
    addTags (val) {
      if (this.categoryData.includes(val)) {
        return (this.isOpen = false)
      } else {
        this.categoryData.push(val)
      }
      this.isOpen = false
    },
    addCategory () {
      this.isOpen = !this.isOpen
    },
    addContent () {
      // checks if string is empty
      let emptyString
      this.content.filter(type => {
        if (type.value != '') {
          emptyString = true
        } else {
          emptyString = false
        }
      })
      if (emptyString === true) {
        this.content.push({ value: '' })
      }
    },
    addEqipment () {
      let emptyString
      this.equipment.filter(type => {
        if (type.value != '') {
          emptyString = true
        } else {
          emptyString = false
        }
      })
      if (emptyString === true) {
        this.equipment.push({ value: '' })
      }
    },
    addDates () {
      let emptyString
      this.dateTime.filter(type => {
        if (type.date != '' || type.timeLength || type.timeOfEvent) {
          emptyString = true
        } else {
          emptyString = false
        }
      })
      if (emptyString === true) {
        const newTime = {
          date: this.dateTime.date,
          timeOfEvent: this.dateTime.timeOfEvent,
          timeLength: this.dateTime.timeLength
        }
        this.dateTime.push({ ...newTime })
      }

      this.date = '';
      this.timeOfEvent = '';
      this.timeLength = '';
    },
    onImageSelected (event) {
      var image = event.target.files
      this.files = [...this.files, ...image]
    },
    onSave () {
      this.$v.$touch()

      // for (var i = 0; i < this.dateTime.length; i++) {
      //   if (
      //     this.dateTime[i].date === "" ||
      //     this.dateTime[i].date === null ||
      //     (this.dateTime[i].date === undefined &&
      //       this.dateTime[i].timeLength === "") ||
      //     ((this.dateTime[i].timeLength === undefined &&
      //       this.dateTime[i].timeOfEvent === "") ||
      //       this.dateTime[i].timeOfEvent === undefined)
      //   ) {
      //     this.errorDatetime = true;
      //   } else {
      //     this.errorDatetime = false;
      //   }
      // }

      if (
        !this.$v.$invalid &&
        this.files.length <= 1
        // &&
        // this.errorDatetime === true
      ) {
        var existingFormData = new FormData()

        this.files.forEach(file => {
          existingFormData.append('eventImages', file)
        }, this)

        var contents = []
        this.content.forEach(test => {
          contents.push({ ...test })
        }, this)

        var equipments = []
        this.equipment.forEach(test => {
          equipments.push({ ...test })
        }, this)

        var dateTimeObj = []
        this.dateTime.forEach(test => {
          var obj = {
            timeOfEvent: test.timeOfEvent,
            date: test.date,
            timeLength: test.timeLength
          }
          dateTimeObj.push({ ...obj })
        }, this)

        const object = {
          activityType: this.groupActive,
          person: this.$store.state.userData._id,
          title: this.title,
          about: this.about,
          price: this.price,
          equipment: equipments,
          content: contents,
          participants: this.participants,
          location: {
            address: this.address,
            zip: this.zip,
            city: this.chosenLocation
          },
          category: this.categoryData,
          level: this.level,
          singleEvent: this.singleEvent,
          dateTime: dateTimeObj
        }
        const options = {
          /**
         * whether or not to include array indices in FormData keys
         * defaults to false
         */
          indices: true
        }

        const formData2 = objectToFormData(object, options, existingFormData)
        this.$emit('submit', formData2)
        this.message = "upplýsingar save'aðar"
        this.error = false
      } else {
        // console.log('bla', this.files.length)
        // image error
        if (this.files.length < 1) {
          this.errorImage = true
        }
        this.error = true
        this.message = 'vinsamlegast fylltu út öll formin';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.location-container {
  display: flex;
  position: relative;
  flex-direction: column;
  input {
    padding-left: 5px;
  }
  .location-dropdown {
    padding: 0;
    border-bottom: 0;
    margin: 0;
    .cat-wrap {
      width: 100%;
    }
    .dropdown {
      left: 0;
      top: 45px;
    }
  }
}

.custom-file-input {
  border: none !important;
}

.single-date-wrap {
  margin-left: auto;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 525px;
  margin: 0 auto;
  border-bottom: 1px solid $mainGrey;
  padding: 2rem 0 1.4rem 0;

  nav {
    display: flex;
    justify-content: flex-start;
    width: 360px;
  }

  .nav-button {
    margin-right: 1rem;
    background-color: $mainWhite;
    color: $primaryColor;
    border: 1px solid $primaryColor;
  }
}

.timeFormat {
  div {
    background-color: white;
    display: inline-flex;
    border: 1px solid #ccc;
    color: #555;
  }

  input {
    border: none;
    color: #555;
    text-align: center;
    width: 60px;
  }
}

#onselectTarget {
  display: none;
}
.timeLength {
  max-width: 50px;
}

.timepicker {
  background-image: url("~@/assets/images/clock.png");
  background-repeat: no-repeat;
  background-position: right;
  background-position-x: 90px;
  padding-right: 30px;
}

.tags {
  display: flex;
  flex-direction: row;
}

.tag label {
  padding: 10px;
  font-size: 14px;
  background: #02c39a;
  color: white;
  margin-right: 5px;
  border-radius: 4px;
}

.share-wrap {
  width: 300px;

  cursor: pointer;
  .main-bar {
    position: relative;
    background: #fff;
    border: 1px solid #d8d8d8;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #82c9bd;
    padding: 10px 0 10px 10px;
    border-radius: 4px;
    min-height: 40px;
  }

  // .main-bar:hover {
  //   background: #f9f9f9;
  // }

  .main-bar > span {
    position: absolute;
    top: 10px;

    right: 20px;

    cursor: pointer;
  }

  ul {
    display: none;
    margin-top: -1px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    width: 100%;
    max-width: 300px;
  }
}

.button-wrap {
  display: flex;
  align-items: baseline;
}

.form-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid $mainGrey;
  padding: 2rem 0 1.4rem 0;
  max-width: 525px;
  margin: 0 auto;

  input {
    width: 356px;
    height: 30px;
    border: 1px solid $mainGrey;
    border-radius: 5px;
  }

  .label-title {
    font-size: $fontSize16;
    font-weight: $fontSemibold;
  }

  .about-field {
    width: 356px;
    height: 120px;
    border: 1px solid $mainGrey;
    border-radius: 5px;
  }
}

.form-group .inhold {
  justify-content: flex-start;
}

.category-wrapper,
.inhold-wrapper {
  display: flex;
  flex-direction: flex-start;
  width: 252px;
  input {
    width: 223px;
  }
}

.date-info-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  flex-wrap: wrap;
  max-width: 360px;
  width: 100%;
  ul {
    display: flex;
    align-items: center;
    list-style-type: none;
    margin-top: 0;
  }
  li {
    display: flex;
  }
  label {
    font-size: $fontSize14;
    align-self: center;
    padding: 0 5px;
  }

  input:nth-of-type(1) {
    width: 115px;
    margin-right: 10px;
  }
  input:nth-of-type(2) {
    width: 68px;
  }
}

.input-date {
  flex-wrap: wrap;
  flex-direction: column;
}

.participants-label {
  width: 134px;
}

.price-input-group {
  display: flex;

  input {
    width: 90px;
    margin-right: 10px;
  }
}

.btn-add {
  font-size: 24px;
  margin-left: 10px;
  padding: 0 7px;
  height: 30px;
  color: white;
  background: #02c39a;
  border-radius: 4px;
}

.form-group-btn {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: none;
}

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

// styling dropdown

.cat-wrap {
  position: relative;
  width: 300px;

  cursor: pointer;
  .main-bar {
    overflow-x: auto;
    position: relative;
    background: #fff;
    border: 1px solid #d8d8d8;
    padding: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #82c9bd;
    padding: 10px 0 10px 10px;
    border-radius: 4px;
    min-height: 40px;
  }

  .main-bar:hover {
    background: #f9f9f9;
  }

  .arrow {
    position: absolute;
    top: 10px;
    right: 20px;
    position: absolute;
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

  .dropdown {
    display: block;
    margin-top: -1px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
    position: absolute;
    width: 100%;
    max-width: 300px;
    z-index: 1;
    top: 45px;
    padding: 0;
  }

  li {
    padding: 0;
    border: none;
  }

  a:hover {
    background: #02c39a;
    // border-right: 4px solid #ccc;
    // transition: all 0.3s ease-in-out;
    // -moz-transition: all 0.3s ease-in-out;
    // -webkit-transition: all 0.3s ease-in-out;
  }
}
.tags {
  position: relative;
  display: flex;
  flex-direction: row;
}
.delateTag {
  position: absolute;
  bottom: 0px;
  left: 20px;
  background: transparent !important;
  border: none;
}
.tag {
  position: relative;
  z-index: 10;
  margin-right: 5px;
}

.tag label {
  padding: 5px 10px;
  font-size: 14px;
  background: #02c39a;
  color: white;
  border-radius: 4px;
}
.tag {
  padding: 5px 10px;
  font-size: 14px;
  background: #02c39a;
  color: white;
  border-radius: 4px;
  &:last-child {
    margin-right: 40px;
  }
}

.filter {
  label {
    color: $mainBlack !important;
  }
}

.location-dropdown {
  position: relative;
}
.dropdown {
  top: 70px;
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

@media screen and (max-width: 560px) {
  form {
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .participants-label {
      width: 100%;
      padding-bottom: 10px;
    }
    .date-info-input {
      align-self: baseline;
    }
  }
}

.errorImage {
  border: 1px solid red !important;
}
.errorDatetime {
  border: 1px solid red !important;
}
</style>
