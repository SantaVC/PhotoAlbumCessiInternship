<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function getImage($imageName)
    {
        // Путь к сохраненной картинке из базы данных
        $imagePath = 'avatars/' . $imageName; // Измените на ваш реальный путь

        // Чтение файла из директории проекта
        $image = Storage::get($imagePath);

        // Возвращаем изображение как ответ
        //
        return response($image)->header('Content-Type', 'image/jpeg');
    }
}
