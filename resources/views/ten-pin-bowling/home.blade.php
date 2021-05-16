@extends('layouts.app')

@section('content')
    @component('ten-pin-bowling.partials.game-layout', [
        'frames' => $frames ?? null, 
        'msg' => $msg ?? null,
        'total' => $total ?? null,
        ])
        @section('buttonSection')
        @if(isset($route))
        <form action="{{ $route }}" method="POST"> 
            @csrf
            <button class="btn btn-primary" >{{ $btnText }}</button>
        </form>
        @elseif($btnLink)
            <a href="{{ $btnLink}}" class="btn btn-primary" >{{ $btnText }}</a>
        @endif
        @endsection
    @endcomponent
@endsection
