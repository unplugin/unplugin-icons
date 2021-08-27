<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <logos-vue style="font-size:2em" />
    <br>
    <p>
      Icons
      <MdiStore24Hour />
      <MdiAlarmOff />
      from <code>unplugin-icons</code>
    </p>
  </div>
</template>

<script>
import LogosVue from '~icons/logos/vue.vue'
import MdiStore24Hour from '~icons/mdi/store-24-hour.vue'
import MdiAlarmOff from '~icons/mdi/alarm-off.vue'

export default {
  components: {
    LogosVue,
    MdiStore24Hour,
    MdiAlarmOff,
  },
}
</script>
