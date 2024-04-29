<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    // Метод для отображения формы создания поста
    public function createPost(Request $request)
{
    $user = Auth::user();
    $posts = $user->posts;

    // Валидация данных
    $validator = Validator::make($request->all(), [
        'description' => 'nullable|string|max:255',
        'image_path' => 'nullable|image|max:2048',
    ]);

    // Если данные не проходят валидацию, возвращаем ошибки
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Создаем новый пост или обновляем существующий, если он уже существует у пользователя
    $post = $posts ? $posts : new Post();
    $post->user_id = $user->id;

    // Добавляем описание, если оно было передано
    if ($request->has('description')) {
        $post->description = $request->description;
    }

    // Сохраняем изображение, если оно было загружено
    if ($request->hasFile('image_path')) {
        $imagePath = $request->file('image_path')->store('uploads', 'public');
        $post->image_path = $imagePath;
    }

    // Сохраняем пост
    $post->save();

    return response()->json(['message' => 'Пост успешно создан'], 200);
}
}