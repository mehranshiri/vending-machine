<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Product extends Model
{
    use HasFactory, SoftDeletes, HasFactory;

    protected $fillable = [
        'name',
        'cost',
        'available',
        'seller_id'
    ];

    public static function create_($request)
    {
        return self::create([
            'name' => $request->name,
            'cost' => $request->cost,
            'available' => $request->available,
            'seller_id' => Auth::id()
        ]);
    }

    public static function update_ ($request, $id)
    {
        return Product::where('id', $id)->update([
            'name' => $request->name,
            'cost' => $request->cost,
            'available' => $request->available
        ]);
    }
}
