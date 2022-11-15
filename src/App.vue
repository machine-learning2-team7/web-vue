<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCodeStore } from './stores/code';
import { watch } from "vue"
import { storeToRefs } from 'pinia';
import TheEditor from './components/TheEditor.vue';


const codeStore = useCodeStore();

</script>

<template>
  <main>
    <div class="tabs tabs-boxed flex justify-center gap-10">
      <a class="tab" v-for="lang in Object.keys(codeStore.languages)" :key="lang"
        @click="codeStore.setActiveLanguage(lang)"
        :class="{ 'tab-active': lang.toLowerCase() === codeStore.activeLanguage.name.toLowerCase() }">{{
    codeStore.languages[lang].name
        }}</a>
    </div>
    <div class="editor-wrapper mt-10">
      <TheEditor></TheEditor>
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 900px;
  margin: 20px auto;
}

.editor {
  height: 80vh
}
</style>
