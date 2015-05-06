window.Filter = (function (window, $, undefined) {


    var currentFilter = {};
    var newFilter = {};
    var queryTimeOut;

    var ajax_config = {
        url: "",
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function () {
        }
    }

    var custom = {
        timeToFire: 1500,
        storeCookie: false,
        fullInputsBeforeRefresh: false
    }


    function equals() {
        for (var property in currentFilter) {
            if (currentFilter.hasOwnProperty(property)) {
                if (currentFilter[property] != newFilter[property]) {
                    return false;
                }
            }
        }
        return true;
    }

    function copy() {
        for (var property in currentFilter) {
            if (currentFilter.hasOwnProperty(property)) {
                if (currentFilter[property] != newFilter[property]) {
                    currentFilter[property] = newFilter[property];
                }
            }
        }
    }

    function queryData() {
        var data = {}
        for (var property in newFilter) {
            if (newFilter.hasOwnProperty(property)) {
                var input = $('#' + property);
                var key = $(input).attr('filter-key');
                if (key == undefined) key = property;
                var value = newFilter[property];
                if (value != "") {
                    data[key] = value;
                }

            }
        }
        return data;
    }


    function getDataFromCookie() {
        var value = $.cookie('filter');
        var array = value.split("|");
        for (var pair in array) {
            var arrayOfPair = pair.split('value');
            var id = arrayOfPair.replace('id:', '');
            var value = arrayOfPair[1];
            currentFilter[id] = value;
        }

    }

    function storeCookieFromData() {
        var value = "";
        for (var property in newFilter) {
            if (newFilter.hasOwnProperty(property)) {
                value += value != "" ? "|" : "";
                value += "id:" + property + "value:" + newFilter[property];
            }
        }
        $.cookie('filter', value);
    }

    function query() {
        //console.debug('PUM!');
        copy();
        if (custom.storeCookie) storeCookieFromData();
        $.ajax({
            url: ajax_config.url,
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            data: queryData(),
            beforeSend: ajax_config.beforeSend,
            complete: ajax_config.complete,
            success: ajax_config.success
        });
    }

    function fireQueryEventImmediatlyWithInputs() {
        $('.add-filter').each(function () {
            getValueOfInputs($(this), false);
        });
        query();
    }

    function listenerAction(object) {
        getValueOfInputs($(object), false);
        if (!equals()) {
            queryTimeOut = setTimeout(function () {
                query();
            }, custom.timeToFire);
        }
    }

    function fireQueryEventImmediatly() {
        if (!equals()) {
            query();
        }
    }

    function stopQueryEvent() {
        clearTimeout(queryTimeOut);
        queryTimeOut == null;
    }

    function addEventListeners(input) {
        var element = $(input);
        if ($(element).hasClass('filter-toggle')) {
            $(element).click(function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                listenerAction($(this));
            });
        } else if ($(element).hasClass('filter-group')) {
            $(element).click(function (e) {
                e.preventDefault();
                $('.filter-group[filter-key=' + $(this).attr('filter-key') + ']').removeClass('active');
                $(this).toggleClass('active');
                listenerAction($(this));
            });
        } else {
            $(element).change(function () {
                stopQueryEvent();
                listenerAction($(this));
            });
            $(element).focusin(function () {
                if (queryTimeOut != null) stopQueryEvent();
                listenerAction($(this));
            });
        }
        $(document).keypress(function (event) {
            if (event.which == 13) {
                if (queryTimeOut != null) stopQueryEvent();
                fireQueryEventImmediatly();
            }
        });
    }

    function getValueOfInputs(input, current) {
        var id = $(input)[0].id
        //console.debug(input);
        var value = "";
        if ($(input).hasClass('filter-toggle')) {
            value = $(input).hasClass('active') ? true : false;
        } else if ($(input).hasClass('filter-selector')) {
            //console.debug($('#'+ id + ' :selected'));
            $('#' + id + ' :selected').each(function (i, selected) {
                value += value == "" ? $(selected).val() : '*' + $(selected).val();
                //console.debug(selected);
            });
        } else if ($(input).hasClass('filter-group')) { //must have filter-key and filter-value
            var inputGroup = $(".filter-group[filter-key=" + $(input).attr("filter-key") + "]").toArray();
            id = $(inputGroup[0]).attr("filter-key");
            for (var i = 0; i < inputGroup.length; i++) {
                if ($(inputGroup[i]).hasClass('active')) {

                    value = $(inputGroup[i]).attr('filter-value');
                    break;
                }
            }
        } else {
            value = $(input).val();
        }
        if (current && value != undefined) {
            currentFilter[id] = value;
            newFilter[id] = value;
        } else if (value != undefined) {
            newFilter[id] = value;
        }
    }


    var Filter = {
        initFilter: function (config) {
            ajax_config.url = config.ajax_config.url;
            ajax_config.beforeSend = config.ajax_config.beforeSend;
            ajax_config.complete = config.ajax_config.complete;
            ajax_config.success = config.ajax_config.success;
            if (config.custom != undefined) {
                custom.timeToFire = (config.custom.timeToFire == undefined) ? 3000 : config.custom.timeToFire;
                custom.storeCookie = (config.custom.storeCookie == undefined && typeof (config.custom.storeCookie) == "boolean") ? false : config.custom.storeCookie;
            }
            //get all objects with class=add-filter
            $('.add-filter').each(function () {
                getValueOfInputs($(this), true);
                addEventListeners($(this));
            });
            //console.debug(currentFilter);

        },
        fireFilter: function () {
            fireQueryEventImmediatlyWithInputs();
        },
        fireLastFilter: function () {
            query();
        }
    }

    return Filter;

})(window, jQuery)
