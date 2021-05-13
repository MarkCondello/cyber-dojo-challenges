@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
    
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dash</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    <p>The items listed here are challenges found in <a href="https://cyber-dojo.org/creator/home">CyberDojo</a></p>
                 </div>
            </div>
        </div>
    </div>
</div>
@endsection
