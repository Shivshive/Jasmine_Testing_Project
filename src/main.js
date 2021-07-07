import * as jQuery from '/bower_components/jquery/dist/jquery.js'
import * as Cleave from '/bower_components/cleave.js/dist/cleave.js' 

$(document).ready(function () {
    // alert('hello world')


    var state_selected = $('#dropdown-1 :selected')

    $('#state-selected').text(state_selected.text())


    var cleave = new Cleave('.input-element', {
        date: true,
        delimiter: '-',
        datePattern: ['Y', 'm', 'd']
    });

})

