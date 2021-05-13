<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
        @include('ten-pin-bowling.partials.score-card')
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"> {{$msg ?? ''}}</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    @yield('buttonSection')
                </div>
            </div>
        </div>
    </div>
</div>