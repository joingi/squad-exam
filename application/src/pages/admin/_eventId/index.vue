<template>
  <div class="container create-event-container">
    <EditCreateGroup @submit="onSubmitted"  />
  </div>
</template>

<script>
import SmallButton from "@/components/Buttons/SmallButton";
import LargeButton from "@/components/Buttons/LargeButton";
import MediumButton from "@/components/Buttons/MediumButton";
import BtnSaveForm from "@/components/Buttons/BtnSaveForm";

// Components
import EditCreateGroup from "@/components/Form/EditCreateGroup";

import axios from "axios";

const objectToFormData = require("object-to-formdata");

export default {
  components: {
    BtnSaveForm: BtnSaveForm,
    SmallButton: SmallButton,
    LargeButton: LargeButton,
    MediumButton: MediumButton,
    EditCreateGroup
  },
  data() {
    return {
      eventData: []
    };
  },
  // beforeCreate() {
  //   this.setEventData;
  // },
  created() {
    console.log("asd123", this.$route.params.id);
    this.setEventData;
    this.getEventData;
  },
  // computed: {
  //   setEventData () {
  //     var userData = {
  //       eventId: this.$route.params.id,
  //       userToken: this.$cookie.get('token')
  //     }
  //     return this.$store.dispatch('fetchEvent', userData)
  //   },
  //   getEventData () {
  //     return this.$store.getters.editCurrentEvent
  //   }
  // },
  methods: {
    updateValue(event) {
      this.$store.dispatch("updateValue", event.target.updateValue);
    },
    onSubmitted(eventRecord) {
      var userData = {
        eventRecord: eventRecord,
        userToken: this.$cookie.get("token")
      };
      console.log("this.$store.state.authenticated", eventRecord);

      return this.$store.dispatch("editFetchEvent", userData);
    }
  }
};
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
