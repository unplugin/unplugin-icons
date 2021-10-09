<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <i-logos-vue style="font-size:2em" />
    <br>
    <h2>Icons</h2>
    <p>
      <i-carbon-app-connectivity />
      <i-mdi-account />
      <mdi-alarm-off />
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
    <h2>CSS Icons</h2>
    <p>
      <span class="logos-vue"></span>
      <span class="carbon-app-connectivity"></span>
      <span class="mdi-account"></span>
      <span class="mdi-alarm-off"></span>
      <span class="custom-steering-wheel"></span>
      <span class="custom-car-a"></span>
      <span class="inline-foo"></span>
      <span class="inline-async"></span>
    </p>
    <h2>Collection alias</h2>
    <p>
      <i-park-abnormal />
      <i-icon-park-abnormal />
    </p>
    from <code>unplugin-icons</code>
  </div>
</template>

<script setup lang='ts'>
import MdiStore24Hour from 'virtual:icons/mdi/store-24-hour'
import MdiAlarmOff from 'virtual:icons/mdi/alarm-off'
// do not change to ~icons/logos/vue.css , for testing purposes
import 'virtual:icons/logos/vue.css'
import '~icons/carbon/app-connectivity.css'
import '~icons/mdi/account.css'
import '~icons/mdi/alarm-off.css'
import '~icons/custom/steering-wheel.css'
import '~icons/custom/car-a.css'
import '~icons/inline/foo.css'
import '~icons/inline/async.css'
</script>

<style>
.logos-vue {
  font-size: 2em;
}
</style>
