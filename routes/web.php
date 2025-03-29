<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
// Weather route
Route::get('/weather', function () {
    return Inertia::render('weatherPage');  // This will map to 'resources/js/pages/WeatherPage.tsx'
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
