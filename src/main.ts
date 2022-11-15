import { createApp } from "vue";
import "./styles/globals.css";
import "./styles/tailwind.css";
import App from "./App.vue";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).mount("#app");
