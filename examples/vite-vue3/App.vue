<script setup lang="ts">
import MdiStore24Hour from 'virtual:icons/mdi/store-24-hour'
import MdiAlarmOff from 'virtual:icons/mdi/alarm-off?width=4em&height=4em'
import MdiAlarmOff2 from 'virtual:icons/mdi/alarm-off?width=1em&height=1em'
import RawMdiAlarmOff from 'virtual:icons/mdi/alarm-off?raw&width=4em&height=4em'
import RawMdiAlarmOff2 from 'virtual:icons/mdi/alarm-off?raw&width=1em&height=1em'
import RawMdiAlarmOff3 from 'virtual:icons/mdi/alarm-off?raw&width=unset&height=unset'
</script>

<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <i-logos-vue style="font-size: 2em" />
    <br>
    <h2>Icons</h2>
    <p>
      <i-mdi-account />
      <i-fa-solid-dice-five />
      <i-heroicons-outline-menu-alt-2 />
      <i-ri-apps-2-line />
      <i-mdi-dice-d12 />
      <i-mdi-light-alarm />
      <i-noto-v1-flag-for-flag-japan />
      <i-ic-twotone-24mp />
      <i-mdi:cactus />
      <i-twemoji-1st-place-medal />
      <IIcTwotone23mp />
      <MdiStore24Hour />
      <br>
    </p>
    <h2>Customizer via Config</h2>
    <p>
      <i-carbon-app-connectivity />
      <i-custom-car-a />
    </p>
    <h2>Custom Props via Query</h2>
    <p>
      <MdiAlarmOff />
      <MdiAlarmOff2 />
    </p>
    <h2>Custom Icons</h2>
    <p>
      <i-custom-steering-wheel style="color: rgb(32, 115, 129)" />
      <i-inline-foo />
      <i-inline-async />
      <i-custom-car-a />
    </p>
    <h2>Collection alias</h2>
    <p>
      <i-park-abnormal />
      <i-icon-park-abnormal />
    </p>
    <h2>
      Raw Icons from
      <strong>raw</strong> query param
    </h2>
    <div
      style="
        display: grid;
        grid-template-columns: 100px 1fr;
        align-items: center;
      "
    >
      <span v-html="RawMdiAlarmOff" />
      <div>
        <code style="opacity: 0.5">import RawMdiAlarmOff from
          'virtual:icons/mdi/alarm-off?raw&width=4em&height=4em'</code>
        <pre>{{ RawMdiAlarmOff }}</pre>
      </div>
      <span v-html="RawMdiAlarmOff2" />
      <div>
        <code style="opacity: 0.5">import RawMdiAlarmOff2 from
          'virtual:icons/mdi/alarm-off?raw&width=1em&height=1em'</code>
        <pre>{{ RawMdiAlarmOff2 }}</pre>
      </div>
      <span v-html="RawMdiAlarmOff3" />
      <div>
        <code style="opacity: 0.5">import RawMdiAlarmOff3 from
          'virtual:icons/mdi/alarm-off?raw&width=unset&height=unset'</code>
        <pre>{{ RawMdiAlarmOff3 }}</pre>
      </div>
    </div>
    <br>
  </div>
</template>

<style scoped>
pre {
  overflow-x: auto;
}
</style>
