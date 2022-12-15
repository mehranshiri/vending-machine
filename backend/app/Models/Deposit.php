<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Deposit extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'user_id'
    ];

    public static function create_($request)
    {
        return self::create([
            'user_id' => Auth::id(),
            'amount' => $request->amount
        ]);
    }
}
