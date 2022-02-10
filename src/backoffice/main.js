/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'

const mongo = require('../../test.js');

const app = createApp(App,
    {
        products: mongo.query,
        test: mongo.query2
    }
)

console.log(app);

app.mount('#app');

function test() {
    console.log(app);
}


