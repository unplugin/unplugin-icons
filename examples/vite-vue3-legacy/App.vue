<script setup lang='ts'>
import MdiStore24Hour from 'virtual:icons/mdi/store-24-hour'
import MdiAlarmOff from 'virtual:icons/mdi/alarm-off'
import VSCodePython from 'virtual:icons/vscode-icons/file-type-python'
</script>

<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <i-logos-vue style="font-size:2em" />
    <br>
    <h2>Icons</h2>
    <p>
      <i-carbon-app-connectivity />
      <i-mdi-account />
      <MdiAlarmOff />
      <VSCodePython />
      <i-fa-solid-dice-five />
      <i-heroicons-outline-menu-alt-2 />
      <i-ri-apps-2-line />
      <i-mdi-dice-d12 />
      <i-mdi-light-alarm />
      <i-noto-v1-flag-for-flag-japan />
      <i-ic-twotone-24mp />
      <i-codicon:diff-ignored />
      <i-twemoji-1st-place-medal />
      <IIcTwotone23mp />
      <MdiStore24Hour />
      <MdiAlarmOff />
      <br>
    </p>
    <h2>Custom Icons</h2>
    <p>
      <i-custom-steering-wheel style="color:rgb(32, 115, 129)" />
      <i-custom-car-a />
      <i-inline-foo />
      <i-inline-async />
    </p>
    <h2>Collection alias</h2>
    <p>
      <i-park-abnormal />
      <i-icon-park-abnormal />
    </p>
    from <code>unplugin-icons</code>
  </div>
</template>
