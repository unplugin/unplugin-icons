<script lang="ts">
  import SvelteLogo from 'virtual:icons/logos/svelte-icon'
  import MdiStore24Hour from 'virtual:icons/mdi/store-24-hour'
  import MdiAlarmOff from 'virtual:icons/mdi/alarm-off'
  import IconParkAbnormal from 'virtual:icons/icon-park/abnormal'
  import RawMdiAlarmOff from 'virtual:icons/mdi/alarm-off?raw&width=4.25rem&height=4.25rem'
  import RawMdiAlarmOff2 from 'virtual:icons/mdi/alarm-off?raw&width=1em&height=1em'
</script>

<main>
  <SvelteLogo style="font-size:2em" />
  <br />
  <br />
  <MdiStore24Hour />
  <MdiAlarmOff />
  <IconParkAbnormal />
  {@html RawMdiAlarmOff}
  {@html RawMdiAlarmOff2}
</main>

<style>
main {
  text-align: center;
}
</style>
