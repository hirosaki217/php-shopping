<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\User\UserController;
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
    return view('index');
})->name('home');


Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store']);


Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::get('/logout', [LogoutController::class, 'index'])->name('logout');


Route::get('/users', [UserController::class, 'index'])->name('users')->middleware('auth');
Route::get('/customers', [CustomerController::class, 'index'])->name('customers')->middleware('auth');
Route::get('/products', [ProductController::class, 'index'])->name('products')->middleware('auth');
Route::get('/products/add', [ProductController::class, 'showFormAdd'])->name('products.add')->middleware('auth');
Route::get('/products/update/{id}', [ProductController::class, 'showFormUpdate'])->name('products.update')->middleware('auth');
