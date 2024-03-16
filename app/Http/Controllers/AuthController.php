<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
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

        // Устанавливаем куку
        $response->withCookie(Cookie::make('token', $token, /* Время жизни куки */));

        return $response;
    }

    // public function refresh(Request $request)
    // {
    //   try {
    //     // Get the current token from the request
    //     $currentToken = $request->bearerToken();

    //     // Refresh the token
    //     $newToken = JWTAuth::refresh($currentToken);

    //     // Create a new response with the new token
    //     $response = response()->json(['token' => $newToken]);

    //     // Attach the new token to a cookie
    //     $cookie = Cookie::make('token', $newToken, /* Время жизни куки */);
    //     $response->withCookie($cookie);

    //     return $response;
    //   } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
    //     return response()->json(['error' => 'Token expired'], 401);
    //   } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
    //     return response()->json(['error' => 'Token invalid'], 401);
    //   } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
    //     return response()->json(['error' => 'JWT exception'], 500);
    //   }
    // }

    public function refresh(Request $request)
    {
        try {
            $currentToken = JWTAuth::parseToken()->getToken();
            $newToken = JWTAuth::refresh($currentToken);

            // Обновляем куку с новым токеном
            $response = response()->json(['token' => $newToken]);
            $response->withCookie(Cookie::make('token', $newToken, /* Время жизни куки */));

            return $response;
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'JWT exception'], 500);
        }
    }

    public function testAPI()
    {
        return response()->json(['message' => 'Hello World!']);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
