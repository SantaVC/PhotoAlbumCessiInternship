<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
 

Route::middleware('jwt.auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

Route::get('/test', function () {
  return response()->json(['message' => 'Test successful']);
});

Route::middleware('jwt.auth')->get('/profile', function () {
  return response()->json(['message' => 'This route is protected by JWT']);
});

Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/testAPI', [AuthController::class, 'testAPI']);

Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//   return $request->user();
// });


Route::post('/email/resend', 'App\Http\Controllers\Auth\VerificationController@resend')->name('verification.resend');


Route::post('email/verify', 'VerificationController@verify')->name('verification.verify');
Route::post('email/resend', 'VerificationController@resend')->name('verification.resend');
Route::get('email/verify', [AuthController::class, 'verifyEmail']);

