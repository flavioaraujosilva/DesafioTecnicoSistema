<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'sobrenome',
        'email',
        'data_nascimento',
    ];

    /**
     * Define a relação de um-para-muitos com o modelo Cartao.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cartoes()
    {
        return $this->hasMany(Cartao::class);
    }

    /**
     * Define a relação de um-para-muitos com o modelo Endereco.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function enderecos()
    {
        return $this->hasMany(Endereco::class);
    }

    /**
     * Define a relação de um-para-muitos com o modelo Telefone.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function telefones()
    {
        return $this->hasMany(Telefone::class);
    }
}