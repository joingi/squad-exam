<template>
  <div>
      <div v-for="(user, index ) in userList" :key="index">
        <router-link :to="{name: 'skilabodId', params: {id: user._id}}"  v-if="user._id !== checkLoggedinUser" >
            <div class="msgBox">
                <div class="inner">
                    <div class="image">
                        <img class="profile-img" v-if="user.image != null" :src="user.image" >
                        <img class="profile-img" v-else src="@/assets/images/no-user.png" >
                    </div>
                    <span class="name">{{user.firstName + ' ' + user.lastName}}</span>
                </div> 
            </div>
        </router-link>
     </div>
  </div>
</template>

<script>
export default {
  props: ['userList'],

  data () {
    return {
      checkLoggedinUser: this.$store.state.userData._id
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.router-link-exact-active{
  .msgBox {
    background: #F8F8F8;
  }
}
.msgBox {
  border-bottom: 1px solid rgba(1, 13, 23, 0.1);
}
.inner {
  padding: 20px;
  display: flex;
}
.name {
  font-family: $mainFont;
  font-size: 16px;
  font-weight: 600;
  color: #393735;
  padding-left: 10px;
}
.profile-img {
  width: 38px;
  height: 38px;
  border-radius: 100%;
}
</style>
