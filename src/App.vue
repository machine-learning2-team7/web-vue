<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCodeStore } from './stores/code';
import { watch } from "vue"
import { storeToRefs } from 'pinia';
import TheEditor from './components/TheEditor.vue';
import TheCommandPalette from './components/TheCommandPalette.vue';
import TheDescription from './components/TheDescription.vue';


const codeStore = useCodeStore();

</script>

<template>
  <main>

    <section class="editor-pane">
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
      <section class="description-pane mt-10">
        <TheDescription></TheDescription>
      </section>
    </section>

  </main>

  <Teleport to="body">
    <TheCommandPalette></TheCommandPalette>
  </Teleport>
</template>

<style scoped>
main {
  max-width: 960px;
  margin: 20px auto;
}

.editor {
  height: 80vh
}
</style>
