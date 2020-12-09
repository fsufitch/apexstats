import React from 'react';
import ReactDOM from 'react-dom';

import legends from './data';

const App = () => {
    return <div>
        <p>Hello world from React</p>
        <h2>Game data:</h2>
        <code>
            <pre>
                {JSON.stringify(legends, null, 2)}
            </pre>
        </code>
    </div>;
};

const wrapper = document.getElementById('app');

if (wrapper) {
    ReactDOM.render(<App />, wrapper);
} else {
    console.error('No wrapper element found');
}

console.log('hello world');