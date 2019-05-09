<template>
  <div class="payment-form">

        <div
        class="close"
        @click="close"
        :style="{ backgroundImage: 'url(' + require('@/assets/icons/close.svg') + ')'}"
      />
      <form id="payment-form"  @submit.prevent="onSubmit">
        <div class='form-row'>
            <div class='col-xs-12 form-group required'>
            <label class='control-label'>Korthafandi</label>
            <input class='form-control' id="card-name" size='4' type='text'>
            </div>
        </div>
        <div class='form-row'>
            <div class='col-xs-12 form-group required'>
            <label class='control-label'>Korta númer</label>
            <input autocomplete='off' class='form-control card-pan' size='19' type='text' v-model.trim="pan">
            </div>
        </div>
        <div class='form-row'>
            <div class='col-xs-4 form-group required'>
            <label class='control-label'>CVC</label>
            <input autocomplete='off' class='form-control card-cvc' placeholder='XXX' size='4' type='text'  v-model.trim="cvc">
            </div>
            <div class='col-xs-4 form-group required'>
            <label class='control-label'>Expiration</label>
            <input class='form-control card-exp-month' placeholder='MM' size='2' type='text'  v-model.trim="expMonth">
            </div>
            <div class='col-xs-4 form-group required'>
            <label class='control-label'> </label>
            <input class='form-control card-exp-year' placeholder='YYYY' size='2' type='text'  v-model.trim="expYear">
            </div>
        </div>
        <div class='form-row'>
            <div class='col-md-12 form-group'>
              <button class='form-control btn btn-primary submit-button' type='submit'  @click="close">Borga</button>
            </div>
        </div>
        <div class='form-row'>
            <div class='col-md-12 error form-group' style="display: none">
            <div class='alert-danger alert'>
                Please correct the errors and try again.
                <ul class="error-message" style="font-weight: bold"></ul>
            </div>

            </div>
        </div>
        </form>
  </div>
</template>

<script>
import axios from "axios";
var SquadApi = `${process.env.API_PATH}`;
var borgunApiKey = `${process.env.BORGUN_KEY}`;
export default {
  props: ["closeModal"],
  data() {
    return {
      pan: "1234",
      expMonth: "01",
      expYear: "2020",
      cvc: "5105105105105100",
      hasErrors: null
      // borgunKey: borgunApiKey
    };
  },
  head() {
    return {
      script: [
        {
          src:
            "https://test.borgun.is/resources/js/borgunpayment-js/borgunpayment.v1.min.js",
          type: "text/javascript"
        }
      ]
    };
  },

  methods: {
    close() {
      this.$emit("closeModalReset", false);
    },
    onSubmit() {
      BAPIjs.setPublicToken(borgunApiKey);

      if (BAPIjs.isValidCardNumber(this.pan) === false) {
        // $('ul.error-message').append('<li>Invalid card number</li>')
        this.hasErrors = true;
      }
      if (BAPIjs.isValidExpDate(this.expMonth, this.expYear) === false) {
        // $('ul.error-message').append('<li>Invalid expiration date</li>')
        this.hasErrors = true;
      }
      if (BAPIjs.isValidCVC(this.cvc) === false) {
        // $('ul.error-message').append('<li>Invalid cvc number</li>')
        this.hasErrors = true;
      }

      var borgunResponseHandler = (status, data) => {
        // console.log('lala', status)
        // console.log("lala2", this);
        if (status.statusCode === 201) {
          // OK
          // console.log("okok", 201);
          // console.log("okok", this);

          var eventId = this.$route.params.id;
          var personId = this.$store.state.userData._id;

          var fomObject = {
            eventId: eventId,
            personId: personId
          };
          // console.log("asdasdasdasd", fomObject);

          axios
            .post(`${SquadApi}/event/signup`, fomObject)
            .then(response => {
              // console.log("routes", response);
              // this.eventData.push(response.data);
              // return this.$router.push("/admin");
            })
            .catch(err => {
              console.log("err", err);
            });
          //   this.$router.push({ name: "admin" });
          // $("#payment-form").append(
          //     $('<input type="hidden" name="singleToken" />').val(data.Token)
          // );
          // $("#payment-form")
          //     .get(0)
          //     .submit();
        } else if (status.statusCode === 401) {
          // Unauthorized
          console.log("Unauthorized", 401);
          // $("ul.error-message").append(
          //     "<li>Unauthorized received from BorgunPaymentAPI</li>"
          // );
          // $("div.error").show();
        } else if (status.statusCode) {
          console.log("error", 401);
          // $("ul.error-message").append(
          //     "<li>Error received from server " +
          //     status.statusCode +
          //     " - " +
          //     status.message +
          //     ".</li>"
          // );
          // $("div.error").show();
        } else {
          console.log("error", 401);
          // $("ul.error-message").append(
          //     "<li>Unable to connect to server " + status.message + ".</li>"
          // );
          // $("div.error").show();
        }
        // Enable Pay button again.
        // $(".submit-button").prop("disabled", false);
      };

      BAPIjs.getToken(
        {
          pan: "4242424242424242",
          expYear: "26",
          expMonth: "01"
        },
        borgunResponseHandler
      );
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.payment-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transition: 0.5s;
  width: 100%;
  max-width: 390px;
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: left;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  z-index: 10;
  padding-top: 25px;
}
.control-label {
  padding: 10px 0;
}

.control-label {
  color: $mainBlack;
}
.submit-button {
  background: #02c39a;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-family: $mainFont;
  margin-top: 10px;
}
.form-group {
  input {
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    padding: 10px 0 10px 10px;
  }
}
.close {
  position: absolute;
  z-index: 10;
  width: 20px;
  top: 10px;
  left: 10px;
  height: 14px;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}
</style>
