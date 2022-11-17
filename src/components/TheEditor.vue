<script setup lang= "ts">
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorState } from '@codemirror/state'
import { useCodeStore } from '../stores/code';
import { useConfigStore } from '../stores/config';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { EditorView } from "@codemirror/view"
import { vim } from "@replit/codemirror-vim"
import { go } from "@codemirror/legacy-modes/mode/go"
import { r } from "@codemirror/legacy-modes/mode/r"
import { StreamLanguage } from "@codemirror/language"
import { useObservable } from '@vueuse/rxjs'
import { Subject, NEVER, merge, BehaviorSubject, Observable } from "rxjs"
import { switchMap, debounceTime, tap, startWith, mergeWith } from 'rxjs/operators'
import { fetchPrediction } from "../utils"
import Spinner from "./Spinner.vue"

const codeStore = useCodeStore()
const configStore = useConfigStore()
const loading = ref(false)
const editor = ref(null)
// use a separate ref to make activeCode writable for binding to v-model
const activeCode = ref(codeStore.activeCode)
const { activeLanguage } = storeToRefs(codeStore)


const text$ = new BehaviorSubject<string>(activeCode.value)
const tab$ = new BehaviorSubject<boolean>(true)
const suggestions = useObservable(
    text$.pipe(
        mergeWith(tab$),
        debounceTime(1000),
        switchMap(value => {
            if (typeof value === "boolean") {
                // if the user change to another tab when the previous request is still pending, cancel it
                loading.value = false
                return NEVER
            } else {
                loading.value = true
                return fetchPrediction({ lang: activeLanguage.value.name, text: value })
            }
        }),
        tap((pred) => {
            activeCode.value = pred
            loading.value = false
        })
    )
)


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
    const result = [oneDark]
    const lang = activeLanguage.value.name.toLowerCase()
    if (lang in languageExtensions) {
        result.push(languageExtensions[lang])
    }
    if (configStore.editor.vimMode) {
        result.push(vim())
    }
    return result
})

const switchLanguage = (lang: string) => {
    tab$.next(true)
    codeStore.setActiveLanguage(lang)
}

const handleReady = ({ view, state }: { view: EditorView, state: EditorState }) => {
    codeStore.setView(view)
}

const handleChange = async () => {
    text$.next(activeCode.value)
    codeStore.saveCode(activeCode.value)
}
</script>


<template>

    <div class="tabs tabs-boxed flex justify-center gap-10">
        <a class="tab" v-for="lang in Object.keys(codeStore.languages)" :key="lang" @click="switchLanguage(lang)"
            :class="{ 'tab-active': lang.toLowerCase() === codeStore.activeLanguage.name.toLowerCase() }">{{
                    codeStore.languages[lang].name
            }}</a>
    </div>


    <div class="editor-wrapper">
        <div class="relative">
            <Codemirror :extensions="extensions" @ready="handleReady" @change="handleChange" :autofocus="true"
                ref="editor" v-model="activeCode">
            </Codemirror>
            <div class="absolute bottom-4 right-4">
                <Spinner v-show="loading"></Spinner>
            </div>
        </div>
        <div class="flex justify-end mt-2">
            <div class="form-control w-32 ">
                <label class="cursor-pointer label">
                    <span class="label-text">vim mode</span>
                    <input type="checkbox" class="toggle toggle-info" :checked="configStore.editor.vimMode"
                        @change="configStore.setEditorConfig({ vimMode: !configStore.editor.vimMode })" />
                </label>
            </div>
        </div>
    </div>
</template>

<style>

</style>