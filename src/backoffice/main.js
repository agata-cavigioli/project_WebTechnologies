/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'

const mongo = require('../../mongo.js');

const app = createApp(App,
    {
        products: mongo.query,
    }
)

console.log(app);

app.mount('#app');

