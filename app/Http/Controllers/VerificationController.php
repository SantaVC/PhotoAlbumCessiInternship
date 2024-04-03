<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class VerificationController extends Controller
{
   public function verify(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    if (!$user->email_verified_at) {
        // Проверяем, совпадает ли refresh токен из cookie с токеном пользователя
        $refreshToken = $request->cookie('refresh_token');
        if ($refreshToken && hash_equals($user->refresh_token, $refreshToken)) {
            // Устанавливаем время подтверждения электронной почты и сохраняем пользователя
            $user->email_verified_at = now();
            $user->save();

            return response()->json(['message' => 'Email successfully verified'], 200);
        } else {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }
    } else {
        return response()->json(['message' => 'Email already verified'], 422);
    }
}
}