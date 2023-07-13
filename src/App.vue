<script setup lang="ts">
import DownloadIconOffAnimated from "./components/icons/DownloadOffIconAnimated.vue";
import DownloadIconAnimated from "./components/icons/DownloadIconAnimated.vue";
import HelpIcon from "./components/icons/HelpIcon.vue";
import { computed, ref } from "vue";
import parseVSCodeExtensionsUrl from "./helpers/parse-vscode-extensions-url";

const inputPublisher = ref("");
const inputExtensionName = ref("");
const inputVersion = ref("");

const readyToGenerate = computed(() => {
  return inputPublisher.value !== "" && inputExtensionName.value !== "" && inputVersion.value !== "";
});
const parsedUrl = computed(() => {
  return parseVSCodeExtensionsUrl(inputPublisher.value, inputExtensionName.value, inputVersion.value);
})
function reset() {
  inputPublisher.value = "";
  inputExtensionName.value = "";
  inputVersion.value = "";
}
</script>
<template>
  <main class="min-h-screen w-full bg-zinc-900 py-10">
    <header class="max-w-7xl mx-auto flex flex-col gap-4 items-center">
      <img class="w-20 h-20" src="/favicon.svg" alt="Logo" />
      <h3 class="text-zinc-50 text-4xl font-bold">VSCode Extension Downloader</h3>
      <p class="text-sm text-zinc-400">This app will generate url that trigger downloading certain vscode extension.</p>
      <p class="text-sm text-rose-600">Please note that due to the rate limit, the action may often fail, so you may need to refresh the page link until it works.</p>
      <div class="text-sm text-zinc-400">
        <p class="mb-2">This app would be useful in case you:</p>
        <ol>
          <li>&bullet; Want to install the extensions later when offline.</li>
          <li>&bullet; You have internet connection problem.</li>
          <li>&bullet; VSCode taking long time to download the extension and you have no idea whats going on.</li>
        </ol>
      </div>
      <p class="text-green-500 text-sm font-bold">USE WISELY</p>
    </header>

    <div class="max-w-7xl mx-auto mt-10 flex flex-col gap-4 items-center">
      <div class="flex justify-center gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-zinc-300 font-semibold inline-flex gap-2 items-center" for="input-publisher">
            Publisher
            <VTooltip>
              <div class="bg-[#007ACC] rounded-full w-6 h-6 flex items-center justify-center border border-[#0098FF] text-white">
                <HelpIcon class="w-3 h-3" />
              </div>

              <template #popper>
                <img src="/publisher-place.png" alt="Where the publisher name placed">
              </template>
            </VTooltip>
          </label>
          <input type="text" id="input-publisher" autofocus v-model="inputPublisher" placeholder="ms-python"/>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-zinc-300 font-semibold inline-flex gap-2 items-center" for="input-extension-name">
            Extension Name
            <VTooltip>
              <div class="bg-[#007ACC] rounded-full w-6 h-6 flex items-center justify-center border border-[#0098FF] text-white">
                <HelpIcon class="w-3 h-3" />
              </div>

              <template #popper>
                <img src="/extension-name-place.png" alt="Where the extension name placed">
              </template>
            </VTooltip>
          </label>
          <input type="text" id="input-extension-name" v-model="inputExtensionName" placeholder="markdown-all-in-one"/>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-zinc-300 font-semibold inline-flex gap-2 items-center" for="input-version">
            Version
            <VTooltip>
              <div class="bg-[#007ACC] rounded-full w-6 h-6 flex items-center justify-center border border-[#0098FF] text-white">
                <HelpIcon class="w-3 h-3" />
              </div>

              <template #popper> 
                <img src="/version-place.png" alt="Where the version placed">
                <div class="text-sm mt-4">Without "v"</div>
              </template>
            </VTooltip>
          </label>
          <input type="text" id="input-version" v-model="inputVersion" placeholder="2.3.2"/>
        </div>
      </div>

      <div>
        <button class="bg-[#007ACC] text-xs rounded-md shadow-sm border border-[#0098FF] hover:bg-[#0065A9] hover:border-[#007ACC] transition text-white px-3 py-1" @click="reset">Reset</button>
      </div>

      <a :class="['bg-[#007ACC] w-[200px] h-[80px] rounded-md shadow-sm border border-[#0098FF] text-white font-semibold flex flex-col items-center justify-center gap-1', readyToGenerate ? 'hover:bg-[#0065A9] hover:border-[#007ACC] transition cursor-pointer' : 'opacity-50 cursor-not-allowed']" target="_blank" :href="readyToGenerate ? parsedUrl : 'javascript:void(0)'" :disabled="readyToGenerate">
        <DownloadIconOffAnimated v-if="!readyToGenerate" />
        <DownloadIconAnimated v-else />
        Smash To Download
      </a>
    </div>
  </main>
</template>
