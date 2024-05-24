<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AdjustColumnsInEnderecosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('enderecos', function (Blueprint $table) {
            if (!Schema::hasColumn('enderecos', 'logradouro')) {
                $table->renameColumn('rua', 'logradouro');
            }
            if (!Schema::hasColumn('enderecos', 'localidade')) {
                $table->renameColumn('cidade', 'localidade');
            }
            if (!Schema::hasColumn('enderecos', 'uf')) {
                $table->renameColumn('estado', 'uf');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('enderecos', function (Blueprint $table) {
            $table->renameColumn('logradouro', 'rua');
            $table->renameColumn('localidade', 'cidade');
            $table->renameColumn('uf', 'estado');
        });
    }
}