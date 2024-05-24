<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Cliente;

class ClienteTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Teste para listar clientes.
     *
     * @return void
     */
    public function test_listar_clientes()
    {
        // Cria alguns clientes para testar
        Cliente::factory()->count(3)->create();

        $response = $this->getJson('/api/clientes');

        $response->assertStatus(200)
                 ->assertJsonCount(3)
                 ->assertJsonStructure([
                     '*' => ['id', 'nome', 'sobrenome', 'email', 'data_nascimento', 'created_at', 'updated_at']
                 ]);
    }

    /**
     * Teste para criar um novo cliente.
     *
     * @return void
     */
    public function test_criar_cliente()
    {
        $clienteData = [
            'nome' => 'John',
            'sobrenome' => 'Doe',
            'email' => 'john.doe@example.com',
            'data_nascimento' => '1990-01-01',
        ];

        $response = $this->postJson('/api/clientes', $clienteData);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'id', 'nome', 'sobrenome', 'email', 'data_nascimento', 'created_at', 'updated_at'
                 ]);

        $this->assertDatabaseHas('clientes', $clienteData);
    }

    /**
     * Teste para exibir um cliente específico.
     *
     * @return void
     */
    public function test_exibir_cliente()
    {
        $cliente = Cliente::factory()->create();

        $response = $this->getJson("/api/clientes/{$cliente->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'id', 'nome', 'sobrenome', 'email', 'data_nascimento', 'created_at', 'updated_at'
                 ])
                 ->assertJson([
                     'id' => $cliente->id,
                     'nome' => $cliente->nome,
                     'sobrenome' => $cliente->sobrenome,
                     'email' => $cliente->email,
                     'data_nascimento' => $cliente->data_nascimento,
                 ]);
    }

    /**
     * Teste para atualizar um cliente.
     *
     * @return void
     */
    public function test_atualizar_cliente()
    {
        $cliente = Cliente::factory()->create();

        $updateData = [
            'nome' => 'Jane',
            'sobrenome' => 'Doe',
            'email' => 'jane.doe@example.com',
        ];

        $response = $this->putJson("/api/clientes/{$cliente->id}", $updateData);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'id', 'nome', 'sobrenome', 'email', 'data_nascimento', 'created_at', 'updated_at'
                 ])
                 ->assertJson($updateData);

        $this->assertDatabaseHas('clientes', $updateData);
    }

    /**
     * Teste para deletar um cliente.
     *
     * @return void
     */
    public function test_deletar_cliente()
    {
        $cliente = Cliente::factory()->create();

        $response = $this->deleteJson("/api/clientes/{$cliente->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('clientes', ['id' => $cliente->id]);
    }
}