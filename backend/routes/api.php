<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\CartaoController;
use App\Http\Controllers\EnderecoController;
use App\Http\Controllers\TelefoneController;
use App\Http\Controllers\CEPController;

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

Route::apiResource('clientes', ClienteController::class);
Route::apiResource('cartoes', CartaoController::class);
Route::apiResource('enderecos', EnderecoController::class);
Route::apiResource('telefones', TelefoneController::class);

// Rota para consultar o CEP usando a API ViaCEP
Route::get('cep/{cep}', [CEPController::class, 'consultar']);


Route::get('clientes/{clienteId}/cartoes', [CartaoController::class, 'index']);
Route::get('cartoes', [CartaoController::class, 'index']);


Route::get('clientes/{clienteId}/endereco', [EnderecoController::class, 'show']);
Route::put('clientes/{clienteId}/endereco', [EnderecoController::class, 'update']);