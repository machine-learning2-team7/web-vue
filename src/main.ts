import { createApp } from "vue";
import "./styles/globals.css";
import "./styles/tailwind.css";
import App from "./App.vue";
import { createPinia } from "pinia";

const pinia = createPinia();
createApp(App).use(pinia).mount("#app");
