<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class TokenAuthService
{
    public static function authenticateUserFromToken(Request $request)
    {
        // Получаем refresh token из куки
        $refreshToken = $request->cookie('refresh_token');

        // Проверяем, что передан refresh token
        if (!$refreshToken) {
            throw new \Exception('Refresh token is required', 400);
        }

        // Получаем секретный ключ из переменных среды
        $secretKey = config('jwt.secret');

        // Расшифровываем refresh token
        try {
            $refreshTokenData = JWT::decode($refreshToken, new Key($secretKey, 'HS256'));
        } catch (ExpiredException $e) {
            throw new \Exception('Token expired', 401);
        } catch (\Exception $e) {
            throw new \Exception('Invalid token', 401);
        }

        $userId = $refreshTokenData->sub;
        $user = User::find($userId);

        if (!$user) {
            throw new \Exception('User not found', 404);
        }

        Auth::login($user);
        return $user;
    }
}