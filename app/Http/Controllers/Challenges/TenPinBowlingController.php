<?php

namespace App\Http\Controllers\Challenges;

use App\Http\Controllers\Controller;
use App\Models\Lines;
use App\Models\Frames;
use App\Services\TenPinBowlingService;

class TenPinBowlingController extends Controller
{

    public function list()
    {
        $lines = Lines::all();

        return view('ten-pin-bowling.list')
            ->with(compact(['lines' ]));
    }

    public function show(Lines $line)
    {
        $total = $line->total_score ?? 0;
        $frames = $line->frames;
        
        return view('ten-pin-bowling.show')
            ->with(compact(['frames', 'total' ]));
    }

    public function intro()
    {
        $msg = "Welcome to ten pin bowling score system.";
        $btnText = "Roll your first frame.";
        $route = route('game.create');
        return view('ten-pin-bowling.home')
            ->with(compact(['msg', 'btnText', 'route']));
    }

    public function create()
    {
        $line = new Lines();
        $line->user_id = auth()->user()->id;
        $line->save();

        $frame = new Frames();
        $frame->line_id = $line->id;
        $frame->frame_number = 1;
         
       return $this->firstAttemptStore($line, $frame);
    }

    public function firstAttemptStore(Lines $line, Frames $frame)
    {
       return TenPinBowlingService::firstAttempt($line, $frame);
    }

    // Show
    public function newFrameFirstAttempt(Lines $line, Frames $frame)
    {
        $msg = "Continue with your game...";
        $btnText = "Roll the first attempt for frame " . $frame->frame_number;
        $frames = $line->frames;
        $route = route('game.first-attempt.save', [$line, $frame]);
        return view('ten-pin-bowling.home')
            ->with(compact(['msg', 'btnText', 'route', 'frames']));  
    }

    public function secondAttemptStore(Lines $line, Frames $frame)
    {
        return TenPinBowlingService::secondAttempt($line, $frame);
    }

    public function secondAttempt(Lines $line, Frames $frame)
    {
        $msg = $frame->attemptMessage($frame->total);
        $btnText = $frame->buttonMessage($frame->total);
        $route = route('game.second-attempt.save', ['line' => $line, 'frame' => $frame->id]); // $frame is newFrame from secondAttemptStore
        $frames = $line->frames;
        return view('ten-pin-bowling.home')
            ->with(compact(['msg', 'btnText', 'route', 'frames']));
    }

    public function completed(Lines $line )
    {
        $msg = "Well done! You completed all the frames.";
        $btnText = "View your past games";
        $btnLink = route('game.list'); // View your past games
        $frames = $line->frames;
        $total = $line->total_score;
        return view('ten-pin-bowling.home')
            ->with(compact(['msg', 'btnText', 'btnLink', 'frames', 'total', ]));
    }

}
