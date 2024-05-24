<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartaosTable extends Migration
{
    public function up()
    {
        Schema::create('cartaos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained()->onDelete('cascade');
            $table->string('numero');
            $table->string('nome');
            $table->string('validade');
            $table->string('cvv');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cartaos');
    }
}