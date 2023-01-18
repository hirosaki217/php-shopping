<?php

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::get('users', [UserController::class, 'index'])->name('users.index');
// Route::get('users/search', [UserController::class, 'search'])->name('users.search');
// Route::get('users/{email}', [UserController::class, 'get'])->name('users.get');
// Route::post('users', [UserController::class, 'store'])->name('users.store');
// Route::post('users/update', [UserController::class, 'update'])->name('users.update');
// Route::post('users/delete', [UserController::class, 'delete'])->name('users.delete');
// Route::post('users/lock', [UserController::class, 'toogle_lock'])->name('users.lock');

Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/search', [UserController::class, 'search'])->name('search');
    Route::get('/{email}', [UserController::class, 'get'])->name('get');
    Route::post('/', [UserController::class, 'store'])->name('store');
    Route::post('/update', [UserController::class, 'update'])->name('update');
    Route::post('/delete', [UserController::class, 'delete'])->name('delete');
    Route::post('/lock', [UserController::class, 'toogle_lock'])->name('lock');
});


Route::group(['prefix' => 'customers', 'as' => 'customers.'], function () {
    Route::get('/', [CustomerController::class, 'index'])->name('index');
    Route::get('/search', [CustomerController::class, 'search'])->name('search');
    Route::get('/{email}', [CustomerController::class, 'get'])->name('get');
    Route::post('/', [CustomerController::class, 'store'])->name('store');
    Route::post('/update', [CustomerController::class, 'update'])->name('update');
    Route::post('/delete', [CustomerController::class, 'delete'])->name('delete');
});


Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/search', [ProductController::class, 'search'])->name('search');
    Route::get('/{id}', [ProductController::class, 'get'])->name('get');
    Route::post('/', [ProductController::class, 'store'])->name('store');
    Route::post('/storeimage', [ProductController::class, 'storeimage'])->name('storeimage');
    Route::post('/update', [ProductController::class, 'update'])->name('update');
    Route::post('/delete', [ProductController::class, 'delete'])->name('delete');
    Route::post('/{product_name}', [ProductController::class, 'generateId'])->name('generateId');
});
