<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
  public function signup(SignupRequest $request)
  {
    Log::info('Signup data: ', $request->all());
    try {
      $data = $request->validated();

      /*@var \App\Models\User $user */
      $user = User::create([
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
        'nickname' => $data['nickname']
      ]);
      $token = JWTAuth::fromUser($user);

      return response([
          'user' => $user,
          'token' => $token
      ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
      return response()->json(['errors' => $e->errors()], 422);
    }
  }

  public function login(LoginRequest $request)
  {
      $credentials = $request->validated();
      $token = JWTAuth::attempt($credentials);
  
      if (!$token) {
          return response()->json(['error' => 'Invalid credentials'], 422);
      }
      $user = Auth::user();
      return response([
          'user' => $user, 
          'token' => $token
      ]);
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
