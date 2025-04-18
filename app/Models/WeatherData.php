<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeatherData extends Model
{
    protected $fillable = [
        'city',
        'temperature',
        'description',
        'wind_speed',
        'humidity',
    ];
}
