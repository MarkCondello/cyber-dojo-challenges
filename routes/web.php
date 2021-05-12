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
use App\Http\Controllers\GameController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group([
        'auth' => 'user',
        'as' => 'game.'
    ], function()
    {
    Route::get('/home',  [GameController::class, 'home'])->name('home');
//  ToDo: Add list
    // Route::get('/games/list',  [GameController::class, 'list'])->name('list');

    Route::group([
        'prefix' => 'game'
    ], function()
    {
        Route::post('/create', [GameController::class, 'create'])->name('create');
        Route::get('/{line}/completed', [GameController::class, 'completed'])->name('completed');

 
        Route::get('/{line}/frame/{frame}/second-attempt',  [GameController::class, 'secondAttempt'])->name('second-attempt');
        Route::post('/{line}/frame/{frame}/second-attempt/save',  [GameController::class, 'secondAttemptStore'])->name('second-attempt.save');
     

        Route::get('/{line}/frame/{frame}/first-attempt',  [GameController::class, 'veryFirstAttempt'])->name('first-attempt');

//This seems like a poor design
        Route::get('/{line}/frame/{frame}/first-attempt',  [GameController::class, 'newFrameFirstAttempt'])->name('new-first-attempt');

        Route::post('/{line}/frame/{frame}/first-attempt/save',  [GameController::class, 'firstAttemptStore'])->name('first-attempt.save');
    });
});


/* ToDO:
Add debug bar
Add Flash messages DONE
Check if veryFirstAttempt is in use
Split out stores into service layer.
Add this application to its own namespace 

Start on a new code dojo challenge
*/