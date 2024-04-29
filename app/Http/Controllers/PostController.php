<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
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

        // Валидация данных
        $validator = Validator::make($request->all(), [
          'image' => 'image|max:2048',
          'description' => 'nullable|string|max:255',
        ]);

        // Если данные не проходят валидацию, возвращаем ошибки
        if ($validator->fails()) {
          return response()->json(['errors' => $validator->errors()], 422);
        }

        $post = new Post();
        $post->user_id = $user->id;

        // Добавляем описание, если оно было передано
        if ($request->has('description')) {
          $post->description = $request->description;
        }

        // Сохраняем изображение, если оно было загружено
        if ($request->hasFile('image')) {
          $imagePath = $request->file('image')->store('uploads');
          $post->image_path = $imagePath;
        }

        // Сохраняем пост
        $post->save();

        return response()->json(['message' => 'Post created successfully', 'post' => $post ], 200);
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

    public function getPostImage(Request $request)
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

        $imagePath = $user->posts->$userId->image_path;

      // Проверяем, найден ли пост
      if (!$imagePath) {
        return response()->json(['error' => 'Пост не найден'], 404);
      }

      $image = Storage::get($imagePath);

      Log::info('$image: ', $image);

      // Проверяем, существует ли файл
      if (!$image) {
        return response()->json(['error' => 'Файл изображения не найден'], 404);
      }

      // Возвращаем изображение как ответ
      return response($image)->header('Content-Type', 'image/jpeg');
    }

    public function getPosts()
    {
      $user = Auth::user();
      $posts = $user->posts;

      if (!$posts) {
        return response()->json(['error' => 'No posts found'], 404);
      }

      return response()->json($posts, 200);
    }

}
