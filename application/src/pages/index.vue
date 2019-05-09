<template>
  <div >
    <BaseBanner/>
    <div class="container">
    <div class="about-section">
      <section>
        <span>
          Squadið þitt
        </span>
        <p>
          Þarftu að auka úthald, bæta sveifluna eða bara komast í góðan félagskap. Squad.is hjálpa þér af stað.
        </p>
      </section>
      <BaseSectionCard />
    </div>
    <PopularFeed />
    </div>
  </div>
</template>

<script>
import BaseBanner from '@/components/Banner/BaseBanner'
import BaseSectionCard from '@/components/Cards/BaseSectionCard'
import PopularFeed from '@/components/PopularFeed'

export default {
  components: {
    BaseBanner: BaseBanner,
    BaseSectionCard: BaseSectionCard,
    PopularFeed: PopularFeed
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.about-section {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 120px;
  margin-bottom: 80px;
  max-width: 917px;
  padding: 0;
}
.cards-container {
  width: calc(100% / 2);
}
section {
  width: 100%;
  text-align: center;
  max-width: 525px;
  // padding: 60px 38px 0 38px;
  padding: 60px 80px 0 0px;
  span {
    font-family: $fontBold;
    color: $mainBlack;
    text-transform: uppercase;
    font-size: 45px;
    font-weight: bold;
  }
  p {
    font-family: $mainFont;
    color: #010d17;
    font-size: 22px;
    line-height: 1.5;
    margin-top: 15px;
  }
}

@media screen and (max-width: 950px) {
  .about-section {
    flex-direction: column;
    padding: 0 20px;
    margin-top: 50px;
  }
  section {
    max-width: 100%;
    padding: 60px 38px 60px 38px;
    font-size: 45px;
    span {
      font-size: 45px;
    }
    p {
      //24
      font-size: 22px;
      // padding: 0 40px;
      max-width: 700px;
      margin: 0 auto;
      margin-top: 15px;
      margin-bottom: 10px;
    }
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
}

@media screen and (max-width: 700px) {
  .about-section {
    flex-direction: column;
    padding: 0 20px;
    margin-top: 50px;
  }
  section {
    max-width: 100%;
    padding: 40px 0;
    font-size: 45px;
    span {
      font-size: 40px;
    }
    p {
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 500px) {
  .about-section {
    padding: 0;
  }
  section {
    padding-bottom: 60px;
    span {
      font-size: 35px;
    }
    p {
      font-size: 16px;
    }
  }
}
</style>
