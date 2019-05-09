<template>
  <div class="container">
    <!-- Group form -->
    <CreateGroup @submit="onSubmitted"/>
  </div>
</template>

<script>
// Components
import SmallButton from '@/components/Buttons/SmallButton';
import BtnSaveForm from '@/components/Buttons/BtnSaveForm';
import CreateGroup from '@/components/Form/CreateGroup';

import axios from 'axios';
var SquadApi = `${process.env.API_PATH}`

export default {
  components: {
    CreateGroup: CreateGroup,
    BtnSaveForm: BtnSaveForm,
    SmallButton: SmallButton
  },
  methods: {
    onSubmitted (eventRecord) {
      if (eventRecord !== null) {
        var userToken = this.$cookie.get('token')

        return axios({
          method: 'post',
          url: `${SquadApi}/admin/event`,
          data: eventRecord,
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
          .then(data => {
            return this.$router.push('/admin')
          })
          .catch(e => console.log('ERORRR', e))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
.form-container {
  width: 100%;
  max-width: 525px;
  margin: 0 auto;
}
</style>
