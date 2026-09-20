<script setup lang="ts">
import MdiStore24Hour from 'virtual:icons/fa6-regular/comments'
import FA6Comments from 'virtual:icons/fa6-regular/comments?height=2.25rem'
import RawFA6Comments from 'virtual:icons/fa6-regular/comments?raw'
import RawFA6CommentsWithHeight from 'virtual:icons/fa6-regular/comments?raw&height=2.25rem'
import RawFA6CommentsWithWidth from 'virtual:icons/fa6-regular/comments?raw&width=2.25em'
import RawFA6CommentsWithSize from 'virtual:icons/fa6-regular/comments?raw&width=3em&height=2em'
import RawFA6CommentsWithUnsetHeight from 'virtual:icons/fa6-regular/comments?raw&height=unset'
import RawFA6CommentsWithUnsetWidth from 'virtual:icons/fa6-regular/comments?raw&width=unset'
import RawFA6CommentsWithUnsetSize from 'virtual:icons/fa6-regular/comments?raw&width=unset&height=unset'
import Custom1 from 'virtual:icons/plain-color-icons/about?raw'
import Custom2 from 'virtual:icons/test-color-icons/about?raw'
import ExternalCustom3 from 'virtual:icons/test-color-icons/about'
import VSCodePython from 'virtual:icons/vscode-icons/file-type-python'
</script>

<template>
  <div class="markdown-body" style="padding: 2em 3em">
    <i-logos-vue style="font-size: 2em" />
    <br>
    <h2>Icons</h2>
    <p>
      <i-mdi:light-flood-down />
      <i-mdi-account />
      <i-fa-solid-dice-five />
      <i-heroicons-outline:menu-alt-2 />
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
      <VSCodePython />
      <ExternalCustom3 />
      <i-test-color-icons:about />
      <i-plain-color-icons:about />
      <br>
    </p>
    <h2>Customizer via Config</h2>
    <p>
      <i-carbon-app-connectivity />
      <i-custom-car-a />
    </p>
    <h2>Custom Props via Query</h2>
    <p>
      <FA6Comments />
      <FA6Comments2 />
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
      <strong>raw</strong> query param, also testing size params on non-square icon
    </h2>
    <div class="test-grid">
      <span v-html="RawFA6Comments" />
      <div>
        <code style="opacity: 0.5">import RawFA6Comments from
          'virtual:icons/fa6-regular/comments?raw'</code>
        <pre>{{ RawFA6Comments }}</pre>
      </div>
      <span v-html="RawFA6CommentsWithHeight" />
      <div>
        <code style="opacity: 0.5">import RawFA6CommentsWithHeight from
          'virtual:icons/fa6-regular/comments?raw&height=2.25rem'</code>
        <pre>{{ RawFA6CommentsWithHeight }}</pre>
      </div>
      <span v-html="RawFA6CommentsWithWidth" />
      <div>
        <code style="opacity: 0.5">import RawFA6CommentsWithWidth from
          'virtual:icons/fa6-regular/comments?raw&width=2.25em'</code>
        <pre>{{ RawFA6CommentsWithWidth }}</pre>
      </div>
      <span v-html="RawFA6CommentsWithSize" />
      <div>
        <code style="opacity: 0.5">import RawFA6CommentsWithSize from
          'virtual:icons/fa6-regular/comments?raw&width=3em&height=2em'</code>
        <pre>{{ RawFA6CommentsWithSize }}</pre>
      </div>
      <span v-html="RawFA6CommentsWithUnsetHeight" />
      <div>
        <code style="opacity: 0.5">import RawFA6CommentsWithUnsetHeight from
          'virtual:icons/fa6-regular/comments?raw&height=unset'</code>
        <pre>{{ RawFA6CommentsWithUnsetHeight }}</pre>
      </div>
      <span v-html="RawFA6CommentsWithUnsetWidth" />
      <div>
        <code style="opacity: 0.5">import RawFA6CommentsWithUnsetWidth from
          'virtual:icons/fa6-regular/comments?raw&width=unset'</code>
        <pre>{{ RawFA6CommentsWithUnsetWidth }}</pre>
      </div>
      <span v-html="RawFA6CommentsWithUnsetSize" />
      <div>
        <code style="opacity: 0.5">import RawFA6CommentsWithUnsetSize from
          'virtual:icons/fa6-regular/comments?raw&width=unset&height=unset'</code>
        <pre>{{ RawFA6CommentsWithUnsetSize }}</pre>
      </div>
      <span v-html="Custom1" />
      <div>
        <code style="opacity: 0.5">import Custom1 from
          'virtual:icons/plain-color-icons/about?raw'</code>
        <pre>{{ Custom1 }}</pre>
      </div>
      <span v-html="Custom2" />
      <div>
        <code style="opacity: 0.5">import Custom2 from
          'virtual:icons/test-color-icons/about?raw'</code>
        <pre>{{ Custom2 }}</pre>
      </div>
    </div>
    <br>
  </div>
</template>

<style scoped>
pre {
  overflow-x: auto;
}

.test-grid {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  gap: 0.5em;
}

.test-grid > span {
  display: inline-flex;
  box-shadow: 0 0 0 1px rgba(128, 128, 128, 0.5);
}

/* Make sure span does not stretch if SVG has width */
.test-grid > span:has(svg[width]) {
  width: fit-content;  
}
</style>
