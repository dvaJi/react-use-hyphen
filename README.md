# react-use-hyphen

```
npm install react-use-hyphen
```

## How to use it

Using the component:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import useHyphen from 'react-use-hyphen';

import './styles.css';

function App() {
  const { Hyphen } = useHyphen();

  return (
    <div className="App">
      <div>
        <Hyphen>
          It real sent your at. Amounted all shy set why followed declared.
          Repeated of endeavor mr position kindness offering ignorant so up.
          Simplicity are melancholy preference considered saw companions.
        </Hyphen>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

Using the hyphenated function:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import useHyphen from 'react-use-hyphen';

import './styles.css';

function App() {
  const { h } = useHyphen();

  return (
    <div className="App">
      <div>
        {h('It real sent your at. Amounted all shy set why followed declared.')}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```
