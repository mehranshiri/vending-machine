<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'password',
        'deposit',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public static function create_($request)
    {
        return self::create([
            'username' => $request['username'],
            'password' => Hash::make($request['password']),
            'role' => $request['role']
        ]);
    }

    public static function update_($request)
    {
        $user = Auth::user();
        $user->username = $request->username;
        if($request->password) $user->password = Hash::make($request->password);
        $user->save();

        return $user;
    }

    /**
     * @return HasMany
     */
    public function deposits() {
        return $this->hasMany(Deposit::class, 'user_id', 'id');
    }

    public static function subtractDeposit($amount)
    {
        $user = Auth::user();
        $change = $user->deposit - $amount;
        $user->deposit = $change;
        $user->save();
        return $change;
    }
}
