<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogResponseCodeMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $statusCode = $response->getStatusCode();

        Log::info("Response status code: $statusCode");

        return $response;
    }
}
