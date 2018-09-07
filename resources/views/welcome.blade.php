<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Tester</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="{{ asset('css/master.css') }}">
        <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('css/dataTables.bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('css/buttons.dataTables.min.css') }}">
        <style media="screen">

        div.dataTables_info {
    padding:7px; // Add !important for right aligned on mobiles
}
        </style>

    </head>
    <body>
      <nav class="navbar navbar-default navbar-fixed-top">
    		<ul class="nav navbar-nav">

        </ul>
	    </nav>
	    <br><br><br><br>
      <div class="container">

  		   {{ csrf_field() }}
  		<div class="table-responsive text-center">
  			<table class="table table-borderless" id="table">
  				<thead>
  					<tr>
  						<th class="text-center">OederID</th>
  						<th class="text-center">Ship Name</th>
              <th class="text-center">Freight</th>
  						<th class="text-center">Actions</th>
  					</tr>
  				</thead>
  				@foreach($data as $item)
  				<tr class="item{{$item->id}}">
  					<td>{{$item->id}}</td>
  					<td>{{$item->name}}</td>
            <td>{{number_format($item->freight,2)}}</td>
  					<td><button class="edit-modal btn btn-info" data-id="{{$item->id}}"
  							data-name="{{$item->name}}" data-name="{{$item->name}}" data-freight="{{$item->freight}}">
  							<span ></span> Edit
  						</button>
  						<button class="delete-modal btn btn-danger"
  							data-id="{{$item->id}}" >
  							<span ></span> Delete
  						</button></td>
  				</tr>
  				@endforeach
  			</table>

  		</div>
  	</div>
  	<div id="myModal" class="modal fade" role="dialog">
  		<div class="modal-dialog">
  			<!-- Modal content-->
  			<div class="modal-content">
  				<div class="modal-header">
  					<button type="button" class="close" data-dismiss="modal">&times;</button>
  					<h4 class="modal-title"></h4>
  				</div>
  				<div class="modal-body">
  					<form class="form-horizontal" role="form">
  						<div class="form-group " id="formid">
  							<label class="control-label col-sm-2" for="id">ID:</label>
  							<div class="col-sm-10">
  								<input type="text" class="form-control" id="fid" disabled>
  							</div>
  						</div>
  						<div class="form-group" id="formname">
  							<label class="control-label col-sm-2" for="name">Name:</label>
  							<div class="col-sm-10">
  								<input type="name" class="form-control" id="n">
                  <span class="text-danger ">
                    <strong id="nerror"> </strong>
                  </span>
                  <span id="feedbackn" ></span>
  							</div>
  						</div>
              <div class="form-group" id="formfreight">
  							<label class="control-label col-sm-2" for="freight">Freight:</label>
  							<div class="col-sm-10">
  								<input type="number" step="0.01" class="form-control" id="f">
                  <span class="text-danger ">
                    <strong id="ferror"> </strong>
                  </span>
                  <span id="feedbackf" ></span>
  							</div>
  						</div>
  					</form>
  					<div class="deleteContent">
  						Are you Sure you want to delete <span class="dname"></span> ? <span
  							class="hidden did"></span>
  					</div>
  					<div class="modal-footer">
  						<button type="button" class="btn actionBtn" >
  							<span id="footer_action_button" class='glyphicon'> </span>
  						</button>
  						<button type="button" class="btn btn-warning" data-dismiss="modal">
  							 Close
  						</button>
  					</div>
  				</div>
  			</div>
		  </div>
      </div>

      <script src="{{ asset('js/app.js') }}"></script>
      <script src="{{ asset('js/jquery.dataTables.min.js') }}"></script>
      <script src="{{ asset('js/dataTables.bootstrap.min.js') }}"></script>
      <script src="{{ asset('js/dataTables.buttons.min.js') }}"></script>

      <script src="{{ asset('js/script.js') }}"></script>
    </body>
</html>
