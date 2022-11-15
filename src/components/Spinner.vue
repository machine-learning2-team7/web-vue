<!-- borrowed from https://epic-spinners.epicmax.co/ -->
<template>
    <div class="breeding-rhombus-spinner" v-show="loading">
        <div class="rhombus child-1"></div>
        <div class="rhombus child-2"></div>
        <div class="rhombus child-3"></div>
        <div class="rhombus child-4"></div>
        <div class="rhombus child-5"></div>
        <div class="rhombus child-6"></div>
        <div class="rhombus child-7"></div>
        <div class="rhombus child-8"></div>
        <div class="rhombus big"></div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
defineProps<{
    loading: boolean
}>()
</script>

<style lang="scss">
.breeding-rhombus-spinner {
    height: 40px;
    width: 40px;
    position: relative;
    transform: rotate(45deg);
}

.breeding-rhombus-spinner,
.breeding-rhombus-spinner * {
    box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus {
    height: calc(40px / 7.5);
    width: calc(40px / 7.5);
    animation-duration: 2000ms;
    top: calc(40px / 2.3077);
    left: calc(40px / 2.3077);
    background-color: $primary;
    position: absolute;
    animation-iteration-count: infinite;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n+0) {
    margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
    animation-name: breeding-rhombus-spinner-animation-child-1;
    animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
    animation-name: breeding-rhombus-spinner-animation-child-2;
    animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
    animation-name: breeding-rhombus-spinner-animation-child-3;
    animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
    animation-name: breeding-rhombus-spinner-animation-child-4;
    animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
    animation-name: breeding-rhombus-spinner-animation-child-5;
    animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
    animation-name: breeding-rhombus-spinner-animation-child-6;
    animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
    animation-name: breeding-rhombus-spinner-animation-child-7;
    animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
    animation-name: breeding-rhombus-spinner-animation-child-8;
    animation-delay: calc(100ms * 8);
}

.breeding-rhombus-spinner .rhombus.big {
    height: calc(40px / 3);
    width: calc(40px / 3);
    animation-duration: 2000ms;
    top: calc(40px / 3);
    left: calc(40px / 3);
    background-color: $primary;
    animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
    animation-delay: 0.5s;
}


@keyframes breeding-rhombus-spinner-animation-child-1 {
    50% {
        transform: translate(-325%, -325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
    50% {
        transform: translate(0, -325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
    50% {
        transform: translate(325%, -325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
    50% {
        transform: translate(325%, 0);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
    50% {
        transform: translate(325%, 325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
    50% {
        transform: translate(0, 325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
    50% {
        transform: translate(-325%, 325%);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
    50% {
        transform: translate(-325%, 0);
    }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
    50% {
        transform: scale(0.5);
    }
}
</style>