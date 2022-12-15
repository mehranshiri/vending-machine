<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuyProduct extends Model
{
    use HasFactory;

    protected $table = "buy_to_products";

    protected $fillable = [
        'buy_id',
        'product_id',
        'amount'
    ];

    public static function addProducts($products, $buyId)
    {
        foreach ($products as $product) {
            BuyProduct::create([
                'buy_id' => $buyId,
                'product_id' => $product["id"],
                'amount' => $product["amount"]
            ]);

            // subtract from product
            $productModel = Product::find($product["id"]);
            $productModel->available -= $product["amount"];
            $productModel->save();
        }
        return true;
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
