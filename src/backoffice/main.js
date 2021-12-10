import { createApp } from 'vue'
import App from './App.vue'

exports.setup = () => {
	createApp(App).mount('#app');
}

exports.test = () => {
	console.log('ugh');
}
