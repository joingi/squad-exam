<template >
  <header class="main-header">
    <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
    <div class="header-container container" >
      <div class="header-logo">
        <router-link  to="/"><h1 class="logo">SQUAD</h1></router-link >
      </div>

      <nav class="navigation-items">
          <ul class="nav-list" v-if="this.$store.state.authenticated === null " >
            <li class="nav-item" @click="openSignupTrainer">Verða leiðbeinandi</li>
            <li class="nav-item" @click="openSignup">Nýskráning</li>
            <li class="nav-item" @click="openSignin" >Innskráning</li>
          </ul>

          <ul class="nav-list" style="display:flex; align-items: center;" v-else>
              <li class="nav-item" ><router-link  to="/admin">Mínir Viðburðir</router-link ></li>
              <li class="nav-item"><router-link  to="/skilabod" >Skilaboð</router-link ></li>
              <li class="nav-item"  @click.stop="settings"> 
                  <img class="profile" v-if="checkProfileImage !== null" :src="checkProfileImage">
                  <img v-else class="profile"  src="@/assets/uploads/no-user.png"  alt=""/>
              </li>
          </ul>
    
          <ul v-show="openSettings" class="settings" v-click-outside="closeEvent">
            <li @click="openSettings = false"><router-link to="/profill" >Prófill</router-link ></li>
            <li @click="logout"><router-link  to="/" >Skrá út</router-link ></li>
          </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle'

export default {
  data () {
    return {
      openSettings: false,
      profileImage: this.$store.state.userData.image,
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click']
      }
    }
  },
  components: {
    TheSideNavToggle
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
    },
    settings () {
      this.openSettings = !this.openSettings
    },
    hide () {
      this.openSettings = false
    },
    closeEvent () {
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.router-link-exact-active {
  color: $primaryColor !important;
}
.logo {
  color: white !important;
}

.profile {
  height: 35px;
  width: 35px;
  background: transparent;
  border-radius: 28.5px;
  background-position: center top;
  background-size: cover !important;
}

.header-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.main-header {
  position: relative;
  height: 65px;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $mainFont;
  font-weight: 600;

  .header-logo {
    position: relative;
    // margin: 0 4rem;

    a {
      text-decoration: none;
      color: $mainWhite;
    }

    h1 {
      font-family: $mainFont;
      font-size: 25px;
    }
  }

  nav {
    position: relative;
    // margin: 0 3rem 0 0;
    ul li {
      list-style-type: none;
      display: inline;
      margin-right: 2.3rem;
      font-weight: 600;
      font-size: $fontSize14;
    }
    a {
      text-decoration: none;
      color: $mainWhite;
    }
  }
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;

    li {
      cursor: pointer;
    }
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  color: white;
  margin: 0;
  margin-right: 40px;
  &:nth-child(4) {
    margin-right: 0;
  }
}

.nav-item a {
  text-decoration: none;
  color: white;
}

.settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  right: 0;
  position: absolute;
  z-index: 5;
  background: white;
  margin: 0;
  padding: 15px 25px 20px 25px;
  border-radius: 4px;
  width: 100%;
  max-width: 130px;
  top: 40px;
  border: 1px solid #d8d8d8;
  li {
    margin: 0 !important;
    &:nth-child(1) {
      margin-bottom: 10px !important;
    }
    a {
      color: #393735;
      font-weight: 100;
      font-family: $fontLight;
    }
  }
}

@media (max-width: 768px) {
  .main-header {
    flex-direction: row-reverse;
  }
}
</style>
