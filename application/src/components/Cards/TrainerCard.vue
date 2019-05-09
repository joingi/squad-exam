<template>
  <router-link :to="{name: 'leidbeinendurId', params: {id: personId}}" class="trainer-card">
    <div class="trainer-card-wrap"> 
      <div class="trainer-card-header">

        <img class="trainer-img" v-if="profileImage != null" :src="profileImage" alt="Image of trainer">
        <img class="trainer-img" v-else src="@/assets/images/no-user.png" alt="Image of trainer">

        <h3 class="triner-title"> {{ firstName  + ' ' + lastName}}  </h3>
      </div>
      <div class="trainer-cat">

        <p v-for="(cat, index) in categories" :key="index" > 
          {{ ' ' + cat + ',  '}} 
        </p>
      </div>
      <div class="card-footer">
        <h4 >{{ location }}</h4>
      </div>
      <div class="shadow"></div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'TrainerCard',
  props: {
    personId: {
      type: String,
      require: true
    },
    firstName: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      require: true
    },
    categories: {
      type: Array,
      require: true
    },
    location: {
      type: String,
      require: true
    },
    profileImage: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.trainer-card-wrap{
  background:white;
  height:100%;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shadow {
  max-width: 218px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  margin: 0 auto;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 3px 78px 0 rgba(0, 0, 0, 0.15);
}
.trainer-card {
  min-height: 170px;
  height: 100%;
  max-height: 170px;
  display: flex;
  justify-content: space-between;
  position: relative;
  background: #fff;
  text-decoration: none;
  color: #444;
  border: 1px solid #f4f6f7;
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;
  max-width: 255px;
  background:white;

    transform: translateY(0px);
  &:hover {
    transform: translateY(-6px);
    transition: transform 0.3s ease-in-out;
  }

}

.trainer-card-header {
  display: flex;
  padding: 15px 20px;
  .trainer-img {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    margin-right: 1rem;
  }

  h3 {
    font-size: $fontH3;
    color: $primaryColor;
    margin-top: 0;
    font-weight: $fontSemibold;
  }
}

.trainer-cat {
  padding: 15px;
  display: flex;
  flex-direction: row;

  p {
    font-size: $fontSize16;
    bottom: 0;
    margin: 0;
  }
}

.card-footer {
  padding: 10px 20px;
  background: #f8f8f8;
  bottom: 0;
  width: 100%;
  color: $mainBlack;
  display: flex;
  align-items: center;

  h4 {
    font-size: 16px;
    font-family: $fontSemibold;
    margin: 0;
  }
}
@media screen and (max-width: 900px) {
  .trainer-card-header {
    h3 {
      font-size: 18px;
    }
  }
  .card-footer {
    h4 {
      font-size: 16px;
    }
  }
  .trainer-cat {
    p {
      font-size: 14px;
    }
  }
  .trainer-card-header {
    .trainer-img {
      width: 40px;
      height: 40px;
    }
  }
}

@media screen and (max-width: 825px) {
  .trainer-card {
    max-width: 100%;
  }
}
</style>
