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
import { useObservable } from '@vueuse/rxjs'
import { Subject } from "rxjs"
import { fromFetch } from 'rxjs/fetch';
import { switchMap, debounceTime, tap } from 'rxjs/operators'
import Spinner from "./Spinner.vue"

const codeStore = useCodeStore()
const loading = ref(false)
const editor = ref(null)
// use a separate ref to make activeCode writable for binding to v-model
const activeCode = ref(codeStore.activeCode)
const { activeLanguage } = storeToRefs(codeStore)

const text$ = new Subject<string>()
// const suggestions = useObservable(
//     text$.pipe(
//         tap(() => loading.value = false),
//         debounceTime(1000),
//         switchMap((text) => {
//             loading.value = true
//             return fromFetch('http://localhost:8000/predict', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     lang: activeLanguage.value.name,
//                     input: text
//                 }),
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//             }).pipe(
//                 switchMap((response) => response.json())
//             )
//         }),
//         tap((value) => {
//             loading.value = false
//         })
//     )
// )

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
    codeStore.setView(view)
}

const handleChange = async () => {
    text$.next(activeCode.value)
    codeStore.saveCode(activeCode.value)
}
</script>

<template>

    <div class="editor-wrapper relative">
        <Codemirror :extensions="extensions" @ready="handleReady" @change="handleChange" :autofocus="true" ref="editor"
            v-model="activeCode">
        </Codemirror>
        <div class="absolute bottom-4 right-4">
            <Spinner :loading="loading"></Spinner>
        </div>

    </div>
</template>