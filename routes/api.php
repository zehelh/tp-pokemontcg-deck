<?php

use App\Http\Controllers\DeckController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


route::apiResource('deck', DeckController::class);

route::get('deck/{id}/cards', [DeckController::class, 'getCardOfDeck']);
route::put('deck/{id}/card', [DeckController::class, 'decrementCardOfDeck']);
route::post('deck/{id}/card', [DeckController::class, 'setCardOfDeck']);
