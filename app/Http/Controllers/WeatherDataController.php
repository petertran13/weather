<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\WeatherData;
use Illuminate\Validation\ValidationException;

class WeatherDataController extends Controller
{
    public function index()
    {
        $weatherData = WeatherData::all();
        return response()->json($weatherData);
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'city' => 'required|string',
                'temperature' => 'required|numeric',
                'description' => 'required|string',
                'wind_speed' => 'required|numeric',
                'humidity' => 'required|integer',
            ]);

            WeatherData::create($validatedData);

            return response()->json(['message' => 'Weather data stored successfully'], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error storing weather data', 'error' => $e->getMessage()], 500);
        }
    }
}

