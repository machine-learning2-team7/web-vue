<script setup lang= "ts">
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState } from '@codemirror/state'
import { useCodeStore } from '../stores/code';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { EditorView } from "@codemirror/view"
import { vim } from "@replit/codemirror-vim"
import { go } from "@codemirror/legacy-modes/mode/go"
import { r } from "@codemirror/legacy-modes/mode/r"
import { StreamLanguage } from "@codemirror/language"


const codeStore = useCodeStore()
const activeCode = ref(codeStore.activeCode)
const { activeLanguage } = storeToRefs(codeStore)

watch(activeLanguage, () => {
    activeCode.value = codeStore.activeCode
})

const languageExtensions: Record<string, any> = {
    "javascript": javascript(),
    "python": python(),
    "sql": sql(),
    "r": StreamLanguage.define(r),
    "go": StreamLanguage.define(go)
}
const extensions = computed(() => {
    const result = [vim(), oneDark]
    const lang = activeLanguage.value.name.toLowerCase()
    if (lang in languageExtensions) {
        result.push(languageExtensions[lang])
    }
    return result
})



const handleReady = ({ view, state }: { view: EditorView, state: EditorState }) => {
}

const handleChange = () => {
    codeStore.saveCode(activeCode.value)
}
</script>

<template>
    <Codemirror :extensions="extensions" @ready="handleReady" @change="handleChange" :autofocus="true"
        v-model="activeCode">
    </Codemirror>
</template>