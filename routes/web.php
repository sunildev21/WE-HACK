<?php

use App\Http\Controllers\AIConsultantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Grouping authenticated & verified routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // AI Chat endpoints
    Route::post('/api/ai-consult', [AIConsultantController::class, 'consult'])
        ->name('ai.consult');
        
    Route::get('/chat-history', [AIConsultantController::class, 'history'])
        ->name('chat.history');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
