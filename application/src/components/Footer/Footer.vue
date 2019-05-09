<template>
<footer class="full-container">
  <div class=" footer-container">
    <div class="container footer">

      <div class="logo">
        <span>squad</span>
        <p>Finndu Squadið þitt</p>
      </div>

      <div class="info">
        <div class="about">

          <ul>
            <li>Um squad</li>
            <li>Um Okkur</li>
            <li>Hafa Samband</li>
            <li>Skilmálar</li>
          </ul>
        </div>
        <div class="squad">

          <ul>
            <li>squadið</li>
            <li>Einkaþjálfun</li>
            <li>Hópþjálfun</li>
            <li>Leiðbeinendur</li>
          </ul>
        </div>
      </div>
    </div>
    <span class="rettur">© SQUAD {{ new Date().getFullYear() }}</span>
  </div>
</footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.footer-container {
  margin-top: 5rem;
  padding: 50px 0 20px 0;
  color: #d8d8d8;
  background: #000000;
}
.rettur {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.footer {
  display: flex;
  flex-direction: row;
  background-color: black;
}
.logo,
.info {
  width: calc(100% / 2);
}
.logo {
  padding: 20px 0;
  span {
    font-size: 30px;
    text-transform: uppercase;
    padding-bottom: 15px;
  }
  p {
    font-size: 22px;
    margin: 0;
  }
}

.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
ul {
  list-style-type: none;
  text-decoration: none;
}

.about,
.squad {
  ul {
    padding-left: 60px;
  }
  li {
    &:nth-child(1) {
      text-transform: uppercase;
      font-family: $fontSemibold;
      font-size: 18px;
      padding-bottom: 10px;
    }
    &:not(:first-child) {
      padding-bottom: 5px;
      font-size: 16px;
      font-family: $mainFont;
    }
  }
}

@media screen and (max-width: 720px) {
  .full-container {
    padding: 40px 0 node0px 0;
  }
  .logo {
    margin-bottom: 10px;
    font-family: $fontBold;
    p {
      margin-top: 5px;
    }
  }
  .footer {
    flex-direction: column;
    align-items: center;
  }
  .logo {
    text-align: center;
    width: 100%;
  }
  .info {
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
  }
  .about ul {
    padding: 0;
    padding-right: 20px;
    text-align: center;
  }

  .squad ul {
    padding: 0;
    padding-left: 20px;
    text-align: center;
  }
}
</style>
