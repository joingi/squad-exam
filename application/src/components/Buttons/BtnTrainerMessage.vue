<template>

  <button class="button">
    {{ text }}
  </button>

</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="scss" scoped>
.button {
  background: #02c39a;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  padding: 10px 15px;
  height: 100%;
  //   margin-top: 20px;
}
</style>
