<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Frames extends Model
{
    use HasFactory;

    public function firstAttempt():bool
    {
        return isset($this->ball_1) && !isset($this->ball_2);
    }

    public function frameCompleted():bool
    {
        return isset($this->ball_2);
    }

    public function isStrike():bool
    {
        return $this->ball_1 === 10;
    }

    public function isSpare():bool
    {
        return $this->ball_1 + $this->ball_2 === 10;
    }

    public function attemptMessage(int $total):string
    {
        if($this->firstAttempt()){
            if($total < 10 && $total > 0){
                return "You hit ${total} pins. Bowl again.";
            }
            elseif($total === 0) {
                return "You hit the gutter. Try again.";
            } else {
                return "You rolled a strike! Well done.";
            }
        } else {         //ToDO: add second attempt logic
            if($total < 10 && $total > 0){
                return "You hit ${total} pins. Bowl your next frame.";
            }
            elseif($total === 0) {
                return "You hit the gutter. Bowl your next frame.";
            } else {
                return "You rolled a spare! Good job.";
            }
        }
    }

    public function buttonMessage(int $total):string
    {
        if($this->firstAttempt()){
            if($total < 10){
                return "Complete the frame.";
            }
            return "Strike! Bowl the next frame.";
        } else { //ToDO: add second attempt logic
            if($total < 10){
                return "Move to next frame.";
            }
            return "Spare! Bowl the next frame.";
        }
        

    }

    public function line()
    {
        return $this->hasOne(Lines::class, 'line_id');
    }
}
