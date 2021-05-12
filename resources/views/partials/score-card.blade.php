 
<table class="table table-bordered" id="score-card">
  <thead>
    <tr>
      <th scope="col">{{ __('Player') }}</th>
      @for($i = 1; $i < 11; $i++)
      <th scope="col">{{$i}}</th>
      @endfor
      <th scope="col">{{ __('Total') }}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{{ auth()->user()->name }}</th>
        @for($i = 0; $i < 10; $i++)
        <td>
          <div class="frame">
            {{ $frames[$i]->total ?? null }}
              <div class="attempts">
                  <span>
                    @if(isset($frames[$i]->ball_1))
                        @if($frames[$i]->strike)
                            X
                        @else 
                            {{$frames[$i]->ball_1}}
                        @endif
                    @else

                    @endif
                </span>
                  <span>
                    @if(isset($frames[$i]->ball_2))
                        @if($frames[$i]->spare)
                            /
                        @else 
                            {{$frames[$i]->ball_2}}
                        @endif
                    @else

                    @endif</span>
              </div>
          </div>
        </td>
        @endfor
        <td>{{ $total ?? 'N/A'}} </td>
    </tr>
 
  </tbody>
</table>


 