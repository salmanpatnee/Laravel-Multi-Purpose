/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue';
window.Vue = require('vue').default;
import VueRouter from 'vue-router'
import { Form } from 'vform';
import Moment from 'moment';
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2';


import { Button, HasError, AlertError, AlertErrors, AlertSuccess } from 'vform/src/components/bootstrap4';
import DashboardComponent from './components/DashboardComponent';
import UsersComponent from './components/UsersComponent';
import ProfileComponent from './components/ProfileComponent';



Vue.use(VueRouter);
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
});

Vue.component(Button.name, Button)
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
Vue.component(AlertSuccess.name, AlertSuccess)

Vue.filter('formatteddDate', function (date) {
    return Moment(date).format('MMMM Do YYYY');
});

window.Form = Form;
window.Swal = Swal;
window.Fire = new Vue();

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.Toast = Toast;

const routes = [
    { path: '/dashboard', component: DashboardComponent },
    { path: '/users', component: UsersComponent },
    { path: '/profile', component: ProfileComponent }
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
