<script lang="ts">
  import SvelteLogo, { snippet as svelteLogoSnippet } from 'virtual:icons/logos/svelte-icon'
  import MdiStore24Hour, { snippet as mdiStore24HourSnippet } from 'virtual:icons/mdi/store-24-hour'
  import MdiAlarmOff, { snippet as mdiAlarmOffSnippet } from 'virtual:icons/mdi/alarm-off'
  import IconParkAbnormal, { snippet as iconParkAbnormalSnippet } from 'virtual:icons/icon-park/abnormal'
  import RawMdiAlarmOff from 'virtual:icons/mdi/alarm-off?raw&width=4.25em&height=4.25em'
  import RawMdiAlarmOff2 from 'virtual:icons/mdi/alarm-off?raw&width=1em&height=1em'
  </script>
  
  <main>
    <SvelteLogo style="font-size:2em" />
    {@render svelteLogoSnippet({
      style: "font-size:2em"
    })}
    
    <br />
    <br />
  
    <MdiStore24Hour />
    {@render mdiStore24HourSnippet()}
  
    <MdiAlarmOff />
    {@render mdiAlarmOffSnippet()}
    
    <IconParkAbnormal />
    {@render iconParkAbnormalSnippet()}
  
    {@html RawMdiAlarmOff}
    {@html RawMdiAlarmOff2}
  </main>
  
  <style>
    main {
      text-align: center;
    }
  </style>
  
  