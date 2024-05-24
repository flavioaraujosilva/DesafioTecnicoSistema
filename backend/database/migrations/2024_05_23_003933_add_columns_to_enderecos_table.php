<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToEnderecosTable extends Migration
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
                // Rename 'rua' to 'logradouro' if it exists, otherwise add 'logradouro'
                if (Schema::hasColumn('enderecos', 'rua')) {
                    $table->renameColumn('rua', 'logradouro');
                } else {
                    $table->string('logradouro')->after('cep');
                }
            }
            if (!Schema::hasColumn('enderecos', 'complemento')) {
                $table->string('complemento')->nullable()->after('logradouro');
            }
            if (!Schema::hasColumn('enderecos', 'bairro')) {
                $table->string('bairro')->after('complemento');
            }
            if (!Schema::hasColumn('enderecos', 'localidade')) {
                // Rename 'cidade' to 'localidade' if it exists, otherwise add 'localidade'
                if (Schema::hasColumn('enderecos', 'cidade')) {
                    $table->renameColumn('cidade', 'localidade');
                } else {
                    $table->string('localidade')->after('bairro');
                }
            }
            if (!Schema::hasColumn('enderecos', 'uf')) {
                // Rename 'estado' to 'uf' if it exists, otherwise add 'uf'
                if (Schema::hasColumn('enderecos', 'estado')) {
                    $table->renameColumn('estado', 'uf');
                } else {
                    $table->string('uf', 2)->after('localidade');
                }
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
            if (Schema::hasColumn('enderecos', 'logradouro')) {
                $table->dropColumn('logradouro');
            }
            if (Schema::hasColumn('enderecos', 'complemento')) {
                $table->dropColumn('complemento');
            }
            if (Schema::hasColumn('enderecos', 'bairro')) {
                $table->dropColumn('bairro');
            }
            if (Schema::hasColumn('enderecos', 'localidade')) {
                $table->dropColumn('localidade');
            }
            if (Schema::hasColumn('enderecos', 'uf')) {
                $table->dropColumn('uf');
            }
        });
    }
}