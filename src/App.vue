<script setup lang="ts">
import TheEditor from './components/TheEditor.vue';
import TheCommandPalette from './components/TheCommandPalette.vue';
import TheDescription from './components/TheDescription.vue';


</script>

<template>
  <main>
    <TheEditor></TheEditor>
    <TheDescription></TheDescription>
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
