
<template>
  <div>
    <!-- Navigation -->
    <!-- {{this.content}}
    {{this.groupActive}} -->
    <div class="nav-wrapper">
      <p v-if="activityType === true">Hópþjálfun</p>
      <p v-else >Einkaþjálfun</p>
    </div>
    <form class="form-container" @submit.prevent="onSave" enctype="multipart/form-data">
      <!-- Title -->
      <div class="form-group">
        <label class="label-title" for="title">Titill</label>
        <div>
          <!-- <div class="error" v-if="$v.title.$dirty && !$v.title.required">Title is required</div>   -->
          <input name="title"  :value="titleValue" id="title" >      
        </div>
      </div>
      <!-- About -->
      <div class="form-group">
        <label class="label-title" for="about">Lýsing</label>
        <div>
          <!-- <div class="error" v-if="$v.about.$dirty && !$v.about.required">About is required</div>   -->
           <textarea class="about-field" :value="aboutValue"  id="about" />
        </div>
      </div>
      <!-- Category -->
        <div class="form-group">
          <label for="category">Flokkar</label>
            <div class="cat-wrap">
              <span @click="addCategory" class="arrow"><img src="https://static.tumblr.com/43vgkmu/ftqmmywe6/drop-down.png"/></span>
              <div  class="main-bar">
                <div class="tags">                
                    <div class="tag"  v-for="(cat, index) in categoryData" :key="index"  @mouseover="delateTag = index" @mouseleave="delateTag = null">
                      <a class="delateTag"  v-if="delateTag === index" >
                        <div class="delateTag-wrap">
                        <span
                         @click="deleteTagButton(index)" 
                          class="close"
                          :style="{ backgroundImage: 'url(' + require('@/assets/icons/close.svg') + ')'}"
                        />
                        </div>
                      </a>
                      <label  >{{cat}}</label >
                    </div>                
                </div>
              </div>
                <ul class="dropdown"  v-show="isOpen">
                  <li v-for="(exercise, index) in selectOptions" :key="index"  >
                      <a  @click="addTags(exercise)">{{ exercise }}</a>
                  </li>
                </ul>
            </div>
        </div>
      <!-- Content -->
      <div class="form-group inhold">
        <label class="label-title" for="inhold">Innihald viðburðs</label>
        <div class="inhold-wrapper">
          <div class="wrap">
            <div v-for="(contentItem, index) in content" :key="index">
              <input name="inhold" v-model="contentItem.value">
            </div>
          </div>
          <div class="button-wrap">
            <button type="button" class="btn-add" @click.prevent="addContent">+</button>
          </div>
        </div>
      </div>
      <!-- Location -->
      <div v-if="activityType === true" class="form-group">
        <label class="label-title" for="location">Staðsetning</label>
          <div class="location-container">
            <input   v-model="address"  type="text" placeholder="Heimilsfang">
            <input   v-model="zip" type="text" placeholder="Postnúmer"> 
            <div class="form-group location-dropdown">
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
          </div>
      </div>
      <!-- Date -->
      <div v-if="activityType === true" class="form-group">
        <label class="label-title" for="date">Dagsetning</label>
        <div class="date-info-input input-date">
          <h1 id="onselectTarget">hye</h1>
          <div v-for="(item, index) in dateTime" :key="index">
      
            <input 
              type="date" 
              name="date" 
              v-model="item.date" id="dateofevent"
              
              >

            <label for="time"></label>
            <input
              type="time"
              name="time"
              v-model="item.timeOfEvent"
              id="timeofevent"
            >

            <label for="hours">mín:</label>
            <input name="hours" v-model="item.timeLength" class="timeLength">
          </div>
        </div>
        <div class="button-wrap">
          <button v-if="false" type="button" class="btn-add" text="+" @click.prevent="addDates">+</button>
        </div>
      </div>
      <!-- Level -->

      <div v-if="activityType === true" class="form-group">
        <label class="label-title" for="level">Level</label>
        <input name="level" v-model="level">
      </div>
      <!-- SingleFjöldi -->
      <div v-if="activityType === false" class="form-group">
        <label class="label-title">Fjöldi æfinga</label>
        <div class="date-info-input">
          <div class="single-date-wrap">
            <label for="hours">Fjöldi</label>
            <input class="timepicker" v-model="singleEvent.numberOfEvents">
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
            <div v-for="(equipmentItem, index) in equipment" :key="index">
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
          type="file"
          multiple
          name="eventImages"
          class="custom-file-input"
          @change="onImageSelected"
        >
      </div>
      <!-- Participants -->
      <div v-if="activityType === true" class="form-group">
        <div class="participants-label">
          <label class="label-title" for="participants">Þáttakendur</label>
          <small>
            <br>Viðburði þínum verður aflýst ef lágmarksfjöldi þáttakenda er ekki uppfyllt á þeim tíma
          </small>
        </div>
        <!-- Date -->
        <div class="date-info-input">
          <label for="min">Min</label>
          <input name="min" v-model="participants.min">
          <label for="max">Max</label>
          <input name="max" v-model="participants.max">
        </div>
      </div>
      <!-- Price -->
      <div class="form-group">
        <div class="participants-label">
          <label class="label-title" for="price">Verð fyrir alla þjálfun sem fer fram</label>
        </div>
        <div class="price-input-group">
          <input name="price" :value="priceValue" id="price">
          <label for="max">ISK</label>
        </div>
      </div>
      <!-- Button Save form -->
      <div class="form-group form-group-btn">
        <div class="save-row-info" v-if="message" :class="`message ${error ? 'danger' : 'sucess'}`">
          <span class="danger">{{message}}</span>
          <span class="success">{{message}}</span>
        </div>
        <BtnSaveForm type="submit" style="position: absolute; right: 0 ">Vista og birta</BtnSaveForm>
        <!-- BTN SAVE -->
      </div>
    </form>
  </div>
</template>

<script>
import SmallButton from "@/components/Buttons/SmallButton";
import BtnSaveForm from "@/components/Buttons/BtnSaveForm";
import SingleGroupBtn from "@/components/Form/SingleGroupBtn";
import FormValDisplay from "@/components/Form/FormValDisplay";

import axios from "axios";
var SquadApi = `${process.env.API_PATH}`;
// import { required, email, alphaNum, minValue } from 'vuelidate/lib/validators'

const objectToFormData = require("object-to-formdata");

export default {
  props: ["eventData"],
  components: {
    SmallButton,
    BtnSaveForm,
    SingleGroupBtn,
    FormValDisplay
  },
  data() {
    return {
      dataTest: [],
      categoryData: [],
      activityType: null,
      title: "",
      about: "",
      content: [{ value: "" }],
      // content: [],
      location: "",
      level: "",
      equipment: [{ value: "" }],
      eventImages: [],
      participants: { min: null, max: null },
      price: "",
      // Single
      singleEvent: {
        numberOfEvents: null,
        eventTime: null
      },
      // if category open
      isOpen: false,
      // Flokkar fyrir utan eventData object
      selectOptions: [
        "Hjól",
        "Golf",
        "Jóga",
        "Ganga",
        "Hlaup",
        "Fitness",
        "Snjór"
      ],
      // location properties
      location: "",
      zip: null,
      address: null,
      // is location dropdown open
      isOpenLocation: false,
      // city options
      cityOptions: [
        "Höfuðborgarsvæðið",
        "Akureyri",
        "Ísafjörður",
        "Egilsstaðir"
      ],
      delateTag: null,
      dateTime: [
        {
          date: "",
          timeOfEvent: "",
          timeLength: ""
        }
      ],
      error: false,
      message: "",
      files: [],
      chosenLocation: ""
    };
  },
  created() {
    this.getDataTest;
  },
  computed: {
    getDataTest() {
      var userToken = this.$cookie.get("token");

      var eventInfo = {
        id: this.$route.params.id,
        token: userToken
      };
      // console.log("eventInfo", eventInfo);

      var config = { headers: { Authorization: "Bearer " + eventInfo.token } };
      return axios({
        method: "GET",
        url: `${SquadApi}/event/edit/`,
        params: { id: eventInfo.id },
        headers: {
          Authorization: "Bearer " + eventInfo.userToken
        }
      })
        .then(res => {
          if (res.data.response[0].location !== null) {
            this.zip = res.data.response[0].location.zip;
            this.address = res.data.response[0].location.address;
            this.location = res.data.response[0].location.city;
          }

          this.activityType = res.data.response[0].activityType;
          this.equipment = res.data.response[0].equipment;
          this.content = res.data.response[0].content;
          this.categoryData = res.data.response[0].category;
          this.singleEvent = res.data.response[0].singleEvent;
          this.dateTime = res.data.response[0].dateTime;
          this.level = res.data.response[0].level;
          this.participants = res.data.response[0].participants;
          return this.$store.commit("EDIT_EVENT", res.data.response[0]);
        })
        .catch(err => {
          console.log("err i fetchapidata TRAINER ", err);
        });
    },
    titleValue() {
      return this.$store.getters.editCurrentEvent.title;
    },
    aboutValue() {
      return this.$store.getters.editCurrentEvent.about;
    },
    catValue() {
      return (this.categoryData = this.$store.getters.editCurrentEvent.category);
    },
    contentValue() {
      var la = this.$store.state.editEvent.content;
      // console.log('lalal', la)
      return (this.content = la);
    },
    equipmentValue() {
      return this.$store.getters.editCurrentEvent.equipment;
    },
    priceValue() {
      return this.$store.getters.editCurrentEvent.price;
    }
  },

  methods: {
    openLocationList() {
      // this.isOpenDate = false;
      this.isOpenLocation = !this.isOpenLocation;
    },
    isLocationSelected(cardIndex) {
      return this.selectLocation === cardIndex;
    },
    filterLocation(val) {
      this.chosenLocation = val;
      this.isOpenLocation = false;
    },
    deleteTagButton(e) {
      this.categoryData.splice(e, 1);
    },
    mouseOver: function() {
      this.delateTag = !this.delateTag;
    },
    addTags(val) {
      if (this.categoryData.includes(val)) {
        return (this.isOpen = false);
      } else {
        this.categoryData.push(val);
      }
      this.isOpen = false;
    },
    addCategory() {
      this.isOpen = !this.isOpen;
    },
    addContent() {
      // checks if string is empty
      let emptyString;
      this.content.filter(type => {
        if (type.value != "") {
          emptyString = true;
        } else {
          emptyString = false;
        }
      });
      if (emptyString === true) {
        this.content.push({ value: "" });
      }
    },
    addEqipment() {
      let emptyString;
      this.equipment.filter(type => {
        if (type.value != "") {
          emptyString = true;
        } else {
          emptyString = false;
        }
      });
      if (emptyString === true) {
        this.equipment.push({ value: "" });
      }
    },
    addDates(e) {
      const newTime = {
        date: this.dateTime.date,
        timeOfEvent: this.dateTime.timeOfEvent,
        timeLength: this.dateTime.timeLength
      };

      this.dateTime.push({ ...newTime });

      this.date = "";
      this.timeOfEvent = "";
      this.timeLength = "";
    },
    onImageSelected(event) {
      var image = event.target.files;
      this.files = [...this.files, ...image];
    },
    onSave() {
      console.log("title id", document.getElementById("title").value);
      // this.$v.$touch();
      var existingFormData = new FormData();

      this.files.forEach(file => {
        existingFormData.append("eventImages", file);
      }, this);

      var contents = [];
      this.content.forEach(test => {
        contents.push({ ...test });
      }, this);

      var equipments = [];
      this.equipment.forEach(test => {
        equipments.push({ ...test });
      }, this);

      var dateTimeObj = [];
      this.dateTime.forEach(test => {
        var obj = {
          timeOfEvent: test.timeOfEvent,
          date: test.date,
          timeLength: test.timeLength
        };
        dateTimeObj.push({ ...obj });
      }, this);

      var correctLocation;
      if (this.chosenLocation == "") {
        correctLocation = this.location;
      } else {
        correctLocation = this.chosenLocation;
      }

      const object = {
        eventId: this.$route.params.id,
        activityType: this.groupActive,
        person: this.$store.state.userData._id,
        title: document.getElementById("title").value,
        about: document.getElementById("about").value,
        price: document.getElementById("price").value,
        equipment: equipments,
        content: contents,
        participants: this.participants,
        location: {
          address: this.address,
          zip: this.zip,
          city: correctLocation
        },
        category: this.categoryData,
        level: this.level,
        singleEvent: this.singleEvent,
        dateTime: dateTimeObj
      };

      const options = {
        /**
         * whether or not to include array indices in FormData keys
         * defaults to false
         */
        indices: true
      };

      const formData2 = objectToFormData(object, options, existingFormData);

      console.log("formData.getAll", object);
      this.$emit("submit", formData2);

      return this.$router.push("/admin");
    }
  }
};
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
  p {
    color: #02c39a;
    font-weight: 500;
    font-size: 18px;
  }

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

.location-dropdown {
  position: relative;
}
.dropdown {
  top: 60px;
  padding: 0;
  left: auto;

  li {
    padding: 0;
    border-bottom: none;
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
</style>
