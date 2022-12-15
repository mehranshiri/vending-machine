<?php

namespace App\Http\Controllers\User;

use App\Helpers\validatorHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $request->validated();
        $user = User::create_($request->all());
        $token = $user->createToken('full_stack_access_token')->plainTextToken;
        return Response::success([
            "user" => $user,
            "token" => $token
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if($user = User::find($id)) {
            return Response::success($user);
        }
        return Response::error('Not found', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(validatorHelper::requestValidator($request, [
            'username' => 'required',
            'password' => 'sometimes|min:4',
        ])) {
            $user = User::update_($request);
            return Response::success($user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Auth::user()->delete();
        return Response::success(['user' => 'User removed!']);
    }
}
