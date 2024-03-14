<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
  return response()->json(['message' => 'Test successful']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/testAPI', [AuthController::class, 'testAPI']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
// Route::middleware('auth:sanctum')->get('/testAPI', [AuthController::class, 'testAPI']);
