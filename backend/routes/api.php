<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Response;
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

Route::group(['middleware' => 'cors'], function(){

    Route::post('/users', [UserController::class, 'store']);
    Route::apiResource('products', ProductController::class)->only(['show', 'index']);

    Route::group(['middleware' => 'auth:sanctum'], function() {
        Route::apiResource('users', UserController::class)->except(['store']);
        Route::get('me', [AuthController::class, 'getMe']);
        Route::get('tokens', [AuthController::class, 'getTokens']);
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('logout/all', [AuthController::class, 'logoutAll']);

        Route::apiResource('products', ProductController::class)->except(['show', 'index']);
        Route::get('my-products', [ProductController::class, 'myProducts']);

        Route::middleware('DepositMiddleware')->group(function() {
            Route::post('deposit', [PaymentController::class, 'deposit']);
            Route::post('buy', [PaymentController::class, 'buyProducts']);
            Route::get('buys', [PaymentController::class, 'getBuys']);
            Route::get('buys/{buy_id}', [PaymentController::class, 'getBuy']);
            Route::get('reset', [PaymentController::class, 'reset']);
        });
    });

    Route::get('login', [AuthController::class, 'unauthorized'])->name('login');
    Route::post('login', [AuthController::class, 'login']);
    Route::fallback(function () {
        return Response::error(
            ['message' => 'Page Not Found. If error persists, contact support'],
            404
        );
    });
});
