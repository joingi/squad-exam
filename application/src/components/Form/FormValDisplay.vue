<template>
    <div class="save-row-info">
            <span class="danger">Eitthvað fór úrskeiðiðs</span>
            <span class="success">Upplýsingar uppfærðar</span>
          </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.save-row-info {
  display: flex;
  flex-direction: row;
  // justify-content: space-between;

  .danger,
  .success {
    font-size: 16px;
    padding: 10px 15px;
    text-align: center;
    border-radius: 5px;
  }
  .danger {
    color: rgba($color: $dangerColor, $alpha: 0.4);
    border: 1px solid rgba($color: $dangerColor, $alpha: 0.4);
    margin-right: 2rem;
  }
  .success {
    color: rgba($color: $primaryColor, $alpha: 0.4);
    border: 1px solid rgba($color: $primaryColor, $alpha: 0.4);
  }
}
</style>
