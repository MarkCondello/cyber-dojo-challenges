<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lines extends Model
{
    use HasFactory;
 
    // Create a method to get the frame by frame_number 
    function getFrameByNumber(int $frame_number)
    {
        return $this->frames->filter(function($frame) use ($frame_number){
            if(isset($frame->total) && $frame->frame_number === $frame_number){
                return $frame;
            }
          
        })->first();
    }

    //create a method to build a message if the frame by frame_number is a strike or spare

    //check if the game is complete
    // public function isCompleted()
    // {
    //     return $this->frames->count() === 10;
    // }

    public function getTotal()
    {
        return $this->frames->reduce(function($carry, $frame){
            return $carry + $frame->total;
        }, 0);  
    }

    public function currentFrameCount():int
    {
        return $this->frames->count();
    }

    public function currentFrame():int
    {
        return $this->currentFrameCount() + 1;
    }

    public function generateAttempt(int $pinsRemaining = null):int
    {
        return rand(0, 10 - $pinsRemaining ?? 10);
    }

    public function user()
    {
        return $this->belongsTo(User::class);    
    }

    public function frames()
    {
        return $this->hasMany(Frames::class, 'line_id');    
    }
}