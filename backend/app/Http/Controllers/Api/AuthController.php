<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


class AuthController extends Controller
{
    public function login(Request $request)
    {

        // grab credentials from the request
        $credentials = $request->only('email', 'password');        

        // attempt to verify the credentials and create a token for the user
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }        
        
        $user = JWTAuth::authenticate($token);


        // all good so return the token
        return response()->json(compact('token', 'user'));
    }


    public function refresh(){

        $token = JWTAuth::getToken();
        $token = JWTAuth::refresh($token);

        return response()->json(compact('token'));
    }


    public function logout(){

        $token = JWTAuth::getToken();
        JWTAuth::invalidate('token');

        return response()->json('logout');
    }
    // somewhere in your controller
    public function me()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    public function render($request, Exception $exception)
    {
        if ($exception instanceof Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json(['token_expired'], $exception->getStatusCode());
        }else if ($exception instanceof Tymon\JWTAuth\Exceptions\JWTException) {
            return response()->json(['error' => $exception->getMessage()], $exception->getStatusCode());
        } else if ($exception instanceof Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json(['token_invalid'], $exception->getStatusCode());
        }else if ($exception instanceof Tymon\JWTAuth\Exceptions\TokenBlacklistedException){
            return response()->json(['error' => 'token_has_been_listed'], $exception->getStatusCode());
        }

        return parent::render($request, $exception);
    }
}
