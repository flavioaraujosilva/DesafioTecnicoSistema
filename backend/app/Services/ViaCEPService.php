<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ViaCEPService
{
    public function consultar($cep)
    {
        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

        if ($response->failed()) {
            return null;
        }

        return $response->json();
    }
}