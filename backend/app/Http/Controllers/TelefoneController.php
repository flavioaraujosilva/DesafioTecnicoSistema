<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Telefone;

class TelefoneController extends Controller
{
    /**
     * Lista todos os telefones.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json(Telefone::all());
    }

    /**
     * Armazena um novo telefone.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $this->validateTelefone($request);

        $telefone = Telefone::create($validatedData);
        return response()->json($telefone, 201);
    }

    /**
     * Exibe um telefone específico.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $telefone = Telefone::find($id);
        if ($telefone) {
            return response()->json($telefone);
        }
        return response()->json(['message' => 'Telefone não encontrado'], 404);
    }

    /**
     * Atualiza um telefone específico.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validatedData = $this->validateTelefone($request);

        $telefone = Telefone::find($id);
        if ($telefone) {
            $telefone->update($validatedData);
            return response()->json($telefone);
        }
        return response()->json(['message' => 'Telefone não encontrado'], 404);
    }

    /**
     * Remove um telefone específico.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $telefone = Telefone::find($id);
        if ($telefone) {
            $telefone->delete();
            return response()->json(null, 204);
        }
        return response()->json(['message' => 'Telefone não encontrado'], 404);
    }

    /**
     * Valida os dados do telefone.
     *
     * @param Request $request
     * @return array
     */
    private function validateTelefone(Request $request)
    {
        return $request->validate([
            'numero' => 'required|string|max:20',
        ]);
    }
}