<template>
  
  <a class="button">
    {{ text }}
  </a>

</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="scss" scoped>
.button {
  // font-family: $fontBold;
  background: #02c39a;
  border-radius: 4px;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  height: 100%;
  //   margin-top: 20px;
}
</style>
