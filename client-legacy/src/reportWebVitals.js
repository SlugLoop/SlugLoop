/**
 * reportWebVitals imports functions from the web-vitals library through the argument onPerfEntry to measure and report
 * various web vitals such as CLS, FID, FCP, LCP, TTFB and calls these functions with the onPerfEntry callback and exports
 * the reportWebVitals function to the module to allow other parts of the application to use this function.
 * @param {*} onPerfEntry - a callback function that is passed into the reportWebVitals function and perform some action with
 * the specific web vital
 * @return none
 */
const reportWebVitals = onPerfEntry => { // defines the function and lists the parameter
  if (onPerfEntry && onPerfEntry instanceof Function) { // checks whether onPerfEntry is an instance of a function
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { // imports web-vitals module, allowing us to load the modules on-demand
      getCLS(onPerfEntry); // the following functions are exported from web-vitals and invoked with the onPerfEntry callback
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals; // exports the function as a default module 
