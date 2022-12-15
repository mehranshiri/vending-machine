<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class BuyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'products' => ['required']
        ];
    }

    public static function checkDeposit($products)
    {
        $total = 0;
        foreach ($products as $req_product) {
            $product = Product::find($req_product['id']);
            if($product["available"] < $req_product["amount"]) {
                throw new \Exception("there is only " . $product["available"] . " of " . $product["name"]);
            }
            $total += ($req_product["amount"] * (int) $product["cost"]);
        }
        if($total > Auth::user()->deposit) {
            throw new HttpResponseException(Response::error([
                'deposit' => ["you don't have enough deposit"]
            ], 400));
        }

        return $total;
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(Response::error($validator->errors()));
    }
}
