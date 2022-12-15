<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        Response::macro('success', function($data='', $httpCode=200) {
            return Response()->json([
                'status' => true,
                'data' => $data,
                'error' => []
            ], $httpCode);
        });

        Response::macro('error', function ($error='', $httpCode=400) {
            return Response()->json([
                'status' => false,
                'code' => $httpCode,
                'data' => [],
                'error' => $error
            ], $httpCode);
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
