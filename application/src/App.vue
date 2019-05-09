<template>
  <div id="app ">
    <div class="full-container"> 
      <Header
      @sidenavToggle="displaysideNav = !displaysideNav"

      @openSignup="showSignupModal = true"
      @openSignin="showSigninModal = true"
      @openSignupTrainer="showSignupTrainerModal = true"

    />
    <TheSideNav
      @openSignup="showSignupModal = true"
      @openSignin="showSigninModal = true"
      @openSignupTrainer="showSignupTrainerModal = true"
      :show="displaysideNav"
      @close="displaysideNav = false" />

    <ModalSignupForm
      :show="showSignupModal"
      @close="showSignupModal = false"
      @switching="showSigninModal = true"
    />

    <ModalSigninForm
      :show="showSigninModal"
      @close="showSigninModal = false"
      @switching="showSignupModal = true"
    />

    <ModalSignupTrainerForm
      :show="showSignupTrainerModal"
      @close="showSignupTrainerModal = false"
    />
    <transition name="slide" mode="out-in">
      <router-view/>    
    </transition>

    <Footer />
</div>
</div>
</template>

<script>
import Header from '@/components/Navigation/TheHeader';
import TheSideNav from '@/components/Navigation/TheSideNav';
import Footer from '@/components/Footer/Footer';

import ModalSignupForm from '@/components/Modal/ModalSignupForm';
import ModalSigninForm from '@/components/Modal/ModalSigninForm';
import ModalSignupTrainerForm from '@/components/Modal/ModalSignupTrainerForm';

export default {
  name: 'App',
  components: {
    Header,
    TheSideNav,
    Footer,
    ModalSignupForm,
    ModalSigninForm,
    ModalSignupTrainerForm
  },
  data () {
    return {
      displaysideNav: false,
      showSignupTrainerModal: false,
      showSignupModal: false,
      showSigninModal: false
    }
  },
  beforeCreate: function () {
    var userToken = this.$cookie.get('token')
    this.$store.dispatch('serverInit', userToken)
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";

.slide-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
  // animation: slide-out 1s ease-out forwards;
}

.slide-leave {
  transition: opacity 0.3s ease-out;
  opacity: 1;
  // transform: translateX(0);
}
.slide-enter {
  transition: opacity 0.3s ease-out;
  opacity: 0;
  // animation: slide-in 1s ease-out forwards;
}

.slide-enter-active {
  transition: opacity 0.3s ease-out;
  opacity: 1;
  animation: slide-in 1s ease-out forwards;
}

@keyframes slide-out {
  0% {
    // transform: translateY(0);
  }
  100% {
    // transform: translateY(-30px);
  }
}

@keyframes slide-in {
  0% {
    // transform: translateY(-30px);
  }
  100% {
    // transform: translateY(0);
  }
}
</style>
