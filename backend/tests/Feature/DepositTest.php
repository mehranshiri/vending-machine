<?php


namespace Tests\Feature;


use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class DepositTest extends TestCase
{
    protected $token = '';

    public function test_create_deposit()
    {

        $payload = [
            "amount" => 20
        ];

        $this->token = $this->authenticate();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->json('POST','api/deposit', $payload);

        Log::info(1, [$response->getContent()]);

        if($this->token == '') {
            $response->assertStatus(Response::HTTP_UNAUTHORIZED);
        } else {
            $response->assertStatus(Response::HTTP_OK);
        }
    }

}
