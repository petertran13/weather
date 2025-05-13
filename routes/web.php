<?php

use App\Http\Controllers\WeatherDataController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
// Weather route
Route::get('/', function () {
    return Inertia::render('weatherPage');
});
Route::post('/weather', [WeatherDataController::class, 'store']);
Route::get('/weather', [WeatherDataController::class, 'index']);
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
