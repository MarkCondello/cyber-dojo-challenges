@extends('layouts.app')

@section('content')
@component('partials.game-layout', [
    'frames' => $frames ?? null, 
    'msg' => $msg ?? null,
    'total' => $total ?? null,
    ])
        @section('buttonSection')
        <form action="{{ $route }}" method="POST"> 
            @csrf
            <button class="btn btn-primary" >{{ $btnText }}</button>
        </form>
        @endsection
    @endcomponent

    @isset($prevFrame)
        @dump($prevFrame)
    @endisset
@endsection
