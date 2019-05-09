<template>
  <div class="full-container ">
    <div class="container">
      <div class="filter-wrapper">
        <div class="form-group" >

          <!-- Admin Path -->
        <div  v-if="this.$route.path === '/admin'" class="filter-container">
          <!-- Training -->
            <!-- /**********/ -->
            <!-- FILTER TRAINING -->
            <div v-click-outside="closeDropdownTraining"  style="width: fit-content;">   
              <div class="cat-wrap"  @click.stop="openTrainingList" >
                <div  class="main-bar" :class="{ selected : chosenTraining.length > 0 } " >
                  <div class="filter">                
                    <label class="ejo"  v-if="chosenTraining.length > 0">{{chosenTraining}}</label >
                    <label  v-else>Þjálfun</label >
                  </div>
                </div>   
              </div>

              <!-- FILTER TRAINING DROPDOWN -->  
              <transition name="fade"> 
                <ul class="dropdown"  v-show="isOpen"  >
                    <li 
                      v-for="(exercise, index) in typeTraining" :key="index"   
                      @mouseover="selectTraining = index" 
                      :class="{'selectedTrain' : isTrainingSelected(index)}"
                      @click="filterTraining(exercise)"
                    >
                    <a >{{ exercise }}</a>
                    </li>
                    <a class="clear" @click="clearTrainingFilter"> Hreinsa</a>
                </ul>
              </transition>     
            </div>
            <!-- /**********/ -->
            <!-- FILTER DATE -->
            <div v-click-outside="closeDropdownDate"  style="width: fit-content;">
            <div class="cat-wrap"  @click.stop="openDateList" >
              <div  class="main-bar" :class="{ selected : chosenDate.length > 0 } " >
                <div class="filter">                
                    <label class="ejo"  v-if="chosenDate.length > 0">{{chosenDate}}</label >
                    <label  v-else>Tímabil</label >
                </div>
              </div>   
            </div>
            <!-- FILTER DATE DROPDOWN -->
            <transition name="fade"> 
              <ul class="dropdown dropdown-date"  v-show="isOpenDate" >
                <li 
                  v-for="(dateItem, index) in typeDate" :key="index"   
                  @mouseover="selectDate = index" 
                  :class="{'selectedTrain' : isDateSelected(index)}"
                  @click="filterDates(dateItem)"
                >
                <a >{{ dateItem }}</a>
                </li>
                <a class="clear" @click="clearDateFilter"> Hreinsa</a>
              </ul>
            </transition>  
            </div>
          <BtnSaveForm

            class="button"
            v-if="checkTrainer === true"
            @click="$router.push('/admin/bua-til-vidburd')">Nýr viðburður</BtnSaveForm>

        </div>

        <!--  Group and single event Path  -->

        <div  v-else class="filter-container">

          <!-- /**********/ -->
              <!-- FILTER LOCATION -->
            <div v-click-outside="closeDropdownTraining" style="width: fit-content;">
              <div class="cat-wrap"  @click.stop="openTrainingList" >
                <div  class="main-bar" :class="{ selected : chosenLocation.length > 0 } " >
                  <div class="filter">                
                    <label class="ejo"  v-if="chosenLocation.length > 0">{{chosenLocation}}</label >
                    <label  v-else>Staðsetning</label >
                  </div>
                </div>   
              </div>
          
              <!-- FILTER TRAINING DROPDOWN -->     
              <transition name="fade">    
                <ul class="dropdown"  v-show="isOpen" >
                    <li 
                      v-for="(exercise, index) in options" :key="index"   
                      @mouseover="selectLocation = index" 
                      :class="{'selectedTrain' : isLocationSelected(index)}"
                      @click="filterLocation(exercise)"
                    >
                    <a >{{ exercise }}</a>
                    </li>
                    <a class="clear" @click="clearLocationFilter"> Hreinsa</a>
                </ul>
              </transition> 
            </div>
            <!-- /**********/ -->
            <!-- FILTER SPORT -->
            <div  v-click-outside="closeDropdownDate" style="width: fit-content;">
              <div class="cat-wrap"  @click.stop="openSportList" >
                <div  class="main-bar" :class="{ selected : chosenSport.length > 0 } " >
                  <div class="filter">                
                      <label class="ejo"  v-if="chosenSport.length > 0">{{chosenSport}}</label >
                      <label  v-else>Sport</label >
                  </div>
                </div>   
              </div>
              <!-- FILTER SPORT DROPDOWN -->
              <transition name="fade"> 
                <ul class="dropdown dropdown-date"  v-show="isOpenDate" >
                  <li 
                    v-for="(dateItem, index) in options2" :key="index"   
                    @mouseover="selectDate = index" 
                    :class="{'selectedTrain' : isSportSelected(index)}"
                    @click="filterSport(dateItem)"
                  >
                  <a >{{ dateItem }}</a>
                  </li>
                  <a class="clear" @click="clearSportFilter"> Hreinsa</a>
                </ul>
              </transition> 
            </div>
            <!-- /**********/ -->

          </div>
  
        </div>
      </div>
    </div>
    <div class="list-page-underline"/>
  </div>
</template>

<script>
import BtnSaveForm from '@/components/Buttons/BtnSaveForm';

export default {
  components: {
    BtnSaveForm
  },
  data () {
    return {
      chosenTraining: '',
      chosenDate: '',
      chosenSport: '',
      chosenLocation: '',
      userAdmin: '',
      isOpen: false,
      isOpenDate: false,
      itemChosen: false,
      isOpenSport: false,
      currentSport: 'Sport',
      options: ['Höfuðborgarsvæðið', 'Akureyri', 'Ísafjörður', 'Egilsstaðir'],
      options2: ['Hjól', 'Golf', 'Jóga', 'Ganga', 'Hlaup', 'Fitness', 'Snjór'],
      typeTraining: ['Hópþjálfun', 'Einkaþjálfun'],
      typeDate: ['Komandi', 'Liðið'],
      selectTraining: null,
      selectLocation: null,
      selectDate: null,
      selectSport: null,
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click']
      }
    }
  },
  computed: {
    checkTrainer () {
      return this.$store.getters.checkTrainer
    }
  },
  created () {
    if (
      this.$route.query.sport !== undefined &&
      this.$route.query.place !== undefined
    ) {
      this.chosenSport = this.$route.query.sport
      this.chosenLocation = this.$route.query.place
      this.filterSport(this.$route.query.place)
      this.filterSport(this.$route.query.sport)
    }
    this.userAdmin = this.$route.path == '/admin';
  },
  methods: {
    // SELECT ITEM IN FILTER
    isTrainingSelected (cardIndex) {
      return this.selectTraining === cardIndex
    },
    isLocationSelected (cardIndex) {
      return this.selectLocation === cardIndex
    },
    isDateSelected (cardIndex) {
      return this.selectDate === cardIndex
    },
    isSportSelected (cardIndex) {
      return this.selectSport === cardIndex
    },
    // CLEAR FITLERS
    clearDateFilter () {
      this.selectDate = null
      this.isOpenDate = false
      this.chosenDate = '';
      this.$store.commit('FILTER_DATE', null)
    },
    clearTrainingFilter () {
      this.selectTraining = null
      this.isOpen = false
      this.chosenTraining = '';
      this.$store.commit('FILTER_TRAINING', null)
    },
    clearLocationFilter () {
      this.selectLocation = null
      this.isOpen = false
      this.chosenLocation = '';
      this.$store.commit('FILTER_PLACE', null)
    },
    clearSportFilter () {
      this.selectSport = null
      this.isOpenDate = false
      this.chosenSport = '';
      this.$store.commit('FILTER_SPORT', null)
    },

    // OPEN FILTERS
    openTrainingList () {
      this.isOpen = !this.isOpen
    },
    openDateList () {
      // console.log("this.isOpenDate", this.isOpenDate);
      this.isOpenDate = !this.isOpenDate
    },
    openSportList () {
      // console.log("this.isOpenDate", this.isOpenDate);
      this.isOpenDate = !this.isOpenDate
    },
    openPlace () {
      this.isOpen = !this.isOpen
    },
    openSport () {
      this.isOpenSport = !this.isOpenSport
    },
    // addBank() {},

    // FILTER TRAINING
    filterTraining (val) {
      this.chosenTraining = val
      this.$store.commit('FILTER_TRAINING', this.chosenTraining)
      this.isOpen = false
    },
    // ***  filter result ** //
    filterLocation (val) {
      this.chosenLocation = val
      this.$store.commit('FILTER_PLACE', this.chosenLocation)
      this.isOpen = false
    },
    filterDates (val) {
      this.chosenDate = val
      this.$store.commit('FILTER_DATE', this.chosenDate)
      this.isOpenDate = false
    },
    filterSport (val) {
      // console.log("test val sport", val);
      this.chosenSport = val
      this.$store.commit('FILTER_SPORT', this.chosenSport)
      this.isOpenDate = false
    },

    hideDateEvent () {
      this.isOpenDate = false
    },
    closeDropdownDate () {
      this.hideDateEvent()
    },
    hideTrainingEvent () {
      this.isOpen = false
    },
    closeDropdownTraining () {
      this.hideTrainingEvent()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.filter-container {
  position: relative;
  display: flex;
  width: 100%;
}

.full-container {
  margin-bottom: 20px !important;
  overflow: visible !important;
}

.filter-wrapper {
  padding: 25px 0 20px 0;
}
.button {
  cursor: pointer;
  margin-left: auto;
}
.form-group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 0;
  select {
    width: auto;
    font-size: 14px;
  }
  select {
    width: auto;
  }

  select:nth-of-type(2) {
    margin-left: 1rem;
  }
}

.main-bar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background: white;
  z-index: 11;
  margin: 10px;
}

.cat-wrap {
  margin: 0;
  position: relative;
  margin-right: 10px;
  width: fit-content;

  cursor: pointer;
  .main-bar {
    cursor: pointer;
    position: relative;
    background: #ffffff;
    border: 1px solid rgba(151, 151, 151, 0.3);
    border-radius: 4px;
    padding: 10px 20px 10px 15px !important;
    font-size: 16px;
    font-weight: 600;
    color: #82c9bd;
    padding: 10px;
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

.dropdown {
  display: flex;
  flex-direction: column;
  align-items: end;
  list-style-type: none;
  width: 100%;
  max-width: 175px;
  margin-top: -1px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 20;
  list-style-type: none !important;
  margin: 0;
  top: 70px;
  padding: 20px 0 10px 0;
  border-radius: 4px;
  transform-origin: top;
  transition: all 0.2s ease-in-out;
  li {
    list-style: none;
    width: 100%;
    padding: 10px 20px;
    text-align: left;
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
    cursor: pointer;
    font-size: 16px;
    font-family: $fontLight;
    font-weight: 100;
    padding: 10px 15px;
  }
}

.dropdown {
  top: 45px;
  bottom: 0;
}
.dropdown-date {
  left: 160px;
  top: 45px;
  bottom: 0;
}

@media screen and (max-width: 600px) {
  .cat-wrap {
    .main-bar {
      min-height: fit-content;
      padding: 10px 15px !important;
    }
  }
  .filter {
    label {
      font-size: 14px;
      padding: 0;
    }
  }
  .dropdown {
    padding: 10px 0px;
    font-size: 14px;
  }
  .dropdown-date {
    left: 120px;
  }
}
</style>
