loadAllDeposits();
function validation() {

    let id = $('#id').val();
    let name = $('#name').val();
    let debit = $('#debit').val();

    if (id == '') {

        Swal.fire({
            text: 'Please enter user id!',
            title: 'Oops...',
            icon: 'error'
        })
        return false;
    }
    if (name == '') {
        Swal.fire({
            text: 'Please enter user name!',
            title: 'Oops...',
            icon: 'error'
        })
        return false;
    }
    if (debit == '') {
        Swal.fire({
            text: 'Please enter debit values!',
            title: 'Oops...',
            icon: 'error'
        })
        return false;
    } else {

        Swal.fire({
            text: 'Your money deposit successfully!!',
            title: 'Oops...',
            icon: 'success'
        })
        loadAllDeposits();
    }
}

function loadAllDeposits() {
    $('#tbl_debit_body').empty();
    $.ajax({
        url: 'http://127.0.0.1:5000/get_debits',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            let values = res;
            for (i in values) {
                let id = values[i].id;
                let name = values[i].name;
                let debit = values[i].debit;
                $('#tbl_debit_body').append(`<tr><td>${id}</td><td>${name}</td><td>${debit}</td></tr>`)
            }
        }
    });
}

function searchCustomer() {
    // $("#tblCustomerBody").empty();
    let id = $("#adCustId").val();
    if (id != "") {
        $.ajax({
            method: "get",
            url: 'http://127.0.0.1:5000/get_user' + id,
            async: true,
            dataType: 'json',
            success: function (response) {
                var data = response.data;
                console.log("data ===================",data)
            }
        });
    } else {
    }
}

function clear() {
    $("#user_id").val('')
    $("#user_name").val('')
    $("#user_amount").val('')
}
