<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;

class EmailNotificationVerificationController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->route('welcome');
        }

        $cacheKey = 'last_email_verification_sent_' . $user->id;

        if (Cache::has($cacheKey)) {
            $lastSentTime = Cache::get($cacheKey);
            $currentTime = now();

            if ($currentTime->diffInMinutes($lastSentTime) < 5) {
                return back()->with('message', 'You can only send verification email every 5 minutes');
            }
        }

        $user->notify(new VerifyEmailNotification($user, $request->user()));

        Cache::put($cacheKey, now(), 5 * 60);

        return back()->with('message', 'Email sent');
    }

    public function calculateRemainingTime($userId)
    {
        $cacheKey = 'last_email_verification_sent_' . $userId;
        $lastSentTime = Cache::get($cacheKey);
        if (!$lastSentTime) {
            return 0;
        }

        $currentTime = now();
        $remainingSeconds = max(0, 5 * 60 - $currentTime->diffInSeconds($lastSentTime));

        return $remainingSeconds;
    }

    public function showResendForm(Request $request)
    {
        $remainingTime = $this->calculateRemainingTime($request->user()->id);

        return view('verify-email', ['remainingSeconds' => $remainingTime]);
    }
    
    public function getRemainingTime(Request $request)
    {
        $remainingTime = $this->calculateRemainingTime($request->user()->id);
        return response()->json(['remainingSeconds' => $remainingTime]);
    }

}
