<template>
    <div class="activity-type-btn-wrapper">

        <div
        id="on"
        class="smallButton"
        @click="changed(true)"
        :class="{active: value}">
        Hópþjalfun</div>

        <div
        id="off"
        class="smallButton"
        @click="changed(false)"
        :class="{active: !value}">
        Einkaþjálfun</div>
    </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    changed (isOn) {
      // console.log("asdasdas", isOn);
      this.$emit('input', isOn)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.activity-type-btn-wrapper {
  display: flex;
}

#on,
#off {
  //   width: 120px;
  //   height: 40px;
  //   background-color: lightgray;
  //   padding: 2px;
  //   display: inline-block;
  //   margin: 10px -2px;
  //   box-sizing: content-box;
  //   cursor: pointer;
  //   text-align: center;
}

#off:hover,
#off:active,
#on:hover,
#on:active {
  background-color: #02c39a;
  color: white;
}
#off:hover,
#off:active {
  background-color: #02c39a;
  color: white;
}

.smallButton {
  background: white;
  border-radius: 4px;
  color: #02c39a;
  font-size: 16px;
  padding: 10px 15px;
  height: 100%;
  border: 1px solid #02c39a;
  &:nth-child(1) {
    margin-right: 20px;
  }
}

#groupActive {
  .smallButton.active {
    background: #02c39a;
    color: white;
  }
}
</style>
