<?php

namespace App\Http\Controllers;

use App\Services\ViaCEPService;
use Illuminate\Http\Request;

class CEPController extends Controller
{
    protected $viaCEPService;

    /**
     * Construtor do controller de CEP.
     *
     * @param ViaCEPService $viaCEPService
     */
    public function __construct(ViaCEPService $viaCEPService)
    {
        $this->viaCEPService = $viaCEPService;
    }

    /**
     * Consulta um endereço pelo CEP.
     *
     * @param string $cep
     * @return \Illuminate\Http\JsonResponse
     */
    public function consultar($cep)
    {
        $endereco = $this->viaCEPService->consultar($cep);

        if (is_null($endereco)) {
            return response()->json(['message' => 'CEP não encontrado'], 404);
        }

        return response()->json($endereco);
    }
}