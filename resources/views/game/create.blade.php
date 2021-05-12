@extends('layouts.app')

@section('content')
    @component('partials.game-layout', ['frames' => $frames])
        @section('buttonSection')

        <form action="{{ $route }}" method="POST"> 
            @csrf
            <button class="btn btn-primary" >{{ $btnText }} btn</button>
        </form>
        @endsection
    @endcomponent
@endsection

<!-- We only need the home view, this is redundant -->
