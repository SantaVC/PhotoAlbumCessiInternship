<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\EmailVerificationResendController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Notifications\EmailVerificationNotification;


Route::get('/test', function () {
  return response()->json(['message' => 'Test successful']);
});

Route::get('/user', [AuthController::class, 'getUser']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/sign-up', [AuthController::class, 'signup']);
Route::post('/sign-in', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/testAPI', [AuthController::class, 'testAPI']);

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

Route::patch('/profile/change-nickname', [ProfileController::class, 'changeNickname']);
Route::patch('/profile/change-password', [ProfileController::class, 'changePassword']);
Route::post('/profile/change-avatar', [ProfileController::class, 'changeAvatar']);
Route::patch('/profile/update', [ProfileController::class, 'updateProfile']);

Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->middleware('throttle:1,1');
Route::get('/email/verify', [VerificationController::class, 'verifyEmail']);
Route::post('/email/resend', [EmailVerificationResendController::class, 'resend'])->middleware('throttle:1,1');

Route::get('/avatars/{image_path}', [ImageController::class, 'getImage']);

Route::get('/posts', [PostController::class, 'getPosts']);
Route::post('/posts/create', [PostController::class, 'createPost']);
Route::delete('/posts/delete/{postId}', [PostController::class, 'deletePost']);
Route::get('/{id}/uploads/{image_path}', [PostController::class, 'getPostImage']);
