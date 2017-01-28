# History
A demo of HTML5 history API

The HTML 5 History API is a standardized way to manipulate the browser history via script. In HTML 5 entries can be added to the browser history, visibly changing the URL in the location bar without triggering a full page refresh. A new event is also fired when those entries are removed from the history stack via the browser's back button. This means that, in script-heavy web apps like Single Page Applications (SPA), the URL in the browser location bar can still act as the unique identifier for the current resource.

## How It Works
1. Standard navigation (click on a link > round-trip to server > full page-refresh) is intercepted, and only what is required is feteched from the server (using ajax with XMLHttpRequest).
2. The partial content is manually inserted into the DOM (and event handlers added).
3. The browser location bar is manually updated with the new URL (using the HTML 5 History API).

This results in a DOM and a URL just as if standard navigation (full-page refresh) had been used, but uses less network traffic, and hopefully a better performance without the user perceiving any difference in the navigation.
