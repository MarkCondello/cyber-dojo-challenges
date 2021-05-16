@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
   
        <div class="col-md-8">
        <h2>Past Games</h2>
        <!-- ToDo: Get list of lines and display them -->
        @if($lines->count())
         <ul>
            @foreach($lines as $line)
            @if($line->total_score)
            <li>
                <a href="{{ route('game.show', $line ) }}">Game {{ $line->total_score}}</a>   
            </li>
            @endif
            @endforeach
         </ul>
        @else 
            <p>There are no saved games yet.</p>
        <!-- @dump($lines) -->
        @endif
        </div>
    </div>
</div>
@endsection