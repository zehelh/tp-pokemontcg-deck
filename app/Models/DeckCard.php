<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeckCard extends Model
{
    use HasFactory;

    protected $table = 'deck_card';

    protected $fillable = [
        'deck_id',
        'card_api_id',
        'name',
        'quantity',
    ];
}
