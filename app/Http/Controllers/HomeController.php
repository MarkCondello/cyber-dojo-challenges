<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lines;
use App\Models\Frames;


class HomeController extends Controller
{
 
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function dash()
    {
        // $msg = "Welcome to ten pin bowling score system.";
        // $btnText = "Roll your first frame.";
        // $route = route('game.create');
        return view('dash');
     }

}
