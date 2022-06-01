/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue').default;
import VueRouter from 'vue-router'
import { Form, Errors } from 'vform';

import DashboardComponent from './components/DashboardComponent';
import UsersComponent from './components/UsersComponent';

Vue.use(VueRouter);

// Vue.component(Errors.name, Errors);


window.Form = Form;

const routes = [
    { path: '/dashboard', component: DashboardComponent },
    { path: '/users', component: UsersComponent }
];

const router = new VueRouter({
    // mode: 'history',
    routes
})


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
});
