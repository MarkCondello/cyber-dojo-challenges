@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
   
        <div class="col-md-8">
        <h2>Past Games</h2>
        <!-- ToDo: Get list of lines and display them -->
        @dump($lines)
        </div>
    </div>
</div>
@endsection