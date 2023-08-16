<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;

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

Route::prefix('feature-api')->group(function () {
    Route::get('/test-database', [TestController::class, 'testDatabase']);

    Route::post('/login', [AuthController::class, 'login']);
    
    // Protect routes with authentication
    Route::middleware('ensure.token:api')->group(function () {
        Route::get('/user/{name}', [UserController::class, 'show']);
        Route::post('/user', [UserController::class, 'store']);
    });
});
