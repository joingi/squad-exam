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
  background: #02c39a;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  min-width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 14px 0;
  margin-top: 20px;
}
</style>
