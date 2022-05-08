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
            title: 'Great...',
            icon: 'success'
        })
        loadAllDeposits();
    }
}

function getUser() {

    $.ajax({
        url: 'http://127.0.0.1:5000/get_debits',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            let values = res;
            let input = $('#id_loan').val();
            for (i in values) {
                let id = values[i].id;
                if (input == id) {

                    $('#name_loan').val(values[i].name);
                    $('#debit_loan').val(values[i].debit);
                    break
                }

            }
        }
    });
}


function getUser1() {

    $.ajax({
        url: 'http://127.0.0.1:5000/get_debits',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            let values = res;
            let input = $('#person_id_1').val();
            for (i in values) {
                let id = values[i].id;
                if (input == id) {

                    $('#name1').val(values[i].name);
                    $('#deposit1').val(values[i].debit);
                    break
                }

            }
        }
    });
}


function getUser2() {

    $.ajax({
        url: 'http://127.0.0.1:5000/get_debits',
        method: 'GET',
        async: false,
        dataType: 'json',
        success: function (res) {
            let values = res;
            let input = $('#person_id_2').val();
            for (i in values) {
                let id = values[i].id;
                if (input == id) {

                    $('#name2').val(values[i].name);
                    $('#deposit2').val(values[i].debit);
                    break
                }

            }
        }
    });
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




function clear() {
    $("#user_id").val('')
    $("#user_name").val('')
    $("#user_amount").val('')
}





function calc_loan_amount() {
    let amount1 = $('#deposit1').val();
    let amount2 = $('#deposit2').val();
    let loan = $('#loan_amount').val();
    let tot=parseFloat(amount1)+parseFloat(amount2);
    let max=(parseFloat(tot)/100)*80;
    let user1=(parseFloat(loan)*parseFloat(amount1))/parseFloat(tot).toFixed(1);
    let user2=(parseFloat(loan)*parseFloat(amount2))/parseFloat(tot).toFixed(1);

    $('#total').val(tot);
    $('#maxamount').val(max);
    $('#person_id_1_amount').val(user1);
    $('#person_id_2_amount').val(user2);


}