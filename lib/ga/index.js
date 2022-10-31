// log the pageview with their URL
export const pageview = (url) => {
  try {
    if (window.gtag)
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
} catch (error) {
  console.log("Error from the trackerPageView => ", error);
}
    // window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    //   page_path: url,
    // });
  };  
  
  // log specific events happening.
  // export const event = ({ action, params }) => {
  //   window.gtag('event', action, params)
  // }