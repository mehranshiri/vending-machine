<?php


namespace App\Helpers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class validatorHelper
{
    public static function requestValidator($request, $rules)
    {
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return Response::error($errors)->send();
        }

        return true;
    }

}
