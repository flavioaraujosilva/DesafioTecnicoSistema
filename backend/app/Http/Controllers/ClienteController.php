<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    /**
     * Lista todos os clientes com paginação.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $clientes = Cliente::with(['telefones', 'enderecos', 'cartoes'])->paginate(10);
            return response()->json($clientes);
        } catch (\Exception $e) {
            Log::error('Erro ao listar clientes: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao listar clientes', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Armazena um novo cliente.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clientes,email',
            'data_nascimento' => 'required|date',
            'telefones.*.numero' => 'required|string|max:20',
            'enderecos.*.cep' => 'required|string|max:9',
            'enderecos.*.logradouro' => 'required|string|max:255',
            'enderecos.*.complemento' => 'nullable|string|max:255',
            'enderecos.*.bairro' => 'required|string|max:255',
            'enderecos.*.localidade' => 'required|string|max:255',
            'enderecos.*.uf' => 'required|string|max:2',
            'cartoes.*.numero' => 'required|string|max:19',
            'cartoes.*.nome' => 'required|string|max:255',
            'cartoes.*.validade' => 'required|string|max:5',
            'cartoes.*.cvv' => 'required|string|max:4',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            Log::error('Erro de validação ao salvar cliente: ', ['errors' => $errors]);
            return response()->json(['message' => 'Erro de validação', 'errors' => $errors], 422);
        }

        try {
            $validatedData = $validator->validated();

            Log::info('Dados validados: ', $validatedData);

            $cliente = Cliente::create($validatedData);
            Log::info('Cliente criado: ', ['cliente' => $cliente]);

            if ($request->has('enderecos')) {
                $cliente->enderecos()->createMany($request->enderecos);
                Log::info('Endereços associados ao cliente: ', ['enderecos' => $request->enderecos]);
            }

            if ($request->has('telefones')) {
                $cliente->telefones()->createMany($request->telefones);
                Log::info('Telefones associados ao cliente: ', ['telefones' => $request->telefones]);
            }

            if ($request->has('cartoes')) {
                $cliente->cartoes()->createMany($request->cartoes);
                Log::info('Cartões associados ao cliente: ', ['cartoes' => $request->cartoes]);
            }

            return response()->json($cliente, 201);
        } catch (\Exception $e) {
            Log::error('Erro ao salvar cliente: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao salvar cliente', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Exibe os detalhes de um cliente específico.
     *
     * @param \App\Models\Cliente $cliente
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Cliente $cliente)
    {
        try {
            return response()->json($cliente);
        } catch (\Exception $e) {
            Log::error('Erro ao exibir cliente: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao exibir cliente', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Atualiza os dados de um cliente específico.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Cliente $cliente
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Cliente $cliente)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|required|string|max:255',
            'sobrenome' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:clientes,email,' . $cliente->id,
            'data_nascimento' => 'sometimes|required|date',
            'telefones.*.numero' => 'sometimes|required|string|max:20',
            'enderecos.*.cep' => 'sometimes|required|string|max:9',
            'enderecos.*.logradouro' => 'sometimes|required|string|max:255',
            'enderecos.*.complemento' => 'nullable|string|max:255',
            'enderecos.*.bairro' => 'sometimes|required|string|max:255',
            'enderecos.*.localidade' => 'sometimes|required|string|max:255',
            'enderecos.*.uf' => 'sometimes|required|string|max:2',
            'cartoes.*.numero' => 'sometimes|required|string|max:19',
            'cartoes.*.nome' => 'sometimes|required|string|max:255',
            'cartoes.*.validade' => 'sometimes|required|string|max:5',
            'cartoes.*.cvv' => 'sometimes|required|string|max:4',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            Log::error('Erro de validação ao atualizar cliente: ', ['errors' => $errors]);
            return response()->json(['message' => 'Erro de validação', 'errors' => $errors], 422);
        }

        try {
            $validatedData = $validator->validated();

            Log::info('Dados validados para atualização: ', $validatedData);

            $cliente->update($validatedData);

            if ($request->has('enderecos')) {
                $cliente->enderecos()->delete();
                $cliente->enderecos()->createMany($request->enderecos);
                Log::info('Endereços atualizados para o cliente: ', ['enderecos' => $request->enderecos]);
            }

            if ($request->has('telefones')) {
                $cliente->telefones()->delete();
                $cliente->telefones()->createMany($request->telefones);
                Log::info('Telefones atualizados para o cliente: ', ['telefones' => $request->telefones]);
            }

            if ($request->has('cartoes')) {
                $cliente->cartoes()->delete();
                $cliente->cartoes()->createMany($request->cartoes);
                Log::info('Cartões atualizados para o cliente: ', ['cartoes' => $request->cartoes]);
            }

            return response()->json($cliente);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar cliente: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar cliente', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove um cliente específico.
     *
     * @param \App\Models\Cliente $cliente
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Cliente $cliente)
    {
        try {
            $cliente->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Erro ao deletar cliente: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao deletar cliente', 'error' => $e->getMessage()], 500);
        }
    }
}