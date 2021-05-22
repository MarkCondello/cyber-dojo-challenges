<?php
namespace App\Services;

use App\Models\Lines;
use App\Models\Frames;

class TenPinBowlingService {


    public static function firstAttempt(Lines $line, Frames $frame)
    {
        $frame->ball_1 = $line->generateAttempt();  //create a random score between 0 and 10
        $frame->total = $frame->ball_1;
        $frame->save();

        // Checks to see if the previous frame has a strike or spare
        $prevFrameNumber = $frame->frame_number - 1;
        $prevFrame = $line->getFrameByNumber( $prevFrameNumber );
        if(isset($prevFrame)){

            if( $prevFrame->isSpare() ){
                // ISSPARE NOT WORKING PROPERLY
                $prevFrame->spare_caryover = $frame->ball_1;
                $prevFrame->total += $frame->ball_1;
                $prevFrame->save();
            }
            
            if( $prevFrame->isStrike() ){
                $prevFrame->strike_caryover = $frame->ball_1;
                $prevFrame->total += $prevFrame->strike_caryover;
                $prevFrame->save();
            }
        }

        $beforePrevFrameNumber = $frame->frame_number - 2;
        $beforePrevFrame = $line->getFrameByNumber( $beforePrevFrameNumber );
        if(isset($beforePrevFrame) && $beforePrevFrame->isStrike() && $prevFrame->isStrike()){
           
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

    public static function secondAttempt(Lines $line, Frames $frame)
    {
        $frame->ball_2 = $line->generateAttempt($frame->total);
        $frame->total = $frame->ball_1 + $frame->ball_2;
        $frame->save();

        if($frame->isSpare()){
            $frame->spare= true;
            $frame->save();
        }

        // Checks if the previous frame has a strike or spare
        $prevFrameNumber = $frame->frame_number - 1;
        $prevFrame = $line->getFrameByNumber( $prevFrameNumber );
        if(isset($prevFrame) && $prevFrame->strike === 1){
            $prevFrame->strike_caryover = $frame->ball_2;
            $prevFrame->total += $frame->ball_2;
            $prevFrame->save();
        }

        // Checks if the previous previous frame has a strike
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
        } else {
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
}

?>