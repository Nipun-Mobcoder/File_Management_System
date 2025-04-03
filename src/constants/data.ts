export type FolderItem = {
  id: number;
  name: string;
  isFolder: boolean;
  items?: FolderItem[];
  content?: string;
};

export const folderData: FolderItem = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 2,
      name: "public",
      isFolder: true,
      items: [
        {
          id: 3,
          name: "index.html",
          isFolder: false,
          content: `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <!-- https://web.dev/uses-rel-preconnect -->
      <link rel="preconnect" href="https://storage.googleapis.com">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#111" />

      <meta
        name="description"
        content="Wlist"
        data-react-helmet="true"
      />
      <meta
        property="og:title"
        content="Wlist"
        data-react-helmet="true"
      >
      <meta
        property="og:description"
        content="Wlist"
        data-react-helmet="true"
      >
      <meta
        property="og:url"
        content="%PUBLIC_URL%"
        data-react-helmet="true"
      >
      <meta
        property="og:image"
        content="%PUBLIC_URL%/images/cover.png"
        data-react-helmet="true"
      />
      <meta
        name="twitter:card"
        content="summary"
        data-react-helmet="true"
      />
      <meta property="og:type" content="website" />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
      -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" crossorigin="use-credentials" />
      <!-- https://web.dev/defer-non-critical-css/ -->
      <link rel="preload" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">

      <title>Wlist</title>

      <!-- ie -->
      <script type="text/javascript">
        var ua = navigator.userAgent;
        var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;

        if (is_ie) {
          document.ie = 'true';

          var ie_script = document.createElement('script');
          var ie_styles = document.createElement('link');

          ie_script.src = 'no-ie/init.js';
          ie_styles.rel = 'stylesheet';
          ie_styles.href = 'no-ie/styles.css';

          function injectScripts() {
            document.body.innerHTML = '';
            document.body.appendChild(ie_styles);
            document.body.appendChild(ie_script);
          }

          if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', injectScripts);
          } else { // before IE 9
            document.attachEvent('DOMContentLoaded', injectScripts);
          }

        }
      </script>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <script type="text/javascript">
        // set the body color before app initialization, to avoid blinking
        var themeMode = localStorage.getItem('theme-mode');
        var initialBodyStyles = document.createElement('style');
        var currentThemeColor = themeMode === 'light' ? '#fafafa': '#111';
        initialBodyStyles.innerText = 'body { background-color: ' + currentThemeColor + ' }';
        document.head.appendChild(initialBodyStyles);

        // also set meta[name="theme-color"] content
        var metaTheme = document.querySelector('meta[name="theme-color"]');

        metaTheme.content = currentThemeColor;
      </script>
      <div id="root"></div>
    </body>
  </html>
`,
        },
        {
          id: 4,
          name: "hello.js",
          isFolder: false,
          content: `
  // hello.js code

  const CANCELATION_MESSAGE = {
    type: 'cancelation',
    msg: 'operation is manually canceled',
  };

  function makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val));
      promise.catch(reject);
    });

    return (wrappedPromise.cancel = () => (hasCanceled_ = true), wrappedPromise);
  }

  export default makeCancelable;
`,
        },
      ],
    },
    {
      id: 7,
      name: "src",
      isFolder: true,
      items: [
        {
          id: 8,
          name: "App.js",
          isFolder: false,
          content: `
  // App.js code

  
var b = 15;
const fun = async () => {
    var promise1 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 500, "one");
      });
      var promise2 = new Promise(function (resolve, reject) {
        setTimeout(resolve, 0, "two");
      });
      setTimeout(() => console.log("Hello World"), 0)
      await Promise.all([promise1, promise2]).then(function (value) {
        console.log(value);
    });
    }
fun();
function rest(s, ...c) {
    console.log(b, s , c)
    }
    rest(10,11,20)
class Vehicle {
    constructor(name) {
        this.name = name;
    }
    
    start() {
        console.log(this.name,"vehicle started");
    }
}
    
class Car extends Vehicle {
    start() {
        console.log("Global: ", this)
        console.log(this.name," car started");
        super.start();
    }   
}

var above; let down;
console.log("values are: ", above,  down);
above = 10, down = 12;
    
var car = new Car("BMW");
// console.log(car.userName, car.val)
Object.defineProperties(car, {
    'property1': {
        value: 'Four wheelers',
        writable: true,
        enumerable: true,
        configurable: true
    },
    'property2': {
        value: 'Automatic',
        writable: false,
        enumerable: true,
        configurable: true
    }
    }
)
Vehicle.prototype.property3 = "Hello"
car.property1 = 'Two wheelers'
console.log("car's property1 " ,car.property1, "car's property2 " ,car.property2, "car's property3 " ,car.property3)
car.start()

const value = '{"number": 1,"name": "Nipun"}'; 
const jsonVal = JSON.parse(value)
console.log(jsonVal.name)
var mainString = "hello@gmail.com",
regex = /^[^\W_]+\w*(?:[.-]\w*)*[^\W_]+@[^\W_]+(?:[.-]?\w*[^\W_]+)*(?:\.[^\W_]{2,})$/;
console.log(regex.test(mainString));
const a = {b: 10, a: 1}

function fun1() {
    console.log(arguments.length);
}
const k = fun1(1,2,3,4)

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [1, 2, 3, 4, 5];

const checkEqual = (val, i) => {
    return val === arr2[i];
}

console.log("equal = ",(arr1.length === arr2.length) &&
    (arr1.every(checkEqual)))

console.log("max is: ",Math.max(...arr1))

function outerFunction(outerVariable) {
    return (innerVariable) => {
      console.log("Outer Variable:", outerVariable);
      console.log("Inner Variable:", innerVariable);
    };
  }
  
  const closure = outerFunction("I'm from the outer scope");
  closure("I'm from the inner scope");

for (var i = 0; i < 4; i++) {
    console.log(i)
    setTimeout(() => console.log("The index is: ",i))
}

const memoizeAddition = () => {
    let cache = {};
    return (value) => {
      if (value in cache) {
        console.log("Fetching from cache");
        return cache[value]; 
      } else {
        console.log("Calculating result");
        let result = value + 20;
        cache[value] = result;
        return result;
      }
    };
  };
  const addition = memoizeAddition();
  console.log(addition(20));
  console.log(addition(20));
const word = "WoRd";
let result = "";
for( var w of word ){
    if(w.charCodeAt() >= 65 && w.charCodeAt() <= 90) result += w.toLowerCase();
    else result += w;
}
console.log(result)
`,
        },
        {
          id: 9,
          name: "Index.js",
          isFolder: false,
        },
        {
          id: 10,
          name: "styles.css",
          isFolder: false,
        },
      ],
    },
    {
      id: 11,
      name: "package.json",
      isFolder: false,
      items: [],
    },
  ],
};
