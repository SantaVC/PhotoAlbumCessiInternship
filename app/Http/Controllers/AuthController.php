<?php

namespace App\Http\Controllers;

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
        'nickname' => $data['nickname'],
      ]);
      $token = $user->createToken('main')->plainTextToken;

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
      $remember = $credentials['remember'] ?? false;
      unset($credentials['remember']);

      if (!Auth::attempt($credentials, $remember)) {
        return response([
          'error' => 'Invalid credentials'
        ], 422);
      }
      $user = Auth::user();
      $token = $user->createToken('main')->plainTextToken;

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
