<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Challenges\TenPinBowlingController;


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group([
    'auth' => 'user',
], function()
{
 
    Route::get('/dash',  [HomeController::class, 'dash'])->name('home');

    Route::group([
        'prefix' => 'ten-pin-bowling',
        'as' => 'game.'

    ], function()
    {
        Route::get('/index',  [TenPinBowlingController::class, 'list'])->name('list');
        Route::get('/game/{line}',  [TenPinBowlingController::class, 'show'])->name('show');
        Route::get('/intro', [TenPinBowlingController::class, 'intro'])->name('intro');
        Route::post('/create', [TenPinBowlingController::class, 'create'])->name('create');
        Route::get('/{line}/completed', [TenPinBowlingController::class, 'completed'])->name('completed');
        Route::get('/{line}/frame/{frame}/second-attempt',  [TenPinBowlingController::class, 'secondAttempt'])->name('second-attempt');
        Route::post('/{line}/frame/{frame}/second-attempt/save',  [TenPinBowlingController::class, 'secondAttemptStore'])->name('second-attempt.save');
        Route::get('/{line}/frame/{frame}/first-attempt',  [TenPinBowlingController::class, 'newFrameFirstAttempt'])->name('new-first-attempt');
        Route::post('/{line}/frame/{frame}/first-attempt/save',  [TenPinBowlingController::class, 'firstAttemptStore'])->name('first-attempt.save');
    });
   
});


/* ToDO:
 
Start on a new code for the poker cyber dojo challenge
*/