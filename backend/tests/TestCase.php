<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function authenticate()
    {
        $response = $this->json('post', 'api/login', [
            'username' => env('BUYER_USERNAME'),
            'password' => env('BUYER_PASSWORD')
        ]);

        if($response->status() === 200) {
            return $response->json("data")['token'];
        }

        return '';
    }

    public function sellerAuth()
    {
        $response = $this->json('post', 'api/login', [
            'username' => env('SELLER_USERNAME'),
            'password' => env('SELLER_PASSWORD')
        ]);

        if($response->status() === 200) {
            return $response->json("data");
        }

        return null;
    }
}
