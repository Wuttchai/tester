$(document).ready(function() {
  document.getElementById("formid").style.display = "none";

  $('#table').DataTable( {
       dom: 'Bfrtip',
       buttons: [
           {
               text: 'Insert',

           }
       ]
   } );
  $('.dt-button').addClass('btn btn-primary');
  $('.dataTables_info').addClass('text-right');

  $('.dt-button').attr('id', 'addshow');
  $('.dt-button').removeClass('dt-button');
  $(document).on('click', '.edit-modal', function() {
        $('#nerror').removeClass('hidden');
        $('#nerror').text("");
        $('#formname').removeClass('has-error has-feedback');
        $('#feedbackn').removeClass('glyphicon glyphicon-remove form-control-feedback');
        $('#ferror').text("");
        $('#formfreight').removeClass('has-error has-feedback');
        $('#feedbackf').removeClass('glyphicon glyphicon-remove form-control-feedback');
        $('#footer_action_button').text("Update");
        $('#footer_action_button').addClass('glyphicon-check');
        $('#footer_action_button').removeClass('glyphicon-trash');
        $('.actionBtn').addClass('btn-success');
        $('.actionBtn').removeClass('btn-danger');
        $('.actionBtn').addClass('edit');
        $('.actionBtn').text('Edit');
        $('.modal-title').text('Edit');
        $('.actionBtn').attr('onclick', 'edit()');
        $('.deleteContent').hide();
        $('.form-horizontal').show();
        $('#fid').val($(this).data('id'));
        $('#n').val($(this).data('name'));
        $('#f').val($(this).data('freight'));
        $('#myModal').modal('show');
    });
    $(document).on('click', '.delete-modal', function() {
        $('#footer_action_button').text(" Delete");
        $('#footer_action_button').removeClass('glyphicon-check');
        $('#footer_action_button').addClass('glyphicon-trash');
        $('.actionBtn').removeClass('btn-success');
        $('.actionBtn').addClass('btn-danger');
        $('.actionBtn').addClass('delete');
        $('.actionBtn').text('Delete');
        $('.modal-title').text('Delete');
        $('.did').text($(this).data('id'));
        $('.deleteContent').show();
        $('.form-horizontal').hide();
        $('.dname').html($(this).data('name'));
        $('#myModal').modal('show');
    });

    $("#addshow").click(function() {
      $('#n').val('');
      $('#f').val('');
      $('#nerror').removeClass('hidden');
      $('#nerror').text("");
      $('#formname').removeClass('has-error has-feedback');
      $('#feedbackn').removeClass('glyphicon glyphicon-remove form-control-feedback');
      $('#ferror').text("");
      $('#formfreight').removeClass('has-error has-feedback');
      $('#feedbackf').removeClass('glyphicon glyphicon-remove form-control-feedback');
      $('#footer_action_button').addClass('glyphicon-check');
      $('#footer_action_button').removeClass('glyphicon-trash');
      $('.actionBtn').addClass('btn-success');
      $('.actionBtn').removeClass('btn-danger');
      $('.actionBtn').text('Insert');
      $('.modal-title').text('Insert');
      $('.modal-title').addClass('text-center');
      $('.deleteContent').hide();
      $('.form-horizontal').show();
      $('.actionBtn').attr('onclick', 'add()');
      $('#myModal').modal('show');
    });


    $('.modal-footer').on('click', '.delete', function() {
        $.ajax({
            type: 'post',
            url: '/deleteItem',
            data: {
                '_token': $('input[name=_token]').val(),
                'id': $('.did').text()
            },
            success: function(data) {
                $('.item' + $('.did').text()).remove();
                $('#myModal').modal('hide');
            }
        });
    });

});
function add() {
  $('#nerror').removeClass('hidden');
  $('#nerror').text("");
  $('#formname').removeClass('has-error has-feedback');
  $('#feedbackn').removeClass('glyphicon glyphicon-remove form-control-feedback');
  $('#ferror').text("");
  $('#formfreight').removeClass('has-error has-feedback');
  $('#feedbackf').removeClass('glyphicon glyphicon-remove form-control-feedback');
    $.ajax({
        type: 'post',
        url: '/addItem',
        data: {
            '_token': $('input[name=_token]').val(),
            'name': document.getElementById("n").value,
            'freight': document.getElementById("f").value
        },
        success: function(data) {
            if ((data.errors)){
              $('.error').removeClass('hidden');
              if (data.errors.name) {
                $('#nerror').text(data.errors.name);
                $('#formname').addClass('has-error has-feedback');
                $('#feedbackn').addClass('glyphicon glyphicon-remove form-control-feedback');
              }
              if (data.errors.freight) {
                $('#ferror').text(data.errors.freight);
                $('#formfreight').addClass('has-error has-feedback');
                $('#feedbackf').addClass('glyphicon glyphicon-remove form-control-feedback');
              }
            }
            else {
                Low = parseFloat(data.freight).toFixed(2);
                $('#table').append("<tr class='item" + data.id + "'><td>" + data.id + "</td><td>" + data.name + "</td><td>" + Low  + "</td><td><button class='edit-modal btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "'><span class='glyphicon glyphicon-edit'></span> Edit</button> <button class='delete-modal btn btn-danger' data-id='" + data.id + "' data-name='" + data.name + "'><span class='glyphicon glyphicon-trash'></span> Delete</button></td></tr>");
                $('#myModal').modal('hide');
                $('#n').val('');
                $('#f').val('');
                $('#nerror').text('');
                $('#ferror').text('');
            }
        },

    });


};
    function edit() {
      $('#nerror').removeClass('hidden');
      $('#nerror').text("");
      $('#formname').removeClass('has-error has-feedback');
      $('#feedbackn').removeClass('glyphicon glyphicon-remove form-control-feedback');
      $('#ferror').text("");
      $('#formfreight').removeClass('has-error has-feedback');
      $('#feedbackf').removeClass('glyphicon glyphicon-remove form-control-feedback');
        $.ajax({
            type: 'post',
            url: '/editItem',
            data: {
                '_token': $('input[name=_token]').val(),
                'id': $("#fid").val(),
                'name': document.getElementById("n").value,
                'freight': document.getElementById("f").value
            },
            success: function(data) {
              if ((data.errors)){

                if (data.errors.name) {
                  $('#nerror').text(data.errors.name);
                  $('#formname').addClass('has-error has-feedback');
                  $('#feedbackn').addClass('glyphicon glyphicon-remove form-control-feedback');
                }
                if (data.errors.freight) {
                  $('#ferror').text(data.errors.freight);
                  $('#formfreight').addClass('has-error has-feedback');
                  $('#feedbackf').addClass('glyphicon glyphicon-remove form-control-feedback');
                }
              }else {
                Low = parseFloat(data.freight).toFixed(2);
                $('.item' + data.id).replaceWith("<tr class='item" + data.id + "'><td>" + data.id + "</td><td>" + data.name + "</td><td>" + Low + "</td><td><button class='edit-modal btn btn-info' data-id='" + data.id + "' data-name='" + data.name + "' data-freight='" + data.freight + "'><span class='glyphicon glyphicon-edit'></span> Edit</button> <button class='delete-modal btn btn-danger' data-id='" + data.id + "' data-name='" + data.name + "' data-freight='" + data.freight + "' ><span class='glyphicon glyphicon-trash'></span> Delete</button></td></tr>");
                $('#myModal').modal('hide');
                $('#n').val('');
                $('#f').val('');
                $('#nerror').text('');
                $('#ferror').text('');
              }
            }
        });

    };
