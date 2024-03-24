<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;

class AuthController extends Controller
{
  public function verifyEmail(Request $request, $id, $hash)
  {
    $user = User::findOrFail($id);

    if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
      return response()->json(['error' => 'Invalid verification link'], 401);
    }

    if ($user->hasVerifiedEmail()) {
      return response()->json(['message' => 'Email already verified'], 200);
    }

    if ($user->markEmailAsVerified()) {
      event(new Verified($user));
      return response()->json(['message' => 'Email successfully verified'], 200);
    }

    return response()->json(['error' => 'Failed to verify email'], 500);
  }

  public function resendVerificationEmail(Request $request)
  {
    if ($request->user()->hasVerifiedEmail()) {
      return response()->json(['message' => 'Email already verified'], 200);
    }

    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Email verification link sent']);
  }

  public function signup(SignupRequest $request)
  {
    Log::info('Signup data: ', $request->all());
    try {
      $data = $request->validated();

      $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'nickname' => $data['nickname']
      ]);

      $token = JWTAuth::fromUser($user);

        $response = response()->json([
            'user' => $user,
            'token' => $token
      ]);

      // Устанавливаем куку
      $response->withCookie(Cookie::make('token', $token, /* Время жизни куки */));

      $user->sendEmailVerificationNotification();

      return $response;
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

      $response = response()->json([
          'user' => $user,
          'token' => $token
      ]);

      $expirationTime = 1440;

      // Set path to '/'
      $path = '/';

      // Set domain to null for all subdomains
      $domain = null;

      // Set secure flag to true if using HTTPS
      $secure = false;

      $httpOnly = true;

      // Устанавливаем куку
      $response->withCookie(Cookie::make('token', $token, $expirationTime, $path, $domain, $secure, $httpOnly));

      return $response;
  }

  public function refresh(Request $request)
  {
    try {
      $currentToken = JWTAuth::parseToken()->getToken();
      $newToken = JWTAuth::refresh($currentToken);

      // Update the cookie with the new token
      $response = response()->json(['token' => $newToken]);
      $response->withCookie(Cookie::make('token', $newToken, /* Cookie parameters here */));

      return $response;
    } catch (TokenExpiredException $e) {
      return response()->json(['error' => 'Token expired'], 401);
    } catch (TokenInvalidException $e) {
      return response()->json(['error' => 'Token invalid'], 401);
    } catch (JWTException $e) {
      return response()->json(['error' => 'JWT exception'], 500);
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

  protected function registered($user)
  {
    $user->sendEmailVerificationNotification();
  }
}
