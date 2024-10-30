<script lang="ts">
import LogosVue from '~icons/logos/vue'
import MdiStore24Hour from '~icons/mdi/store-24-hour'
import MdiAlarmOff from '~icons/mdi/alarm-off'
import VSCodePython from 'virtual:icons/vscode-icons/file-type-python'

export default {
  components: {
    LogosVue,
    MdiStore24Hour,
    MdiAlarmOff,
    VSCodePython,
  },
}
</script>

<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <LogosVue style="font-size:2em" />
    <br>
    <p>
      Icons
      <MdiStore24Hour />
      <MdiAlarmOff />
      <VSCodePython />
      from <code>unplugin-icons</code>
    </p>
  </div>
</template>
