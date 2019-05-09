<template id="modal">
    <div class="modal">
        <div class="modal-window">
        <p>Ertu viss að þú viljir aflýsa viðburði?</p>
        <div class="actions">
            <button class="cancel" @click="onCancel">Nei</button>
            <button class="confirm" @click="onConfirm">Já</button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['open', 'user'],
  methods: {
    onConfirm () {
      this.$emit('confirm')
    },
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style <style lang="scss" scoped>
// .modal {
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   //   background: rgba(0, 0, 0, 0.5);
// }

.modal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transition: 0.5s;
  width: 100%;
  max-width: 390px;
  transform: translate(-50%, -50%);
  padding: 1em;
  color: black;
  text-align: center;
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  z-index: 1;
}

.modal-window .actions {
  display: flex;
  justify-content: flex-end;
}

.actions button {
  font-size: inherit;
  margin: 4px;
  border: none;
  padding: 6px 8px;
  cursor: pointer;
}

.actions .cancel {
  background: #ec1f1f;
  color: white;
  border-radius: 4px;
}

.actions .confirm {
  background: #02c39a;
  color: white;
  border-radius: 4px;
}

// .appear-enter {
//   opacity: 0;
// }

// .appear-enter .modal-window {
//   transform: translate(-75%, -50%);
// }

// .appear-enter-active {
//   transition: 0.5s;
// }

// .appear-leave-active .modal-window {
//   transform: translate(0, -50%);
// }

// .appear-leave-active {
//   opacity: 0;
//   transition: 0.5s;
// }
</style>
