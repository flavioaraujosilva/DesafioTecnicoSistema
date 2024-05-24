<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Endereco;
use Illuminate\Support\Facades\Log;

class EnderecoController extends Controller
{
    /**
     * Exibe o endereço de um cliente específico.
     *
     * @param int $clienteId
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($clienteId)
    {
        try {
            $endereco = Endereco::where('cliente_id', $clienteId)->first();
            return response()->json($endereco, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao buscar endereço: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao buscar endereço', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Atualiza o endereço de um cliente específico.
     *
     * @param Request $request
     * @param int $clienteId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $clienteId)
    {
        try {
            $validatedData = $this->validateEndereco($request);

            Log::info('Dados validados para atualização: ', $validatedData);

            $endereco = Endereco::updateOrCreate(
                ['cliente_id' => $clienteId],
                $validatedData
            );
            Log::info('Endereço atualizado: ', ['endereco' => $endereco]);

            return response()->json($endereco, 200);
        } catch (\Exception $e) {
            Log::error('Erro ao atualizar endereço: ' . $e->getMessage());
            return response()->json(['message' => 'Erro ao atualizar endereço', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Valida os dados do endereço.
     *
     * @param Request $request
     * @return array
     */
    private function validateEndereco(Request $request)
    {
        return $request->validate([
            'cep' => 'required|string|max:9',
            'logradouro' => 'required|string|max:255',
            'complemento' => 'nullable|string|max:255',
            'bairro' => 'required|string|max:255',
            'localidade' => 'required|string|max:255',
            'uf' => 'required|string|max:2',
            'cliente_id' => 'required|exists:clientes,id',
        ]);
    }
}