<template>

  <button
    class="button"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  name: 'BtnSaveForm',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
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
  height: fit-content;
  width: fit-content;
}
@media screen and (max-width: 600px) {
  .button {
    font-size: 14px;
    padding: 10px;
  }
}
</style>
