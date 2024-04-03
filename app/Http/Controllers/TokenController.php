<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use DomainException;
use InvalidArgumentException;
use UnexpectedValueException;
use Exception;

 class TokenController extends Controller
 {
  public function refreshTokens(Request $request)
  {
    // Получаем refresh token из куки
    $refreshToken = $request->cookie('refresh_token');

    // Проверяем, что передан refresh token
    if (!$refreshToken) {
      throw new \Exception('Refresh token is required', 400);
    }

    // Получаем секретный ключ из переменных среды
    $secretKey = (string) config('jwt.secret');

    // Расшифровываем refresh token
    try {
      $refreshTokenData = JWT::decode($refreshToken, new Key($secretKey, 'HS256'));
    } catch (Exception $e) {
      throw new Exception($e);
    }

    $userId = $refreshTokenData->sub;
    $user = User::find($userId);

    if (!$user) {
      throw new \Exception('User not found', 404);
    }

    Auth::login($user);

    // Генерируем новую пару токенов
    $newTokens = $this->generateTokens($userId, $secretKey);

    return [
      'access_token' => $newTokens['access_token'],
      'refresh_token' => $newTokens['refresh_token']
    ];
  }

  public function generateTokens($userId, $secretKey)
  {
    $accessTokenId = base64_encode(random_bytes(32));     // Уникальный идентификатор токена access
    $refreshTokenId = base64_encode(random_bytes(32));    // Уникальный идентификатор токена refresh
    $issuedAt = time();                                   // Время создания токена
    $accessExpire = $issuedAt + 60 * 60;                  // Срок действия токена (1 час)
    $refreshExpire = $issuedAt + 60 * 60 * 24 * 30;       // Срок действия refresh токена (30 дней)

    // Здесь мы формируем заголовок и тело access токена
    $accessTokenPayload = [
      'iat'  => $issuedAt,          // Время создания токена
      'exp'  => $accessExpire,      // Время истечения срока действия токена
      'sub'  => $userId,            // Идентификатор пользователя
      'jti'  => $accessTokenId,     // Уникальный идентификатор токена
      'type' => 'access'            // Тип токена (access)
    ];

    // Здесь мы формируем заголовок и тело refresh токена
    $refreshTokenPayload = [
      'iat'  => $issuedAt,                // Время создания токена
      'exp'  => $refreshExpire,           // Время истечения срока действия токена
      'sub'  => $userId,                  // Идентификатор пользователя
      'jti'  => $refreshTokenId,          // Уникальный идентификатор токена
      'type' => 'refresh'                 // Тип токена (refresh)
    ];

    // Подписываем access токен
    $accessToken = JWT::encode($accessTokenPayload, $secretKey, 'HS256');

    // Подписываем refresh токен
    $refreshToken = JWT::encode($refreshTokenPayload, $secretKey, 'HS256');

    return [
      'access_token' => $accessToken,
      'refresh_token' => $refreshToken
    ];
  }

  public function decodeToken($token, $secretKey)
{
    try {
        // Декодируем JWT токен
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        
        // Извлекаем идентификатор пользователя из декодированного токена
        $userId = $decoded->sub;
        
        // Возвращаем идентификатор пользователя
        return $userId;
    } catch (Exception $e) {
        // Если токен недействителен, обрабатываем ошибку
        return null;
    }
}


  // public function generate(Request $request)
  // {
  //     // Получаем идентификатор пользователя из запроса (предположим, что он передается)
  //     $userId = $request->input('user_id');

  //     // Проверяем, что передан идентификатор пользователя
  //     if (!$userId) {
  //       return response()->json(['error' => 'User ID is required'], 400);
  //     }

  //     // Получаем секретный ключ из переменных среды
  //     $secretKey = (string) config('app.jwt_secret');

  //     // Генерируем пару токенов
  //     $tokens = $this->generateTokens($userId, $secretKey);

  //     // Возвращаем токены в формате JSON
  //     return response()->json($tokens);
  // }
}
