<?php


namespace Tests\Feature;


use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use stdClass;
use Tests\TestCase;

class BuyTest extends TestCase
{
    protected $token = '';

    public function test_buy_products()
    {
        $products[] = new stdClass();
        $products[0]->id = 1;
        $products[0]->amount = 10;
        $payload = ["products" => $products];

        $this->token = $this->authenticate();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->json('POST','api/buy', $payload);

        Log::info(1, [$response->getContent()]);

        if($this->token == '') {
            $response->assertStatus(Response::HTTP_UNAUTHORIZED);
        } else {
            $response->assertStatus(Response::HTTP_OK);
        }

    }

}
