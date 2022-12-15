<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\validatorHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        if (validatorHelper::requestValidator(
            $request,['username' => ['required'],'password' => ['required', 'min:4']])
        ){
            // Check authentication
            $user = User::where('username', $request->username)->first();
            if($user instanceof User) {
                if(Hash::check($request->password, $user->password)) {
                    Auth::login($user);
                    $token = $user->createToken('full_stack_access_token')->plainTextToken;
                    return Response::success([
                        "user" => $user,
                        "token" => $token
                    ]);
                }
                return Response::error([
                    'password' => 'Login failed, incorrect password!'
                ], 401);
            }
            return Response::error([
                'username' => 'Login failed, incorrect username!'
            ], 401);
        }
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return Response::success(["user" => 'logged out!']);
    }

    public function logoutAll()
    {
        Auth::user()->tokens()->delete();
        return Response::success(["user" => 'logged out!']);
    }

    public function getMe()
    {
        return Response::success(Auth::user());
    }

    protected function unauthorized()
    {
        return Response::error('Unauthorized', 401);
    }

    public function getTokens()
    {
         return Response::success(Auth::user()->tokens()->get());
    }
}
