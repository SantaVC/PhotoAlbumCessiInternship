<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtCookieProvider extends ServiceProvider
    {
        protected $request;
    
        public function __construct()
        {
            
        }
    
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot(Request $request)
    {
        // Проверяем, что пользователь аутентифицирован
        if (Auth::check()) {
            // Получаем refresh token из куки
            $refreshToken = $request->cookie('refresh_token');
    
            // Проверяем, что передан refresh token
            if ($refreshToken) {
                try {
                    $this->refreshTokens($request);
                } catch (\Exception $e) {
                    // Обработка ошибок
                }
            }
        }
    }

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
        return $user;
    }
}