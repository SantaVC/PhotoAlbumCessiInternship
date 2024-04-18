<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $profile = $user->profile;
        return response()->json(['user' => $user, 'profile' => $profile]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        // Если у пользователя нет профиля, создаем его
        if (!$profile) {
            $profile = new UserInfo();
            $profile->user_id = $user->id;
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars');
            $profile->avatar = $avatarPath; // заменил avatar_path на avatar
        }

        // Обновляем профиль пользователя
        $profile->updateOrCreate(
          ['user_id' => $user->id], // Условие поиска профиля
          $request->all() // Данные для обновления
        );

        return response()->json(['message' => 'Profile updated successfully', 'profile' => $profile]);
    }

    public function changePassword(Request $request)
{
    $validator = Validator::make($request->all(), [
        'oldPassword' => 'required|string',
        'newPassword' => 'required|string|min:6|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $user = Auth::user();

    // Проверяем, совпадает ли введенный старый пароль с текущим паролем пользователя
    if (!Hash::check($request->oldPassword, $user->password)) {
        return response()->json(['errors' => ['oldPassword' => ['Old password is incorrect.']]], 422);
    }

    // Обновляем пароль пользователя
    $user->update(['password' => ($request->newPassword)]);

    return response()->json(['message' => 'Password changed successfully']);
}
    public function changeNickname(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nickname' => 'required|string|max:255|unique:users',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $user->update(['nickname' => $request->nickname]);

        return response()->json(['message' => 'Nickname changed successfully']);
    }
}
