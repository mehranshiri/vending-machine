<?php

namespace App\Http\Middleware;

use App\Models\Product;
use Closure;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class ProductMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $product =  Product::where('id', $request->route('product'))->where('seller_id', Auth::id())->first();
        if(!$product) {
            throw new HttpResponseException(Response::error([
                'user' => ['you are not allowed to edit or remove this product']
            ], 403));
        }
        $request['product'] = $product;
        return $next($request);
    }
}
