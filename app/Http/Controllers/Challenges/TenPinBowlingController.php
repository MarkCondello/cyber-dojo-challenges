<?php

namespace App\Http\Controllers\Challenges;

use App\Http\Controllers\Controller;
use App\Models\Lines;
use App\Models\Frames;

class TenPinBowlingController extends Controller
{

    public function list()
    {
        $lines = Lines::all();

        return view('ten-pin-bowling.list')
            ->with(compact(['lines' ]));
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

    // Show
    public function veryFirstAttempt(Lines $line, Frames $frame)
    {
        $msg = $frame->attemptMessage($frame->total ?? 0);
        $btnText = $frame->buttonMessage($frame->total ?? 0);
        $frames = $line->frames;
        $route = route('game.second-attempt.save', [$line, $frame]);
        return view('ten-pin-bowling.home')
            ->with(compact(['msg', 'btnText', 'route', 'frames']));  
    }

    public function firstAttemptStore(Lines $line, Frames $frame)
    {
        $frame->ball_1 = $line->generateAttempt();  //create a random score between 0 and 10
        $frame->total = $frame->ball_1;
        $frame->save();

        // Need checks to see if the previous frame has a strike or spare
        $prevFrameNumber = $frame->frame_number - 1;
        $prevFrame = $line->getFrameByNumber( $prevFrameNumber );
        if(isset($prevFrame)){
            if( $prevFrame->spare === 1){
                $prevFrame->spare_caryover = $frame->ball_1;
                $prevFrame->total += $frame->ball_1;
                $prevFrame->save();
            }
            
            if( $prevFrame->strike === 1){
                $prevFrame->strike_caryover = $frame->ball_1;
                $prevFrame->total += $frame->ball_1;
                $prevFrame->save();
            }
        }

        $beforePrevFrameNumber = $frame->frame_number - 2;
        $beforePrevFrame = $line->getFrameByNumber( $beforePrevFrameNumber );
        if(isset($beforePrevFrame) && $beforePrevFrame->strike === 1 && $prevFrame->strike === 1){
            $beforePrevFrame->strike_caryover += $frame->ball_1;
            $beforePrevFrame->total += $frame->ball_1;
            $beforePrevFrame->save();
        }
 
        //check if game is completed
        if($line->currentFrame() === 12 && !$prevFrame->isStrike() || $line->currentFrame() > 12){
            $line->total_score = $line->getTotal();
            $line->save();
            return redirect(route('game.completed', $line)); 
        }  else if($frame->isStrike()){ // create a new Frame and get the next frame
            $frame->strike = true;
            $frame->save();
            $newFrame = new Frames();
            $newFrame->line_id = $line->id;
            $newFrame->frame_number = $line->currentFrame();
            $newFrame->save();

            return redirect(route('game.new-first-attempt', ["line" => $line, "frame" => $newFrame->id]))->with('FlashMessage', 'Strike! Well done!');  //get route
        } else {
            return redirect(route('game.second-attempt', [$line, $frame]));//get route
        }
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
        $frame->ball_2 = $line->generateAttempt($frame->total);
        $frame->total = $frame->ball_1 + $frame->ball_2;
        $frame->save();

        if($frame->isSpare()){
            $frame->spare= true;
            $frame->save();
        }

        // Checks to see if the previous frame has a strike or spare
        $prevFrameNumber = $frame->frame_number - 1;
        $prevFrame = $line->getFrameByNumber( $prevFrameNumber );
        if(isset($prevFrame) && $prevFrame->strike === 1){
            $prevFrame->strike_caryover = $frame->ball_2;
            $prevFrame->total += $frame->ball_2;
            $prevFrame->save();
        }

        // Checks to see if the previous previous frame has a strike
        $beforePrevFrameNumber = $frame->frame_number - 2;
        $beforePrevFrame = $line->getFrameByNumber( $beforePrevFrameNumber );
        if(isset($beforePrevFrame) && $beforePrevFrame->strike === 1 && $prevFrame->strike === 1){
            $beforePrevFrame->strike_caryover += $frame->ball_2;
            $beforePrevFrame->total += $frame->ball_2;
            $beforePrevFrame->save();
        }

        if(($line->currentFrame() === 11 && !$frame->isSpare() && !$frame->isStrike()) || $line->currentFrame() === 12){
            $line->total_score = $line->getTotal();
            $line->save();

            return redirect(route('game.completed', $line)); 
        }  else {
            $newFrame = new Frames();
            $newFrame->line_id = $line->id;
            $newFrame->frame_number = $line->currentFrame();
            $newFrame->save();
            
            if($frame->isSpare()){
                return redirect(route('game.new-first-attempt', ["line" => $line, "frame" => $newFrame]))->with('FlashMessage', 'You rolled a Spare! Nice...');  //get route

            } else {
                return redirect(route('game.new-first-attempt', ["line" => $line, "frame" => $newFrame]));  //get route
            }

        }
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
        //dd("reached gameComplete method", $line);
        $msg = "Well done! You completed all the frames.";
        $btnText = "View your past games";
        $route = "#"; // View your past games
        $frames = $line->frames;
        $total = $line->total_score;
        return view('ten-pin-bowling.home')
            ->with(compact(['msg', 'btnText', 'route', 'frames', 'total', ]));
    }

}
