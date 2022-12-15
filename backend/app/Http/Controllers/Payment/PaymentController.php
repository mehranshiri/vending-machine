<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\BuyRequest;
use App\Http\Requests\DepositRequest;
use App\Models\Buy;
use App\Models\BuyProduct;
use App\Models\Deposit;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class PaymentController extends Controller
{
    public function deposit(DepositRequest $request)
    {
        $request->validated();
        Deposit::create_($request);
        $user = Auth::user();
        $user->deposit += $request->amount;
        $user->save();
        $user->deposits;

        return Response::success(Auth::user());
    }

    public function buyProducts(BuyRequest $request)
    {
        $request->validated();
        DB::beginTransaction();
        try {
            $total = $request::checkDeposit($request->products);

            $buy = Buy::create_($total);
            BuyProduct::addProducts($request->products, $buy->id);
            $change = User::subtractDeposit($total);

            DB::commit();

            $return = [
                'total' => $total,
                'products' => $buy->products
            ];
            if($this->checkChange($change)) {
                $return['change'] = $change;
            }
            return Response::success($return);
        } catch (\Exception $exception) {
            DB::rollBack();
            return Response::error($exception->getMessage());
        }

    }

    private function checkChange($change) {
        return in_array($change, Config::get('constants.coins'));
    }

    public function getBuys()
    {
        return Response::success(Buy::where('user_id', Auth::id())->with('products')->get());
    }

    public function getBuy($id)
    {
        $buy = Buy::where('id', $id)->with('products')->first();
        return Response::success($buy);
    }

    public function reset()
    {
        $user = Auth::user();
        $user->deposit = 0;
        $user->save();
        $user->deposits()->where('user_id', $user->id)->delete();

        return Response::success(Auth::user());
    }
}
