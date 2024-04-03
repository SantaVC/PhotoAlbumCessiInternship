<?php

namespace App\Http\Controllers;

use App\Http\Controllers\TokenController;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends Controller
{
  protected $tokenController;

  protected $expirationTime;
  protected $path;
  protected $domain;
  protected $secure;
  protected $httpOnly;
  protected $secretKey;

  public function __construct(TokenController $tokenController)
  {
    $this->tokenController = $tokenController;

    $this->expirationTime = 1440;
    $this->path = '/';
    $this->domain = null;
    $this->secure = false;
    $this->httpOnly = true;

    $this->secretKey = (string) config('jwt.secret');
  }

  public function signup(SignupRequest $request)
  {
     Log::info('Signup data: ', $request->all());

     try {
      $data = $request->validated();

      if(!$data){
        throw ValidationException::withMessages([
          'email' => ['Invalid credentials']
        ]);
      }

      $user = new User();

      $user->fill([
        'email' => $data['email'],
        'password' => $data['password'],
        'nickname' => $data['nickname'],
      ]);

      $user->save();

      $generatedTokens = $this->tokenController->generateTokens($user->id, $this->secretKey);
      $refreshToken = $generatedTokens['refresh_token'];

      $response = response()->json([
        'user' => $user,
      ]);

      $response = $response->withCookie(Cookie::make('refresh_token', $refreshToken, $this->expirationTime, $this->path, $this->domain, $this->secure, $this->httpOnly));

       // Отправка письма для подтверждения email
      event(new Registered($user));

      return $response;
    } catch (\Illuminate\Validation\ValidationException $e) {
      return response()->json(['errors' => $e->errors()], 422);
    }
  }

  public function login(LoginRequest $request)
  {
    $credentials = $request->validated();

    Log::info('credentials: ', $request->validated());
    // Попытка аутентификации пользователя
    if (!Auth::attempt($credentials)) {
      // Если аутентификация не удалась, возвращаем ошибку
      throw ValidationException::withMessages([
        'email' => ['Invalid credentials'],
      ]);
    }

    $user = Auth::user();

    // Если аутентификация прошла успешно, генерируем токены и возвращаем ответ
    $generatedTokens = $this->tokenController->generateTokens($user->id, $this->secretKey);

    $accessToken = $generatedTokens['access_token'];
    $refreshToken = $generatedTokens['refresh_token'];

    $response = response()->json([
      'token' => $accessToken
    ]);

    $response = $response->withCookie(Cookie::make('refresh_token', $refreshToken, $this->expirationTime, $this->path, $this->domain, $this->secure, $this->httpOnly));

    return $response;
  }

  public function refresh(Request $request)
  {
    try{
      $newTokens = $this->tokenController->refreshTokens($request);

      $accessToken = $newTokens['access_token'];
      $refreshToken = $newTokens['refresh_token'];

      $response = response()->json([
        'token' => $accessToken
      ]);

      $response = $response->withCookie(Cookie::make('refresh_token', $refreshToken, $this->expirationTime, $this->path, $this->domain, $this->secure, $this->httpOnly));

      return $response;
    }
    catch (JWTException $e) {
      // Если возникает ошибка при обработке токена
      return response()->json(['error' => $e], 500);
    }
  }

  public function logout()
  {
    try {
      // Auth::logout();

      $response = response()->json(['message' => 'Logged out successfully']);

      // Удаляем токен из куки
      $response = $response->withCookie(Cookie::forget('refresh_token'));

      return $response;
    } catch (\Exception $e) {
      return response()->json(['error' => 'Logout failed'], 500);
    }
  }
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
