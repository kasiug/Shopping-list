var shoppingList = [];

$( document ).ready(function() {
    $.get( "http://localhost:3000/shopping-list")
        .done(function(data) {
        shoppingList = data;
        var index = 0;
        shoppingList.forEach(element => {
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
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-name="${element.name}" data-id="${element.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>`);
            });
    });
});

$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    const itemName = button.data('name');
    const id = button.data('id');
    var modal = $(this);

    modal.find('.modal-title').text('You want to delete ' + itemName + ' ?');
    $('#deleteElement').attr('data-id', id);
  })

  $('#addModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    const id = button.data('id');
    var modal = $(this);

    if(id) {
        const element = shoppingList.find(x => x.id === id);
        modal.find('.modal-title').text('Update element ' + element.name);
        modal.find('button#addElement').text("Update");
    
        modal.find('.modal-body input#name').val(element.name);
        modal.find('.modal-body input#category').val(element.category);
        modal.find('.modal-body input#quantity').val(element.quantity);
        modal.find('.modal-body input#unit').val(element.unit);
    
        $('#addElement').attr('data-id', id);
    }
  });

  $('#addModal').on('hide.bs.modal', function () {
        var modal = $(this);
        modal.find('.modal-title').text("Add new shopping item");
        modal.find('button#addElement').text("Add");
        modal.find('.modal-body input#name').val("");
        modal.find('.modal-body input#category').val("");
        modal.find('.modal-body input#quantity').val("");
        modal.find('.modal-body input#unit').val("");
    });


  $('#shoppingItemForm').on('submit', function (e) {
    e.preventDefault();
    var id = $(this).attr('data-id');
    console.log($('form').serializeArray());
    $.ajax({
        type: "PUT",
        url: `http://localhost:3000/shopping-list/${id}`,
        data: $('form').serializeArray(),
        success: function(response) {
            alert(response['response']);
        },
        error: function() {
            alert('Error');
        }
    });
  });

  $('#deleteElement').on('click', function (e) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "DELETE",
            url: `http://localhost:3000/shopping-list/${id}`,
            success: function () {
                $(`#row-${id}`).remove();
            },
            error: function (xhr, status, error) {
                alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });