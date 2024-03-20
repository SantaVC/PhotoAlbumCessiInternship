<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Http\Middleware\Authenticate;

// Route::get('api/email/verify', function () {
//   return view('auth.verify-email');

// })->middleware('auth')->name('verification.notice');

// Route::get('api/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
// Route::get('/email/verify/resend', [AuthController::class, 'resendVerificationEmail'])->name('verification.resend');

Route::middleware('jwt.auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
  return response()->json(['message' => 'Test successful']);
});

Route::middleware('jwt.auth')->get('/profile', function () {
  return response()->json(['message' => 'This route is protected by JWT']);
});

Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);
Route::get('/testAPI', [AuthController::class, 'testAPI']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
// Route::middleware('auth:sanctum')->get('/testAPI', [AuthController::class, 'testAPI']);
