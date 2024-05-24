<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveDataValidadeFromCartaosTable extends Migration
{
    public function up()
    {
        Schema::table('cartaos', function (Blueprint $table) {
            if (Schema::hasColumn('cartaos', 'data_validade')) {
                $table->dropColumn('data_validade');
            }
        });
    }

    public function down()
    {
        Schema::table('cartaos', function (Blueprint $table) {
            $table->string('data_validade')->nullable();
        });
    }
}