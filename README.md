# jQuery Inputs Ajax
A JQuery pluguin help to get all data of various inputs and send data trought an ajax function.
Look ease how it works: https://jsfiddle.net/pabliiitoo/sb2j3uLx/
In this example you can view the generation of the url for better undestanding.

## How it works
jQuery Inputs Ajax get the value of all inputs that have 'add-filter' class and send an Ajax petition with this data.
For a specific porpouse of input you can look Type of inputs topic.

## How to use

1. You must put the 'add-filter' class to your `<input>`'s and an id that will be the key of pair key-value params send to Ajax query, if you can't use id for that porpouse read Advanced Features > Filter-key, Filter-value.
  * `<input id="someId" class="add-filter">SomeText</input>` for all data inputs/buttons/select that you want to send to Ajax
2. You must call the init function with your prefered parameters and after document ready event is fired, all parameters are explained later.

  ```
  $(document).ready(function () {
   Filter.initFilter({
   
     ajax_config.url = <your url call>
     
     ajax_config.beforeSend = <your before send function>
     
     ajax_config.complete = <your compelete function>
     
     ajax_config.success = <your success function>
     
   });
  };
  ```

With this litle configuration jQuery-inputs-ajax works perfectly, but perhaps you need something more :)

## Advanced features

## Type of inputs

1. Toggle Buttons

Adding class 'filter-toggle' you can use a input/button html object as toggle button, by default the toggle class is 'activate'.

`<button type="button" id="GPS" class="btn btn-default add-filter filter-toggle">GPS</button>` 

When query sends it will send 'url?*GPS=true*' if button is preset by user, if not preset NOTHING is sended

2. Select

Adding class 'filter-selector' on a select you can add it to ajax query, the select can be multiple.

```
<select id="select" class="form-control add-filter filter-selector" multiple="multiple" name="selected">

    <option value="Volvo">Volvo v40</option>
    
    <option value="Seat">Seat Ibiza</option>
    
</select>
```

When query sends it will send 'url?*select=Volvo*Seat*' if two cars are selected., note that values can be splited by an astherisc

3. Select with buttons

Adding class 'filter-group' you can group multiple inputs for only one chosee possible. 

In order to grouping the inputs you must put in all the same value in **filter-key** attribute, in the example this value is "Insurance".
Also you must put **filter-value** attribute, that will be the value of param sended.

```
<input id="insurance-0" type="button" filter-key="Insurance" filter-value="noinsurance" class="btn btn-default add-filter filter-group" value="No insurance">

<input id="insurance-1" type="button" filter-key="Insurance" filter-value="thirdpartyinsurance" class="btn btn-default add-filter filter-group" value="Third party insurance">

<input id="insurance-2" type="button" filter-key="Insurance" filter-value="fullycomprehensiveinsurance" class="btn btn-default add-filter filter-group" value="Fully comprehensive insurance">
```

When query sends it will send 'url?*Insurance=fullycomprehensiveinsurance*' If last clicked is the last one.


## Filter-key and Filter-value attributes

**filter-key** is created for two main porpouses. 

One is for **substitute id attribute** when it is needed for another porpouse. If we have an input with id and filter-key attribute the plugin get filter-key value as key for sended parameters.

Second porpouse is for group a set of inputs, this is shown previosly on Select with buttons paragraph

**filter-value** has a similar porpouse, by default jQuery Inputs Ajax get $(input).val() as value for sending as paramater value, but if you need another value you can use filter-value for substitute it.

## Query fire

jQuery Inputs Ajax create diferent listeners based on input types, the main idea is to send a query **only when filter is modified**.

When jQuery Inputs Ajax detects a modification it will start a countdown of 1,5 sec if no other change is detected the query will be fired but if another change is detected the countdown will be restarted.

If you want fire the Ajax query immediately use `Filter.fireFilter` and it will get current params and execute the Ajax query.

If you want to send the last Ajax query use `Filter.fireLastFilter` and it will send another time the last sended Ajax query.

## Parameters

```
Filter.initFilter({
 ajax_config: {
  url: <stirng> //The url where the Ajax query is sended
  beforeSend: <function> //Function that overrides beforeSend Ajax
  complete: <function> //Function that overrides complete Ajax
  success: <function> //Function that overrides success Ajax
 },
 custom: {
  timeToFire: <miliseconds> //Time in miliseconds for wait between last change and Ajax fired
 }
 });

