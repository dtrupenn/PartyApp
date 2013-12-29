function reset_apply_instance(app_name) {
    var namespace_btns = $("div#namespaceBtns");
    var table_body = $("table#instanceTable").children("tbody#instanceTableBody");
    var link = $('#newLink');

    //Empty table body
    table_body.empty();

    //Clear link input val and restore buttons
    var link_vals = link.val().split('/');
    link.val('');
    for (var i = 0; i < link_vals.length; i++) {
        if (link_vals[i]) {
            namespace_btns.append('<a id="' + link_vals[i] +'_btn" href="#" class="tiny round success button" onclick="update_apply_link(\'' + app_name + '\', \'' + link_vals[i] + '\')">' + link_vals[i] + '</a>');
        }
    }
}


function update_apply_link(app_name, namespace) {
    var namespace_btns = $("div#namespaceBtns");
    var table_body = $("table#instanceTable").children("tbody#instanceTableBody");
    var link = $('#newLink');

    //Remove button hit
    namespace_btns.children("a#" + namespace + "_btn").remove();

    //Add values to table and input
    link.val(link.val() + namespace + '/');
    return $.ajax({
        url: '/app/' + app_name + '/' + link.val(),
        type: 'GET',
        success: function(data) {
            $.each(data.response, function(key, value) {
                var created_date = new Date(value[0].created * 1000);
                var created = (created_date.getMonth() + 1) + '-' + created_date.getDate() + '-' + created_date.getFullYear();
                var row = '<tr><td>' + key + '</td><td>' + value[0].value + '</td><td>' + value[0].origin + '</td><td>' + created + '</td></tr>';
                table_body.append(row);
            })
        }
    });
}

function link_instance() {
    var my_ajax = [];
    var links = $('#newLink').val().split('/');
    $('#instanceSelector :selected').each(function(i, selected) {
        my_ajax[i] = $.ajax({
            url: '/host/' + $(selected).text(),
            type: 'POST',
            data: JSON.stringify({"namespaces":  links }),
            contentType: 'application/json;charset=UTF-8'
        });
    });
    $.when.apply(this, my_ajax).done(function() {location.reload();});
}

function add_namespace(app_name) {
    var namespace = $('#newVar').val();
    return $.ajax({
        url: '/app/' + app_name,
        type: 'POST',
        data: JSON.stringify({"namespace_name": namespace }),
        contentType: 'application/json;charset=UTF-8',
        success: function(data) { location.reload(); }//$('#addVar').foundation('reveal', 'close'); }
    });
}

function remove_namespace(app_name) {
    var namespace = $('#deleteNamespace').val();
    return $.ajax({
        url: '/app/' + app_name,
        type: 'DELETE',
        data: JSON.stringify({"namespace_name": namespace }),
        contentType: 'application/json;charset=UTF-8',
        success: function(data) { location.reload(); }//$('#removeVar').foundation('reveal', 'close'); }
    });
}

function add_key_value(app_name, namespace) {
    var key = $('#newKey').val();
    var value = $('#newValue').val();
    return $.ajax({
        url: '/var/' + app_name + '/' + namespace,
        type: 'POST',
        data: JSON.stringify({"key": key , "value": value }),
        contentType: 'application/json;charset=UTF-8',
        success: function(data) { location.reload(); }//$('#addKeyValues').foundation('reveal', 'close'); }
    });
}

function remove_key(app_name, namespace) {
    var key = $('#deleteKey').val();
    return $.ajax({
        url:'/var/' + app_name + '/' + namespace,
        type: 'DELETE',
        data: JSON.stringify({"key": key }),
        contentType: 'application/json;charset=UTF-8',
        success: function(data) { location.reload(); }//$('#removeKey').foundation('reveal', 'close'); }
    });
}
