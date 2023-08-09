import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import axios from 'axios';
import { createPinia } from 'pinia';

import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import EmployeesPanel from './components/EmployeesPanel.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
axios.defaults.baseURL = 'https://fepruebatecnicaculqi-backend-production.up.railway.app';
app.config.globalProperties.$http = axios;

app.component('culqi-sidebar', Sidebar);
app.component('culqi-header', Header);
app.component('culqi-employees', EmployeesPanel);

app.use(router).mount('#app');
