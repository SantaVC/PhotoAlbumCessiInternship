<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

// class ImageController extends Controller
// {
//     public function getImage($imageName)
//     {
//         // Путь к сохраненной картинке из базы данных
//         $imagePath = 'avatars/' . $imageName; // Измените на ваш реальный путь

//         // Чтение файла из директории проекта
//         $image = Storage::get($imagePath);

//         // Возвращаем изображение как ответ
//         //
//         return response($image)->header('Content-Type', 'image/jpeg');
//     }
// }
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
use App\Models\UserInfo;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class ImageController extends Controller
{
    public function getImage(Request $request, $imageName)
    {
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
        $profile = $user->profile;
        // Получаем путь к сохраненному изображению
        $imagePath = $profile->avatar;

        // Чтение файла из директории проекта
        $image = Storage::get($imagePath);

        // Возвращаем изображение как ответ
        return response($image)->header('Content-Type', 'image/jpeg');
    }
}