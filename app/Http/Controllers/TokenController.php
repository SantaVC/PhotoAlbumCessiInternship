<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Exceptions\JWTException;
//use \Firebase\JWT\JWT;
use Tymon\JWTAuth\Facades\JWTAuth;

class TokenController extends Controller
{

    public function generate(Request $request)
    {
        // Получаем идентификатор пользователя из запроса (предположим, что он передается)
        $userId = $request->input('user_id');

        // Проверяем, что передан идентификатор пользователя
        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        // Создаем объект пользователя для тестового сценария
        $user = new User();
        $user->id = $userId;
        $user->email = 'test@example.com'; // Замените на тестовые данные по вашему усмотрению

        // Генерируем пару токенов
        $tokens = $this->generateTokens($user);

        // Возвращаем токены в формате JSON
        return response()->json($tokens);
    }

    public function refreshAllTokens(Request $request)
    {
    // Получаем refresh токен из запроса
    $refreshToken = $request->input('refresh_token');

    // Проверяем, существует ли refresh токен
    if (!$refreshToken) {
        return response()->json(['error' => 'Refresh token is missing'], 400);
    }

    try{
        // Проверяем валидность refresh токена
        $payload = JWTAuth::setToken($refreshToken)->getPayload();

        // Получаем идентификатор пользователя из токена
        $userId = $payload['sub'];

        // Находим пользователя по идентификатору
        $user = User::find($userId);

        // Проверяем, существует ли пользователь
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Проверяем, соответствует ли refresh токен текущему токену пользователя
        if (!$user->hasValidToken($refreshToken)) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }

        // Генерируем новую пару токенов
        $tokens = $this->generateTokens($user);

        } 
     catch (JWTException $e) {
        // Если возникает ошибка при обработке токена
        return response()->json(['error' => 'Could not refresh token'], 500);
        }
    } 

    public function takeAccessToken(Request $request){
        // Получаем refresh токен из запроса
        $refreshToken = $request->input('refresh_token');
    
        // Проверяем, существует ли refresh токен
        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token is missing'], 400);
        }
    
        try{
            // Проверяем валидность refresh токена
            $payload = JWTAuth::setToken($refreshToken)->getPayload();
    
            // Получаем идентификатор пользователя из токена
            $userId = $payload['sub'];
    
            // Находим пользователя по идентификатору
            $user = User::find($userId);
    
            // Проверяем, существует ли пользователь
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
    
            // Проверяем, соответствует ли refresh токен текущему токену пользователя
            if (!$user->hasValidToken($refreshToken)) {
                return response()->json(['error' => 'Invalid refresh token'], 401);
            }
    
            // Генерируем новую пару токенов
            $tokens = $this->generateAccessToken($user);
    
            } 
         catch (JWTException $e) {
            // Если возникает ошибка при обработке токена
            return response()->json(['error' => 'Could not refresh token'], 500);
            }
        } 
    private function generateAccessToken($user)
{
    // Генерация access токена
    $accessToken = JWTAuth::fromUser($user);

    return $accessToken;
}

private function generateRefreshToken($user)
{
    // Генерация refresh токена
    $refreshToken = JWTAuth::fromUser($user);

    return $refreshToken;
}

private function generateTokens($user)
{
    // Генерация access и refresh токенов
    $accessToken = $this->generateAccessToken($user);
    $refreshToken = $this->generateRefreshToken($user);

    return [
        'access_token' => $accessToken,
        'refresh_token' => $refreshToken
    ];
}

    // public function generate(Request $request)
    // {
    //     // Получаем идентификатор пользователя из запроса (предположим, что он передается)
    //     $userId = $request->input('user_id');

    //     // Проверяем, что передан идентификатор пользователя
    //     if (!$userId) {
    //         return response()->json(['error' => 'User ID is required'], 400);
    //     }

    //     // Получаем секретный ключ из переменных среды
    //     $secretKey = (string) config('app.jwt_secret');

    //     // Генерируем пару токенов
    //     $tokens = $this->generateTokens($userId, $secretKey);

    //     // Возвращаем токены в формате JSON
    //     return response()->json($tokens);
    // }

    // private function generateTokens($userId, $secretKey) {
    //     $tokenId    = base64_encode(random_bytes(32)); // Уникальный идентификатор токена
    //     $issuedAt   = time(); // Время создания токена
    //     $expire     = $issuedAt + 60 * 60; // Срок действия токена (1 час)
    //     $refreshExpire = $issuedAt + 60 * 60 * 24 * 30; // Срок действия refresh токена (30 дней)

    //     // Здесь мы формируем заголовок и тело access токена
    //     $accessToken = [
    //         'iat'  => $issuedAt,          // Время создания токена
    //         'exp'  => $expire,            // Время истечения срока действия токена
    //         'sub'  => $userId,            // Идентификатор пользователя
    //         'jti'  => $tokenId,           // Уникальный идентификатор токена
    //         'type' => 'access'            // Тип токена (access)
    //     ];

    //     // Здесь мы формируем заголовок и тело refresh токена
    //     $refreshToken = [
    //         'iat'  => $issuedAt,                // Время создания токена
    //         'exp'  => $refreshExpire,           // Время истечения срока действия токена
    //         'sub'  => $userId,                  // Идентификатор пользователя
    //         'jti'  => $tokenId,                 // Уникальный идентификатор токена
    //         'type' => 'refresh'                 // Тип токена (refresh)
    //     ];

    //     // Подписываем access токен
    //     $accessToken = JWT::encode($accessToken, $secretKey, 'HS256');
        
    //     // Подписываем refresh токен
    //     $refreshToken = JWT::encode($refreshToken, $secretKey, 'HS256');

    //     return [
    //         'access_token' => $accessToken,
    //         'refresh_token' => $refreshToken
    //     ];
    // }
}
