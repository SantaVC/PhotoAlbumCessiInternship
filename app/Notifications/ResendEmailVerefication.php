<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;

class EmailVerificationResendController extends Controller
{
    public function resend(Request $request)
    {
        $user = $request->user(); // Получите текущего пользователя (предполагается, что аутентификация выполняется)
        $user->notify(new EmailVerificationNotification($user)); // Отправка уведомления об адресе электронной почты снова

        return response()->json(['message' => 'Уведомление oб адресе электронной почты отправлено повторно']);
    }
}