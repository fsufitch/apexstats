// import 'bootstrap-scss';
import 'react';
import 'react-dom';
import 'jquery';
import 'popper.js';

((window) => {
    window.$ = window.jQuery = jQuery;
})(window as any)