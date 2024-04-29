<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


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
public function getPostImage(Request $request, $postId)
{
    $post = Post::find($postId);

    // Проверяем, найден ли пост
    if (!$post) {
        return response()->json(['error' => 'Пост не найден'], 404);
    }

    // Получаем путь к изображению поста
    $imagePath = $post->image_path;

    // Проверяем, существует ли файл
    if (!Storage::disk('public')->exists($imagePath)) {
        return response()->json(['error' => 'Файл изображения не найден'], 404);
    }

    // Читаем файл из хранилища
    $image = Storage::disk('public')->get($imagePath);

    // Возвращаем изображение как ответ
    return response($image)->header('Content-Type', 'image/jpeg');
}
public function deletePost($postId)
{
    // Находим пост по его ID
    $post = Post::find($postId);

    // Проверяем, найден ли пост
    if (!$post) {
        return response()->json(['error' => 'Пост не найден'], 404);
    }

    // Проверяем, принадлежит ли пост текущему пользователю
    if ($post->user_id !== Auth::id()) {
        return response()->json(['error' => 'Вы не авторизованы для удаления этого поста'], 403);
    }

    // Удаляем пост
    $post->delete();

    // Возвращаем успешный ответ
    return response()->json(['message' => 'Пост успешно удален'], 200);
}
}
