<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WeatherData;

class WeatherDataController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'city' => 'required|string',
            'temperature' => 'required|numeric',
            'description' => 'required|string',
            'wind_speed' => 'required|numeric',
            'humidity' => 'required|integer',
        ]);

        WeatherData::create($validatedData);

        return response()->json(['message' => 'Weather data stored successfully']);
    }
}

