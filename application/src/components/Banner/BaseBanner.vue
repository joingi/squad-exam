<template>
  <div class="banner-container">

    <div class="section">
      <div class="banner-section">
        <h1>Finndu leiðbeinanda sem kemur þér af stað</h1>
        <div class="form-container" >
          <div class="form-group">
              <!-- FILTER Location -->
            <label>Staðsetning</label>
            <div v-click-outside="closeDropdownLocation" style="width: fit-content;">
              <div class="cat-wrap"  @click.stop="openLocationList" >           
                <div  class="main-bar" :class="{ selected : chosenLocation.length > 0 } " >
                  <div class="filter">                
                      <label class="ejo"  v-if="chosenLocation.length > 0">{{chosenLocation}}</label >
                      <label  v-else>{{cityOptions[0]}}</label >
                  </div>
                </div>   
              </div>
              <!-- FILTER Location DROPDOWN -->
              <transition name="fade"> 
                <ul class="dropdown dropdown-date"  v-show="dropwDown"  >
                  <li 
                    v-for="(dateItem, index) in cityOptions" :key="index"   
                    @mouseover="selectDate = index" 
                    :class="{'selectedTrain' : isLocationSelected(index)}"
                    @click="filterLocation(dateItem)"
                  >
                  <a >{{ dateItem }}</a>
                  </li>
                </ul>
              </transition> 
            </div>
            <!-- /**********/ -->
          </div>
          <div class="form-group" >
            <!-- FILTER SPORT -->
            <label>Sport</label>
            <div v-click-outside="closeDropdownSport" style="width: fit-content;">
            <div class="cat-wrap"  @click.stop="openSportList" >           
              <div  class="main-bar" :class="{ selected : chosenSport.length > 0 } " >
                <div class="filter">                
                    <label class="ejo"  v-if="chosenSport.length > 0">{{chosenSport}}</label >
                    <label  v-else>dosa</label >
                </div>
              </div>   
            </div>
            <!-- FILTER SPORT DROPDOWN -->
            <transition name="fade"> 
              <ul class="dropdown dropdown-date"  v-show="dropwDownSport"  >
                <li 
                  v-for="(dateItem, index) in exerciseOptions" :key="index"   
                  @mouseover="selectDate = index" 
                  :class="{'selectedTrain' : isSportSelected(index)}"
                  @click="filterSport(dateItem)"
                >
                <a >{{ dateItem }}</a>
                </li>
              </ul>
            </transition> 
            </div>
            <!-- /**********/ -->
          </div>
          <div class="button" @click="search">
            <a  >Leit</a>
          </div>
        </div>

      </div>

      <div class="banner-image">
        <div class="image"></div>
          <div class="line-container">
            <div class="line"></div> 
            <div class="back"></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      labelOptions1: 'Sport',
      labelOptions2: 'Staðsetning',
      selectLocation: null,
      dropwDown: false,
      chosenLocation: '',
      selectSport: null,
      dropwDownSport: false,
      chosenSport: '',
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
      ]
    }
  },
  created () {
    this.chosenLocation = this.cityOptions[0]
    this.chosenSport = this.exerciseOptions[0]
  },
  methods: {
    search () {
      this.$router.push({
        path: 'leidbeinendur',
        query: { place: this.chosenLocation, sport: this.chosenSport }
      })
    },
    // Location filtering
    isLocationSelected (cardIndex) {
      return this.selectLocation === cardIndex
    },
    filterLocation (val) {
      this.chosenLocation = val
      this.dropwDown = false
    },
    openLocationList () {
      this.dropwDown = !this.dropwDown
    },
    hideDateEvent () {
      this.dropwDown = false
    },
    closeDropdownLocation () {
      this.hideDateEvent()
    },
    // Sport filtering
    isSportSelected (cardIndex) {
      return this.selectSport === cardIndex
    },
    filterSport (val) {
      this.chosenSport = val
      this.dropwDownSport = false
    },
    openSportList () {
      this.dropwDownSport = !this.dropwDownSport
    },
    hideSportEvent () {
      this.dropwDownSport = false
    },
    closeDropdownSport () {
      this.hideSportEvent()
    }
  }
}
</script>

<style  lang="scss" scoped>
@import "@/assets/scss/main.scss";

.dropdown {
  min-height: fit-content;
  bottom: 0;
  left: 0;
  top: 70px;
}
.cat-wrap {
  margin: 0;
  .selected label {
    color: $mainBlack;
  }
}
.skraut {
  transform: rotate(-4deg) skew(-4deg, 0deg) scale(9, 1);
  position: absolute;
  top: 145px;
  z-index: 2;
}

h1 {
  font-family: $fontBold;
  font-size: 35px;
  margin: 0;
  margin-bottom: 30px;
  text-align: left;
  color: $mainBlack;
}
.back {
  width: 100%;
  height: 100%;
  position: absolute;
  background: white;
  display: block;
  height: 60px;
  z-index: 0;
  top: 0;
  left: 0;
  z-index: 0;
  height: 300px;
  top: 13px;
  transform: rotate(-5deg) skew(0deg, 0deg) scale(5, 1);
}

.custom-click {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.section {
  display: flex;
  flex-direction: row;
  height: 570px;
  position: relative;
}

.image {
  background-image: url("../../assets/images/banner-img2.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  background-position: center;
}
.banner-section {
  padding: 100px 38px 0 38px;
  max-width: 560px;
  margin-left: auto;
  h1 {
    font-family: $mainFont !important;
  }
}

.banner-container {
  position: relative;
  padding: 0 !important;
}
.form-group {
  position: relative;
  margin-bottom: 30px;
  select {
    color: #484848;
    max-width: 235px;
  }
  label {
    text-align: left;
  }
}

.line-container {
  height: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  bottom: 23px;
  .line {
    position: relative;
    height: 45px;
    z-index: 2;
    background-image: linear-gradient(-180deg, #05e3ca 0%, #02c39a 100%);
    -webkit-transform: rotate(-5deg) skew(-4deg, 0deg) scale(3, 1);
    transform: rotate(-5deg) skew(-4deg, 0deg) scale(3, 1);
  }
}

.banner-section {
  width: calc(100% / 2 + 100px);
  // transition: all 0.3s ease-in-out;
}

.banner-image {
  width: calc(100% / 2 - 100px);
  overflow: hidden;
  // transition: all 0.5s ease-in-out;
}

@media screen and (max-width: 850px) {
  .banner-image {
    // width: calc(100% / 2 - 200px);
    // transition: all 0.3s ease-in-out;
  }
  .banner-container {
    h1 {
      font-size: 30px;
    }
    .banner-section {
      // width: calc(100% / 2 + 200px);
      // transition: all 0.3s ease-in-out;
    }
    .form-group {
      label {
        font-size: 16px;
      }
    }
  }
}

@media screen and (max-width: 650px) {
  .dropdown {
    transform: translate(-50%, 0);
    left: 50%;
    right: 50%;
  }

  .back {
    display: none;
  }
  .banner-container {
    .line-container {
      bottom: 24px;
      .line {
        transform: rotate(-3deg) skew(-4deg, 0deg) scale(2, 1);
      }
    }
    .form-container {
      padding: 10px 20px;
      width: 100%;
    }
    .button {
      max-width: 250px;
      width: 100%;
      text-align: center;
      margin: 0 auto;
    }
    .banner-image {
      width: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
    .section {
      height: 540px;
      margin: 0;
    }
    .banner-section {
      padding: 50px 10px 60px 10px;
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      position: absolute;
      background: rgba(0, 0, 0, 0.6);
      height: 100%;
      min-width: 100%;
      h1 {
        font-family: "Proxima";
        font-size: 32px;
        text-align: center;
        margin: 0;
        padding: 0 60px;
        line-height: 1.3;
        margin-bottom: 30px;
        color: white;
      }
    }
    .form {
      width: 100%;
    }
    .form-group {
      align-items: center;
      &:nth-child(2) {
        margin-bottom: 50px;
      }
      select {
        max-width: 335px;
        width: 100%;
        margin: 0 auto;
      }
      .filter {
        label {
          color: $mainBlack;
        }
      }
      label {
        text-align: left;
        width: 100%;
        max-width: 335px;
        width: 100%;
        margin: 0 auto;
        font-family: $fontBold;
        color: white;
      }
    }
  }
}

#banner {
  min-height: 100px;
}

.center {
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center {
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button {
  background: #02c39a;
  color: white;
  border-radius: 4px;
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 35px;
  max-width: 70px;
  text-decoration: none;
  cursor:pointer;
  a {
    color: #ffffff;
    text-decoration: none;
  }
}

/** Custom Select **/
.custom-select-wrapper {
  position: relative;
  display: inline-block;
  user-select: none;
}
.custom-select-wrapper select {
  display: none;
}
.custom-select {
  position: relative;
  display: inline-block;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 0.3);
  border-radius: 4px;
  padding: 10px;
  width: 235px;
}
.custom-select-trigger:after {
  position: absolute;
  display: block;
  content: "";
  width: 10px;
  height: 10px;
  top: 50%;
  right: 25px;
  margin-top: -3px;
  border-bottom: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  transform: rotate(45deg) translateY(-50%);
  transition: all 0.4s ease-in-out;
  transform-origin: 50% 0;
}
.custom-select.opened .custom-select-trigger:after {
  margin-top: 3px;
  transform: rotate(-135deg) translateY(-50%);
}
.custom-options {
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  right: 0;
  min-width: 100%;
  margin: 15px 0;
  border: 1px solid #b5b5b5;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.07);
  background: #fff;
  transition: all 0.4s ease-in-out;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-15px);
}
.custom-select.opened .custom-options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
  transform: translateY(0);
}
.custom-options:before {
  position: absolute;
  display: block;
  content: "";
  bottom: 100%;
  right: 25px;
  width: 7px;
  height: 7px;
  margin-bottom: -4px;
  border-top: 1px solid #b5b5b5;
  border-left: 1px solid #b5b5b5;
  background: #fff;
  transform: rotate(45deg);
  transition: all 0.4s ease-in-out;
}
.option-hover:before {
  background: #f9f9f9;
}
.custom-option {
  position: relative;
  display: block;
  padding: 0 22px;
  border-bottom: 1px solid #b5b5b5;
  font-size: 18px;
  font-weight: 600;
  color: #b5b5b5;
  line-height: 47px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}
.custom-option:first-of-type {
  border-radius: 4px 4px 0 0;
}
.custom-option:last-of-type {
  border-bottom: 0;
  border-radius: 0 0 4px 4px;
}
.custom-option:hover,
.custom-option.selection {
  background: #f9f9f9;
}

@media screen and (max-width: 500px) {
  .banner-container .banner-section h1 {
    font-size: 24px;
    padding: 0 40px;
  }
  .banner-container {
    .line-container {
      bottom: 20px;
      .line {
        height: 35px;
      }
    }
  }
}
@media screen and (max-width: 432px) {
  .banner-container .banner-section h1 {
    padding: 0;
  }
}
// dropdown
</style>
