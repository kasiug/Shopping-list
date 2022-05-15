$( document ).ready(function() {
    // $.ajax({
    //     type: "GET",
    //     url: "https://covid19.mathdro.id/api/daily",
    //     dataType: "json",
    //     success: function (result,) {
    //         console.log(result)

            
    //         // var table = $("<table><tr><th>Weather Description</th></tr>");

    //         // table.append("<tr><td>City:</td><td>" + result["name"] + "</td></tr>");
    //         // table.append("<tr><td>Country:</td><td>" + result["sys"]["country"] + "</td></tr>");
    //         // table.append("<tr><td>Current Temperature:</td><td>" + result["main"]["temp"] + "°C</td></tr>");
    //         // table.append("<tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>");
    //         // table.append("<tr><td>Weather:</td><td>" + result["weather"][0]["description"] + "</td></tr>");

    //         // $("#message").html(table);
    //     },
    //     error: function (xhr, status, error) {
    //         alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    //     }
    // });
    $.get( "http://localhost:3000/shopping-list")
        .done(function( data ) {
        var index = 0;
            data.forEach(element => {
                $('tbody').append(`
                    <tr id="row-${element.id}">
                        <th scope="row">${++index}</th>
                        <td>${element.name}</td>
                        <td>${element.category}</td>
                        <td>${element.quantity}</td>
                        <td>${element.unit}</td>
                        <td>
                            <button ctype="button" class="btn btn-light"data-toggle="modal" data-target="#addModal" data-id="${element.id}">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="${element.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>`);
            });
    });
});

$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)

    var id = button.data('id');
    $('#deleteElement').attr('data-value', id);
  })

  $('#deleteElement').on('click', function () {
        var id = $(this).attr('data-value');
        $(`#row-${id}`).remove();
    });

  $('#addElement').on('click', function () {
  
    // Adding a row inside the tbody.
    $('tbody').append(`
        <tr id="row-4">
            <th scope="row">1</th>
            <td>Rafal</td>
            <td>Gozdz</td>
            <td>@rgozdz</td>
            <td>
                <button ctype="button" class="btn btn-light"data-toggle="modal" data-target="#addModal" data-id="1">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="1">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`);

         // Adding a row inside the tbody.
    // $('#tbody').append(`<tr id="R${++rowIdx}">
    // <td class="row-index text-center">
    //       <p>Row ${rowIdx}</p></td>
    //  <td class="text-center">
    //   <button class="btn btn-danger remove" 
    //       type="button">Remove</button>
    //   </td>
    //  </tr>`);
});