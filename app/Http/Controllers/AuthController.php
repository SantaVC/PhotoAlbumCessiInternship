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
use Tymon\JWTAuth\Facades\JWTAuth;
class AuthController extends Controller
{
  
  protected $tokenController;

  public function __construct(TokenController $tokenController)
  {
      $this->tokenController = $tokenController;
  }

  public function signup(SignupRequest $request)
  {
     Log::info('Signup data: ', $request->all());
     try {
         $data = $request->validated();
         $user = new User();
         $user->fill([
          'email' => $data['email'],
          'password' => bcrypt($data['password']),
          'nickname' => $data['nickname']
      ]);
      $user->save();
     $tokens = $this->tokenController->generate($request);

      return response()->json(['tokens' => $tokens]);
    } catch (\Illuminate\Validation\ValidationException $e) {
      return response()->json(['errors' => $e->errors()], 422);
    }
  }

  public function login(LoginRequest $request)
  {
      $credentials = $request->validated();

      if (!$token = JWTAuth::attempt($credentials)) {
          return response()->json(['error' => 'Invalid credentials'], 422);
      }

      $user = Auth::user();

      // Генерация токенов через контроллер токенов
      $tokens = $this->tokenController->generate($request);

      // Устанавливаем куку с access токеном
      $response = response()->json([
          'user' => $user,
          'tokens' => $tokens
      ]);

      $expirationTime = 1440;
      $path = '/';
      $domain = null;
      $secure = false;
      $httpOnly = true;

      $response->withCookie(Cookie::make('token', $tokens['access_token'], $expirationTime, $path, $domain, $secure, $httpOnly));

      return $response;
  }


  public function refresh(Request $request)
    {
        try {
            // Вызываем функцию обновления токенов из контроллера токенов
            $tokens = $this->tokenController->refreshAllTokens($request);

            // Возвращаем новые токены
            return response()->json(['tokens' => $tokens]);
        } catch (\Exception $e) {
            // Если возникает ошибка при обновлении токенов
            return response()->json(['error' => 'Could not refresh tokens'], 500);
        }
    }


  public function logout()
  {
    try {
      // Удаляем токен из куки
      $response = response()->json(['message' => 'Logged out successfully']);
      $response->withCookie(Cookie::forget('token'));
      return $response;
    } catch (\Exception $e) {
      return response()->json(['error' => 'Logout failed'], 500);
    }
  }
}
