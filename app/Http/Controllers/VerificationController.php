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
use App\Services\TokenAuthService;

class VerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
        $user = TokenAuthService::authenticateUserFromToken($request);
  
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