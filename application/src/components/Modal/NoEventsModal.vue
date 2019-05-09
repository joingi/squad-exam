<template>
  <div class="container">
    <slot>

    </slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.container {
  display: flex;
  margin-top: 30px;
  .inner-container{
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    padding: 20px 0;
    width: 100%;
  }
  span {
    display: flex;
    justify-content: center;
    font-family: $fontSemibold;
    font-size: 22px;
    color: #d8d8d8;
    text-align: center;
  }
}
</style>
