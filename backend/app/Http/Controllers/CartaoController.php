<?php
// App\Http\Controllers\CartaoController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cartao;
use Illuminate\Support\Facades\Log;

class CartaoController extends Controller
{
    /**
     * Lista os cartões de um cliente específico.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $clienteId = $request->query('cliente_id');
            if ($clienteId) {
                $cartoes = Cartao::where('cliente_id', $clienteId)->get();
            } else {
                $cartoes = Cartao::all();
            }
            return response()->json($cartoes, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao listar cartões: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao listar cartões', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Armazena um novo cartão.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $this->validateCartao($request);

            Log::info('Dados validados: ', $validatedData);

            $cartao = Cartao::create($validatedData);
            Log::info('Cartão criado: ', ['cartao' => $cartao]);

            return response()->json($cartao, 201);
        } catch (\Exception $e) {
            Log::error('Erro ao salvar cartão: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao salvar cartão', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Atualiza um cartão existente.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $this->validateCartao($request);

            Log::info('Dados validados para atualização: ', $validatedData);

            $cartao = Cartao::findOrFail($id);
            $cartao->update($validatedData);
            Log::info('Cartão atualizado: ', ['cartao' => $cartao]);

            return response()->json($cartao, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar cartão: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar cartão', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Exclui um cartão existente.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $cartao = Cartao::findOrFail($id);
            $cartao->delete();
            Log::info('Cartão excluído: ', ['cartao' => $cartao]);

            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Erro ao excluir cartão: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao excluir cartão', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Valida os dados do cartão.
     *
     * @param Request $request
     * @return array
     */
    private function validateCartao(Request $request)
    {
        return $request->validate([
            'numero' => 'required|string|max:19',
            'nome' => 'required|string|max:255',
            'validade' => 'required|string|max:5',
            'cvv' => 'required|string|max:4',
            'cliente_id' => 'required|exists:clientes,id',
        ]);
    }
}