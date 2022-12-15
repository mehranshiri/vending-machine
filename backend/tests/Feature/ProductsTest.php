<?php


namespace Tests\Feature;


use App\Models\Product;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\TestCase;
use function Termwind\ValueObjects\p;

class ProductsTest extends TestCase
{

    protected $token = '';

    public function test_anyone_can_see_product()
    {
        $product = Product::factory()->create();
        $response = $this->get("api/products/".$product->id);

        $response->assertJson([
            'data' => [
                'name' => $product->name
            ]
        ]);
    }

    public function test_user_can_edit_a_product()
    {
        $auth = $this->sellerAuth();
        $this->token = $auth['token'];

        $product = Product::where('seller_id', $auth['user']['id'])->first();
        $product->name = 'Updated name';

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->json('PUT','api/products/'.$product->id, $product->toArray());

        Log::info(1, [$response->getContent()]);

        $this->assertDatabaseHas('products', ['id' => $product->id, 'name' => 'Updated name']);
    }

    public function test_user_can_store_a_product()
    {
        $auth = $this->sellerAuth();
        $this->token = $auth['token'];

        $payload = [
            'name' => Str::random(20),
            'cost' => rand(0, 1000),
            'available' => rand(0, 1000),
            'seller_id' => $auth['user']['id']
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' .$this->token,
        ])->json('POST', 'api/products', $payload);

        Log::info(1, [$response->getContent()]);

        $response->assertStatus(Response::HTTP_OK);
    }

    public function test__user_can_delete_product()
    {
        $auth = $this->sellerAuth();

        $product = Product::where('seller_id', $auth['user']['id'])->first();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' .$this->token,
        ])->json('delete', 'api/products/' . $product->id);

        Log::info(1, [$product->toArray()]);

        $response->assertStatus(Response::HTTP_OK);
    }
}
