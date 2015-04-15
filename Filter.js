(function (window, $, undefined) {


    var currentFilter = {};
    var newFilter = {};

    var petition = {
        url: ""
    }
    
    function compare() {
        for (var property in currentFilter) {
            if (currentFilter.hasOwnProperty(property)) {
                if (currentFilter[property] != newFilter[property]){
                    return false;
                }
            }
        }
        return true;
    }

    function getDataFromCookie(value) {
        var array = value.split("|");
        var i = 0;
        for (var property in filtreAplicat) {
            if (filtreAplicat.hasOwnProperty(property)) {
                filtreAplicat[property] = array[i];
                ++i;
            }
        }
    }

    function storeCookieFromData() {
        var cookie = $.cookie('filtres');
        if (cookie != null) {
            getDataFromCookie(cookie);
        }
        var value = "";
        for (var property in currentFilter) {
            if (currentFilter.hasOwnProperty(property)) {
                value += value != "" ? "|" : "";
                value += "id:" + property + "value:" + currentFilter[property];
            }
        }
        return value;
    }
    
    function addEventListeners() {
        for (var property in currentFilter) {
            if (currentFilter.hasOwnProperty(property)) {
                $('#'+property).focusout(function() {
                    getValueOfInputs($(this),newFilter);
                    
                });
            }
        }
    }
    
    function getValueOfInputs(input,objectToStore) {
        var id = $(input).id;
        var value;
        if ($(input).hasClass('filter-toggle')) {
            value = $(input).hasClass('active') ? true : false;
        }
        else if($(input).hasClass('filter-selector')) {
            $(id + ':selected').each(function (i, selected) {
                value += value == "" ? $(selected).text() : "*" + $(selected).text();
            });
        }
        else {
            value = $(input).val();
        }
        objectToStore[id] = value;
    }

    var Filter = {
        Filter: {
            initFilter: function(config) {
                this.petition.url = config.petition.url;
                //get all objects with class=add-filter
                $('.add-filter').each(function() {
                    getValueOfInputs($(this),currentFilter);
                });
                newFilter = currentFilter;
            }
        }
    };
    XipGroc = $.extend({}, XipGroc || {}, Filter)
})(window.XipGroc = window.XipGroc || {}, jQuery)

XipGroc.Filter.initFilter();
