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
use App\Services\TokenAuthService;
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
    public function getImage(Request $request)
    {
        
      $user = TokenAuthService::authenticateUserFromToken($request);
      $profile = $user->profile;
      // Получаем путь к сохраненному изображению
      $imagePath = $profile->avatar;

      // Чтение файла из директории проекта
      $image = Storage::get($imagePath);

      // Возвращаем изображение как ответ
      return response($image)->header('Content-Type', 'image/jpeg');
    }
}
