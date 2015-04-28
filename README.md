# jQuery Inputs Ajax
A JQuery pluguin help to get all data of various inputs and send data trought an ajax function.
Look ease how it works: https://jsfiddle.net/pabliiitoo/sb2j3uLx/

## How it works
AjaxFilter get the value of all inputs that have 'add-filter' or other clases mentioned and send an Ajax petition with this data.

## How to use

1. You must put the correct class to your `<input>`'s, 
  * `<input class="add-filter"></input>` for all text, data inputs
  * `<input class="add-filter filter-toggle"></input>` for toggle buttons, by default the toggle class is 'activate'
  * `<select class="add-filter filter-selector"></select>` for select input, it can be multiple also.
2. You must call the init function with your prefered parameters.

  ```
  Filter.initFilter({
  
    ajax_config.url = <your url call>
    
    ajax_config.beforeSend = <your before send function>
    
    ajax_config.complete = <your compelete function>
    
    ajax_config.success = <your success function>
    
  });
  ```

## What it does


