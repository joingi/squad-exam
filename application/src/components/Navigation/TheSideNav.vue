<template>
  <div class="sidenav-container">

    <div
      v-if="show"
      class="sidenav-backdrop"
      @click="$emit('close')"/>

    <transition name="slide-side">
      <div
        v-if="show"
        class="sidenav">
        <span
          class="toggle-close"
          @click="$emit('close')"><i class="fas fa-times"/></span>

          <nav class="navigation-items"  @click="$emit('close')">
            <ul class="nav-list" v-if="this.$store.state.authenticated === null " >
              <li class="nav-item" @click="openSignupTrainer">Verða leiðbeinandi</li>
              <li class="nav-item" @click="openSignup">Nýskráning</li>
              <li class="nav-item" @click="openSignin" >Innskráning</li>
            </ul>

            <ul class="nav-list"  v-else>
                <li class="nav-item" ><router-link to="/profill" >Prófill</router-link ></li>
                <li class="nav-item" ><router-link  to="/admin">Mínir Viðburðir</router-link ></li>
                <li class="nav-item"><router-link  to="/skilabod" >Skilaboð</router-link ></li>
                <li class="nav-item" @click="logout"><router-link  to="/" >Skrá út</router-link ></li>
            </ul>
        </nav>

      </div>
    </transition>

  </div>

</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checkAuth () {
      return this.$store.state.authenticated
    },
    checkProfileImage () {
      return this.$store.state.userData.image
    }
  },
  methods: {
    logout () {
      this.$cookie.delete('token')
      this.$cookie.delete('user_id')
      this.$store.state.authenticated = false
      this.openSettings = false
      return this.$store.commit('RESET')
    },
    openSignup () {
      this.$emit('openSignup')
    },
    openSignin () {
      this.$emit('openSignin')
    },
    openSignupTrainer () {
      this.$emit('openSignupTrainer')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.nav-item {
  color: white;
}

.navigation-items {
  display: flex;
  flex-direction: column;
}
.profile {
  height: 20px;
  width: 20px;
}

.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
}

.sidenav {
  height: 100%;
  width: 200px;
  background-color: black;
  z-index: 10000;
  position: fixed;
  top: 0;
  right: 0;
  box-sizing: border-box;
  padding: 30px;
}

.toggle-close {
  position: absolute;
  margin: 0;
  right: 1rem;
  color: white;

  i {
    font-size: 1.6rem;
  }
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(100%);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 20px 0;
}

.nav-item a {
  text-decoration: none;
  color: $mainWhite;
  font-size: 16px;
}

.nav-item a:hover,
.nav-item a:active {
  color: $primaryColor;
}
</style>
