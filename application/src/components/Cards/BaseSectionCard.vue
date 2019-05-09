<template>
  <div class="cards-container">

    <div class="cards">
      <router-link v-for="(infoCard, index) in sectionCard" :key="index" :to="infoCard.link" >
        <div class="card" :style="{backgroundColor: infoCard.color}" >
          <div class="image" :style="{ backgroundImage: 'url(' + require('@/assets/images/'+infoCard.image+'.png') + ')'}"/>
          <div class="text">
              <p class="card-name">{{ infoCard.name }}</p>
              <div class="overlay"></div>
          </div>

        </div>
      </router-link>
      <img class="skraut"  src="@/assets/images/skraut.png">
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      sectionCard: [
        {
          name: 'Leiðbeinendur',
          image: 'karfa',
          color: '#05668D',
          link: 'leidbeinendur'
        },
        {
          name: 'Hópþjálfun',
          image: 'hlaup',
          color: '#F0F3BD',
          link: 'hopthjalfun'
        },
        {
          name: 'Einkaþjálfun',
          image: 'hjol',
          color: '#F3BDBD',
          link: 'einkathjalfun'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.skraut {
  position: absolute;
  top: 80px;
  z-index: 0;
}
.cards {
  width: 100%;
  display: flex;
  flex-direction: column;

  a {
    width: 100%;
  }
}

.cards-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.text {
  display: flex;
  background: white;
  position: relative;
  max-width: 130px;
  margin-left: auto;
  border-radius: 4;
}

.card {
  display: block;
  overflow: hidden;
  position: relative;
  float: right;
  height: 130px;
  max-width: 245px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
  z-index: 1;

  p {
    z-index: 1;
    color: #393735;
    font-size: 16px;
    margin: 0;
    padding: 20px;
  }
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  mix-blend-mode: luminosity;
  background-position: top;
  background-size: cover;
  border-radius: 4px;
  transition: all 0.3s ease-in-out 0s;
  // &:hover {
  //   transform: scale(1.1);
  // }
}

@media screen and (max-width: 950px) {
  .skraut {
    display: none;
  }
  .cards-container {
    width: 100%;
  }
  .cards {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100% !important;
  }
  .card {
    margin: 0 10px;
  }
}

@media screen and (max-width: 890px) {
  .cards {
    flex-direction: column;
    max-width: 650px;
    margin: 0 auto;
  }
  .card {
    width: 100%;
    max-width: 100%;
    height: 60px;
    margin: 0 0 10px 0;
    .overlay {
      // margin: 0 auto;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.19);
      position: absolute;
      mix-blend-mode: overlay;
    }
    .text {
      background: none;
      max-width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    p {
      z-index: 1;
      color: white;
      font-size: 22px;
      margin: 0;
      padding: 20px;
      text-align: center;
      width: 100%;
      font-weight: 900;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }
  }
}

@media screen and (max-width: 600px) {
  // .cards {
  //   height: 50px;
  // }
  .card {
    height: 50px;
    p {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }
}
</style>
