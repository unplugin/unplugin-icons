<script setup lang="ts">
import LogoNuxt from '~icons/logos/nuxt-icon'
import MdiStore24Hour from '~icons/mdi/store-24-hour'
import MdiAlarmOff from '~icons/mdi/alarm-off'
</script>

<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <LogoNuxt style="font-size:2em" />
    <br>
    <p>
      Icons
      <MdiStore24Hour />
      <MdiAlarmOff />
      from <code>unplugin-icons</code>
    </p>
    <h1>Auto import Components</h1>
    <Circle />
    <LayoutFooter />
  </div>
</template>
