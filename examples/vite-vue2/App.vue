<script lang='ts'>
import MdiStore24Hour from 'virtual:icons/mdi/store-24-hour'
import MdiAlarmOff from 'virtual:icons/mdi/alarm-off'
import VSCodePython from 'virtual:icons/vscode-icons/file-type-python'

export default {
  components: {
    MdiStore24Hour,
    MdiAlarmOff,
    VSCodePython,
  },
}
</script>

<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <i-logos-vue style="font-size:2em" />
    <br>
    <p>
      Icons
      <i-carbon-app-connectivity />
      <i-mdi-account class="inject" />
      <MdiAlarmOff />
      <VSCodePython />
      <i-fa-solid-dice-five />
      <i-heroicons-outline-menu-alt-2 />
      <i-ri-apps-2-line />
      <i-mdi-dice-d12 />
      <i-mdi-light-alarm />
      <i-noto-v1-flag-for-flag-japan />
      <i-ic-twotone-24mp />
      <i-mdi:cactus />
      <IIcTwotone23mp />
      <MdiStore24Hour />
      from <code>unplugin-icons</code>
    </p>
  </div>
</template>
