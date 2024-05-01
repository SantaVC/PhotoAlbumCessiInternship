<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;

class VerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
      $secretKey = (string) config('jwt.secret');
      $refreshToken = $request->cookie('refresh_token');
    
      if (!$refreshToken) {
          return response()->json(['message' => 'Refresh token not found in cookie'], 401);
      }
    
      // Извлекаем идентификатор пользователя из cookie
      $payload = JWT::decode($refreshToken, new Key($secretKey, 'HS256'));
            
            // Извлекаем идентификатор пользователя из декодированного токена
            $userId = $payload->sub;
    
      // Находим пользователя в базе данных по его ID
      $user = User::find($userId);
    
    
      if (!$user) {
          return response()->json(['message' => 'Invalid refresh token or user ID'], 401);
      }
    
        if ($user->email_verified_at) {
            return response()->json(['message' => 'Email already verified'], 422);
        }
    
        // Проверяем наличие email_verified_at перед сохранением
        if (!$user->email_verified_at) {
            $user->email_verified_at = now();
            $user->save();
    
            event(new Verified($user));
    
            return response()->json(['message' => 'Email successfully verified'], 200);
        }
     }
}