<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingColumnsToCartaosTable extends Migration
{
    public function up()
    {
        Schema::table('cartaos', function (Blueprint $table) {
            if (!Schema::hasColumn('cartaos', 'nome')) {
                $table->string('nome')->after('numero');
            }
            if (!Schema::hasColumn('cartaos', 'validade')) {
                $table->string('validade')->after('nome');
            }
        });
    }

    public function down()
    {
        Schema::table('cartaos', function (Blueprint $table) {
            if (Schema::hasColumn('cartaos', 'nome')) {
                $table->dropColumn('nome');
            }
            if (Schema::hasColumn('cartaos', 'validade')) {
                $table->dropColumn('validade');
            }
        });
    }
}