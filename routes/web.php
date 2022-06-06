<?php

use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::prefix('api')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::get('user/profile', [UserController::class, 'profile'])->name('profile.show');
    Route::put('user/profile', [UserController::class, 'updateProfile'])->name('profile.update');
});
