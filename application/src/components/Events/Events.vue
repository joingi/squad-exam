<template>
  <div class="event-container">

    <transition-group name="event" class="event__list"  v-if="dataInfo.length > 0"> 

        <Event
          class="testAnimation"
          v-for="event in dataInfo"
          :objectId="event._id"
          :key="event._id"
          :title="event.title"
          :shortDescription="event.about"
          :participants="event.participants"
          :dateTime="event.dateTime"
          :eventType="event.activityType"    
        />  

    </transition-group>
      <NoEventsModal v-else >
        <div class="inner-container">
          <span >
              Engar niðurstöður fundust
          </span>
        </div>
     </NoEventsModal>

  </div>
</template>

<script>
import Event from '@/components/Events/Event';
import NoEventsModal from '@/components/Modal/NoEventsModal';

export default {
  props: ['dataInfo'],
  components: {
    Event,
    NoEventsModal
  },
  data () {
    return {
      trash: 'rusl',
      edit: 'edit'
    }
  }
}
</script>

<style lang="scss" scoped>
.event-enter-active,
.event-leave-active {
  transition: opacity 0.5s;
}
.event-enter,
.event-leave-to {
  opacity: 0;
}
.event__list {
  position: relative;
  margin-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 5rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding: 0 20px;
  height: 100%;
  transition: all 500ms ease-out;
}

.icons {
  height: 100%;
  padding: 10px;
}
.icon {
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  height: 15px;
  width: 15px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
}
.icons {
  position: relative;
}
.event-container {
  margin-top: 5px;
  min-height: 400px;
  height: 100%;
  transition: all 0.4s;
}
.event {
  position: relative;
  margin-top: 15px;
  height: 75px;
  background: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
}
.info {
  margin-left: 0px;
  display: grid;
  align-items: center;
  height: 100%;
  grid-template-columns: 20% 30% 20% 25% 5%;
  span {
    text-align: center;
  }
}
.color {
  position: absolute;
  background: #f3bdbd;
  border-radius: 4px;
  height: 100%;
  width: 15px;
}

@media screen and (max-width: 700px) {
  .event-container {
    margin-top: 5px !important;
  }

  .event__list {
    padding: 0;
  }
}
@media screen and (max-width: 600px) {
  .event__list {
    padding: 0 20px;
  }
}
</style>
