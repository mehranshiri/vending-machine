<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Buy extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total'
    ];

    public static function create_($total)
    {
        return Buy::create([
            'user_id' => Auth::id(),
            'total' => $total
        ]);
    }

    public function products()
    {
        return $this->hasMany(BuyProduct::class)->with('product');
    }
}
