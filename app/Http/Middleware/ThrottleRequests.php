<?php

namespace App\Http\Middleware;

use Illuminate\Cache\RateLimiter;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ThrottleRequests
{
    protected $limiter;

    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    public function handle($request, Closure $next, $maxAttempts = 60, $decaySeconds = 1)
    {
        $key = $request->ip(); // Используем IP пользователя как ключ

        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            return response('Too Many Attempts.', 429); // 429 - код ответа для "слишком многих запросов"
        }

        $this->limiter->hit($key, $decaySeconds);

        return $next($request);
    }
}
