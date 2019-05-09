<template>
  <div class="container create-event-container">
    <div class="nav-wrapper">
      <label for="type">Activity Type</label>
      <nav>
         <a  id="groupButton" class="smallButton"  @click="groupButton" :class="{activeClass: groupActive} " >Hópþjálfun </a>
        <a  class="smallButton"  @click="singleButton" :class="{activeClass: singleActive} " >  Einkaþjálfun  </a>
      </nav>
    </div>
    <!-- <h1>: {{ this.$route.params.id }}       </h1> -->

    <form
    v-if="groupActive"
      class="form-container"
      @submit.prevent="onSubmitGroup"
    >
      <div class="form-group">
        <label class="label-title" for="title">Titill</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="form-group">
        <label class="label-title" for="about">Lýsing</label>
        <textarea class="about-field" v-model="about"/>
      </div>
      <div class="form-group">
        <label class="label-title" for="category">Flokkur</label>
        
        <div class="share-wrap">
          <div class="main-bar">
                
            <div class="tags">
              <no-ssr> 
                <div class="tag"  v-for="(cat, index) in category" :key="index" >
                  <label>{{cat}}</label>
                </div>
              </no-ssr>
            </div>

            <span><img src="https://static.tumblr.com/43vgkmu/ftqmmywe6/drop-down.png"/></span></div>
             <ul>
              <li v-for="(exercise, index) in selectOptions" :key="index"  >
                  <a  @click="addTags(exercise)">{{ exercise }}</a>
              </li>

            </ul>
            
        </div>
      </div>
      <div class="form-group inhold">
        <label class="label-title" for="inhold">Innihald viðburðs</label>
        <div class="inhold-wrapper">
            <div class="wrap">
              <div  v-for="(contentItem, index) in content" :key="index">
                  <input type="text" name="inhold" v-model="contentItem.value" >
              </div>
            </div>
          <div class="button-wrap">
            <button type="button"  class="btn-add"  @click.prevent="addContent">+</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="label-title" for="location">Staðsetning</label>
        <input  ref="autocomplete"
        placeholder="Search"
        class="search-location"
        onfocus="value = ''"
        type="text">
      </div>
      <div class="form-group">
        <label class="label-title" for="date">Dagsetning</label>
        <div class="date-info-input" >
            
            <div v-for="(item, index) in dateTime" :key="index" >
              <input type="date" name="date" v-model="date" id="dateofbirth">    
              <div class="timeTable" @click="timeClick">
                <span  class="timeClick">SELECT</span>
                  <ul>
                    <li v-for="(exercise, index) in times" :key="index"  >
                        <a  @click="getVal(exercise)">{{ exercise }}</a>
                    </li>
                  </ul>
                </div>
              <label for="hours">Tímalengd</label>
              <input type="text" name="hours"  v-model="timeLength" class="timeLength">
            </div>
            <button class="btn-add" text="+"  @click.prevent="addDates($event)"  >ADD </button>
        </div>
      </div>
      <div class="form-group">
        <label class="label-title" for="level">Level</label>
        <input type="text" name="level" v-model="level">
      </div>
      <div class="form-group inhold">
        <label class="label-title" for="equipment">Áhöld</label>
        <div class="inhold-wrapper">
            <div class="wrap">
              <div  v-for="(equipmentItem, index) in equipment" :key="index">
                  <input type="text" name="inhold" v-model="equipmentItem.value" >
              </div>
            </div>
          <div class="button-wrap">
            <button type="button"  class="btn-add"  @click.prevent="addEquipment">+</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="label-title" for="images">Myndir</label>
        <input
           multiple
           name="eventImages"
           @change="onFileChanged"
           type="file"
           />
      </div>
      <!-- <div class="form-group">
        <label class="label-title" for="video">Video link</label>
        <input type="text" name="video" v-model="videoLink">
      </div> -->
      <div class="form-group">
        <div class="participants-label">
          <label class="label-title" for="participants">Þáttakendur</label>
          <small><br >Viðburði þínum verður aflýst ef lágmarksfjöldi þáttakenda er ekki uppfyllt á þeim tíma </small>
        </div>
        <div class="date-info-input">
          <label for="min">Min</label>
          <input type="text" name="min" v-model="min">
          <label for="max">Max</label>
          <input type="text" name="max"  v-model="max">
        </div>
      </div>
      <div class="form-group">
        <div class="participants-label">
          <label class="label-title" for="price">Verð fyrir alla þjálfun sem fer fram</label>
        </div>
        <div class="price-input-group">
          <input type="text" name="price" v-model="price">
          <label for="max">ISK</label>
        </div>
      </div>
      <div class="form-group form-group-btn">
        <BtnSaveForm
          type="submit"
          style="float: right">Vista og birta
        </BtnSaveForm>
      </div>
    </form>

      <form
        v-if="singleActive"
          class="form-container"
          @submit.prevent="onSubmitSingle"
       >
      <div class="form-group">
        <label class="label-title" for="title">Titill</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="form-group">
        <label class="label-title" for="about">Lýsing</label>
        <textarea class="about-field" v-model="about"/>
      </div>
      <div class="form-group">
           <div class="form-group">
        <label class="label-title" for="category">Flokkur</label>
        
        <div class="share-wrap">
          <div class="main-bar">
                
            <div class="tags">
              <no-ssr> 
                <div class="tag"  v-for="(cat, index) in category" :key="index" >
                  <label>{{cat}}</label>
                </div>
              </no-ssr>
            </div>

            <span><img src="https://static.tumblr.com/43vgkmu/ftqmmywe6/drop-down.png"/></span></div>
             <ul>
              <li v-for="(exercise, index) in selectOptions" :key="index"  >
                  <a  @click="addTags(exercise)">{{ exercise }}</a>
              </li>

            </ul>
            
        </div>
      </div>
      </div>
      <div class="form-group inhold">
        <label class="label-title" for="inhold">Innihald viðburðs</label>
        <div class="inhold-wrapper">
            <div class="wrap">
              <div  v-for="(contentItem, index) in content" :key="index">
                  <input type="text" name="inhold" v-model="contentItem.value" >
              </div>           
            </div>
          <div class="button-wrap"> 
            <button type="button"  class="btn-add"  @click.prevent="addContent">+</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="label-title" >Fjöldi æfinga</label>
        <div class="date-info-input">
          <label for="hours">Fjöldi skipta</label>
          <input class="timepicker"  v-model="time" />
          <label for="hours">Tímalengd</label>
          <input type="text" name="hours"  v-model="timeLength" >
          <SmallButton class="btn-add" text="+"/>
        </div>
      </div>
      <div class="form-group inhold">
        <label class="label-title" for="equipment">Áhöld</label>
        <div class="inhold-wrapper">
            <div class="wrap">
              <div  v-for="(equipmentItem, index) in equipment" :key="index">
                  <input type="text" name="inhold" v-model="equipmentItem.value" >
              </div>           
            </div>
          <div class="button-wrap"> 
            <button type="button"  class="btn-add"  @click.prevent="addEquipment">+</button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="label-title" for="images">Myndir</label>
        <input 
           multiple 
           name="eventImages" 
           @change="onFileChanged"
           type="file"
           />
      </div>
      <div class="form-group">
        <div class="price-input-group">
          <input type="text" name="price" v-model="price">
          <label for="max">ISK</label>
        </div>
        </div>
      <div class="form-group form-group-btn">
        <BtnSaveForm
          type="submit"
          style="float: right">Vista og birta
        </BtnSaveForm>
      </div>
    </form>

  </div>
</template>

<script>
import SmallButton from '@/components/Buttons/SmallButton';
import LargeButton from '@/components/Buttons/LargeButton';
import MediumButton from '@/components/Buttons/MediumButton';
import BtnSaveForm from '@/components/Buttons/BtnSaveForm';

import axios from 'axios';

const objectToFormData = require('object-to-formdata')
// var SquadApi = `${process.env.API_PATH}`
var SquadApi = '/api';

export default {
  asyncData (context) {
    console.log(' this.$route.params.id', context.route.params.id)
    return axios
      .get(`${SquadApi}/api/index/event/edit/?id=${context.route.params.id}`)
      .then(res => {
        return { data: res.data.response }
      })
      .catch(e => {
        console.log(e.response)
        // context.error({ statusCode: 404, message: 'data error admin page' })
      })
  },
  components: {
    BtnSaveForm: BtnSaveForm,
    SmallButton: SmallButton,
    LargeButton: LargeButton,
    MediumButton: MediumButton
  },
  data () {
    return {
      time2: '',
      test: [],
      value: [{ name: 'Javascript', code: 'js' }],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
      times: ['00:00', '00:30', '01:00'],
      selectOptions: [
        'Hjól',
        'Golf',
        'Jóga',
        'Ganga',
        'Hlaup',
        'Fitness',
        'Snjór'
      ],
      groupActive: true,
      singleActive: false,
      title: '',
      about: '',
      tag: '',
      category: [],
      content: [
        {
          value: ''
        }
      ],
      location: '',
      dateTime: [
        {
          date: null,
          time: '',
          timeLength: ''
        }
      ],
      date: null,
      time: '',
      timeLength: '',
      level: '',
      equipment: [
        {
          value: ''
        }
      ],
      images: [],
      // videoLink: "",
      participants: [],
      min: null,
      max: null,
      price: '',
      files: []
    }
  },
  mounted () {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ['geocode'] }
    )
    this.init()
    console.log('dateTime', this.time2)
  },

  methods: {
    getVal (e) {
      return (this.time = e)
      // console.log('getVal', e)
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    resetWindow () {
      this.title = '';
      this.about = '';
      this.location = '';
      this.date = null
      // this.time = '';
      this.timeLength = '';
      this.level = '';
      // this.videoLink = "";
      this.category = []
      this.participants = []
      this.min = null
      this.max = null
      this.price = '';
      this.files = []
    },
    onFileChanged (event) {
      var image = event.target.files
      this.files = [...this.files, ...image]
    },
    onSubmitSingle () {
      var formData = new FormData()
      _.forEach(
        this.files,
        file => {
          formData.append('eventImages', file)
          // console.log("file", file);
        },
        this
      )
      _.forEach(
        this.content,
        test => {
          formData.append('content', test.value)
          // console.log("file", test.value);
        },
        this
      )
      _.forEach(
        this.equipment,
        test => {
          formData.append('equipment', test.value)
          // console.log("file", test.value);
        },
        this
      )

      var activityType = 'single';
      formData.append('activityType', activityType)
      formData.append('title', this.title)
      formData.append('about', this.about)
      formData.append('date', this.date)
      formData.append('time', this.time)
      formData.append('timeLength', this.timeLength)
      formData.append('price', this.price)
      // formData.append("videoLink", this.videoLink);
      formData.append('category', this.category)

      return axios.post('/api/index/event/create', formData).then(() => {
        // console.log("data saved for single event");
      })
    },
    onSubmitGroup () {
      var existingFormData = new FormData()

      _.forEach(
        this.files,
        file => {
          existingFormData.append('eventImages', file)
          // console.log("file", file);
        },
        this
      )
      var contents = []
      _.forEach(
        this.content,
        test => {
          // formData.append('content', test.value)
          contents.push({ ...test })
          // console.log("file", test.value);
        },
        this
      )

      var equipments = []
      _.forEach(
        this.equipment,
        test => {
          equipments.push({ ...test })
        },
        this
      )
      var dateTimeObj = []
      _.forEach(
        this.dateTime,
        test => {
          var obj = {
            time: test.time,
            date: test.date,
            timeLength: test.timeLength
          }
          dateTimeObj.push({ ...obj })

          console.log('file hallo', test)
        },
        this
      )
      // console.log("dateTimeObj", dateTimeObj);
      const object = {
        activityType: 'group',
        title: this.title,
        about: this.about,
        price: this.price,
        equipment: equipments,
        content: contents,
        participants: {
          min: this.min,
          max: this.max
        },
        // videoLink: this.videoLink,
        category: this.category,
        level: this.level,
        timeing: dateTimeObj
        /**
         * key-value mapping
         * values can be primitives or objects
         */
      }

      const options = {
        /**
         * whether or not to include array indices in FormData keys
         * defaults to false
         */
        indices: true
      }

      const formData2 = objectToFormData(
        object,
        options,
        existingFormData
        // existingFormData, // optional
        // keyPrefix // optional
      )

      // console.log(formData)

      return axios.post('/api/index/event/create', formData2).then(() => {
        // console.log("data saved for group event");
      })
    },
    timeClick () {
      //  $('.timeClick').on('click', function() {
      //     $('ul').slideToggle(280)
      //   })
    },
    addTags (val) {
      return this.category.push(val)
    },
    addContent () {
      this.content.push({ value: '' })
    },
    addEquipment () {
      this.equipment.push({ value: '' })
    },
    addDates (e) {
      // console.log("yeo", this.date);
      // console.log("yeo", this.time);
      // console.log("yeo", this.timeLength);

      var newTime = {
        date: this.date,
        time: this.time,
        timeLength: this.timeLength
      }
      this.dateTime.push({ ...newTime })
      this.date = '';
      this.timeLength = '';
      this.time = '';
    },
    groupButton () {
      this.resetWindow()
      this.groupActive = true
      this.singleActive = false
    },
    singleButton () {
      this.resetWindow()
      this.groupActive = false
      this.singleActive = true
    },
    clicking () {
      // $('.timepicker').timepicker({
      //   timeFormat: 'HH:mm',
      //    change: function(time) {
      //      console.log('time',     $('#onselectTarget').text($(this).val()))
      //       $('#onselectTarget').text($(this).val());
      //      var hehe =  $('#onselectTarget').text($(this).val());
      //      var bla = hehe[0].textContent
      //     this.time2 = bla
      //   }
      // })
    },
    init () {
      // $('.main-bar').on('click', function() {
      //   $('ul').slideToggle(280)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

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
  background-position-x: 50px;
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

  .main-bar:hover {
    background: #f9f9f9;
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

  a:hover {
    background: #f4f4f4;
    border-right: 4px solid #ccc;
    transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
  }
}

.form-container {
  width: 100%;
  max-width: 525px;
  margin: 0 auto;
}
.smallButton {
  background: white;
  border-radius: 4px;
  color: #02c39a;
  font-size: 16px;
  padding: 10px 15px;
  height: 100%;
  border: 1px solid #02c39a;
  &:nth-child(1) {
    margin-right: 20px;
  }
}
.activeClass {
  background: #02c39a;
  color: white;
}

.button-wrap {
  display: flex;
  align-items: flex-end;
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

    .nav-button {
      margin-right: 1rem;
      background-color: $mainWhite;
      color: $primaryColor;
      border: 1px solid $primaryColor;
    }
  }
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

.inhold-wrapper {
  display: flex;
  flex-direction: flex-start;
  width: 252px;
  //   display: flex;
  // align-items: initial;
  // justify-content: baseline;
  // width: 100%;
  // align-items: center;
  // justify-content: safe;
  // /* align-content: normal; */
  // /* align-self: normal; */
  // /* margin-left: auto; */
  // padding: 0 80px;

  input {
    width: 223px;
  }
}

.date-info-input {
  display: flex;
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
  display: flex;
  flex-direction: row-reverse;
  border-bottom: none;
}
</style>
