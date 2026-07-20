const url = document.URL;

export const inSitePreview: boolean =
    url.includes('sitepreview') ||
    url.includes('livepreview') ||
    url.includes('live-preview') ||
    url.includes('live.') ||
    url.includes('.builder.');
