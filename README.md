# act-warning-mcve
This was a quick MCVE (Minimal, Complete, Verifiable example) to demonstrate what I think could be a bug/unexpected behavior in either React 18 or RTL 13.4.  OTOH, it could just be that I'm doing it wrong<sup>TM</sup>. :-)

## Background
Ever seen this testing React apps? :)

```console
  console.error
    Warning: An update to App inside a test was not wrapped in act(...).
    
    When testing, code that causes React state updates should be wrapped into act(...):
    
    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */
    
    This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
        at App (/Users/WCANEIRA/code/act-warning-mcve/src/App.js:4:39)
```

From what little I understand, the infamous "act warning" can occur for a couple [different reasons](https://davidwcai.medium.com/react-testing-library-and-the-not-wrapped-in-act-errors-491a5629193b), such as state changes being triggered by async updates outside React's call stack, or because a test ends before React is done updating.  [This article](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning) is also a decent read.   

In the past, we have avoided `act` warnings in our application because we use the `react-testing-library`, whose functions apply the necessary `act` function calls around event and render functions, AND help provide async utilities to ensure the test waits for all renders to complete before exiting.

When we upgraded to React 18 and RTL 13.4, a number of existing tests started to throw "act" warnings for the first time.  These tests had a common pattern of testing code with a `fetch` call and 'Loading...' indicator showing until the fetch settled.

Through careful trial and error, I identified that an awaited `findByText('Loading...')` call was causing the warning, though I'm not sure why.  If I change the code to simply not wait, e.g. `queryByText('Loading...')` no warnings are generated.

I plan to open an issue (question) with the RTL maintainers so I understand why we see this behavior.

## How to use this repo
After `npm i`, use `npm t` to run the tests and see the warning (or use `npm run test:nowatch` if you prefer).  There are two tests you can try, one that generates the warning, and one that does NOT.  The only difference is the use of async utilities like `findByText` or `waitFor` on the "Loading..." text.  Feel free to skip individual tests to see the difference in warning output.

Using `npm start` will open the test application in a browser to see it visually, if desired.  Throttle the network speed in your devtools to see "Loading..." if needed.

## Warning
The API endpoint this uses will occasionally have CORS errors, when testing in a browser.  I wonder if the API owner is load balancing servers and one of them doesn't allow CORS.  Simply keep trying if you get such an error.