const cheerio = require('cheerio');
const ExcelJS = require('exceljs');
const fs = require('fs');

// Function to log messages or errors
function logMessage(message) {
    try {
        if (typeof console === 'undefined') return;
        console.error ? console.error(message) : console.log(message);
    } catch (error) {
        // Handle errors silently
    }
}

// Function to convert hex to decimal
function hexToDecimal(hexString, startIndex) {
    const hexPair = hexString.substr(startIndex, 2);
    return parseInt(hexPair, 16);
}

// Function to decrypt the email encoded in the href attribute
function decryptEmail(encoded, startIndex) {
    let result = "";
    const key = hexToDecimal(encoded, startIndex);
    for (let i = startIndex + 2; i < encoded.length; i += 2) {
        const decodedChar = hexToDecimal(encoded, i) ^ key;
        result += String.fromCharCode(decodedChar);
    }

    try {
        result = decodeURIComponent(escape(result));
    } catch (error) {
        logMessage(error);
    }

    return result;
}

// Function to process the email addresses and extract sanitized emails
function processLinks($) {
    const emailProtectionPrefix = "/cdn-cgi/l/email-protection#";
    const emails = [];

    // Loop through each <a> tag
    $('a').each((index, element) => {
        try {
            const href = $(element).attr('href');
            if (href && href.startsWith(emailProtectionPrefix)) {
                const decodedEmail = decryptEmail(href, emailProtectionPrefix.length);
                emails.push(decodedEmail); // Store sanitized email
                console.log(`emails: `, emails);
            }
        } catch (error) {
            logMessage(error);
        }
    });

    return emails;
}

// Function to save the emails into an Excel file
async function saveEmailsToExcel(emails) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sanitized Emails');

    // Set column headers
    worksheet.columns = [
        { header: 'Email Address', key: 'email', width: 30 },
    ];

    // Add rows with email data
    emails.forEach(email => {
        worksheet.addRow({ email });
    });

    // Write the workbook to a file
    await workbook.xlsx.writeFile('sanitized_emails.xlsx');
    console.log('Excel file saved as sanitized_emails.xlsx');
}

// Main function to sanitize emails from HTML content and save to an Excel file
async function sanitizeEmailsAndSaveToExcel(htmlContent) {
    // Load HTML content using Cheerio
    const $ = cheerio.load(htmlContent);

    // Process all <a> tags and extract sanitized emails
    const sanitizedEmails = processLinks($);

    // Save sanitized emails to an Excel file
    await saveEmailsToExcel(sanitizedEmails);
}

// Sample HTML content (you'll get this from the response)
const htmlResponse = `
<!DOCTYPE html>
<html class="no-touch" lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="https://gmpg.org/xfn/11">
<link rel="pingback" href="https://salesleadsforever.com/xmlrpc.php">
<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />

	<!-- This site is optimized with the Yoast SEO plugin v21.4 - https://yoast.com/wordpress/plugins/seo/ -->
	<title>Free list of companies with HR email data of Indian companies</title>
	<link rel="canonical" href="https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Free list of companies with HR email data of Indian companies" />
	<meta property="og:description" content="When you are alone for days or weeks at a time, you eventually become drawn to people. Talking to randos is the norm. After a long time I could witness the sunrise. I could feel the sun rays falling on my body." />
	<meta property="og:url" content="https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/" />
	<meta property="og:site_name" content="Sales Leads Forever" />
	<meta property="article:published_time" content="2023-02-07T08:53:50+00:00" />
	<meta property="article:modified_time" content="2023-12-26T09:15:50+00:00" />
	<meta property="og:image" content="https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022.jpg" />
	<meta property="og:image:width" content="1280" />
	<meta property="og:image:height" content="856" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta name="author" content="Manjunath" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:label1" content="Written by" />
	<meta name="twitter:data1" content="Manjunath" />
	<meta name="twitter:label2" content="Est. reading time" />
	<meta name="twitter:data2" content="1 minute" />
	<script type="application/ld+json" class="yoast-schema-graph">{"@context":"https://schema.org","@graph":[{"@type":"Article","@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#article","isPartOf":{"@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/"},"author":{"name":"Manjunath","@id":"https://salesleadsforever.com/#/schema/person/aa1fedd0e2283744a2133f32e0253b79"},"headline":"Free List of HR Email Details of Indian Companies 2023","datePublished":"2023-02-07T08:53:50+00:00","dateModified":"2023-12-26T09:15:50+00:00","mainEntityOfPage":{"@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/"},"wordCount":64,"commentCount":0,"publisher":{"@id":"https://salesleadsforever.com/#organization"},"image":{"@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#primaryimage"},"thumbnailUrl":"https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022.jpg","keywords":["LinkedIn Industry List"],"articleSection":["Generic Information"],"inLanguage":"en-US","potentialAction":[{"@type":"CommentAction","name":"Comment","target":["https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#respond"]}]},{"@type":"WebPage","@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/","url":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/","name":"Free list of companies with HR email data of Indian companies","isPartOf":{"@id":"https://salesleadsforever.com/#website"},"primaryImageOfPage":{"@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#primaryimage"},"image":{"@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#primaryimage"},"thumbnailUrl":"https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022.jpg","datePublished":"2023-02-07T08:53:50+00:00","dateModified":"2023-12-26T09:15:50+00:00","breadcrumb":{"@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#primaryimage","url":"https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022.jpg","contentUrl":"https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022.jpg","width":1280,"height":856,"caption":"Free HR Email Addresses 2023"},{"@type":"BreadcrumbList","@id":"https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://salesleadsforever.com/"},{"@type":"ListItem","position":2,"name":"Free List of HR Email Details of Indian Companies 2023"}]},{"@type":"WebSite","@id":"https://salesleadsforever.com/#website","url":"https://salesleadsforever.com/","name":"Sales Leads Forever","description":"MPowering Sales &amp; Marketing Professionals","publisher":{"@id":"https://salesleadsforever.com/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://salesleadsforever.com/?s={search_term_string}"},"query-input":"required name=search_term_string"}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://salesleadsforever.com/#organization","name":"Sales Leads Forever","url":"https://salesleadsforever.com/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://salesleadsforever.com/#/schema/logo/image/","url":"https://salesleadsforever.com/wp-content/uploads/2023/05/cropped-Sales-Leads-Forever-2.jpg","contentUrl":"https://salesleadsforever.com/wp-content/uploads/2023/05/cropped-Sales-Leads-Forever-2.jpg","width":150,"height":50,"caption":"Sales Leads Forever"},"image":{"@id":"https://salesleadsforever.com/#/schema/logo/image/"},"sameAs":["https://www.linkedin.com/in/manju-nath-sales-leads-forever/"]},{"@type":"Person","@id":"https://salesleadsforever.com/#/schema/person/aa1fedd0e2283744a2133f32e0253b79","name":"Manjunath","image":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://salesleadsforever.com/#/schema/person/image/","url":"https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=96&d=mm&r=g","contentUrl":"https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=96&d=mm&r=g","caption":"Manjunath"},"description":"Unlock your sales potential with our custom B2B data solutions, covering industry, company size, tech, job titles, and more","sameAs":["https://salesleadsforever.com/","https://www.linkedin.com/in/manju-nath-sales-leads-forever/"],"url":"https://salesleadsforever.com/author/salesleadsforever/"}]}</script>
	<!-- / Yoast SEO plugin. -->


<link rel='dns-prefetch' href='//fonts.googleapis.com' />
<link rel="alternate" type="application/rss+xml" title="Sales Leads Forever &raquo; Feed" href="https://salesleadsforever.com/feed/" />
<link rel="alternate" type="application/rss+xml" title="Sales Leads Forever &raquo; Comments Feed" href="https://salesleadsforever.com/comments/feed/" />
<link rel="alternate" type="application/rss+xml" title="Sales Leads Forever &raquo; Free List of HR Email Details of Indian Companies 2023 Comments Feed" href="https://salesleadsforever.com/free-list-of-companies-with-hr-email-details-of-indian-companies-2023/feed/" />
<script type="9dca68f643e17b109e1aaf43-text/javascript">
/* <![CDATA[ */
window._wpemojiSettings = {"baseUrl":"https:\/\/s.w.org\/images\/core\/emoji\/15.0.3\/72x72\/","ext":".png","svgUrl":"https:\/\/s.w.org\/images\/core\/emoji\/15.0.3\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/salesleadsforever.com\/wp-includes\/js\/wp-emoji-release.min.js?ver=6.5.2"}};
/*! This file is auto-generated */
!function(i,n){var o,s,e;function c(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function p(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data),r=(e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0),new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data));return t.every(function(e,t){return e===r[t]})}function u(e,t,n){switch(t){case"flag":return n(e,"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f","\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f")?!1:!n(e,"\ud83c\uddfa\ud83c\uddf3","\ud83c\uddfa\u200b\ud83c\uddf3")&&!n(e,"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f","\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f");case"emoji":return!n(e,"\ud83d\udc26\u200d\u2b1b","\ud83d\udc26\u200b\u2b1b")}return!1}function f(e,t,n){var r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):i.createElement("canvas"),a=r.getContext("2d",{willReadFrequently:!0}),o=(a.textBaseline="top",a.font="600 32px Arial",{});return e.forEach(function(e){o[e]=t(a,e,n)}),o}function t(e){var t=i.createElement("script");t.src=e,t.defer=!0,i.head.appendChild(t)}"undefined"!=typeof Promise&&(o="wpEmojiSettingsSupports",s=["flag","emoji"],n.supports={everything:!0,everythingExceptFlag:!0},e=new Promise(function(e){i.addEventListener("DOMContentLoaded",e,{once:!0})}),new Promise(function(t){var n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(s),u.toString(),p.toString()].join(",")+"));",r=new Blob([e],{type:"text/javascript"}),a=new Worker(URL.createObjectURL(r),{name:"wpTestEmojiSupports"});return void(a.onmessage=function(e){c(n=e.data),a.terminate(),t(n)})}catch(e){}c(n=f(s,u,p))}t(n)}).then(function(e){for(var t in e)n.supports[t]=e[t],n.supports.everything=n.supports.everything&&n.supports[t],"flag"!==t&&(n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&n.supports[t]);n.supports.everythingExceptFlag=n.supports.everythingExceptFlag&&!n.supports.flag,n.DOMReady=!1,n.readyCallback=function(){n.DOMReady=!0}}).then(function(){return e}).then(function(){var e;n.supports.everything||(n.readyCallback(),(e=n.source||{}).concatemoji?t(e.concatemoji):e.wpemoji&&e.twemoji&&(t(e.twemoji),t(e.wpemoji)))}))}((window,document),window._wpemojiSettings);
/* ]]> */
</script>
<link rel='stylesheet' id='ht_ctc_main_css-css' href='https://salesleadsforever.com/wp-content/plugins/click-to-chat-for-whatsapp/new/inc/assets/css/main.css?ver=4.8' type='text/css' media='all' />
<link rel='stylesheet' id='layerslider-css' href='https://salesleadsforever.com/wp-content/plugins/LayerSlider/assets/static/layerslider/css/layerslider.css?ver=7.1.3' type='text/css' media='all' />
<style id='wp-emoji-styles-inline-css' type='text/css'>

	img.wp-smiley, img.emoji {
		display: inline !important;
		border: none !important;
		box-shadow: none !important;
		height: 1em !important;
		width: 1em !important;
		margin: 0 0.07em !important;
		vertical-align: -0.1em !important;
		background: none !important;
		padding: 0 !important;
	}
</style>
<link rel='stylesheet' id='wp-block-library-css' href='https://salesleadsforever.com/wp-includes/css/dist/block-library/style.min.css?ver=6.5.2' type='text/css' media='all' />
<style id='classic-theme-styles-inline-css' type='text/css'>
/*! This file is auto-generated */
.wp-block-button__link{color:#fff;background-color:#32373c;border-radius:9999px;box-shadow:none;text-decoration:none;padding:calc(.667em + 2px) calc(1.333em + 2px);font-size:1.125em}.wp-block-file__button{background:#32373c;color:#fff;text-decoration:none}
</style>
<style id='global-styles-inline-css' type='text/css'>
body{--wp--preset--color--black: #000000;--wp--preset--color--cyan-bluish-gray: #abb8c3;--wp--preset--color--white: #ffffff;--wp--preset--color--pale-pink: #f78da7;--wp--preset--color--vivid-red: #cf2e2e;--wp--preset--color--luminous-vivid-orange: #ff6900;--wp--preset--color--luminous-vivid-amber: #fcb900;--wp--preset--color--light-green-cyan: #7bdcb5;--wp--preset--color--vivid-green-cyan: #00d084;--wp--preset--color--pale-cyan-blue: #8ed1fc;--wp--preset--color--vivid-cyan-blue: #0693e3;--wp--preset--color--vivid-purple: #9b51e0;--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg,rgba(6,147,227,1) 0%,rgb(155,81,224) 100%);--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg,rgb(122,220,180) 0%,rgb(0,208,130) 100%);--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg,rgba(252,185,0,1) 0%,rgba(255,105,0,1) 100%);--wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg,rgba(255,105,0,1) 0%,rgb(207,46,46) 100%);--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg,rgb(238,238,238) 0%,rgb(169,184,195) 100%);--wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%);--wp--preset--gradient--blush-light-purple: linear-gradient(135deg,rgb(255,206,236) 0%,rgb(152,150,240) 100%);--wp--preset--gradient--blush-bordeaux: linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%);--wp--preset--gradient--luminous-dusk: linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%);--wp--preset--gradient--pale-ocean: linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%);--wp--preset--gradient--electric-grass: linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%);--wp--preset--gradient--midnight: linear-gradient(135deg,rgb(2,3,129) 0%,rgb(40,116,252) 100%);--wp--preset--font-size--small: 13px;--wp--preset--font-size--medium: 20px;--wp--preset--font-size--large: 36px;--wp--preset--font-size--x-large: 42px;--wp--preset--spacing--20: 0.44rem;--wp--preset--spacing--30: 0.67rem;--wp--preset--spacing--40: 1rem;--wp--preset--spacing--50: 1.5rem;--wp--preset--spacing--60: 2.25rem;--wp--preset--spacing--70: 3.38rem;--wp--preset--spacing--80: 5.06rem;--wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);--wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);--wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);--wp--preset--shadow--outlined: 6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1);--wp--preset--shadow--crisp: 6px 6px 0px rgba(0, 0, 0, 1);}:where(.is-layout-flex){gap: 0.5em;}:where(.is-layout-grid){gap: 0.5em;}body .is-layout-flow > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-flow > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-flow > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignleft{float: left;margin-inline-start: 0;margin-inline-end: 2em;}body .is-layout-constrained > .alignright{float: right;margin-inline-start: 2em;margin-inline-end: 0;}body .is-layout-constrained > .aligncenter{margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)){max-width: var(--wp--style--global--content-size);margin-left: auto !important;margin-right: auto !important;}body .is-layout-constrained > .alignwide{max-width: var(--wp--style--global--wide-size);}body .is-layout-flex{display: flex;}body .is-layout-flex{flex-wrap: wrap;align-items: center;}body .is-layout-flex > *{margin: 0;}body .is-layout-grid{display: grid;}body .is-layout-grid > *{margin: 0;}:where(.wp-block-columns.is-layout-flex){gap: 2em;}:where(.wp-block-columns.is-layout-grid){gap: 2em;}:where(.wp-block-post-template.is-layout-flex){gap: 1.25em;}:where(.wp-block-post-template.is-layout-grid){gap: 1.25em;}.has-black-color{color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-color{color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-color{color: var(--wp--preset--color--white) !important;}.has-pale-pink-color{color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-color{color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-color{color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-color{color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-color{color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-color{color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-color{color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-color{color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-color{color: var(--wp--preset--color--vivid-purple) !important;}.has-black-background-color{background-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-background-color{background-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-background-color{background-color: var(--wp--preset--color--white) !important;}.has-pale-pink-background-color{background-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-background-color{background-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-background-color{background-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-background-color{background-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-background-color{background-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-background-color{background-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-background-color{background-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-background-color{background-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-background-color{background-color: var(--wp--preset--color--vivid-purple) !important;}.has-black-border-color{border-color: var(--wp--preset--color--black) !important;}.has-cyan-bluish-gray-border-color{border-color: var(--wp--preset--color--cyan-bluish-gray) !important;}.has-white-border-color{border-color: var(--wp--preset--color--white) !important;}.has-pale-pink-border-color{border-color: var(--wp--preset--color--pale-pink) !important;}.has-vivid-red-border-color{border-color: var(--wp--preset--color--vivid-red) !important;}.has-luminous-vivid-orange-border-color{border-color: var(--wp--preset--color--luminous-vivid-orange) !important;}.has-luminous-vivid-amber-border-color{border-color: var(--wp--preset--color--luminous-vivid-amber) !important;}.has-light-green-cyan-border-color{border-color: var(--wp--preset--color--light-green-cyan) !important;}.has-vivid-green-cyan-border-color{border-color: var(--wp--preset--color--vivid-green-cyan) !important;}.has-pale-cyan-blue-border-color{border-color: var(--wp--preset--color--pale-cyan-blue) !important;}.has-vivid-cyan-blue-border-color{border-color: var(--wp--preset--color--vivid-cyan-blue) !important;}.has-vivid-purple-border-color{border-color: var(--wp--preset--color--vivid-purple) !important;}.has-vivid-cyan-blue-to-vivid-purple-gradient-background{background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;}.has-light-green-cyan-to-vivid-green-cyan-gradient-background{background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;}.has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;}.has-luminous-vivid-orange-to-vivid-red-gradient-background{background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;}.has-very-light-gray-to-cyan-bluish-gray-gradient-background{background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;}.has-cool-to-warm-spectrum-gradient-background{background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;}.has-blush-light-purple-gradient-background{background: var(--wp--preset--gradient--blush-light-purple) !important;}.has-blush-bordeaux-gradient-background{background: var(--wp--preset--gradient--blush-bordeaux) !important;}.has-luminous-dusk-gradient-background{background: var(--wp--preset--gradient--luminous-dusk) !important;}.has-pale-ocean-gradient-background{background: var(--wp--preset--gradient--pale-ocean) !important;}.has-electric-grass-gradient-background{background: var(--wp--preset--gradient--electric-grass) !important;}.has-midnight-gradient-background{background: var(--wp--preset--gradient--midnight) !important;}.has-small-font-size{font-size: var(--wp--preset--font-size--small) !important;}.has-medium-font-size{font-size: var(--wp--preset--font-size--medium) !important;}.has-large-font-size{font-size: var(--wp--preset--font-size--large) !important;}.has-x-large-font-size{font-size: var(--wp--preset--font-size--x-large) !important;}
.wp-block-navigation a:where(:not(.wp-element-button)){color: inherit;}
:where(.wp-block-post-template.is-layout-flex){gap: 1.25em;}:where(.wp-block-post-template.is-layout-grid){gap: 1.25em;}
:where(.wp-block-columns.is-layout-flex){gap: 2em;}:where(.wp-block-columns.is-layout-grid){gap: 2em;}
.wp-block-pullquote{font-size: 1.5em;line-height: 1.6;}
</style>
<link rel='stylesheet' id='contact-form-7-css' href='https://salesleadsforever.com/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=5.7.7' type='text/css' media='all' />
<link rel='stylesheet' id='uncodefont-google-css' href='//fonts.googleapis.com/css?family=Poppins%3A300%2Cregular%2C500%2C600%2C700%7CDroid+Serif%3Aregular%2Citalic%2C700%2C700italic%7CPlayfair+Display%3Aregular%2Citalic%2C700%2C700italic%2C900%2C900italic%7CRoboto%3A100%2C100italic%2C300%2C300italic%2Cregular%2Citalic%2C500%2C500italic%2C700%2C700italic%2C900%2C900italic%7CQuicksand%3A300%2Cregular%2C500%2C700%7CLora%3Aregular%2Citalic%2C700%2C700italic%7CRoboto+Condensed%3A300%2C300italic%2Cregular%2Citalic%2C700%2C700italic&#038;subset=devanagari%2Clatin-ext%2Clatin%2Ccyrillic%2Cvietnamese%2Cgreek%2Ccyrillic-ext%2Cgreek-ext&#038;ver=2.3.0.5' type='text/css' media='all' />
<link rel='stylesheet' id='uncode-privacy-css' href='https://salesleadsforever.com/wp-content/plugins/uncode-privacy/assets/css/uncode-privacy-public.css?ver=2.2.2' type='text/css' media='all' />
<link rel='stylesheet' id='njt-nofi-css' href='https://salesleadsforever.com/wp-content/plugins/notibar/assets/frontend/css/notibar.css?ver=2.1.4' type='text/css' media='all' />
<link rel='stylesheet' id='tablepress-default-css' href='https://salesleadsforever.com/wp-content/plugins/tablepress/css/build/default.css?ver=2.1.8' type='text/css' media='all' />
<link rel='stylesheet' id='uncode-style-css' href='https://salesleadsforever.com/wp-content/themes/Uncode/uncode/library/css/style.css?ver=1766631995' type='text/css' media='all' />
<style id='uncode-style-inline-css' type='text/css'>

@media (min-width: 960px) { .limit-width { max-width: 1200px; margin: auto;}}
</style>
<link rel='stylesheet' id='uncode-icons-css' href='https://salesleadsforever.com/wp-content/themes/Uncode/uncode/library/css/uncode-icons.css?ver=1766631995' type='text/css' media='all' />
<link rel='stylesheet' id='uncode-custom-style-css' href='https://salesleadsforever.com/wp-content/themes/Uncode/uncode/library/css/style-custom.css?ver=1766631995' type='text/css' media='all' />
<!--n2css--><script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-includes/js/jquery/jquery.min.js?ver=3.7.1" id="jquery-core-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.1" id="jquery-migrate-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="layerslider-utils-js-extra">
/* <![CDATA[ */
var LS_Meta = {"v":"7.1.3","fixGSAP":"1"};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/LayerSlider/assets/static/layerslider/js/layerslider.utils.js?ver=7.1.3" id="layerslider-utils-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/LayerSlider/assets/static/layerslider/js/layerslider.kreaturamedia.jquery.js?ver=7.1.3" id="layerslider-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/LayerSlider/assets/static/layerslider/js/layerslider.transitions.js?ver=7.1.3" id="layerslider-transitions-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/itro-popup/scripts/itro-scripts.js?ver=6.5.2" id="itro-scripts-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="/wp-content/themes/Uncode/uncode/library/js/ai-uncode.js&#039; id=&#039;uncodeAI&#039; data-home=&#039;/&#039; data-path=&#039;/&#039; data-breakpoints-images=&#039;258,516,720,1032,1440,2064,2880" id="ai-uncode-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="uncode-init-js-extra">
/* <![CDATA[ */
var SiteParameters = {"days":"days","hours":"hours","minutes":"minutes","seconds":"seconds","constant_scroll":"on","scroll_speed":"2","parallax_factor":"0.25","loading":"Loading\u2026","slide_name":"slide","slide_footer":"footer","ajax_url":"https:\/\/salesleadsforever.com\/wp-admin\/admin-ajax.php","nonce_adaptive_images":"17357a5cd2","enable_debug":"","block_mobile_videos":"","is_frontend_editor":"","mobile_parallax_allowed":"","wireframes_plugin_active":"1","sticky_elements":"off","lazyload_type":"","uncode_adaptive":"1"};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/themes/Uncode/uncode/library/js/init.js?ver=1766631995" id="uncode-init-js"></script>
<meta name="generator" content="Powered by LayerSlider 7.1.3 - Multi-Purpose, Responsive, Parallax, Mobile-Friendly Slider Plugin for WordPress." />
<!-- LayerSlider updates and docs at: https://layerslider.com -->
<link rel="https://api.w.org/" href="https://salesleadsforever.com/wp-json/" /><link rel="alternate" type="application/json" href="https://salesleadsforever.com/wp-json/wp/v2/posts/87712" /><link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://salesleadsforever.com/xmlrpc.php?rsd" />
<meta name="generator" content="WordPress 6.5.2" />
<link rel='shortlink' href='https://salesleadsforever.com/?p=87712' />
<link rel="alternate" type="application/json+oembed" href="https://salesleadsforever.com/wp-json/oembed/1.0/embed?url=http%3A%2F%2Fsalesleadsforever.com%2Ffree-list-of-companies-with-hr-email-details-of-indian-companies-2023%2F" />
<link rel="alternate" type="text/xml+oembed" href="https://salesleadsforever.com/wp-json/oembed/1.0/embed?url=http%3A%2F%2Fsalesleadsforever.com%2Ffree-list-of-companies-with-hr-email-details-of-indian-companies-2023%2F&#038;format=xml" />
<!-- HubSpot WordPress Plugin v11.1.40: embed JS disabled as a portalId has not yet been configured --><meta name="generator" content="Powered by Slider Revolution 6.6.8 - responsive, Mobile-Friendly Slider Plugin for WordPress with comfortable drag and drop interface." />
<script type="9dca68f643e17b109e1aaf43-text/javascript">function setREVStartSize(e){
			//window.requestAnimationFrame(function() {
				window.RSIW = window.RSIW===undefined ? window.innerWidth : window.RSIW;
				window.RSIH = window.RSIH===undefined ? window.innerHeight : window.RSIH;
				try {
					var pw = document.getElementById(e.c).parentNode.offsetWidth,
						newh;
					pw = pw===0 || isNaN(pw) || (e.l=="fullwidth" || e.layout=="fullwidth") ? window.RSIW : pw;
					e.tabw = e.tabw===undefined ? 0 : parseInt(e.tabw);
					e.thumbw = e.thumbw===undefined ? 0 : parseInt(e.thumbw);
					e.tabh = e.tabh===undefined ? 0 : parseInt(e.tabh);
					e.thumbh = e.thumbh===undefined ? 0 : parseInt(e.thumbh);
					e.tabhide = e.tabhide===undefined ? 0 : parseInt(e.tabhide);
					e.thumbhide = e.thumbhide===undefined ? 0 : parseInt(e.thumbhide);
					e.mh = e.mh===undefined || e.mh=="" || e.mh==="auto" ? 0 : parseInt(e.mh,0);
					if(e.layout==="fullscreen" || e.l==="fullscreen")
						newh = Math.max(e.mh,window.RSIH);
					else{
						e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
						for (var i in e.rl) if (e.gw[i]===undefined || e.gw[i]===0) e.gw[i] = e.gw[i-1];
						e.gh = e.el===undefined || e.el==="" || (Array.isArray(e.el) && e.el.length==0)? e.gh : e.el;
						e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
						for (var i in e.rl) if (e.gh[i]===undefined || e.gh[i]===0) e.gh[i] = e.gh[i-1];
											
						var nl = new Array(e.rl.length),
							ix = 0,
							sl;
						e.tabw = e.tabhide>=pw ? 0 : e.tabw;
						e.thumbw = e.thumbhide>=pw ? 0 : e.thumbw;
						e.tabh = e.tabhide>=pw ? 0 : e.tabh;
						e.thumbh = e.thumbhide>=pw ? 0 : e.thumbh;
						for (var i in e.rl) nl[i] = e.rl[i]<window.RSIW ? 0 : e.rl[i];
						sl = nl[0];
						for (var i in nl) if (sl>nl[i] && nl[i]>0) { sl = nl[i]; ix=i;}
						var m = pw>(e.gw[ix]+e.tabw+e.thumbw) ? 1 : (pw-(e.tabw+e.thumbw)) / (e.gw[ix]);
						newh =  (e.gh[ix] * m) + (e.tabh + e.thumbh);
					}
					var el = document.getElementById(e.c);
					if (el!==null && el) el.style.height = newh+"px";
					el = document.getElementById(e.c+"_wrapper");
					if (el!==null && el) {
						el.style.height = newh+"px";
						el.style.display = "block";
					}
				} catch(e){
					console.log("Failure at Presize of Slider:" + e)
				}
			//});
		  };</script>
<meta name="google-site-verification" content="J7gvCmXRmXxs9srAkVG8RjViWL4bYpmNOQSzOnDkQ0A" />
<script type="9dca68f643e17b109e1aaf43-text/javascript">window.fpsetting = {app_id: 2391704785183};</script><script src="https://stats.easyleadz.com/easyengage/io.js" type="9dca68f643e17b109e1aaf43-text/javascript"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HJF6P04NRC" type="9dca68f643e17b109e1aaf43-text/javascript"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HJF6P04NRC');
</script>		<style type="text/css" id="wp-custom-css">
			
a.white-btn {
	color: #000 !important;
    background: #fff !important;
    border: 1px solid #000 !important;
}

a.custom-link.btn.border-width-0.white-btn.btn-color-210407:hover{
	background: #000 !important;
    color: #fff !important;
    border-color: #000 !important;
}
input[type="submit"]{
    color: #000 !important;
}
input[type="submit"]:hover,a.custom-link.btn.border-width-0.white-btn.btn-default:hover {
   background: #000 !important;
	color:#fff !important;
}
select.wpcf7-form-control.wpcf7-select {
    border: 1px solid #ccc !important;
    color: #767676;
}
footer .uncol.style-.font-762333 p {
    color: #000 !important;
}
footer .style-color-wayh-bg *,header *,.text-white,footer#colophon a,footer#colophon p {
    color: #fff!important;
}

header.is_stuck * {
    background: #fff;
    color: #000;
}
header#masthead .menu-container {
    background: #000;
}
::selection {
  color: #006cff !important;
}
input, textarea {
    border: 1px solid #ccc !important;
}
input.btn {
    color: #fff;
}
.mobile-menu-button span.lines, .mobile-menu-button span.lines:before, .mobile-menu-button span.lines:after {
    background: #fff;
}
header.is_stuck .mobile-menu-button span.lines, header.is_stuck .mobile-menu-button span.lines:before, header.is_stuck .mobile-menu-button span.lines:after {
    background: #000;
}
#logo-container-mobile .mmb-container {
    background: transparent;
}
.menu-horizontal {
    background: #000;
}		</style>
		<noscript><style> .wpb_animate_when_almost_visible { opacity: 1; }</style></noscript></head>
<body data-rsssl=1 class="post-template-default single single-post postid-87712 single-format-standard wp-custom-logo hormenu-position-left hmenu hmenu-position-center header-full-width main-center-align menu-mobile-animated menu-mobile-transparent menu-mobile-centered menu-has-cta mobile-parallax-not-allowed ilb-no-bounce unreg qw-body-scroll-disabled wpb-js-composer js-comp-ver-6.9.0.2 vc_responsive" data-border="0">
		<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MHCQ3C4J"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) --><div class="body-borders" data-border="0"><div class="top-border body-border-shadow"></div><div class="right-border body-border-shadow"></div><div class="bottom-border body-border-shadow"></div><div class="left-border body-border-shadow"></div><div class="top-border style-light-bg"></div><div class="right-border style-light-bg"></div><div class="bottom-border style-light-bg"></div><div class="left-border style-light-bg"></div></div>	<div class="box-wrapper">
		<div class="box-container">
		<script type="9dca68f643e17b109e1aaf43-text/javascript" id="initBox">UNCODE.initBox();</script>
		<div class="menu-wrapper menu-sticky menu-no-arrows">
													
													<header id="masthead" class="navbar menu-primary menu-light submenu-light style-light-original menu-animated menu-with-logo">
														<div class="menu-container style-color-xsdn-bg menu-borders menu-shadows">
															<div class="row-menu">
																<div class="row-menu-inner">
																	<div id="logo-container-mobile" class="col-lg-0 logo-container middle">
																		<div id="main-logo" class="navbar-header style-light">
																			<a href="https://salesleadsforever.com" class="navbar-brand"><div class="logo-customizer"><img decoding="async" src="https://salesleadsforever.com/wp-content/uploads/2023/05/cropped-Sales-Leads-Forever-2.jpg" alt="Sales Leads Forever" width="150" height="50" /></div></a>
																		</div>
																		<div class="mmb-container"><div class="mobile-additional-icons"><a class="desktop-hidden  mobile-search-icon trigger-overlay mobile-additional-icon" data-area="search" data-container="box-container" href="#"><span class="search-icon-container additional-icon-container"><i class="fa fa-search3"></i></span></a></div><div class="mobile-menu-button 1 mobile-menu-button-light lines-button x2"><span class="lines"></span></div></div>
																	</div>
																	<div class="col-lg-12 main-menu-container middle">
																		<div class="menu-horizontal menu-dd-shadow-lg">
																			<div class="menu-horizontal-inner">
																				<div class="nav navbar-nav navbar-cta"><ul id="menu-primary-menu" class="menu-cta-inner menu-smart sm"><li id="menu-item-88163" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-88163 menu-item-link"><a title="Home" href="https://salesleadsforever.com/">Home<i class="fa fa-angle-right fa-dropdown"></i></a></li>
<li id="menu-item-88164" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-88164 menu-item-link"><a title="Who are We" href="https://salesleadsforever.com/about-us/">Who are We<i class="fa fa-angle-right fa-dropdown"></i></a></li>
<li id="menu-item-88332" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88332 menu-item-link"><a title="B2B Contact Data" href="https://salesleadsforever.com/b2b-contact-database-solution/">B2B Contact Data<i class="fa fa-angle-right fa-dropdown"></i></a></li>
<li id="menu-item-88333" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88333 menu-item-link"><a title="B2B Lead Gen" href="https://salesleadsforever.com/b2b-email-marketing/">B2B Lead Gen<i class="fa fa-angle-right fa-dropdown"></i></a></li>
<li id="menu-item-88334" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-88334 menu-item-link"><a title="SEO Service" href="https://salesleadsforever.com/seo-service-bangalore/">SEO Service<i class="fa fa-angle-right fa-dropdown"></i></a></li>
<li id="menu-item-88165" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-88165 menu-item-link"><a title="Blogs" href="https://salesleadsforever.com/blogs/">Blogs<i class="fa fa-angle-right fa-dropdown"></i></a></li>
<li id="menu-item-88162" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-88162 menu-item-link"><a title="Contact Us" href="https://salesleadsforever.com/contact-us/">Contact Us<i class="fa fa-angle-right fa-dropdown"></i></a></li>
</ul></div><div class="nav navbar-nav navbar-nav-last"><ul class="menu-smart sm menu-icons"><li class="menu-item-link search-icon style-light dropdown mobile-hidden tablet-hidden"><a href="#" class="trigger-overlay search-icon" data-area="search" data-container="box-container">
													<i class="fa fa-search3"></i><span class="desktop-hidden"><span>Search</span></span><i class="fa fa-angle-down fa-dropdown desktop-hidden"></i>
													</a></li></ul></div></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</header>
												</div>			<script type="9dca68f643e17b109e1aaf43-text/javascript" id="fixMenuHeight">UNCODE.fixMenuHeight();</script>
			<div class="main-wrapper">
				<div class="main-container">
					<div class="page-wrapper">
						<div class="sections-container">
<div id="page-header"><div class="header-wrapper header-uncode-block">
									<div data-parent="true" class="vc_row style-color-wayh-bg row-container with-kburns with-parallax"><div class="row-background background-element">
											<div class="background-wrapper">
												<div class="background-inner adaptive-async" style="background-image: url(https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022-uai-258x173.jpg);background-repeat: no-repeat;background-position: center center;background-size: cover;" data-uniqueid="87713-126930" data-guid="https://salesleadsforever.com/wp-content/uploads/2023/02/Free-HR-Email-Addresses-2022.jpg" data-path="2023/02/Free-HR-Email-Addresses-2022.jpg" data-width="1280" data-height="856" data-singlew="12" data-singleh="null" data-crop=""></div>
												<div class="block-bg-overlay style-color-wayh-bg" style="opacity: 0.65;"></div>
											</div>
										</div><div class="row double-top-padding double-bottom-padding double-h-padding full-width row-parent row-header" data-height-ratio="74"><div class="wpb_row row-inner"><div class="wpb_column pos-middle pos-center align_center column_parent col-lg-12 half-internal-gutter"><div class="uncol style-dark"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="vc_custom_heading_wrap "><div class="heading-text el-text curtain animate_inner_when_almost_visible el-text-split" data-delay="400"><h1 class="font-762333 fontsize-338686 fontspace-111509 font-weight-700 font-obs" data-style="normal" data-weight="700" data-font="Poppins"><span class="heading-text-inner"><span class="split-word word1"><span class="split-word-flow"><span class="split-word-inner">Free</span></span></span><span class="split-word word2"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>List</span></span></span><span class="split-word word3"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>of</span></span></span><span class="split-word word4"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>HR</span></span></span><span class="split-word word5"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>Email</span></span></span><span class="split-word word6"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>Details</span></span></span><span class="split-word word7"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>of</span></span></span><span class="split-word word8"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>Indian</span></span></span><span class="split-word word9"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>Companies</span></span></span><span class="split-word word10"><span class="split-word-flow"><span class="split-word-inner"><span class="split-word-empty">&nbsp;</span>2023</span></span></span></span></h1></div><div class="clear"></div></div><div class="empty-space empty-quart" ><span class="empty-space-inner"></span></div>
</div></div></div></div></div><script id="script-163127" data-row="script-163127" type="9dca68f643e17b109e1aaf43-text/javascript" class="vc_controls">UNCODE.initRow(document.getElementById("script-163127"));</script></div></div></div><div class="header-scrolldown style-dark"><i class="fa fa-angle-down"></i></div></div></div><script type="9dca68f643e17b109e1aaf43-text/javascript">UNCODE.initHeader();</script><article id="post-87712" class="page-body style-light-bg post-87712 post type-post status-publish format-standard has-post-thumbnail hentry category-generic-information tag-linkedin-industry-list">
          <div class="post-wrapper">
          	<div class="post-body"><div class="post-content un-no-sidebar-layout"><div data-parent="true" class="vc_row row-container"><div class="row limit-width row-parent"><div class="wpb_row row-inner"><div class="wpb_column pos-top pos-center align_left column_parent col-lg-12 single-internal-gutter"><div class="uncol style-light"  ><div class="uncoltable"><div class="uncell"><div class="uncont no-block-padding col-custom-width" style="max-width:1200px;"><div class="uncode_text_column" >
<table id="tablepress-19" class="tablepress tablepress-id-19">
<thead>
<tr class="row-1 odd">
	<th class="column-1">Full Name</th><th class="column-2">Title</th><th class="column-3">Company Name</th><th class="column-4">Country</th>
</tr>
</thead>
<tbody>
<tr class="row-2 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f89999939996938b9099d69599909d8b908f998a91b88b8196978a9189d69196">Aakanksha Maheshwari</a></td><td class="column-2">AVP-HR</td><td class="column-3">Synoriq</td><td class="column-4">India</td>
</tr>
<tr class="row-3 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e4f4f404d464f42004d46415e5c4f6e5a5c4f405d5b40474140004d4143">Aanchal Chopra</a></td><td class="column-2">Sr. Director &amp; Head Human Resources</td><td class="column-3">TransUnion CIBIL</td><td class="column-4">India</td>
</tr>
<tr class="row-4 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96f7f7f8f5fef7fab8e5f7e6e4f7d6fae4f8b8f5f9fb">Aanchal Sapra</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">LRN</td><td class="column-4">India</td>
</tr>
<tr class="row-5 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#24454556504d0a574b4a4d64404c454a51574c4d4a424b5041474c0a474b49">Aarti Soni</a></td><td class="column-2">Associate Director public health</td><td class="column-3">Dhanush InfoTech</td><td class="column-4">India</td>
</tr>
<tr class="row-6 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a2b2b383f392223642d252f260a282f3e3e2f383a262b292f642925642324">Aarushi Goel</a></td><td class="column-2">Human Resources Director &amp; ESG Lead</td><td class="column-3">BetterPlace</td><td class="column-4">India</td>
</tr>
<tr class="row-7 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52333321263a337c3033262033123527332427217c313d3f">Aastha Batra</a></td><td class="column-2">Director - People Operations</td><td class="column-3">Guavus</td><td class="column-4">India</td>
</tr>
<tr class="row-8 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#345556555a405d1a5055475341444055745551471a5d5a">Abanti Dasgupta</a></td><td class="column-2">Head Of HR</td><td class="column-3">AES Technologies India</td><td class="column-4">India</td>
</tr>
<tr class="row-9 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d7c7f75745d797c697c6d686f78337e72">Abhi </a></td><td class="column-2">Head HR</td><td class="column-3">DataPure</td><td class="column-4">India</td>
</tr>
<tr class="row-10 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4e2f2c262724273a0e2f2927222b2d3c23602d2123">Abhijit </a></td><td class="column-2">DIRECTOR OF OPERATIONS &amp; HUMAN RESOURCES</td><td class="column-3">Mantra</td><td class="column-4">India</td>
</tr>
<tr class="row-11 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3657545e5f5c5f42184643445f765543535a59515f551855595b">Abhijit Puri</a></td><td class="column-2">Head HR</td><td class="column-3">Cuelogic Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-12 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e0818288898c81938881ce83a08b92819a998d818e949281ce838f8d">Abhilasha Chhawachharia</a></td><td class="column-2">AVP-Delivery - Recruitment</td><td class="column-3">Krazy Mantra Group of Companies</td><td class="column-4">India</td>
</tr>
<tr class="row-13 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddbcbfb5b4b3bcabf3b7bcb4b39daeb5b1f3beb2b0">Abhinav Jain</a></td><td class="column-2">Head of Talent Acquisition, India</td><td class="column-3">Aspiring Minds</td><td class="column-4">India</td>
</tr>
<tr class="row-14 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#80e1e2e8e9eee1f9aef3e1edf3efeec0e7e5eefae5efeeaee3efed">Abhinay Samson</a></td><td class="column-2">Director People and Culture</td><td class="column-3">Genzeon</td><td class="column-4">India</td>
</tr>
<tr class="row-15 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#39585b515057584058174a4b794a564b565a56175a5654">Abhinaya R</a></td><td class="column-2">Global Head of People &amp; Talent</td><td class="column-3">Soroco</td><td class="column-4">India</td>
</tr>
<tr class="row-16 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f697959e97828293849c9393b69f829f92978297d895999b">Abhishek Chatterjee</a></td><td class="column-2">Director Human Resources</td><td class="column-3">ITI Data</td><td class="column-4">India</td>
</tr>
<tr class="row-17 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b3a39333228333e307531333a1b2c29322f3e2932353d3429363a2f32343575383436">Abhishek Jha</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Writer Information</td><td class="column-4">India</td>
</tr>
<tr class="row-18 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#39585b51504a515c5217524c54584b08795a4b564e574a4d585a52175a5654">Abhishek Kumar</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Crownstack</td><td class="column-4">India</td>
</tr>
<tr class="row-19 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e382918c9aa392828d828f9a909790cd808c8e">Abhishek Roy</a></td><td class="column-2">Director of Recruiting Operations</td><td class="column-3">Q Analysts</td><td class="column-4">India</td>
</tr>
<tr class="row-20 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8d9dad0d1cbd0ddd3f8d0d9d5d5d7c996dbd7d5">Abhishek Sharma</a></td><td class="column-2">Vice President Operations and Human Resource</td><td class="column-3">Hammoq</td><td class="column-4">India</td>
</tr>
<tr class="row-21 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7c6c5c8cbce89ccd2d5d1c2e7c6cbd3ced2d4c3c6d3c689c4c8ca">Aboli Kurve</a></td><td class="column-2">Head of HR</td><td class="column-3">Altius</td><td class="column-4">India</td>
</tr>
<tr class="row-22 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a6b69626364246e6b794a7f667e79246364">Achin Das</a></td><td class="column-2">Chief Talent Officer</td><td class="column-3">UL Technology Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-23 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4524262d2c2b313c240529202b3137246b242c">Achintya Jayakumar</a></td><td class="column-2">Human Resources Specialist (CHROs Office)</td><td class="column-3">Lentra</td><td class="column-4">India</td>
</tr>
<tr class="row-24 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3657525f425f1851434642577652574c534159445d451855595b">Aditi Gupta</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Dazeworks Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-25 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#21404548554861524c405355424e560f4048">Aditi Pandya</a></td><td class="column-2">Head Human Resources and Operations</td><td class="column-3">SmartCow</td><td class="column-4">India</td>
</tr>
<tr class="row-26 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#92f3f6fbe6fbbce6f3fcf6fdfcd2f3fff0fbe6e1fdf4e6e5f3e0f7bcf1fdff">Aditi Tandon</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Ambit Software</td><td class="column-4">India</td>
</tr>
<tr class="row-27 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#09686d607d70686349686d607d607a7d686f6f60676e276a6664">Aditya Jishtu</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-28 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e0818496898b81a0939481929495908e8194898f8ece838f8d">Advika Ladkani</a></td><td class="column-2">Head of HR</td><td class="column-3">StartUP</td><td class="column-4">India</td>
</tr>
<tr class="row-29 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b6a6d786a67256a696f7e6760636a65624b716a6d626525686466">Afsal Abdulkhani</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">Zafin</td><td class="column-4">India</td>
</tr>
<tr class="row-30 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6a0b0c100b06440d03180b09022a19050c1e040b1f1e03091944090507">Afzal Girach</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Softnautics</td><td class="column-4">India</td>
</tr>
<tr class="row-31 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c9a8a3a8a7bda8e7aea1a6baa189a8a8abbab0bae7aaa6a4">Ajanta Ghosh</a></td><td class="column-2">HEAD - HR Processes.</td><td class="column-3">AABSyS IT</td><td class="column-4">India</td>
</tr>
<tr class="row-32 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8eefe4eff7a0ece6effae7efcef6efe0fdefa0ede1e3">Ajay Bhatia</a></td><td class="column-2">Vice President (HR)</td><td class="column-3">Xansa plc</td><td class="column-4">India</td>
</tr>
<tr class="row-33 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e4858e859dca8e8b978c8da49685808d9c938186ca878b89">Ajay Joshi</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Radixweb</td><td class="column-4">India</td>
</tr>
<tr class="row-34 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96f7fcf7efb8fbe3f2fafff7e4d6f0e3faf5e4e3fbf2fff1ffe2f7fab8f5f9fb">Ajay Mudliar</a></td><td class="column-2">Global Head - Talent Acquisition</td><td class="column-3">Fulcrum Digital Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-35 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f6979c978fd8829798819784b6868384938599908281978493d895999b">Ajay Tanwar</a></td><td class="column-2">Associate Director- Talent Acquisition</td><td class="column-3">PureSoftware</td><td class="column-4">India</td>
</tr>
<tr class="row-36 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#30515a594458511e547043595d511e5159">Ajitha D</a></td><td class="column-2">Head of Recruiting and HR, India Operations</td><td class="column-3">SiMa.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-37 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#65040e040b0e160d04250d040b104b060a08">Akanksha Choudhary</a></td><td class="column-2">Global Head of HR &amp; Culture</td><td class="column-3">Hanu Software</td><td class="column-4">India</td>
</tr>
<tr class="row-38 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dcbdb7bdb2b7afb4bdf2aca9aeb59cafb3a9aebfb9baa9afb9f2bfb3b1">Akanksha Puri</a></td><td class="column-2">Associate Director HR</td><td class="column-3">SourceFuse Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-39 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c1d171d12170f141d520f131b1d12153c0c190e191212151d100f050f521f1311">Akanksha Sogani</a></td><td class="column-2">Head HR</td><td class="column-3">Perennial Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-40 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#66070d0e0f0a260f040e130415480509">Akhil Jogiparthi</a></td><td class="column-2">Vice President - Talent Accelerator</td><td class="column-3">iB Hubs</td><td class="column-4">India</td>
</tr>
<tr class="row-41 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#27464c4f4e4b4667425453524653420944484a">Akhila Chandan</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">Estuate,</td><td class="column-4">India</td>
</tr>
<tr class="row-42 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93f2f8e1f2febdfefcfbf2fefef2f7d3f0fcffe1e6eae7f4e1fce6e3bdf0fcfe">Akram Mohammad</a></td><td class="column-2">Deputy Head Head HR</td><td class="column-3">Colruyt India</td><td class="column-4">India</td>
</tr>
<tr class="row-43 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c6d677e6578654c69607f62697e226562">Akriti </a></td><td class="column-2">HR-Head</td><td class="column-3">Elsner Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-44 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3859534b50594c59165a5059565c594a5d784f51565c55515454165b50">Akshata Bhandare</a></td><td class="column-2">HR &amp; Location Head, India</td><td class="column-3">Windmill</td><td class="column-4">India</td>
</tr>
<tr class="row-45 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#66070a040f080926160f1e0f1548070f">Albino Mascarenhas</a></td><td class="column-2">Head - Human Resources Global</td><td class="column-3">Pyxis One</td><td class="column-4">India</td>
</tr>
<tr class="row-46 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f5949999828c9bdb87b5849787949c9b8ddb969a98">Allwyn Richard</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">QBrainX Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-47 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0d1dcdfdb9ec3d9ded7d8f0c2d5d3c2df9ed9df">Alok Baghel</a></td><td class="column-2">Head Of Talent Management</td><td class="column-3">Recro</td><td class="column-4">India</td>
</tr>
<tr class="row-48 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d0c010206430618000c1f2d1b0b041e0106430e0200">Alok Kumar</a></td><td class="column-2">Operations Leader and Head Transitions, L&amp;D</td><td class="column-3">VFI SLK</td><td class="column-4">India</td>
</tr>
<tr class="row-49 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3958554e4057175b584b4b5c4d4d567950575f4b584a565f4d4d5c5a51175a5654">Alwyn Barretto</a></td><td class="column-2">Head Recruitments</td><td class="column-3">Infrasoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-50 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5938343837773231383719382b3c2d3c38372a2d3c3a31773a3634">Aman Khan</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Areteans</td><td class="column-4">India</td>
</tr>
<tr class="row-51 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98f9f5f9f6fcfdfde8b6f3d8f9f6ecf1fdeaebf7f4edecf1f7f6ebb6fbf7f5">Amandeep Kaur</a></td><td class="column-2">Sr. HR Executive (Technical Recruitment Head)</td><td class="column-3">Antier Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-52 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c8c4c8db87dac0c7c1c8e9c7c0ddc6dbc0c7cfc6ddcccac187cac6c4">Amar Sinha</a></td><td class="column-2">Director Talent Acquisition (People Function)</td><td class="column-3">Nitor Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-53 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#17767a75657e647f397c7679627970785775726e7879737c726e3974787a">Ambrish Kanungo</a></td><td class="column-2">Head of HR</td><td class="column-3">Beyond Key</td><td class="column-4">India</td>
</tr>
<tr class="row-54 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cfaea2a6a6bbe1aeb9aeaebcbba7a68faea3bbbaaba0e1aca0">Amiit Avaasthi</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Altudo</td><td class="column-4">India</td>
</tr>
<tr class="row-55 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#31505c58451f5c505d595e4543507146445f5554435c505f45595e5c41425e5f1f525e5c">Amit </a></td><td class="column-2">Chief People Officer</td><td class="column-3">Wunderman Thompson MSC</td><td class="column-4">India</td>
</tr>
<tr class="row-56 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cdaca0a4b98da5aca3b8e3aea2a0">Amit Kataria</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Hanu Software</td><td class="column-4">India</td>
</tr>
<tr class="row-57 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2544484c510b5557445c44424c654649444c4842404b4c50560b464a48">Amit Prayagi</a></td><td class="column-2">Head Of Recruitment &amp; HR Operation</td><td class="column-3">Claim Genius</td><td class="column-4">India</td>
</tr>
<tr class="row-58 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2d3dfdbc69cc0d3dcd8d3dcf2c1d1dbd9d7cb9cd3db">Amit Ranjan</a></td><td class="column-2">Associate Director- Talent Solutions</td><td class="column-3">SCIKEY</td><td class="column-4">India</td>
</tr>
<tr class="row-59 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c5d515548124f5d5453537c5d4e5948595d524f48595f54125f5351">Amit Sahoo</a></td><td class="column-2">Vice President and Global Head - Human Resources</td><td class="column-3">Areteans</td><td class="column-4">India</td>
</tr>
<tr class="row-60 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8c9dbc0c1dcc9c4e8dbdec9c586cbc7c5">Amita Shital</a></td><td class="column-2">Head of HR</td><td class="column-3">SVAM International</td><td class="column-4">India</td>
</tr>
<tr class="row-61 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a6b67637e6f7962247c6f78676b4a69626f6f7879636424696567">Amitesh Verma</a></td><td class="column-2">Associate Director, Talent Acquisition</td><td class="column-3">Cheers Interactive</td><td class="column-4">India</td>
</tr>
<tr class="row-62 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4d5d9ddc0dcd59adff4c7d1d7c1c6d19986809ad7dbd9">Amitha K</a></td><td class="column-2">Director- HR</td><td class="column-3">Secure-24</td><td class="column-4">India</td>
</tr>
<tr class="row-63 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#41202c2d202f6f2f2026012c2b342f2235282e2f6f282f">Amlan Nag</a></td><td class="column-2">General Manager &amp; Head HR</td><td class="column-3">mjunction services</td><td class="column-4">India</td>
</tr>
<tr class="row-64 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcddd1ced9cfd4d1fcc6d9d2d8ced5cad992dfd3d1">Amresh Mehra</a></td><td class="column-2">VP - People &amp; Culture</td><td class="column-3">Zendrive</td><td class="column-4">India</td>
</tr>
<tr class="row-65 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c8c2c0dac1c6dbcce9cdc0c4c8cec087cac6c4">Amrita </a></td><td class="column-2">Director of  People Operations, India</td><td class="column-3">Dimagi</td><td class="column-4">India</td>
</tr>
<tr class="row-66 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97f6fae5fee3f6b9f4fff2f2faf6d7fbf8f4f8f9f6e1b9f4f8fa">Amrita Cheema</a></td><td class="column-2">Head HR - Global SaaS</td><td class="column-3">LocoNav</td><td class="column-4">India</td>
</tr>
<tr class="row-67 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#26474b544f524708554f48414e664549414348524f4840490845494b">Amrita Singh</a></td><td class="column-2">Director - Recruitment &amp; Delivery (US Staffing)</td><td class="column-3">COGENT Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-68 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfded2cdd6cbde91ccd6d1d8d7ffd6cbdddb91d1dacb">Amrita Singh</a></td><td class="column-2">Head HR (India)</td><td class="column-3">IT BY DESIGN</td><td class="column-4">India</td>
</tr>
<tr class="row-69 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#553438273c21341526313b3432393a3734397b363a38">Amrita Tripathi</a></td><td class="column-2">VP - India, ME and APAC HR</td><td class="column-3">Stanley David and Associates</td><td class="column-4">India</td>
</tr>
<tr class="row-70 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#77161a051e0312041f59041f021c1b16371a0e101603125914181a">Amritesh Shukla</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">MyGate</td><td class="column-4">India</td>
</tr>
<tr class="row-71 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a1c0ccd3d4d5c0e1c6d3c4c0d5d1cdc0c2c4c8d5d2c4d3d7c8c2c4d28fc2cecc">Amruta Urkude</a></td><td class="column-2">HR Head (Generalist)</td><td class="column-3">Great Place IT Services</td><td class="column-4">India</td>
</tr>
<tr class="row-72 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aacbc7dfc6d3cb84c7d9eadfdedec2dfc4cdcb84c9c5c7">Amulya </a></td><td class="column-2">Director HR</td><td class="column-3">Utthunga</td><td class="column-4">India</td>
</tr>
<tr class="row-73 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c6d626d6268226f647e657f78637c64697e4c6b7e6d7f7f7e6363787f6e7c63226f6361">Anand Christopher</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Grassroots</td><td class="column-4">India</td>
</tr>
<tr class="row-74 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f3929d929d97dd96b39a9d9081969595dd909c9e">Anand E</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Increff</td><td class="column-4">India</td>
</tr>
<tr class="row-75 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8b9b398e0b3b5b1b4bdabf6bbb7b5">Anand K</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">SecureKloud Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-76 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4b2a252a252f200b3b232a39262a392a282065282426">Anand Khot</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Pharmarack</td><td class="column-4">India</td>
</tr>
<tr class="row-77 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90f1fef1fef4bee2d0e7f8f1e4f1e2f1f7f5bef3fffd">Anand Rajendran</a></td><td class="column-2">Director - HR</td><td class="column-3">ADK Rage</td><td class="column-4">India</td>
</tr>
<tr class="row-78 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#35545b545b51755d40575c595a1b565a58">Anand Sasidharan</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Hubilo</td><td class="column-4">India</td>
</tr>
<tr class="row-79 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f5faf5faf0d4f5e1eef9fbe6baf7fbf9">Anand Sl</a></td><td class="column-2">HR Director / Operations Head (India)</td><td class="column-3">Auzmor</td><td class="column-4">India</td>
</tr>
<tr class="row-80 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f6e616e616b4f6c6e7f7c667b6a6c67216c6062">Anand Soni</a></td><td class="column-2">Talent Acquisition Head</td><td class="column-3">Capsitech</td><td class="column-4">India</td>
</tr>
<tr class="row-81 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c1d0814151d1b1d0e1d161d123c151212150a1915121f521f1311">Anand Thiagarajan</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Innive Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-82 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#78191619161c1011560b381c0b150b171e0c561b1715">Anandhi Srinivasan</a></td><td class="column-2">Associate Vice President - Human Resources</td><td class="column-3">DSM SOFT</td><td class="column-4">India</td>
</tr>
<tr class="row-83 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83e2ede2edf7ebf1e2eeadeafae6f1c3e0f6f0f7eceee6f1e0e6edf7f1eae2ade0ecee">Ananthram Iyer</a></td><td class="column-2">Vice President HR</td><td class="column-3">Customer Centria</td><td class="column-4">India</td>
</tr>
<tr class="row-84 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9cfdf2eefdefe8f3fbf5dcf9f2f4fdf2fff9f5e8b2fff3f1">Anchal Rastogi</a></td><td class="column-2">AVP Recruitments</td><td class="column-3">Enhance IT</td><td class="column-4">India</td>
</tr>
<tr class="row-85 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3554544754465c5b547541505e464c46415058461b565a58">Anchan Arasinaguppe</a></td><td class="column-2">Associate Director Talent Acquisition</td><td class="column-3">TEKsystems Global Services in India</td><td class="column-4">India</td>
</tr>
<tr class="row-86 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2d3dcd5d7de9cdfd3c6dad7c5f2d6d7dec2dadbca9cd1dddf">Angel Mathew</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Delphix</td><td class="column-4">India</td>
</tr>
<tr class="row-87 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f697989f9ad8959e9798928497b6829e9983919e8285869982d895999b">Anil Chandra</a></td><td class="column-2">Senior Director, Talent Acquisition</td><td class="column-3">ThoughtSpot</td><td class="column-4">India</td>
</tr>
<tr class="row-88 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#58393631347633183b372a3d2b2c393b33763137">Anil K</a></td><td class="column-2">Human Resources Director</td><td class="column-3">CoreStack</td><td class="column-4">India</td>
</tr>
<tr class="row-89 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8cede2e5e0a2e1e3f8f9fee5ccffe3e0f9ebe9e2e5f4a2efe3e1">Anil Moturi</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Solugenix</td><td class="column-4">India</td>
</tr>
<tr class="row-90 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e687888f8ac8968394838f9487a6908f958f848a83878a968e87c885898b">Anil Pereira</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Visible Alpha</td><td class="column-4">India</td>
</tr>
<tr class="row-91 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f7e71767331746a727e6d5f7973666b676b317c7072">Anil Ramachandran</a></td><td class="column-2">Head - Global HR</td><td class="column-3">Flytxt</td><td class="column-4">India</td>
</tr>
<tr class="row-92 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d0c030401431902000c1f2d0b091e040309040c430e02430403">Anil Tomar</a></td><td class="column-2">HR Head</td><td class="column-3">Fourth Dimension Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-93 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e4f4047434b5d4600455b434f5c6e404158415e4f57004740">Animesh Kumar</a></td><td class="column-2">Head HR, Novopay</td><td class="column-3">Novopay</td><td class="column-4">India</td>
</tr>
<tr class="row-94 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e3f3037303a372a3f702c3f30343f301e6d3a2d703d3133">Anindita Ranjan</a></td><td class="column-2">Director HR</td><td class="column-3">Dassault Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-95 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e3f30372c3c3f30703d363f352c3f28312c2a271e302a2a3a3f2a3f703d3133">Anirban Chakravorty</a></td><td class="column-2">Senior Director &amp; Regional Head - Human Resources</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-96 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#214046494e5249615553484c4059404c4453484240520f424e4c">Anirban Ghosh</a></td><td class="column-2">Head - Human Resources Management</td><td class="column-3">Data Glove</td><td class="column-4">India</td>
</tr>
<tr class="row-97 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f99897908b8c9d919897d78f988a8c9d9c8f9897b98b9c8995909a9697d79a9694">Anirudhan Vasudevan</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Replicon</td><td class="column-4">India</td>
</tr>
<tr class="row-98 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5c4cbccd6cd8bc4cdc8c0c1e5d3c4c4d3c08bc6cac8">Anish Ahmed</a></td><td class="column-2">Head-13x Talent</td><td class="column-3">Vaave</td><td class="column-4">India</td>
</tr>
<tr class="row-99 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1677787f657e3864777c56657378627f73793875797b">Anish Raj</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Sentieo</td><td class="column-4">India</td>
</tr>
<tr class="row-100 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3657585f4257185b5943444f5776555746445f5559421855595b">Anita Mourya</a></td><td class="column-2">PS to Chairman / Director - HR</td><td class="column-3">Capricot Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-101 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#70111e1f021f1e18113003181f0215071903155e131f1d">Anita Noronha</a></td><td class="column-2">Global Head Human Resources</td><td class="column-3">ShoreWise Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-102 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0766746e636f7066696e47646b62682964686a">Anita Sidhwani</a></td><td class="column-2">Head HR</td><td class="column-3">Cleo</td><td class="column-4">India</td>
</tr>
<tr class="row-103 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95f4fbfce1f4d5f4e5e5e3f0fbe1e0e7f0efbbf6faf8">Anita Yadav</a></td><td class="column-2">Global HR Head</td><td class="column-3">Appventurez</td><td class="column-4">India</td>
</tr>
<tr class="row-104 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97f6f9fee3fff6b9f3f6e1fee4d7fef9f4e3e2e5f2b9f4f8fa">Anitha Davis</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Incture</td><td class="column-4">India</td>
</tr>
<tr class="row-105 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f99897908d9198d7898b989b919892988bb9898b9894988d90d79a9694">Anitha Prabhakar</a></td><td class="column-2">HR Director</td><td class="column-3">Pramati Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-106 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#24454a4e45484d644f4a45474f424b5643410a474b49">Anjali </a></td><td class="column-2">Vice President Human Resources &amp; Operations</td><td class="column-3">KnackForge</td><td class="column-4">India</td>
</tr>
<tr class="row-107 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b5d4dbdfd4d9dcd2f5d8d4dbd2dad4c5c5c69bd6dad8">Anjali Ghadge</a></td><td class="column-2">VP - HR &amp; Operations I We're Hiring!</td><td class="column-3">MangoApps</td><td class="column-4">India</td>
</tr>
<tr class="row-108 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#61000f0b000d084f110015080d21160e130a080f0508004f080f">Anjali Patil</a></td><td class="column-2">HR Director</td><td class="column-3">WorkIndia</td><td class="column-4">India</td>
</tr>
<tr class="row-109 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#19787773787570376a71786b7478597f6c757a6b6c747d707e706d7875377a7674">Anjali Sharma</a></td><td class="column-2">Director, Global head of L&amp;D</td><td class="column-3">Fulcrum Digital Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-110 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8feee1e5eee1a1ede0fceacfe7ffe3a1ece0a1e6e1">Anjan Bose</a></td><td class="column-2">CIO &amp; Head of HR</td><td class="column-3">HPL</td><td class="column-4">India</td>
</tr>
<tr class="row-111 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c6d62666d6265227f6d60656d624c656222626e7f7f6d7c226f6361">Anjani Salian</a></td><td class="column-2">Head - Talent Acquisition &amp; Talent Management</td><td class="column-3">Net Business Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-112 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e1808f8b94cf9598808688a183918e828e8f97849386848f8284cf828e8c">Anju Tyagi</a></td><td class="column-2">Head of HR</td><td class="column-3">BPO Convergence</td><td class="column-4">India</td>
</tr>
<tr class="row-113 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e2838c898b96a2818d8f92978f8396908b8187cc818d8f">Ankit Shah</a></td><td class="column-2">Head of HR &amp; Operations</td><td class="column-3">CompuMatrice</td><td class="column-4">India</td>
</tr>
<tr class="row-114 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1b0bfbab8a5ffa2b9b0a3bcb091b0e0a5b4b2b9bfbebdbeb6a8ffb2bebc">Ankit Sharma</a></td><td class="column-2">Head Of Recruitment &amp; HR</td><td class="column-3">A-1 Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-115 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c6d62676578227863616d7e4c7e6d78696b6d6562226f6361">Ankit Tomar</a></td><td class="column-2">Associate Director HR Transformation</td><td class="column-3">RateGain</td><td class="column-4">India</td>
</tr>
<tr class="row-116 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0667686d6f7267467c63687169746d2865696b">Ankita </a></td><td class="column-2">Vice President HR &amp; Operations</td><td class="column-3">Zenwork</td><td class="column-4">India</td>
</tr>
<tr class="row-117 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a5b5451534e5b14485b5048534952537a5955545e5f595549555c4e4d5b485f14595557">Ankita Rajrishi</a></td><td class="column-2">Head of Shared Services - Talent Acquisition</td><td class="column-3">Condeco</td><td class="column-4">India</td>
</tr>
<tr class="row-118 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#43222d282a37226d302a2d2b22032e373b2171216d202c2e">Ankita Sinha</a></td><td class="column-2">Chief People Officer</td><td class="column-3">MTX Group</td><td class="column-4">India</td>
</tr>
<tr class="row-119 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5c4cbced0d78bc7c0d7cce5cbccccd188d1c0c6cd8bc6cac8">Ankur Beri</a></td><td class="column-2">Group Head Human Resources</td><td class="column-3">NIIT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-120 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec8d82828d8dac9f818d9e988987deddc28f8381">Anna Andrews</a></td><td class="column-2">Head-Human Resources (India)</td><td class="column-3">SmarTek21</td><td class="column-4">India</td>
</tr>
<tr class="row-121 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c6d62626d4c787e6d627f6d6f786b60636e6d60226f6361">Anna Mathunny</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Transact Global</td><td class="column-4">India</td>
</tr>
<tr class="row-122 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#03626d6d627376716d622d6243656a6e662d606c6e">Annapurna A</a></td><td class="column-2">Head of HR &amp; Admn</td><td class="column-3">FIME</td><td class="column-4">India</td>
</tr>
<tr class="row-123 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8eefe0e0e7eba0e3efe0e1e4cee9fceffde5e1a0ede1e3">Annie Manoj</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Grasko Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-124 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9b8b7b6b6bbf7b8bbabb8b1b8b499b8abbab8bdb0b8f7bab6b4">Anoob Abraham</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Arcadia</td><td class="column-4">India</td>
</tr>
<tr class="row-125 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd9c938e9594969cd396959c94899c93bd9a98898b849092d39e9290">Anshika Khaitan</a></td><td class="column-2">Director-People &amp; Culture</td><td class="column-3">Vymo</td><td class="column-4">India</td>
</tr>
<tr class="row-126 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#73121d001b065d121d121d17331211001c1f0607171207125d101c1e">Anshu Anand</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Absolutdata Analytics</td><td class="column-4">India</td>
</tr>
<tr class="row-127 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b3a35282e363a35281b3632353f3d32293e2834372e2f3234352875383436">Ansuman Sahu</a></td><td class="column-2">Head of HR / Staffing</td><td class="column-3">Mindfire Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-128 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#51303f253e7f373023383011242333303f3d30353534237f323e3c">Anto Faria</a></td><td class="column-2">Head L&amp;D Operation and Fulfillment</td><td class="column-3">Urban Ladder</td><td class="column-4">India</td>
</tr>
<tr class="row-129 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7819160d12381c1d0b131d0a19561b1715">Anuj Agarwal</a></td><td class="column-2">VP, Corporate Operations &amp; HR</td><td class="column-3">Deskera</td><td class="column-4">India</td>
</tr>
<tr class="row-130 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4a5aab1aea584a7aba0a1aaa5b0adabaaeaa7abeaadaa">Anuja Sivaram</a></td><td class="column-2">CHRO &amp; COO</td><td class="column-3">Trilogy Innovations</td><td class="column-4">India</td>
</tr>
<tr class="row-131 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e889869d988985c682a88f9b84c68186">Anupam Jauhari</a></td><td class="column-2">Group CHRO</td><td class="column-3">Ginesys</td><td class="column-4">India</td>
</tr>
<tr class="row-132 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3b2bda6a3b2befda0a1baa5b2a0a7b2a5b293a1b6bfa7babcfdb0bcbe">Anupam Srivastava</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Reltio</td><td class="column-4">India</td>
</tr>
<tr class="row-133 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#41202f3431202c20252601243324372c20396f222e2c">Anupama Dasgupta</a></td><td class="column-2">SVP Human Resources</td><td class="column-3">eRevMax</td><td class="column-4">India</td>
</tr>
<tr class="row-134 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a3c2cdd6d3d1cadac28dc4c2cdc7cbcae3c9d6cfcac2c0ccced3d6d7cacdc48dc0ccce">Anupriya Gandhi</a></td><td class="column-2">Global Director People Ops</td><td class="column-3">Julia Computing</td><td class="column-4">India</td>
</tr>
<tr class="row-135 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0a1aeb5b2a1a7eeb2a1aea180b3a9b2a9afaeaca1a2b3eea3afad">Anurag Rana</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">SirionLabs</td><td class="column-4">India</td>
</tr>
<tr class="row-136 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2948475c5b484e5a695d4845405a4448074a4644">Anurag Shrivastava</a></td><td class="column-2">Director - HR</td><td class="column-3">Talisma</td><td class="column-4">India</td>
</tr>
<tr class="row-137 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f0919e85829197b0859e9980989f8295de939f9d">Anurag Verma</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Uniphore</td><td class="column-4">India</td>
</tr>
<tr class="row-138 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#71101f0402191031020302061413021e1d0405181e1f025f121e1c">Anusha Jayachandran</a></td><td class="column-2">Head - Human Resources Operations</td><td class="column-3">SRS Web Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-139 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f5fae1e7fcf5bafffde7fcfbe6f1d4f8fbf7fbbaf3f3">Anusha Kishore</a></td><td class="column-2">Assistant Vice President Human Resources</td><td class="column-3">Loco</td><td class="column-4">India</td>
</tr>
<tr class="row-140 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7d6c7d6c5d9d699d0c2d9dddedcd6c5f7c4d8d1c3d9d6c2c3ded4c499d4d8da">Aparna Gunjikar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Softnautics</td><td class="column-4">India</td>
</tr>
<tr class="row-141 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd9c8d9c8f939cd38e8f94969c938995bd9c8d8d8e949c93d39e9290">Aparna Srikanth</a></td><td class="column-2">Head, Human Resources - India</td><td class="column-3">Pathlock</td><td class="column-4">India</td>
</tr>
<tr class="row-142 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#600112010408010e012013010605181001194e030f0d">Aradhana Gupta</a></td><td class="column-2">Chief People Officer</td><td class="column-3">SafexPay</td><td class="column-4">India</td>
</tr>
<tr class="row-143 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#33524152475b5a1d544073454a5c5e5f5251401d505c5e">Arathi </a></td><td class="column-2">AVP HR</td><td class="column-3">Vyom Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-144 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a4b584b5e4243045a584b48425f6a4b465e585f43595e4b424f4b465e4204494547">Arathi Prabhu</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Altruista Health</td><td class="column-4">India</td>
</tr>
<tr class="row-145 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#43223122372b2a0330362d37262024312c36336d202c2e">Arathi Rajeswari</a></td><td class="column-2">AVP, Head of Talent Advancement and Excellence</td><td class="column-3">SunTec Business Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-146 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#04657665726d6a602a676c656a60766577616f657644706d63617677746d6f612a676b69">Aravind Chandrasekar</a></td><td class="column-2">Associate Director, Talent Acquisition</td><td class="column-3">Concentrix Tigerspike</td><td class="column-4">India</td>
</tr>
<tr class="row-147 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c2d3e2d3a252228623b2d3e3e25293e0c3e2d3c25283a2d2039293f232039382523223f622f2321">Aravind Warrier</a></td><td class="column-2">Human Resources Director</td><td class="column-3">RapidValue</td><td class="column-4">India</td>
</tr>
<tr class="row-148 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb9a8998939a959abb9a8e9d9a928fd59295">Archana Anand</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Aufait Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-149 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d5b4a7b6bdb4bbb4fbbea595bebcb9baa2baa1a1fbb6bab8">Archana Kp</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Kilowott</td><td class="column-4">India</td>
</tr>
<tr class="row-150 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#771605141f1619163706021e1915160e5914181a">Archana Kunde</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Quinbay</td><td class="column-4">India</td>
</tr>
<tr class="row-151 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0b1a2b3b8b1beb1febdb1bebeb590bcbfb3a5aafeb3bfbd">Archana Manne</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Locuz</td><td class="column-4">India</td>
</tr>
<tr class="row-152 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#09687b6a61686768277a687b6d684964606a7b6665607a6c276a6664">Archana Sarda</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Microlise</td><td class="column-4">India</td>
</tr>
<tr class="row-153 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb8a9988838a858ac5988382858f8eab88848c858487848c8293c5888486">Archana Shinde</a></td><td class="column-2">Head Human Resources Department</td><td class="column-3">Cognologix Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-154 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7b1a09121d55161e1614153b1a19011414191a55181416">Arif Memon</a></td><td class="column-2">Associate Vice President Talent Acquisition</td><td class="column-3">Abzooba</td><td class="column-4">India</td>
</tr>
<tr class="row-155 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6504170c0b0104084b0e0417251c0a010900004b060a08">Arindam Kar</a></td><td class="column-2">Head-Talent Acquisition</td><td class="column-3">Envestnet</td><td class="column-4">India</td>
</tr>
<tr class="row-156 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f1e0d15160b1e511c171e08131e3f0e0a060b1a1c17511c1012">Arjita Chawla</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Quytech</td><td class="column-4">India</td>
</tr>
<tr class="row-157 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ceafbca4bba0e0ada6afbabaabbca4abab8ebdbba0a2a7a8abe0ada1a3">Arjun Chatterjee</a></td><td class="column-2">Director &amp; Head of Talent Acquisition</td><td class="column-3">Sun Life</td><td class="column-4">India</td>
</tr>
<tr class="row-158 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#71100301101f101b31041c1303141d1d10181f171e121003145f121e1c">Arpana Jaiswal</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Umbrella Infocare</td><td class="column-4">India</td>
</tr>
<tr class="row-159 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b9d8cbc9d0cdd897cad8cbd2d8cbf9cedcdbcad2d0cdcddccbca97dad6d4">Arpita Sarkar</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">WEBSKITTERS TECHNOLOGY SOLUTIONS</td><td class="column-4">India</td>
</tr>
<tr class="row-160 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#29584869485b5d4646475a46455c5d4046475a074a4644">Artoon Solutions</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Artoon Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-161 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dbbaa9aef5aeababbab79bbfbaafbfa2b5f5b8b4b6">Aru Uppal</a></td><td class="column-2">Global Head Human Resources</td><td class="column-3">Data Dynamics</td><td class="column-4">India</td>
</tr>
<tr class="row-162 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bedfcccbd090d5cbd3dfccfedcd1dccadbddd6cdd1d2cbcad7d1d0cd90ddd1d3">Arun Kumar</a></td><td class="column-2">HEAD - Human Resources &amp; Operations</td><td class="column-3">BOB Tech Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-163 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b4a595e4505405e464a596b5843425b5852054244">Arun Kumar</a></td><td class="column-2">Mentor/ Chief People Officer</td><td class="column-3">Shipsy</td><td class="column-4">India</td>
</tr>
<tr class="row-164 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#016073746f2f6a746c60734176607768626d64656075602f626e6c">Arun Kumar</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Wavicle Data Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-165 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e58497908ba5918d8084918088cb868a88">Arun Murugappa</a></td><td class="column-2">Delivery Head - Talent Acquisition</td><td class="column-3">ATEM Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-166 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#58392a2d36762a392e311831282b373e2c763b3735">Arun Ravi</a></td><td class="column-2"> Digital Workforce Management - Head</td><td class="column-3">Amelia</td><td class="column-4">India</td>
</tr>
<tr class="row-167 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c2d3e3922623f25222b240c3c393e293f232a383b2d3e29622f2321">Arun Singh</a></td><td class="column-2">Senior Director Talent Acquisition</td><td class="column-3">PureSoftware</td><td class="column-4">India</td>
</tr>
<tr class="row-168 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c8dbdcc7e9d1ddc69899d187cac6c4">Arun Vigneswaran</a></td><td class="column-2">Head of People Excellence &amp; HR head for xto10x</td><td class="column-3">xto10x</td><td class="column-4">India</td>
</tr>
<tr class="row-169 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f0e1d1a0106020e410d071a1c070e012f001d0c0e1f000b1c0a1d19060c0a1c410c0002">Arunima Bhushan</a></td><td class="column-2">AVP-HR</td><td class="column-3">Orcapod</td><td class="column-4">India</td>
</tr>
<tr class="row-170 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87e6f5f2f4efeea9e0e8e2ebc7e5e2f3f3e2f5f7ebe6e4e2a9e4e8a9eee9">Arushi Goel</a></td><td class="column-2">Director HRBP</td><td class="column-3">BetterPlace</td><td class="column-4">India</td>
</tr>
<tr class="row-171 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcddcec9cfd4d592cfddcbd4d2d9c5fcd98ed9ced9cfd9ddcedfd492dfd3d1">Arushi Sawhney</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Altezzasys Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-172 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f9988b8f90979dd78a989d988a908f9897b99c929889958c8ad79a9694">Arvind Sadasivan</a></td><td class="column-2">Director Global Human Resources</td><td class="column-3">Eka Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-173 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b78636a7964654b7879626578646d7f7f6e686325686466">Asenath Sharon</a></td><td class="column-2">Associate Vice President - HR</td><td class="column-3">SrinSoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-174 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#38594b50591652784d565154575f5b574a48165b5755">Asha Rao</a></td><td class="column-2">Associate Director - Human Resources</td><td class="column-3">Unilog</td><td class="column-4">India</td>
</tr>
<tr class="row-175 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c6a7b5aeafb5aee8ada7b4a8afad86b6a7b0afaaafa9a8e8afa9">Ashish Karnik</a></td><td class="column-2">Head Performance Engineering</td><td class="column-3">Pavilion</td><td class="column-4">India</td>
</tr>
<tr class="row-176 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e382908b8a908bcd8d828a8796a38e8a8d8784829786cd8a8d">Ashish Naidu</a></td><td class="column-2">Assistant Vice President - Talent Acquisition</td><td class="column-3">Mindgate Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-177 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ea8b99828581aa999a8f848785c4898587">Ashok Manjunath</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Spenmo</td><td class="column-4">India</td>
</tr>
<tr class="row-178 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6d7c5ded9dd98c6c3c2c5d7dad7f6c5d3d8d3d5d7d1dad9d4d7da98d5d9db">Ashok Putsala</a></td><td class="column-2">Associate Vice President - Talent Acquisition</td><td class="column-3">SenecaGlobal</td><td class="column-4">India</td>
</tr>
<tr class="row-179 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6706140f080c491402140f0603150e2708050d02041301150809130e02154904080a">Ashok Seshadri</a></td><td class="column-2">Head - Global Talent Management</td><td class="column-3">ObjectFrontier Software</td><td class="column-4">India</td>
</tr>
<tr class="row-180 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#08697b606763267c7a6178697c6071486a78676b67667e6d7a6f6d666b6d266b6765">Ashok Tripathy</a></td><td class="column-2">PRINCIPAL CONSULTANT &amp; GROUP HEAD HR</td><td class="column-3">BPO Convergence</td><td class="column-4">India</td>
</tr>
<tr class="row-181 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3a2b0abb1a2a5eda8a2b9aa83b0aaaeb3afaaa5baaba6a2afb7aba0a2b1a6eda0acae">Ashraf Kazi</a></td><td class="column-2">Associate Director Talent Acquisition</td><td class="column-3">Simplify Healthcare</td><td class="column-4">India</td>
</tr>
<tr class="row-182 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83e2f0ebf1e2e5adeef6efefe2c3f2f0e6e2f3ade0ecee">Ashraf Mulla</a></td><td class="column-2">AVP- Talent Acquisition &amp; Strategy</td><td class="column-3">qSEAp Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-183 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#abcad8c3dfc4c585c7cadcd9c2ceebc2c2dfc6d885c8c485c2c5">Ashton Lawrie</a></td><td class="column-2">General Manager - HR (Head of Department)</td><td class="column-3">MasterSoft ERP Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-184 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1677657e636279657e5662636f773875797b">Ashutosh Sinha</a></td><td class="column-2">Head - Human Resource</td><td class="column-3">Tuyasmart India</td><td class="column-4">India</td>
</tr>
<tr class="row-185 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f495879c83959a9d96b49091979d879d9b9a999d9a9087da979b99">Ashwani Bhargava</a></td><td class="column-2">Director Recruitment</td><td class="column-3">Decision Minds</td><td class="column-4">India</td>
</tr>
<tr class="row-186 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a5b49524d5b54537a494f59595f4949534c5f144e5f5952">Ashwani Kumar</a></td><td class="column-2">Vice President - People &amp; Culture</td><td class="column-3">Successive Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-187 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d7c6e756a74735d6e687674337c74">Ashwin Singh</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Suki</td><td class="column-4">India</td>
</tr>
<tr class="row-188 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e4f5d4659474047004f5d4641456e4b5a4140035d41425b5a4741405d004d4143">Ashwini Ashok</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Eton Solutions LP</td><td class="column-4">India</td>
</tr>
<tr class="row-189 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3d2c0dbc4daddda9dd9d2ddd2c1d7dbd2ddd2ddf3d8d2dfd6cac1d29dd0dcde">Ashwini J</a></td><td class="column-2">Head - People &amp; Culture, APAC</td><td class="column-3">Kaleyra</td><td class="column-4">India</td>
</tr>
<tr class="row-190 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3b2b4bcb8b293a4bca1b8b5a6a0babcbdfdb0bcbe">Aswanth Goka</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">WorkFusion</td><td class="column-4">India</td>
</tr>
<tr class="row-191 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#147567637d7a5464676660717f3a777b79">Aswin Prashannth</a></td><td class="column-2">Head Talent Acquisition of India Operation</td><td class="column-3">PSRTEK</td><td class="column-4">India</td>
</tr>
<tr class="row-192 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c8ddc0c787c2c8dbc4c6c2c8dbe9d9ccc7ddc8cec6c787cac687c0c7">Atin Karmokar</a></td><td class="column-2">AVP - Head Human Resources &amp; Admin</td><td class="column-3">Pentagon System and Services</td><td class="column-4">India</td>
</tr>
<tr class="row-193 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a1b0e0f1654111b1411141b161b3a19081b0c1f13141c150e1f191254191517">Atul Kanknala</a></td><td class="column-2">Head HR- Talent Acquisition and Strategy</td><td class="column-3">Crave InfoTech</td><td class="column-4">India</td>
</tr>
<tr class="row-194 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f29386879edc82939eb29b9c9c979487dc919d9f">Atul Pal</a></td><td class="column-2">Head Of Human Resources - Client Operations</td><td class="column-3">Innefu Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-195 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d5c4b54535c4e557d4e5859545349585e55535251525a54584e135e5250">Avinash Poojari</a></td><td class="column-2">AVP - Talent Acquisition</td><td class="column-3">Sedin Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-196 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#07667e72746f296366757e66696e47696e6173626b2964686a">Ayush Daryani</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Niftel Communications</td><td class="column-4">India</td>
</tr>
<tr class="row-197 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90f1e9e5e3f8bee3f9fef8f1d0e3e5f7f1e2f2ffe8fef5e4e7ffe2fbe3bef3fffd">Ayush Sinha</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">SugarBox Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-198 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#630102010a170b024d0d020e010a0211230c131610000c0d10160f170a0d044d000c0e">Babitha Nambiar</a></td><td class="column-2">VP - Head Human Resources</td><td class="column-3">Opus Consulting Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-199 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a787b786f456e72756a6a73765a777b7273747e687b697b6e637b7734797577">Babu Thoppil</a></td><td class="column-2">VP - HR</td><td class="column-3">Mahindra Satyam BPO</td><td class="column-4">India</td>
</tr>
<tr class="row-200 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa989b969b9093ba9389958f88999f93949e939bd4999597">Balaji Er</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">iSource ITES</td><td class="column-4">India</td>
</tr>
<tr class="row-201 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5331323f32393a7d273b3a2a323432213239323d13273b3a2137243221367d303c3e">Balaji Thiyagarajan</a></td><td class="column-2">Associate Director HR</td><td class="column-3">Thirdware Solution INC</td><td class="column-4">India</td>
</tr>
<tr class="row-202 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#284a494449435a415b404649065b404d5c5c51684f4d46415b515b054f5a475d58064b4745">Balakrishna Shetty</a></td><td class="column-2">Vice President - Human Resource</td><td class="column-3">Genisys Group</td><td class="column-4">India</td>
</tr>
<tr class="row-203 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6604070a0714070c1348012608150a0e13044805090b">Balaraju Guddinti</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Brane Enterprises</td><td class="column-4">India</td>
</tr>
<tr class="row-204 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0b2b1bcb5a3b890b1b4b1a2a3b8a3bfbca5a4b9bfbea3feb3bfbd">Balesh S</a></td><td class="column-2">Head HR &amp; Operations</td><td class="column-3">Adarsh Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-205 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#553734393b3030217b373c27343d153b3021263a3920213c3a3b267b363a38">Balneet Birah</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Net Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-206 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#385a59565c5956597859514a5c514c4b575e4c4f594a5d165b5755">Bandana Kaul</a></td><td class="column-2">Director-Human Resources</td><td class="column-3">Airdit Software Services</td><td class="column-4">India</td>
</tr>
<tr class="row-207 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa989b949e969bd48992839b978a889b899b9eba8e9f88889b96959d9399d4999597">Bandla Shyamprasad</a></td><td class="column-2">Director - HR &amp; Operations</td><td class="column-3">Terralogic</td><td class="column-4">India</td>
</tr>
<tr class="row-208 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c5e5d5251595948125753494e7c55485e5812525948">Banmeet Kour</a></td><td class="column-2">Head of Talent Acquisition India/PH/US</td><td class="column-3">IT BY DESIGN</td><td class="column-4">India</td>
</tr>
<tr class="row-209 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a484b4d584b5d4b466a495a4d0743444904494547">Barkha Agrawal</a></td><td class="column-2">Director-Talent Acquisition</td><td class="column-3">Computer Power Group</td><td class="column-4">India</td>
</tr>
<tr class="row-210 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f99b988b929198b98d8b9c9595908a8a969f8dd79890">Barkha Dave</a></td><td class="column-2">Head of HR &amp; Operations Compliance</td><td class="column-3">Trellissoft,</td><td class="column-4">India</td>
</tr>
<tr class="row-211 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f69497849d9e97b68199949982d8979f">Barkha Sharma</a></td><td class="column-2">CHRO</td><td class="column-3">Wobot.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-212 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7d5d6c4d6c1d6f7dcd6dadec1dec4ded8d999d4d8da">Basava </a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Kami Vision</td><td class="column-4">India</td>
</tr>
<tr class="row-213 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#751714011a1a195b14191c351019101601071c051d1c5b141c">Batool Ali</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Ford Pro Charging</td><td class="column-4">India</td>
</tr>
<tr class="row-214 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6e0c0b0a071d060f2e1c0b190f1c0a5d585e400d01">Bedisha Karmakar</a></td><td class="column-2">Senior Director People Operations</td><td class="column-3">Reward360 Global Services.</td><td class="column-4">India</td>
</tr>
<tr class="row-215 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8cacdc6c7d186c3c7dbc0d1e8dbc1dbc9c1c6cec7dbcdcb86cbc7c5">Benoy Koshy</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">SISA</td><td class="column-4">India</td>
</tr>
<tr class="row-216 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90f2f5fee3f5fce9beeaf1f3f8f1e2f9f1f8d0f6e5fcf3e2e5fdf4f9f7f9e4f1fcbef3fffd">Bensely Zachariah</a></td><td class="column-2">Global Head of Human Resources</td><td class="column-3">Fulcrum Digital Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-217 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2143444f524d44580f5b40424940534840496147544d4253544c4548464855404d0f424e4c">Bensley Zachariah</a></td><td class="column-2">Global Head of Human Resources</td><td class="column-3">Fulcrum Digital Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-218 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#16747378657978387b737872736c567b7f75647979747c7375626538787362">Benson Mendez</a></td><td class="column-2">VP - Human Resources</td><td class="column-3">MicroObjects</td><td class="column-4">India</td>
</tr>
<tr class="row-219 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7d5dfd6dcc3de99d3dfd6c5d8d3f7ded3d1ce99d4d8da">Bhakti Dharod</a></td><td class="column-2">Head of HR</td><td class="column-3">IDfy</td><td class="column-4">India</td>
</tr>
<tr class="row-220 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7c5cfc6d5c6d389c5cfc6d5d3cec6e7d0c8d5cccec9c3cec689cec9">Bharat Bhartia</a></td><td class="column-2">Head of Talent Acquisition and HR</td><td class="column-3">WorkIndia</td><td class="column-4">India</td>
</tr>
<tr class="row-221 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c6a4aea7b4a7b286ada7eba8a3bee8a5a9ab">Bharat Rao</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">CK Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-222 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#75170714031c0514011c351405050601101e161a07055b161a18">Bharathi Ravipati</a></td><td class="column-2">Sr. Director HR- Eastern Region</td><td class="column-3">AppsTek</td><td class="column-4">India</td>
</tr>
<tr class="row-223 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e6848e87948187908f85a6878f9595838ac885898b">Bhargavi Challa</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Aissel Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-224 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5a7ada4b7b1acebaba0a2ac85a0a1aca3a0a6b6eba6aaa8">Bharti Negi</a></td><td class="column-2">Sr. Director, Recruitment, Talent Acquisition</td><td class="column-3">Edifecs</td><td class="column-4">India</td>
</tr>
<tr class="row-225 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#76141e17001718173618130215190413581519581f18">Bhavana Jain</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Netcore Cloud</td><td class="column-4">India</td>
</tr>
<tr class="row-226 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#73111812181f1c07120133171a1211001c1f06075d101c1e">Bhavik Kaklotar</a></td><td class="column-2">Head Global Talent Acquisition</td><td class="column-3">Diabsolut Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-227 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#482a20293e2123082f29252d3b7a3f2126662b2725">Bhavik Shah</a></td><td class="column-2">Human Resources Head</td><td class="column-3">Games2win India</td><td class="column-4">India</td>
</tr>
<tr class="row-228 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98faf0f9eef1f3f9b6ebf0fdecf0d8f1ecfbfff1f6fcf1f9b6fbf7f5">Bhavika Sheth</a></td><td class="column-2">HR Head at ITCG</td><td class="column-3">ITCG Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-229 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#57353f36213e39173a2e33223c363639793e38">Bhavin Sanghavi</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Dukaan</td><td class="column-4">India</td>
</tr>
<tr class="row-230 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9dfff5fcebe4fcddeee8ededf1e4eaf4eef9f2f0b3fef2f0">Bhavya Shetty</a></td><td class="column-2">Director Talent Management</td><td class="column-3">Supply Wisdom</td><td class="column-4">India</td>
</tr>
<tr class="row-231 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cfada7aeb8a1ae8fb8aaaab7acaaa3e1a6a1">Bhawna Suri</a></td><td class="column-2">Head HR &amp; Operations</td><td class="column-3">HR</td><td class="column-4">India</td>
</tr>
<tr class="row-232 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#46242e333623352e683127352b27322d2734063023343523682f28">Bhupesh Wasmatkar</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">VerSe Innovation</td><td class="column-4">India</td>
</tr>
<tr class="row-233 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f7d76756a31695f76717e6f6f317c7072">Biju Varghese</a></td><td class="column-2">Director | HR | InApp</td><td class="column-3">InApp</td><td class="column-4">India</td>
</tr>
<tr class="row-234 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1a3a8aab3a0acefa5a0b2a981b5a0b5b6a0efa8afa7ae">Bikram Dash</a></td><td class="column-2">Vice President HR L&amp;D</td><td class="column-3">TATWA Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-235 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e88a81868c9dc6839a819b80868986a8879b989186c68b8785">Bindu Krishnan</a></td><td class="column-2">Director-Human Resources and Administration</td><td class="column-3">Ospyn Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-236 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#33515a5d5c4a1d455241545b5640567341545a54415c46431d505c5e">Binoy Varghese</a></td><td class="column-2">Group Head (Human Resources)</td><td class="column-3">RGI Group</td><td class="column-4">India</td>
</tr>
<tr class="row-237 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82e0ebf2eeede0ace6e3f1c2ebf8efedeef6e6ace1edef">Biplob Das</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">izmo</td><td class="column-4">India</td>
</tr>
<tr class="row-238 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8dad1caddd6dccad996cad7cdccf8cfddd9ceddcaccdddb96dbd7d5">Birendra Rout</a></td><td class="column-2">Head-HR</td><td class="column-3">Weaverbird Engineering &amp; Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-239 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d1f140e151308530f1c143d141a11121f1c110e180f0b141e180e53131809">Bishnu Rai</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">iGlobal KPO Services</td><td class="column-4">India</td>
</tr>
<tr class="row-240 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97f5f8e4fceeb9e0d7e3f8e3f6fbfee3f0fbf8f5f6fbb9f4f8fa">Bosky Wadhwa</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Total IT Global</td><td class="column-4">India</td>
</tr>
<tr class="row-241 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f795859e9db7949b96859e83828494989984829b839e9990d994989a">Brij Kishore</a></td><td class="column-2">Vice President Recruitment Operations</td><td class="column-3">Claritus Management Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-242 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f1d0d160b0b103f071007101b1e06511c1012">Britto Ambrose</a></td><td class="column-2">Vice President of People &amp; Culture</td><td class="column-3">Xoxoday</td><td class="column-4">India</td>
</tr>
<tr class="row-243 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f6e1e7fce6f5baf9f1fcf0fdd4f5ecf1fafbbaf7fb">Bushra Mehdi</a></td><td class="column-2">AVP - Human Resources</td><td class="column-3">Axeno</td><td class="column-4">India</td>
</tr>
<tr class="row-244 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9af8e3f0efdae8fefbf6fbf8e9b4f9f5f7">Byju Valappil</a></td><td class="column-2">Senior Director - HR</td><td class="column-3">RDAlabs</td><td class="column-4">India</td>
</tr>
<tr class="row-245 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d6e6c7d7923666c637e6c614d7a7f6479687f64636b627f606c79646263236e6260">Capt Kansal</a></td><td class="column-2">Head Safety Security</td><td class="column-3">Writer Information</td><td class="column-4">India</td>
</tr>
<tr class="row-246 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c0f090005020d4206031f091c042c091418090218050d420f0301">Celina Joseph</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Extentia Information Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-247 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#11727970787f62787f76793f637065797e63745165797476706574667068727e63613f727e7c">Chainsingh Rathore</a></td><td class="column-2">AVP  Talent Acquisition &amp; Operations</td><td class="column-3">Gateway Group of Companies</td><td class="column-4">India</td>
</tr>
<tr class="row-248 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bddedfd5dcc9c9dcded5dccfc4dcfdd4d3cbd8d3c9d4cbd890d4c993ded2d0">Chaitali Bhattacharya</a></td><td class="column-2">Senior Director of Human Resources</td><td class="column-3">Inventive IT</td><td class="column-4">India</td>
</tr>
<tr class="row-249 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#462534273f0628233231293023286825292b">Chaitali Ray</a></td><td class="column-2">Director HR</td><td class="column-3">Netwoven</td><td class="column-4">India</td>
</tr>
<tr class="row-250 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#690a0108001d0807100847081b0002081d0029080b0308100607470a0604">Chaitanya Arikati</a></td><td class="column-2">Senior Recruitment Manager (Head - TA)</td><td class="column-3">Abjayon</td><td class="column-4">India</td>
</tr>
<tr class="row-251 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ccafa4ada5b8ada2b5ade2a7ada2b8a4a58cbfa1adbeb8a5a1bfe2afa3a1">Chaitanya Kanthi</a></td><td class="column-2">Senior Director - Human Resources</td><td class="column-3">Smart IMS</td><td class="column-4">India</td>
</tr>
<tr class="row-252 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ea89828b839e8b84938bc49a8f8f9e8baa9a8586938d8584c49e8f8982848586858d93">Chaitanya Peeta</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Polygon</td><td class="column-4">India</td>
</tr>
<tr class="row-253 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1a2a9a0acaeada0efa9a0ad81a9a0adeca5bbefa2aeac">Chamola Hal</a></td><td class="column-2">Human Resources Director</td><td class="column-3">HAL</td><td class="column-4">India</td>
</tr>
<tr class="row-254 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f7fcf5faf7fcf5f8baf7fcf5faf0fdfbffd4fafbe6e0fcf3f5e0f1e4e7baf7fbf9">Chanchal Chandiok</a></td><td class="column-2">HR Director</td><td class="column-3">NEC Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-255 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b48434a454f4a456b4544424f4a0542455f4e59594a5852585f4e465805484446">Chandan Gambhir</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Interra Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-256 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b68636a656f6a6525606a7863726a7b4b6672786e65786e62656825686466">Chandan Thakur</a></td><td class="column-2">Chief Talent Officer</td><td class="column-3">Mysense Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-257 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#abc8c3cac5cfc2c5c2cfebd8caccc7c4c9cac785c8c4c6">Chandini Davies</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">sa.global</td><td class="column-4">India</td>
</tr>
<tr class="row-258 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c3f343d32383532351c31333330253d723f3331">Chandini Mokthar</a></td><td class="column-2">VP-People &amp; Culture</td><td class="column-3">Moolya</td><td class="column-4">India</td>
</tr>
<tr class="row-259 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#412229202f252f2822012d202c232520352432356f222e2c">Chandni Chopra</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">LambdaTest</td><td class="column-4">India</td>
</tr>
<tr class="row-260 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5a6ada4aba1abacbca4a1a4b385b0a6b7a0a4b1a0eba6aaebacab">Chandni Yadav</a></td><td class="column-2">Global Head of Talent Acquisition</td><td class="column-3">Founder and Lightning</td><td class="column-4">India</td>
</tr>
<tr class="row-261 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f7fcf5faf0e6f5bae4e6f5fff5e7fcd4fdfafafbe2f1e6f0fdf3fde0f5f8baf7fbf9">Chandra Prakash</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Innover Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-262 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a39323b343e283b74283b2e283b1a343b2c333d3b3d3635383b3674393537">Chandra Ratra</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Naviga India</td><td class="column-4">India</td>
</tr>
<tr class="row-263 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#05666d646b6177644576776c73606b767c762b666a68">Chandrakanth K</a></td><td class="column-2">Head of Recruiting Operations</td><td class="column-3">Sriven Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-264 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dbb8bcad9bbeb8b7b2b5b2b8bab7a8b4b7f5b8b4b6">Chandrasekhar Gv</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">eClinical Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-265 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#34575c555a504655475c515f55464674475b52404146551a575b59">Chandrashekar R</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Softura</td><td class="column-4">India</td>
</tr>
<tr class="row-266 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#214249404f45534452490f4a544c4053614b404653404f4f44564c444548400f424e4c">Chandresh Kumar</a></td><td class="column-2">Chief Manager &amp; Head ( Performance Advertising)</td><td class="column-3">Jagran New Media</td><td class="column-4">India</td>
</tr>
<tr class="row-267 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#12717a7360737c5261607b7c7b627a73607f733c717d7f">Charan Singh</a></td><td class="column-2">HEAD /HR</td><td class="column-3">SRINI PHARMACEUTICALS</td><td class="column-4">India</td>
</tr>
<tr class="row-268 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8cbc0c9dac4cddb86dce8d8c9c4c6c186cbc7c5">Charles Timothy</a></td><td class="column-2">Director HR</td><td class="column-3">Palni Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-269 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d6e656c7f606c6463684d7e797f686c60626469236e6260">Charmaine Pinto</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Streamoid</td><td class="column-4">India</td>
</tr>
<tr class="row-270 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f4c474a5d5643014e41454a43406f4c4043405d5b40444a415c014c4042">Cheryl Anjelo</a></td><td class="column-2">Director - HR</td><td class="column-3">ColorTokens</td><td class="column-4">India</td>
</tr>
<tr class="row-271 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0d3c6d5c2ddd1f0d6d3c3dcc4d49ed3dfdd">Chetan Verma</a></td><td class="column-2">Head Recruitment</td><td class="column-3">FCS Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-272 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#690a010c1d0708290e06021e0002470a06">Chetna Gogia</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">GoKwik</td><td class="column-4">India</td>
</tr>
<tr class="row-273 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7d4dfdfd6c1de99d5dfd6c3d9d6d0d6c5f7d6d4d9d8c1d6c3d299d4d8da">Chhavi Bhatnagar</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Acnovate Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-274 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8be8e3e2e5e6e4f2a5f9e4f2cbe8eaffeae7f2f8ffa6fef8a5e8e4e6">Chinmoy Roy</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Catalyst Business Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-275 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d7f337e757473697c735d7473696f727171747a787369337e7270">Chintan Bhatt</a></td><td class="column-2">Recruitment Head-US Operations</td><td class="column-3">Introlligent</td><td class="column-4">India</td>
</tr>
<tr class="row-276 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#14777c7d6675733a6475607178255466757a736071777c3a777b79">Chirag Patel</a></td><td class="column-2">Talent Acquisition Manager &amp; Head-hunter</td><td class="column-3">Rang Technologies Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-277 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#15767d7c6774723b667d747d557c7379747c673b767a78">Chirag Shah</a></td><td class="column-2">Director (HR &amp; Admin)</td><td class="column-3">iFlair Web Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-278 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4a7acadb6a5aaaea1a1b2adb484a6bdb0a1b6ada0a3a1eaa7aba9">Chiranjeevi Pannem</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Byteridge</td><td class="column-4">India</td>
</tr>
<tr class="row-279 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8eede6e7fafcefe3cef4ede1e0fde1e2fbfae7e1e0fda0ede1e3">Chitra Markale</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">zCon Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-280 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfdcd7d6cbcdde91cddec9d6ffded2cfd3da91dcd091d6d1">Chitra Ravi</a></td><td class="column-2">Head of HR</td><td class="column-3">Ample Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-281 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4c7cdd6c1c1d7ccc58ac9e4c1d0cdd7c6c1d38ac7cbc9">Cireesha Mailavarapu</a></td><td class="column-2">Vice President - Global HR &amp; Alliances</td><td class="column-3">ETG Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-282 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ffceefafdeeede7cfeceeeefcfbe3eaa1ece0e2">Crp Saurabh</a></td><td class="column-2">Head of Total Rewards and People Operations</td><td class="column-3">CaaStle</td><td class="column-4">India</td>
</tr>
<tr class="row-283 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#781b01160c10111938161d0c1b170a1d561b17561116">Cynthia Rodrigues</a></td><td class="column-2">Group Vice President -HR</td><td class="column-3">Netcore Cloud</td><td class="column-4">India</td>
</tr>
<tr class="row-284 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6b2b7bbb7afb7b8a2bff8b1beb9a5be96b1b3a2a0afbbb9f8b5b9bb">Damayanti Ghosh</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Vymo</td><td class="column-4">India</td>
</tr>
<tr class="row-285 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#264247484f434a08554e4751664d564f56475452484354550845494b">Daniel Shaw</a></td><td class="column-2">Director of HR &amp; Talent Acquisition</td><td class="column-3">KPI Partners</td><td class="column-4">India</td>
</tr>
<tr class="row-286 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cfabaebba7bdaaaae1a5aeb9b9aeaba68fb9a1acbcaabdb9a6acaabce1a6a1">Dathree Javvadi</a></td><td class="column-2">Cheif Human Resources Officer CHRO</td><td class="column-3">VNC Digital Services</td><td class="column-4">India</td>
</tr>
<tr class="row-287 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#204445424153484953484260494e544552524149540e434f4d">Debashish Bhattacharya</a></td><td class="column-2">Head of HR</td><td class="column-3">Interra Information Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-288 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f79392959382838396d9959f98809a9e949cb796839e939e81d994989a">Debdutta Bhowmick</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Atidiv</td><td class="column-4">India</td>
</tr>
<tr class="row-289 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1d5d4d3dedbd8c59fd5d0c2f1d3d4c5c5d4c3c1ddd0d2d49fd2de9fd8df">Debojit Das</a></td><td class="column-2">Associate Director - Staffing</td><td class="column-3">BetterPlace</td><td class="column-4">India</td>
</tr>
<tr class="row-290 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#721602130101131c1a1332170417000b16130b1a17131e061a5c111d1f">Deborah Passanha</a></td><td class="column-2">Director of Operations / HR Head</td><td class="column-3">Everyday Health Group</td><td class="column-4">India</td>
</tr>
<tr class="row-291 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#385c5d5d48784c505156535a4a515c5f5d165156">Deep Ambike</a></td><td class="column-2">Associate Director - Global Talent</td><td class="column-3">thinkbridge</td><td class="column-4">India</td>
</tr>
<tr class="row-292 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#482c2d2d386638293c2d2408212b3b652f24272a2924662126">Deep Patel</a></td><td class="column-2">Vice President Talent Acquisition</td><td class="column-3">INTECH</td><td class="column-4">India</td>
</tr>
<tr class="row-293 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cdafa9a8a8bdac8db7a8a2a0a8aaace3aea2a0">Deepa Baburaj</a></td><td class="column-2">Associate Director - HR at ZeOmega</td><td class="column-3">ZeOmega</td><td class="column-4">India</td>
</tr>
<tr class="row-294 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#40242525302100303224382e6e232f2d">Deepa Dand</a></td><td class="column-2">Director of Accounts/Administration (HR Support)</td><td class="column-3">Axioned</td><td class="column-4">India</td>
</tr>
<tr class="row-295 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#badedfdfcadb94d7dbd1d2d3d0dbfaddcfcac9d2cfca94d3d5">Deepa Makhija</a></td><td class="column-2">Associate Director HR</td><td class="column-3">Gupshup</td><td class="column-4">India</td>
</tr>
<tr class="row-296 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0266676772632c6f77696a6770686767426771706b2c6b6c">Deepa Mukherjee</a></td><td class="column-2">Chief People Officer &amp; Vice President</td><td class="column-3">Esri India</td><td class="column-4">India</td>
</tr>
<tr class="row-297 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7c3c2c2d7c689d7c6cbc6c9ced4d0c6cadee7c3d2c4c2c9ced389c4c8ca">Deepa Palaniswamy</a></td><td class="column-2">Center Head India / Operations and Global HR</td><td class="column-3">Ducen</td><td class="column-4">India</td>
</tr>
<tr class="row-298 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1175747461703f6263786170657978517a7e7f7872707c787f7e7d65703f727e7c">Deepa Sripathi</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Konica Minolta Business Solutions India</td><td class="column-4">India</td>
</tr>
<tr class="row-299 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90f4f5f5e0f1fbbef2f1f2e5d0f1e0e0e6f9f5e7e8bef3fffd">Deepak Babu</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">AppViewX</td><td class="column-4">India</td>
</tr>
<tr class="row-300 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9cdccccd9c8c287cac1c8dfc8c7e9dfc0dac0cbc5ccc8c5d9c1c887cac6c4">Deepak Chavan</a></td><td class="column-2">Manager - Head Talent Acquisition India</td><td class="column-3">Visible Alpha</td><td class="column-4">India</td>
</tr>
<tr class="row-301 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfdbdadacfded491dbdaccd7cfded1dbdaffd1dacbd2ded8d6dcccd0d3cacbd6d0d1cc91dcd0d2">Deepak Deshpande</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-302 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#721617170213193207111a1b1113151d5c171607">Deepak Gelda</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">IT Services</td><td class="column-4">India</td>
</tr>
<tr class="row-303 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91f5faf9f0fffff0d1f8e2f9f8e3bff2fefc">Deepak Khanna</a></td><td class="column-2">Chief Talent Officer</td><td class="column-3">ISHIR</td><td class="column-4">India</td>
</tr>
<tr class="row-304 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dcb8b9b9acbdb7f2b1b9b0abbdb2b59cbbbdb0bda4a5abb9beb0b5b2b7aff2bfb3f2b5b2">Deepak Melwani</a></td><td class="column-2">Head of Talent Acquisition and Employer Branding</td><td class="column-3">Galaxy Weblinks Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-305 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0165646471606a2f71607660734160626274756462692f626e2f686f">Deepak Pawar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Accutech Power Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-306 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#137776766372783d61727e7278617a607b7d727d53706062667261763d7a7d">Deepak Ramakrishnan</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">C-Square Info Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-307 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#92f6f7f7e2f3f9d2f6fbeafbe6fbfcf6fbf3bcf1fdff">Deepak Singh</a></td><td class="column-2">Head of HR</td><td class="column-3">Dixit Infotech Services</td><td class="column-4">India</td>
</tr>
<tr class="row-308 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#debabbbbaebfb2b79eaeacb1a6b7b3b7aaa7f0aabbbdb6">Deepali </a></td><td class="column-2">Director - People Operations</td><td class="column-3">Proximity Works</td><td class="column-4">India</td>
</tr>
<tr class="row-309 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3b7b6b6a3b2bfbafda5b6a1b7ba93b4b6bda9b6bcbdfdb0bcbe">Deepali Verdi</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Genzeon</td><td class="column-4">India</td>
</tr>
<tr class="row-310 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c7879796c7d6f746e7979326a5c6f777579727f79327f7371">Deepashree V</a></td><td class="column-2">HR Head - India</td><td class="column-3">Skience</td><td class="column-4">India</td>
</tr>
<tr class="row-311 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#65010000150c0e04250415150c0b001616120a1709014b060a08">Deepika Pandita</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Appiness Interactive</td><td class="column-4">India</td>
</tr>
<tr class="row-312 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ef8b8a8a9f86848eaf988a8d849a83c18c8082">Deepika Singh</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Webkul</td><td class="column-4">India</td>
</tr>
<tr class="row-313 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0460616174706c6d2a6f61776d766160607d4477696576706d69772a676b69">Deepthi Kesireddy</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Smart IMS</td><td class="column-4">India</td>
</tr>
<tr class="row-314 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82e6e7e7f2f6eaebacf4c2e7f6e5e5f1ace1edef">Deepthi Vorem</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">ETG Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-315 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1d5d4d4c1c5d8f1dcd8dfd5d2c3d0d7c59fd8df">Deepti Ashar</a></td><td class="column-2">Vice President, Head of Consulting Services &amp; HR</td><td class="column-3">MindCraft Software</td><td class="column-4">India</td>
</tr>
<tr class="row-316 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5f3b3a3a2f2b36713d3e2b3736353e1f302d3c3e2f303b2c3a2d29363c3a2c713c3032">Deepti Bathija</a></td><td class="column-2">AVP - (Contract Staffing - BFSI &amp; Service Clients)</td><td class="column-3">Orcapod</td><td class="column-4">India</td>
</tr>
<tr class="row-317 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#92f6fef7e5fbe1d2f1fdfce4fbe4f3bcf1fdff">Deepti Lewis</a></td><td class="column-2">HR Director</td><td class="column-3">Conviva</td><td class="column-4">India</td>
</tr>
<tr class="row-318 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91f5f4f4e1e5f8bffcd1e5e3f4fdfdbff8ff">Deepti Mendiratta</a></td><td class="column-2">Associate Director HR</td><td class="column-3">Trell</td><td class="column-4">India</td>
</tr>
<tr class="row-319 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b5f5e5e4b4f5215557b5a58585e574a15585456">Deepti N</a></td><td class="column-2">Director-HR</td><td class="column-3">ACCELQ</td><td class="column-4">India</td>
</tr>
<tr class="row-320 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#593d3c3c292d30772a383137301934363b303536302d2d3c773a3634">Deepti Sahni</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Mobiloitte</td><td class="column-4">India</td>
</tr>
<tr class="row-321 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0d4d7c4d5c7d1c2d9f0c1c5d1c2db9ed3dfdd">Deepti Tewari</a></td><td class="column-2">Global Human Resources Director</td><td class="column-3">Quark Software</td><td class="column-4">India</td>
</tr>
<tr class="row-322 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e5a5b5b4e4a57497e4e4c5b134d5d575b504a105d5153">Deepti Waghmare</a></td><td class="column-2">Director - Legal, HR &amp; Admin</td><td class="column-3">Prescient Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-323 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6d2d3d998ddc3dbd7c4f6d7ddd7dadfd8d0d9c5cfc598d5d9db">Deo Kumar</a></td><td class="column-2">Recruitment and Deployment Head</td><td class="column-3">Akal Information Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-324 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cca8a9baada2ab8cbfb8beadb8a9aba5afa9bebce2afa3a1">Devang Hindocha</a></td><td class="column-2">Head of HR</td><td class="column-3">StrategicERP Business Automation Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-325 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52363724333c213a7c3c3320333c35123e3d313d7c3535">Devansh Narang</a></td><td class="column-2">Head of Content &amp; Talent</td><td class="column-3">Loco</td><td class="column-4">India</td>
</tr>
<tr class="row-326 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa9e9f8c9b94899293ba98889b93949f88928f98d4999597">Devanshi Shah</a></td><td class="column-2">Head of HR &amp; Talent Acquisition</td><td class="column-3">BrainerHub Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-327 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#573332213225243f3e79333224363e1724243a3e3931382332343f7934383a">Devershi Desai</a></td><td class="column-2">Head -Human Resource</td><td class="column-3">SSM InfoTech Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-328 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4125332425253801253726282f3524332022352837246f222e2c">Devi Reddy</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">DVG</td><td class="column-4">India</td>
</tr>
<tr class="row-329 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95f1f0e3fcfef4d5e6fdfae5edbbfcfb">Devika Chauhan</a></td><td class="column-2">Director Human Resource</td><td class="column-3">ShopX</td><td class="column-4">India</td>
</tr>
<tr class="row-330 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e5818d849788808b819784cb9784928491a58990888c94cb848c">Dharmendra Rawat</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Lumiq</td><td class="column-4">India</td>
</tr>
<tr class="row-331 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5a1ada4b7a8a0aba1b7a485a4aeb6ada4bceba6aaa8">Dharmendra Singh</a></td><td class="column-2">GM - Head of Staffing</td><td class="column-3">Akshay Software Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-332 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9efaf6ffecf3f7f5deffeaf2fff0b0fdf1f3">Dharmik Gohel</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Atlan</td><td class="column-4">India</td>
</tr>
<tr class="row-333 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83e7f0ebe2ede8e2f1c3e7e2f7e2eaedf7e6edf0eaf7faade0ecee">Dhinesh Shankar</a></td><td class="column-2">AVP - HR &amp; Admin</td><td class="column-3">Data Intensity</td><td class="column-4">India</td>
</tr>
<tr class="row-334 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ffbf4fef2fdf0f5dff1fae8ebf8f3f0fdfef3fcf0edefb1fcf0f2">Dhirendra Kamboj</a></td><td class="column-2">Director-Talent Acquisition</td><td class="column-3">Newt Global Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-335 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91f5f9f8e3f4fff5e3f0bfe1f0fff5f0d1f8e7f0fde4f4bff2febff8ff">Dhirendra Panda</a></td><td class="column-2">Head HR</td><td class="column-3">iValue InfoSolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-336 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95f1fde7fce1fce5f4e7fbf4f1d5eff0fbf1e7fce3f0bbf6faf8">Dhritiparna Dhar</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Zendrive</td><td class="column-4">India</td>
</tr>
<tr class="row-337 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f4b46445c474e6f4e5f5f5b584e5d4a014c4042">Diksha Rohokale</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Apptware</td><td class="column-4">India</td>
</tr>
<tr class="row-338 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ff9b96948c979ed18c968c909b969ebf9a8b9a8d918a8c8c90938a8b9690918cd19c9092">Diksha Sisodia</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Eternus</td><td class="column-4">India</td>
</tr>
<tr class="row-339 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7115181d1414015f12191e08100101101d1d08311f14020516031e04015f1f1405">Dileep Choyappally</a></td><td class="column-2">Vice President &amp; Head of Human Resources</td><td class="column-3">NeST Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-340 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d1f120f1c1553191411140d3d0e18130f040e1c531e1210">Dilip Borah</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Senrysa Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-341 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2a6abaeabb2ecb182b6aaa7abafb2a7b0a3b6abb4a7ecabac">Dilip Satpute</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Imperative Business Ventures</td><td class="column-4">India</td>
</tr>
<tr class="row-342 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#55313c382534397b25342130391521343621212730307b363a38">Dimpal Patel</a></td><td class="column-2">Head- Human Resources and Talent Acquisition</td><td class="column-3">TactTree LLP</td><td class="column-4">India</td>
</tr>
<tr class="row-343 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b4f4c4440434a474e6b48594c59445e5b054844054245">Dinanath Gokhale</a></td><td class="column-2">Director - HR</td><td class="column-3">CRG Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-344 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98fcf1f6fdebf0b6f0fdf5fcfdeed8f4f7fff1e0f9f4b6fbf7f5">Dinesh Hemdev</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Logixal Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-345 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#73171a1d16001b5d01121a331b1a01160b125d101c1e">Dinesh Rai</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Hirexa Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-346 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89ede0e7ecfae1a7f0fcffe8fbe8e3c9e0fff0e4e6ebe0e5e0fdf0a7eae6e4">Dinesh Yuvaraj</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Ivy Mobility</td><td class="column-4">India</td>
</tr>
<tr class="row-347 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52363b22333e3b313a3324333c1231203736373c3137333c333e2b263b31217c313d3f">Dipali Chavan</a></td><td class="column-2">Head HR</td><td class="column-3">Credence Analytics</td><td class="column-4">India</td>
</tr>
<tr class="row-348 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#43272a3326302b03332630372c6d3726202b">Dipesh Jain</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Pesto Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-349 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d59544d54565c4e555c4f505c7d4e5145135e52135453">Dipika Sharma</a></td><td class="column-2">Head of HR at Securelynkx Networks</td><td class="column-3">Securelynkx Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-350 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#92f6fbe2e6fafbe0d2f6f1f9f3e2bcf1fdff">Dipthi Rajagopal</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">DCKAP</td><td class="column-4">India</td>
</tr>
<tr class="row-351 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#debab7aeaab79eb7b0adb7babbacf0b7b0">Dipti Goel</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Paytm Insider</td><td class="column-4">India</td>
</tr>
<tr class="row-352 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f0fde4e0fdbafffbe0fcf5e6fdd4e7f5e0fdfaf7fbe6e4baf7fbf9">Dipti Kothari</a></td><td class="column-2">Recruitment Delivery Head</td><td class="column-3">SA Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-353 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e98d809a8188c78b888580a99b8c84809d86878580878cc780878f86">Disha Bali</a></td><td class="column-2">Head HR</td><td class="column-3">Fable Fintech</td><td class="column-4">India</td>
</tr>
<tr class="row-354 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f1b160c171e1114510d1e153f1e1a0d161a0c0b1a1c17111013101806511c1012">Dishank Raj</a></td><td class="column-2">Head/Director Talent Acquisition - India</td><td class="column-3">Aeries Technology Group</td><td class="column-4">India</td>
</tr>
<tr class="row-355 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#12767352647b606177713c717d7f">Divya A</a></td><td class="column-2">Head HR</td><td class="column-3">Virsec Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-356 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c08051a150d420e090209091f042c160d0b0b0009420502">Divya Beneesh</a></td><td class="column-2">Associate Director - Employee Benefits</td><td class="column-3">Zaggle Prepaid Ocean Services</td><td class="column-4">India</td>
</tr>
<tr class="row-357 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#25414c535c440b47654257405c4a57444b42400b464a48">Divya Bhardwaj</a></td><td class="column-2">Associate Director Global HR Operations</td><td class="column-3">GreyOrange</td><td class="column-4">India</td>
</tr>
<tr class="row-358 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f7939e818e96d9949f969993859684929c9f968596b79e9991988098859c84d99e98">Divya Chandrasekhara</a></td><td class="column-2">HR Director - India at Infoworks.Io</td><td class="column-3">Infoworks.io</td><td class="column-4">India</td>
</tr>
<tr class="row-359 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87e3eef1fee6a9e3e6e9e0c7e4ebe8f2e3e6e9e6ebe8e0fea9e4e8ea">Divya Dang</a></td><td class="column-2">Sr. HR Head</td><td class="column-3">Cloud Analogy</td><td class="column-4">India</td>
</tr>
<tr class="row-360 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#caaeaeafbcabbaabbea2a4a38aadafa7a3a4a3e7bfb9e4a9a5a7">Divya Devapathni</a></td><td class="column-2">HR Head Operations</td><td class="column-3">Gemini Consulting &amp; Services</td><td class="column-4">India</td>
</tr>
<tr class="row-361 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a5e534c435b7a4e525f49595b565f484914595557">Divya Gunashekar</a></td><td class="column-2">Director of HR</td><td class="column-3">The Scalers</td><td class="column-4">India</td>
</tr>
<tr class="row-362 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6b2bfa0afb7bcb7b1b1bf96a6a4b9bbb7b5a2bfb8b0b9f8b5b9bb">Divya Jaggi</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Promact Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-363 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e08489969981ce8a85948889a0838c8f9584818e818c8f8799ce838f8d">Divya Jethi</a></td><td class="column-2">Sr. HR Head</td><td class="column-3">Cloud Analogy</td><td class="column-4">India</td>
</tr>
<tr class="row-364 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c58554a455d12577c58555d515352584c555f57125f5351">Divya Keshav</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">Diamondpick</td><td class="column-4">India</td>
</tr>
<tr class="row-365 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#71151807081031051010021914145f121e1c">Divya Nadikattu</a></td><td class="column-2">Head of HR</td><td class="column-3">Taashee Linux Services</td><td class="column-4">India</td>
</tr>
<tr class="row-366 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#35515c434c5475515c54585a5b51455c565e1b565a58">Divya Nitin</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Diamondpick</td><td class="column-4">India</td>
</tr>
<tr class="row-367 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a7e736c637b6a5a797f7d757469757c6e34797577">Divya P</a></td><td class="column-2">HR Head</td><td class="column-3">Cegonsoft</td><td class="column-4">India</td>
</tr>
<tr class="row-368 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a2c6cbd4dbc38cd2e2c1c7cbd2c3ce8cc1cdcf">Divya Pant</a></td><td class="column-2">AVP - HR</td><td class="column-3">CEIPAL Corp.</td><td class="column-4">India</td>
</tr>
<tr class="row-369 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e5818c939c84cb959784968481a58c88958089969c96cb868a88">Divya Prasad</a></td><td class="column-2">Associate Director - Talent Development</td><td class="column-3">Impelsys</td><td class="column-4">India</td>
</tr>
<tr class="row-370 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f0fde2edf5bae4e1e0fcfde6f1f0f0fdd4e0f5faf8f5baf7fbf9">Divya Puthireddi</a></td><td class="column-2">AVP HR</td><td class="column-3">Tanla Platforms</td><td class="column-4">India</td>
</tr>
<tr class="row-371 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8de9e2e3e3eca3e8e1e1e4e8fecdefffa3e4fc">Donna Ellies</a></td><td class="column-2">Sr. Director, People Operations - India</td><td class="column-3">Briq</td><td class="column-4">India</td>
</tr>
<tr class="row-372 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f6b7d667c677b664f6e7d7b6060617c60637a7b6660617c216c6062">Drishti Mistry</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Artoon Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-373 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1377666174723d7278667f7253707c67767f7f7a74767d673d707c7e">Durga Akula</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Cotelligent</td><td class="column-4">India</td>
</tr>
<tr class="row-374 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bedacbccd9dfceccdfcddfdadffececcd1dfccddd690ddd1d3">Durga Androthu</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Enhops</td><td class="column-4">India</td>
</tr>
<tr class="row-375 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#462322312f2868302f2b272a06353f35302f28236825292b">Edwin </a></td><td class="column-2">Director HR</td><td class="column-3">Sysvine Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-376 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#30555b44511e53585f4754584249704358594043491e595f">Ekta Chowdhry</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Shipsy</td><td class="column-4">India</td>
</tr>
<tr class="row-377 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ffaf4ebfeb1f4f0f7f3f6dfecf6f2eaf3feebf6f0f1f6eeb1fcf0f2">Ekta Kohli</a></td><td class="column-2">VP - HR &amp; Operations</td><td class="column-3">Education Management Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-378 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5a0a9acbfa4a7a0b1adebaf85a4b5b5abaaa8aca6eba6aaa8">Elizabeth Johnson</a></td><td class="column-2">Director-Human Resources</td><td class="column-3">Appnomic</td><td class="column-4">India</td>
</tr>
<tr class="row-379 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0a5ada9aca9af80a5b4afb5a3a8eeaea5b4">Emilio Rodrigues</a></td><td class="column-2">Director - HR</td><td class="column-3">eTouch Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-380 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f29780939fdc838796819b93b29f8b95938697dc9b9c">Eram Qudsia</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">MyGate</td><td class="column-4">India</td>
</tr>
<tr class="row-381 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1376607b723d7e726a76787261537266677c637f727d673d7a7d">Esha Mayekar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Autoplant System India</td><td class="column-4">India</td>
</tr>
<tr class="row-382 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8feafcf8eefde6a1f9cffbfde6e1e8eefffffca1ece0e2">Eswari Velayutham</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Tringapps</td><td class="column-4">India</td>
</tr>
<tr class="row-383 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8feafbf6cfedfaf5f5ece3eee1a1ece0e2">Ety Garg</a></td><td class="column-2">Associate Director-Talent Acquisition</td><td class="column-3">BuzzClan</td><td class="column-4">India</td>
</tr>
<tr class="row-384 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#07627274736e696229736f686a6674476675742a73756661616e642964686a">Eustine Thomas</a></td><td class="column-2">Head of HR</td><td class="column-3">ARS Traffic &amp; Transport Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-385 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1d4c8c4dfdfd89fdac4dcd0c3f1d3d5c9c6dec3ddd59fd2dedc">Eyunni Kumar</a></td><td class="column-2">Vice President Global Head HR &amp; Admin</td><td class="column-3">BDx Data Centers</td><td class="column-4">India</td>
</tr>
<tr class="row-386 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6b0b7b4bfb7b8b7f8a5b9b4b3a4a596b5b7a5beb7a6b9b8b7f8b5b9bb">Fabiana Sobers</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Cashapona Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-387 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e2fdfaf1f1e0bae7fcf5fcd4f2f5f7fdf8f1e7f1e6e2baf7fbf9">Facile </a></td><td class="column-2">Head HR</td><td class="column-3">Facile Services</td><td class="column-4">India</td>
</tr>
<tr class="row-388 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ceaede5ffede0a2ffe5e8e8e5fdf9e5ccf9e2e9e9efe3fcffa2efe3e1">Faisal Siddiqui</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Uneecops Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-389 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a4c4b43504b0441424b446a4b5a454643595843594f5904494547">Faiza Khan</a></td><td class="column-2">Head HR - India</td><td class="column-3">Apolis</td><td class="column-4">India</td>
</tr>
<tr class="row-390 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f791959290829ab79f9e8396949f9eda84989b82839e989984d994989a">Fareeda Begum</a></td><td class="column-2">Director - HR</td><td class="column-3">Hitachi Solutions Asia Pacific</td><td class="column-4">India</td>
</tr>
<tr class="row-391 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6c0c7d4cec3c3c8e6d4c7d6cfc2c0cac9d1c7d6d6d588c5c9cb">Farheen Hassan</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Rapidflow Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-392 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3056514a515c1e5b5142595d705d5544515f4044595f5e1e535f5d">Fazal Karim</a></td><td class="column-2">Staffing Head</td><td class="column-3">MetaOption LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-393 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e187889385809492cf8c84899580a189848d888e92928e8d9495888e8f92cf828e">Firdaus Mehta</a></td><td class="column-2">Head - People &amp; Culture</td><td class="column-3">Helios Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-394 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4620342728252f356821292835272a302335062b292328212721236825292b">Francis Gonsalves</a></td><td class="column-2">Director, HRBP</td><td class="column-3">MoEngage</td><td class="column-4">India</td>
</tr>
<tr class="row-395 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a1c081b14111613143a0e121f09191b161f080954191517">Franklin Frank</a></td><td class="column-2">Head of People &amp; Culture</td><td class="column-3">The Scalers</td><td class="column-4">India</td>
</tr>
<tr class="row-396 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a6c78636e6b246e636b794a677a7963647e6f786b697e637c6f24696567">Frida Dias</a></td><td class="column-2">Director - HR</td><td class="column-3">MPS Interactive Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-397 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d7b1a5beb2b9b3f9b1a5beb2b9b397b9bebea3faa3b2b4bff9b4b8ba">Friend Friend</a></td><td class="column-2">recruitment head</td><td class="column-3">NIIT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-398 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#27404649465746534f5e0943674a554254524b530944484a">Ganapathy D</a></td><td class="column-2">Director HRBP</td><td class="column-3">MResult</td><td class="column-4">India</td>
</tr>
<tr class="row-399 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c2b3f2321253f293838250c29212d25206234382b20232e2d20622f2321">Ganesh Somisetti</a></td><td class="column-2">Head - People &amp; Culture</td><td class="column-3">XTGlobal,</td><td class="column-4">India</td>
</tr>
<tr class="row-400 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a2d2b382d2364382b202b240a3f2423292527272f38292f64292527">Gargi Rajan</a></td><td class="column-2">Associate Director - Human Resources</td><td class="column-3">Unicommerce eSolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-401 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0a7a1b2a9ada1eeb0a1aea4a5b980a5b0b3afa6b4a9aea3eea3afad">Garima Pandey</a></td><td class="column-2">HR-Director</td><td class="column-3">EPSoft</td><td class="column-4">India</td>
</tr>
<tr class="row-402 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e78086958e8a86c997868983829ea79586938280868e89c984888a">Garima Pandey</a></td><td class="column-2">Associate Director - Global Talent Acquisition</td><td class="column-3">RateGain</td><td class="column-4">India</td>
</tr>
<tr class="row-403 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddbabcafb4b0bcf3afbca9b5b49dbeb2b3b9b8beb2aeb2bba9aabcafb8f3beb2b0">Garima Rathi</a></td><td class="column-2">Head of Shared Services - Human Resources</td><td class="column-3">Condeco</td><td class="column-4">India</td>
</tr>
<tr class="row-404 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#177076657e7a763964767970607679577674747867643974787a">Garima Sangwan</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Accops Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-405 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93f4e0fbf2e1fef2d3fdf2e0e0f0fcfebdfafd">Garima Sharma</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">NASSCOM</td><td class="column-4">India</td>
</tr>
<tr class="row-406 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#33544a595c405b5a73445c4158555c4150565f5c545a421d505c5e">Gaurang Joshi</a></td><td class="column-2">Director, Human Resource</td><td class="column-3">Workforce Logiq</td><td class="column-4">India</td>
</tr>
<tr class="row-407 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cea9afbbbcafb8a9afbbbc8ea7bca1a0bdb7bdbaaba3bde0ada1a3">Gaurav Gaur</a></td><td class="column-2">Head of Workforce Innovation</td><td class="column-3">Iron Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-408 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8beceafef9eafda5f8cbeae6e2eceae2e5ede4f9e6eaffe2e8f8a5e8e4e6">Gaurav Saxena</a></td><td class="column-2">Associate Director-Talent Acquisition/Recruitment</td><td class="column-3">Amiga Informatics</td><td class="column-4">India</td>
</tr>
<tr class="row-409 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88efe9fdfae9fea6fdf8e9ece0f1e9f1c8febafbe7e4fdfce1e7e6fba6ebe7e5">Gaurav Upadhyay</a></td><td class="column-2">Director - Digital Workforce</td><td class="column-3">V2Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-410 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d2a2c38392c200d2b243f3e392e222323282e393e222138392422233e632e2220">Gautam Kar</a></td><td class="column-2">Chief People Officer</td><td class="column-3">FirstConnect Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-411 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83e4e2f6f7e2eeedc3f7e1efece0e8f0ade0ecee">Gautam Nautiyal</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">TechBlocks</td><td class="column-4">India</td>
</tr>
<tr class="row-412 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#294e485c5d48440759485d4148426946595a415c4b074a4644">Gautam Pathak</a></td><td class="column-2">Vice President (Human Resources and Operations)</td><td class="column-3">OpsHub,</td><td class="column-4">India</td>
</tr>
<tr class="row-413 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d5b2b4a0a1b4b8fba5a7b4a6b4b195babbb1b0b8b4bbb1b4b2bcb9bca1acfbb6bab8">Gautam Prasad</a></td><td class="column-2">Head - US Staffing</td><td class="column-3">OnDemand Agility Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-414 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0265637776636f2c76776c656370674234666765706767716b762c616d6f">Gautam Tungare</a></td><td class="column-2">HR HEAD</td><td class="column-3">6DegreesIT</td><td class="column-4">India</td>
</tr>
<tr class="row-415 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#23444256574b424e0d536342404056414a57500d404c4e">Gautham Premkumar</a></td><td class="column-2">Head of Campus Recruitment</td><td class="column-3">Accubits Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-416 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ff989e869e8b978d96d19e8d8a91948a929e8dbf8b898c919a878bd19690">Gayathri Arunkumar</a></td><td class="column-2">Associate Vice President Recruitment</td><td class="column-3">TVS Next</td><td class="column-4">India</td>
</tr>
<tr class="row-417 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bddadcc4dcc9d5cfd493d3dcdadccfdcd7fdcfd8cecdd2d3ced4cbd8d0c9ce93ded2d0">Gayathri Nagaraj</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Responsive Media Tech Services</td><td class="column-4">India</td>
</tr>
<tr class="row-418 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2740465e4653554e6746524a494e5342444f5048554c540944484a">Gayatri Moghe</a></td><td class="column-2">Head- Talent Acquisition</td><td class="column-3">Aumni Techworks</td><td class="column-4">India</td>
</tr>
<tr class="row-419 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bbdcdac2dacfc9d295d5d2d0d0ced7dafbd2d5c9c295d8d4d6">Gayatri Nikkula</a></td><td class="column-2">VP HR and Operations</td><td class="column-3">INRY</td><td class="column-4">India</td>
</tr>
<tr class="row-420 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4720263e2633352e37072026332f2e6924282a">Gayatri P</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Gathi Analytics</td><td class="column-4">India</td>
</tr>
<tr class="row-421 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#75125b0514011c19351e1a1e1a1b1001021a071e065b161a18">Gayatri Patil</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">KOKO Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-422 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f295938b9386809bb2968b9d9d869bdc919d9f">Gayatri Shanker</a></td><td class="column-2">Head, Communications, People &amp; Culture</td><td class="column-3">Dyooti</td><td class="column-4">India</td>
</tr>
<tr class="row-423 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5532342f3439153c3834273e3c3b333a2130363d7b363a38">Gazal Singhania</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">iMark Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-424 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98fffdfdecf9f6f2f9f4f1b6ecf7f7e8eaf9f6d8ebf7f4f1e0b6fbf7f5">Geetanjali Toopran</a></td><td class="column-2">Head-HUman Resources</td><td class="column-3">Solix Technologies,</td><td class="column-4">India</td>
</tr>
<tr class="row-425 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94f3fde6fdbaf6f5f6e1d4faf1fbe2f5e0fdf7baf7fbf9">Giri Babu</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Neovatic Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-426 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#afc8c6ddc6cbc7cedd81cbefca9a81cec6">Giridhar D</a></td><td class="column-2">Head Of Operations &amp; HR</td><td class="column-3">Element5</td><td class="column-4">India</td>
</tr>
<tr class="row-427 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#711607141c0416101f05183105100510041f1802051e03145f121e1c">Giridhar Vemuganti</a></td><td class="column-2">Head - People Operations</td><td class="column-3">Tata CLiQ</td><td class="column-4">India</td>
</tr>
<tr class="row-428 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f1969883988299df82849383909c909f98909fb182889c81999e9f8883948590989d9098df929e9c">Girish </a></td><td class="column-2">Human Resources Director - India</td><td class="column-3">Symphony RetailAI</td><td class="column-4">India</td>
</tr>
<tr class="row-429 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a7d736873697234715a73747c75777b607f7b6a6a6934797577">Girish Kumar</a></td><td class="column-2">Head-Admin/ HR</td><td class="column-3">INFOMAZE</td><td class="column-4">India</td>
</tr>
<tr class="row-430 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#791e100d185714181d110c0b10391a160f18151c170a1c1e15161b1815571a1614">Gita Madhuri</a></td><td class="column-2">Director - HR and Talent Acquisition</td><td class="column-3">Covalense Global</td><td class="column-4">India</td>
</tr>
<tr class="row-431 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#66010f1207080c070a0f481003080d071203150e26031e05030a0308050f0705090815130a120f08014805090b">Gitanjali Venkatesh</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Excelencia</td><td class="column-4">India</td>
</tr>
<tr class="row-432 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c6b65786d62666d6065227a697e616d4c7b3f7a6560606d226f6361">Gitanjali Verma</a></td><td class="column-2">AVP - Human Resources</td><td class="column-3">W3villa Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-433 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88efe7f8e9e4e9e3fae1fbe0e6e9a6effdeaeae1c8e2fbffa6e1e6">Gopalakrishna Gubbi</a></td><td class="column-2">Head HR &amp; Facilities</td><td class="column-3">JSoft Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-434 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f89f978d8c9099959ab88b818b8c9d9491969bd69b9795">Goutham B</a></td><td class="column-2">AVP - INDIA - HR</td><td class="column-3">Systel</td><td class="column-4">India</td>
</tr>
<tr class="row-435 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52353d243b3c367c303a333c3633203b1236333e3d3d22337c313d3f">Govind Bhandari</a></td><td class="column-2">Head of Human Resources &amp; Talent Acquisition</td><td class="column-3">Daloopa</td><td class="column-4">India</td>
</tr>
<tr class="row-436 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d1a120b1413193d1812050b1c13091c1a18531e1210">Govind Raj</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">EOX Vantage</td><td class="column-4">India</td>
</tr>
<tr class="row-437 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#01666e77686f65602f72696072757378416866687472602f626e6c">Govinda Shastry</a></td><td class="column-2">Head-HR and Administration</td><td class="column-3">Infotech Global</td><td class="column-4">India</td>
</tr>
<tr class="row-438 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4c3d6c5c7dde4d4c1d6c2cdcbd78ac7cbc9">Gracy Dsouza</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Perfios Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-439 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3156435841425e5f1f5c504345544271555445545245455452595f5e5d5e565854421f525e5c">Gripson Martes</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Detect Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-440 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#adcad8caccdddfc4d4ccedc4c9c8ccdedec4c2c383cec2c0">Gugapriya O</a></td><td class="column-2">Head-Talent Transformation</td><td class="column-3">Ideassion Technology Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-441 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b5c4e5748535a557b555e5a4915585456">Gulshan S</a></td><td class="column-2">Director, Strategic HR</td><td class="column-3">Near</td><td class="column-4">India</td>
</tr>
<tr class="row-442 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#81e6f4efebe0efc1f3efe7f5e4e2e9efeeedeee6e8e4f2afe2eeec">Gunjan Mishra</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">RNF Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-443 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec8b999e9c9e898998c2868d8b8b85ac8e89989f8380c28f8381">Gurpreet Jaggi</a></td><td class="column-2">Director, HR and Operations</td><td class="column-3">BETSOL</td><td class="column-4">India</td>
</tr>
<tr class="row-444 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deb9abacaeacbbbbaaf0adb7b0b9b69ea9b7b0b9b7b8a7f0bdb1b3">Gurpreet Singh</a></td><td class="column-2">Head - Talent Management</td><td class="column-3">Wingify</td><td class="column-4">India</td>
</tr>
<tr class="row-445 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd9a888f88bd929398d39e9290">Gurucharan Singh</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">one.com</td><td class="column-4">India</td>
</tr>
<tr class="row-446 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#37504e5659775452594345584f4e1954585a">Gyan Dash</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Centroxy</td><td class="column-4">India</td>
</tr>
<tr class="row-447 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cba3aaa5a2b8a3e5bfa2bcaab9a28baaa5bfe5bca4b9a0b8">Hanish Tiwari</a></td><td class="column-2">AVP-HR</td><td class="column-3">AntWorks</td><td class="column-4">India</td>
</tr>
<tr class="row-448 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8be3eae5e0a5e6e2f8e3f9eacbeae5e8e3eae5ffe4a5e8e4e6">Hank Mishra</a></td><td class="column-2">Global Human Resources Director</td><td class="column-3">Anchanto</td><td class="column-4">India</td>
</tr>
<tr class="row-449 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4129203131380122203124332c282f356f222e2c">Happy Vachhani</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Capermint Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-450 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88e0e9fae1a6e3fae1fbe0e6e9e6c8e9fee9fbe7fcedebe0a6ebe7e5">Hari Krishnan</a></td><td class="column-2">Global Head Human Resources</td><td class="column-3">AVASO Technology Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-451 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84ece5f6edefedf7ecebf6e1aaf4c4e1fce7e1e8f6e5aae7ebe9">Hari Paramatmuni</a></td><td class="column-2">Head Talent Acquisition and Development</td><td class="column-3">Excelra</td><td class="column-4">India</td>
</tr>
<tr class="row-452 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86eee7f4efa8f6c6f1e3f5f2e7e1efeae3eae7e4f5a8e5e9eb">Hari Prashanth</a></td><td class="column-2">Associate Director -Talent Acquisition</td><td class="column-3">West Agile Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-453 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#761e17041f1d041f051e1817581417151e171a17361b1f02051f18125815191b">Harikrishna Bachala</a></td><td class="column-2">Associate Director HR</td><td class="column-3">Monarch Info Tech Services</td><td class="column-4">India</td>
</tr>
<tr class="row-454 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3dbd2c1dac3c1d2c0d2d7d2d7c7dbd2dfd6f3d2c0d8d1c1d2d8d69dd0dcde">Hariprasad Adthale</a></td><td class="column-2">Head HR &amp; Admin</td><td class="column-3">ASK Automotive</td><td class="column-4">India</td>
</tr>
<tr class="row-455 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f19990839882df90b1858384969d9e93909ddf929e9c">Haris Ali</a></td><td class="column-2">Corp. HR Director</td><td class="column-3">TRUGlobal</td><td class="column-4">India</td>
</tr>
<tr class="row-456 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1a9a0b3a881bbb4aca4afefa2aeac">Harishankar Krishnamurthi</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Zumen Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-457 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4820293a213b20292623202d3a082b272c21262f25293a3c662b2725">Harishankher Selvaraj</a></td><td class="column-2">Lead Talent Acquisition (Interview Head)</td><td class="column-3">Codingmart Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-458 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e58d84978c969184cb8f848e8d8497a58c88958089969c96cb868a88">Harista Jakhar</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Impelsys</td><td class="column-4">India</td>
</tr>
<tr class="row-459 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cba3aab9a2bfa3e5a8a3aaa6a9b9aabdaaa7a7a28ba4a9b8aeb9bdaee5aaa2">Harith Chambravalli</a></td><td class="column-2">Senior Director/India Head of Talent Strategy</td><td class="column-3">Observe.AI</td><td class="column-4">India</td>
</tr>
<tr class="row-460 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec848d9e8598848dc289988d8799808dac8682899898898f84828380838b85899fc28f8381">Haritha Etakula</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">JNET Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-461 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#573f362527253232237935363b3e1739213e243f7934383a">Harpreet Bali</a></td><td class="column-2">Director HR</td><td class="column-3">NVISH Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-462 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95fdf4e7e6fdfed5f0f9f0f8f0fbe1e6f2e6bbf6faf8">Harsh Khanna</a></td><td class="column-2">Director Global Payroll</td><td class="column-3">Atlas</td><td class="column-4">India</td>
</tr>
<tr class="row-463 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9b1b8abaab1b8bdb8f7b4b6b1b8abb0b599bfabbcaab1beabb8afb0ada0f7bab6b4">Harshada Moharil</a></td><td class="column-2">Head HR</td><td class="column-3">Fresh Gravity</td><td class="column-4">India</td>
</tr>
<tr class="row-464 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a525b484952535e5b7a59594e5f5952145955145354">Harshida Bhamare</a></td><td class="column-2">Head HR &amp; operations</td><td class="column-3">Centre for Computational Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-465 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d25383e2c25380d2e243d25283f2e21223829632e2220">Harshiika Upadhyay</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-466 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ee868f9c9d86879a8fc09c8f9a86819c8bae83818180889c8189828f8c9dc08d8183">Harshita Rathore</a></td><td class="column-2">Head of HR</td><td class="column-3">Moonfrog Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-467 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#731a1e01121d5d1b33120312015d101c1e">Haseeb Imran</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Apar Peopleworld Software</td><td class="column-4">India</td>
</tr>
<tr class="row-468 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a424f4f444b6a49464f5c4f585e4b5a04494547">Heena Bawa</a></td><td class="column-2">Director HR</td><td class="column-3">CleverTap</td><td class="column-4">India</td>
</tr>
<tr class="row-469 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b535e565a554f15595a4f495a7b484e4b495a524f4815585456">Hemant Batra</a></td><td class="column-2">Talent Acquisition Manager / Head RMG</td><td class="column-3">SupraES.</td><td class="column-4">India</td>
</tr>
<tr class="row-470 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deb6bbb3bfb0aaf0aebfa9bfac9eb0baadb9b2b1bcbfb2f0bdb1b3">Hemant Pawar</a></td><td class="column-2">Head HR</td><td class="column-3">NextGen Digital Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-471 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96fef3fbf3f8f2e4f7b8f4ffe5e2d6e3a4f9e6fff7fbf9f4fffaf3b8f5f9fb">Hemendra Bist</a></td><td class="column-2">Vice President - HR &amp; Admin.</td><td class="column-3">U2opia Mobile</td><td class="column-4">India</td>
</tr>
<tr class="row-472 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6b030e06070a1f0a450c040e072b18030745080406">Hemlata Goel</a></td><td class="column-2">Head HR-India at SHL( Former Gartner)</td><td class="column-3">Aspiring Minds</td><td class="column-4">India</td>
</tr>
<tr class="row-473 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d6568607f6c674d6e6162786979656c79236463">Hemraj Desai</a></td><td class="column-2">Director HR and OD</td><td class="column-3">CloudThat</td><td class="column-4">India</td>
</tr>
<tr class="row-474 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3159425e5f5871585f575e42545f4254565d5e53505d1f525e5c">Hetal </a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Infosenseglobal Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-475 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f59d9c9894b5868c8681949b929adb969a98">Hima Kulshrestha</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Systango</td><td class="column-4">India</td>
</tr>
<tr class="row-476 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87efeeeae6e0e6f2f5eec7eae2f3e6eae8f5f7eff3e2e4efa9e4e8ea">Himagauri Kashalikar</a></td><td class="column-2">Chief People Officer</td><td class="column-3">MetaMorphoSys Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-477 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e78f8e8a8689948f9285a7869797848e8988c984888a">Himanshu Bhatnagar</a></td><td class="column-2">Head HR</td><td class="column-3">Appcino Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-478 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4aca9adb7acb6a584b2a5a8a1b0acadeaa7aba9">Himanshu Mishra</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Valethi Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-479 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#137b7a7e727d607b6653777a67607661653d707c7e">Himanshu Raina</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">DEV IT SERV</td><td class="column-4">India</td>
</tr>
<tr class="row-480 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#543c3d3a357a3f3c353a1435372120313d3a323b263935203d37277a3d3a">Hina Khan</a></td><td class="column-2">Head Recruitment</td><td class="column-3">Acute Informatics</td><td class="column-4">India</td>
</tr>
<tr class="row-481 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#117962787f767951797865707279783c627e7d6465787e7f623f727e7c">Hitendra Singh</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Hitachi Solutions India</td><td class="column-4">India</td>
</tr>
<tr class="row-482 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87efeef3e2f4efa9e9e6eef5c7e6f6eaf3e2e4efe9e8ebe8e0eee2f4a9e4e8ea">Hitesh Nair</a></td><td class="column-2">AVP of Performance Engineering</td><td class="column-3">AQM Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-483 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#11797e7f7468757474615161707f757e3f7078">Honeydeep Sabharwal</a></td><td class="column-2">Sr Director - HR</td><td class="column-3">PandoCorp</td><td class="column-4">India</td>
</tr>
<tr class="row-484 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#650d170125080412040c08040c094b060a08">Hrd Ltd</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Mawai Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-485 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7e160c170d1617151b0d163e0d0a1b0c121710190d11180a091f0c1b501d11501710">Hrishikesh Nc</a></td><td class="column-2">Head HR</td><td class="column-3">Sterling Software</td><td class="column-4">India</td>
</tr>
<tr class="row-486 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#046c716965446067706d6a672a676b69">Huma Sayed</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Digital Convergence Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-487 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d253820283f2c63242b2b2c39250d393f38282e2c2121283f632e2220">Humera Iffath</a></td><td class="column-2">Human Resources Director- India</td><td class="column-3">Truecaller</td><td class="column-4">India</td>
</tr>
<tr class="row-488 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3abb6b9a6a5a2edb1a6b7aab4a2afa283aea6b7b1aceeb0a6b1b5aaa0a6b0edaaad">Huzefa Retiwala</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">METRO SERVICES</td><td class="column-4">India</td>
</tr>
<tr class="row-489 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#244d484c45490a4951484845644648455e414748454a0a474b49">Ilham Mulla</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Blazeclan Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-490 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfb6b2b89fb6b2b8b8b3b0bdbeb3b6b1b9b0abbabcb7f1bcb0b2">Img Infotech</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">IMG Global Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-491 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86efebf4e7e8e8e2c6f5ede9f4f3fca8e5e9eb">Imran Nazir</a></td><td class="column-2">Vice President-(Talent Acquisition/Analytics)</td><td class="column-3">Skoruz Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-492 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dcb5b2b8b9aeb6b9b9a8f2bba9b6aebdb09cbdacb3b0b5afaeb5afb9aff2bfb3b1">Inderjeet Gujral</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Apolis</td><td class="column-4">India</td>
</tr>
<tr class="row-493 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c180502081e0d0719010d1e2c02181e191f1805020a0318090f04420f0301">Indrakumar Thirunavukkarasu</a></td><td class="column-2">Head-HR (Chennai &amp; US Operations)</td><td class="column-3">NTrust Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-494 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ee7e0f8ebe0fafbe3a0fcebedfcfbe7faebfccee7e0f8ebe0fafbe3a0e0ebfa">Inventum Recruiter</a></td><td class="column-2">Head HR</td><td class="column-3">Inventum</td><td class="column-4">India</td>
</tr>
<tr class="row-495 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e28b9097868b83cc838c968a8d8c9ba28ad38b8c918b858a9691cc818d8f">Irudia Anthony</a></td><td class="column-2">Associate Vice President - Human Resources</td><td class="column-3">Shore Group Associates</td><td class="column-4">India</td>
</tr>
<tr class="row-496 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c0dac1c8c7c087dac1c8dbc4c8e9c0cdcaddcccac1c7c6c5c6cec0ccda87cac6c4">Ishani Sharma</a></td><td class="column-2">India Head-HR &amp; Operations</td><td class="column-3">KBC Technologies Group</td><td class="column-4">India</td>
</tr>
<tr class="row-497 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6a0319060f2a051a0f040e0f191e03040b1e0305041944090507">Isle Fernandes</a></td><td class="column-2">Vice President - HR &amp; Admin</td><td class="column-3">Open Destinations</td><td class="column-4">India</td>
</tr>
<tr class="row-498 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#066c6764636368466e736a6d677676752865696b">Jabeen Pathan</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">HulkApps</td><td class="column-4">India</td>
</tr>
<tr class="row-499 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c060d0f030e42062c1b1e09020f041f030019180503021f420f0301">Jacob Joy</a></td><td class="column-2">Head Strategic HR</td><td class="column-3">WRENCH Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-500 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#73191214121712111b1a5d18011a001b1d12331f161c151c0110165d101c1e">Jagadabhi Krishna</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Leoforce</td><td class="column-4">India</td>
</tr>
<tr class="row-501 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#214b404640454852490f57615344404d564e534d450c4e4f440f424e4c">Jagadish V</a></td><td class="column-2">Head of Talent Management and Culture</td><td class="column-3">realworld one</td><td class="column-4">India</td>
</tr>
<tr class="row-502 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6b010a021b0a07450a0f0f0a0c0a1f070a2b061e1f1e0a0706040902070e45080406">Jaipal Addagatla</a></td><td class="column-2">Associate Director, Talent Acquisition</td><td class="column-3">Mutual Mobile</td><td class="column-4">India</td>
</tr>
<tr class="row-503 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6b010a02190a0145010a0c1f0a1b2b180a1f02050804191b45080406">Jairaj Jagtap</a></td><td class="column-2">Delivery Head- Recruitment/ Recruiting Head</td><td class="column-3">SA Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-504 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6a000b0319132a0c180f19020f18191d0518060e44090507">Jaisy Augustine</a></td><td class="column-2">Head- Recruitment Solutions</td><td class="column-3">Freshersworld.com</td><td class="column-4">India</td>
</tr>
<tr class="row-505 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0e646f606f656720606f67654e7a6f7a6f6a6769677a6f62206d6163">Janaki Naik</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Tata Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-506 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c060d020d0205421c1e0d070d0d1f042c1d190d021809000d420f0301">Janani Prakaash</a></td><td class="column-2">Head HR</td><td class="column-3">Quantela</td><td class="column-4">India</td>
</tr>
<tr class="row-507 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#076d7766726b47746264727568696e7f2964686a">Janet Paul</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Securonix</td><td class="column-4">India</td>
</tr>
<tr class="row-508 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4ded5c7dddac0d5f4d1ccc4d1c6ddd1dad7d19ad7dbd9">Jasinta Francis</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Experience.com</td><td class="column-4">India</td>
</tr>
<tr class="row-509 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a202b3926232f2f2464282b2d22220a28262b2429292564292527">Jaslieen Kaur</a></td><td class="column-2">Director HR and Operations</td><td class="column-3">Blancco Technology Group</td><td class="column-4">India</td>
</tr>
<tr class="row-510 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3953584a5450575c175f79494d5c5a5157564a565f4d175a5654">Jasmine Framjee</a></td><td class="column-2">Head HR</td><td class="column-3">Perpetuuiti Technosoft PTE</td><td class="column-4">India</td>
</tr>
<tr class="row-511 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ff959e8c9296919ad1899e8c889e9196bf88908d939b999e8c979690919a879c979e91989ad19c9092">Jasmine Vaswani</a></td><td class="column-2">Chief Human Resources Officer (CHRO)</td><td class="column-3">WFX - World Fashion Exchange</td><td class="column-4">India</td>
</tr>
<tr class="row-512 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#046e65777476616170776d6a636c446065706563686b72612971772a676b69">Jaspreet Mehta</a></td><td class="column-2">Director-Offshore Staffing Services</td><td class="column-3">Trimax Americas</td><td class="column-4">India</td>
</tr>
<tr class="row-513 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bdd7dcc4dc93d1dcc5d0d4fdcbd4d3ded4c993dbd4">Jaya Laxmi</a></td><td class="column-2">hr head</td><td class="column-3">Vincit</td><td class="column-4">India</td>
</tr>
<tr class="row-514 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4b212a322a653b2a252f2e320b29392a22253d22392e65282426">Jaya Pandey</a></td><td class="column-2">Head HR</td><td class="column-3">Brainvire Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-515 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ea808b93aa899f999e85878f98929a99c4898587">Jayakrishnan M</a></td><td class="column-2">Director - Head of HR</td><td class="column-3">CustomerXPs</td><td class="column-4">India</td>
</tr>
<tr class="row-516 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1dfdbd0c8d0dac4dcd0c3f1d09cd3d8c5c29fd2dedc">Jayakumar N</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Apps Business IT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-517 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4228233b233230232923312a022f2b30232430236c212d2f">Jayaprakash Yangal</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Mirafra Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-518 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#046e657d65776c7661612a6e657d656a706c4471776c71762a676b69">Jayashree Jayanth</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Ushur</td><td class="column-4">India</td>
</tr>
<tr class="row-519 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f757e667e6c776d765f7e726d6a6b6c70796b687e6d7a317c7072">Jayashri Benjamin</a></td><td class="column-2">HR and Admin Head</td><td class="column-3">Amrut Software</td><td class="column-4">India</td>
</tr>
<tr class="row-520 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c6aca7bfa7b2afe8b686ada3ada7e8a5a9ab">Jayati Pardhy</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Keka HR</td><td class="column-4">India</td>
</tr>
<tr class="row-521 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b515a4854575a5550527b4c5449505d5449585e57545c524a15585456">Jayendra Solanki</a></td><td class="column-2">Director- Talent Acquisition</td><td class="column-3">Workforce Logiq</td><td class="column-4">India</td>
</tr>
<tr class="row-522 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5afa0a2a4ababa4b1ada4ab85acb6aaa9b3a0eba2a9aaa7a4a9">Jegannathan Balasubramanian</a></td><td class="column-2">AVP - Talent Growth</td><td class="column-3">iSolve Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-523 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e68c8395918f88c8928e898b8795a697938395928f8988969489c885898b">Jeswin Thomas</a></td><td class="column-2">Head, Customer Success Team | WorkForce</td><td class="column-3">QuestionPro</td><td class="column-4">India</td>
</tr>
<tr class="row-524 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#305a595d555544705d5544515d5f424058445553581e535f5d">Jimeet Jain</a></td><td class="column-2">Health Insurance Practice Head - Asia Pacific</td><td class="column-3">MetaMorphoSys Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-525 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#afc5c6c1daefc29dccc0c2dcd6dc81ccc0c2">Jinu Jose</a></td><td class="column-2">Human Resources Director</td><td class="column-3">M Squared Software and Services</td><td class="column-4">India</td>
</tr>
<tr class="row-526 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84eeedf0e1eae0f6e5aae0e5f7c4f3ebf6efedeaf7fdeae7aaedeb">Jitendra Das</a></td><td class="column-2">Director HR</td><td class="column-3">WorkInSync</td><td class="column-4">India</td>
</tr>
<tr class="row-527 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87edeef3e2e9e3f5e6a9f0e6e9ecefe2e3e2c7e6e9f2e9f3e6f3e2e4efa9e4e8ea">Jitendra Wankhede</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Anunta Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-528 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6dcdfc2d3c5def6c5d9d0c2d8dfd5d398d5d9db">Jitesh Asna</a></td><td class="column-2">AVP - US HR Operations</td><td class="column-3">SoftNice</td><td class="column-4">India</td>
</tr>
<tr class="row-529 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#214b4855494452490f57615b54424852585255444c520f424e4c">Jithesh Vijayan</a></td><td class="column-2">Director- Workforce Management and Strategy</td><td class="column-3">Zuci Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-530 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b617b62736e657f626a4b7b62736e657f626a25686466">Job Pixentia</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Pixentia</td><td class="column-4">India</td>
</tr>
<tr class="row-531 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5d373238301d34293c30382f343e3c733e3230">Joe M</a></td><td class="column-2">Head Technical Recruiter</td><td class="column-3">IT America Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-532 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe94919b92d092919c91be8c8a9d9f938ed09d9193">Joel Lobo</a></td><td class="column-2">Human Resources Director</td><td class="column-3">rtCamp</td><td class="column-4">India</td>
</tr>
<tr class="row-533 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3b9bcbbbda0bcbdb893bdb6a7a1bca5b6a1a7fdbdb6a7">Johnson Kasukurthi</a></td><td class="column-2">Delivery Head - Recruitment</td><td class="column-3">Netrovert Software,</td><td class="column-4">India</td>
</tr>
<tr class="row-534 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86ece9f5e3f6eec6f0e2e7f4f2efe8e5a8e5e9eb">Joseph Francis</a></td><td class="column-2">Head Human Resources Development</td><td class="column-3">Dimiour</td><td class="column-4">India</td>
</tr>
<tr class="row-535 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8c2c7dbc0ddc986c0cdc6dad1e8cbc4c7ddccdbcdc386cbc7c5">Joshua Henry</a></td><td class="column-2">Associate Vice President - Talent Acquisition</td><td class="column-3">CloudSEK</td><td class="column-4">India</td>
</tr>
<tr class="row-536 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#12787d617a67733c665261737b7e7d6677717a3c717d7f">Joshua T</a></td><td class="column-2">Associate Director - HR &amp; Compliance</td><td class="column-3">Sailotech</td><td class="column-4">India</td>
</tr>
<tr class="row-537 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2943465d414007595b4842485a41694b5e4d4c5a404e474e5b465c59074a4644">Jothi Prakash</a></td><td class="column-2">Head HR</td><td class="column-3">Barry-Wehmiller International</td><td class="column-4">India</td>
</tr>
<tr class="row-538 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e58f8a9ccb81909584918ca5968c80979784849189848b918c86cb868a88">Joy Dupati</a></td><td class="column-2">Head- Recruitment</td><td class="column-3">Sierra Atlantic</td><td class="column-4">India</td>
</tr>
<tr class="row-539 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4aeb1acadeab7aca5b6a9a584a8aba7afb7b0a1b4eaadab">Juhi Sharma</a></td><td class="column-2">Director - HR &amp; TA (APAC)</td><td class="column-3">Lockstep</td><td class="column-4">India</td>
</tr>
<tr class="row-540 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#751f0006011c1b351b1014075b161a18">Justin Joseph</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Near</td><td class="column-4">India</td>
</tr>
<tr class="row-541 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3b9aabca7bbb6bdb7a1b2b2a193b2b7baa7bab0bcbda0a6bfa7babdb4fdb0bcbe">Jyothendra Reddy</a></td><td class="column-2">Senior Director - Recruitment &amp; Operations</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-542 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c7adbea8b3afb4a9a6e9a3a2b1ae87aca6b4aaa8e9a4a8">Jyothsna Devi</a></td><td class="column-2">Delivery Head - Staffing</td><td class="column-3">Kasmo</td><td class="column-4">India</td>
</tr>
<tr class="row-543 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#167c6f79627f38715675797b7b736475737f6738777f">Jyoti Gouri</a></td><td class="column-2">Director - HR</td><td class="column-3">CommerceIQ</td><td class="column-4">India</td>
</tr>
<tr class="row-544 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#afc5c8dadfdbceefc0dbdcc682dadcce81ccc0c2">Jyoti Gupta</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Object Technology Solutions India</td><td class="column-4">India</td>
</tr>
<tr class="row-545 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1dbc8dec5d89fdad0dbd0ddd4f1d0dcc1d2c4c29fd2dedc">Jyoti Kajale</a></td><td class="column-2">VP Talent Acquisition</td><td class="column-3">Ampcus Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-546 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d2734223924633e2c2423240d2c3d2221243e3f243e283e632e2220">Jyoti Saini</a></td><td class="column-2">Global HR Head</td><td class="column-3">Apolis</td><td class="column-4">India</td>
</tr>
<tr class="row-547 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ae0f3e5fee3a4f9e3e4ede2caf0ebfae9eda4e9e5e7">Jyoti Singh</a></td><td class="column-2">CHRO | Global HR Head</td><td class="column-3">ZapCom Group Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-548 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87edfee8f3f4e9e6a9eae6efe6ede6e9c7f4f2e0e6f5e5e8ffe9e2f3f0e8f5ecf4a9e4e8ea">Jyotsna Mahajan</a></td><td class="column-2">Associate Director - Talent Acquisition, India</td><td class="column-3">SugarBox Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-549 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c647e4c68646d6265626a63226e6576">Kajal Gupta</a></td><td class="column-2">Hr &amp; Admin Director</td><td class="column-3">DhanInfo</td><td class="column-4">India</td>
</tr>
<tr class="row-550 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acc7cdc6cdc082d8d9d8c9c6cdeccfdfddd9cddec982c5c2">Kajal Tuteja</a></td><td class="column-2">HR Head</td><td class="column-3">C-Square Info Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-551 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfb4beb3afbeb1be9fabb7bab6b2afbaadbeabb6a9baf1b6b1">Kalpana Kanhere</a></td><td class="column-2">Director HR &amp; Admin</td><td class="column-3">Imperative Business Ventures</td><td class="column-4">India</td>
</tr>
<tr class="row-552 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#573c363b2e3639793932323b36303e253e172438253834387934383a">Kalyan Neelagiri</a></td><td class="column-2">Director of Talent Acquisition</td><td class="column-3">Soroco</td><td class="column-4">India</td>
</tr>
<tr class="row-553 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#365d575a4f57585f185b575e575c575876465744575b5742445f4e1855595b">Kalyani Mahajan</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">Paramatrix Technologies.</td><td class="column-4">India</td>
</tr>
<tr class="row-554 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#670c060b1e06090e490a12030e00080903062711081306151e1302040f4904080a">Kalyani Mudigonda</a></td><td class="column-2">Head HR &amp; Talent Management Group</td><td class="column-3">Votary Softech Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-555 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#80ebe1ecf9e1eee9aef0e5eee4e8e1f2ebe1f2c0f4e8e5e2ecf5e5e6ece1ede5ece1e2f3aee3efed">Kalyani Pendharkar</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Blue Flame Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-556 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b504852555c537b48505257575c525c4815585456">Kamaldeep Singh</a></td><td class="column-2">Director of Talent Acquisition and Promotion</td><td class="column-3">skillgigs.com</td><td class="column-4">India</td>
</tr>
<tr class="row-557 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1b707a76777a35766e77777a5b687e2935787476">Kamla Mulla</a></td><td class="column-2">Global Director, Talent Development</td><td class="column-3">SE2</td><td class="column-4">India</td>
</tr>
<tr class="row-558 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9b2b8b7bab1b8b7f7b3b8beadb8a999adb8adb8adbcbab1b7b6b5b6beb0bcaaf7bab6b4">Kanchan Jagtap</a></td><td class="column-2">Head Global HR Shared Services</td><td class="column-3">Tata Technologies, Pune</td><td class="column-4">India</td>
</tr>
<tr class="row-559 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe959f909d969f90d0889b8c939fbe8f8d8d8a9b9d9690918d91988ad09d9193">Kanchan Verma</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">QSS Technosoft</td><td class="column-4">India</td>
</tr>
<tr class="row-560 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6209030c0a030b1b0322010e0d1706160a0b0c054c010d0f">Kanhaiya Sharma</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">cloudThing</td><td class="column-4">India</td>
</tr>
<tr class="row-561 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8b3b9b6b1b3b998bdbfb4b7bfb1bbabf6bbb7b5">Kanika Gupta</a></td><td class="column-2">Human Resources Director</td><td class="column-3">EGlogics Softech</td><td class="column-4">India</td>
</tr>
<tr class="row-562 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e353f30303f3070352c372d36303f301e2a2c37303f333726703d3133">Kannan Krishnan</a></td><td class="column-2">Senior Director, Global HR</td><td class="column-3">Trinamix Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-563 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dbb0bab5b5aef5afbab5beb1ba9bbaa9beafbebab5a8afbeb8b3f5b8b4b6">Kannu Taneja</a></td><td class="column-2">Associate Director People and Culture (Global)</td><td class="column-3">Areteans</td><td class="column-4">India</td>
</tr>
<tr class="row-564 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4cfc5cad0c5cae4c8c5c6d2c5cad0c5c3c18ac7cbc9">Kanta Nandy</a></td><td class="column-2">India Head - Human Resources</td><td class="column-3">LabVantage Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-565 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe959f8e9b9b8d96d08d9f869b909fbe999b90849b9190d09d9193">Kapeesh Saxena</a></td><td class="column-2">Vice President Talent Acquisition</td><td class="column-3">Genzeon</td><td class="column-4">India</td>
</tr>
<tr class="row-566 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#771c16071e1b591c16031e051637031f121016031200160e141805075914181a">Kapil K</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Gateway Group of Companies</td><td class="column-4">India</td>
</tr>
<tr class="row-567 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d5beb4a7a1bdbcb6be95bcb1b0b4a6e7bca1fbb6bab8">Karthick Rengasamy</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Ideas2IT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-568 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9bf0fae9eff3f2f0b5f8f3f2f5effaebfaeff7fadbedf2e8effef4f5b5f8f4f6">Karthik Chintapatla</a></td><td class="column-2">Country Head HR</td><td class="column-3">Visteon Technical And Services Centre</td><td class="column-4">India</td>
</tr>
<tr class="row-569 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bed5dfcccad6d7d590d7fecdceccd7d0d9c9d1ccd5cd90d7d0">Karthik Ingarsal</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Springworks</td><td class="column-4">India</td>
</tr>
<tr class="row-570 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#452e2437312d2c2e37052a35203724312c33206b262a28">Karthik R</a></td><td class="column-2">Head of HR, India (Managed Services)</td><td class="column-3">Operative</td><td class="column-4">India</td>
</tr>
<tr class="row-571 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6cdc7d4d2cecfcdc3dfc7c8e6cecfd0c3d4ced788c5c9cb">Karthikeyan P</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Hiver</td><td class="column-4">India</td>
</tr>
<tr class="row-572 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bad1dbc8ced2d3d1dfc3dbd494c9dbd7cfdfd6fac2dbd4c9db94d9d5d7">Karthikeyan Samuel</a></td><td class="column-2">Associate Vice President - Recruitment</td><td class="column-3">Xansa plc</td><td class="column-4">India</td>
</tr>
<tr class="row-573 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b303a292f3332303e223a357528322d3a282e39293a363a35323a351b283a2d3222352f75383436">Karthikeyan Sivasubramanian</a></td><td class="column-2">India Head - Talent Acquisition</td><td class="column-3">Saviynt</td><td class="column-4">India</td>
</tr>
<tr class="row-574 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f79c9685839e9cd981b7818392949f84989b82839e9899d994989a">Kartik </a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">vTech Solution</td><td class="column-4">India</td>
</tr>
<tr class="row-575 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#375c5645435e5c1944525f50565b77585a5952474552445259431954585a">Kartik Sehgal</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">OmnePresent Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-576 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7912180b0c1718571e1c1d1d181439180b1a0a1c0b0f1c571a1614">Karuna Geddam</a></td><td class="column-2">Director HR at Arcserve</td><td class="column-3">Arcserve</td><td class="column-4">India</td>
</tr>
<tr class="row-577 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#305b51454351421e5b5851444259705c514542555e1e535f1e595e">Kausar Khatri</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Lauren Information Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-578 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c373d2a35283d723b292c283d1c3d3231723f3331">Kavita Gupta</a></td><td class="column-2">Head Of Human Resources (India)</td><td class="column-3">ANM</td><td class="column-4">India</td>
</tr>
<tr class="row-579 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#523933243b263a337c3c333c3633353d22333e123b3f22373e212b217c313d3f">Kavita N</a></td><td class="column-2">AVP - HR</td><td class="column-3">Impelsys</td><td class="column-4">India</td>
</tr>
<tr class="row-580 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddb6bcabb4a9bcf3a9bcb3b9b2b39daeb4b0adb1b4bba4b5b8bcb1a9b5bebcafb8f3beb2b0">Kavita Tandon</a></td><td class="column-2">VP, Global Head of HR</td><td class="column-3">Simplify Healthcare</td><td class="column-4">India</td>
</tr>
<tr class="row-581 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#204b41564954410e596056414c49414e4345534f4c5554494f4e530e434f4d">Kavita Y</a></td><td class="column-2">AVP-Human Resources</td><td class="column-3">Valiance Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-582 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#016a60776875602f78606560774177606d68606f6264726e6d7475686e6f722f626e6c">Kavita Yadav</a></td><td class="column-2">AVP-Human Resources</td><td class="column-3">Valiance Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-583 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a0cbc1d6c9d4c8c1e096d4c8c5cec5d2c7d98ec3cfcd">Kavitha </a></td><td class="column-2">Human Resource Head</td><td class="column-3">Sixth Energy Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-584 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#026f6963746b766a6342716d7770616776706361672c616d6f">Kavitha Martin</a></td><td class="column-2">Vice President HR</td><td class="column-3">SourceTrace</td><td class="column-4">India</td>
</tr>
<tr class="row-585 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#543f35223d203c357a21393527353a3f352614233b38203126273f38212331267a373b39">Kavitha Umasankar</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Wolters Kluwer ELM Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-586 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85eee4f3fce4abeec5e8fce2eae6eaebf6f0e9f1ecebe2abe6eae8">Kavya K</a></td><td class="column-2">Director - Global HR</td><td class="column-3">Mygo Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-587 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88e3ededfafce0e1a6e3e9e5e9fbe9e5fdecfae9c8fbfcede4e4e9f8f8fba6ebe7e5">Keerthi Kamasamudra</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Stellapps Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-588 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#442f212136302c2d6a3204362825263723282b2625286a272b29">Keerthi Vinodh</a></td><td class="column-2">Director Human Resources</td><td class="column-3">RLabs Enterprise Services</td><td class="column-4">India</td>
</tr>
<tr class="row-589 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#650e0011040b4b160d0011111c2512170c1100170c0b030a170804110c0a0b4b060a08">Ketan Shetty</a></td><td class="column-2">Head HR</td><td class="column-3">Writer Information</td><td class="column-4">India</td>
</tr>
<tr class="row-590 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#79121c0f101739011c1716571017">Kevin Marbaniang</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Xeno</td><td class="column-4">India</td>
</tr>
<tr class="row-591 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2a9b2a3b0a9a7b082abacb6a7a5b0a3b1b1eca1adaf">Kevin Parker</a></td><td class="column-2">Practice Head- IT Staffing</td><td class="column-3">Integrass</td><td class="column-4">India</td>
</tr>
<tr class="row-592 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f3989b929d979c9192dd98b38796909b878196969a87dd909c9e">Khandoba K</a></td><td class="column-2">Assistant Vice President HR</td><td class="column-3">TechTree IT Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-593 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#600b08151308020f0f2014050308131009010e4e030f0d">Khushboo Jain</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Techspian</td><td class="column-4">India</td>
</tr>
<tr class="row-594 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7dcdfc2c4dfd5d8d8f7c3d2d4dfd6dfd2d6d3d4d8c5c799d4d8da">Khushboo Rathore</a></td><td class="column-2">Associate Director of Human Capital Management</td><td class="column-3">TechAhead</td><td class="column-4">India</td>
</tr>
<tr class="row-595 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c2c1dcdac1c0e99cc0dbcc87c6dbce">Khushi Mishra</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">5ireChain</td><td class="column-4">India</td>
</tr>
<tr class="row-596 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93f8fbeaf2e7fae0f2f4f2e1d3f2e3e3fae7e0fafee3fff6bdf0fcfe">Khyati Sagar</a></td><td class="column-2">Talent Head</td><td class="column-3">Appitsimple Infotek</td><td class="column-4">India</td>
</tr>
<tr class="row-597 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcd7d5d2d6ddd0fcded5c6c8d9dfd4dfd3d2cfc9d0c8ddd2dfc592dfd3d1">Kinjal Shah</a></td><td class="column-2">Human Resource Director</td><td class="column-3">BiztechCS</td><td class="column-4">India</td>
</tr>
<tr class="row-598 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6dddfc4d7d898d4d7dad7f6d4dac3d3d5d9d8d5dec2d3d5de98d5d9db">Kiran Bala</a></td><td class="column-2">Director Human Resources</td><td class="column-3">UST BlueConch Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-599 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5aeaeb0a8a4b785a4a1a0a4eba6aaa8">Kiran Kumar</a></td><td class="column-2">Head -HR</td><td class="column-3">Adea Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-600 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddb6b4afbcb3f3b1bcb19da9b2b0b4bcbab1b2bfbcb1f3beb2b0">Kiran Lal</a></td><td class="column-2">Director &amp; Head Human Resources</td><td class="column-3">TOMIA</td><td class="column-4">India</td>
</tr>
<tr class="row-601 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0dbd9c2d1def0ddd1ded5dbc4d5d3d89ed3dfdd">Kiran Punjabi</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">ManekTech</td><td class="column-4">India</td>
</tr>
<tr class="row-602 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f14160d1e110c3f1216111b19160d1a0c10130a0b1610110c511c1012">Kiran Singh</a></td><td class="column-2">VP, Talent Development</td><td class="column-3">Mindfire Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-603 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7dcdec5d6d999c4f7cdd2c5d8d9d29ad4d8d9c4c2dbc3ded9d099d4d8da">Kiran Somanath</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Zerone Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-604 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d06041f190443000c03180e050c2d05080c0119050b021f08430e0200">Kirti Manucha</a></td><td class="column-2">SVP - HR</td><td class="column-3">HealthFore Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-605 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d56544f495413505c53485e555c7d4f5851545a5c4f58135e5250">Kirti Manucha</a></td><td class="column-2">President - HR</td><td class="column-3">Religare Technova</td><td class="column-4">India</td>
</tr>
<tr class="row-606 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#016a6872696e732f71416764746b682f626e6c">Kishor Pinninti</a></td><td class="column-2">Vice President Talent Acquisition</td><td class="column-3">Feuji Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-607 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d5652505c517d5f5c515c5754595c495c4e525148495452534e13535849">Komal Hazra</a></td><td class="column-2">Head of HR and Finance</td><td class="column-3">BDS Services</td><td class="column-4">India</td>
</tr>
<tr class="row-608 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4f2420222e232e613b0f2e2c3d203f2a3b2e23612c2022">Komala Tummala</a></td><td class="column-2">Head Talent Management</td><td class="column-3">Acropetal Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-609 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#53383c2132387d20323b32133e39263d30273a3c3d7d3a3d">Korak Saha</a></td><td class="column-2">Chief People Officer</td><td class="column-3">mjunction services</td><td class="column-4">India</td>
</tr>
<tr class="row-610 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e55514b505a5750475f105f5a574c5f544b7e4a5b4d4a575059464e5b4c4a4d105d5153">Koundinya Adiraju</a></td><td class="column-2">Vice President Talent Acquisition</td><td class="column-3">TestingXperts</td><td class="column-4">India</td>
</tr>
<tr class="row-611 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#670c081214130611270906141404080a490e09">Koustav Chatterjee</a></td><td class="column-2">Head - Digital Health Ecosystem</td><td class="column-3">NASSCOM</td><td class="column-4">India</td>
</tr>
<tr class="row-612 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aec5c5dbc3cfdceedec1c2cfdcc7ddc3cfc0cfc9cbc3cbc0da80cdc1c3">Kranthi Kumar</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Polaris</td><td class="column-4">India</td>
</tr>
<tr class="row-613 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e388918a908b828dbc88968e8291a39782828f9786808bcd808c8e">Krishan Kumar</a></td><td class="column-2">Talent Management Head</td><td class="column-3">TAAL Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-614 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c071e051f04020d330719010d1e2c0d0f18051f420f03420502">Krishna Kumar</a></td><td class="column-2">Head HR</td><td class="column-3">Actis Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-615 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#99f2f7f8f0ebd9f0e1f0f8faf6f4b7faf6f4">Krishnachand Nair</a></td><td class="column-2">Director- Human Resources</td><td class="column-3">Keysight Network Visibility Test &amp; Security</td><td class="column-4">India</td>
</tr>
<tr class="row-616 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9af1e8fbf7fbf9f2fbf4fee8fbf4daf2f3eefbf9f2f3b7e9f5f6efeef3f5f4e9b4f9f5f7">Krishnan Ramachandran</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Hitachi Solutions Asia Pacific</td><td class="column-4">India</td>
</tr>
<tr class="row-617 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#660d140f150e080708101426150710101f4b0f124805090b">Krishnan Vr</a></td><td class="column-2">Director HR</td><td class="column-3">Savvysoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-618 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ee859c879d86808f808f808ac084819d8687ae9a8b8580819c8796c08d8183">Krishnanand Joshi</a></td><td class="column-2">Head - HR &amp; Operations</td><td class="column-3">Teknorix</td><td class="column-4">India</td>
</tr>
<tr class="row-619 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#573c253e233e1734383924223a3a3623322332343f39383b38303e32247934383a">Kriti A</a></td><td class="column-2">Head HR</td><td class="column-3">Consummate Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-620 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f647d667b66646e2164676e616b7a7d664f63606866617d6e6b667a7c216c6062">Kritika Khanduri</a></td><td class="column-2">Head of Global Recruitment</td><td class="column-3">LoginRadius</td><td class="column-4">India</td>
</tr>
<tr class="row-621 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a1109121b171b540a1b0e1f163a13140e1f1912570903090e1f170954191517">Kshama Patel</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Intech Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-622 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#741f0118101111045a171c1b16110d340715001d1a171b06045a171b19">Kuldeep Chobey</a></td><td class="column-2">Director-HR &amp; Operations</td><td class="column-3">SA Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-623 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8d3cdd4dcddddc8dff8c8d7caccdddbd396dbd7d5">Kuldeep Gupta</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Porteck Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-624 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#19726c756f706b3772786c6b597a75766c7d7c68377a7674">Kulvir Kaur</a></td><td class="column-2">HOD Human Resource</td><td class="column-3">cloudEQ</td><td class="column-4">India</td>
</tr>
<tr class="row-625 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#adc6d8c0ccdfccedccc9c4d9c4cec2c3ded8c1d9c4c3ca83cec2c0">Kumar Anchan</a></td><td class="column-2">Director - Recruitment</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-626 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deb5abb3abbabff0aebfb0babf9ebba8b1b0ada7adf0bdb1b3">Kumuda Panda</a></td><td class="column-2">Director HR</td><td class="column-3">EvonSys</td><td class="column-4">India</td>
</tr>
<tr class="row-627 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f746a717e735f7a736c717a6d317c7072">Kunal </a></td><td class="column-2">Head - HR</td><td class="column-3">Elsner Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-628 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3d8c6ddd2df9dd2d0dbd2c1cad2f3dadec3d6dfc0cac09dd0dcde">Kunal Acharyaa</a></td><td class="column-2">Global Head Talent Acquisition &amp; TA COE</td><td class="column-3">Impelsys</td><td class="column-4">India</td>
</tr>
<tr class="row-629 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f19a849f909ddf8690959986909f98b1819e929a9485979cdf929e9c">Kunal Wadhwani</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Pocket FM</td><td class="column-4">India</td>
</tr>
<tr class="row-630 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b405e58434a4c594a055b4a454f4e6b415e454c474e4e4c4a464e5805484446">Kushagra </a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Junglee Games</td><td class="column-4">India</td>
</tr>
<tr class="row-631 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f99598928a919490d79c80808c979790b997988b8f988bd79a9694">Lakshmi Eyyunni</a></td><td class="column-2">Director of People Operations</td><td class="column-3">Narvar</td><td class="column-4">India</td>
</tr>
<tr class="row-632 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#016d606a72696c6871736878602f73606569606a736872696f606f41637665647268666f66736e74712f626e6c">Lakshmi Radhakrishnan</a></td><td class="column-2">Director - HR</td><td class="column-3">Barry-Wehmiller International</td><td class="column-4">India</td>
</tr>
<tr class="row-633 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b474a40584346426b5f594248444542454d445f4e484305484446">Lakshmi Vishwanatth</a></td><td class="column-2">Director - People Operations</td><td class="column-3">Tricon Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-634 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91fdf0fae2f9fcf8bfe1d1e0f8e2bff2febff8ff">Lakshmipriya Babu</a></td><td class="column-2">Head-Human Resources &amp; Placements</td><td class="column-3">Quest Innovative Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-635 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b373a2f3a75381b353e2f383435353e382f3c3734393a3775383436">Lata Chemudupati</a></td><td class="column-2">AVP- HR</td><td class="column-3">NetConnectGlobal</td><td class="column-4">India</td>
</tr>
<tr class="row-636 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#402c2134216e2b2f282c2900232f27252e34292e262f6e232f2d">Lata Kohli</a></td><td class="column-2">Director - US HR Operations</td><td class="column-3">COGENT Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-637 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88e4fce1fae7fde6e9fee7fdebe9fae9fbfbe7fdc8f1e7ece4ededa6ebe7e5">Latchoumanan Tirounavoucarassou</a></td><td class="column-2">Director Operations - Performance</td><td class="column-3">Envestnet</td><td class="column-4">India</td>
</tr>
<tr class="row-638 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dbb7a8b3bab5b0baa99bb7b2adbeb5afaea8f5b8b4b6">Latha Shankar</a></td><td class="column-2">Director - HR</td><td class="column-3">Liventus,</td><td class="column-4">India</td>
</tr>
<tr class="row-639 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#066a67706f72672868466368627374676865632865696b">Lavita Nathani</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Newfold Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-640 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91fdf0e9fcf0ffbfe3f4f5f5e8d1fdfee3f9f0fff8e5bff2fefc">Laxman Reddy</a></td><td class="column-2">Vice President - Finance, HR &amp; IT Support Systems</td><td class="column-3">Lorhan IT</td><td class="column-4">India</td>
</tr>
<tr class="row-641 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1ddd4d4ddd09fdcd0d5d9c4c3d8f1d2d0c2d9d0c1dedfd09fd2dedc">Leela Madhuri</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Cashapona Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-642 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d7bbb2b2b9b697b0b2a3b4b2a5a3b6f9b4b8ba">Leena Arora</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Certa</td><td class="column-4">India</td>
</tr>
<tr class="row-643 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5f333a3a313e71273e29363a2d1f2c3033362b30312b3a3c37713c3032">Leena Xavier</a></td><td class="column-2">Head of Leadership, Talent</td><td class="column-3">Soliton Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-644 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#325e44534047555a5741577241474b53465b1c515d5f">Linju Varughese</a></td><td class="column-2">Associate Director - Talent Attraction</td><td class="column-3">Suyati Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-645 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a16130a13111b541715121b140e033a190817141f020e54191517">Lipika Mohanty</a></td><td class="column-2">Global HR Director</td><td class="column-3">CRMNEXT</td><td class="column-4">India</td>
</tr>
<tr class="row-646 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb8782988a88998a8c8eab82859884879e9f828485988c8784898a87c5888486">Lisa Crage</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">In-Solutions Global</td><td class="column-4">India</td>
</tr>
<tr class="row-647 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#711d18051e1f0231181f1f1e075f181f">Liton Saha</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Innovsource</td><td class="column-4">India</td>
</tr>
<tr class="row-648 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#99f5f0edecf3f8b7f4f0eaf1ebf8d9f8e9f4f6eae0eab7f0f7">Lituja Mishra</a></td><td class="column-2">Sr. VP - HR</td><td class="column-3">ApMoSys Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-649 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6e020718070040180f1c09060b1d0b2e1a0b1f08010d1b1d400d0103">Livin Varghese</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Teqfocus</td><td class="column-4">India</td>
</tr>
<tr class="row-650 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c10131b190f143c1f1009111513521f1311">Logesh Chandramoorthy</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Clumio</td><td class="column-4">India</td>
</tr>
<tr class="row-651 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d414246485e456d4348554a48434442595e034e4240">Lokesh Gurgela</a></td><td class="column-2">Sr. Manager/Head - Talent Acquisition</td><td class="column-3">Nexgen IOT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-652 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88e4fde1fbe9a6e5e7e0e9e6fcf1c8fae9fcedefe9e1e6a6ebe7e5">Luisa Mohanty</a></td><td class="column-2">Associate Vice President - Human Resources</td><td class="column-3">RateGain</td><td class="column-4">India</td>
</tr>
<tr class="row-653 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e38f9a878a82cd87908c969982a393918c848a8f8a979acd808c8ecd8296">Lydia Dsouza</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Progility Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-654 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d7bbaeb3beb6f9b3a4b8a2adb697a7a5b8b0bebbbea3aea3b2b4bff9b4b8ba">Lydia D'Souza</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Progility Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-655 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#375b4e595358591944565b5356595f56775a5659435f56591954585a">Lyndon Saldanha</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Manthan</td><td class="column-4">India</td>
</tr>
<tr class="row-656 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e333f3f3031341e3c3b2a2a3b2c2e323f3d3b703d31703730">Maanoj Mishra</a></td><td class="column-2">Group Head HR</td><td class="column-3">BetterPlace</td><td class="column-4">India</td>
</tr>
<tr class="row-657 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#107d71737c75717e3e6271607871757c50677560797e7479713e737f7d">Maclean Raphael</a></td><td class="column-2">VP - HR</td><td class="column-3">WeP Peripherals</td><td class="column-4">India</td>
</tr>
<tr class="row-658 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#553834313d343b7b3e203834271534313c213c363a3b262039213c3b327b363a38">Madhan Kumar</a></td><td class="column-2">Director of Talent Management &amp; Operations</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-659 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cfa2aeaba7aeb9aee1a2aea3a3aaa3ae8fa2a6acbda0aab7acaaa3e1aca0a2">Madhav Mallela</a></td><td class="column-2">Director-HR</td><td class="column-3">Microexcel Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-660 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b565a5f535a4d5e5e154852555c537b59574e58545c55524f52545515585456">Madhavee Singh</a></td><td class="column-2">Human Resource Manager- Head</td><td class="column-3">bluCognition</td><td class="column-4">India</td>
</tr>
<tr class="row-661 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cea3afaaa6afb8a7a98ea1beabbcafbaa7b8abe0ada1a3">Madhavi G</a></td><td class="column-2">Senior Head of HR, India (R&amp;D)</td><td class="column-3">Operative</td><td class="column-4">India</td>
</tr>
<tr class="row-662 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b363a3f332e75303a2b2e1b3a373722322875383436">Madhu Kapu</a></td><td class="column-2">Head HR &amp; Operations</td><td class="column-3">Allyis</td><td class="column-4">India</td>
</tr>
<tr class="row-663 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88e5e9ece0fda6e6c8f9fde9e4e1f2ede9e4a6ebe7e5">Madhu Nakkala</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">QualiZeal</td><td class="column-4">India</td>
</tr>
<tr class="row-664 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1dcd0d5d9c4c3d09fddd0dfdbd4dad0c3f1d2ddd0c3d8dedfc5d4d2d9dfdeddded6d8d4c29fd2de9fd8df">Madhura Lanjekar</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Clarion Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-665 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4d9d9dcd5d9d5dadfd5c6f4cddbc0c0d59ad7dbd9">Madhuri Mhamankar</a></td><td class="column-2">General Manager &amp; Head Human Resources</td><td class="column-3">Yotta Infrastructure Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-666 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f49995909c81869db4938184879c8184da9d9b">Madhuri Nandgaonkar</a></td><td class="column-2">Senior Director HR</td><td class="column-3">Gupshup</td><td class="column-4">India</td>
</tr>
<tr class="row-667 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9bf6ebfaf7faf1f2dbe9faf5fff4f6efe9fefee8b5f8f4f6">Madhuri Palaji</a></td><td class="column-2">Head - Talent Acquisition Group</td><td class="column-3">RandomTrees</td><td class="column-4">India</td>
</tr>
<tr class="row-668 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4924282d213c3b20673b2823283d21092e26262d2c3b28672a2624">Madhuri Rajath</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Goodera</td><td class="column-4">India</td>
</tr>
<tr class="row-669 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e58884818d908ea589808b919784cb848c">Madhushree Kumra</a></td><td class="column-2">Head - People Operations</td><td class="column-3">Lentra</td><td class="column-4">India</td>
</tr>
<tr class="row-670 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ef828e8b879a9c9a8b878e818e81af86828e9d9e9a8ac18c80c18681">Madhusudhanan </a></td><td class="column-2">Head of HR</td><td class="column-3">iMarque Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-671 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#254844414d534c0b44574a5744655c4a414940400b464a48">Madhvi Arora</a></td><td class="column-2">Vice President &amp; Head HR</td><td class="column-3">Envestnet</td><td class="column-4">India</td>
</tr>
<tr class="row-672 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#016c6069606d606a72696c6841746f686d6e66626e73712f626e6c">Mahalakshmi </a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Unilog</td><td class="column-4">India</td>
</tr>
<tr class="row-673 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4429252c2537332130256a342531280425303d25302d6a272b29">Mahasweta Paul</a></td><td class="column-2">VP - Chief People Officer</td><td class="column-3">atyati Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-674 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec818d848982889e8dc29f85828b84ac89948f89809e8dc28f8381">Mahendra Singh</a></td><td class="column-2">Vice President - HR</td><td class="column-3">Excelra</td><td class="column-4">India</td>
</tr>
<tr class="row-675 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#117c7079747f75637051676862686265747c623f727e7c">Mahendra Thiyagarajan</a></td><td class="column-2">Head - Global HR &amp; Operations</td><td class="column-3">VySystems</td><td class="column-4">India</td>
</tr>
<tr class="row-676 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa979b929f949e889b94d489ba91958c9b939594d4999597">Mahendran Subramaniam</a></td><td class="column-2">Head HR &amp; RPO Delivery</td><td class="column-3">Kovaion Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-677 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7dad6dfd2c4df99d5d6d9d3d6c5c2f7d9d2d2c0d2d299d6de">Mahesh Bandaru</a></td><td class="column-2">Director - HR India</td><td class="column-3">Neewee</td><td class="column-4">India</td>
</tr>
<tr class="row-678 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#096468616c7a61276149736c65607d6c7a66657c7d6066677a276a6664">Mahesh Hyam</a></td><td class="column-2">Head - HR</td><td class="column-3">Zelite Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-679 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d7bab6beb9bcb6f9a497b0b2b2bcbba2a5b9f9b4b8ba">Mainka Sharma</a></td><td class="column-2">Head of Talent Acquisition &amp;HR</td><td class="column-3">GeekLurn</td><td class="column-4">India</td>
</tr>
<tr class="row-680 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1b767a777a6f73726b5b7974686f7475366f7e7873757477747c6235787476">Malathi Premkumar</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Boston Technology Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-681 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcd1ddd0d5d2d592cad9d2c9dbd3ccddd0fcccd9d3ccd0d98d8c92dfd3d1">Malini Venugopal</a></td><td class="column-2">Director Human Resources</td><td class="column-3">People10 Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-682 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#563b373a3a3f3d37782639393c37243f1630333722252f2522333b257835393b">Mallika Poojari</a></td><td class="column-2">Recruitment Head</td><td class="column-3">Feat Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-683 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d707c707c69757c33735d707279787b7473337e7270">Mamatha Nagesh</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Modefin</td><td class="column-4">India</td>
</tr>
<tr class="row-684 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#107d717d647150737f777e6563647573787e7f7c7f77693e737f7d">Mamta </a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Cognus Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-685 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e333f332a3f70303f2a361e3b732e2d2e32703d3133">Mamta Nath</a></td><td class="column-2">Head - HR</td><td class="column-3">PC Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-686 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93fef2fee7f2bdeaf2f7f2e5d3f2fef2fde7eaf2e7f6f0fbbdf0fcfe">Mamta Yadav</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Amantya Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-687 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#75181418011d1435061c12181a1c11141b14190c011c16065b161a18">Mamtha </a></td><td class="column-2">Director Talent Acquisition - Leadership Hiring</td><td class="column-3">Sigmoid</td><td class="column-4">India</td>
</tr>
<tr class="row-688 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4e232f233a262f602f253b222f0e202b3a3c2f2a37202b602d2123">Mamtha Akula</a></td><td class="column-2">Talent Head at Netradyne</td><td class="column-3">Netradyne</td><td class="column-4">India</td>
</tr>
<tr class="row-689 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7cac4cfc6ccd5c6c5c8d5d3dee7d7cfc3c6d3c689cec8">Manashi Chakraborty</a></td><td class="column-2">Director Of People Operations, India</td><td class="column-3">phData</td><td class="column-4">India</td>
</tr>
<tr class="row-690 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#432e222d22302a6d28262f2822310320312c332a2d6d202c2e">Manasi Kelkar</a></td><td class="column-2">VP - Human Resources</td><td class="column-3">CropIn Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-691 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#432e222d22356d29222a2d032f2c202c2d22356d202c2e">Manav Jain</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">LocoNav</td><td class="column-4">India</td>
</tr>
<tr class="row-692 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2548444b41440b4e4c564d4a57406540534a4950515c5f0b464a48">Manda Kishore</a></td><td class="column-2">Head - Recruitments</td><td class="column-3">Evolutyz Corp</td><td class="column-4">India</td>
</tr>
<tr class="row-693 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#771a16191312120759041e19101f3703021b1e07591418">Mandeep Singh</a></td><td class="column-2">Head of HR</td><td class="column-3">Tulip Interfaces</td><td class="column-4">India</td>
</tr>
<tr class="row-694 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#204d414e444545500e564952444960455352490e494e">Mandeep Virdi</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Esri India</td><td class="column-4">India</td>
</tr>
<tr class="row-695 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7419151a1d1a341f15060d150011171c5a171b19">Mani Narayanan</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">KARYA Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-696 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#503d313e39313e1033313c3c352a35357e333f3d">Manian Chennai</a></td><td class="column-2">head talent resourcing</td><td class="column-3">Info Network Management Company</td><td class="column-4">India</td>
</tr>
<tr class="row-697 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6508040b0c0e08040d040f040b2514040c0b030a1100060d4b060a08">Manik Mahajan</a></td><td class="column-2">Director, Performance Engineering</td><td class="column-3">QA InfoTech</td><td class="column-4">India</td>
</tr>
<tr class="row-698 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8de0ece3e4e6a3e0e2e3e9ece1cdfcefece9fbe4fee2fff4a3eee2e0">Manik Mondal</a></td><td class="column-2">Director Talent Acquisition (India)</td><td class="column-3">QBA Worldwide</td><td class="column-4">India</td>
</tr>
<tr class="row-699 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f39e929d9a98929d97929ddd91b39a8796909bde9a9d979a92dd909c9e">Manikandan Balasubramanian</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">iTech India</td><td class="column-4">India</td>
</tr>
<tr class="row-700 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d2bfa6a0bba2b3a6babb92a2bab6b3a6b3fcbbbd">Manish </a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">phData</td><td class="column-4">India</td>
</tr>
<tr class="row-701 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6cbd5cfd2c7c8cfc7e6c3c1c7cfc888c5c9cb">Manish Sitania</a></td><td class="column-2">Worldwide Head of HR</td><td class="column-3">eGain Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-702 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e333f30372d363f1e3a2c3b3f332d31382a6a2b703d3133">Manisha </a></td><td class="column-2">VP - HR Department</td><td class="column-3">DreamSoft4u</td><td class="column-4">India</td>
</tr>
<tr class="row-703 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f69b97989f859e97d89297859eb695939a9f9199d895999b">Manisha Dash</a></td><td class="column-2">Director India, Human Resources</td><td class="column-3">Celigo</td><td class="column-4">India</td>
</tr>
<tr class="row-704 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f020b0617061b2f010a1b1d061703030c410c0002">Manisha Dixit</a></td><td class="column-2">HR Director - Asia Pacific</td><td class="column-3">Netrix</td><td class="column-4">India</td>
</tr>
<tr class="row-705 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f499959a9e919180da8395989d95b49c9586969d9a93918693869b8184da979b99">Manjeet Walia</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Harbinger Group</td><td class="column-4">India</td>
</tr>
<tr class="row-706 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4d9d5dadeddc6dd9ac7dcdddad0d1f4d7d8dbc1d0d9dbcddb9ad7dbd9">Manjiri Patel-Shinde</a></td><td class="column-2">Vice President Global HR</td><td class="column-3">CloudMoyo</td><td class="column-4">India</td>
</tr>
<tr class="row-707 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84e9e5eaeef1aaeee5e7ebe6c4f7e5f6f2e5f0f6e5aaedea">Manju Jacob</a></td><td class="column-2">AVP -Human Resources</td><td class="column-3">Sarvatra Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-708 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ee3efe0e4fbcee0e7ede6e7a0ede1e3">Manjunath P</a></td><td class="column-2">Head - Finance, HR &amp; Administration</td><td class="column-3">Nichi-In Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-709 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7b161a1514113b1a160b17551a0b0b">Manoj K</a></td><td class="column-2">Head People &amp; Culture</td><td class="column-3">Ampl</td><td class="column-4">India</td>
</tr>
<tr class="row-710 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a373b3435301a2e3f39322c3f28293b342e33343c352e3f393274393537">Manoj Madhavan</a></td><td class="column-2">Vice President - HR</td><td class="column-3">Techversant</td><td class="column-4">India</td>
</tr>
<tr class="row-711 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9af7fbf4f5f0b4eafbe8f3f1fbeef3f6dafdf5f5feffe8fbb4f9f5f7">Manoj Parikatil</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Goodera</td><td class="column-4">India</td>
</tr>
<tr class="row-712 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#44293c340425292d303d372b2230332536216a272b29">Manoj Prasad</a></td><td class="column-2">Head of IT / HR &amp; Admin</td><td class="column-3">Amity Software Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-713 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a6b797e6b55656468656b786e63646d4a6b797e6b69787924696567">Manoj Sahoo</a></td><td class="column-2">Recruiter and Head of Onboarding</td><td class="column-3">Asta Crs Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-714 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e18c808f8e8bcf92848986808da1939794cf888f">Manoj Sehgal</a></td><td class="column-2">Head of People Services/ HR  ( India)</td><td class="column-3">RVU India</td><td class="column-4">India</td>
</tr>
<tr class="row-715 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5538343b2030397b3330273b343b31302615343b213d30393c3a3d303439213d7b363a38">Manuel Fernandes</a></td><td class="column-2">HR Head - India</td><td class="column-3">Anthelio Healthcare Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-716 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93f9fcf1e0d3e0f8eafcfdfdbdf0fcfe">Manu's Jobs</a></td><td class="column-2">IT RECRUITING HEAD</td><td class="column-3">SkyOnn Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-717 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3aea2b1aaa2eda5a6b1ada2ada7a6b083a7b1a2b6b3eda0acae">Maria Fernandes</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Draup</td><td class="column-4">India</td>
</tr>
<tr class="row-718 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8de0ecfff4a3efecfef8cdebe4fbe8fee9e4eae4f9ece1a3eee2e0">Mary Basu</a></td><td class="column-2">HR Head</td><td class="column-3">FiveS Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-719 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfb2beada69facb0b9aba8beadbaf1bcb0b2">Mary Naidu</a></td><td class="column-2">Head HR</td><td class="column-3">Software</td><td class="column-4">India</td>
</tr>
<tr class="row-720 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f626e7766627a7c21654f666169607f637a7c637b6b216c60217a64">Maximus J</a></td><td class="column-2">Head of HR</td><td class="column-3">Infoplus Technologies UK</td><td class="column-4">India</td>
</tr>
<tr class="row-721 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1bcb0a8b0ffbbbeb9bf91a7b4a3a2b4ffb8bf">Maya John</a></td><td class="column-2">Chief People Officer</td><td class="column-3">VerSe Innovation</td><td class="column-4">India</td>
</tr>
<tr class="row-722 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7e131f071f50101f190e1f123e081b0c11120a501d1113">Maya Nagpal</a></td><td class="column-2">Director Human Capital Management</td><td class="column-3">Verolt</td><td class="column-4">India</td>
</tr>
<tr class="row-723 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b666a726a6560256a6c6a797c6a674b6c6a6a656a25686466">Mayank Agarwal</a></td><td class="column-2"> Head - HRBP</td><td class="column-3">Gaana</td><td class="column-4">India</td>
</tr>
<tr class="row-724 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2dfd3cbd3dcd99cd3dac7d8d3f2dcdbd1d9d7ded4ddca9cd1dddf">Mayank Ahuja</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Nickelfox Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-725 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90fdf1e9f1fefbd0e4e2f9e0ffe4ffbef3fffd">Mayank Sharma</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Tripoto</td><td class="column-4">India</td>
</tr>
<tr class="row-726 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d2bfbfbba6a0b392b3b6b3b7a3a7b3a0b7fcb1bdbf">Mayukh Mitra</a></td><td class="column-2">Director &amp; Head of HR</td><td class="column-3">Adaequare</td><td class="column-4">India</td>
</tr>
<tr class="row-727 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2449455d51560a54454645564d64574945565057414a5741574b4851504d4b4a570a474b49">Mayur Pabari</a></td><td class="column-2">CEO &amp; CHRO</td><td class="column-3">smartSense Consulting Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-728 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#412c203834336f3228322e2528382001222e2d2d20232433206f222e2c">Mayur Sisodiya</a></td><td class="column-2">Associate Delivery Director - Talent Acquisition</td><td class="column-3">Collabera India</td><td class="column-4">India</td>
</tr>
<tr class="row-729 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d404849454c035e454c5f404c6d46445a4459484e45034e4240">Medha Sharma</a></td><td class="column-2">Director - Human Resources (Global HR)</td><td class="column-3">KiwiTech</td><td class="column-4">India</td>
</tr>
<tr class="row-730 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#620f07060a0b090322170c0b120a0d10074c010d0f">Medhika Sood</a></td><td class="column-2">Associate Director : TM | L&amp;D</td><td class="column-3">Uniphore</td><td class="column-4">India</td>
</tr>
<tr class="row-731 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a474f4f444b6a4b4358474f4f5e04494547">Meena R</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Airmeet</td><td class="column-4">India</td>
</tr>
<tr class="row-732 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c6aba3a3a8a7adb5aeafe8a4a7a8a3b4aca3a386a5b4aba8a3beb2e8afa8">Meenakshi Banerjee</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">CRMNEXT</td><td class="column-4">India</td>
</tr>
<tr class="row-733 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#29444c4c4748425a414007434148695d48454c475d404a48074a4644">Meenakshi Jha</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Talentica Software</td><td class="column-4">India</td>
</tr>
<tr class="row-734 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b666e6e656a607863622560646c616e4b656e7c7d627862646578646d7f7c6a796e256265">Meenakshi Kogje</a></td><td class="column-2">Global Director - Talent Acquisition</td><td class="column-3">NewVision Software</td><td class="column-4">India</td>
</tr>
<tr class="row-735 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#761b13111e361f181e13041f020e5815191b">Megh Makwana</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">InheritX Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-736 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#355850525d1b475c46545951544775465846185854525c561b565a58">Megh Risaldar</a></td><td class="column-2">Director and Head of Human Resources</td><td class="column-3">SMS-Magic</td><td class="column-4">India</td>
</tr>
<tr class="row-737 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#147971737c54737b7066717e3a777b79">Meghana Sarwate</a></td><td class="column-2">Head - Human Resource Information Systems</td><td class="column-3">Godrej Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-738 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bad7dfddd2dbd4dbfad3dec8d3ccdf94d9d5d7">Meghana V</a></td><td class="column-2">Head HR, Operations &amp; Finance</td><td class="column-3">IDrive Software India</td><td class="column-4">India</td>
</tr>
<tr class="row-739 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#81ece4e6e9efe0ecc1f2ece0f3f5e4eab3b0afe2eeec">Meghna Mahajan</a></td><td class="column-2">Human Resources Director</td><td class="column-3">SmarTek21</td><td class="column-4">India</td>
</tr>
<tr class="row-740 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4e232b262f250e3d3a2f3c3a3b3e202f3a272120602d2123">Mehak Fath</a></td><td class="column-2">Head HR</td><td class="column-3">StartUP</td><td class="column-4">India</td>
</tr>
<tr class="row-741 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#781f190d0a190e381508100a00561b1715">Meher Gaurav</a></td><td class="column-2">Vice President Global HR</td><td class="column-3">mphrX</td><td class="column-4">India</td>
</tr>
<tr class="row-742 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#503d393338353c3c357e3a3f2335203810372520233825207e393f">Michelle Joseph</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Gupshup</td><td class="column-4">India</td>
</tr>
<tr class="row-743 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#385551545116485956515b535d4a784f5d5a5d565f595f5d165b5755">Mili Panicker</a></td><td class="column-2">AVP - HR &amp; People Operations</td><td class="column-3">WebEngage</td><td class="column-4">India</td>
</tr>
<tr class="row-744 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f39e9a9d929fdd859a9f96989281b3879b969a9e83968192879a8596dd9a9d">Minal Vilekar</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Imperative Business Ventures</td><td class="column-4">India</td>
</tr>
<tr class="row-745 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c4c0c7c8c5e9d9dbc6ddcccac1c4c8c7c0d3cc87cac6c4">Minal Wadlawala</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">ProTechmanize Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-746 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d00041f040c00431e050c07182d0c1b0c0317080a1f02181d430e0200">Miriam Shaju</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">Avanze</td><td class="column-4">India</td>
</tr>
<tr class="row-747 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f994908b8c979895909790b98f969598978d9c8d9c9a91d79a9694">Mirunalini Mothilal</a></td><td class="column-2">Director - India &amp; Global HR</td><td class="column-3">Volante Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-748 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#15787c617d607b3b7f7a667055667463747b617c663b767a78">Mithun Jose</a></td><td class="column-2">Head- Staffing</td><td class="column-3">Savantis Solutions LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-749 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4d99ac4d5c0d1d8f4d1d5c7c0d1c6dad1dac0d1c6c4c6ddc7d19ad7dbd9">Mittal Patel</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Eastern Enterprise</td><td class="column-4">India</td>
</tr>
<tr class="row-750 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ea87829f99998b8384aa9e9883878b928b878f9883898b99c4898587">Mohamed Hussain</a></td><td class="column-2">HEAD TALENT ACQUISITION - INDIA</td><td class="column-3">Data Glove</td><td class="column-4">India</td>
</tr>
<tr class="row-751 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#771a041e13131e0602123706021204041003045914181a">Mohammad Siddique</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Quess GTS</td><td class="column-4">India</td>
</tr>
<tr class="row-752 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#472a282f262a2a22230732292e372f2835226924282a">Mohammed Hussain</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Uniphore</td><td class="column-4">India</td>
</tr>
<tr class="row-753 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c7aaa8afa6aaaaa2a3e9b5aebdb0a6a987b5a2b1a2b5aea2aea9a4e9a4a8aa">Mohammed Rizwan</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Reverie Language Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-754 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#592a3834302c35353831773436313834343c3d1938372d313c353036313c38352d31773a3634">Mohammed Samiullah</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Anthelio Healthcare Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-755 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#324653405b431c4b534157575c7242535c4857404657515a5c5d5e5d555b57411c5c5746">Mohammed Yaseen</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Panzer Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-756 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfd2d0d7ded191d5d0ccd7d6ffd2c6d8d3ded2d291dcd0d2">Mohan Joshi</a></td><td class="column-2">Head- C&amp;B, HR Automation &amp; HR Operations</td><td class="column-3">MyGlamm</td><td class="column-4">India</td>
</tr>
<tr class="row-757 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a0cdc2c1ced3c1cce0c4c5d1cfc4c58ec3cfcd">Mohini Bansal</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Deqode</td><td class="column-4">India</td>
</tr>
<tr class="row-758 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1acaeafa8a2a0efa3a0aba0ab81b2aea7b5eca2aeb3afa4b3efa2aeac">Monica Bajaj</a></td><td class="column-2">Head-HR</td><td class="column-3">Benchmark IT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-759 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#761b19181f151736061f18111705191a03021f1918055815191b">Monica Kamal</a></td><td class="column-2">Director &amp; HR Head</td><td class="column-3">Pinga Solution</td><td class="column-4">India</td>
</tr>
<tr class="row-760 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bad7d5d4d3d1dbfacac8dfd9d3c9d3d5d4cedfd9d2d9d5c8ca94d9d5d7">Monika Jasrotia</a></td><td class="column-2">HR- Manager/Admin Head</td><td class="column-3">Precision Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-761 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d60626364666c4d68606f64796861236e6260">Monika Koul</a></td><td class="column-2">Head l Sr. Director- HR</td><td class="column-3">Embitel Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-762 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c51535255575d1251555b505d52557c46555b4e5d511248595f54">Monika Miglani</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">ZIGRAM</td><td class="column-4">India</td>
</tr>
<tr class="row-763 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b66646562606a4b6979626f6c6e676a697125686466">Monika Save</a></td><td class="column-2">Head of Talent Acquisition and HR Operations</td><td class="column-3">BridgeLabz</td><td class="column-4">India</td>
</tr>
<tr class="row-764 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#39545657505258794d5c5a514b5c4d585055175057">Monika Soutiyal</a></td><td class="column-2">Head - HR &amp; Admin</td><td class="column-3">Tech Connect Services</td><td class="column-4">India</td>
</tr>
<tr class="row-765 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bbd6dccecbcfdafbd3ded7d6888d8b95d8d4d6">Monila Gupta</a></td><td class="column-2">Regional HR Head - India</td><td class="column-3">HELM360</td><td class="column-4">India</td>
</tr>
<tr class="row-766 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#14797b61797d546764756660757a647b7f71663a777b79">Moumi Chatterjee</a></td><td class="column-2">Assistant Vice President Human Resources</td><td class="column-3">QUADRIFIC MEDIA</td><td class="column-4">India</td>
</tr>
<tr class="row-767 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a57484f5e524f565b145d7a5c5f4f505314595557">Mrudhula Guda</a></td><td class="column-2">HR Head - India</td><td class="column-3">Feuji Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-768 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a67787f6e7f6624614a6c79796d6665686b66246364">Mrudul Godavarthi</a></td><td class="column-2">Chief Talent Officer</td><td class="column-3">Federal Soft Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-769 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90fde2e5f7f1bef4f1e6f5d0e6f1f7f1e2ffbef3fffd">Mruga Dave</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Vagaro Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-770 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a67787f6d6f796224676b63797f7863736b4a7a7865697f786f7e636d6f7824696567">Mrugesh Maisuriya</a></td><td class="column-2">Head Of HR- Talent Acquisition and Management</td><td class="column-3">eProcurement Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-771 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec819e998b899f84c29e8d9a8d80ac828d9f8f89829885828a83c28f8381">Mrugesh Raval</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Nascent Info Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-772 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4c9d1c3c0ccc58ad3c5c3cce4c1c8c8cdc7cdd1c98ac7cbc9">Mugdha Wagh</a></td><td class="column-2">Head Of Talent Management</td><td class="column-3">Ellicium Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-773 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a0b1a9b1b2bcb590b1a7b9b7befeb3bfbd">Muhammed Rafi</a></td><td class="column-2">HR Head</td><td class="column-3">Awign</td><td class="column-4">India</td>
</tr>
<tr class="row-774 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a372f303f3f381a2a3b34203f282e3f3932343536353d333f2974343f2e">Mujeeb Khan</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Panzer Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-775 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#066b736d63756e2872466a7475756374706f656375286f68">Mukesh Tiwary</a></td><td class="column-2">Head of HR</td><td class="column-3">LRS Services (P)</td><td class="column-4">India</td>
</tr>
<tr class="row-776 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2548504e51440b414457654447564a495051414451440b464a48">Mukta Dar</a></td><td class="column-2">Head HR</td><td class="column-3">Absolutdata Analytics</td><td class="column-4">India</td>
</tr>
<tr class="row-777 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e08d958b9481ce848597818ea08381858c899593838f8e93958c94898e87ce838f8d">Mukta Dewan</a></td><td class="column-2">Chief People Officer at Caelius Consulting</td><td class="column-3">Caelius Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-778 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bed3cbccdfd2d790d5fedbc6dddbd2dfddd1d390d7d0">Murali Krishnamoorthy</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Excelacom Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-779 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f39e8681929f9ab3809c95879f9c949a90808a80dd9a9d">Murali Nagarajan</a></td><td class="column-2">HR and Operations Head</td><td class="column-3">Softlogic Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-780 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#57273a2225223032243639173438253239232332343f7934383a">Murugessan Panchatcharam</a></td><td class="column-2">Director - Human Resources &amp; Facilities</td><td class="column-3">Corent Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-781 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e534b4a564b554b535f4c10557e4a5b5d565051595b5057505d105d5153">Muthukumar K</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">TechnoGen,</td><td class="column-4">India</td>
</tr>
<tr class="row-782 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ea879f9e82938b868bc4878b848b998baa8b88999390c4898587">Muthyala Manasa</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">ABSYZ Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-783 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#640a4a170d00000c0516100c24111606050a140d1401164a070b09">Naga Siddharth</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">UrbanPiper</td><td class="column-4">India</td>
</tr>
<tr class="row-784 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d434c4a4c404c43440354485f434843446d5e424b595e4241034e4240">Nagamani Yerneni</a></td><td class="column-2">Head - HR &amp; Operations</td><td class="column-3">SoftSol</td><td class="column-4">India</td>
</tr>
<tr class="row-785 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c7c8cec8c7c8cec6dccdc887dac3e9cec5c6cbc8c5cccdceccdac6cfdd87cac6c4">Naganagouda J</a></td><td class="column-2">Associate Vice President &amp; Head - Human Resources</td><td class="column-3">GlobalEdge</td><td class="column-4">India</td>
</tr>
<tr class="row-786 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3759565e5953525247195c5642457755475c4352545f5a565e5b1954585a">Naindeep Kaur</a></td><td class="column-2">Recruitment/Talent Acquisition Head</td><td class="column-3">BPK Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-787 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1afa0ada8afa881a0acb3a4b2a4a0b3a2a9efa8af">Nalini Panwar</a></td><td class="column-2">Director of Human Resources &amp; Research</td><td class="column-3">AM Research</td><td class="column-4">India</td>
</tr>
<tr class="row-788 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c727d7175687d326f7572747d5c6f697270757a79327f7371">Namita Sinha</a></td><td class="column-2">Head of Talent Acquisition (Asia Services Centre India)</td><td class="column-3">Sun Life</td><td class="column-4">India</td>
</tr>
<tr class="row-789 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1bfb0bca3b0a5b0ffba91b8bfa2a1b8a3b4b5b6b4b8a5ffb2bebc">Namrata Kamrushi</a></td><td class="column-2">Head - People &amp; Culture</td><td class="column-3">Inspiredge IT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-790 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#523c333c312b7c333c3620372521123b36373321603b267c313d3f">Nancy Andrews</a></td><td class="column-2">Head - Workforce Management</td><td class="column-3">Ideas2IT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-791 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#503e313e33297e263122373835233510393e363c3f27243533383e3f3c3f373935237e333f3d">Nancy Varghese</a></td><td class="column-2">Head- HR &amp; Admin</td><td class="column-3">Inflow Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-792 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d535c53595c56544e55524f58134d5c59505c535c5f555c537d5e4f5053584549135e5250">Nandakishore Padmanabhan</a></td><td class="column-2">Vice President - People &amp; Culture</td><td class="column-3">CRMNEXT</td><td class="column-4">India</td>
</tr>
<tr class="row-793 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c323d3238353235723d3b3b3d2e2b3d301c3932343d323f392f252f723f3331">Nandini Aggarwal</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Enhancesys Innovations</td><td class="column-4">India</td>
</tr>
<tr class="row-794 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90fef1fef4f9fef9bee4f1fef4fffed0f9fef4e5e3f6f1f3f5bef3fffd">Nandini Tandon</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Indusface</td><td class="column-4">India</td>
</tr>
<tr class="row-795 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b555a555f524f5a154852555c537b485e574b155255">Nandita Singh</a></td><td class="column-2">Manager - HR (Plant HR Head)</td><td class="column-3">SELP</td><td class="column-4">India</td>
</tr>
<tr class="row-796 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ff1fdf7feebf1fef8feeddffab2faf2eff7feece6ecb1fcf0f2">Nandni Bhatnagar</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">e-Emphasys Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-797 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89e7e8fbe8fae0e4e1e8e7c9e6f9faecfbe8a7e0e6">Narasimhan </a></td><td class="column-2">Director - HR</td><td class="column-3">Opsera</td><td class="column-4">India</td>
</tr>
<tr class="row-798 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aac4cbd8cbd3cbc4cbead9c7cbd8decfcecdcfd9c5c6dfdec3c5c4d984c9c584dfc1">Narayana Bvs</a></td><td class="column-2">Head - HR &amp; Operations</td><td class="column-3">Smartedge Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-799 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#107e71627169717e713e607167716250606279667176693e737f7d">Narayana Pawar</a></td><td class="column-2">Director, Human Resources &amp; Biz. Ops.</td><td class="column-3">Privafy</td><td class="column-4">India</td>
</tr>
<tr class="row-800 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f414e5d4a414b4a5d6f435c4e5d4a4c5d5a465b014c40015a44">Narender Thatipalli</a></td><td class="column-2">Head of Talent Acquisition (UK, Europe &amp; India)</td><td class="column-3">LSA Recruit</td><td class="column-4">India</td>
</tr>
<tr class="row-801 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4628273423282234276835062823322328342f252e6825292b">Narendra S</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Netenrich,</td><td class="column-4">India</td>
</tr>
<tr class="row-802 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd939c8f988e95bd939e8e888ed3939889">Naresh Kumar</a></td><td class="column-2">Recruiting Director</td><td class="column-3">National Computer Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-803 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bad4dbc8dfc9d294d4cfced2cfd6dbcadbced3fadbced7dfd9c994d9d5d7">Naresh Nuthulapati</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">ATMECS Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-804 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bbd5dacfdac9dad1dad5fbced5d2caceded3d2c9de95d2d5">Natarajan Perumal</a></td><td class="column-2">VP - Staffing</td><td class="column-3">UniqueHire Consulting LLP</td><td class="column-4">India</td>
</tr>
<tr class="row-805 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9b7b8afbcbcb799a9abb0b4acaabeb5b6bbb8b5f7bab6b4">Naveen Kumar</a></td><td class="column-2">Associate Director Talent Acquisition</td><td class="column-3">PRIMUS Global Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-806 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ef0ffe8fbfbf0defdecffe7f1f0faffeaffb0fdf1f3">Naveen Pillai</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Crayon Data</td><td class="column-4">India</td>
</tr>
<tr class="row-807 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1876796e7d7d76366b70797673796a587d6b6c6d796c7d367b7775">Naveen Shankar</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Estuate,</td><td class="column-4">India</td>
</tr>
<tr class="row-808 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f49a958291919ada87b4969b81869a809197da979b99">Naveen Sounderrajan</a></td><td class="column-2">Head of Talent Acquisition - India , EMEA &amp; US</td><td class="column-3">Bourntec Solutions Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-809 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f09e918695959eb094899e80829fde939f9d">Naveen Wadhawan</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">DynPro,</td><td class="column-4">India</td>
</tr>
<tr class="row-810 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#315f50475d54545f1f535950455850714552421f525e5c">Navleen Bhatia</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Tata Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-811 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#543a35223a313120143d3a22313a2031373c3d3a323b7a373b39">Navneet Murthy</a></td><td class="column-2">Global Head - Recruitment</td><td class="column-3">Inventech Info Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-812 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f111e081e1e0551171e191a1a053f1609131813101d1e13511c1012">Nawaaz Hafeez</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">InfoVision Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-813 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#234d425a42484a634d564e46514a405746404b0d404c4e">Nayaki Naidu</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Numeric Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-814 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#80eee1f9e1eee1edc0e1e4e9f4e9e3efeef3f5ecf4e9eee7aee3efed">Nayana Martin</a></td><td class="column-2">Associate Director L&amp;D</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-815 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6b8b7afb7aca3b2b2bfb8f8bbb3b3a496a5babdb1a4b9a3a6f8b5b9bb">Nayazuddin Meer</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">VFI SLK</td><td class="column-4">India</td>
</tr>
<tr class="row-816 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#563833333a7824373916253324393a337835393b">Neelakanteshwar Rao</a></td><td class="column-2">Head HR</td><td class="column-3">Serole Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-817 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#69070c0c050804471a01081b040829191b061f081b1d0c1a1d00070e470a0604">Neelam Sharma</a></td><td class="column-2">Head of People and Culture, India</td><td class="column-3">Provar Testing</td><td class="column-4">India</td>
</tr>
<tr class="row-818 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f616a6a6366626e21796e646e4f62666169767b6a6c67216c6062">Neelima Vaka</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Minfy</td><td class="column-4">India</td>
</tr>
<tr class="row-819 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1bfb0b6bdb491a7b0bdb4a5b9b8ffb2bebc">Neena Nagle</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Valethi Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-820 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f59b90909b94b5939c9b819c9b96db969a98">Neena Rajdev</a></td><td class="column-2">Director of HR, L&amp;D &amp; Administration.</td><td class="column-3">Fint Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-821 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ef0fbfbecfff4edf6ffecf3ffdefdffe8f7edeaffeafbfdf6b0fdf1f3">Neeraj Sharma</a></td><td class="column-2">Director People Operations, India</td><td class="column-3">Cavista</td><td class="column-4">India</td>
</tr>
<tr class="row-822 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#056b606077646f45636a70776e6c7160762b666a68">Neeraj Sharma</a></td><td class="column-2">Senior Director of Human Resources</td><td class="column-3">FourKites,</td><td class="column-4">India</td>
</tr>
<tr class="row-823 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cea0ababbabbe0ada6a1bbaaa6afbcb78ea7aabda0abb6bae0ada1a3">Neetu Choudhary</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">IDS NEXT Business Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-824 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4aaa1aca5eaa6aca5aaa0a5b6ad84b2a9aba7afeaa7aba9">Neha Bhandari</a></td><td class="column-2">Director of Human Resources</td><td class="column-3">VMock</td><td class="column-4">India</td>
</tr>
<tr class="row-825 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4b25292322382e0b3f392a282e2722252065282426">Neha Bhise</a></td><td class="column-2">Head Of Human Resources - India &amp; APAC</td><td class="column-3">TraceLink</td><td class="column-4">India</td>
</tr>
<tr class="row-826 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7e101b161f3e0a161710151c0c171a191b501d1113">Neha Bhushan</a></td><td class="column-2">Director - Talent &amp; Branding</td><td class="column-3">thinkbridge</td><td class="column-4">India</td>
</tr>
<tr class="row-827 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f09e959891de93b0978295899f82919e9795de939f9d">Neha Chaudhary</a></td><td class="column-2">Associate Director-HRBP</td><td class="column-3">GreyOrange</td><td class="column-4">India</td>
</tr>
<tr class="row-828 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#315f54595071505842455452595f5e5d5053421f525e5c">Neha Chaughule</a></td><td class="column-2">Head- Talent Acquisition</td><td class="column-3">AIS Technolabs</td><td class="column-4">India</td>
</tr>
<tr class="row-829 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e505d56514b5a565f4c477e4a4c5f5d4a57515051505a5b535f505a105d5153">Neha Choudhary</a></td><td class="column-2">Director - People (HR)</td><td class="column-3">Trineo</td><td class="column-4">India</td>
</tr>
<tr class="row-830 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3bdb6bbb2fdb8bcbbbfba93b1b6bda2fdb0bcbe">Neha Kohli</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">BenQ India</td><td class="column-4">India</td>
</tr>
<tr class="row-831 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96f8f3fef7d6ffa4fda4b8f5f9fb">Neha Mishra</a></td><td class="column-2">Head - Human Resource</td><td class="column-3">i2k2 Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-832 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#305e555851704442555c5c1e595e">Neha Sahi</a></td><td class="column-2">Director - HR</td><td class="column-3">Trell</td><td class="column-4">India</td>
</tr>
<tr class="row-833 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e58b808d84968d84978884a583978080968e8a9091cb868a88">Neha Sharma</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">freeskout</td><td class="column-4">India</td>
</tr>
<tr class="row-834 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#543a313c357a273c35263935143d3a323b3035262039353d387a373b39">Neha Sharma</a></td><td class="column-2">Head HR &amp; TAG</td><td class="column-3">Infodart Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-835 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deb0bbb6bff0adb6bfacb3bf9ebdbfa8b7adadb1b0f0bdb1b3">Neha Sharna</a></td><td class="column-2">HR Head</td><td class="column-3">Cavisson Systems,</td><td class="column-4">India</td>
</tr>
<tr class="row-836 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a747f727b5a776f766e736b756934797577">Neha Thakker</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">MultiQoS Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-837 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c5259545d7c5845525d50535b555258555d125f5351">Neha Velankar</a></td><td class="column-2">Head Of Human Resources &amp; Administration</td><td class="column-3">Dynalog India</td><td class="column-4">India</td>
</tr>
<tr class="row-838 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5cbc0d3ccc9c9c08bd5cad6d1d2c4c9c9c4e5cdc4d7c7cccbc2c0d7c2d7cad0d58bc6cac8">Neville Postwalla</a></td><td class="column-2">Associate Vice President - Talent Management</td><td class="column-3">Harbinger Group</td><td class="column-4">India</td>
</tr>
<tr class="row-839 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f8969d8e819fb896978a8f91968c9d9b90969794979f919d8bd69b9795">Nevy George</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Norwin Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-840 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f61666d6a6b667b6e216b7a7b7b6e4f616e7b7a7d6a6863606d6e63216c6062">Nibedita Dutta</a></td><td class="column-2">Vice President - HR &amp; Operations</td><td class="column-3">Nature Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-841 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85ebece1edecabf3ecf6edebeaecc5b7ecf6eae9f0f1eceaebf6abe6eae8">Nidhi </a></td><td class="column-2">Head-HR</td><td class="column-3">2iSolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-842 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6e00070a06072e0b031e071c0716400d0103">Nidhi </a></td><td class="column-2">Director of Human Resources Americas</td><td class="column-3">Hammer</td><td class="column-4">India</td>
</tr>
<tr class="row-843 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#244a4d404c4d644d4a4051574a41500a474b0a4d4a">Nidhi Khulbe</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Indus Net Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-844 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aec0c7cac6c7eecdd7dddacbc3ddc2c1c9c7cd80cdc1c3">Nidhi Ruparel</a></td><td class="column-2">Recruitment &amp; Operations Head</td><td class="column-3">Cystems Logic Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-845 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acc2c5c8c4c582dfc5c2cbc4ecc5cddccfc3dedc82cfc3c1">Nidhi Singh</a></td><td class="column-2">Head HR</td><td class="column-3">IAP Company</td><td class="column-4">India</td>
</tr>
<tr class="row-846 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6806010c0001461b1a011e091b1c091e09281c1a09060f01040d460b0705">Nidhi Srivastava</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Trangile Services</td><td class="column-4">India</td>
</tr>
<tr class="row-847 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1dfd8d5d9c4c3d0dbf1d4c7d4c3d4c2c59fd4dfd6d8dfd4d4c3d8dfd6">Nidhuraj Prasannarajan</a></td><td class="column-2">Recruitment Head/Operations</td><td class="column-3">EverestEngineering</td><td class="column-4">India</td>
</tr>
<tr class="row-848 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bad4d3dddfd6fac8dfd9c8cfd3ced4c2ce94d9d5d7">Nigel Crisanto</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">RecruitNXT</td><td class="column-4">India</td>
</tr>
<tr class="row-849 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#99f7f0f1f8ebf0f2f8b7e9f8edfcf5d9f3fcedeae0f7edf1fceae0eab7faf6f4">Niharika Patel</a></td><td class="column-2">CHRO</td><td class="column-3">JetSynthesys</td><td class="column-4">India</td>
</tr>
<tr class="row-850 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb959290939297d599939a8fbb97928b92d59295">Nikhil Bhat</a></td><td class="column-2">Assitant Vice President Human Resources</td><td class="column-3">Lipi Data Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-851 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#137d7a787b7a7f3d79727d747a61536072657a727d70763d707c7e">Nikhil Jangir</a></td><td class="column-2">Director - Global Staffing &amp; Recruitment</td><td class="column-3">Saviance Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-852 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3dddad8dbdadf9dd8d2d7c6f3c5d6c1dadddac7d69dd0dcde">Nikhil Kadu</a></td><td class="column-2">Head HR  &amp; Operations</td><td class="column-3">Verinite</td><td class="column-4">India</td>
</tr>
<tr class="row-853 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec828587848580c2879980878d9e8285ac828f859e8f808998898f84c28f8381">Nikhil Kulkarni</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">nCircle Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-854 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe909795969792d093be8e8b8c8e92929bd09d9193">Nikhil Mooley</a></td><td class="column-2">Head Of Human Resources, L&amp;D</td><td class="column-3">Purplle.com</td><td class="column-4">India</td>
</tr>
<tr class="row-855 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a747371736e7b5a7d75767f7b7e73747d736e34797577">Nikita Trivedi</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Leading IT</td><td class="column-4">India</td>
</tr>
<tr class="row-856 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ee0e7e2efe0e9e7e0e7a0e9fbfefaefcefeefe0efe3eff6e7e2a0ede1e3">Nilangini Gupta</a></td><td class="column-2">VP People Management and Talent Growth</td><td class="column-3">Panamax</td><td class="column-4">India</td>
</tr>
<tr class="row-857 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1dfd8ddd4c2d99fd8dfd5c4dddad0c3f1c5c3d0dfc5dec3d8dfd29fd2dedc">Nilesh Indulkar</a></td><td class="column-2">Director &amp; Head of Recruitment</td><td class="column-3">Trantor</td><td class="column-4">India</td>
</tr>
<tr class="row-858 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7c9cecac2d4cfe7cfc6d7d3cecc89c6ce">Nimesh Mathur</a></td><td class="column-2">Director - People, Culture &amp; Talent</td><td class="column-3">Haptik</td><td class="column-4">India</td>
</tr>
<tr class="row-859 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2c424541495f446c46494d5a4543024f4341">Nimesh Shah</a></td><td class="column-2">VP, HR &amp; Operations</td><td class="column-3">Jeavio</td><td class="column-4">India</td>
</tr>
<tr class="row-860 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6d8dfdbdbcf98d5f6c084c5d9dac3c2dfd9d8c598d5d9db">Nimmy Chowalloor</a></td><td class="column-2">Recruitment Head</td><td class="column-3">V2Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-861 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4e20273e3d376024262f232c0e2f223a3b2a21602d21">Nipsy Jhamb</a></td><td class="column-2">Director - HR</td><td class="column-3">Altudo</td><td class="column-4">India</td>
</tr>
<tr class="row-862 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0ded9c2ddd1dcdef0c3d3dfc2d7d3dfdec3c5dcc49ed3dfdd">Nirmal Nimodiya</a></td><td class="column-2">Head of Staffing &amp; Alliances</td><td class="column-3">SCORG International Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-863 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#99f7f0ebf4f8f5f8d9edfcfaf1f7f6fbf0f7fdb7faf6f4">Nirmala Nayak</a></td><td class="column-2">Head of HR</td><td class="column-3">TechnoBind Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-864 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d23243f2024392463253f0d283b2823392f28283d632e2220">Nirmiti Choudhari</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">EventBeep</td><td class="column-4">India</td>
</tr>
<tr class="row-865 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d63647f787d6c23614d7e606c6c7f7979236e6260">Nirupa Leeladhar</a></td><td class="column-2">SVP - HR &amp; Talents</td><td class="column-3">Smaartt Digital Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-866 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddaeafb4b9b5bcaff3b39dacaab4b6beb4b1abb8aff3beb2b0">Nirupama Sridhar</a></td><td class="column-2">Head HR</td><td class="column-3">Qwikcilver Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-867 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dcb2b5aea6bdaeb5f2afb9b29cbeb9b2b5afb3b2a8b9bfb4f2bfb3b1">Nirzari Sen</a></td><td class="column-2">Head of HR</td><td class="column-3">Benison Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-868 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5836312b30397635372c2f39363118282a392c312c312c3d3b30763b3735">Nisha Motwani</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Pratiti Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-869 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dab4b3a9b2bbf4b4bbb3a89aa9bbbdbba8a9b5bcaef4b3b4">Nisha Nair</a></td><td class="column-2">Head - Human Resources &amp; TAG</td><td class="column-3">Sagarsoft</td><td class="column-4">India</td>
</tr>
<tr class="row-870 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ef0f7edf6ffb0f0deeafbfdf6f0f1e8fbeceab0fdf1f3">Nisha Nayar</a></td><td class="column-2">Head of HR</td><td class="column-3">Technovert</td><td class="column-4">India</td>
</tr>
<tr class="row-871 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#640a0d170c05160b1d2405050605170b02104a070b09">Nisha Roy</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">Aabasoft</td><td class="column-4">India</td>
</tr>
<tr class="row-872 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#721c1b011a135c01131b1c1b321307001b15131b065c111d1f">Nisha Saini</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Auriga IT Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-873 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5d33342e353c732e1d2e383c33382f3a2439343a34293c31733e3230">Nisha Singh</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Seanergy Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-874 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb959288939a958fbb88969a898f909a899c94d5989496">Nishant Gawand</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">SmartKargo</td><td class="column-4">India</td>
</tr>
<tr class="row-875 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e987809a8188879dc79a819c828588a981868687889b9d8c82c78a8684">Nishant Shukla</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Hoonartek</td><td class="column-4">India</td>
</tr>
<tr class="row-876 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6e00071d06071a0f2e08071d1d070100020f0c1d400d0103">Nishita Algubelli</a></td><td class="column-2">HR &amp; TA Director</td><td class="column-3">Fission Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-877 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#caa4a3b9a2a3bea2e4baabb8a3a1a28aa1b8a3b9a2beafa9a2a4a5a6aba8b9e4a9a5a7">Nishith Parikh</a></td><td class="column-2">Global Head HR</td><td class="column-3">Krish TechnoLabs</td><td class="column-4">India</td>
</tr>
<tr class="row-878 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#026c6b716a766a632c71637067676c42666b6d6c656e6d60636e2c616d6f">Nishtha Sareen</a></td><td class="column-2">VP - Human Resources</td><td class="column-3">Dion Global Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-879 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2dcdbc1dac79cdcdbc6c1f2dddcd5c0d3c2da9cd1dddf">Nishu Mittal</a></td><td class="column-2">Human Resources Director</td><td class="column-3">OnGraph Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-880 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85ebe4f7fce4f6eae8e4fce4eff0e9e4c5f7f7eaeaf1f6ede0e9e9abe6eae8">Nita Aryasomayajula</a></td><td class="column-2">Global Human Resources Director</td><td class="column-3">Rrootshell Technologiiss</td><td class="column-4">India</td>
</tr>
<tr class="row-881 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6a04031e0b19020b440e1f19032a0b1e030e031c44090507">Nitasha Dusi</a></td><td class="column-2">Director - HR</td><td class="column-3">Atidiv</td><td class="column-4">India</td>
</tr>
<tr class="row-882 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5cbccd1c0d6cd8bcec4d7ccd7e5c8caced6c4d1c0c6cdcbcac9cac2ccc0d68bc6cac8">Nitesh Karir</a></td><td class="column-2">Head HR</td><td class="column-3">mokSa Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-883 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddb3b4a9b5a4bcb3bcb3b9b5bcb09dbbbcbeb4b1b4b2f3beb2b0">Nithyanandham Ravi</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Facilio</td><td class="column-4">India</td>
</tr>
<tr class="row-884 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93fdfae7faf8f2bdf1fbf2fdf7f2e1fad3fef2e5f6fde4f2e5f6bdf0fcfe">Nitika Bhandari</a></td><td class="column-2">Head HR</td><td class="column-3">Maven Wave</td><td class="column-4">India</td>
</tr>
<tr class="row-885 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1e70776a777030795e77706a7b72727b7d6a7c7764697f6c7b307d7173">Nitin Gawli</a></td><td class="column-2">Head HR</td><td class="column-3">Intellect Bizware Services</td><td class="column-4">India</td>
</tr>
<tr class="row-886 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9b7b0adb0b7f7b499adb6adb8b5b0adbeb5b6bbb8b5f7bab6b4">Nitin Marwah</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Total IT Global</td><td class="column-4">India</td>
</tr>
<tr class="row-887 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1dfd8c5d8df9fdfd0d9d0c5d0f1d6d0dcd4c2dac3d0d7c59fd2dedc">Nitin Nahata</a></td><td class="column-2">CHRO</td><td class="column-3">Gameskraft</td><td class="column-4">India</td>
</tr>
<tr class="row-888 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6c8cfd2cfc888d6c7c2cec7d4cfc7e6cfc8c2cfc7c8cfc588c5c9cb">Nitin Padharia</a></td><td class="column-2">Head - HR / ILDC and L&amp;D</td><td class="column-3">IndiaNIC Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-889 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f39d9a879a9db39a879f9a8996dd909c9e">Nitin Pandey</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Itlize Global</td><td class="column-4">India</td>
</tr>
<tr class="row-890 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#533d3a273a3d7d203b32213e3213323f2726373c7d303c">Nitin Sharma</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Altudo</td><td class="column-4">India</td>
</tr>
<tr class="row-891 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f01061b0601411c1a1d062f180a0d00020e150a410c0002">Nitin Suri</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Webomaze Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-892 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2846415c4146065e4d5a45496850414b4745064a4152">Nitin Verma</a></td><td class="column-2">Head HR</td><td class="column-3">Xicom Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-893 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c7c0ddc0dac187c2e9dad9c1c0c7d1dec6dbc5cdcbc0d387cac6c4">Nitish Kumar</a></td><td class="column-2">Head- Talent Acquisition</td><td class="column-3">Sphinx Worldbiz</td><td class="column-4">India</td>
</tr>
<tr class="row-894 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ea84839e8399828bc4888b8b868b93aa838484859c8b9a9a9e839c8fc4898587">Nitisha Baalay</a></td><td class="column-2">Director Global Talent Acquisition</td><td class="column-3">Innovapptive Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-895 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f71745f7a657a6c70796b317c7072">Nitya K</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">Eze Software</td><td class="column-4">India</td>
</tr>
<tr class="row-896 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4f2126392a2b263b2e61242e3a3c272e230f262b2238203d243c612c2022">Nivedita Kaushal</a></td><td class="column-2">Head of Human Resource</td><td class="column-3">IDMWORKS</td><td class="column-4">India</td>
</tr>
<tr class="row-897 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cda3a4bbbfb8b9a5ace3be8dacbdbdbba4a8bab5e3aea2a0">Nivrutha Sampath</a></td><td class="column-2">VP of HR</td><td class="column-3">AppViewX</td><td class="column-4">India</td>
</tr>
<tr class="row-898 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bed0d7c7dfcad7fecadbd5cdcbd090cbcd">Niyati Parmar</a></td><td class="column-2">Head of HR</td><td class="column-3">Teksun Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-899 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e58b90959097a58c9d8c828acb868a88">Nupur Jain</a></td><td class="column-2">VP of Human Resources</td><td class="column-3">ixigo</td><td class="column-4">India</td>
</tr>
<tr class="row-900 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4e203e262f3a2f250e3e213a21232f2d3a3e22602d2123">Nupur Phatak</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Potomac Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-901 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2c42595f5e4d58025f595c4948455b4d404d6c5c4d424d414d544540024f4341">Nusrat Supediwala</a></td><td class="column-2">AVP Talent Acquisition</td><td class="column-3">Panamax Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-902 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e474048416e411c4847404841004d4143">O2f Info</a></td><td class="column-2">Head of HR</td><td class="column-3">O2F INFO SOLUTIONS</td><td class="column-4">India</td>
</tr>
<tr class="row-903 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#187771767c6a717479367c796b586a6c7d6b7d6a6e717b7d6b367b7775">Oindrila Das</a></td><td class="column-2">Group Head-HR</td><td class="column-3">RT Outsourcing Services</td><td class="column-4">India</td>
</tr>
<tr class="row-904 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fc9391998f94919d979495969dbc9d8c8c95888f95918c9099d29f9391">Omesh Makhija</a></td><td class="column-2">Head of People Operations</td><td class="column-3">Appitsimple Infotek</td><td class="column-4">India</td>
</tr>
<tr class="row-905 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8a7a5a3a9bab888aba7baadaea4adb0bba7a4bdbca1a7a6bbe6aba7a5">Omkar Patwardhan</a></td><td class="column-2">HR Head</td><td class="column-3">CoreFlex Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-906 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c6c7d78717d767d6f75727b74327d6e657d5c7f737b79727f756f327f7371">Padmaja Arya</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Cogencis Information Services</td><td class="column-4">India</td>
</tr>
<tr class="row-907 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#572736333a363936213c173924333b793438793e39">Padmanav Kundu</a></td><td class="column-2">Head of Rewards &amp; HR Operations</td><td class="column-3">Protean eGov Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-908 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2c2d3d6dfd3c1dac0d7d79cd3dec4d3f2dfc0d7c1c7dec69cd1dddf">Padmashree Alva</a></td><td class="column-2">Director - Talent &amp; Initiatives</td><td class="column-3">MResult</td><td class="column-4">India</td>
</tr>
<tr class="row-909 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c6c71756f746e7d5c7e747d6a727d7f736e6c327f7371">Pallavi Mishra</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Bhavna Corp.</td><td class="column-4">India</td>
</tr>
<tr class="row-910 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#354554595954435c1b465d5447585475515c525c58545b4147541b565a58">Pallavi Sharma</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">DigiMantra Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-911 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e797868b8b86918ec9948e89808fa797869e849586819394888bc984888a">Pallavi Singh</a></td><td class="column-2">Associate Vice President - Human Resources</td><td class="column-3">Paycraft Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-912 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2b2a3aeaea3b4ab82b6a7a1aaafa3b6b0abbaa1adacb1b7aeb6abaca5eca1adaf">Pallavi Singh</a></td><td class="column-2">Assistant Vice President Human Resources</td><td class="column-3">TechMatrix Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-913 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0171606f6269606d6865417b646f6e75682f626e6c">Panchali Das</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Zenoti</td><td class="column-4">India</td>
</tr>
<tr class="row-914 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bfbeae5efeef2cbedf8e7ffeee8e3e5e4e7e4ece2eef8a5e8e4e6">Pandey </a></td><td class="column-2">VP HR</td><td class="column-3">FSL Software Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-915 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6d6c7c8cdc7cc88c5cec9d6d4c7e6c5c9d4c3c5c7d4c288c5c9cb">Pankaj Chopra</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">CoreCard India</td><td class="column-4">India</td>
</tr>
<tr class="row-916 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#abdbd8c2c5ccc3ebceddced9dadec4dfce85c8c4c6">Pankaj Singh</a></td><td class="column-2">Associate Director - People Operations</td><td class="column-3">EverQuote</td><td class="column-4">India</td>
</tr>
<tr class="row-917 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#27574655464a4649464943460944674e53424b4b4e404249444240554852570944484a">Paramananda Chabungbam</a></td><td class="column-2">Director - HRBP &amp; Engagement</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-918 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d5d4c5f4c40485e5a4c5f035d6d5f484e54464c41034e4240">Parameswar Reddy</a></td><td class="column-2">Vice President Talent Management</td><td class="column-3">Team Recykal</td><td class="column-4">India</td>
</tr>
<tr class="row-919 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ccbcadbea8a9a9bcbc8ca8ada1afa3abbea3b9bce2afa3a1">Pardeep Pahal</a></td><td class="column-2">VP Global HR</td><td class="column-3">Damco Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-920 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89f9e8fbe0e7e0fde8a7e2e8fcfbc9e0e7fdece5e5e6e5e8ebfaa7eae6e4">Parinita Kaur</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Intello Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-921 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#afdfcbdadbdbceefcbc6cecddcc0c3dadb81ccc0c2">Parma Dutta</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Diabsolut Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-922 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#433322312d2626376d342231222a202b032e3a3126222f272237226d2a2d">Parneet Waraich</a></td><td class="column-2">Vice President Human Resources (Head HR)</td><td class="column-3">Real Time Data Services</td><td class="column-4">India</td>
</tr>
<tr class="row-923 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#92e2f3e0fdfffbe6f3bcf3e0f7fcf5d2e8f3f5f5fef7bcfbfc">Paromita Areng</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Zaggle Prepaid Ocean Services</td><td class="column-4">India</td>
</tr>
<tr class="row-924 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#641405160b0b084a00110303050824060d0e0a0d174a070b09">Parool Duggal</a></td><td class="column-2">Director | Talent Acquisition</td><td class="column-3">bijnis</td><td class="column-4">India</td>
</tr>
<tr class="row-925 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a2d2d2c3d0c3d4c3d1d6cad7e2d4cbd6c7c1cacbccc18cc1cdcf">Parthasarathy Paravasthu</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">Vitech Systems Asia</td><td class="column-4">India</td>
</tr>
<tr class="row-926 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a6b7a4a2bebfb4b7b8f8a5b7b8a2beb7b8b7bda4bfa5beb8b7b896a0b9bab7b8a2b3a2b3b5bef8b5b9bb">Parthiban Santhanakrishnan</a></td><td class="column-2">Associate Director- Performance Testing</td><td class="column-3">Volante Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-927 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#56263724233a7831373a3716253b372422333f38357835393b">Parul Gala</a></td><td class="column-2">VP of Products and HR</td><td class="column-3">SMARTe</td><td class="column-4">India</td>
</tr>
<tr class="row-928 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c9b9a8bbbfa8bda1b0e7bda1acbbaca4aba0a589baa6bcbbaaacaba0bdbae7aaa6a4">Parvathy Therembil</a></td><td class="column-2">Vice President and Head HR</td><td class="column-3">Sourcebits Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-929 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9c8c4c3c8cd87d9c8dac1c8e9cfc0c6dbc8c7c687cac6c4">Pasha Amjad</a></td><td class="column-2">Head - HR &amp; Operations.</td><td class="column-3">Fiorano Software</td><td class="column-4">India</td>
</tr>
<tr class="row-930 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f2e3f6e7eeace9e3f4ebf6e3c2e8e7e9f1edecf4ebf1ebedecace1edef">Patel Kavita</a></td><td class="column-2">Head HR</td><td class="column-3">Jekson Vision</td><td class="column-4">India</td>
</tr>
<tr class="row-931 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8b8a9bca0a9a6a2a9a4a1e6aaa0a9bc88baada4adbea9a6abada4a9aae6aba7a5">Pathanjali Bhat</a></td><td class="column-2">Director - HR</td><td class="column-3">Relevance Lab</td><td class="column-4">India</td>
</tr>
<tr class="row-932 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93e3f2e7e1faf0faf2bdfdf2e7f2fffaf2d3fff6f2e1fde2e6f6e0e7bdf0fcfe">Patricia Natalia</a></td><td class="column-2">Head of HR, India</td><td class="column-3">LearnQuest</td><td class="column-4">India</td>
</tr>
<tr class="row-933 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f28293879edc9893919d90b28280939f93869bdc919d9f">Paul </a></td><td class="column-2">Director- Human Resources</td><td class="column-3">Pramati Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-934 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e39382968fcd87828d8a868fa397828d8f82cd808c8e">Paul Daniel</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Tanla Platforms</td><td class="column-4">India</td>
</tr>
<tr class="row-935 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9d9c8dcc5e9dac8c5ccdac2ccc787c8c0">Paul Thomas</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Salesken</td><td class="column-4">India</td>
</tr>
<tr class="row-936 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#42322334232c6c2002242e37272c3625302b266c212d2f">Pavan Bodapati</a></td><td class="column-2">Assistant Vice President Human Resources</td><td class="column-3">Fluentgrid</td><td class="column-4">India</td>
</tr>
<tr class="row-937 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#57273c17323e303f2331383b3379363e">Pavan K</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Eightfold</td><td class="column-4">India</td>
</tr>
<tr class="row-938 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98e8f9eef9f6f3edf5f9eab6f3d8eff1f6eff1eafdb6fbf7f5">Pavan Kadumuri</a></td><td class="column-2">Associate Director-HR</td><td class="column-3">WinWire Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-939 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#77071c021a1605371607070403121c141805075914181a">Pavan Kumar</a></td><td class="column-2">Eastern Regional Human Resources Director</td><td class="column-3">AppsTek</td><td class="column-4">India</td>
</tr>
<tr class="row-940 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aadacbdccbc4c1eacfd2c3c7c3dfd9cecfd9c3cdc484c9c5c7">Pavan Kumar</a></td><td class="column-2">Associate Director- Talent Acquisition</td><td class="column-3">Eximius Design</td><td class="column-4">India</td>
</tr>
<tr class="row-941 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb9b8a9d8a85c599ab8a869b878e87848c8288c5888486">Pavan Reddy</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">AmpleLogic</td><td class="column-4">India</td>
</tr>
<tr class="row-942 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9bebfaedfaf5eddbe8f2fffce8b5f8f4f6">Pavan Vangala</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">SID Global Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-943 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8c8d9ced9d696ceddd5cdcad1f8d58bdad196dbd7d5">Pavan Vemuri</a></td><td class="column-2">Head - HR</td><td class="column-3">M3BI</td><td class="column-4">India</td>
</tr>
<tr class="row-944 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e4948592858aca928b8b968d868d8a808da489878f8d8a88819d968d8781ca878b">Pavan Vooribindi</a></td><td class="column-2">HR Generalist/ Community Head</td><td class="column-3">McKinley Rice</td><td class="column-4">India</td>
</tr>
<tr class="row-945 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a5a4b5c435e42584b0448455a4b44444b6a4f445e58455a43415e4f494204494547">Pavithra Bopanna</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Entropik Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-946 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#770716011e031f051659131204161e371e19110516141b180213591e18">Pavithradesai Pd</a></td><td class="column-2">Chief People Officer</td><td class="column-3">InfraCloud Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-947 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9dedfce4fcf1ddf5f4faf5edf8fcf6eeeab3fef2f0">Payal Bhowmick</a></td><td class="column-2">Head - Human Resource &amp; Operations</td><td class="column-3">High Peak Software</td><td class="column-4">India</td>
</tr>
<tr class="row-948 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec9c8d958d80ac9f8d8a89c29f898f999e859895">Payal Parmar</a></td><td class="column-2">Senior Director, Global Talent Acquisition</td><td class="column-3">Safe Security</td><td class="column-4">India</td>
</tr>
<tr class="row-949 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c3c2d35352d20233e29623f2d25222d38240c202d3e3a2320622f2321">Payyalore Sainath</a></td><td class="column-2">Global Head of Talent Acquisition</td><td class="column-3">LARVOL</td><td class="column-4">India</td>
</tr>
<tr class="row-950 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#710115021e040b103112100305140218101f121e1f02041d05181f165f121e1c">Pearl Dsouza</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Cartesian Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-951 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f68693938f83859ed8859f98919e979ab69b9998858293849f98929f97d895999b">Peeyush Singhal</a></td><td class="column-2">Product Head - Talent Search Platform</td><td class="column-3">Monster India</td><td class="column-4">India</td>
</tr>
<tr class="row-952 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f5f4a5b4a5d5c4041015f4a5d4a465d4e6f4c4648414a57014c4042">Peterson Pereira</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">CIGNEX Datamatics</td><td class="column-4">India</td>
</tr>
<tr class="row-953 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d5a5bdb4bbbc95b0b8bcbbb1a6fbb4bc">Phani Kalyan</a></td><td class="column-2">Director of Talent Engineering</td><td class="column-3">Enterprise Minds</td><td class="column-4">India</td>
</tr>
<tr class="row-954 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e5958d848b8ccb8e90888497a5968a978a868acb868a88">Phani Kumar</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Soroco</td><td class="column-4">India</td>
</tr>
<tr class="row-955 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c7b7afa6a9aea3afa6b5b487a3a2bfb3a6b5a6e9a4a8aa">Phanidhar Sangam</a></td><td class="column-2">Director HR</td><td class="column-3">Dextara Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-956 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#304058595c59401e5d515e595b495170405f43595455481e535f5d">Philip Manikya</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Posidex</td><td class="column-4">India</td>
</tr>
<tr class="row-957 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96e6fff7faffb8f1f9e5e1f7fbffd6f9e6e2fffbe3e5fff8f0f9b8f5f9fb">Piali Goswami</a></td><td class="column-2">HR Head</td><td class="column-3">Optimus Information</td><td class="column-4">India</td>
</tr>
<tr class="row-958 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#80f0e9f9e1ece9e2c0e4e9e7e9f4e1ece1f0f4e5e3e8aee3efed">Piyali Basu</a></td><td class="column-2">Head - Human Resource</td><td class="column-3">Digital Aptech</td><td class="column-4">India</td>
</tr>
<tr class="row-959 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6d6cfdfd3d5ce88c8c7cfcde6c2cfc1cfd0c7cac3d288c5c9cb">Piyush Naik</a></td><td class="column-2">AVP-Talent Acquisition</td><td class="column-3">DigiValet</td><td class="column-4">India</td>
</tr>
<tr class="row-960 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#34445d4d41475c1a467455445a551a575b">Piyush Raghuvanshi</a></td><td class="column-2">Head - Talent &amp; Culture</td><td class="column-3">apna</td><td class="column-4">India</td>
</tr>
<tr class="row-961 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f4ebebeee5c4e5e3f6edb5b4fcaae7ebe9">Pooja </a></td><td class="column-2">VP-MarComm &amp; Head-HR</td><td class="column-3">Agri10x</td><td class="column-4">India</td>
</tr>
<tr class="row-962 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#18687777727958627d766c7d7371767e776b777e6c367b7775">Pooja </a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Zentek  Infosoft</td><td class="column-4">India</td>
</tr>
<tr class="row-963 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d2a2bdbdb8b3fcb3a0bda0b392bfbbbcbda1bab3fcbbbc">Pooja Arora</a></td><td class="column-2">Head HR</td><td class="column-3">Minosha India</td><td class="column-4">India</td>
</tr>
<tr class="row-964 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e0908f8f8a81ce8da08192859393ce838f8d">Pooja M</a></td><td class="column-2">Director HR</td><td class="column-3">Aress Software</td><td class="column-4">India</td>
</tr>
<tr class="row-965 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f4ebebeee5aae9e5e0e5f4f4e5c4eae1f0f6e5e0fdeae1aae7ebe9">Pooja Madappa</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Netradyne</td><td class="column-4">India</td>
</tr>
<tr class="row-966 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9d8282878cc3808c818c9a8c8988ad838c83829e99988b8b9ec38e8280">Pooja Malawade</a></td><td class="column-2">Head of HR</td><td class="column-3">Nanostuffs</td><td class="column-4">India</td>
</tr>
<tr class="row-967 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#40302f2f2a210021362533342123336e232f2d">Pooja Mishra</a></td><td class="column-2">Vice President - HR &amp; Strategic Accounts</td><td class="column-3">Avesta Computer Services</td><td class="column-4">India</td>
</tr>
<tr class="row-968 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcccd3d3d6ddfcd5d2dfd2c9c892dfd3d1">Pooja Misra</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">IncNut Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-969 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#40302f2f2a216e30213225252b002d39272c212d2d6e232f2d">Pooja Pareek</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">MyGlamm</td><td class="column-4">India</td>
</tr>
<tr class="row-970 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a4bbbbbab5b994baa1a2b1baa0bbfab7bbb9">Poonam Dobriyal</a></td><td class="column-2">AVP -Human Resources</td><td class="column-3">Nuvento Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-971 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#75051a1a1b14185b1735160c1b1001060c06011018065b161a18">Poonam Sharma</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Cynet Systems Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-972 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7c7d8d8d9d6da99ced6d3d6c1f7c0d2d5dad8d5c5dedb99d4d8da">Poonam Yadav</a></td><td class="column-2">Group Head Human Resources</td><td class="column-3">WebMobril Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-973 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa8a9595889493979bd49d958d9e9bba9c95888e9b949382d4999597">Poornima Gowda</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Fortanix</td><td class="column-4">India</td>
</tr>
<tr class="row-974 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b1aeaeb3afa8aca0efafa0b3a0b8a0afa0b1b1a081b2b8acb1a9aeafb8b2b4acaca8b5efa2aeac">Poornima Narayanappa</a></td><td class="column-2">Head- Human Resources</td><td class="column-3">Symphony SummitAI</td><td class="column-4">India</td>
</tr>
<tr class="row-975 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95e5e5d5ecfaf1f9f0f0bbf6faf8">Poornima P</a></td><td class="column-2">HR Director</td><td class="column-3">Envestnet</td><td class="column-4">India</td>
</tr>
<tr class="row-976 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b1aeaeb3afa8aca081b5a4b2b5b7a0a6b3a0afb5efa2aeac">Poornima Srinivasan</a></td><td class="column-2">Head of Human Resources, People Head &amp; Culture</td><td class="column-3">TestVagrant Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-977 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#02726d6d706c6b6f632c714266366b6c716b656a762c616d6f">Poornima Subramanian</a></td><td class="column-2">Associate Director - Human Resources</td><td class="column-3">NielsenIQ</td><td class="column-4">India</td>
</tr>
<tr class="row-978 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#05756a70696a45626a696064616c6b626c712b666a68">Poulo Mathew</a></td><td class="column-2">VP of Human Resource</td><td class="column-3">Leading IT</td><td class="column-4">India</td>
</tr>
<tr class="row-979 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#68181a090a0009460f011a0128090b1a07180704011b01060e071c0d0b00460b0705">Prabha Giri</a></td><td class="column-2">AVP - People Operations</td><td class="column-3">Acropolis Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-980 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#02727063606a632c6f63716b6e636f636c6b42726e6b746d2c616d6f">Prabha Masilamani</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Plivo</td><td class="column-4">India</td>
</tr>
<tr class="row-981 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dbaba9bab9b3ae9bbaafb6beb8a8f5b8b4b6">Prabhu </a></td><td class="column-2">Director Human Resources Development</td><td class="column-3">ATMECS Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-982 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e5e5c4f4d4647005d474049466e5847404d5b425b43495c415b5e004d4143">Prachi Singh</a></td><td class="column-2">Head - Global Resourcing &amp; Talent Management</td><td class="column-3">Vinculum Group</td><td class="column-4">India</td>
</tr>
<tr class="row-983 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#81f1f3e0e5e4e4f1afe3eee8f3e8c1eef5f2e8afe2eeafe8ef">Pradeep Boiri</a></td><td class="column-2">Senior Director - HR</td><td class="column-3">Object Technology Solutions India</td><td class="column-4">India</td>
</tr>
<tr class="row-984 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#51212330353434217f3239383624232421302538113c383f352538323a3d347f323e3c">Pradeep Chigurupati</a></td><td class="column-2">Head, Talent Acquisition</td><td class="column-3">Mindtickle</td><td class="column-4">India</td>
</tr>
<tr class="row-985 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b5b594a4f4e4e5b05406b4642454f5f4e484005484446">Pradeep K</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Mindteck India</td><td class="column-4">India</td>
</tr>
<tr class="row-986 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8b3aab1abb0b6b9b6a898b3b9b1a2bdb6acbdb3f6bbb7b5">Pradeep Krishnan</a></td><td class="column-2">Recruitment Head - Technology Consulting Services</td><td class="column-3">Kaizen Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-987 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bacac8dbdedfdfca94d1cfd7dbc8fadbd4ded5c8cedfd9d294d9d5d7">Pradeep Kumar</a></td><td class="column-2">Director - HR</td><td class="column-3">Andor Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-988 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#11616370757474617a647c7063517f746665767d7e73707d727e63613f727e7c">Pradeep Kumar</a></td><td class="column-2">Director - Talent Management</td><td class="column-3">Newt Global Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-989 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#68181a090c0d0d18280a010c0f0d0411460b0705">Pradeep Pg</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">Bidgely</td><td class="column-4">India</td>
</tr>
<tr class="row-990 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#29595b484d4c4c59765b691a4d5945445a464f5d5e485b4c074a4644">Pradeep R</a></td><td class="column-2">Head of HR (India)</td><td class="column-3">Dassault Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-991 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a3d3d1c2c7c6c6d3e3c7cac4cad1dad7c68dc0ccce">Pradeep Raju</a></td><td class="column-2">Vice President - People Operations</td><td class="column-3">Digiryte</td><td class="column-4">India</td>
</tr>
<tr class="row-992 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7c7c5d6d3d2d2c7f7c4d2c5c1d8c4cec499d4d8da">Pradeep Sinha</a></td><td class="column-2">Head HR &amp; Quality</td><td class="column-3">Servosys Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-993 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#572725363332277924172d22273225793438">Pradep Sakthi</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Zuper</td><td class="column-4">India</td>
</tr>
<tr class="row-994 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#30404251545e49511e5b455c5b51425e597051565f4542445553581e535f5d">Pradnya Kulkarni</a></td><td class="column-2">Head-HR &amp; Admin</td><td class="column-3">AFour Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-995 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9d9c3c8c0dadec8c5e9d1ccc7ddc687cac6c4">Prafull </a></td><td class="column-2">Head - HR Strategy &amp; Talent Management</td><td class="column-3">Xento Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-996 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5d2d2f3c3a3c29341d3c2f243c3e303c733e32733433">Pragati Dey</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Arya.ag</td><td class="column-4">India</td>
</tr>
<tr class="row-997 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e5958e90888497a5848c808b91809795978c9680cb868a88">Pragati Kumar</a></td><td class="column-2">Director Human Resources and Administration</td><td class="column-3">AIEnterprise Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-998 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6111130006001508210e0f000c0006130e14114f020e0c">Pragati S</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Onama Consultants</td><td class="column-4">India</td>
</tr>
<tr class="row-999 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#28585a494f495c41065c41445e4d684b5a4d495c415e4d4b49585b5d444d064b4745">Pragati Tilve</a></td><td class="column-2">Director of Human Resources</td><td class="column-3">Creative Capsule</td><td class="column-4">India</td>
</tr>
<tr class="row-1000 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#18706a36776a7a716c58776a7a716c71767c717936767d6c">Pragatii Choudhary</a></td><td class="column-2">Head of HR</td><td class="column-3">Orbit Techsol</td><td class="column-4">India</td>
</tr>
<tr class="row-1001 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c2c2e3d3b253d7237343d32323d1c30352e3537723533">Pragya </a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Lirik</td><td class="column-4">India</td>
</tr>
<tr class="row-1002 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9aeae8fbfde3fbb4eafbe8fbe9f2fbe8daf9f6fbe8f3eeefe9f9f5f4e9eff6eef3f4fdb4f9f5f7">Pragya Parashar</a></td><td class="column-2">Head of HR</td><td class="column-3">Claritus Management Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1003 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6d6d4c7ccc3c3d2ce88c1e6d1cfc8d1cfd4c388c5c9cb">Prajeeth Gobi</a></td><td class="column-2">Associate Director - Recruitment</td><td class="column-3">WinWire Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1004 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8afaf8ebe0efeffee2eba4faf8ebf9ebeecafee2e5ffede2fef9fae5fea4e9e5e7">Prajeetha Prasad</a></td><td class="column-2">Director People Operations</td><td class="column-3">ThoughtSpot</td><td class="column-4">India</td>
</tr>
<tr class="row-1005 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f5f5d4e444e5c47014d6f5f4e56404b4e014c4042">Prakash Balasubramanian</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Payoda Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1006 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87f7f5e6ece6f4efecc7e9e2f0f3e0ebe8e5e6ebe4e8f5f7a9e4e8ea">Prakash Kumaran</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Newt Global Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1007 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcccceddd7ddcfd4ccd2fccfc9d2c8d9dfdbced3c9cc92dfd3d1">Prakash Nair</a></td><td class="column-2">Vice President &amp; Global Head - HR &amp; KMTD</td><td class="column-3">SunTec Business Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1008 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c9b9bba8a2a8baa1e7bbaa89a2bba0b0a8a7b1bee7aaa6a4">Prakash Rc</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Kriya IT</td><td class="column-4">India</td>
</tr>
<tr class="row-1009 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#740406151f0d15001c5a1f340211061d12150d155a171b19">Prakyath Krishnappa</a></td><td class="column-2">Head of HR</td><td class="column-3">Verifaya Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-1010 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#29595b4844464d410742485b5c444b48404841695d5b4c4545074a46">Pramodh Karumbaiah</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Trell</td><td class="column-4">India</td>
</tr>
<tr class="row-1011 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ffffdeee1eeeda1e2e6fce7fdeecfecfde6fbe6eceee3fde6f9eafda1ece0e2">Pranab Mishra</a></td><td class="column-2">Human Resources Director</td><td class="column-3">CriticalRiver</td><td class="column-4">India</td>
</tr>
<tr class="row-1012 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e49496858a85888dca978c8d8a8081a482818590979d9790818997ca878b89">Pranali Shinde</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">Feat Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1013 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5b5b7a4aba4bc85b5b7a0a6acb6acaaabb1a0a6ada6aab7b5eba6aaa8">Pranay Mahadik</a></td><td class="column-2">AVP - Talent Acquisition</td><td class="column-3">Precision Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1014 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e2e2c3f30372a363f1e2a273831303b703d3133">Pranitha Penmetsa</a></td><td class="column-2">VP - Human Resources and Operations</td><td class="column-3">tyfone,</td><td class="column-4">India</td>
</tr>
<tr class="row-1015 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f08082918391919e8498de83b09986899d9f92999c998489de939f9d">Prasaanth Subbiah</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Ivy Mobility</td><td class="column-4">India</td>
</tr>
<tr class="row-1016 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b5b594a584a4f05494a4c4a5c4a4f4e6b42454d594a58444d5f5f4e484305484446">Prasad Bagawade</a></td><td class="column-2">Global Head - Human Resources</td><td class="column-3">Infrasoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1017 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d6d6f7c6e7c7942765d7c7f70747379747c337e7270">Prasad Kelkar</a></td><td class="column-2">Head HR &amp; Admin</td><td class="column-3">ABM Knowledgeware</td><td class="column-4">India</td>
</tr>
<tr class="row-1018 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#522220332133360d3c3320332b333c123c373d2433213d3e27263b3d3c217c3b3c">Prasad Narayan</a></td><td class="column-2">Head of Talent Acquisition &amp; Special Projects</td><td class="column-3">Neova Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1019 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5d2d2f3c2e3c39022f1d2d2f38312839382e242e733e3230">Prasad Reddy</a></td><td class="column-2">Associate Vice President - IT &amp; HR</td><td class="column-3">PreludeSys</td><td class="column-4">India</td>
</tr>
<tr class="row-1020 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7707051604161919165904180716051c16053704031212071b16075914181a">Prasanna Soparkar</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">Shell Transource</td><td class="column-4">India</td>
</tr>
<tr class="row-1021 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#06767467756e67687228627364637f467263656e6f6a67756374706f6563752865696b">Prashant Dubey</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Techila Global Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1022 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#32424053415a535c4672595e585b5c565b531c515d5f">Prashant Kesharwani</a></td><td class="column-2">HEAD- LEGAL &amp; HR</td><td class="column-3">IKF Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1023 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aadad8cbd9c2cbc4de84dacbd8cbd9c2cbd8eac9c6cfdccfd8decbda84c9c5c7">Prashant Parashar</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">CleverTap</td><td class="column-4">India</td>
</tr>
<tr class="row-1024 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8afaf8ebf9e2ebe4fecaeee3fceff8f9efe6f3e4f2a4e9e5e7">Prashant Saxena</a></td><td class="column-2">India Recruitment Head</td><td class="column-3">Diverse Lynx</td><td class="column-4">India</td>
</tr>
<tr class="row-1025 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9fefedfeecf7fef1ebf7b1f4eaf3f4feedf1f6dfe9adecf0f3eaebf6f0f1ecb1fcf0f2">Prashanth Kulkarni</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">V2Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1026 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f4848695879c9587809db49981829dda979b99">Prashasti Pritiprada</a></td><td class="column-2">Director of HR</td><td class="column-3">Muvi.com</td><td class="column-4">India</td>
</tr>
<tr class="row-1027 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d7d7f6c7e65686861237d6c7f6965684d797f6c6379627f64636e236e6260">Prasheel Pardhe</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Trantor</td><td class="column-4">India</td>
</tr>
<tr class="row-1028 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d4d4f5c4e495451447d4b5c544e584e54565c135453">Prastily Kp</a></td><td class="column-2">Director -HR, Operations,  Finance, Immigration</td><td class="column-3">Vaisesika Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1029 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#65151704110d00000e4b0804060d041c0425130409000b110407150a4b060a08">Pratheek Machaya</a></td><td class="column-2">Head - Franchise Recruitment</td><td class="column-3">Valenta</td><td class="column-4">India</td>
</tr>
<tr class="row-1030 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d4d4f5c495544484e555c7d085e5358494a524f56135e5250">Prathyusha Mannar</a></td><td class="column-2">Head - HR</td><td class="column-3">5C Network</td><td class="column-4">India</td>
</tr>
<tr class="row-1031 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d3d3f2c39242663200d2f2c2c37242a2c20283e632e2220">Pratik M</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Baazi Games</td><td class="column-4">India</td>
</tr>
<tr class="row-1032 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0c0c2d1c4d9dd9ec0c5c2dbd1d9c4f0c2c4dec39ed9de">Pratim Purkait</a></td><td class="column-2">Head of HR</td><td class="column-3">RT Network Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1033 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d6d6f7c6964686e75336e7473757c5d7e7c697c71646e69727378337e7270">Pratyush Sinha</a></td><td class="column-2">Head Of Human Resources India</td><td class="column-3">CatalystOne Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1034 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#017173607764646f2f667471756041606c606f757860756462692f626e6c">Praveen Gupta</a></td><td class="column-2">Vice President - Global HR</td><td class="column-3">Amantya Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1035 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f7f65607c6a7f674f7c7a766e7b66216c6062">Praveen Joseph</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Suyati Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1036 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#09797b687f6c6c67496468717f6865276a6664">Praveen Kummar</a></td><td class="column-2">Director Talent Management</td><td class="column-3">MaxVal Group,</td><td class="column-4">India</td>
</tr>
<tr class="row-1037 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#304042514655555e1e5b455e445170595e53444542551e535f5d">Praveen Kunta</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Incture</td><td class="column-4">India</td>
</tr>
<tr class="row-1038 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f787859681929299d999969a959e9685b7859e908192938392949fd994989a">Praveen Nambiar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Rigved Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1039 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0777756671626269297547746861737766736f29696273">Praveen Rao</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Softpath System</td><td class="column-4">India</td>
</tr>
<tr class="row-1040 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87f7f5e6f1e2e2e9a9f4eee9e0efc7ffe3f2e4e2a9e4e8ea">Praveen Singh</a></td><td class="column-2">Senior Director - HR and Head of India Operations</td><td class="column-3">XDuce</td><td class="column-4">India</td>
</tr>
<tr class="row-1041 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2c5c5e4d5a4949420256435e496c4d4b4540454d48024f4341">Praveen Zore</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Agiliad</td><td class="column-4">India</td>
</tr>
<tr class="row-1042 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b1b3a0b7a8afefaaa0afaaa0afa481a7adaeeca6b3aeb4b1efa2aeac">Pravin Kankane</a></td><td class="column-2">Director Human Resources Administration</td><td class="column-3">Flo Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1043 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#62121003140b0c4c11170000032216030c0e034c010d0f">Pravin Subba</a></td><td class="column-2">Chief People Experience Officer</td><td class="column-3">Tanla Platforms</td><td class="column-4">India</td>
</tr>
<tr class="row-1044 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#79090b1c1c0d115713160a1c0911391b0b101d1e1c104b10571a1614">Preeth Joseph</a></td><td class="column-2">Director - Talent Strategy &amp; Operations</td><td class="column-3">BRIDGEi2i Analytics Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1045 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9d9f888899858cad8b9f82839984889fc38483">Preetha Somashekar</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Frontier Business systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1046 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#40303225253428212d6e33292e27280034212e2c216e232f2d">Preetham Singh</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Tanla Platforms</td><td class="column-4">India</td>
</tr>
<tr class="row-1047 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f484869191809c8dda84958198b49d9a8791999d8091979cda979b99">Preethy Paul</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">Insemi Technology Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1048 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe8e8c9b9b8a97d09a9f8dbe8a8c978e8d8a9f9d95d09d9193">Preeti Das</a></td><td class="column-2">Human Resources Director - India</td><td class="column-3">TripStack</td><td class="column-4">India</td>
</tr>
<tr class="row-1049 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8cfcfee9e9f8e5a2e7ede0f5ede2e7edfecce1e3ffede1eee9e9a2efe3e1">Preeti Kalyankar</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Mosambee</td><td class="column-4">India</td>
</tr>
<tr class="row-1050 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8dfde0ece3e4cdfbe8ffe4fef4fea3eee2e0">Preeti Mani</a></td><td class="column-2">Head of HR</td><td class="column-3">Verisys Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-1051 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b1b3a4a4b5a8efaca0b5a9b4b381a4b1b3aea5b4a2b5a8b7a8b5b8b2aea7b5b6a0b3a4efa2aeac">Preeti Mathur</a></td><td class="column-2">Director HR for APAC</td><td class="column-3">eProductivity Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1052 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a7a786f6f7e632467797d4a7d7f646e6f78676b647e6265677a79656424696567">Preeti Msw</a></td><td class="column-2">Head Strategic HR &amp; Leadership</td><td class="column-3">Wunderman Thompson Commerce</td><td class="column-4">India</td>
</tr>
<tr class="row-1053 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d1d1f08081904431d050c031e0c01060c1f2d0e010c1f04020319080e05430e0200">Preeti Phansalkar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Clarion Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1054 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7d7d5c2c2d3dee7c4c8ddc2c9d3d2d489c4c8ca">Preety Mehra</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Cozentus</td><td class="column-4">India</td>
</tr>
<tr class="row-1055 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#473735222a6929262e35073328342f2e25266a33342e376924282a">Prem Nair</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Toshiba Software (India)</td><td class="column-4">India</td>
</tr>
<tr class="row-1056 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1c1c3d4c3dfd09fdaded9ddd8f1d2c8c6d0c3d49fd2dedc">Prerna Kohli</a></td><td class="column-2">Director Human Resources (India)</td><td class="column-3">Cyware</td><td class="column-4">India</td>
</tr>
<tr class="row-1057 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#79090b10171a1c57120c14180b3910171716110c1b0d1c1a11171615161e101c0a571a1614">Prince Kumar</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Innohub Technologies Pte</td><td class="column-4">India</td>
</tr>
<tr class="row-1058 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7303011a00101a1f1f125d15331e121d0701121f121100141f1c11121f5d101c1e">Priscilla Francis</a></td><td class="column-2">Head of HR</td><td class="column-3">Mantra Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1059 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b1b3a8b5a9a081afa4a0b3efa2aeac">Pritha Das</a></td><td class="column-2">Director - People and Culture</td><td class="column-3">Near</td><td class="column-4">India</td>
</tr>
<tr class="row-1060 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bcccced5c8d592d1d4ddc8ced9fcc6dddbdbd0d992d5d2">Priti Mhatre</a></td><td class="column-2">Senior Manager (Head- Human Resources)</td><td class="column-3">Zaggle Prepaid Ocean Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1061 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e494968d9d85ca8685838885a4829188888197908b94ca878b89">Priya Bagla</a></td><td class="column-2">HR Director</td><td class="column-3">Fullestop</td><td class="column-4">India</td>
</tr>
<tr class="row-1062 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5727253e2e3679353f38303e3932393e172e322f3b327934383a">Priya Bhogineni</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Yexle</td><td class="column-4">India</td>
</tr>
<tr class="row-1063 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3040425949511e5d515c585f44425170545156565f54595c43471e535f5d">Priya Malhotra</a></td><td class="column-2">AVP Human Resources</td><td class="column-3">Daffodil Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1064 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0c0c2d9c9d1f0d6dcd5c8d1c3dfd6c49ed3dfdd">Priya Malhotra</a></td><td class="column-2">VP-Staffing</td><td class="column-3">Flexasoft</td><td class="column-4">India</td>
</tr>
<tr class="row-1065 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b9c9cbd0c0d8f9dad6d7decbccdcd7cdd0d7ddd0d897dad6d4">Priya Nair</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Congruent Info-Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-1066 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f2f0ebfbe3acf1f7e0f0e3efe3ecebe3ecc2f6e3eef4ebe7f5ace1edef">Priya Subramanian</a></td><td class="column-2">Head of HR</td><td class="column-3">Talview</td><td class="column-4">India</td>
</tr>
<tr class="row-1067 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6e1e1c07170f2e041b0009020b0b090f030b1d400d0103">Priya Surana</a></td><td class="column-2">Head Employee Experience &amp; Talent Acquisition</td><td class="column-3">Junglee Games</td><td class="column-4">India</td>
</tr>
<tr class="row-1068 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3b4b4952425a7b4a4e5a494f5258155a52">Priya Tyagi</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Quartic.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1069 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e494968d9d85808596978c8d8a8da49085908587888d95ca878b89">Priyadarshini Kachroo</a></td><td class="column-2">Head of Corporate Planning and Strategy</td><td class="column-3">Tata CLiQ</td><td class="column-4">India</td>
</tr>
<tr class="row-1070 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b5c5c7dcccd4d1d4c7c6dddcdbdc9bc1dac7ded0f5dfdad7c6d3dac7ddd0c79bd6dad8">Priyadarshini Torke</a></td><td class="column-2">AVP - HRBP</td><td class="column-3">JobsForHer</td><td class="column-4">India</td>
</tr>
<tr class="row-1071 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7d7d5cedec6c9ccc689c5c6d4c6cce7c4c5c9ced3d489c4c8ca">Priyanka Basak</a></td><td class="column-2">Head of Recruitment</td><td class="column-3">CBNITS</td><td class="column-4">India</td>
</tr>
<tr class="row-1072 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1a1a3b8a8b0bfbab0ffb6a3bea7b4a391b7b8b7a5b9bfbea5b4ffb2be">Priyanka Grover</a></td><td class="column-2">Function Head - Culture Building</td><td class="column-3">fifthnote</td><td class="column-4">India</td>
</tr>
<tr class="row-1073 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7e0e141f170d091f123e0e1f150a11120b0d501d1113">Priyanka Jaiswal</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Paktolus Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1074 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e191938898808f8a808ca18289888c849380958482898f8e8d8e86888492cf828e8c">Priyanka Madhala</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Chimera Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1075 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3040425949515e5b511e40425949515451424358595e597058535c1e535f5d">Priyanka Priyadarshini</a></td><td class="column-2">Head - HR (APAC &amp; Gulf)</td><td class="column-3">Monster India</td><td class="column-4">India</td>
</tr>
<tr class="row-1076 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b5c5c7dcccd4dbded4f5d3c7d0c6ddd0c7c6c2dac7d9d19bd6dad8">Priyanka Roy</a></td><td class="column-2">Head - HR &amp; Operations</td><td class="column-3">Freshersworld.com</td><td class="column-4">India</td>
</tr>
<tr class="row-1077 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83f3f1eafae2ede8e2adf0c3e7e6e0eaeee2eff7e6e0ebade0ecee">Priyanka Sharma</a></td><td class="column-2">AVP HR (Talent and Culture)</td><td class="column-3">Decimal Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1078 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4434362d3d252a2f25372c310422282b272f6a272b29">Priyanka Shukla</a></td><td class="column-2">Head - Total Rewards and HR Analytics</td><td class="column-3">Flock</td><td class="column-4">India</td>
</tr>
<tr class="row-1079 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddadafb4a4b2b0f3bfbcafb2b2bcb59db6afb4a9b4b6bcb1abb4aeb4b2b3f3bcb4">Priyom Barooah</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">KritiKal Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1080 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dbaba9b4bdf5bfaeafaf9bb4b5beb9b8bcf5b8b4b6">Prof Chro</a></td><td class="column-2">Head - People &amp; Culture</td><td class="column-3">ONE BCG</td><td class="column-4">India</td>
</tr>
<tr class="row-1081 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#99e9ebf6f7f8f4f0b7fbf6ebf8f1d9edebf8effaf5f8f7b7faf6f4">Pronami Borah</a></td><td class="column-2">People Operations Head</td><td class="column-3">TravClan</td><td class="column-4">India</td>
</tr>
<tr class="row-1082 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a3a3f202b0a2b2c2c262f64292527">Puja Gupta</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Affle</td><td class="column-4">India</td>
</tr>
<tr class="row-1083 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4434312a2d302c256a2a043e31272d373d37302129376a272b29">Punitha Nagarajan</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Zuci Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1084 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#29595c5b5f485969534c47465d40074a4644">Purva Pandit</a></td><td class="column-2">Vice President - Talent Management</td><td class="column-3">Zenoti</td><td class="column-4">India</td>
</tr>
<tr class="row-1085 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3c3c6c0dbc3d6ddd7c1d29dcaf3d0caddd6c7c0cac0c7d6dec09dd0dcde">Pushpendra Yadav</a></td><td class="column-2">Director - Recruiting Operations (RecOps)</td><td class="column-3">Cynet Systems Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1086 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2c2c7c1dac2dbdcd6d7c09cc1dbdcd5daf2c1d7809cd1dddf">Pushpinder Singh</a></td><td class="column-2">Global Head - Talent Acquisition</td><td class="column-3">SE2</td><td class="column-4">India</td>
</tr>
<tr class="row-1087 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4d6c5c6cde4c2c8cbc6cdde8acdca">Rabi Agrawal</a></td><td class="column-2">Head of HR</td><td class="column-3">FloBiz</td><td class="column-4">India</td>
</tr>
<tr class="row-1088 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#047665606c656f766d776c6a656f447774656a6d6061652a676b69">Radhakrishna K</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">SpanIdea Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1089 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#76045818171f043605031802131511041903065815191b">Radhakrishnan Nair</a></td><td class="column-2">Sr.Vice President and Head of HR</td><td class="column-3">SunTec Business Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1090 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2b0a3a6aaaba9a3eca0adb2b2a3aca382a0aea3a1a9b1b6b0a3b5eca3ab">Radhika Boppana</a></td><td class="column-2">Chro</td><td class="column-3">Blackstraw.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1091 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9f8c898584868cc38685989f8c838cad84809d8c8e998c838c819499848e9ec38e82">Radhika Khurana</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Impact Analytics</td><td class="column-4">India</td>
</tr>
<tr class="row-1092 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e193808689809780cf8a938892898f80a18f928d899483cf828e8c">Raghava Krishna</a></td><td class="column-2">Senior Group Solutions Leader (CHRO)</td><td class="column-3">Brane Enterprises</td><td class="column-4">India</td>
</tr>
<tr class="row-1093 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd8f9c9a959c8b9893998f9cbd8e848e9e91928899d39e9290">Raghavendra </a></td><td class="column-2">Sr. Director Recruitment</td><td class="column-3">SysCloud</td><td class="column-4">India</td>
</tr>
<tr class="row-1094 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f98b989e91988f9c979d8b98b99f909d9c95908a9e8b968c89d79097">Raghavendra Mesta</a></td><td class="column-2">Vice President - HR</td><td class="column-3">Fidelis Corporate Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1095 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0476636573606144776b6270676168682a676b69">Raghunath Gawde</a></td><td class="column-2">Corporate Head- Finance &amp; HR</td><td class="column-3">Softcell Technologies Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1096 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a283b3d33343374371a293f3b343f283d233e333d332e3b3674393537">Ragini Mahapatra</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Seanergy Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1097 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bf9eae3fee7a5eacbf8e4edfffbeaffe3a5e5eeff">Rahul Agrawal</a></td><td class="column-2">Director &amp; BU Head - Talent Acquisition</td><td class="column-3">Softpath System</td><td class="column-4">India</td>
</tr>
<tr class="row-1098 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f7d6e677a63216d6e617c606b6a4f6b6668667b6e63693a216c6062">Rahul Bansode</a></td><td class="column-2">Head - Performance &amp; Solutions E-commerce</td><td class="column-3">Digital Refresh Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-1099 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d5f4c4558416d434859404c4a444e5e424158594442435e034e4240">Rahul Choudhury</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-1100 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c9bba8a1bca5e7a0a7a8a4ada8bb89a0a7afbba8aaa5a6bcade7a0a6">Rahul Inamdar</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">InfraCloud Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1101 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f486959c8198da829d879c9583959a809c9599b48295958291da979b99">Rahul Vishwanatham</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Vaave</td><td class="column-4">India</td>
</tr>
<tr class="row-1102 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#403221223522212b2b213200212d322530292e33302523346e232f2d">Raj Abubakkar</a></td><td class="column-2">Global Head Human Resources</td><td class="column-3">AMREP SUPPLIER MANAGEMENT SERVICES</td><td class="column-4">India</td>
</tr>
<tr class="row-1103 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#720013185c1315130005131e32414442161715001717111e1d07165c1b1c">Raj Agarwal</a></td><td class="column-2">Chief Recruitment Officer</td><td class="column-3">360 Degree Cloud Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1104 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4537242f272a362005243324312424376b2820">Raj Bose</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Avataar.Me</td><td class="column-4">India</td>
</tr>
<tr class="row-1105 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#54267a3f3d273c14273138313720272d277a373b39">Raj Kish</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Selectsys India</td><td class="column-4">India</td>
</tr>
<tr class="row-1106 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd8f9c979cd38d9c90949994bd938989999c899cd39e9290">Raja Pamidi</a></td><td class="column-2">Delivery Head- Talent Acquisition</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-1107 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2153404b40464e51404d61404f5553400f424e4c">Rajagopal </a></td><td class="column-2">Vice President - TA &amp; IT Staffing</td><td class="column-3">Antra,</td><td class="column-4">India</td>
</tr>
<tr class="row-1108 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4e3c2f242f20273e0e3c2b3d2722272b202d2b273a3b3d2f602d2123">Rajani Patel</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Resilience InfoTech</td><td class="column-4">India</td>
</tr>
<tr class="row-1109 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0e7c6f646f6067207d676a6a666f7c7a666f4e6a7c6b6f63617c6c677a206d6163">Rajani Siddhartha</a></td><td class="column-2">Vice President - Human Resource</td><td class="column-3">DreamOrbit</td><td class="column-4">India</td>
</tr>
<tr class="row-1110 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e53104c5f545f4d564c5b5b7e465f50595f4c4d105d5153">Rajashree Mahajan</a></td><td class="column-2">Talent Acquisition Recruiter Head</td><td class="column-3">Xangars Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1111 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#abd9cac1cadfc9ebcfcac6c8c4ccd9c4dedb85c8c4c6">Rajat Bansal</a></td><td class="column-2">Associate Vice President- HR</td><td class="column-3">Damco Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1112 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bbc9dad1dacf95dfdac8fbd4d5dfded6dad5dfdadcd2d7d2cfc295d8d4d6">Rajat Das</a></td><td class="column-2">Talent Acquisition Head</td><td class="column-3">OnDemand Agility Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1113 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#295b4843485d07444c415b486947515d4e4c47074a4644">Rajat Mehra</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">NxtGen Infinite Datacenter</td><td class="column-4">India</td>
</tr>
<tr class="row-1114 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0c2d1dad5d5d2f0c183c4d5d3d89ed3dfdd">Rajeeb Biswas</a></td><td class="column-2">Director-HR &amp; Admin</td><td class="column-3">Q3 Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1115 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#681a09020d0d1e460a00091a0c1f0902281b1d0604010e0d460b0705">Rajeev Bhardwaj</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Sun Life</td><td class="column-4">India</td>
</tr>
<tr class="row-1116 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2c0d3d8d7d7c49cc1f2d3ded5dddcdddfcb9cd1dddf">Rajeev S</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Algonomy</td><td class="column-4">India</td>
</tr>
<tr class="row-1117 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#037170666d436e66676f6a6d662d606c6e">Rajeev Sen</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Medline India</td><td class="column-4">India</td>
</tr>
<tr class="row-1118 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bac8dbd0dfd4dec8db94d8d4fadfc2d3d6dbd4ce94d9d5d7">Rajendra Bn</a></td><td class="column-2">Head HR</td><td class="column-3">EXILANT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1119 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a687b707f6972745a6e7f79727b7c7c7374736e6334797577">Rajesh </a></td><td class="column-2">Director - HR</td><td class="column-3">TechAffinity</td><td class="column-4">India</td>
</tr>
<tr class="row-1120 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cab8aba0afb9a28aaeb8afa7a3a5e4a9a5a7">Rajesh A</a></td><td class="column-2">Director HR - India</td><td class="column-3">Dremio</td><td class="column-4">India</td>
</tr>
<tr class="row-1121 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4c6d5ded1c7dc9ad6d5d6c1f4c7dbd2c0dbd6ddce9ad7dbd9">Rajesh Babu</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Softobiz Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1122 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#daa8bbb0bfa9b2b89ab9b5bcbcbfbfb8bfbbb4a9f4b3b5">Rajesh Balasubramanian</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">CoffeeBeans Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1123 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6210030807110a4c0907160a0712030e0e0722070e070116100b04030b4c0c0716">Rajesh Kethepalle</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">ElectrifAi</td><td class="column-4">India</td>
</tr>
<tr class="row-1124 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0577646f60766d6845616468666a62776a70752b666a68">Rajesh Malhotra</a></td><td class="column-2">AVP Staffing and Fixed Bid Projects</td><td class="column-3">Damco Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1125 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7705161d12041f37111e04041e18191b1615045914181a">Rajesh Vadakevetil</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Fission Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1126 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddafbcb7b8aeb5f3a4bcb9bcab9dbaaea9b3f3b2afbaf3b4b3">Rajesh Yadav</a></td><td class="column-2">Vice President &amp; Head Human Resources</td><td class="column-3">Goods And Services Tax Network</td><td class="column-4">India</td>
</tr>
<tr class="row-1127 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b796a61627f636a25616a6d6d6e794b61667962656d647f6e686325686466">Rajitha Jaffer</a></td><td class="column-2">DIRECTOR - HR and OPERATIONS</td><td class="column-3">JMR Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1128 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4b39203e262a390b282e252f322565282426">Rajiv Kumar</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Cendyn</td><td class="column-4">India</td>
</tr>
<tr class="row-1129 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9dbc8c3c7ccccdac187c4c8c5c0c2e9c4c0c7cdddc0cac2c5cc87cac6c4">Rajneesh Malik</a></td><td class="column-2">Sr. Director Global -  Talent Acquisition</td><td class="column-3">Mindtickle</td><td class="column-4">India</td>
</tr>
<tr class="row-1130 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7d5c6cdc9cee7c0d5c8d0c2dfdf89c4c8ca">Rajni Bansal</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Growexx</td><td class="column-4">India</td>
</tr>
<tr class="row-1131 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c4e5d5652551252534e5352545d7c5f555b525944125f5351">Rajni Noronha</a></td><td class="column-2">AVP Talent Acquisition</td><td class="column-3">CIGNEX Datamatics</td><td class="column-4">India</td>
</tr>
<tr class="row-1132 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#235142494d4a0d504a4d444b634a4d474a4d4d4c5542574a4c4d0d404c4e">Rajni Singh</a></td><td class="column-2">Head HR Manager at Ind Innovation Private Limited</td><td class="column-3">Ind Innovation</td><td class="column-4">India</td>
</tr>
<tr class="row-1133 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89fbe8e3faece2e1e8fba7ede8e7eeecfde0c9f3ece7fae8fbe2a7eae6e4">Rajsekhar Dangeti</a></td><td class="column-2">Director, Global Talent Acquisition</td><td class="column-3">Zensark</td><td class="column-4">India</td>
</tr>
<tr class="row-1134 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a4b7bca3f8a0b7a2a5b7a0b7afbf96b8a5bfb1bea2fbbfb8b5f8b5b9bb">Raju Vatsavayi</a></td><td class="column-2">Director - Human Resource</td><td class="column-3">Nsight,</td><td class="column-4">India</td>
</tr>
<tr class="row-1135 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d5f4c47544c5e455f48486d59484e45434249545e445e034e4240">Rajyashree Rao</a></td><td class="column-2">HR and Operations Head</td><td class="column-3">Technodysis</td><td class="column-4">India</td>
</tr>
<tr class="row-1136 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c7e6d67697f64226d7e637e6d4c7f6765607e636f67226f6361">Rakesh Arora</a></td><td class="column-2">Group CHRO</td><td class="column-3">Skilrock Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1137 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3143505a5442591f50435e435071424456505d55505c505f581f525e5c">Rakesh Arora</a></td><td class="column-2">Group CHRO</td><td class="column-3">Sugal &amp; Damani</td><td class="column-4">India</td>
</tr>
<tr class="row-1138 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aedccfc5cbddc6eedacfcfd4cfcf80cdc1c3">Rakesh Arora</a></td><td class="column-2">Head HR &amp; Talent Acquisition</td><td class="column-3">Taazaa Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1139 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6012010b0513084e020104010d20140f0d0901070c0f02010c4e030f0d">Rakesh Badam</a></td><td class="column-2">Human Resources Director</td><td class="column-3">TOMIA</td><td class="column-4">India</td>
</tr>
<tr class="row-1140 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4032212b2533286e250076732d2f2f2e336e232f2d">Rakesh Ebrahimpurkar</a></td><td class="column-2">Deputy Vice President - Human Resources</td><td class="column-3">IFTAS</td><td class="column-4">India</td>
</tr>
<tr class="row-1141 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86f4e7ede3f5eea8edf3ebe7f4c6e7e8e3f2e5e9f4f6a8e5e9eb">Rakesh Kumar</a></td><td class="column-2">Head of Recruitment Operations</td><td class="column-3">Alpha Net</td><td class="column-4">India</td>
</tr>
<tr class="row-1142 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0b2a1aba5b3a880ada5b2a7a5aea9b4eea3afad">Rakesh Raj</a></td><td class="column-2">Vice President, IT - Staffing &amp; Solutions</td><td class="column-3">Mergen IT LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1143 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#691b08020c1a01471f001a011e0802081b0408291d0c03061b08470a0604">Rakesh Vishwakarma</a></td><td class="column-2">AVP - STAFFING</td><td class="column-3">Tejora</td><td class="column-4">India</td>
</tr>
<tr class="row-1144 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d2a0b3b9a1babba6b392b7b3a1abb7b3a6fcb3bb">Rakshita Shharma</a></td><td class="column-2">CHRO</td><td class="column-3">Easy Eat AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1145 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1361727e3d615378727a617c606776707b3d707c7e">Ram R</a></td><td class="column-2">Talent Acquisition Head</td><td class="column-3">Kairos Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1146 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a2b1bdfea6b1a2b1b4b1bdbfbfa2a4b8a990b4a5b3b5beb9a4feb3bfbd">Ram Varadamoorthy</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Ducen</td><td class="column-4">India</td>
</tr>
<tr class="row-1147 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a485b575b14597a49554855595514595557">Rama C</a></td><td class="column-2">Head of People Operations</td><td class="column-3">Soroco</td><td class="column-4">India</td>
</tr>
<tr class="row-1148 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a6b5b9b5bfa6bda7bcbab5b794b9a7a6b7bba7b9bba7fab7bbb9">Ramakrishna Chanduri</a></td><td class="column-2">Head HR</td><td class="column-3">MSRcosmos LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1149 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#285a494549435a415b40464906424945584944496858495a494c414f45415c064b4745">Ramakrishna Jampala</a></td><td class="column-2">Head - HR</td><td class="column-3">ParadigmIT</td><td class="column-4">India</td>
</tr>
<tr class="row-1150 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#106264637b50637575733e737f7d">Raman Tsk</a></td><td class="column-2">HR-Director</td><td class="column-3">SEEC</td><td class="column-4">India</td>
</tr>
<tr class="row-1151 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5d7c4c8c4cbcce5cdccd7c0c6d18bcccb">Ramani Ganesh</a></td><td class="column-2">Senior Vice President -Human Resources</td><td class="column-3">Hirect India</td><td class="column-4">India</td>
</tr>
<tr class="row-1152 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cab8aba7aba4a0a3bee4ada5b9bdaba7a38aa3a4abaeafbce4a9a5a7">Ramanjit Goswami</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Optimize IT Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1153 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a6b5b9b5baa1beb5b9fab7a794bdb2bbb7a1a7a7ada7a0b1b7fab7bbb9">Ramanujam Cs</a></td><td class="column-2">Head - HR &amp; Finance</td><td class="column-3">iFocus Systec</td><td class="column-4">India</td>
</tr>
<tr class="row-1154 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cebcafa3afbebcafbdafaae0acafa2aba9bba2a78eb8fcbda1a2bbbaa7a1a0bde0ada1a3">Ramaprasad Baleguli</a></td><td class="column-2">Head of Talent Acquisition-Digital Engineering</td><td class="column-3">V2Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1155 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a525f5b5e1452487a5b585753545e535b14595557">Ramchandra Patil</a></td><td class="column-2">Head of HR</td><td class="column-3">ABM Knowledgeware</td><td class="column-4">India</td>
</tr>
<tr class="row-1156 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#32405f535c46535c537257445d59574657515a5c5d5e5d555b57411c515d5f">Ramesh Mantana</a></td><td class="column-2">Vice President - HR &amp; Ops</td><td class="column-3">Evoke Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1157 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4c6d5d9d1c7dc9ac4d5c6d1c4d5d8d8ddf4c4c1c6c2ddd1c3c7d1c6c2ddd7d1c79ad7dbd9">Ramesh Parepalli</a></td><td class="column-2">Global Recruitment Director</td><td class="column-3">PURVIEW</td><td class="column-4">India</td>
</tr>
<tr class="row-1158 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3143505c5442591f45505d4650437152435c5f5449451f525e5c">Ramesh Talwar</a></td><td class="column-2">VP Admin &amp; HR</td><td class="column-3">CRMNEXT</td><td class="column-4">India</td>
</tr>
<tr class="row-1159 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#552734383e273c263d3b347b26343d20153630252130267b363a38">Ramkrishna Sahu</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">CEPTES Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1160 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#17726576737e3965767a6e765776627d76643974787a">Ramya Eradi</a></td><td class="column-2">Head - Talent Management</td><td class="column-3">Aujas Cybersecurity</td><td class="column-4">India</td>
</tr>
<tr class="row-1161 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1361727e6a723d7b655363617c757a7d707b3d707c7e">Ramya Hv</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Profinch</td><td class="column-4">India</td>
</tr>
<tr class="row-1162 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a3d1c2cedac28dcec6cdcccde3c6c7cac5c6c0d08dc0ccce">Ramya Menon</a></td><td class="column-2">Head - People&amp; Culture, India</td><td class="column-3">Edifecs</td><td class="column-4">India</td>
</tr>
<tr class="row-1163 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d1f0c00140c431f0c000c0e050c03091f0c032d0e010218091e0806430e0200">Ramya Ramachandran</a></td><td class="column-2">Associate Vice President - Talent Acquisition</td><td class="column-3">CloudSEK</td><td class="column-4">India</td>
</tr>
<tr class="row-1164 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1e6c7f73677f306d5e796c7b67716c7f70797b307d7173">Ramya Sharma</a></td><td class="column-2">Chief People Officer</td><td class="column-3">GreyOrange</td><td class="column-4">India</td>
</tr>
<tr class="row-1165 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6113000c18004f17040f0a00150412092111130e07080f02094f020e0c">Ramya Venkatesh</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Profinch</td><td class="column-4">India</td>
</tr>
<tr class="row-1166 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1260737c733c707d617752777f76613c717d7f">Rana Bose</a></td><td class="column-2">Human Resources Director</td><td class="column-3">eMDs</td><td class="column-4">India</td>
</tr>
<tr class="row-1167 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#186a7976727976367077777c79586a686b7b77766b6d746c71767f367176">Ranjan Hooda</a></td><td class="column-2">Head - Client Management &amp; Talent Acquisition</td><td class="column-3">RPS Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1168 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0e7c6f60646f606f4e6867606b7d7d6b6a677c6b6d7a206d6163">Ranjana Anand</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Finesse Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1169 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a687b74707b747334696f74717b687b5a7374796e6f687f34797577">Ranjani Sunkara</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Incture</td><td class="column-4">India</td>
</tr>
<tr class="row-1170 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7d5c6c9cdc2c2d3c689c3e7ceccd4d2cbc689c4c8ca">Ranjeeta Das</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Iksula</td><td class="column-4">India</td>
</tr>
<tr class="row-1171 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dcaebdb2b6b5a8b89cafacbdb2bfb3beacb3f2bfb3b1">Ranjit Dhillon</a></td><td class="column-2">SITE HEAD, HUMAN RESOURCES</td><td class="column-3">Spanco BPO</td><td class="column-4">India</td>
</tr>
<tr class="row-1172 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1260737c787b667a3c64625273677873613c717d7f">Ranjith Vp</a></td><td class="column-2">Head- Talent Acquisition</td><td class="column-3">Aujas Cybersecurity</td><td class="column-4">India</td>
</tr>
<tr class="row-1173 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#afddcec1c5c6dbc7ce81dcefc7cacec3dbc7cedcd6dcdb81ccc0c2">Ranjitha Sathyanarayan</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">HealthAsyst</td><td class="column-4">India</td>
</tr>
<tr class="row-1174 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4032212e2a350025213425212d6e232f2d">Ranju Nair</a></td><td class="column-2">Director Of Recruiting</td><td class="column-3">EA Team Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1175 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#780a190b101511561b10190d101916380a190c1d1f191116561b1715">Rashmi Chauhan</a></td><td class="column-2">Global Head - Talent Acquisition</td><td class="column-3">RateGain</td><td class="column-4">India</td>
</tr>
<tr class="row-1176 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83f1e2f0ebeeeaade4e6ecf1e4e6c3edeaf5e6f6f0f0eceff6f7eaecedf0ade0ecee">Rashmi George</a></td><td class="column-2">Chief Talent Officer</td><td class="column-3">Niveus Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1177 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1e6c7f6d76737730796b6e6a7b5e69776d7a73727f7c6d307d7173">Rashmi Gupte</a></td><td class="column-2">Head Human Resources</td><td class="column-3">WisdmLabs</td><td class="column-4">India</td>
</tr>
<tr class="row-1178 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91e3f0e2f9fcf8bfe5f0fae2f0fff5f4d1e2fef7e5f5f4fdbff2fefc">Rashmi Taksande</a></td><td class="column-2">HR Director</td><td class="column-3">Softdel</td><td class="column-4">India</td>
</tr>
<tr class="row-1179 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a4b7a5bebbbfa2b7f8a6a4b7b2beb7b896a2b3bdbabfb8bdf8b5b9bb">Rashmita Pradhan</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">TekLink International</td><td class="column-4">India</td>
</tr>
<tr class="row-1180 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#01736072696c6c642f6472697660734165607560626e73642f626e6c">Rashmme Eshwar</a></td><td class="column-2">Senior Director - APAC Human Resources</td><td class="column-3">DataCore Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1181 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#493b283d2827672d28252825092e25262b2825642a3a2e672a2624">Ratan Dalal</a></td><td class="column-2">Head Of Digital Recruitment - US, Europe</td><td class="column-3">Creative Synergies Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1182 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cdbfacb9a4a6ace3a0a4bfa7a48da3a8bba4b9a2a3e3aea2a0">Ratika Mirji</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Neviton Softech.</td><td class="column-4">India</td>
</tr>
<tr class="row-1183 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#394b584d504a5179545850574d5c5a175a5654">Ratish Kurle</a></td><td class="column-2">Delivery Head - IT Technical Staffing</td><td class="column-3">Maintec Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1184 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8baa9bca1bba0e6ba88a1a9a6bca1a6aca1a9e6aba7a5">Ratish Ravindran</a></td><td class="column-2">Head - Talent Management</td><td class="column-3">IANT</td><td class="column-4">India</td>
</tr>
<tr class="row-1185 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ee9c8f988a8b8b9ec09d87808986ae9d819b9c8d8b889b9d8bc08d8183">Ravdeep Singh</a></td><td class="column-2">Chief People Officer</td><td class="column-3">SourceFuse Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1186 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#56243720333338322437783237223a3716253b3724223f3b257835393b">Raveendra Datla</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Smart IMS</td><td class="column-4">India</td>
</tr>
<tr class="row-1187 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ccbeadbaa5e2aea4b9bfa4ada28cb8a9afa4a5a0adbfa9bebaa5afa9bfe2afa3a1">Ravi Bhushan</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Techila Global Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1188 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#681a091e01460c0d1e091a09281c090505010609460b0705">Ravi Devara</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">TechTammina LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1189 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#681a091e01460f1d1a1d06091c00090628011e09041d0d460b07460106">Ravi Gurunathan</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">iValue InfoSolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1190 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#176576617e397c5774657a7e633974787a">Ravi K</a></td><td class="column-2">Global Recruitment Head</td><td class="column-3">CRMIT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1191 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a6b5a2bdfabfb5a7bdbab5b0bca1babd94b7a6b9bda0fab7bbb9">Ravi Kasinadhuni</a></td><td class="column-2">Head HR</td><td class="column-3">CRMIT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1192 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a485b4c5314514f59525b574a4f5e537a405f544b14595557">Ravi Kuchampudi</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">ZenQ</td><td class="column-4">India</td>
</tr>
<tr class="row-1193 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9deffcebf4b3f6e8f0fcefddfcf0edf1f8b3fef2b3f4f3">Ravi Kumar</a></td><td class="column-2">Director - Recruitment</td><td class="column-3">Ample Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1194 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4c6dfc1d9d5c6f4c7d5ddd7dbdadddad79ad7dbd9">Ravi Kumar</a></td><td class="column-2">Recruitment Operations-Director</td><td class="column-3">Saicon</td><td class="column-4">India</td>
</tr>
<tr class="row-1195 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#473526312e692a2832353e260730262e342b692e29">Ravi Mourya</a></td><td class="column-2">Sr. Associate HR &amp; Chief Security Officer</td><td class="column-3">WAISL</td><td class="column-4">India</td>
</tr>
<tr class="row-1196 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8af8ebfce3a4f9e2ebe4e1ebf8cae9f8e7e3fea4e9e5e7">Ravi Shankar</a></td><td class="column-2">Global Recruitment Head</td><td class="column-3">CRMIT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1197 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87f5e6f1eec7e8ebeef1e2f3e2e4efa9e4e8ea">Ravi Surathu</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Olive Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1198 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb899a8d92d58d9a8f8f9290948f9abb928f9e9797929c9e95989e9c89948e8bd5989496">Ravi Vattikota</a></td><td class="column-2">VP, SAP Staffing &amp; Delivery</td><td class="column-3">itelligence India Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1199 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#473526312e242f26292335262907343726293322242f29282b28203e342235312e2422346924282a">Ravichandran Perumal</a></td><td class="column-2">VP - Excise &amp; Payroll Tax</td><td class="column-3">Span Technology Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1200 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#691b081f00021c04081b0429080d001d000a06071a1c051d00070e470a0604">Ravikumar M</a></td><td class="column-2">Director - Recruitment</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1201 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#087a697e61666c7a69266c69666c6d63697a4865716f64696565266b6765">Ravindra Dandekar</a></td><td class="column-2">Head of HR</td><td class="column-3">MyGlamm</td><td class="column-4">India</td>
</tr>
<tr class="row-1202 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c7b5a6b1aea9a3b5a6e9aab2b4b2a9b2b5b287b7b5a8b0a2b4b4b4a8a1b3e9a4a8aa">Ravindra Musunuru</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Prowess Software Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1203 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#037162756a70626d6862712d75666f6a676a436a6d60716665652d606c6e">Ravisankar Velidi</a></td><td class="column-2">Chief Culture Officer &amp; VP Engineering</td><td class="column-3">Increff</td><td class="column-4">India</td>
</tr>
<tr class="row-1204 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#255744534c564d0b464d44414d44654b4c5c504f0b464a48">Ravish Chadha</a></td><td class="column-2">Director &amp; Head of Talent Acquisition</td><td class="column-3">Niyuj</td><td class="column-4">India</td>
</tr>
<tr class="row-1205 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4d6c5d2cdd7ccc5cacfc1d68acfc5cacac5cae4d7cbc8d2c1d6c9cdcac0d78ac7cbc9">Ravishanker Kannan</a></td><td class="column-2">Head-Talent Acquisition</td><td class="column-3">Solverminds Solutions &amp; Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1206 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98eaf9eef1ecf0f9b6fcfdeef9ebfdf6f9e8f9ecf0e1d8fde8f1f3f1f6fcf1fef1b6fbf7f5">Ravitha Devasenapathy</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">EPIKInDiFi</td><td class="column-4">India</td>
</tr>
<tr class="row-1207 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#daa8b1bbafa89aaaa8b3b7afa9bdb6b5b8bbb6f4b9b5b7">Ravneet Kaur</a></td><td class="column-2">Delivery Head (UK and Europe recruitment)</td><td class="column-3">PRIMUS Global Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1208 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483a29242a3a27083b3c29262c70662127">Ray Albro</a></td><td class="column-2">Human Resources Director</td><td class="column-3">STAND 8 Technology Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1209 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f0d1a1b1b063f121e110b0d1e0b1a1c171110511c1012">Reddy </a></td><td class="column-2">Senior Director HR &amp; Operations</td><td class="column-3">Mantra</td><td class="column-4">India</td>
</tr>
<tr class="row-1210 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#017364646f602f63606b606b41726e6d7764736c686f65722f626e6c">Reena Bajaj</a></td><td class="column-2">Head Of Transformation - Human Resources</td><td class="column-3">Solverminds Solutions &amp; Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1211 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#354750505b54755854415059595c5a1b565a58">Reena Bhansali</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Matellio</td><td class="column-4">India</td>
</tr>
<tr class="row-1212 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ff8d9a9a919ed189bf9e9b9e9196d19c9092">Reena Vijayanand</a></td><td class="column-2">Head HR - Data Center</td><td class="column-3">AdaniConneX</td><td class="column-4">India</td>
</tr>
<tr class="row-1213 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9f8888838c8cc39eaddbde808282839ec38e8280">Reenaa S</a></td><td class="column-2">Assistant Vice President - Human Resources</td><td class="column-3">63 moons Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1214 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6c4d3ded7d898d7d4d2dff6dddfc1dfc2d3d5de98d5d9db">Rehan Abdi</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">KiwiTech</td><td class="column-4">India</td>
</tr>
<tr class="row-1215 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd8f98959c939cd394939c90999c8fbd8e909c8f899894939ed39e9290">Rehana Inamdar</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">SMARTe</td><td class="column-4">India</td>
</tr>
<tr class="row-1216 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3446515f5c551a5a555d46745a55425d471a575b59">Rekha Nair</a></td><td class="column-2">Global Director People &amp; Culture</td><td class="column-3">Navis</td><td class="column-4">India</td>
</tr>
<tr class="row-1217 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90e2f5fbf8f1e0d0f3fff4f5f6ffe2f3f5bef3fffd">Rekha Poonacha</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">CodeForce 360</td><td class="column-4">India</td>
</tr>
<tr class="row-1218 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0674636b6f2870677c4675737463767463762865696b">Remi Vaz</a></td><td class="column-2">Associate Director-HR</td><td class="column-3">SurePrep LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1219 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e391868e8a9082cd878b8291a3938691808a93869186cd808c">Remisa Dhar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Percipere</td><td class="column-4">India</td>
</tr>
<tr class="row-1220 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87f5e2e9e6a9f4e8c7e2e9e3f2f5e6e9e4e2a9e4e8ea">Rena Soans</a></td><td class="column-2">Associate Director - HR Operations</td><td class="column-3">Newfold Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1221 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f0e7ece1fbaceae3e9e3ecebc2efe3ece7e9f6e7e1eaace1edef">Rency Hakani</a></td><td class="column-2">Head of HR (Mobile Team)</td><td class="column-3">ManekTech</td><td class="column-4">India</td>
</tr>
<tr class="row-1222 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483a2d26223d6626213c202126082a3a212c2f2d652f24272a2924662b2725">Renju Nithin</a></td><td class="column-2">Talent Acquisition Head</td><td class="column-3">Bridge Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1223 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#06746368732875746f70677572677067466761626772672865696b">Renu Srivastava</a></td><td class="column-2">India HR Head</td><td class="column-3">AGDATA, LP</td><td class="column-4">India</td>
</tr>
<tr class="row-1224 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e1938492898c80cf838e91808f8f80a18688938c889588cf828e8c">Reshma Bopanna</a></td><td class="column-2">AVP-Human Resources</td><td class="column-3">Girmiti Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1225 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#067463756e6b67286b696e67684661636b6f686f2b73752865696b">Reshma Mohan</a></td><td class="column-2">Director - People &amp; Culture</td><td class="column-3">Gemini Consulting &amp; Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1226 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a584f5c4b5e4243045c4f44414b5e4f59426a434858434e4d4f46464904494547">Revathi Venkatesh</a></td><td class="column-2">Head of HR</td><td class="column-3">iBridge</td><td class="column-4">India</td>
</tr>
<tr class="row-1227 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2456415245504c5d0a564140405d644348510a474b49">Revathy Reddy</a></td><td class="column-2">HR Director People and Workplace</td><td class="column-3">Glu Mobile</td><td class="column-4">India</td>
</tr>
<tr class="row-1228 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1e6c777d767f306e7f707a7b5e77707f6a7b7d76307d7173">Richa Pande</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Inatech</td><td class="column-4">India</td>
</tr>
<tr class="row-1229 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e44415d4b5e466e5e5b5c5e424b5a4f4245004d4143">Richie Joseph</a></td><td class="column-2">Director - Talent Development</td><td class="column-3">PurpleTalk</td><td class="column-4">India</td>
</tr>
<tr class="row-1230 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a0d2c9c4c8c9cdc1c7e0d0c8c1d2cdc1d2c1c3cb8ec3cfcd">Ridhima Gera</a></td><td class="column-2">Associate Director HR</td><td class="column-3">Pharmarack</td><td class="column-4">India</td>
</tr>
<tr class="row-1231 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b3a8aba8adefaaa0afafaeb5a981a8afa7aea3a4adb5efa2aeac">Rijil Kannoth</a></td><td class="column-2">VP, HR &amp; Operations</td><td class="column-3">Infobelt</td><td class="column-4">India</td>
</tr>
<tr class="row-1232 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd8f94909cbd909c8f928d928e89d39e9290">Rima Das</a></td><td class="column-2">Global Head &amp; Director of People and Culture</td><td class="column-3">Maropost</td><td class="column-4">India</td>
</tr>
<tr class="row-1233 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f98b928c928b9c9398b9899c95909a9897d79890">Rimpee Kukreja</a></td><td class="column-2">Global HR Head</td><td class="column-3">Pelican.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1234 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#26544f484d4f084149434a664e435049424752470845494b">Rinki Goel</a></td><td class="column-2">Director - HR</td><td class="column-3">Hevo Data</td><td class="column-4">India</td>
</tr>
<tr class="row-1235 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#22504b4c495741624e574f474e0c414d4f">Rinku Chauhan</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Lumel</td><td class="column-4">India</td>
</tr>
<tr class="row-1236 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a2b9a3b8b1b2b8bbb1bca2b190b3b5a4a0b1b9beb6bfa4b5b3b8feb3bfbd">Rishabh </a></td><td class="column-2">Recruitments Delivery Head</td><td class="column-3">CETPA Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1237 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9dbc0dac1c8cbc187c3c8c0c7e9c8c7cec8dbc887cac6c4">Rishabh Jain</a></td><td class="column-2">Head - Human Resource</td><td class="column-3">Angara E-Commerce</td><td class="column-4">India</td>
</tr>
<tr class="row-1238 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deacbfbaa8bfb0b79eaab6bbb9b1b2babbb0adb1abacbdbbf0bdb1b3">Ritesh Advani</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">GoldenSource</td><td class="column-4">India</td>
</tr>
<tr class="row-1239 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b3aba0b5a0afa081a5aea2aca0b5a8aeafefa2aeac">Ritika Jatana</a></td><td class="column-2">Director of HR</td><td class="column-3">Docmation</td><td class="column-4">India</td>
</tr>
<tr class="row-1240 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#21534855484a400f4b494061424e45444d4e464842590f424e4c">Ritika Jha</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Codelogicx</td><td class="column-4">India</td>
</tr>
<tr class="row-1241 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7c5dec3dedcd699dad6dbdfd8c3c5d6f7d3d8c3c7d299ded9">Ritika Malhotra</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">DotPe</td><td class="column-4">India</td>
</tr>
<tr class="row-1242 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c7e657865676d22626d6578646d62654c65626a636060656362226f6361">Ritika Naithani</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Infollion Research Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1243 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#780a110c0d5615191410170c0a1938021d15170b1714191a0b561b1715">Ritu Malhotra</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Zemoso Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1244 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#275548454e4967455255404248494e535409494253">Robin B</a></td><td class="column-2">Director Of Recruiting</td><td class="column-3">BURGEON IT SERVICES</td><td class="column-4">India</td>
</tr>
<tr class="row-1245 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e0928f82898ece8d8193938599a086899685938489878994818cce838f8d">Robin Massey</a></td><td class="column-2">Associate Director Talent Acquisition</td><td class="column-3">FiveS Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1246 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a6875787374346e7275777b695a7f79697c737434797577">Robin Thomas</a></td><td class="column-2">Global Human Resources Director</td><td class="column-3">ECS Fin</td><td class="column-4">India</td>
</tr>
<tr class="row-1247 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6d4c9cecfc8cfe6cfc8c8c9c4c9de88c5c9cb">Rohini G</a></td><td class="column-2">HR Head</td><td class="column-3">Innobox</td><td class="column-4">India</td>
</tr>
<tr class="row-1248 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#34465b5c5d5a5d1a4655505c555f465d475c5a555a745d50515547065d401a575b59">Rohini Radhakrishnan</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Ideas2IT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1249 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bbc9d4d3d2d5d295c9dad2fbcfdadac1dada95d8d4d6">Rohini Rai</a></td><td class="column-2">Director Employee Relations</td><td class="column-3">Taazaa Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1250 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#87f5e8efeee9eef0c7e9eef3e8f5eee9e1e8f3e2e4efa9e4e8ea">Rohini Wwagh</a></td><td class="column-2">Vice President &amp; Head HR</td><td class="column-3">Nitor Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1251 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a1d3cec9c8d58fcbc0c8cfe1cac0cdc4cdcec6c8d2d5c8c2d28fc2cecc">Rohit Jain</a></td><td class="column-2">AVP HR</td><td class="column-3">Kale Logistics Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1252 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#10627f787964507d797e74607f7f7c647573783e737f7d">Rohit Kalamkar</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Mindpool Technologies Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1253 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b293433322f753632352f34351b332b3232353875383436">Rohit Minton</a></td><td class="column-2">Group Vice President - Human Resources</td><td class="column-3">Health Prime</td><td class="column-4">India</td>
</tr>
<tr class="row-1254 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#88fae7e0e1fca6fbe1e6efe0c8eae4fdebe7efe6e1fce1e7e6a6e9e1">Rohit Singh</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">bluCognition</td><td class="column-4">India</td>
</tr>
<tr class="row-1255 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5426273d3a333c143d27272521352631303d3a377a373b39">Rohit Singh</a></td><td class="column-2">Senior Director Talent Acquisition and Management</td><td class="column-3">ISSQUARED,</td><td class="column-4">India</td>
</tr>
<tr class="row-1256 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86f4e9eaefa8f5efe8e1eec6f0e0eff5eaeda8e5e9eb">Roli Singh</a></td><td class="column-2">Head of HR</td><td class="column-3">VFI SLK</td><td class="column-4">India</td>
</tr>
<tr class="row-1257 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f3819c9c9b9add808a969792b3959c819690928087968192dd909c9e">Roohi </a></td><td class="column-2">Global Head of Human Resources</td><td class="column-3">ForecastEra</td><td class="column-4">India</td>
</tr>
<tr class="row-1258 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9be9f4f4ebfab5fcdbfaeef1fae8b5f8f4f6">Roopa Gangadharan</a></td><td class="column-2">Associate Director HRBP</td><td class="column-3">Aujas Cybersecurity</td><td class="column-4">India</td>
</tr>
<tr class="row-1259 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b9cbd6d6c9d897cbd8d3dccad1f9dbd6dbdad8cbdcca97dad6d4">Roopa Rajesh</a></td><td class="column-2">Head HR</td><td class="column-3">Bobcares</td><td class="column-4">India</td>
</tr>
<tr class="row-1260 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec9e83839c8d8085ac8d85988b80838e8d8085828fc28f8381">Roopali Srivastava</a></td><td class="column-2">Head - Human Resource</td><td class="column-3">AIT Global India</td><td class="column-4">India</td>
</tr>
<tr class="row-1261 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#442a252d366a362b372c252a043027376a272b29">Roshan Nair</a></td><td class="column-2">Associate Director HR</td><td class="column-3">Tata Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1262 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e3918c908b828dcd978b8c8e8290a38a958f879093cd808c8e">Roshan Thomas</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Innoval Digital Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1263 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#11637e62797f783f7b517f7465747f637872793f727e7c">Roshni J</a></td><td class="column-2">Director HR</td><td class="column-3">Netenric,</td><td class="column-4">India</td>
</tr>
<tr class="row-1264 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a6bba7bcbabdfaa794b5a4a0adfabdbb">Roshni S</a></td><td class="column-2">Head of People and Culture</td><td class="column-3">Apty</td><td class="column-4">India</td>
</tr>
<tr class="row-1265 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#176578646e397a7e63657657767b637e6264737663763974787a">Rosy Mitra</a></td><td class="column-2">Head Recruiter</td><td class="column-3">Altius</td><td class="column-4">India</td>
</tr>
<tr class="row-1266 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a08150354171b0e121f0d3a1b0b170e1f1912141516151d131f0954191517">Roy Mathew</a></td><td class="column-2">AQM Group Talent Head</td><td class="column-3">AQM Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1267 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9f82949e99828388ad8c8e8e988f84999ec38e8280">Roystone Fernandez</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Accubits Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1268 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deacabbca7f0bcbfb5adb79eb6bfacbcb7b0b9bbacb9acb1abaef0bdb1b3">Ruby Baksi</a></td><td class="column-2">Head Talent Engagement</td><td class="column-3">Harbinger Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1269 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e4c4b5d56577e5d525b5f4c5c574a105d5153">Ruchi Banerjee</a></td><td class="column-2">Head of People Engagement and Inclusion</td><td class="column-3">Clearbit</td><td class="column-4">India</td>
</tr>
<tr class="row-1270 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c6b4b3a5aeafe8a4a7b2b4a786a4a3a3b2a3aae8afa8">Ruchi Batra</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Beetel</td><td class="column-4">India</td>
</tr>
<tr class="row-1271 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e09295838889ce82888199818e89a08e85959492898e8f9485838893999394858d93ce838f8d">Ruchi Bhayani</a></td><td class="column-2">Director - HR &amp; Strategic Alliances</td><td class="column-3">Neutrino Tech Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1272 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9eecebfdf6f7deeeecf1fafbe6f0fbeab0fdf1f3">Ruchi Hr</a></td><td class="column-2">Head - HR &amp; Talent Acquisition</td><td class="column-3">ProdEx Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1273 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f1d1a0c070641050e06012f030608071b07001a1c0a06010b060e410c0002">Ruchi Jain</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Lighthouse Info Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1274 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#047671676c6d2a6965636b446b76656a63612a676b69">Ruchi Mago</a></td><td class="column-2">Head HR Shared Services International</td><td class="column-3">Orange Business Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1275 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cbb9bea8a3a28ba3aeaaafb8bba2a5e5a2a4">Ruchi Sharma</a></td><td class="column-2">Director, People &amp; Culture</td><td class="column-3">HeadSpin</td><td class="column-4">India</td>
</tr>
<tr class="row-1276 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cab8bfa9a2a3a1ab8ab8a5a5beafb8e4a3a5">Ruchika Chawla</a></td><td class="column-2">Head HR</td><td class="column-3">Rooter App</td><td class="column-4">India</td>
</tr>
<tr class="row-1277 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ee9c8581868287ae9a8f9a8fc08d8183">Ruchika Kohli</a></td><td class="column-2">Director HR (Technology and Product)</td><td class="column-3">Tata Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1278 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa888f999293919bd4899b8d92949f83ba9995979f8e99929b8ed4999597">Ruchika Sawhney</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">CometChat</td><td class="column-4">India</td>
</tr>
<tr class="row-1279 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e092958388899281ce87a0879285998f92818e8785ce838f8d">Ruchira Garg</a></td><td class="column-2">Vice President -People Operations</td><td class="column-3">GreyOrange</td><td class="column-4">India</td>
</tr>
<tr class="row-1280 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6210171203002218070c0d160b4c010d0f">Rupa Bang</a></td><td class="column-2">Senior Director, Talent Acquisition</td><td class="column-3">Zenoti</td><td class="column-4">India</td>
</tr>
<tr class="row-1281 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b9cbdbd8ded8dddddcd6f9d4d0dacbd6c9cbd6d0d7ddd0d897dad6d4">Rupali Bagaddeo</a></td><td class="column-2">Head - HR &amp; Admin</td><td class="column-3">Micropro Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1282 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6416111405080d4a120101160f051624060d10130d170103080b0605084a070b09">Rupali Veerkar</a></td><td class="column-2">Vice President / Head-HR</td><td class="column-3">Bitwise India</td><td class="column-4">India</td>
</tr>
<tr class="row-1283 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c7e797f646567697f64227e6d666962687e6d4c7864696b6d78697b6d756f637e7c226f6361">Rushikesh Rajendra</a></td><td class="column-2">CHRO</td><td class="column-3">Gateway Group of Companies</td><td class="column-4">India</td>
</tr>
<tr class="row-1284 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a080f090e15173a4b1f0b54191517">Rustom Taraporevala</a></td><td class="column-2">Director Talent Management</td><td class="column-3">eQ Technologic</td><td class="column-4">India</td>
</tr>
<tr class="row-1285 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f98a989b909798d7938c8f9c92988bb99a95968c9d989a8d909697d79a9694">Sabina Juvekar</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Cloudaction</td><td class="column-4">India</td>
</tr>
<tr class="row-1286 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a7b5b7b7bcbdbafabfb5b8bfb5b894a2b1a6a0b1acb3b8bbb6b5b8a7b1a6a2bdb7b1a7fab7bbb9">Sacchin Kalkal</a></td><td class="column-2">VP- Talent Acquisition</td><td class="column-3">Vertex Global Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1287 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd8e9c9e959493d39a948f9291919cbd898f949c8f8c95989c918995d39e9290">Sachin Girolla</a></td><td class="column-2">Chief People Officer</td><td class="column-3">TRIARQ Health India</td><td class="column-4">India</td>
</tr>
<tr class="row-1288 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb988a8f82c5839e98988a8285ab9882869b9b8799c5888486">Sadi Hussain</a></td><td class="column-2">Senior Manager Talent Acquisition (TA Head)</td><td class="column-3">Simpplr</td><td class="column-4">India</td>
</tr>
<tr class="row-1289 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95e6f4f2f4e7bbf4e7fafbf1f0fef4e7d5fffae6fde6faf3e1e2f4e7f0bbf6faf8">Sagar Arondekar</a></td><td class="column-2">Head HR</td><td class="column-3">Josh Software,</td><td class="column-4">India</td>
</tr>
<tr class="row-1290 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96e5f7f1f9e4fffdf7b8e5d6fff8e5eff8f5b8f5f9b8fff8">Sagorika Sanyal</a></td><td class="column-2">Vice President Talent Acquisition &amp; Management</td><td class="column-3">InSync Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1291 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f685979e979897b6829395869a9f8ed895999b">Sahana Ps</a></td><td class="column-2">Vice President - HR</td><td class="column-3">Tecplix Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1292 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7506141d1c195b061d14071814350714011012141c1b5b161a18">Sahil Sharma</a></td><td class="column-2">Global Head - Human Resources</td><td class="column-3">RateGain</td><td class="column-4">India</td>
</tr>
<tr class="row-1293 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0477656d2a664470617665776b6270736576612a676b69">Sai Banerjee</a></td><td class="column-2">Head HR</td><td class="column-3">Tera Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1294 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3c0d2da9dc7f3c0d2c1d2ddc0dbdaddd09dd0dcde">Sai Teja</a></td><td class="column-2">Head HR</td><td class="column-3">Saransh Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1295 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7407071506151a01341015001511171b1a1b190d5a1d1b">Sailaja Saranu</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">DATAECONOMY</td><td class="column-4">India</td>
</tr>
<tr class="row-1296 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f281939b9e8b84b294878687809b819f8697919a9c9d9e9d959b9781dc919d9f">Saily Vyas</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Futurism Technologies,</td><td class="column-4">India</td>
</tr>
<tr class="row-1297 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a293b303b34331a33636f3e3f2c74393537">Sajani Sodadasi</a></td><td class="column-2">Head HR</td><td class="column-3">i95Dev</td><td class="column-4">India</td>
</tr>
<tr class="row-1298 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d7e6c676479656c23636c647f4d6c63797f6c236e6260">Sajitha Nair</a></td><td class="column-2">Associate Vice President Human Resources</td><td class="column-3">Antra,</td><td class="column-4">India</td>
</tr>
<tr class="row-1299 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d7e6c667e65646c4d7a6463676479236e6260">Sakshi Agarwal</a></td><td class="column-2">AVP - Global Talent Acquisition</td><td class="column-3">Winjit Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1300 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7605171d051e1f581711041701171a3605191a1715130213151e18191a19111f1305581519581f18">Sakshi Agrawal</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Solace Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1301 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddaebcb6aeb5b4f3bab2a4bcb19db0a9a5bfefbff3beb2b0">Sakshi Goyal</a></td><td class="column-2">Director, People Operations &amp; Growth</td><td class="column-3">MTX Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1302 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#72011319011a1b5c061a171f13011913003211171b1c010b015c111d1f">Sakshi Themaskar</a></td><td class="column-2">Head of HR</td><td class="column-3">Ceinsys Tech</td><td class="column-4">India</td>
</tr>
<tr class="row-1303 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b9cad4d8d7d6d1d8cbf9dadddacad6dfcdced8cbdc97dad6d4">Sam Manohar</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">CDC Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1304 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85f6e4e8e4f1ede4f7c5ece1e0fce4e9e4e7f6abe6eae8">Samatha R</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">ideyaLabs</td><td class="column-4">India</td>
</tr>
<tr class="row-1305 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#552634383030277b31303a15273c343431233c263a272c7b363a38">Sameer Deo</a></td><td class="column-2">Head of HR and Operations</td><td class="column-3">RIA Advisory</td><td class="column-4">India</td>
</tr>
<tr class="row-1306 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f5c4e424a4a5d01454e4b474e596f5b4e59465c4c4e014c4042">Sameer Jadhav</a></td><td class="column-2">Head &amp; Vice President Recruitment</td><td class="column-3">Tavisca</td><td class="column-4">India</td>
</tr>
<tr class="row-1307 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#255644484040570b4e50484457654054504c43445d0b464a48">Sameer Kumar</a></td><td class="column-2">AVP - Talent Acquisition</td><td class="column-3">Equifax India</td><td class="column-4">India</td>
</tr>
<tr class="row-1308 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c0f0f1d111d12083c131112151f131b0e13090c521f1311">Sameer Samant</a></td><td class="column-2">AVP - Compensation Control and Payroll Processing</td><td class="column-3">Looking for Opportunities</td><td class="column-4">India</td>
</tr>
<tr class="row-1309 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86f5e7ebe3e3f4e7a8e5eee9f1e2f4ffc6e4f4e7efe8eaffa8e5e9eb">Sameera Chowdry</a></td><td class="column-2">Director, People &amp; Culture - India</td><td class="column-3">Brainly</td><td class="column-4">India</td>
</tr>
<tr class="row-1310 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ae9fbf7f3fef2fbb4ecfbe8fbfef1fbe8daaca9f7f5f5f4e9b4f9f5f7">Samidha Varadkar</a></td><td class="column-2">Asst. Vice President - Human Resources</td><td class="column-3">63 moons Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1311 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a495b575348145e5255545e7a534e4e535b5714595557">Samir Dhond</a></td><td class="column-2">Chief PeopleOfficer</td><td class="column-3">Ittiam Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1312 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f1c0e02061d41020a071b0e2f1c04060303420206010a410c0002">Samir Mehta</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Skillmine Technology Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1313 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483b29262b20293a2108382724312f2726663c2d2b20262724272f31">Sanchari </a></td><td class="column-2">Vice President - HR Finance</td><td class="column-3">Polygon</td><td class="column-4">India</td>
</tr>
<tr class="row-1314 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4c7d5dad7dcddc7f4d2ddd2c0cdd2ddc2d1c0d1d7dc9adddb">Sanchi Saxena</a></td><td class="column-2">Head of HR</td><td class="column-3">FiftyFive Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1315 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#66150708050e0f120748050e070d1407040914121f2607151503120708070a1f120f1e4805090b">Sanchita Chakraborty</a></td><td class="column-2">Head HR</td><td class="column-3">Asset Analytix</td><td class="column-4">India</td>
</tr>
<tr class="row-1316 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98f9fcf7e8ebd8e8f0f7fdf6f1e0ebf7feeceff9eafdebb6f1f6">Sandeep Jaiswal</a></td><td class="column-2">Head - Performance Delivery</td><td class="column-3">Phoenix Advanced Softwares</td><td class="column-4">India</td>
</tr>
<tr class="row-1317 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#22514c434b5062414356414a524d4b4c560c414d4f">Sandhya Nair</a></td><td class="column-2">Director - HR</td><td class="column-3">Catchpoint</td><td class="column-4">India</td>
</tr>
<tr class="row-1318 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5221333c363a2b3312213b3c35212b217c313d3f">Sandhya Tripathi</a></td><td class="column-2">Director(HR and Administration)</td><td class="column-3">Singsys Pte</td><td class="column-4">India</td>
</tr>
<tr class="row-1319 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#285b49464c41584a68585a4c5046064b4745">Sandip Bhise</a></td><td class="column-2">Head of People Operations and Human Resources</td><td class="column-3">Axioned</td><td class="column-4">India</td>
</tr>
<tr class="row-1320 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#582b39363c3128762a3932183b303d3d2a2b3136763b3735">Sandip Raj</a></td><td class="column-2">AVP - Talent Acquisition &amp; Engagement</td><td class="column-3">Cheers Interactive</td><td class="column-4">India</td>
</tr>
<tr class="row-1321 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e7948689838e978689c98c8695a7938f828086938290869e84889597c984888a">Sandipan Kar</a></td><td class="column-2">Director Operations &amp; Director Human Resources</td><td class="column-3">Gateway Group of Companies</td><td class="column-4">India</td>
</tr>
<tr class="row-1322 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#285b49464f4d4d5c49065c49464c474668414746414c4d49064b4745">Sangeeta Tandon</a></td><td class="column-2">Director HR</td><td class="column-3">IonIdea</td><td class="column-4">India</td>
</tr>
<tr class="row-1323 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bac9dbd4dddfdfced2dbd8fac9d3deddc994d9d5d7">Sangeetha Bodduna</a></td><td class="column-2">Engineering Recruiter &amp; Head of Recruitments</td><td class="column-3">SID Global Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1324 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6310020d040606170b0223050c001610100c05170d06174d000c0e">Sangeetha Jalkam</a></td><td class="column-2">Head HR</td><td class="column-3">Focus Softnet</td><td class="column-4">India</td>
</tr>
<tr class="row-1325 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8efdfce1f7ceefeffee0efe7e0e8e1faebede6a0ede1e3">Sanghamitra Roy</a></td><td class="column-2">Head HR Admin</td><td class="column-3">AAPNA Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1326 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ccbfada2aba5b8ade2a2ada5be8caeb9b5a9beaaa3bea9bfa5aba4b8e2afa3a1">Sangita Nair</a></td><td class="column-2">Director - HR</td><td class="column-3">BuyerForesight</td><td class="column-4">India</td>
</tr>
<tr class="row-1327 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ec9f8d8285878dc28d9e839e8dac9c859e85c28d85">Sanika Arora</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Secomind.AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1328 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8dbdbc1c6cfc0e8c1c686dac586cbc7c5">Sanitha Singh</a></td><td class="column-2">Chief People Officer</td><td class="column-3">RM Education Solutions India.</td><td class="column-4">India</td>
</tr>
<tr class="row-1329 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6013010e0a01194e0308010e04050c200a0f16050f4e030f0d">Sanjay Chandel</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Joveo</td><td class="column-4">India</td>
</tr>
<tr class="row-1330 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bdcedcd3d7dcc4d7fdc7d8d3d2c9d493ded2d0">Sanjay Jengiti</a></td><td class="column-2">Director - Finance &amp; HR</td><td class="column-3">Zenoti</td><td class="column-4">India</td>
</tr>
<tr class="row-1331 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3f4c5e51555e4611525e4c575a4d5a7f515a5253115651">Sanjay Mashere</a></td><td class="column-2">Asst. Vice President - Human Resource</td><td class="column-3">NCDEX e Markets</td><td class="column-4">India</td>
</tr>
<tr class="row-1332 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f1c0e01050e164102061d0c070e010b0e01062f1c1b1b0a030a020a0b060e080b0c410601">Sanjay Mirchandani</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">ST Telemedia Global Data Centres</td><td class="column-4">India</td>
</tr>
<tr class="row-1333 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4635352e27282b332127332b062529283234292a252735236825292b">Sanjay Shanmugaum</a></td><td class="column-2">Vice President - Global Head  - HR &amp; Admin</td><td class="column-3">ControlCase</td><td class="column-4">India</td>
</tr>
<tr class="row-1334 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5d6c4cbcfc4dcd3e5dfc0cbccd1cdd6cac3d18bc6cac8">Sanjay V</a></td><td class="column-2">Head-Human Resource</td><td class="column-3">Zenith Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1335 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c2f3d32363939283d1c30393d2e3235323b2f2c352e3d30723f33723532">Sanjeeta Mohta</a></td><td class="column-2">Head of Talent &amp; Finance</td><td class="column-3">Learning Spiral</td><td class="column-4">India</td>
</tr>
<tr class="row-1336 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cebdafa0a4ababb8e0aaa6a1a5baab8eafadada1bebde0ada1a3">Sanjeev Dhokte</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">Accops Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1337 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0370626d696666752d68766e62714367716a706b6a6d656c2d606c6e">Sanjeev Kumar</a></td><td class="column-2">Director(HR and Special Projects)</td><td class="column-3">Drish Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1338 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bac9dbd4d0dfdfcc94c8dbd4dbfad9c8dfc9cedfd9d2c9d5dccecddbc8df94d9d5d7">Sanjeev Rana</a></td><td class="column-2">AVP HR</td><td class="column-3">Crestech Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1339 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7e0d1f10141b1b0850081b0c131f3e0d0a0a1b121b131b1a171f191a1d501710">Sanjeev Verma</a></td><td class="column-2">Sr. Vice President - HR, CS &amp; EHS</td><td class="column-3">ST Telemedia Global Data Centres</td><td class="column-4">India</td>
</tr>
<tr class="row-1340 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#275446494d524c534609454e5450465467464b40485048554c540944484a">Sanjukta Biswas</a></td><td class="column-2">HR Head</td><td class="column-3">Algoworks</td><td class="column-4">India</td>
</tr>
<tr class="row-1341 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8af9e4ebfee2cae7ebe9f8e5f9e5ecfee3e4e9a4e9e5e7">Sankar Nath</a></td><td class="column-2">Director - US Recruitment</td><td class="column-3">Macrosoft</td><td class="column-4">India</td>
</tr>
<tr class="row-1342 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#592a3837323c2d31772b19382c2d362b383b302d773a3634">Sanketh Ramkrishnamurthy</a></td><td class="column-2">Head HR</td><td class="column-3">AutoRABIT</td><td class="column-4">India</td>
</tr>
<tr class="row-1343 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d2a1b3bca6bda1ba92bab7aab3b5bdbcb5bebdb0b3befcbbbc">Santosh Badarinath</a></td><td class="column-2">Head - HR</td><td class="column-3">Hexagon Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1344 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3c0d2ddc7dcc0dbf3d2d4dadfd6d0c1de9dd0dcde">Santosh Gopineni</a></td><td class="column-2">Director Human Resources Information Technology</td><td class="column-3">Agile CRM</td><td class="column-4">India</td>
</tr>
<tr class="row-1345 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7300121d071c001b5d18121e111f1633101f12011a1c1d0716101b1d1c1f1c141a16005d101c5d1a1d">Santosh Kamble</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Clarion Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1346 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9e8c8399829e85c39d9f8c878c9d8c9984ad9e8c8a8a8897978cc38e8280">Santosh Prajapati</a></td><td class="column-2">Talent Acquisition Head</td><td class="column-3">Saggezza</td><td class="column-4">India</td>
</tr>
<tr class="row-1347 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8bba9a6bca7bba0e6bb88bcada4ada5a9bca1abbbfcbde6aba7a5">Santosh Sakhare</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Rane t4u</td><td class="column-4">India</td>
</tr>
<tr class="row-1348 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d5a6b4bba1baa6bdfba6bcbbb2bd95a6b6bcbeb0acfbb4bc">Santosh Singh</a></td><td class="column-2">Director - Talent Solutions</td><td class="column-3">SCIKEY</td><td class="column-4">India</td>
</tr>
<tr class="row-1349 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c6b5a7a8bfa7e8a8a7a1b6a7aa86aaa3a3a8a7e8a7af">Sanya Nagpal</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Leena AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1350 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#81f2e0f1e0efe0aff2f4f3e4f2e9c1f5f3e8fbe4f5f5eeafe2eeec">Sapana Suresh</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">AST LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1351 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe8d9f8e909fbe9d919a979099939f8c8ad09d9193">Sapna Soni</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Codingmart Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1352 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#addeccddc3cc83ded8c6c5dfccc3c4edc0c4c1c8dedec2cbd983cec2c0">Sapna Sukhrani</a></td><td class="column-2">Head HR</td><td class="column-3">EbixCash Financial Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1353 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483b29382629663e2d3a252908253c302a7a2a662b2725">Sapna Verma</a></td><td class="column-2">Director - Talent Engagement and Growth</td><td class="column-3">MTX Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1354 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dba8baa9bab9b1bebeaff5bcb2b7b79bb8b7b4aebfb6b4a2b4f5b8b4b6">Sarabjeet Gill</a></td><td class="column-2">Associate Director - HR and Talent Acquisition</td><td class="column-3">CloudMoyo</td><td class="column-4">India</td>
</tr>
<tr class="row-1355 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#740715061510155a1f151a10151a0106341f1b06115a171b19">Sarada Kandanur</a></td><td class="column-2">Senior Director - HR &amp; Recruitment</td><td class="column-3">Kore.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1356 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c4f5d4e5d5412565354527c5352595d4e5f544b595050125f5351">Sarah John</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Archwell</td><td class="column-4">India</td>
</tr>
<tr class="row-1357 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a594b584b595d4b5e42436a5c4b595f4e424b43414b04444f5e">Saraswathi Rajasekhar</a></td><td class="column-2">Director-People Operations</td><td class="column-3">Vasudhaika Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1358 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8af9ebf8ebfee2a4fccae3e4f9efe7e3feefe9e2a4e9e5e7">Sarath V</a></td><td class="column-2">Associate Director-HR</td><td class="column-3">Insemi Technology Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1359 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb889a899a8d9a959a908e969a89bb9894899e8894978e8f92949588929598d5989496">Saravana Kumar</a></td><td class="column-2">Head - Human Resource and Administration</td><td class="column-3">Core Solutions,</td><td class="column-4">India</td>
</tr>
<tr class="row-1360 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#493a39282d242827282b212827092a263b2c3a26253c3d2026273a20272a672a2624">Saravana Padmanabhan</a></td><td class="column-2">Head - Human Resource and Administration</td><td class="column-3">Core Solutions,</td><td class="column-4">India</td>
</tr>
<tr class="row-1361 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#245745564552454a454a0a49515645484d404c4556454a644e454a41570a474b49">Saravanan Muralidharan</a></td><td class="column-2">Director HR</td><td class="column-3">Janes</td><td class="column-4">India</td>
</tr>
<tr class="row-1362 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb988a998a9d8a858a85c59f8382858a8c8a998a988a8692ab82869b828c8e999f8e8883c5888486">Saravanan Thinagarasamy</a></td><td class="column-2">President HR l CHRO</td><td class="column-3">Impiger Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1363 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#afdcd9ced5caefc2c0c1dbddcec181ccc0c2">Sarieka Vaze</a></td><td class="column-2">Head - Human Resources &amp; Administration</td><td class="column-3">Montran Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-1364 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8efdeffce7faefcee0effdfdede1e3a0e7e0">Sarita Chaudhary</a></td><td class="column-2">Deputy Director-HR</td><td class="column-3">NASSCOM</td><td class="column-4">India</td>
</tr>
<tr class="row-1365 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d0e1c0f14091c530e14131a153d1a1c10180e4f49054a531e1210">Sarita Singh</a></td><td class="column-2">Associate Director- Talent Acquisition</td><td class="column-3">Games24x7</td><td class="column-4">India</td>
</tr>
<tr class="row-1366 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9be8fae9f4f1b5efe9f2ebfaeff3e2dbf6eeedf2b5f8f4f6">Saroj Tripathy</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Muvi.com</td><td class="column-4">India</td>
</tr>
<tr class="row-1367 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4b382a382a2520653b2a252f2e320b232e3d242f2a3f2a65282426">Sasank Pandey</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Hevo Data</td><td class="column-4">India</td>
</tr>
<tr class="row-1368 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bf8eaf8e2e0eae7eaa5fdeeefeae6cbfbf9e4fceef8f8f8e4edffa5e8e4e6">Sasikala Vedam</a></td><td class="column-2">Head of Talent Acquisition &amp; Resource Management</td><td class="column-3">Prowess Software Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1369 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a5b5bebfb8b8b7bfb7be96afb9b2bab3b3f8b5b9bb">Sathish Chinnaiah</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Envestnet</td><td class="column-4">India</td>
</tr>
<tr class="row-1370 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7b081a0f1312081355100e161a093b0d1a171c1e151e08120855181416">Sathish Kumar</a></td><td class="column-2">Human Resources Director</td><td class="column-3">ValGenesis</td><td class="column-4">India</td>
</tr>
<tr class="row-1371 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a2d1c3d6cadbc3d2d0c3c9c3d1ca8cd1c7c9c3d0c3cce2c3cfccc7d68fd1dbd1d6c7cfd18cc1cdcf">Sathya Sekaran</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Amnet Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1372 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e4d5f4a56475f505f4c5f475f505f507e5d0f5b465d565f50595b105d5153">Sathyanarayanan Reddipalli</a></td><td class="column-2">Head HR &amp; Talent Acquisition</td><td class="column-3">C1X</td><td class="column-4">India</td>
</tr>
<tr class="row-1373 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3e4d554b535f4c7e52574f4b575a564b5c105d5153">Satishh Kumar</a></td><td class="column-2">Associate Director-Talent Acquisition</td><td class="column-3">LiquidHub</td><td class="column-4">India</td>
</tr>
<tr class="row-1374 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#790a180d001812390e10151a160a160c0b1a1c571a1614">Satya Kundurthi</a></td><td class="column-2">Director/Head HR</td><td class="column-3">Wilco Source</td><td class="column-4">India</td>
</tr>
<tr class="row-1375 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#433022373a222d31223a222d226d300321212e6d202c2e">Satyanrayana S</a></td><td class="column-2">Group Head Human Resources- BBM Group</td><td class="column-3">BBM</td><td class="column-4">India</td>
</tr>
<tr class="row-1376 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#91e2f0e5e8f4fff5e4bffff0f8fad1faf2e2f8e5f6fdfef3f0fdbff2fefc">Satyendu Naik</a></td><td class="column-2">AVP - People &amp; Culture</td><td class="column-3">Krish Compusoft Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1377 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90e3f1e4e9fff4f1f9befbe2ffe6f9d0f5fbf1a1bef3fffd">Satyodai Krovi</a></td><td class="column-2">Director, Global Talent Acquisition</td><td class="column-3">Eka Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1378 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b584a5e4f05514a4d4a596b594a524f4e4542455f4e594a485f425d4e05484446">Saud Zafar</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Rayden Interactive</td><td class="column-4">India</td>
</tr>
<tr class="row-1379 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#225143574f5b430c514b4c454a624349434e4b4c444d515b510c414d4f">Saumya Singh</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Akal Information Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1380 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#60130115120102084e0a01040801162013150d051215130f0c1514090f0e134e030f0d">Saurabh Jadhav</a></td><td class="column-2">Head - India HR, IT, InfoSec &amp; Administration</td><td class="column-3">SUMERU SOFTWARE SOLUTIONS</td><td class="column-4">India</td>
</tr>
<tr class="row-1381 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93e0fffafcfdd3f0e6e1fcfffcf4faf0bdf0fcfe">Saurabh Lion</a></td><td class="column-2">Director - Talent Management</td><td class="column-3">iauro Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1382 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e89b899d9a898a8085a89c899c8981869c8d9a898b9c819e8dc68b8785">Saurabh Mittal</a></td><td class="column-2">Head - E-Performance Support Systems</td><td class="column-3">MPS Interactive Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1383 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cab9abbfb8aba8a2e4b9b8a3bcabb9beabbcabab8ab9beafa6a6abb8a3a4aca5e4a9a5a7">Saurabh Srivastavaa</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Stellar Information Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1384 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#502331252231267e23313e29313c1023253e3c3936357e333f3d">Saurav Sanyal</a></td><td class="column-2">Director Total Rewards &amp; People Services</td><td class="column-3">Sun Life</td><td class="column-4">India</td>
</tr>
<tr class="row-1385 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a3bbb1a2b1bea4b890b9a0b1a3a3feb3bfbd">Savitha Karanth</a></td><td class="column-2">Head HR</td><td class="column-3">iPass</td><td class="column-4">India</td>
</tr>
<tr class="row-1386 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#077466716e736f6629754764686b687573686c6269742964686a">Savitha R</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">ColorTokens</td><td class="column-4">India</td>
</tr>
<tr class="row-1387 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#40332139212e34296e33002e29342f32292e262f342523286e232f2d">Sayanti S</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Nitor Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1388 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a392b332f382b2764282b262b213f272b380a382f2c262f293e2325243923242c253964292527">Sayeram Balakumar</a></td><td class="column-2">Head of Talent Acquisition &amp; Sourcing</td><td class="column-3">Reflections Info Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1389 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5f373e323a3a3b1f352a312b2d3e312b3a3c37713c3032">Sayyed Hameed</a></td><td class="column-2">VP - Operations &amp; HR</td><td class="column-3">Juntran Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1390 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8cbdddad9cbccd1d9d696cad7dccad1dfcdddc2f8d6ddccdbd7cadd96dbd796d1d6">Sebastian Rodriguez</a></td><td class="column-2">Vice President &amp; Global Head - Talent</td><td class="column-3">Netcore Cloud</td><td class="column-4">India</td>
</tr>
<tr class="row-1391 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9daccccc4c8e9c1ccd9ddc8cec6c787c0c7">Seema Natarajan</a></td><td class="column-2">Assistant Vice President - HR</td><td class="column-3">Heptagon Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1392 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#611204040c004f12080f0609211208061514110d044f020e0c">Seema Singh</a></td><td class="column-2">Head of HR</td><td class="column-3">SigTuple</td><td class="column-4">India</td>
</tr>
<tr class="row-1393 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8bbada4bea1e6afa9a6a9b8a9bca0a188bca9a4ada6bca1aba9e6aba7a5">Selvi Ganapathi</a></td><td class="column-2">Head HRBP and HR Ops</td><td class="column-3">Talentica Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1394 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f4879c9593819ada969c819a979c9598b49995939d9791908091979cda979b99">Shagun Bhunchal</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Magic EdTech</td><td class="column-4">India</td>
</tr>
<tr class="row-1395 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#74071c1b151d165a071c151c341618150e111718151a5a171b19">Shah Shoaib</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Blazeclan Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1396 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5e2d363f363b3a1e2f2b3f3a2c3f302a2c3b2d312b2c3d3b703d3133">Shahed Akhter</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Quadrant Resource</td><td class="column-4">India</td>
</tr>
<tr class="row-1397 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3f4c575e575a5a517f4f4d505b5a495e514c115c5052">Shaheen Malim</a></td><td class="column-2">VP â€“ HR &amp; Operations</td><td class="column-3">Prodevans Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1398 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#98ebf0f9f1f4b6e8f9eaf9ebf0f9ead8ecfdebecf1f6ffe0e8fdeaecebb6fbf7f5">Shail Parashar</a></td><td class="column-2">Director HR</td><td class="column-3">TestingXperts</td><td class="column-4">India</td>
</tr>
<tr class="row-1399 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d4a7bcb5bdb8b1bab0b1a694b6a1b0b0bdfab5bd">Shailender Nr</a></td><td class="column-2">Director Of Operations and HR</td><td class="column-3">BUDDI AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1400 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#41322920282d2432296f23202f20242435012f28352e33282f272e352422296f222e2c">Shailesh Banaeet</a></td><td class="column-2">Associate Director - People Function</td><td class="column-3">Nitor Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1401 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bf8e3eae2e7eef8e3cbe6e2f9eaedf9eaa5e8e4e6">Shailesh Jadhav</a></td><td class="column-2">Vice President and Global Head -  HR</td><td class="column-3">Mirafra Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1402 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#02716a636b6e6b2c76706b7467666b42746d6e636c717b712c616d6f">Shaili Trivedi</a></td><td class="column-2">Head - Talent Management and RMG</td><td class="column-3">VOLANSYS</td><td class="column-4">India</td>
</tr>
<tr class="row-1403 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#81f2e9e0eae4e4edc1ece0f5e2e9f1eee8eff5f2eeedf4f5e8eeeff2afe2eeec">Shakeel Yalgod</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">MatchPoint Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1404 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4b7aca5a8a5afa5eaafabb0aca5b3a5a8a184a6adbeaba9eaa7aba9">Shalaka Kothawle</a></td><td class="column-2">Head - HR</td><td class="column-3">Bizom</td><td class="column-4">India</td>
</tr>
<tr class="row-1405 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d0e14131a15530e151c111413143d0f0511121a1405531e1210">Shalini </a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">RxLogix</td><td class="column-4">India</td>
</tr>
<tr class="row-1406 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cbb8a3aaa7a2a5a2a98bb8a2b3b8aaa2a7b8e5a8a4a6">Shalini Bhasin</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">SixSails</td><td class="column-4">India</td>
</tr>
<tr class="row-1407 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f2819a939e9b9c9bb29b9c86979e9795939b9cdc919d9f">Shalini Chopra</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Intelegain Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1408 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ddaeb5bcb1b4b3b4f3b9b4afb8bea9b2af9dbcbebeb8b1bcb1adb5bcf3beb2b0">Shalini Director</a></td><td class="column-2">Head Of Human Resources - Asia Pacific</td><td class="column-3">Accelalpha</td><td class="column-4">India</td>
</tr>
<tr class="row-1409 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a69727b76737473347d7b68767b6a7b7676635a7e7b6e7b73746e7f7469736e6334797577">Shalini Garlapally</a></td><td class="column-2">Director - HR</td><td class="column-3">Data Intensity</td><td class="column-4">India</td>
</tr>
<tr class="row-1410 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bf8e3eae7e2e5e2a5e1eae6eef8cbefeefafeeea5e8e4e6">Shalini James</a></td><td class="column-2">Associate Director Human Resources &amp; Operations</td><td class="column-3">Deque Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1411 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#80f3e8e1ece9eee9c0e5f2e5ece5e7efaee3efed">Shalini Lal</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">eReleGo Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1412 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#23504b424f4a4d4a0d5342574b4248634251484a4d454c0d4a4d">Shalini Pathak</a></td><td class="column-2">Head- People Services</td><td class="column-3">ARK Infosolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1413 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9deef5fcf1e8b3fef5f4f3fcf4ddf4f3f9f4fcf3f4feb3fef2f0">Shalu Chinai</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">IndiaNIC Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1414 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e3908b828e818b82958acd908b82918e82a38d869b95828fcd808c8e">Shambhavi Sharma</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Nexval Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1415 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#04776c65696d6f652a6f71686f65766a6d446d6a627665666165702a676b69">Shamika Kulkarni</a></td><td class="column-2">HR &amp; Operations Head</td><td class="column-3">InfraBeat Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1416 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#74071c15191d00155a1a151a101d34191e011a17001d1b1a5a1d1a">Shamita Nandi</a></td><td class="column-2">Head of HR</td><td class="column-3">mjunction services</td><td class="column-4">India</td>
</tr>
<tr class="row-1417 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c3f242d21202562273e253f24222d220c2f2023392821233523622f2321">Shamli Krishnan</a></td><td class="column-2">Associate Director  - Talent Acquisition</td><td class="column-3">CloudMoyo</td><td class="column-4">India</td>
</tr>
<tr class="row-1418 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8ffce7eee2e1eea1e3e6edfacfe1eee6ece0e6fbfca1ece0e2">Shamna Libu</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Naico ITS</td><td class="column-4">India</td>
</tr>
<tr class="row-1419 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#55263d3438267b21343727302f1530313c213a273c34393c26212c2d7b363a38">Shams Tabrez</a></td><td class="column-2">Director People &amp; Culture</td><td class="column-3">Editorialist</td><td class="column-4">India</td>
</tr>
<tr class="row-1420 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#403328212e296e32212d212b322933282e212e0032293425332f2634372132256e232f2d">Shani Ramakrishnan</a></td><td class="column-2">Vice President - Global Talent Acquisition</td><td class="column-3">Rite Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1421 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52213a333c3933207c3612203b2637213d3426253320377c313d3f">Shankar Darna</a></td><td class="column-2">AVP-Talent Acquisition</td><td class="column-3">Rite Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1422 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#710219101f0519185f10131008101c31021e1d0714031c181f15025f121e1c">Shanthi Abayam</a></td><td class="column-2">HR Head</td><td class="column-3">Solverminds Solutions &amp; Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1423 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#215249405340450f5253485740525540574061434d544c44464d4e43404d0f424e4c">Sharad Srivastava</a></td><td class="column-2">Senior Director-HR</td><td class="column-3">Blume Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1424 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6112090013000f18004f0621020e0f020e13054f0f0415">Sharanya Govind</a></td><td class="column-2">Director - Human Resources (India)</td><td class="column-3">Concord Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1425 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#384b50594a594c1655785e514e5d4b5c515f514c5954165b5755">Sharat M</a></td><td class="column-2">Associate Director HR</td><td class="column-3">FiveS Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1426 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d1e050c1f04060c430f050c1919082d1e1d040e081a021f061e430e0200">Sharika Bhatte</a></td><td class="column-2">Associate Practice Director, Human Resources</td><td class="column-3">Spiceworks Ziff Davis</td><td class="column-4">India</td>
</tr>
<tr class="row-1427 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7fcf5e6f9f5e6d4f7fbf0f1f2fbe6f7f1baf7fbf9">Sharma Rohit</a></td><td class="column-2">Head of Client &amp; Talent Acquisition</td><td class="column-3">CodeForce 360</td><td class="column-4">India</td>
</tr>
<tr class="row-1428 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7fcf5e6f9fdf8f5d4e0f5f8f1fae0e4f8fbedf1e6baf7fbf9">Sharmila Yadav</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">TALENTPLOYER</td><td class="column-4">India</td>
</tr>
<tr class="row-1429 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#51223930233c383d30307f3a1134273e3d36343f32347f323e3c">Sharmilaa Kannan</a></td><td class="column-2">Vice President- HR &amp; Customer Success</td><td class="column-3">Evolgence Telecom Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1430 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e89b80899a8786c6858986898487879aa884819c859d9bdfc68b8785">Sharon Manaloor</a></td><td class="column-2">Head of Strategic Talent Acquisition</td><td class="column-3">Litmus7</td><td class="column-4">India</td>
</tr>
<tr class="row-1431 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e5968d84978a8bcb8b8497848b82a5928c87888acb868a88">Sharon Narang</a></td><td class="column-2">Head of HR</td><td class="column-3">Wibmo</td><td class="column-4">India</td>
</tr>
<tr class="row-1432 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8efde6effce1e0a0e0e7e4e6eff9efe0ceeae2fae2efecfda0e7e1">Sharon Nijhawan</a></td><td class="column-2">Head of HR</td><td class="column-3">DLT Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1433 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f7ece5f6f2e5f6edaae8edeae3e5fde5f0c4e9ede8e1f7f7ebe2f0aae7ebe9">Sharvari Lingayat</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">EbixCash Financial Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1434 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb98838a999c8a9982c598838a83ab998e9d8c9e999e98c5888486">Sharwari Shah</a></td><td class="column-2">Director Human Resources</td><td class="column-3">RevGurus Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1435 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f88b90998b90999693d68bb88a9d8894919b9796d69b9795">Shashank Shekher</a></td><td class="column-2">Head Of Talent Acquisition</td><td class="column-3">Replicon</td><td class="column-4">India</td>
</tr>
<tr class="row-1436 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89fae1e8fae1e0a7ede1e8fbc9fae4e8fbfde0e4faa7eae6e4">Shashi Dhar</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Smart IMS</td><td class="column-4">India</td>
</tr>
<tr class="row-1437 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb88939a889392909a958f9abb989e979894968894978e8f92949588d5989496">Shashikant Acharya</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Celcom Solutions Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1438 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfacb7beacb7b69fb2aab3abb6bcb0adbaa8beadbab6b1bcf1bcb0b2">Shashikanth Jayaraman</a></td><td class="column-2">Vice President - Global Human Resources</td><td class="column-3">MulticoreWare Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1439 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a0d3c8c1d3c8d7c1d48ecdc9d4d4d2c1e0d5d2c2c1ceccc1c4c4c5d28ec3cfcd">Shashwat Mittra</a></td><td class="column-2">Head - Talent</td><td class="column-3">Urban Ladder</td><td class="column-4">India</td>
</tr>
<tr class="row-1440 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a5beb7a0b3b3f8a596b7bab1b9b8b9bbaff8b5b9bb">Shavee Sehajpal</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Algonomy</td><td class="column-4">India</td>
</tr>
<tr class="row-1441 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cdbea5a8a8a3ace3a0aca1a5a2b9bfac8da3a8b9bea0acbfb9b7e3aea2a0">Sheena Malhotra</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Netsmartz</td><td class="column-4">India</td>
</tr>
<tr class="row-1442 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6615040f1511071526050901080f12131505090815130a120f08014805090b">Sheetal Biswas</a></td><td class="column-2">HR - Global Head (CHRO)</td><td class="column-3">Cognitus</td><td class="column-4">India</td>
</tr>
<tr class="row-1443 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a39222f2f3e2b26642e2f3922273f21220a2925243e382b293e3a252e2b2364292527">Sheetal Deshmukh</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">ContractPodAi</td><td class="column-4">India</td>
</tr>
<tr class="row-1444 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#76051e131302171a3611171b13190613121f175815191b">Sheetal Katari</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Gameopedia</td><td class="column-4">India</td>
</tr>
<tr class="row-1445 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#493a212c2c3d28256739263d2c093a283f2028273d2a26273a3c253d20272e672a2624">Sheetal Pote</a></td><td class="column-2">VP of Human Resources</td><td class="column-3">Saviant Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1446 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4b7aca1a1b0a5a8eab7a5b3a5aab084a5a1b6ada1b7b0a1a7acaaaba8aba3bdeaa7aba9">Sheetal Sawant</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Aeries Technology Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1447 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f182999497909d98b195889f81839e989f959890df929e9c">Shefali Lall</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">DynPro,</td><td class="column-4">India</td>
</tr>
<tr class="row-1448 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a7d4cfc2cbd3c8c989c5e7c4dec9c2d3d4ded4d3c2cad489c4c8ca">Shelton Banerjee</a></td><td class="column-2">Director - Staffing Services</td><td class="column-3">Cynet Systems Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1449 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#285b404d464742064a4944495a49454946685a4d4a415c06475a4f064146">Shenoj Balaraman</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">ReBIT</td><td class="column-4">India</td>
</tr>
<tr class="row-1450 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c6f74746b79687d5c7f7d6f74777d6e73327f7371">Shhweta Joshi</a></td><td class="column-2">Head : Talent Acquisition &amp; Employer Branding</td><td class="column-3">CashKaro.com</td><td class="column-4">India</td>
</tr>
<tr class="row-1451 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d1e050406050c43090504010102032d09080e04000c0119080e05430e0200">Shikha Dhillon</a></td><td class="column-2">Head of HR</td><td class="column-3">Decimal Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1452 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7fcfdfffcf5d4e6f5fcfdfaf2fbe0f1f7fcbaf7fbf9">Shikha Gupta</a></td><td class="column-2">HR Head</td><td class="column-3">RAH Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1453 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f1eaebe9eae3ace5f7f2f6e3c2f6e3f6e3e1edefeff7ecebe1e3f6ebedecf1ace1edef">Shikha Gupta</a></td><td class="column-2">Executive Secretary to Global HR head</td><td class="column-3">Tata Communications</td><td class="column-4">India</td>
</tr>
<tr class="row-1454 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#493a2120222128672e3c393d28093e20273e203b2c672a2624">Shikha Gupta</a></td><td class="column-2">Director Of Recruiting</td><td class="column-3">WinWire Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1455 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a3b8b9bbb8b1febbbfa4b8b1a2b990bbbcb5b1a2bebfa7feb3bfbd">Shikha Kothari</a></td><td class="column-2">HR Head</td><td class="column-3">KlearNow</td><td class="column-4">India</td>
</tr>
<tr class="row-1456 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a09121311121b54091514133a1c081b14191514141f190e54191517">Shikha Soni</a></td><td class="column-2">Director, Human Resources</td><td class="column-3">FranConnect</td><td class="column-4">India</td>
</tr>
<tr class="row-1457 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b283332372b3a361b38343f3e3d3429383e75383436">Shilpa Mahajan</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">CodeForce 360</td><td class="column-4">India</td>
</tr>
<tr class="row-1458 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d0e1514110d1c53101c111512090f1c3d1014131909141e161118531e1210">Shilpa Malhotra</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Mindtickle</td><td class="column-4">India</td>
</tr>
<tr class="row-1459 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#592a3130352938772b3c3d3d2019383c2b303c2a2d3c3a31373635363e20773a3634">Shilpa Reddy</a></td><td class="column-2">Director HR</td><td class="column-3">Aeries Technology Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1460 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5221213a27393e3312333c332327337c313d3f">Shilpa Shukla</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Anaqua</td><td class="column-4">India</td>
</tr>
<tr class="row-1461 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f1eaebeef2e3acf6f7ece5ebe9e3f0c2ebece4f0e3f1ede4f6f6e7e1eaace1edef">Shilpa Tungikar</a></td><td class="column-2">Assistant Vice President -Talent Acquisition</td><td class="column-3">Kiya.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1462 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6c5dedfdac6df98c5d7dddad7d8dff6dbd3c2c4d99bd1c5d598dfd8">Shilpi Saklani</a></td><td class="column-2">DIRECTOR HR</td><td class="column-3">METRO SERVICES</td><td class="column-4">India</td>
</tr>
<tr class="row-1463 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#23504b4a4f534a634d46574c4e4a0d404c4e">Shilpi Sardana</a></td><td class="column-2">Head of Talent Acquisition &amp; People Operations</td><td class="column-3">Netomi</td><td class="column-4">India</td>
</tr>
<tr class="row-1464 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#215249484d51484a405361514455534e48550f424e4c">Shilpika Raheja</a></td><td class="column-2">Global Head Human Resources</td><td class="column-3">Petro IT</td><td class="column-4">India</td>
</tr>
<tr class="row-1465 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#582b3031282a397634392e39363139182f2d363c3d2a3539362c303735282b3736763b3735">Shipra Lavania</a></td><td class="column-2">Head- Human Resources</td><td class="column-3">Wunderman Thompson Commerce</td><td class="column-4">India</td>
</tr>
<tr class="row-1466 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfacb7b6afadbef1afbeb1bbb6ab9fb5aaacafbea6f1b6b1">Shipra Pandit</a></td><td class="column-2">Director - HR</td><td class="column-3">JUSPAY</td><td class="column-4">India</td>
</tr>
<tr class="row-1467 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cbb8a3a2bbb9aae5b9aaa28ba5a2bdaebeb8b8a4a7bebfa2a4a5b8e5a8a4a6">Shipra Rai</a></td><td class="column-2">Vice President People Operations</td><td class="column-3">Niveus Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1468 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#16657e7f647f7838607764717e73657356656371776474796e7873626179647d653875797b">Shirin Varghese</a></td><td class="column-2">Head - L&amp;D and Corporate HR</td><td class="column-3">SugarBox Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-1469 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3b0abaab1aab0abeda1a2b5a7a6a8a2b183f0a7b0eda0acae">Shirish Bavdekar</a></td><td class="column-2">Head of Talent Acquisition (India)</td><td class="column-3">Dassault Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1470 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c1f04051f04051e421f05020b042c010500070e0d1f070918420f0301">Shishir Singh</a></td><td class="column-2">Head Of HR Operations</td><td class="column-3">Milkbasket</td><td class="column-4">India</td>
</tr>
<tr class="row-1471 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#285b40415e49685f41465f415a4d064b4745">Shiva </a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">WinWire Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1472 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f2819a9b8493b2919d9f9399979b86dc919d9f">Shiva Prasad</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">coMakeIT</td><td class="column-4">India</td>
</tr>
<tr class="row-1473 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e291918a97898e83a296838c8b918a83919b9196878f91cc818d8f">Shivam Shukla</a></td><td class="column-2">Director- Talent Acquisition</td><td class="column-3">Tanisha Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1474 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4132292837202f26280132242f322429306f222e2c">Shivangi Chauhan</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Sense</td><td class="column-4">India</td>
</tr>
<tr class="row-1475 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e2918a8b94838c858ba28583968795839b9687818a8c8d8e838091cc818d8f">Shivangi Vakil</a></td><td class="column-2">VP - Finance, Legal, Compliance &amp; Head - HR</td><td class="column-3">Gateway Group of Companies</td><td class="column-4">India</td>
</tr>
<tr class="row-1476 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a3922233c2b24236429222b3e3f383c2f2e230a27203f24293e232524642324">Shivani Chaturvedi</a></td><td class="column-2">Chief People Officer</td><td class="column-3">mjunction services</td><td class="column-4">India</td>
</tr>
<tr class="row-1477 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#74071c1d02151a1d34021d06000115181c111d131c005a171b19">Shivani Jaiswal</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Virtual Height IT Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1478 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#23484b424d4d420d504b4a55424d4a63474a444a574257460d404c4e">Shivani Khanna</a></td><td class="column-2">Head HR</td><td class="column-3">Digitate</td><td class="column-4">India</td>
</tr>
<tr class="row-1479 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e7948f8e9186898ea7828a8e898394c9868e">Shivani Naidu</a></td><td class="column-2">Director of Talent Acquisition</td><td class="column-3">Enterprise Minds</td><td class="column-4">India</td>
</tr>
<tr class="row-1480 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#27544f4e5146494e674644574b0944484a">Shivani Singh</a></td><td class="column-2">Head of HR</td><td class="column-3">ACPL Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1481 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8cbd0d7d9d1da96d9d0d5dddcf8d6cdcfd9cadd96dbd7d5">Shoaib Ahmed</a></td><td class="column-2">Associate Vice President- Human Resources</td><td class="column-3">NuWare</td><td class="column-4">India</td>
</tr>
<tr class="row-1482 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#493a21262b28272809213c2b202526672a2624">Shobana Kailash</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Hubilo</td><td class="column-4">India</td>
</tr>
<tr class="row-1483 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97f1fee5e4e3d7e4f8f1e3f2f9f0f2e5b9f4f8fa">Shraddha Adarkar</a></td><td class="column-2">AVP &amp; Head - Human Resources</td><td class="column-3">Softenger</td><td class="column-4">India</td>
</tr>
<tr class="row-1484 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97e4ffe5f6f3f3fff6d7f3fef0fee3f2b9f4f8fa">Shraddha Patil</a></td><td class="column-2">Vice President- People Operations</td><td class="column-3">Digite,</td><td class="column-4">India</td>
</tr>
<tr class="row-1485 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#394a514b585d5158174a4c555c7957564b4d515e584d5c494a175a5654">Shradha Sule</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">NEC Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1486 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e09388928196818ea09389878d8f8984ce838f8d">Shravan Kumar</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Sigmoid</td><td class="column-4">India</td>
</tr>
<tr class="row-1487 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e7948f9582828d86c99486899388948fa78b9589c984888a">Shreeja Santosh</a></td><td class="column-2">Director, People &amp; Culture</td><td class="column-3">LRN</td><td class="column-4">India</td>
</tr>
<tr class="row-1488 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4a3922382f2f26233a3e2b6427233922382b0a28263f202b333925263f3e2325243964292527">Shreelipta Mishra</a></td><td class="column-2">Director-Human Resources</td><td class="column-3">Four Soft</td><td class="column-4">India</td>
</tr>
<tr class="row-1489 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#37445f455252445f685c5643435e77555b4252455844521a4352545f1954585a">Shreesh Katti</a></td><td class="column-2">Senior Vice President - Staffing</td><td class="column-3">BlueRose Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1490 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#45362d37203c24362c053324293020352c31262d6b262a28">Shreyasi Sen</a></td><td class="column-2">Head of HR and Administration</td><td class="column-3">Valuepitch E Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1491 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#05766d776c6e646b714564626c696062696a676469766a6970716c6a6b762b666a68">Shrikant Joshi</a></td><td class="column-2">Vice President Talent Acquisition</td><td class="column-3">Agile Global Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1492 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4d7ccd6d1d0cd8ac6ccc5d6c3c5d2c5e4cac1d0c7cbc9c8c1c5d6cacdcac38ac7cbc9">Shruti </a></td><td class="column-2">Head HR</td><td class="column-3">NetCom Learning</td><td class="column-4">India</td>
</tr>
<tr class="row-1493 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3c0dbc1c6c7da9dd4d2ddd7dbdaf3dedcdcdfcad29dd0dcde">Shruti Gandhi</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">Moolya</td><td class="column-4">India</td>
</tr>
<tr class="row-1494 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483b203a3d3c216625292420273c3a2908273a29262f2d662b2725">Shruti Malhotra</a></td><td class="column-2">Head HR Projects - APAC</td><td class="column-3">Orange Business Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1495 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f1c071a0d070e022f040e1c1b0a0c071c1c08410c0002">Shubha Menon</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Kastech Software Solutions Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1496 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89fae1fcebe1e8a7e4ece7e6e7c9fae6e5fde0fcfaa7eae6a7e0ed">Shubha Menon</a></td><td class="column-2">Head HR</td><td class="column-3">Soltius Indonesia</td><td class="column-4">India</td>
</tr>
<tr class="row-1497 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f7ecf1e6ece5e0e5aaefe5e8e1c4e5f0fde1f0edaae7ebe9">Shubhada Kale</a></td><td class="column-2">Head of HR - India</td><td class="column-3">Atyeti Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1498 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5d6cdd0c7cdc4c8cec4d1ccdcc4d7e5c4c8c0dcca8bc6cac8">Shubham Katiyar</a></td><td class="column-2">Vice President &amp; Head - Human Resources</td><td class="column-3">Ameyo</td><td class="column-4">India</td>
</tr>
<tr class="row-1499 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c2e233f290c3c3e292f253f25232238292f242f233e3c622f2321">Shubhendu Bose</a></td><td class="column-2">Sr. Vice President - HR &amp; Operations</td><td class="column-3">Precision Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1500 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cbb8a3bea9a3b9aae5a5aab9aaa5ac8ba8e6b1aea5bfb9a2b3e5a8a4a6">Shubhra Narang</a></td><td class="column-2">Head of HR</td><td class="column-3">C-Zentrix</td><td class="column-4">India</td>
</tr>
<tr class="row-1501 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#25564d50464d4c0b4b4c4f4d4452444b65404e44554950560b464a48">Shuchi Nijhawan</a></td><td class="column-2">Sr Vice President- Global Human Resources</td><td class="column-3">Eka Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1502 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#26554e514352476650474a53434549424354550845494b">Shweta Aggarwal</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">ValueCoders</td><td class="column-4">India</td>
</tr>
<tr class="row-1503 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7fce3f1e0f5d4f0f1e7e0f1ffe7fbf8e1e0fdfbfae7baf7fbf9">Shweta Dugad</a></td><td class="column-2">Head - HR &amp; Operations</td><td class="column-3">Destek Infosolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1504 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#80f3edf5f2f4e8f9c0e1f5f2f5f3e9eee3aee3efed">Shweta Murthy</a></td><td class="column-2">Vice President HR</td><td class="column-3">Aurus Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1505 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4b38233c2e3f2a382e3f222a0b2a3224282425252e283f65222f">Shweta Setia</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Ayoconnect</td><td class="column-4">India</td>
</tr>
<tr class="row-1506 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9dac1deccddc8e9dac0cec7c0ddd0dac6c5dcddc0c6c7da87cac6c4">Shweta Sharma</a></td><td class="column-2">Head of HR</td><td class="column-3">Signity Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1507 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3c0dbc4d6c7dbd2f3c1c6d7d7d6c1c0c7d2d0d89dd0dcde">Shwetha Sethuraman</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">RudderStack</td><td class="column-4">India</td>
</tr>
<tr class="row-1508 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f6c77667e7231687e6d6d767a6d5f717a6a7b7a6c767c317c7072">Shyam Warrier</a></td><td class="column-2">Vice President Global Talent &amp; Culture</td><td class="column-3">Neudesic Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1509 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a5942534b474b6a464f59454c5e04494547">Shyama Nair</a></td><td class="column-2">Head HR Ops - LIG India</td><td class="column-3">Leader Investment Group - LIG</td><td class="column-4">India</td>
</tr>
<tr class="row-1510 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a3b8a9b1bdb9bcb9fea3b1a4a9b5beb4a2b1be90a4b1a2b5bea4bffeb3bfbd">Shyamili Satyendran</a></td><td class="column-2">Director - HR</td><td class="column-3">Tarento Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1511 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#55263d2c3b3c7b3e153b3021363a3b7b3c3b">Shyni K</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Netcon Technologies India</td><td class="column-4">India</td>
</tr>
<tr class="row-1512 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1e6d777a7a767f6c6a76307c7f727f756c776d76707f705e7d6c73776a307d7173">Siddharth Balakrishnan</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">CRMIT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1513 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6c5dfd2d2ded7c4c2de98d1d7c3c4f6d5c4d3d2d3d8d5cfc598d5d9db">Siddharth Gaur</a></td><td class="column-2">Head HR</td><td class="column-3">Credencys Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1514 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d5e444744404241476d4c494459444e42435e58415944434a034e4240">Siji John</a></td><td class="column-2">Senior Director Talent Management</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1515 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5122383c23303f7f3a303d233011302730253030237f3c34">Simran Kalra</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Avataar.Me</td><td class="column-4">India</td>
</tr>
<tr class="row-1516 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#77041e1a0516195919161e05371f120f161018195914181a">Simran Nair</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Hexagon Geosystems</td><td class="column-4">India</td>
</tr>
<tr class="row-1517 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e2919290838083898390a291818b8d8a87838e968a838c838e9b968b8191cc818d8f">Sindhu Prabakar</a></td><td class="column-2">Senior Director HR &amp; Admin</td><td class="column-3">SCIO Health Analytics</td><td class="column-4">India</td>
</tr>
<tr class="row-1518 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c2f3532383429363d722c3d2e28343d2f3d2e3d2834251c3135323828353f373039723f3331">Sindhuja Parthasarathy</a></td><td class="column-2">Director- Global Talent Management</td><td class="column-3">Mindtickle</td><td class="column-4">India</td>
</tr>
<tr class="row-1519 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0b3a9aea980a9b4b4a4a9a7a9b4a1aceea3afad">Sini Jerry</a></td><td class="column-2">Delivery Head - India Staffing</td><td class="column-3">ITTDigital</td><td class="column-4">India</td>
</tr>
<tr class="row-1520 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0c3c0f0d3d1dcdcd9d4c5c3d3dcdfc5d49ed3dfdd">Sirisha P</a></td><td class="column-2">Director, HR &amp; Talent - India</td><td class="column-3">CallidusCloud</td><td class="column-4">India</td>
</tr>
<tr class="row-1521 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fb8892899288899e9ed59f9a829a959a959fbb9a9c9c959ed5989496">Sirisree Dayanand</a></td><td class="column-2">Director HR</td><td class="column-3">Aggne</td><td class="column-4">India</td>
</tr>
<tr class="row-1522 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a4d7cdd0c5d6c5c98acfd1d6d1c3c5cad0cde4d5d1c5c0d6c5cad0d6c1d7cbd1d6c7c18ac7cbc9">Sitaram Kuruganti</a></td><td class="column-2">Director Human Resources &amp; TA</td><td class="column-3">Quadrant Resource</td><td class="column-4">India</td>
</tr>
<tr class="row-1523 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c7b4aeb1a6b4a6a9aca6b5e9b587b7b5a8b1aea9b3abe9a4a8aa">Sivasankar R</a></td><td class="column-2">Global HR Head</td><td class="column-3">ProV International</td><td class="column-4">India</td>
</tr>
<tr class="row-1524 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bdced0d4c9dc93d3dccfd6dccffdd4d3dbd4d3d4c9d890c8cdc9d4d0d893ded2d0">Smita Narkar</a></td><td class="column-2">Head of HR</td><td class="column-3">Infinite Uptime</td><td class="column-4">India</td>
</tr>
<tr class="row-1525 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfccd2d6cbd7deffdcc6dddacdccdadcd6cb91d1dacb">Smitha Bijith</a></td><td class="column-2">HR Manager &amp; Operations Head</td><td class="column-3">CyberSec Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1526 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8abb5b1acb0b9f6a8aab9bcbdbda898b9a8acb7abf6bbb7b5">Smitha Pradeep</a></td><td class="column-2">HR Head</td><td class="column-3">Aptos Retail</td><td class="column-4">India</td>
</tr>
<tr class="row-1527 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c6f717568747d326f5c686e697b70737e7d70327f7371">Smitha S</a></td><td class="column-2">Head of HR</td><td class="column-3">TRUGlobal</td><td class="column-4">India</td>
</tr>
<tr class="row-1528 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f6859b9f829e97d885979c99b69786869a938e8385d895999b">Smitha Sajo</a></td><td class="column-2">VP &amp; Global Head- HR &amp; Operations</td><td class="column-3">Applexus Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1529 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9aab4b0adb1b899b8b5bab1bcb4a0aab6b5acadb0b6b7aaf7b8aab0b8">Smitha T</a></td><td class="column-2">Head - HR</td><td class="column-3">Alchemy Techsol India</td><td class="column-4">India</td>
</tr>
<tr class="row-1530 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a3beb5b8b190bdb5a2bbbcb5a3b3b9b5beb3b5feb3bfbd">Sneha Hegde</a></td><td class="column-2">Head of Talent Acquisition - APAC, UK &amp; USA</td><td class="column-3">Merkle Science</td><td class="column-4">India</td>
</tr>
<tr class="row-1531 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83f0ede6ebe2c3f5eaf1eaede0ebeaade0ecee">Sneha Sharma</a></td><td class="column-2">Head of HR</td><td class="column-3">Virinchi</td><td class="column-4">India</td>
</tr>
<tr class="row-1532 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a5b8b3beb796a2b7a0bfa5b5b7f8b5b9bb">Sneha Tope</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Tenerity India</td><td class="column-4">India</td>
</tr>
<tr class="row-1533 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ae9f4fff2feffffeab4fbf7f8fbe8f1fbe8daf9f3fff4eee8fbb4f9f5f7">Snehdeep Ambarkar</a></td><td class="column-2">Vice President - Talent Acquisition</td><td class="column-3">Cientra</td><td class="column-4">India</td>
</tr>
<tr class="row-1534 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cab9a4a3adaea2ab8ab9ababbca4e4a9a5a7">Snigdha Prashar</a></td><td class="column-2">Director Human Resources</td><td class="column-3">JioSaavn</td><td class="column-4">India</td>
</tr>
<tr class="row-1535 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#83f0eceff6f7eaecedadebe6e2e7c3f0eceff6f7eaecede2ede2effaf0f7f0ade0ecee">Solution Head</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Solution Analysts</td><td class="column-4">India</td>
</tr>
<tr class="row-1536 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95e6f2e0e5e1f4d5f0fbf6fae7f0e6e6bbf6faf8">Somdatta Gupta</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Encore Software Services,</td><td class="column-4">India</td>
</tr>
<tr class="row-1537 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfccd0d2daccd791ccd7decdd2deffd6d1d9d0cccbcdd6dbda91dcd0d2">Somesh Sharma</a></td><td class="column-2">Vertical Head - US Staffing</td><td class="column-3">InfoStride</td><td class="column-4">India</td>
</tr>
<tr class="row-1538 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6a190507130b44080b081f2a0d180b071e0b180b040d440304">Somya Babu</a></td><td class="column-2">Head HR</td><td class="column-3">Gram Tarang Employability Training Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1539 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ceff3f2fdf0b2efeef5eafdefe8fdeafddcf1f3fef5f0f9fff3f8f9eee6b2fff3f1">Sonal Srivastava</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">MobileCoderz</td><td class="column-4">India</td>
</tr>
<tr class="row-1540 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e89b87868984c69d98898c80918991a89c808d989b81c68b8785">Sonal Upadhyay</a></td><td class="column-2">Head Human Resource</td><td class="column-3">Pratham Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1541 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d1e02030c0104430f050c1b082d04030b1f0c1e020b1919080e05430e0200">Sonali Bhave</a></td><td class="column-2">Global Head HR</td><td class="column-3">Infrasoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1542 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c3f23222d20253c0c3f2920292f383f23393e2f2925223820622f2321">Sonali Patnaik</a></td><td class="column-2">Head HRBP</td><td class="column-3">Select Source International</td><td class="column-4">India</td>
</tr>
<tr class="row-1543 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#93fbe1d3f0eafde7f6ebf2bdf0fcfe">Sonali Sharma</a></td><td class="column-2">HR Head</td><td class="column-3">Cyntexa</td><td class="column-4">India</td>
</tr>
<tr class="row-1544 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c0f13121d101552081508090f3c1512081910191b19121f151d521f1311">Sonali Titus</a></td><td class="column-2">VP Hr and Recruiting</td><td class="column-3">Intelegencia</td><td class="column-4">India</td>
</tr>
<tr class="row-1545 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f1edece3eface6f5ebf4e7e6ebc2f6f0e3ecf1f7ecebedecace1edef">Sonam Dwivedi</a></td><td class="column-2">AVP Talent Acquisition</td><td class="column-3">TransUnion CIBIL</td><td class="column-4">India</td>
</tr>
<tr class="row-1546 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d6e7273745d74736978717172717c7f6e337e7270">Soni Anand</a></td><td class="column-2">AVP - HR</td><td class="column-3">Intello Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1547 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f5869a9b9c94db92949d999a81b5939c839086919c929c819499db969a98">Sonia Gahlot</a></td><td class="column-2">Assistant Vice President Human Resources</td><td class="column-3">FiveS Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1548 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c4f5352555d7c57505d494f5548125f5351">Sonia Lazar</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Klaus IT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1549 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85f6eaf5edf7eaebece4c5f7e0f6ede4e8e4ebe1ecabe6eae8">Sophronia Kasab</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">ReshaMandi</td><td class="column-4">India</td>
</tr>
<tr class="row-1550 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c4b7abb1a9bda584beababaaa0ada5eaadaa">Soumya Rajesh</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Zoondia</td><td class="column-4">India</td>
</tr>
<tr class="row-1551 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c2f332931253d1c35312c2e392f2f723d35">Soumya Somanathan</a></td><td class="column-2">Head of HR (India)</td><td class="column-3">impress.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1552 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aad9c5dfc4cecbd8d3cb84c7dfd8dfcdcbc3d3cbc4eac9ded984c9c5">Soundarya Murugaiyan</a></td><td class="column-2">Human Resources Director</td><td class="column-3">CTS</td><td class="column-4">India</td>
</tr>
<tr class="row-1553 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f7c607a7d6e6d6721656e66614f69667c6a7d79216c6062">Sourabh Jain</a></td><td class="column-2">hr head</td><td class="column-3">Fiserv Insurance Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1554 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#11623f63707851756378627965783f727e7c">Sourabh Rai</a></td><td class="column-2">Head Of Performance Engineering</td><td class="column-3">Drishti</td><td class="column-4">India</td>
</tr>
<tr class="row-1555 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85f6eaf0f7e4e7ede4abf7e4f3ecc5f3e4e9f0e0f5eaecebf1f6fcf6f1e0e8f6abe6eae8">Sourabha Ravi</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">Value Point Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1556 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#57243822253e3c79241731253839233e2d38793e39">Sourik Syed</a></td><td class="column-2">Head-HRBP (Frontizo and Appario)</td><td class="column-3">Frontizo Business Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1557 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#394a564e54405879494b565b5c50575f564b54584d505657175a5654">Sowmya Anish</a></td><td class="column-2">Head Human Resources</td><td class="column-3">Probe42</td><td class="column-4">India</td>
</tr>
<tr class="row-1558 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#86f5e9f1ebffe7c6efe4eef3e4f5a8e5e9">Sowmya Bezawada</a></td><td class="column-2">AVP - Human Resources</td><td class="column-3">iB Hubs</td><td class="column-4">India</td>
</tr>
<tr class="row-1559 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7b08091e1e3b080f091a0d12081455181416">Sree T</a></td><td class="column-2">Director Human Resources Development</td><td class="column-3">StraViso</td><td class="column-4">India</td>
</tr>
<tr class="row-1560 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#176465727239627a767a767f72646076657e577e7a677e7072656372747f3974787a">Sree Umamaheswari</a></td><td class="column-2">Director Talent Management</td><td class="column-3">Impiger Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1561 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a1d2d3c4c4cbc08fd2d3c4c4c5c9c0d3c0cfe1d2cad4c0c58fc8ce">Sreeja Sreedharan</a></td><td class="column-2">Director - Global Payroll</td><td class="column-3">Skuad</td><td class="column-4">India</td>
</tr>
<tr class="row-1562 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#63101106061302110d024d10020e020d170223161101020d0f02070706114d000c0e">Sreeparna Samanta</a></td><td class="column-2">Head - HR</td><td class="column-3">Urban Ladder</td><td class="column-4">India</td>
</tr>
<tr class="row-1563 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfacadbabaafadb6a6be9fbabeb8b3baa9b6baa8f1bcb0f1b6b1">Sreepriya </a></td><td class="column-2">Head HR</td><td class="column-3">EagleView India</td><td class="column-4">India</td>
</tr>
<tr class="row-1564 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e29190878790838fa29397838e8b9887838ecc818d8f">Sreeram Kaviliga</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">QualiZeal</td><td class="column-4">India</td>
</tr>
<tr class="row-1565 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a0d3cdcfc8c1ced4d9e0d0d2c9cdd5d3c7cccfc2c1cc8ec3cfcd">Sreetam Mohanty</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">PRIMUS Global Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1566 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3d4e4f58584b5c51515413567d4e4e49585e5513484e">Sreevalli K</a></td><td class="column-2">Director L&amp;D</td><td class="column-3">System Soft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1567 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5d6d7c0c0d3ccc1cddcc48bd6cdc4d6cdcce5ccd1cad7ccdfcacb8bc6cac8">Sreevidhya Shashi</a></td><td class="column-2">Senior Director - HR @ ITOrizon &amp; UCBOS</td><td class="column-3">ITOrizon</td><td class="column-4">India</td>
</tr>
<tr class="row-1568 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8aba8adacacb998b9a2acbdbbabb7beacafb9aabdf6bbb7b5">Sridevi Putta</a></td><td class="column-2">Head of HR</td><td class="column-3">Aztecsoft</td><td class="column-4">India</td>
</tr>
<tr class="row-1569 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95e6e7fcf1f0e3fcd5e6f0f1fcfbe1f0f6fdfbfaf9faf2fcf0e6bbf6faf8">Sridevi Ramoo</a></td><td class="column-2">Global Head Human Resources</td><td class="column-3">Sedin Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1570 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aad9d8c3cecfdcc384dceac0cfcfdccbc4decfc9c2c4c5c6c5cdc3cfd984c9c5c7">Sridevi Vinayagaraj</a></td><td class="column-2">Head - HR</td><td class="column-3">Jeevan Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1571 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfcccdd6dbd7decd91dddecdd6d8daffd5ccc891d6d1">Sridhar Barige</a></td><td class="column-2">Head HR</td><td class="column-3">JSoft Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1572 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1467667d707c75663a7f7b607c7554736164677c61643a7d7b">Sridhar Kotha</a></td><td class="column-2">Director - Performance QA Automation</td><td class="column-3">Gupshup</td><td class="column-4">India</td>
</tr>
<tr class="row-1573 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6615140f020e0714480b26000a1303081201140f024805090b">Sridhar Marla</a></td><td class="column-2">Vice President &amp; Head of HR</td><td class="column-3">Fluentgrid</td><td class="column-4">India</td>
</tr>
<tr class="row-1574 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#196a6b707d71786b376a6b7077706f786a7877597b76786b7d7c61377a7674">Sridhar Srinivasan</a></td><td class="column-2">Head - HR</td><td class="column-3">BoardEx</td><td class="column-4">India</td>
</tr>
<tr class="row-1575 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#deadacb7b5bfb0aab6bc9eaabbbdb6aeb1b7b0aaadb1b2abaab7b1b0adf0bdb1b3">Srikanth Battu</a></td><td class="column-2">Managing Director and Technical Recruitment Lead</td><td class="column-3">Techpoint</td><td class="column-4">India</td>
</tr>
<tr class="row-1576 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1261607b79737c667a3c77527f776075777c7b663c717d7f">Srikanth Emula</a></td><td class="column-2">Head Talent Acquisition</td><td class="column-3">Mergen IT LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1577 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2556574c4e444b514d0b5644514d5c444b4457445c444b44654e4a4855574c56400b464a48">Srikanth Sathyanarayana</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Komprise</td><td class="column-4">India</td>
</tr>
<tr class="row-1578 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#710203181a031802191f10311704161e02140307181214025f121e1c">Srikrishna </a></td><td class="column-2">Head - HR, Compliance &amp; Quality Control</td><td class="column-3">FUGO Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1579 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6f1c1d06010e1b0741082f010a17190e03410c0002">Srinath Gururajarao</a></td><td class="column-2">Vice President &amp; CHRO</td><td class="column-3">Nexval Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1580 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e695948f888fa69283858e88898183888f8885c885898b">Srini Chakravarthy</a></td><td class="column-2">COO &amp; Director - IT Workforce Solutions</td><td class="column-3">TechnoGen,</td><td class="column-4">India</td>
</tr>
<tr class="row-1581 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b3c0c1dadddad7dbda9dd7f3d8d6d8d29dd0dcde">Srinidhi Dasaka</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Keka HR</td><td class="column-4">India</td>
</tr>
<tr class="row-1582 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3c4f4e5552554a5d4f7c5f5350505d5e534e5d48594f535049485553524f125f5351">Srinivas P</a></td><td class="column-2">Head - Talent Aquisation</td><td class="column-3">Collaborate Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1583 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c1b2b3a8afa8b7a0b2efb1aeada0b3a8b281b1aeada0b3a8b2aca0afa0a6a4aca4afb5efa2aeac">Srinivas Polaris</a></td><td class="column-2">Director HR</td><td class="column-3">Polaris</td><td class="column-4">India</td>
</tr>
<tr class="row-1584 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#097a7b6067607f687a277d68656864797c7b686768644960677a79607b686e6c276a6664">Srinivas Talampuranam</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Inspirage</td><td class="column-4">India</td>
</tr>
<tr class="row-1585 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5724242239333625363a17233223253624383123792224">Sriram Sundaram</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Tetrasoft</td><td class="column-4">India</td>
</tr>
<tr class="row-1586 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2457564d5245504c57454a0a4943644f51494556454a0a474b49">Srivathsan Mg</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Kumaran Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1587 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7e6fde2fdf0fcedf5baf0f1e7fce4f5faf0f1d4e7e4e6fdfaf3f9f8baf7fbf9">Srividhya Deshpande</a></td><td class="column-2">Senior Director Human Resources</td><td class="column-3">SpringML,</td><td class="column-4">India</td>
</tr>
<tr class="row-1588 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d3e39283d2528230d2822353b2c23392c2a28632e2220">Stephen Taylor</a></td><td class="column-2">Head Human Resources Department</td><td class="column-3">EOX Vantage</td><td class="column-4">India</td>
</tr>
<tr class="row-1589 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dba8aeb9ba9bbcbeadbab7edf5b8b4b6">Subashini Sundaram</a></td><td class="column-2">Vice President Talent Acquisition</td><td class="column-3">Geval6 Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1590 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#364543545457445759185576455950424657425e18585342">Subbarao Cvrk</a></td><td class="column-2">Vice President &amp; Global Head HR</td><td class="column-3">Softpath System</td><td class="column-4">India</td>
</tr>
<tr class="row-1591 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3744535644775253455e5951581954585a">Subhakant Das</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">EDR Continuous Information</td><td class="column-4">India</td>
</tr>
<tr class="row-1592 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8dbddcac0c9dbc0cadee8c5c9cbc7c5dbc7c4dddcc1c7c6db86cbc7c5">Subhash Bv</a></td><td class="column-2">Head HR</td><td class="column-3">Manappuram Comptech &amp; Consultants</td><td class="column-4">India</td>
</tr>
<tr class="row-1593 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ef9c9a8d878e9c87c18c878e818b9d8eaf9c8683998a9d8386818a8c9d82c18c8082">Subhash Chandra</a></td><td class="column-2">Head of People Operations - India</td><td class="column-3">Silverline</td><td class="column-4">India</td>
</tr>
<tr class="row-1594 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f1f7e0f0e3efe3ecebe3ecace3e6e3ebe9e3eee3efc2f1f7eff6edf6e3eef1fbf1f6e7eff1ace1edef">Subramanian Adaikalam</a></td><td class="column-2">Director, Global Talent Management</td><td class="column-3">SumTotal Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1595 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bbc8ced9c9dad6dad5d2dad5fbd7d4dcd2c8d4ddcfcfded8d3d2d5d895d8d4d6">Subramanian B</a></td><td class="column-2">Head Staffing and IT Services</td><td class="column-3">Logisoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1596 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97e4e7f8f9f9e2e4f6faeed7f6f2e6e2f8e5b9f4f8fa">Subramanian Ponnusamy</a></td><td class="column-2">Director-India Staffing Services</td><td class="column-3">Aequor Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1597 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7e1f6e6f5f9f5faedf5d4e6f1e7fcf5f9f5faf0fdbaf7fbf9">Subramanya Srikant</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">ReshaMandi</td><td class="column-4">India</td>
</tr>
<tr class="row-1598 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#14676176667d7a755472787b767d6e3a7d7a">Subrina Lepcha</a></td><td class="column-2">Associate Director - Talent Management</td><td class="column-3">FloBiz</td><td class="column-4">India</td>
</tr>
<tr class="row-1599 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3954584d515c4e794d5c5a51584c4d565a56574a175a5654">Suby Mathew</a></td><td class="column-2">Director - Executive Search</td><td class="column-3">TAC</td><td class="column-4">India</td>
</tr>
<tr class="row-1600 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7d0e081e1518091c53081614190b183d101413190e091405531e1210">Sucheta Ukidve</a></td><td class="column-2">Director, HR</td><td class="column-3">Mindstix Software Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1601 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6c1f190809091c420f040d070705020b0d002c1f1f05181f0300420f0301">Sudeep Chakkingal</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">SSIT,</td><td class="column-4">India</td>
</tr>
<tr class="row-1602 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#225157464747520c4e57564a5043624d50434c45470c414d4f">Sudeep Luthra</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Orange Business Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1603 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0b3b5a4a8a1a1b680a2b5a4a4a9eea1a9">Sudhaa Veerappan</a></td><td class="column-2">Consulting HR Head</td><td class="column-3">BUDDI AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1604 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#225157464a43494350624c4d404e47514d44560c414d4f">Sudhakar </a></td><td class="column-2">Head Hunter Recruitment</td><td class="column-3">Noblesoft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1605 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#631016070b0a0d0711024d1002110d0c010217230a100c161100060a0d050c101a1017060e104d000c0e">Sudhindra Sarnobat</a></td><td class="column-2">HR Chief at i-Source and Director</td><td class="column-3">i-Source Infosystems</td><td class="column-4">India</td>
</tr>
<tr class="row-1606 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5c2f293834352e723e1c3d392e35392f28393f34323330333b25723f3331">Sudhir B</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Aeries Technology Group</td><td class="column-4">India</td>
</tr>
<tr class="row-1607 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#037076676b6a712d70626f75664370666271706b602d606c6e">Sudhir Salve</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">Sears Holdings India</td><td class="column-4">India</td>
</tr>
<tr class="row-1608 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cebdbbaaa6a7bce0bda6a7a0aaab8ea0a7aba2bdaba0a7bfe0ada1a3">Sudhir Shinde</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">NielsenIQ</td><td class="column-4">India</td>
</tr>
<tr class="row-1609 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#21525446544f400f53404b4053404c61584c444548404d4043520f424e4c">Suguna Rajaram</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Y Media Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1610 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#186b6d70796b7176716a587975627d6c6c79367b7775">Suhasini Ramakrishnan</a></td><td class="column-2">Vice President - Human Resources</td><td class="column-3">AmZetta Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1611 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#087b7d62697c60696f486b6d646b67657b67647d7c6167667b266b6765">Sujatha G</a></td><td class="column-2">Director - HR</td><td class="column-3">Celcom Solutions Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1612 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e291978883968a83cc94a28d8c87858e8d8087919b9196878f91cc818d8f">Sujatha Venkatesan</a></td><td class="column-2">Head - Talent Acquisition &amp; People Management</td><td class="column-3">OneGlobe</td><td class="column-4">India</td>
</tr>
<tr class="row-1613 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2152544b444461425340584e4f454055400f424e4c">Sujee Shalini</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Crayon Data</td><td class="column-4">India</td>
</tr>
<tr class="row-1614 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2655534c4343520854474966424f50435455434a5f485e0845494b">Sujeet Rao</a></td><td class="column-2">AVP-HR</td><td class="column-3">Diverse Lynx</td><td class="column-4">India</td>
</tr>
<tr class="row-1615 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5f2c2a35362b7135363e313b3e31361f3e3a2b373a2d3a2a2c713c3032">Sujit Jiandani</a></td><td class="column-2">Director Talent Acquisition - Leadership Hiring</td><td class="column-3">Aethereus</td><td class="column-4">India</td>
</tr>
<tr class="row-1616 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0172746a6472696f682f75746d607268416f60716864736964606d7569626073642f626e6c">Sukeshni Tulasi</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Napier Healthcare</td><td class="column-4">India</td>
</tr>
<tr class="row-1617 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#592a2c3231292b3c3c2d772a38373d312c19302d3035302d3c773a3634">Sukhpreet Sandhu</a></td><td class="column-2">Head of Human Resources | Executive Team</td><td class="column-3">ITILITE</td><td class="column-4">India</td>
</tr>
<tr class="row-1618 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f685839a97949ed892979f9197809e979893b68284839b9f989285d895999b">Sulabh Daigavhane</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Truminds Software Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1619 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3340465e525f52475b521d5773415a4756405c5547445241561d505c5e">Sumalatha Duggu</a></td><td class="column-2">Head -Human Resources</td><td class="column-3">Rite Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1620 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe8d8b939f90d09c969f8a8a9f9d969f8c949b9bbe899b9c8d95978a8a9b8c8dd09d9193">Suman Bhattacharjee</a></td><td class="column-2">Corporate Account &amp; Talent Acquisition Head</td><td class="column-3">WEBSKITTERS TECHNOLOGY SOLUTIONS</td><td class="column-4">India</td>
</tr>
<tr class="row-1621 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#85f6f0e8e4ebabeeecf1e4f2e4f1c5e3ecf3e0f6f5e9e4f6edabeceb">Suman Kitawat</a></td><td class="column-2">Associate Director Corporate HR Head</td><td class="column-3">FiveS Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1622 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2c1c7dfd3dc9cdfc7d9dad7c0d8d7d7f2c7dec6dbdfd3c6d7c1dddec7c6dbdddcc19cdbdc">Suman Mukherjee</a></td><td class="column-2">Head of Human Resources</td><td class="column-3">Ultimate Digital Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1623 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e7e1f9f5e6f5fafdbaedd4f1fff5e4f8e1e7baf7fbf9">Sumarani Sarkar</a></td><td class="column-2">Director - Global Human Resources</td><td class="column-3">Eka Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1624 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c6f6971756832775c726e7f73726f69706875727b6f796e6a757f79327f7371">Sumit Kathuria</a></td><td class="column-2">Chief Human Resources Officer (CHRO)</td><td class="column-3">NR Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1625 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6112140c08154f0c0805090021080f15040d0d0e0d0003124f020e0c">Sumit Midha</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Intello Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1626 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cbb8bea6bea0a3a2e5a1aaa2b9aaa68ba5bfbfafaabfaae5a8a4a6">Sumukhi Jairam</a></td><td class="column-2">Sr. Director- Talent and Development</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-1627 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fc8f89929d95929dbc89cf95929a9388999f94d29f9391">Sunaina Sisodiya</a></td><td class="column-2">Head HR-APAC</td><td class="column-3">U3 Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1628 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#364543585758525e577642535a5a5f57584218585342">Sunandha Sakthiprassad</a></td><td class="column-2">Vice President - HR &amp; Finance (India)</td><td class="column-3">Telliant Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1629 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b2c1c7dcd6d7d7c29cd6d3c1d3f2c4d3ded5d7dcd7c1dbc19cd1dddf">Sundeep Dasa</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">ValGenesis</td><td class="column-4">India</td>
</tr>
<tr class="row-1630 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8cfff9e2e8e9e9fca2fcede2e8e9f5ccfcf9fee9ffe3eaf8fbedfee9a2efe3e1">Sundeep Pandey</a></td><td class="column-2">Director Technology (US Health Care)</td><td class="column-3">PureSoftware</td><td class="column-4">India</td>
</tr>
<tr class="row-1631 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6c5c3d8d2d3c498c4d7d8d1d7c4d7dcd7d8f6d4c3c5dfd8d3c5c5dfd8c2d3d1c4d798d5d9db">Sunder Rangarajan</a></td><td class="column-2">Vice President - HR &amp; Operations</td><td class="column-3">Business Integra Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1632 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a1d2d4cfc4d5d3c0e1c9c8d7c4d3c9d08fc2cecc">Sunetra </a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Hiver</td><td class="column-4">India</td>
</tr>
<tr class="row-1633 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#41322a20312e2e33012c282d222e33316f222e2c">Sunil Kapoor</a></td><td class="column-2">VICE PRESIDENT-HR</td><td class="column-3">The MIL Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-1634 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f380869d9a9f80c1b39a9d9d9c85dd9a9d">Sunil Sarangdhar</a></td><td class="column-2">AVP - HR</td><td class="column-3">Innovsource</td><td class="column-4">India</td>
</tr>
<tr class="row-1635 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483b3d2621242917222921233d25293a082d2c2f2d3e2d3a3e2d662b2725">Sunila Jaikumar</a></td><td class="column-2">Head HR - Finacle</td><td class="column-3">Infosys Finacle</td><td class="column-4">India</td>
</tr>
<tr class="row-1636 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e69593888f92c88d8788898fa68781cb9283858e88898a89818f8395c885898b">Sunit Kanoi</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">AG Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1637 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a3d0c7c2d5c6e3d1c6cfd0c0ca8dc0ccce">Sunita Dave</a></td><td class="column-2">Director of Human Resources</td><td class="column-3">Relationship Science</td><td class="column-4">India</td>
</tr>
<tr class="row-1638 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2c5f59424558444d5f6c4d4a4a40594942584b5f024f4341">Sunitha Sriekumaar</a></td><td class="column-2">Sr Head HR Operations</td><td class="column-3">Affluent Global Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1639 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8dbddc6c6d186cbc0c9dec9c6e8c5cdccc1c9c9cfc1c4c1dcd186cbc7c5">Sunny Chavan</a></td><td class="column-2">Head - Talent Acquisition &amp; Management</td><td class="column-3">MediaAgility</td><td class="column-4">India</td>
</tr>
<tr class="row-1640 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2251574c4c5b0c514a504d444462574c4b5647414a0f504b4d0c414d4f0c4050">Sunny Shroff</a></td><td class="column-2">Director - HR</td><td class="column-3">Unitech</td><td class="column-4">India</td>
</tr>
<tr class="row-1641 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a696f747463346d7b76737b5a7b627f7475347975">Sunny Walia</a></td><td class="column-2">Assistant Vice President - Talent Acquisition</td><td class="column-3">Axeno</td><td class="column-4">India</td>
</tr>
<tr class="row-1642 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f98a8a9c9291988bb98c8d9689909890979ad79a9694">Supraja Sekhar</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">Utopia Global,</td><td class="column-4">India</td>
</tr>
<tr class="row-1643 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5b6b0b5b7a0a0b1adeba2b0a1a9a485a0b0a6a9aca1acababaab3a4b1acaaabb6eba6aaa8">Supreeth Gudla</a></td><td class="column-2">Pan India Head - Staffing and Operations</td><td class="column-3">Euclid Innovations</td><td class="column-4">India</td>
</tr>
<tr class="row-1644 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8bbbdb8baa1b1a9e6a988adaba7a4a9aaaca1afa1bca9a4abada6bcadbae6a1a6">Supriya A</a></td><td class="column-2">Senior Director - HR</td><td class="column-3">Ecolab Digital Center</td><td class="column-4">India</td>
</tr>
<tr class="row-1645 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e18993cf8c948c838088a18a8e8f9784938684cf828ecf888f">Supriya Dodia</a></td><td class="column-2">Assistant Vice President -HR</td><td class="column-3">Konverge Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1646 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4c7c1c4c6ddcdd59ad8c1d8d8d5f4d0dbcdd1da9ad7db9addda">Supriya Lulla</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Doyen Infosolutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1647 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a090f0a0813031b54091215140f3a1e1f1f0a0e1f11541b13">Supriya Shonu</a></td><td class="column-2">Human Resources Director</td><td class="column-3">DeepTek</td><td class="column-4">India</td>
</tr>
<tr class="row-1648 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6310161102010b0a4d100b02110e02231006514d000c0e">Surabhi Sharma</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">SE2</td><td class="column-4">India</td>
</tr>
<tr class="row-1649 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f0838582919ade8398899c919a91b097c1c088de939f9d">Suraj Shylaja</a></td><td class="column-2">Head Human Resources</td><td class="column-3">_G10X</td><td class="column-4">India</td>
</tr>
<tr class="row-1650 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483b3d3a29222d2d3c083b3c272b232d2c2f2d662b2725">Surajeet Sinha</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">StockEdge</td><td class="column-4">India</td>
</tr>
<tr class="row-1651 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a6d5d3d4c4cecf88c1d3d6d2c7e6c3c8d7d3c3d4c988c5c9cb">Surbhi Gupta</a></td><td class="column-2">Head- Talent Acquisition India</td><td class="column-3">Enquero</td><td class="column-4">India</td>
</tr>
<tr class="row-1652 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acdfd9decec4c582dfc5c2c4cdecc7cddcd8d9dec982cfd4">Surbhi Sinha</a></td><td class="column-2">HR Head</td><td class="column-3">Kapture CRM</td><td class="column-4">India</td>
</tr>
<tr class="row-1653 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7407010611071c5a1515101134121b1b101c01165a171b19">Suresh Aade</a></td><td class="column-2">Head Of Human Resources - India</td><td class="column-3">Foodhub</td><td class="column-4">India</td>
</tr>
<tr class="row-1654 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2251575047514a4162545750434f0c414d4f">Suresh C</a></td><td class="column-2">Director of People Operations</td><td class="column-3">Vuram</td><td class="column-4">India</td>
</tr>
<tr class="row-1655 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5b282e293e28331b2f292e3e2f3e38332834372e2f32343528753235">Suresh Divakaran</a></td><td class="column-2">Associate Vice President - Talent Acquisition</td><td class="column-3">TrueTech Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1656 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acdfd9dec9dfc4eccddfdcc5dec9c2d4d882cfc3c1">Suresh Menon</a></td><td class="column-2">Head Human Resources</td><td class="column-3">AspireNXT</td><td class="column-4">India</td>
</tr>
<tr class="row-1657 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6c5c3c4d3c5de98d8f6c1c4d3d8d5dec5d9dac3c2dfd9d8c598d5d9db">Suresh Nair</a></td><td class="column-2">Head - HR and Admn</td><td class="column-3">WRENCH Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1658 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e497919681978c8f91898596ca90818088859491a487968d908d878588968d928196ca878b89">Suresh Tedlapu</a></td><td class="column-2">Director of Recruiting Operations - India &amp; APAC</td><td class="column-3">CriticalRiver</td><td class="column-4">India</td>
</tr>
<tr class="row-1659 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e59196909780968da58e90918c979180868dcb868a88">Suresh Thangaraj</a></td><td class="column-2">Delivery Head - Talent Acquisition</td><td class="column-3">Kutir Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-1660 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa898f8893949e9f8899ba9e9b9799959d88958f8ad4999597">Surinder Cheema</a></td><td class="column-2">Associate Director : Recruitments</td><td class="column-3">Damco Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1661 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#423137302b3b236c29372f23300229372f2330232c6c212d2f">Suriya Kumar</a></td><td class="column-2">AVP - HR</td><td class="column-3">Kumaran Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1662 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bf8fef9e4e1e2ffe8cbe2e5ffeef9f9eae2ffa5e8e4e6">Surojit Chowdhury</a></td><td class="column-2">Director - Recruitment</td><td class="column-3">Interra Information Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1663 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8efdfbfcfbede6e7a0e6efe0eaefceeff4e7e2ebe0a0ede1e3">Suruchi Handa</a></td><td class="column-2">Associate Vice President - Human Resources</td><td class="column-3">Azilen Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1664 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb9880838498878aab8884859f8e888c8784898a87c5888486">Suruchi Khosla</a></td><td class="column-2">Head -HR(India)</td><td class="column-3">Contec Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1665 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#73000600121d5d17001a1f05123312061912005d101c1e">Susan D'Silva</a></td><td class="column-2">Head of HR and Recruitment</td><td class="column-3">Aujas Cybersecurity</td><td class="column-4">India</td>
</tr>
<tr class="row-1666 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b1c2c4c2d0dff1dad8c2c2d7dddec69fd2dedc">Susan Leonard</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Kissflow</td><td class="column-4">India</td>
</tr>
<tr class="row-1667 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#344741475c5151585f745d465b5a474d47405159471a575b59">Susheel Kumar</a></td><td class="column-2">Director Workforce Services EMEA &amp; APAC</td><td class="column-3">Iron Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1668 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e69593958e8f8ac88d938b8794a6839e9683828f92838f8885c885898b">Sushil Kumar</a></td><td class="column-2">Associate Director - Human Resources</td><td class="column-3">Expedite Technology Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1669 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9dadcdac1c4c0ddc887c8cddcdbc0e9ddccc2c5c0c7c287cac6c4">Sushmita Aduri</a></td><td class="column-2">Head of US HR / Manager - India Operations</td><td class="column-3">TekLink International</td><td class="column-4">India</td>
</tr>
<tr class="row-1670 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#780b0d0b15110c195613190d0b101113381a1419021d1b141916561b1715">Susmita Kaushik</a></td><td class="column-2">Associate Director - People &amp; Culture</td><td class="column-3">Blazeclan Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1671 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8abadaeb9f6bcb9abbfada8acb998acb0bdbab4adbdbeb4b9b5bdb4b9baabf6bbb7b5">Suva Dasgupta</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Blue Flame Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1672 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f784828196859996a891b7849e909a96da958e8392d994989a">Suvarna Fuke</a></td><td class="column-2">Head HR</td><td class="column-3">Sigma-Byte Computers</td><td class="column-4">India</td>
</tr>
<tr class="row-1673 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bdcec8cbcfd293d6dccfd0dcd6dccffdc8dfd4ccc8d890cec4cec9d8d0ce93ded2d0">Suvro Karmakar</a></td><td class="column-2">Global Human Resources - Platform Head</td><td class="column-3">Ubique Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1674 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#12616768737c7c733c667362737e7352737c797760717e7d67763c717d7f">Suzanna Tapala</a></td><td class="column-2">Head of Human Resources Operations</td><td class="column-3">Ankercloud GmbH</td><td class="column-4">India</td>
</tr>
<tr class="row-1675 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c3f3a29382d623f24292223350c38292f2422232528292238253835622f2321">Sveta Shenoy</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">TechnoIdentity</td><td class="column-4">India</td>
</tr>
<tr class="row-1676 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#443733252325302b6a37212a2331343025042536213021252a373021272c6a272b29">Swagato Sengupta</a></td><td class="column-2">Associate Director - Human Resources</td><td class="column-3">Areteans</td><td class="column-4">India</td>
</tr>
<tr class="row-1677 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#04777365696d6a65706c656a2a77766d6a6d726577656a447076656a776567706765697471772a676b69">Swaminathan Srinivasan</a></td><td class="column-2">Senior Human Resources Manager (HR Head)</td><td class="column-3">Transact Campus Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1678 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b7c4c0d6c7d9d699ddd6dbd6d3def7c4d6c1d6d9c3dec499d4d8da">Swapna Jaladi</a></td><td class="column-2">Vice President - HR &amp; Operations</td><td class="column-3">Savantis Solutions LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1679 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#51222630213f307f3a233822393f30112539343e2125383c243c7f3f3425">Swapna Krishna</a></td><td class="column-2">AVP-Human Resources</td><td class="column-3">Optimum Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1680 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#10636771607e715071667563647173633e737f7d">Swapna Lamba</a></td><td class="column-2">Head-People, Immigration &amp; Talent</td><td class="column-3">Avesta Computer Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1681 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a5b8b7b196a2b7a2b7a3b8bfa5a2b9a4b3f8b5b9bb">Swapnika Nag</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Tata CLiQ</td><td class="column-4">India</td>
</tr>
<tr class="row-1682 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bfccc8decfd1d6d391ddd7d0ccd4decdffcfcdded8d2deccc6cc91d6d1">Swapnil Bhoskar</a></td><td class="column-2">Head-HR</td><td class="column-3">Pragmasys Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1683 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7f0c081e0f111613510f161314171e111a3f1e0e120b1a1c171110131018161a0c511c1012">Swapnil Pilkhane</a></td><td class="column-2">Head - HR Operations</td><td class="column-3">AQM Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1684 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#addedaccddc3c4c183d9dfc4c6ccc3c8edc4dfc4decfd8dec4c3c8dede83cec2c0">Swapnil Trikane</a></td><td class="column-2">Head - Nordic, Baltic &amp; Eastern European Union</td><td class="column-3">IRIS Business Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1685 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a292d3b2835352a743d3531323b363f1a373f3e333b3b3d3336332e2374393537">Swaroop Shrm-Scp</a></td><td class="column-2">Head of People Operations</td><td class="column-3">MediaAgility</td><td class="column-4">India</td>
</tr>
<tr class="row-1686 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2d5e5a4c5f585d6d5d4241544a42430359484e45434241424a54">Swarup Chilumkuru</a></td><td class="column-2">Global Head - People Operations</td><td class="column-3">Polygon</td><td class="column-4">India</td>
</tr>
<tr class="row-1687 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ee9d998f9c9b9ec08d8681998a869b9c97ae9f9a9d818298c08d8183">Swarup Chowdhury</a></td><td class="column-2">Director-HR &amp; Finance</td><td class="column-3">Quarks</td><td class="column-4">India</td>
</tr>
<tr class="row-1688 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f0839e91829189919eb091848397de9e9584">Swathi Narayan</a></td><td class="column-2">Head of Human Resources, India</td><td class="column-3">ATSG</td><td class="column-4">India</td>
</tr>
<tr class="row-1689 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#92e1e5f3e6fafbbce1d2f7fce4fdebf5fefdf0f3febcf1fdff">Swathi S</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Envoy Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1690 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2c5f5b4d584502486c5f4d4a49025f494f595e455855">Swati Dev</a></td><td class="column-2">Senior Directo Talent Acquisition</td><td class="column-3">Safe Security</td><td class="column-4">India</td>
</tr>
<tr class="row-1691 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f6c687e6b7640725f7a736c717a6d317c7072">Swati M</a></td><td class="column-2">Head of HR</td><td class="column-3">Elsner Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1692 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#11626670657861516b787c7465637872623f727e7c">Swati Patil</a></td><td class="column-2">Head - HR</td><td class="column-3">ZiMetrics Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1693 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3a0a4b2a7bafda0bbb2a1beb293a7a1babca7a1b6b6fdbabd">Swati Sharma</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">TrioTree Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1694 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a696f68637b6c7b7469727334696d7b6e735a777b746e687b6e7f7934797577">Swati Suryavanshi</a></td><td class="column-2">Head - Strategic HR</td><td class="column-3">Mantra Softech</td><td class="column-4">India</td>
</tr>
<tr class="row-1695 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#512226343425287f3f3038231121242334223e3725263023347f323e3c">Sweety Nair</a></td><td class="column-2">Associate Director - HR</td><td class="column-3">PureSoftware</td><td class="column-4">India</td>
</tr>
<tr class="row-1696 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5320243636272a7d2132273b133220233630277d303c3e">Sweety Rath</a></td><td class="column-2">VP Global HR</td><td class="column-3">Alvaria,</td><td class="column-4">India</td>
</tr>
<tr class="row-1697 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed9e8f84899a8c84ad9e8c81999e848988c39e88">Sweta Bidwai</a></td><td class="column-2">Director - People &amp; Operations</td><td class="column-3">Saltside</td><td class="column-4">India</td>
</tr>
<tr class="row-1698 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2b1b5a7b6a382b0abb8b8aea7ecb6b4">Sweta Jain</a></td><td class="column-2">HR Head &amp; General Manager</td><td class="column-3">Rizzle</td><td class="column-4">India</td>
</tr>
<tr class="row-1699 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0c7f61657f647e6d4c657a7c226562">Sweta Mishra</a></td><td class="column-2">Director HR</td><td class="column-3">Indus Valley Partners</td><td class="column-4">India</td>
</tr>
<tr class="row-1700 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a292d3f2e323b1a323b39313f283f3b282e3274393537">Swetha Harikrishnan</a></td><td class="column-2">HR Director</td><td class="column-3">HackerEarth</td><td class="column-4">India</td>
</tr>
<tr class="row-1701 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7003071504181130191e041f1e151e1504071f021b035e131f1d">Swetha Monalisa</a></td><td class="column-2">Head - TAG / Human Resources Operations</td><td class="column-3">Intone</td><td class="column-4">India</td>
</tr>
<tr class="row-1702 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bccfc5d9d892daddd5c6ddd2fccecfced5c892dfd3d1">Syed Faizan</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Reliable Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1703 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d0a3a9b5b490b4b9a8b9a4b9beb4b9b1feb3bfbd">Syed Husain</a></td><td class="column-2">Head HR</td><td class="column-3">Dixit Infotech Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1704 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b4c7cdd1d0f4dcd1d8c4c7dcddd2c09ad7dbd9">Syed Ibrahim</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Helpshift</td><td class="column-4">India</td>
</tr>
<tr class="row-1705 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f7fde1e0e9e1ece5eae0edc4e7e1e0e7ebf7f7aae7ebe9">Syed Mehandi</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">CEDCOSS Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1706 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#087b716d6c48786966726d7a7c6d6b60666764676f616d7b266b6765">Syed Quddus</a></td><td class="column-2">Director - Talent Acquisition</td><td class="column-3">Panzer Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1707 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d5a6acb0b1fba7bcafa3bc95b8b0b2b4a6bab3a1a6bab9fbb6bab8">Syed Rizvi</a></td><td class="column-2">HEAD PAYROLL And Compliances</td><td class="column-3">Megasoft Solutions India</td><td class="column-4">India</td>
</tr>
<tr class="row-1708 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9eeafff0f7edf6ffdea7afedf1fdf7fff2b0fdf1f3">Tanisha T</a></td><td class="column-2">Head of HR and Finance</td><td class="column-3">91social</td><td class="column-4">India</td>
</tr>
<tr class="row-1709 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#334740524b565d527347415a5e524b525e56415a5052401d505c5e">Tanu Saxena</a></td><td class="column-2">Talent Acquisition head</td><td class="column-3">Data Glove</td><td class="column-4">India</td>
</tr>
<tr class="row-1710 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f7839699829dd98498999680969b92b7859e989a9293d994989a">Tanuj </a></td><td class="column-2">Head - HR and Operations, India (Director)</td><td class="column-3">RioMed</td><td class="column-4">India</td>
</tr>
<tr class="row-1711 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#81f5e0eff4ebc1e2eee5e4f3f2e3f3e0e8efafe2eeec">Tanuj Uppal</a></td><td class="column-2">HR Head</td><td class="column-3">CodersBrain</td><td class="column-4">India</td>
</tr>
<tr class="row-1712 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e490858a9188ca8e858d8aa4879d93859681ca878b89">Tanul Jain</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Cyware</td><td class="column-4">India</td>
</tr>
<tr class="row-1713 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4135202f37286f3201222e2c2c2433222428306f2028">Tanvi </a></td><td class="column-2">Principal - India Recruiting Head</td><td class="column-3">CommerceIQ</td><td class="column-4">India</td>
</tr>
<tr class="row-1714 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1b6f7a756d723576726f6f7a775b6d7772757072757d7435787476">Tanvi Mittal</a></td><td class="column-2">HR Head- India</td><td class="column-3">VLink Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1715 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7501141b031c5b06141905101e1407351814141b011c165b161a18">Tanvi Salpekar</a></td><td class="column-2">Director- HR</td><td class="column-3">Maantic Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1716 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a8dcc9d8c9dbe8dbd8c9dadcc9c6d8c7c3cdda86cbc7c5">Tapas Chatterjee</a></td><td class="column-2">President - Human Resources</td><td class="column-3">QUADRIFIC MEDIA</td><td class="column-4">India</td>
</tr>
<tr class="row-1717 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aedacfdccf80cdc6cbdcc7cfc0eedccbc8c2cbcddac7c1c0ddc7c0c8c1dd80cdc1c3">Tara Cherian</a></td><td class="column-2">HR Director</td><td class="column-3">Reflections Info Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1718 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9ddc8dbc0d8e9d9cfc0c7cfc6ddcccac187cac6c4">Tariq Khan</a></td><td class="column-2">HR Head</td><td class="column-3">Placement Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1719 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#552134273c217b373d3420383c3e153b302334303d2130363d7b363a38">Tarit Bhaumik</a></td><td class="column-2">Head HR</td><td class="column-3">Nevaeh Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1720 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#275346544942424a094a524d4e55674244484b46450944484a">Tasneem Mujir</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Ecolab Digital Center</td><td class="column-4">India</td>
</tr>
<tr class="row-1721 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ef849d9b84af9c9a9f9d8e9c80899bc18c8082">Tej Kumar</a></td><td class="column-2">Head -Talent Acquisition Operations (INDIA)</td><td class="column-3">SupraSoft</td><td class="column-4">India</td>
</tr>
<tr class="row-1722 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#324657585b5c5657407246404751594a1c515d5f">Tejinder Bhullar</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">TruckX Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1723 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#71051403141f121410311e1302140307145f1018">Terence Anthony</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Observe.AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1724 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe8a9b8d8dd09c8b8c929189be8d87939c97918d878d8a9b9d96d09d9193">Tess Burlow</a></td><td class="column-2">Head of HR</td><td class="column-3">Symbiosis Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1725 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa8e929b949d9b889b90ba8f94938a9295889fd4999597">Thangaraj Vinayagmoorthy</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Uniphore</td><td class="column-4">India</td>
</tr>
<tr class="row-1726 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#12667a77787361657b7c7b3c79677e7973607c7b526173797a736677717a3c717d7f">Thejaswini Kulkarni</a></td><td class="column-2">Head - HR &amp; Admin</td><td class="column-3">Sakhatech Information Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1727 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ed998584889f9f94c38b81989f94ad829f8c838a88c38e8280">Thierry Flury</a></td><td class="column-2">Director International HR Shared Services</td><td class="column-3">Orange Business Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1728 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#13677b7c7e7260785372696674723d707c7e">Thomas Kuruvila</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Azuga,</td><td class="column-4">India</td>
</tr>
<tr class="row-1729 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1f6b776d766c777e737e31715f706f6b766b317671">Thrishala Narule</a></td><td class="column-2">Head - Finance &amp; HR Operations</td><td class="column-3">Opt IT Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1730 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3044595d53497055485c495140401e535f5d">Timcy Bansal</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Exly</td><td class="column-4">India</td>
</tr>
<tr class="row-1731 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c68756f747d5c70737f73727d6a327f7371">Tisha Prasad</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">LocoNav</td><td class="column-4">India</td>
</tr>
<tr class="row-1732 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#63174d09020a0d230d0c15060f150c1b4d000c0e">Toshi Jain</a></td><td class="column-2">Director - HR &amp; Delivery Governance</td><td class="column-3">NovelVox</td><td class="column-4">India</td>
</tr>
<tr class="row-1733 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#483c3a213b2029662b2029262c3a290826213a3e2926293b27243d3c2127263b662b2725">Trisha Chandra</a></td><td class="column-2">VP - Human Resource</td><td class="column-3">Nirvana Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1734 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e1959394919588cf91808f92809384a1888f95848d888c848f95cf828e8c">Trupti Pansare</a></td><td class="column-2">Director &amp; CHRO</td><td class="column-3">Inteliment</td><td class="column-4">India</td>
</tr>
<tr class="row-1735 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6713151217130e49140f120c0b06270817131e0a4904080a">Trupti Shukla</a></td><td class="column-2">Director HR</td><td class="column-3">Optym</td><td class="column-4">India</td>
</tr>
<tr class="row-1736 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4c383c232f242d213c2d2020350c24233f382d222d203538252f3f622f2321">Tulasi Pochampally</a></td><td class="column-2">Senior Director, People Operations</td><td class="column-3">Planful</td><td class="column-4">India</td>
</tr>
<tr class="row-1737 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a0f1e1b03110f171b083a191b1e171b020254191517">Uday Kumar</a></td><td class="column-2">Vice President Staffing</td><td class="column-3">Cadmaxx Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1738 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7306171a0733171207121a1d101a1d171a125d101c1e">Udit Gupta</a></td><td class="column-2">Delivery Head - Talent Acquisition</td><td class="column-3">Software Data (India) - SDIL</td><td class="column-4">India</td>
</tr>
<tr class="row-1739 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bacfc9dbc8d1dbc8fad4dfcecdd5ccdfd494d9d5d7">Ujjal Sarkar</a></td><td class="column-2">Head - HR, Operations &amp; Finance</td><td class="column-3">Netwoven</td><td class="column-4">India</td>
</tr>
<tr class="row-1740 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#76031c1c0117171a58123600171a131802171406195815191b">Ujjwaal D</a></td><td class="column-2">Head HR</td><td class="column-3">Valenta</td><td class="column-4">India</td>
</tr>
<tr class="row-1741 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#13667e724c7e727b76607b6472617a537e7a7d77676176763d707c7e">Uma Maheshwari</a></td><td class="column-2">Associate Director - Talent</td><td class="column-3">MINDTREE</td><td class="column-4">India</td>
</tr>
<tr class="row-1742 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cabfa7abe4a2b88aa7abada4abb9a5acbee4a9a5a7">Uma Revanasiddaiah</a></td><td class="column-2">AVP - Human Resources, Operations Enablement</td><td class="column-3">Magnasoft</td><td class="column-4">India</td>
</tr>
<tr class="row-1743 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b5c0d8d4c79bdef5d4d6c0c3d0c7d6dadbc6c0d9c1dcdbd29bd6dad8">Umar Kizhuvapat</a></td><td class="column-2">Director - HR &amp; Operations</td><td class="column-3">Acuver Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1744 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#24514941574c0a4f454945504c6449455c5245480a474b49">Umesh Kamath</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">MaxVal Group,</td><td class="column-4">India</td>
</tr>
<tr class="row-1745 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#eb9e868e9883c5928a8f8a9dab8f92859b9984c5888486">Umesh Yadav</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">DynPro,</td><td class="column-4">India</td>
</tr>
<tr class="row-1746 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#196c6a7178377a71706b78607075596b7c7f757c7a6d7076776a70777f766a377a7674">Usha Chirayil</a></td><td class="column-2">Director Human Resources</td><td class="column-3">Reflections Info Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1747 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#82f7f1eae3ace8e3ebf1f5e3eec2f1fbf1f6e7efe3f6ebfaebece6ebe3ace1edef">Usha Jaiswal</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Systematix Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1748 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c090f141d52121d08143c121d08141f130e0c521f1311">Usha Nath</a></td><td class="column-2">Director HR</td><td class="column-3">NathCorp</td><td class="column-4">India</td>
</tr>
<tr class="row-1749 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4633352e2706253324237e726825292b">Usha Ns</a></td><td class="column-2">Human Resources Director</td><td class="column-3">CUBE84</td><td class="column-4">India</td>
</tr>
<tr class="row-1750 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e693928e87969687c88d93969687888287a695898a938183888f9ec885898b">Uthappa Kuppanda</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Solugenix</td><td class="column-4">India</td>
</tr>
<tr class="row-1751 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d6a3a2bdb7a4a5bea296b9b4a5b3a4a0b3f8b7bf">Utkarsh Tomar</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Observe.AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1752 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#daafaea9bbacf4b1b5aeb2bba8b39abfb7b8bfbff4b9b5f4b3b4">Utsav Kothari</a></td><td class="column-2">AVP- Human Resources</td><td class="column-3">Embee Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1753 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3640575f545e5740185d5e575858577650555f1b55555b1855595b">Vaibhav </a></td><td class="column-2">Chief People Officer</td><td class="column-3">FCI CCM</td><td class="column-4">India</td>
</tr>
<tr class="row-1754 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5325323a313b32251320303a363d3223273a307d303c3e">Vaibhav Ghai</a></td><td class="column-2">Head HR</td><td class="column-3">Scienaptic AI</td><td class="column-4">India</td>
</tr>
<tr class="row-1755 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#caa1bfa7abb8e4bc8aa4b8a9a5a4b9bfa6bea3a4adb9afb8bca3a9afe4a9a5a7">Vaibhav Kumar</a></td><td class="column-2">National Recruiting Director</td><td class="column-3">NR Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1756 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#72005c04131b101a130432021b0a1b015c131b">Vaibhav R</a></td><td class="column-2">Global Head of Talent Acquisition</td><td class="column-3">Pyxis One</td><td class="column-4">India</td>
</tr>
<tr class="row-1757 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f2e5ede6ece5f2edaaeec4edeae2ebe3e1eaa9e8e5e6f7aae7ebe9">Vaibhavi Joshi</a></td><td class="column-2">Head - HR &amp; Recruitments</td><td class="column-3">Infogen Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1758 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c7b1a6aea3afbea6a9a6b3afa6a987aea9a1aea9aeb3beb4b3b4e9a4a8aa">Vaidhyanathan C</a></td><td class="column-2">Head, Delivery Talent Acquisition and Operation</td><td class="column-3">Infinity</td><td class="column-4">India</td>
</tr>
<tr class="row-1759 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97e1f6fef3eef6f9f6e3fff6f9d7f4f6fbe4f8f1b9f4f8fa">Vaidyanathan P</a></td><td class="column-2">Head - HR</td><td class="column-3">California Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1760 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#344253555a505c5d74425d5646515a405c515558405c1a575b59">Vaishali Gandhi</a></td><td class="column-2">Vice President Finance, HR and Operations</td><td class="column-3">Vibrent Health</td><td class="column-4">India</td>
</tr>
<tr class="row-1761 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2157404c5249480f4a534852494f406153485544524e4755564053440f424e4c">Vamshi Krishna</a></td><td class="column-2">AVP Global Talent Acquisition</td><td class="column-3">Rite Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1762 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e690878b958fc88d948f958e8887a687928b838595c885898b">Vamsi Krishna</a></td><td class="column-2">Associate Director- Talent acquisition</td><td class="column-3">ATMECS Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1763 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#4d3b2c23292c232c632e252c3a212c0d242323282b38632e2220">Vandana Chawla</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Innefu Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1764 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0d7b6c63696c636c237d6c636968744d6c696c7d7974236e6260">Vandana Pandey</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Adapty</td><td class="column-4">India</td>
</tr>
<tr class="row-1765 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1c6a7d72787d727d326e73655c6a7a756e6f68327f7371">Vandana Roy</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">ValueFirst</td><td class="column-4">India</td>
</tr>
<tr class="row-1766 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6016010e094e1301140816090b20050b01100c15134e030f0d">Vani Sathvik</a></td><td class="column-2">Vice President - HR &amp; Admin</td><td class="column-3">Eka Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1767 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#89ffe8e7e0fde1e8a7e7e0fde0e7c9fafce7e5e0efeca7eae6e4">Vanitha Nitin</a></td><td class="column-2">Director, Head HR- ASC India</td><td class="column-3">Sun Life</td><td class="column-4">India</td>
</tr>
<tr class="row-1768 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acdacddecddcdecddfcdc882c1eccac0d9c9c2d8cbdec5c882cfc3c1">Vara Manda</a></td><td class="column-2">Recruitment Head</td><td class="column-3">Fluentgrid</td><td class="column-4">India</td>
</tr>
<tr class="row-1769 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#463027342768323336272a2a2f06272b282332222f212f32272a6825292b">Vara Tupalli</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Amnet Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1770 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c0b6a1b2a4a8a9aea9eeada1aea980a1a7a9aca5eda6b4eea3afad">Vardhini Mani</a></td><td class="column-2">Head HR</td><td class="column-3">Agile Financial Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1771 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a1d7c0d3cfc08fcfc0c8d3e1cfd9d5c6c4cf8fc2cecc">Varna Nair</a></td><td class="column-2">Head of HR</td><td class="column-3">NxtGen Infinite Datacenter</td><td class="column-4">India</td>
</tr>
<tr class="row-1772 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0a7e737965644a786b7a636e636464657c6b7e636564246e6f7c">Varsha Raghav</a></td><td class="column-2">Head of HR</td><td class="column-3">Rapid Innovation</td><td class="column-4">India</td>
</tr>
<tr class="row-1773 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fc8a9d8e8f949dbc9f93928f858f8899928895929a93d29f9391">Varsha Rathore</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Consystent Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1774 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aed8cfdcddc6cf80ddcbdac6c7cfeec8c7c0dacbc2c2c7d680cdc1c3">Varsha Sethia</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Fintellix Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1775 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f6809784859e97d8859e939d9784b6859384809f95939b978ed895999b">Varsha Shekar</a></td><td class="column-2">Human Resources Director</td><td class="column-3">ServiceMax</td><td class="column-4">India</td>
</tr>
<tr class="row-1776 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2b4aaa3b6afada6a782b6a3b4abb1a1a3eca1adaf">Varun Hatmode</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Tavisca</td><td class="column-4">India</td>
</tr>
<tr class="row-1777 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2e584f5c5b4000594f4a46594f6e4c475c4a4b574b004d4143">Varun Wadhwa</a></td><td class="column-2">Senior Director, People &amp; Culture</td><td class="column-3">Birdeye</td><td class="column-4">India</td>
</tr>
<tr class="row-1778 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bdcbdccedcd3c9d5d493d3fddacfd8c4d2cfdcd3dad893ded2d0">Vasanthi Naidu</a></td><td class="column-2">Vice President - Talent Acquisition &amp; Operations</td><td class="column-3">GreyOrange</td><td class="column-4">India</td>
</tr>
<tr class="row-1779 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#661007151348162608040e050f08020f074805090b">Vasu P</a></td><td class="column-2">Assistant Vice President - Human Resources</td><td class="column-3">63 moons Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1780 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b0c6d1c3c5d4d5c6ddf0dbd5dec3d9c5dd9ed3dfdd">Vasudev Munji</a></td><td class="column-2">AVP - HR</td><td class="column-3">Kensium</td><td class="column-4">India</td>
</tr>
<tr class="row-1781 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fc8a9998949dbc9f90938998889495929bd29f9391">Vedha Bharathi</a></td><td class="column-2">Chief People Officer</td><td class="column-3">cloudThing</td><td class="column-4">India</td>
</tr>
<tr class="row-1782 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1a7b4b4bfb0ffb3b9b0b6a6b0a591b8bfb7a3b0b3b4b0a5ffb2bebc">Veena Bhagwat</a></td><td class="column-2">Head - Human Resource</td><td class="column-3">InfraBeat Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1783 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2c5a4949424d025e4d436c44454b445f585e4949584558024f4341">Veena Rao</a></td><td class="column-2">Director of India Human Resource</td><td class="column-3">Highstreet IT Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1784 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2f594a4a414e015c4e5b465c476f42404a41484e484a014c4042">Veena Satish</a></td><td class="column-2">VP - People &amp; Culture</td><td class="column-3">MoEngage</td><td class="column-4">India</td>
</tr>
<tr class="row-1785 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#95e3f0f0fbf4bbe3fce6fdfbe0d5e5f9f4fbe6fae0e7f6f0bbf6faf8">Veena Vishnu</a></td><td class="column-2">Senior Director, HR</td><td class="column-3">PlanSource</td><td class="column-4">India</td>
</tr>
<tr class="row-1786 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3b5b1a2a7aba283b5f1b0aca5b7eda0acae">Vema Radha</a></td><td class="column-2">Director HR</td><td class="column-3">V2Soft</td><td class="column-4">India</td>
</tr>
<tr class="row-1787 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#234055464d4842576342474a574a404c4d50564f574a4d440d404c4e">Venkat Challa</a></td><td class="column-2">Sr. Director - Recruitment</td><td class="column-3">Aditi Consulting</td><td class="column-4">India</td>
</tr>
<tr class="row-1788 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e096858e8b8194ce92a08d928593958c94ce838f8d">Venkat Rengasamy</a></td><td class="column-2">SVP &amp; Head of HR</td><td class="column-3">MResult</td><td class="column-4">India</td>
</tr>
<tr class="row-1789 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5725362339363c3625173438252779223923337934383a">Venkata Akella</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">United Online,</td><td class="column-4">India</td>
</tr>
<tr class="row-1790 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b7d6e65606a7f6a25607e797e637e79624b7872667b636465726864797b25686466">Venkata Kuruhuri</a></td><td class="column-2">Senior Head HR</td><td class="column-3">Symphony Corporation</td><td class="column-4">India</td>
</tr>
<tr class="row-1791 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2b4b182a1aaa3aca5a7b2adaca6eca1adaf">Venkatesan Srinivasan</a></td><td class="column-2">Vice President Human Resources &amp; HR Head</td><td class="column-3">Changepond Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1792 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3b5a6ada8a2b7a6b0abeda1a983b5b1aab9a6eda0acae">Venkatesh Bj</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">VRIZE</td><td class="column-4">India</td>
</tr>
<tr class="row-1793 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#daacbfb4b1bbaebfa9b2bd9aafa9bfa8bfbbbea3f4b9b5b7">Venkatesh G</a></td><td class="column-2">Associate Director- Talent Acquisition</td><td class="column-3">USEReady</td><td class="column-4">India</td>
</tr>
<tr class="row-1794 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c8bea1aba3a3b1e6bba9a0a7a788a4a9a6adbcbcada9a5e6aba7a5">Vickky Sahoo</a></td><td class="column-2">Head Of Recruitment</td><td class="column-3">La Net Team Software Solution.</td><td class="column-4">India</td>
</tr>
<tr class="row-1795 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fe88979a96879fd08d9f93be8d8b8e9b8c918e8dd09f97">Vidhya Sam</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">SuperOps.ai</td><td class="column-4">India</td>
</tr>
<tr class="row-1796 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52243b362b337c21333e243712253d24242637313a7c313d3f">Vidya Salve</a></td><td class="column-2">Group Head â€“ Talent Acquisition</td><td class="column-3">WovV Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1797 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#60161312090b150d01122012051015140114090f0e4e030f0d">Vidya Srikumar</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Reputation.com</td><td class="column-4">India</td>
</tr>
<tr class="row-1798 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2b5d424c4247465f4344464a586b5f44454e5f4a4c05484446">Vigil Thomas</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">ToneTag</td><td class="column-4">India</td>
</tr>
<tr class="row-1799 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acdac5cbc2c9dfc482c1ecc1d5c4c9cdc0d8c4cfc4cdc1dcc5c3c282cfc3c1">Vignesh Manickam</a></td><td class="column-2">HR Director - India</td><td class="column-3">Calcium</td><td class="column-4">India</td>
</tr>
<tr class="row-1800 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#52243b353c37213a7c21333c353312213324333c263b217c313d3f">Vignesh Sanga</a></td><td class="column-2">Global HR Head</td><td class="column-3">Savantis Solutions LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1801 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b8cd96ced1dfd6ddcbd0f8d1d6cccad7d4d4d1dfddd6cc96dbd7d5">Vignesh Uthandi</a></td><td class="column-2">Delivery Head - Staffing Services &amp; Solutions</td><td class="column-3">Introlligent</td><td class="column-4">India</td>
</tr>
<tr class="row-1802 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d3a5bab9b2aafdb2a1b0bca793aabeb6b7bab2bfb2b1a0fdb0bcbe">Vijay Arcot</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Y Media Labs</td><td class="column-4">India</td>
</tr>
<tr class="row-1803 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0177686b60782f6674717560417360696872787275646c722f626e6c">Vijay Gupta</a></td><td class="column-2">Director of Global Human Resources</td><td class="column-3">Rahi</td><td class="column-4">India</td>
</tr>
<tr class="row-1804 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#73051a19120a5d18061e12013311061806041201061d145d101c1e">Vijay Kumar</a></td><td class="column-2">Head of Global Talent Acquisition</td><td class="column-3">BukuWarung</td><td class="column-4">India</td>
</tr>
<tr class="row-1805 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#dfa9b6b5bea6b4aab2beadf1ad9fbcb0b1abaaacf1b6b1">Vijay Kumar</a></td><td class="column-2">Director Human Resources Services</td><td class="column-3">Contus</td><td class="column-4">India</td>
</tr>
<tr class="row-1806 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#9ceaf5f6fde5ece9f2f8f5eedcf8ebfdf3b2f5f2">Vijay Pundir</a></td><td class="column-2">Group Head - Human Resources</td><td class="column-3">DWAO</td><td class="column-4">India</td>
</tr>
<tr class="row-1807 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#96e0fffcf7efb8e4f7ffd6f7e6f9fafaf9b8f3f8f1fff8f3f3e4">Vijay Rai</a></td><td class="column-2">Chief HR Officer</td><td class="column-3">Apollo</td><td class="column-4">India</td>
</tr>
<tr class="row-1808 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f2849b98938bdc80b29c938493819d948685938097dc919d9f">Vijay Rao</a></td><td class="column-2">VP - HR &amp; Operations</td><td class="column-3">NAVA Software Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1809 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1a6c73707b635a767f7b7e736b34797577">Vijay Sharma</a></td><td class="column-2">Head of Recruiting</td><td class="column-3">LeadIQ</td><td class="column-4">India</td>
</tr>
<tr class="row-1810 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d9afb0b3b8a0f7ad99b0a9aab6bfadf7bab6b4">Vijay T</a></td><td class="column-2">Head, Human Resources</td><td class="column-3">Amelia</td><td class="column-4">India</td>
</tr>
<tr class="row-1811 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#32445b58534b1c465b4553405b725a535e1f56481c515d5f">Vijay Tiwari</a></td><td class="column-2">Head of Plant Human Resources Operations</td><td class="column-3">HAL</td><td class="column-4">India</td>
</tr>
<tr class="row-1812 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#66100f0c071f481308080f0d140f150e08070826070517130309084805090b">Vijay Unnikrishnan</a></td><td class="column-2">Global Head-Human Resources</td><td class="column-3">Acqueon</td><td class="column-4">India</td>
</tr>
<tr class="row-1813 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#26504f4c475f475466554f414e52555643455254534b0845494b">Vijaya R</a></td><td class="column-2">Chief People Officer</td><td class="column-3">SightSpectrum LLC</td><td class="column-4">India</td>
</tr>
<tr class="row-1814 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c2b4aba8a3bba3ecb6a3aeaeb7b0ab82a5f3f2baeca1adaf">Vijaya Talluri</a></td><td class="column-2">Head - Talent Acquisition</td><td class="column-3">_G10X</td><td class="column-4">India</td>
</tr>
<tr class="row-1815 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ccbaa5a6adb5ada7bea5bfa4a2ade2b88ca0a9beade2b9bf">Vijayakrishna Tarikonda</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">Lera Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1816 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6b1d02010a120a070a001803060245182b1b0a12040f0a45080406">Vijayalakshmi Subramaniam</a></td><td class="column-2">Associate Vice President- Human Resources</td><td class="column-3">Payoda Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1817 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e4928d8e859d819085a4978188888796858290ca8a8190">Vijayeta Rohilla</a></td><td class="column-2">Delivery Head-Talent Acquisition</td><td class="column-3">Sellcraft Global Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1818 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c3b5aaa9aaaf83a2b3b3aaada6b0b0b4acb1afa7eda0acae">Vijil V</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Appiness Interactive</td><td class="column-4">India</td>
</tr>
<tr class="row-1819 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e3958a8996a38a8e8c808b82cd8a8c">Viju Gangadharan</a></td><td class="column-2">Director - Human Resources</td><td class="column-3">iMocha</td><td class="column-4">India</td>
</tr>
<tr class="row-1820 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bccad5d7ddcfcffcd5d2c8d9ceceddd5c892dfd3d1">Vikas Singh</a></td><td class="column-2">Director Recruitment</td><td class="column-3">Interra Information Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1821 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cbbda2a0aab8e5a0bea6aab98baaa7bfbeafa4e5a8a4">Vikash Choudhary</a></td><td class="column-2">Associate Director - Talent Acquisition</td><td class="column-3">Altudo</td><td class="column-4">India</td>
</tr>
<tr class="row-1822 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#acdac7cdc0c0c5cdc2dcd9deeccfc3dec8d5df82cfc3c1">Vikram Kallianpur</a></td><td class="column-2">Head-HR &amp; OD, Corporate Services</td><td class="column-3">Cordys</td><td class="column-4">India</td>
</tr>
<tr class="row-1823 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a9dfc0c2dbc8c487c2c8c5c5c0c8c7d9dcdbe9c0c7c7c6dfc8d9d9ddc0dfcc87cac6c4">Vikram Kallianpur</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">Innovapptive Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1824 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#8bfde2e0f9eae6cbecf2edfff9a5e8e4e6">Vikram Vijan</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Vouchagram India</td><td class="column-4">India</td>
</tr>
<tr class="row-1825 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#65130c0e17040b1125120007090c0b000c0b010c044b060a08">Vikrant Bhalodia</a></td><td class="column-2">Head of HR &amp; People Operations</td><td class="column-3">WeblineIndia</td><td class="column-4">India</td>
</tr>
<tr class="row-1826 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#e6908f8d94878892c881899f878aa681878b8395d4d29ed1c885898b">Vikrant Goyal</a></td><td class="column-2">VP (Head) HR - Games24x7</td><td class="column-3">Games24x7</td><td class="column-4">India</td>
</tr>
<tr class="row-1827 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#b6c0dfdbd7da98d4d7dac5d7c4d7f6d5d2c6dfd8d2dfd798d5d9db">Vimal Balsara</a></td><td class="column-2">Head Human Resource and Administration</td><td class="column-3">CDP India</td><td class="column-4">India</td>
</tr>
<tr class="row-1828 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7a0c13141b0354111b0808150d3a181f160d1554191517">Vinay Karrow</a></td><td class="column-2">Head HR</td><td class="column-3">BelWo Inc</td><td class="column-4">India</td>
</tr>
<tr class="row-1829 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#aed8c7c0cfd780c5c0eecddcc1dec7c080cdc1c3">Vinay Kn</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">CropIn Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1830 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#34425d5a554d1a59555c555e555a744051575c53515a5d51471a575b59">Vinay Mahajan</a></td><td class="column-2">Head HR</td><td class="column-3">TechGenies</td><td class="column-4">India</td>
</tr>
<tr class="row-1831 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#bccad5d2ddc592cffcd1ddd2c8d4ddd292dfd3d1">Vinay Singh</a></td><td class="column-2">Global Talent Acquisition Head</td><td class="column-3">Manthan</td><td class="column-4">India</td>
</tr>
<tr class="row-1832 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ef9986818a8a838ec188809f8e838e85809c969a838eaf869b8a838386888a818c8a889d809a9fc18c8082">Vineela Gopalajosyula</a></td><td class="column-2">Associate Director Talent Acquisition</td><td class="column-3">itelligence</td><td class="column-4">India</td>
</tr>
<tr class="row-1833 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#84f2edeae1e1f0f7c4f7f2e5e9aae7ebe9">Vineet Singh</a></td><td class="column-2">Head - Domestic Staffing</td><td class="column-3">SVAM International</td><td class="column-4">India</td>
</tr>
<tr class="row-1834 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#05736c6b6c676d6445617677662b666a68">Vinibha S</a></td><td class="column-2">Head of HR</td><td class="column-3">DSRC</td><td class="column-4">India</td>
</tr>
<tr class="row-1835 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#72041b1c1b06135c18130b1302131e131c3202001d041b1c061e5c111d1f">Vinita Jayapalan</a></td><td class="column-2">Director - Global People &amp; Culture</td><td class="column-3">ProV International</td><td class="column-4">India</td>
</tr>
<tr class="row-1836 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#62140b0c0c1b22160d12114f0b0c164c010d0f">Vinny Sethi</a></td><td class="column-2">Head HR at TOPS Technologies Pvt Ltd</td><td class="column-3">TOPS Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1837 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#1d6b747373645d6a787f7a686f6867337473">Vinny Singh</a></td><td class="column-2">Human Resources Director</td><td class="column-3">Webguruz Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1838 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#14627d7a7b703a777c547a717178767861713a777b79">Vinod Ch</a></td><td class="column-2">Human Resources Director</td><td class="column-3">NeelBlue Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1839 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d1a7b8bfbeb5ffbcb0bdb8ba91b0e0a5b4b2b9bfbebdbeb6a8ffb2bebc">Vinod Malik</a></td><td class="column-2">Head HR</td><td class="column-3">A-1 Technology</td><td class="column-4">India</td>
</tr>
<tr class="row-1840 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7b0d1215141f3b1a171702551214">Vinod Mankala</a></td><td class="column-2">Director of People &amp; Culture</td><td class="column-3">Ally.io</td><td class="column-4">India</td>
</tr>
<tr class="row-1841 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#26504f4849420854664914404f48404955494a53524f4948550845494b">Vinod Reddy</a></td><td class="column-2">Delivery Head - Recruitment</td><td class="column-3">O2F INFO SOLUTIONS</td><td class="column-4">India</td>
</tr>
<tr class="row-1842 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#c5b3acabaaaeebb6a0b4b0a0b7aca485afa1a4eba6aaa8">Vinok Sequeria</a></td><td class="column-2">Director HR</td><td class="column-3">i2 Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1843 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ff8996918a8b979ed198908996919b9e91bf8d9a8c8a938b969c948cd19c9092">Vinutha Govindan</a></td><td class="column-2">Head of Talent Experience</td><td class="column-3">Resulticks</td><td class="column-4">India</td>
</tr>
<tr class="row-1844 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5d2b342d3433732f1d3e323934313c2f733e3230">Vipin Ravindranath</a></td><td class="column-2">Head of Talent Acquisition</td><td class="column-3">Codilar Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1845 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#196f70697077376a71786b7478596f6d777c6d636e7c756d377a7674">Vipin Sharma</a></td><td class="column-2">Head of HR</td><td class="column-3">VT Netzwelt</td><td class="column-4">India</td>
</tr>
<tr class="row-1846 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ceb8a7bcafafa48ea6abafaaa1bbbae0ada1a3">Viraaj Arora</a></td><td class="column-2">Head - Culture and Talent</td><td class="column-3">Headout</td><td class="column-4">India</td>
</tr>
<tr class="row-1847 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#54223d273c353f3c357a27353d3a3d143d3a323b2720263d30317a373b39">Vishakha Saini</a></td><td class="column-2">HR Head</td><td class="column-3">InfoStride</td><td class="column-4">India</td>
</tr>
<tr class="row-1848 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#186e716b7079737079366b587571767c7f796c7d367176">Vishakha Shinde</a></td><td class="column-2">Assistant Vice President Human Resources</td><td class="column-3">Mindgate Solutions</td><td class="column-4">India</td>
</tr>
<tr class="row-1849 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#5a2c3329323b3674313b343b3e3f1a203f343b282e74393537">Vishal Kanade</a></td><td class="column-2">Sr. Director Finance and HR</td><td class="column-3">Zen &amp; Art</td><td class="column-4">India</td>
</tr>
<tr class="row-1850 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7c0a150f141d1052121d1508141d12153c110510131a1d11151005521f1311">Vishal Naithani</a></td><td class="column-2">Head of People &amp; Culture</td><td class="column-3">Mylo</td><td class="column-4">India</td>
</tr>
<tr class="row-1851 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#15637c667d747955747960787b606d3b767a78">Vishal Verma</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Alumnus Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1852 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#01776872696c60416d68756c7472362f626e6c">Vishma Vivek</a></td><td class="column-2">Global Head-Talent Acquisition</td><td class="column-3">Litmus7</td><td class="column-4">India</td>
</tr>
<tr class="row-1853 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fd8b948e959388d38b9c8f99959c93bd9f9489919c8e929b89d39e9290">Vishnu Ramesh</a></td><td class="column-2">Head of HR</td><td class="column-3">Bitla Software</td><td class="column-4">India</td>
</tr>
<tr class="row-1854 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#760017041904173603181f10191503055815191b">Vishruti Arora</a></td><td class="column-2">Vice President - People &amp; Culture</td><td class="column-3">UniFocus</td><td class="column-4">India</td>
</tr>
<tr class="row-1855 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#790f100a110f18570918171c0b103915100910571017">Vishva Paneri</a></td><td class="column-2">Head HR</td><td class="column-3">Lipi Data Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1856 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8aeb1abb0afb998a8b4b9acbeb7aab5e1f6bbb7b5">Vishwa Kapadia</a></td><td class="column-2">Chief People Officer</td><td class="column-3">Platform9 Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1857 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#a5d3ccd6cdd2c4cfccd1e5d6cdccd3c4c4c8cc8bc6cac8">Vishwajit Sakhare</a></td><td class="column-2">Director - Renewals, HR and Admin</td><td class="column-3">Shivaami Cloud Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1858 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7e08170d16091f101f0a16501c1b1212171f0e0e1f3e1d111a1b1d0c1f180a501d11501710">Vishwanath Belliappa</a></td><td class="column-2">Chief People Officer</td><td class="column-3">CodeCraft Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1859 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#94e2fde0fcfdfff5d4fbe4e0fdf9fdeef1fde0e7ede7e0f1f9e7baf7fbf9">Vithika Binjrajka</a></td><td class="column-2">Vice President Human Resources</td><td class="column-3">Optimize IT Systems</td><td class="column-4">India</td>
</tr>
<tr class="row-1860 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#ff8996899a9495bf8c9a939a9c8b8c908a8d9c9a96918b93d19c9092">Vivek </a></td><td class="column-2">Director Of Operations (Recruitment &amp; Delivery)</td><td class="column-3">Select Source International</td><td class="column-4">India</td>
</tr>
<tr class="row-1861 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#cabca3bcafa18abaaba9a3aca3a9a8baa5e4a9a5a7">Vivek Gaur</a></td><td class="column-2">Chief Peoples Officer</td><td class="column-3">Pacific Global</td><td class="column-4">India</td>
</tr>
<tr class="row-1862 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0b7d627d6e604b636e67627e78267f6e686325686466">Vivek Purc</a></td><td class="column-2">Vice President - Staffing Services</td><td class="column-3">Helius Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1863 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#55233c23303e7b26342d303b34153b3022262130363d3b3a393a322c263027233c3630267b363a38">Vivek Saxena</a></td><td class="column-2">Head - HR Ops</td><td class="column-3">News Technology Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1864 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#6d1b041b08061e04030a052d07181d0419040e08430e0200">Vivek Singh</a></td><td class="column-2">Director- HR &amp; Operations</td><td class="column-3">Jupitice Justice Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1865 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#037571626e2d7543677660666d6a772d606c6e">Vram V</a></td><td class="column-2">Director Talent Acquisition</td><td class="column-3">Ducen</td><td class="column-4">India</td>
</tr>
<tr class="row-1866 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#790f00180a570b1814180b1813390d0b0c0a0d0b181a1c571a1614">Vyas Ramaraj</a></td><td class="column-2">Director HR</td><td class="column-3">TrusTrace</td><td class="column-4">India</td>
</tr>
<tr class="row-1867 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#3a435b495b4814507a4e5f5952575b545d5514545f4e">Yasar Arafath</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Techmango Technology Services</td><td class="column-4">India</td>
</tr>
<tr class="row-1868 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#d8a1b9abb0b1b3b998b5b9afb9b1b5b9b1b4f6bbb7b5">Yashika Gupta</a></td><td class="column-2">Head of Recruitment</td><td class="column-3">Mawai Infotech</td><td class="column-4">India</td>
</tr>
<tr class="row-1869 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0970687a61606268497f7b60736c276a6664">Yashika Thimmaiah</a></td><td class="column-2">Chief Human Resources Officer</td><td class="column-3">VRIZE</td><td class="column-4">India</td>
</tr>
<tr class="row-1870 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#fa839b89928a9b96d4839b9e9b8cba9e83948a889593949e939bd4999597">Yashpal Yadav</a></td><td class="column-2">Head Of Talent Management</td><td class="column-3">DynPro,</td><td class="column-4">India</td>
</tr>
<tr class="row-1871 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#067f67756e716768726e7546646a73646f74656e2865696b">Yashwanth Salian</a></td><td class="column-2">Head Of Human Resources &amp; Administration</td><td class="column-3">Blubirch</td><td class="column-4">India</td>
</tr>
<tr class="row-1872 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#97eef2e4fff6b9f5e5f6fffaf5fff6e3e3d7f4f8f9e3f2f9e3e4e3f6f4fcb9f4f8fa">Yesha Brahmbhatt</a></td><td class="column-2">Associate Director Human Resources</td><td class="column-3">Contentstack</td><td class="column-4">India</td>
</tr>
<tr class="row-1873 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#235a4c4446504b0d544251424d6350424d474b4257420d404c4e">Yogesh Waran</a></td><td class="column-2">Director- Talent Acquisition</td><td class="column-3">Sandhata Technologies</td><td class="column-4">India</td>
</tr>
<tr class="row-1874 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#2a53454d435e4b0459424b58474b6a444f5e59474b585e5004494547">Yogita Sharma</a></td><td class="column-2">Head-HR(People and Culture)</td><td class="column-3">Netsmartz</td><td class="column-4">India</td>
</tr>
<tr class="row-1875 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#7802190a16190c0a110e1d1c11380e1d0a0b1955161d0c0f170a130b561b1715">Zarna Trivedi</a></td><td class="column-2">Head - Human Resources</td><td class="column-3">Versa Networks</td><td class="column-4">India</td>
</tr>
<tr class="row-1876 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#62180707110a030c4c090a030c220e170f0b0c071101070c164c060b050b16030e">Zeeshan Khan</a></td><td class="column-2">Head Of Human Resources</td><td class="column-3">Luminescent Digital</td><td class="column-4">India</td>
</tr>
<tr class="row-1877 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#f58f9c94db94999498b597998090859c9b909485859990db9c9a">Zia Alam</a></td><td class="column-2">Chief People Officer</td><td class="column-3">bluepineapple</td><td class="column-4">India</td>
</tr>
<tr class="row-1878 even">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#0f757a6d6e667d21786e61664f616a7b626e68666c7c60637a7b6660617c216c6062">Zubair Wani</a></td><td class="column-2">Associate Director - Human Resources</td><td class="column-3">NTT DATA</td><td class="column-4">India</td>
</tr>
<tr class="row-1879 odd">
	<td class="column-1"><a href="/cdn-cgi/l/email-protection#90eae5fcf6f9e1f1e2bee3e9f5f4d0fef5e4f3ffe2f5bef3ffbef9fe">Zulfiqar Syed</a></td><td class="column-2">Associate Vice President - HR</td><td class="column-3">Netcore Cloud</td><td class="column-4">India</td>
</tr>
</tbody>
</table>
<!-- #tablepress-19 from cache -->
</div></div></div></div></div></div><script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script id="script-119399" data-row="script-119399" type="9dca68f643e17b109e1aaf43-text/javascript" class="vc_controls">UNCODE.initRow(document.getElementById("script-119399"));</script></div></div></div><div class="row-container">
		  					<div class="row row-parent style-light limit-width no-top-padding double-bottom-padding">
									<div class="widget-container post-tag-container uncont text-"><div class="tagcloud"><a href="https://salesleadsforever.com/tag/linkedin-industry-list/" class="tag-cloud-link tag-link-145 tag-link-position-1" style="font-size: 11px;">LinkedIn Industry List</a></div></div>
								</div>
							</div></div><div class="post-after row-container"><div data-parent="true" class="vc_row row-container"><div class="row no-top-padding double-bottom-padding single-h-padding limit-width row-parent"><div class="wpb_row row-inner"><div class="wpb_column pos-top pos-center align_left column_parent col-lg-12 double-internal-gutter"><div class="uncol style-light"  ><div class="uncoltable"><div class="uncell"><div class="uncont no-block-padding col-custom-width" style="max-width:804px;"><div class="divider-wrapper "  >
    <hr class="border-default-color separator-no-padding"  />
</div>
<div class="author-profile el-author-profile author-profile-box-left  has-thumb" ><div class="uncode-avatar-wrapper single-media uncode-single-media" style="width: 120px"><div class="single-wrapper" style="max-width: 120px"><div class="uncode-single-media-wrapper single-advanced"><div class="tmb  img-circle tmb-bordered tmb-media-first tmb-light tmb-img-ratio tmb-content-under tmb-media-last">
						<div class="t-inside style-color-lxmt-bg" ><div class="t-entry-visual"><div class="t-entry-visual-tc"><div class="t-entry-visual-cont"><div class="dummy" style="padding-top: 100%;"></div><div class="t-entry-visual-overlay"><div class="t-entry-visual-overlay-in " style="opacity: 0;"></div></div>
									<div class="t-overlay-wrap">
										<div class="t-overlay-inner">
											<div class="t-overlay-content">
												<div class="t-overlay-text half-block-padding"><div class="t-entry t-single-line"></div></div></div></div></div><img alt='' src='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=120&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=240&#038;d=mm&#038;r=g 2x' class='avatar avatar-120 photo' height='120' width='120' decoding='async'/></div>
				</div>
			</div></div>
					</div></div></div></div><div class="author-profile-content"><h5 class="h4 fontspace-781688"><a href="https://salesleadsforever.com/author/salesleadsforever/"  title="Manjunath post page" target="_self"><span>Manjunath</span></a></h5><div class="author-profile-bio text-top-reduced"><p>Unlock your sales potential with our custom B2B data solutions, covering industry, company size, tech, job titles, and more</p>
</div><span class="btn-container" ><a href="https://salesleadsforever.com/author/salesleadsforever/" class="custom-link btn btn-sm btn-text-skin btn-color-uydo btn-outline btn-icon-left" title="Manjunath post page" target="_self">All author posts</a></span></div></div></div></div></div></div></div><script id="script-828320" data-row="script-828320" type="9dca68f643e17b109e1aaf43-text/javascript" class="vc_controls">UNCODE.initRow(document.getElementById("script-828320"));</script></div></div></div></div><div class="post-after row-container"><div data-parent="true" class="vc_row style-color-lxmt-bg vc_custom_1594271322706 border-color-gyho-color row-container" style="border-style: solid;border-top-width: 1px ;"><div class="row col-no-gutter double-top-padding double-bottom-padding single-h-padding limit-width row-parent"><div class="wpb_row row-inner"><div class="wpb_column pos-top pos-center align_center column_parent col-lg-12 single-internal-gutter"><div class="uncol style-light"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="vc_custom_heading_wrap "><div class="heading-text el-text" ><h5 class="font-762333 fontsize-160000 fontspace-502722 text-uppercase" ><span>Related Posts</span></h5></div><div class="clear"></div></div><div class="owl-carousel-wrapper carousel-overflow-visible">
					<div class="owl-carousel-container owl-carousel-loading single-gutter">
			<div id="index-155886559057" class="owl-carousel owl-element owl-height-auto owl-dots-outside owl-dots-single-block-padding owl-dots-align-center" data-dotsmobile="true" data-navmobile="false" data-navspeed="400" data-autoplay="false" data-stagepadding="0" data-lg="3" data-md="3" data-sm="1" data-vp-height="false">
			<div class="tmb tmb-carousel tmb-iso-h33 tmb-round img-round-xs tmb-light tmb-overlay-text-anim tmb-overlay-anim tmb-content-left tmb-content-mobile-center tmb-shadowed tmb-shadowed-sm tmb-entry-title-capitalize  grid-cat-104 tmb-id-87722 tmb-img-ratio tmb-content-under tmb-media-first">
						<div class="t-inside style-color-xsdn-bg animate_when_almost_visible zoom-in" data-delay="200"><div class="t-entry-visual"><div class="t-entry-visual-tc"><div class="t-entry-visual-cont"><div class="dummy" style="padding-top: 50%;"></div><a tabindex="-1" href="https://salesleadsforever.com/list-of-websites-using-webengage-marketing-platform-2023/" class="pushed" target="_self" data-lb-index="0"><div class="t-entry-visual-overlay"><div class="t-entry-visual-overlay-in style-dark-bg" style="opacity: 0.5;"></div></div>
									<div class="t-overlay-wrap">
										<div class="t-overlay-inner">
											<div class="t-overlay-content">
												<div class="t-overlay-text single-block-padding"><div class="t-entry t-single-line"><i class="fa fa-plus2 t-icon-size-sm t-overlay-icon"></i></div></div></div></div></div><img decoding="async" class="adaptive-async" src="https://salesleadsforever.com/wp-content/uploads/2023/02/Webengage-Platform-Users-List-uai-258x129.png" width="258" height="129" alt="" data-uniqueid="88189-121898" data-guid="https://salesleadsforever.com/wp-content/uploads/2023/02/Webengage-Platform-Users-List.png" data-path="2023/02/Webengage-Platform-Users-List.png" data-width="600" data-height="315" data-singlew="4" data-singleh="2" data-crop="1" data-fixed="" /></a></div>
				</div>
			</div><div class="t-entry-text">
							<div class="t-entry-text-tc single-block-padding"><div class="t-entry"><p class="t-entry-meta"><span class="t-entry-date">February 7, 2023</span></p><h3 class="t-entry-title h5"><a href="https://salesleadsforever.com/list-of-websites-using-webengage-marketing-platform-2023/" target="_self">Companies Using WebEngage Marketing Platform</a></h3><div class="t-entry-excerpt "><p>When you are alone for days or weeks at…</p></div><hr class="separator-extra" /><p class="t-entry-author"><a href="https://salesleadsforever.com/author/salesleadsforever/" class="tmb-avatar-size-md"><img alt='' src='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=40&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=80&#038;d=mm&#038;r=g 2x' class='avatar avatar-40 photo' height='40' width='40' decoding='async'/><span class="tmb-username-wrap"><span class="tmb-username-text">by Manjunath</span><span class="tmb-user-qualification"></span></span></a></p></div></div>
					</div></div>
					</div><div class="tmb tmb-carousel tmb-iso-h33 tmb-round img-round-xs tmb-light tmb-overlay-text-anim tmb-overlay-anim tmb-content-left tmb-content-mobile-center tmb-shadowed tmb-shadowed-sm tmb-entry-title-capitalize  grid-cat-104 tmb-id-87718 tmb-img-ratio tmb-content-under tmb-media-first">
						<div class="t-inside style-color-xsdn-bg animate_when_almost_visible zoom-in" data-delay="200"><div class="t-entry-visual"><div class="t-entry-visual-tc"><div class="t-entry-visual-cont"><div class="dummy" style="padding-top: 50%;"></div><a tabindex="-1" href="https://salesleadsforever.com/list-of-funded-companies-in-india-usa-australia-2023/" class="pushed" target="_self" data-lb-index="1"><div class="t-entry-visual-overlay"><div class="t-entry-visual-overlay-in style-dark-bg" style="opacity: 0.5;"></div></div>
									<div class="t-overlay-wrap">
										<div class="t-overlay-inner">
											<div class="t-overlay-content">
												<div class="t-overlay-text single-block-padding"><div class="t-entry t-single-line"><i class="fa fa-plus2 t-icon-size-sm t-overlay-icon"></i></div></div></div></div></div><img decoding="async" class="adaptive-async" src="https://salesleadsforever.com/wp-content/uploads/2023/02/List-of-Funded-Companies-2023-scaled-uai-258x129.jpg" width="258" height="129" alt="" data-uniqueid="87719-112571" data-guid="https://salesleadsforever.com/wp-content/uploads/2023/02/List-of-Funded-Companies-2023-scaled.jpg" data-path="2023/02/List-of-Funded-Companies-2023-scaled.jpg" data-width="2560" data-height="1707" data-singlew="4" data-singleh="2" data-crop="1" data-fixed="" /></a></div>
				</div>
			</div><div class="t-entry-text">
							<div class="t-entry-text-tc single-block-padding"><div class="t-entry"><p class="t-entry-meta"><span class="t-entry-date">February 7, 2023</span></p><h3 class="t-entry-title h5"><a href="https://salesleadsforever.com/list-of-funded-companies-in-india-usa-australia-2023/" target="_self">2023: Funded Companies in India, USA &#038; Australia</a></h3><div class="t-entry-excerpt "><p>When you are alone for days or weeks at…</p></div><hr class="separator-extra" /><p class="t-entry-author"><a href="https://salesleadsforever.com/author/salesleadsforever/" class="tmb-avatar-size-md"><img alt='' src='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=40&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=80&#038;d=mm&#038;r=g 2x' class='avatar avatar-40 photo' height='40' width='40' decoding='async'/><span class="tmb-username-wrap"><span class="tmb-username-text">by Manjunath</span><span class="tmb-user-qualification"></span></span></a></p></div></div>
					</div></div>
					</div><div class="tmb tmb-carousel tmb-iso-h33 tmb-round img-round-xs tmb-light tmb-overlay-text-anim tmb-overlay-anim tmb-content-left tmb-content-mobile-center tmb-shadowed tmb-shadowed-sm tmb-entry-title-capitalize  grid-cat-104 tmb-id-87715 tmb-img-ratio tmb-content-under tmb-media-first">
						<div class="t-inside style-color-xsdn-bg animate_when_almost_visible zoom-in" data-delay="200"><div class="t-entry-visual"><div class="t-entry-visual-tc"><div class="t-entry-visual-cont"><div class="dummy" style="padding-top: 50%;"></div><a tabindex="-1" href="https://salesleadsforever.com/cxos-email-list-computer-software-it-companies-2023/" class="pushed" target="_self" data-lb-index="2"><div class="t-entry-visual-overlay"><div class="t-entry-visual-overlay-in style-dark-bg" style="opacity: 0.5;"></div></div>
									<div class="t-overlay-wrap">
										<div class="t-overlay-inner">
											<div class="t-overlay-content">
												<div class="t-overlay-text single-block-padding"><div class="t-entry t-single-line"><i class="fa fa-plus2 t-icon-size-sm t-overlay-icon"></i></div></div></div></div></div><img decoding="async" class="adaptive-async" src="https://salesleadsforever.com/wp-content/uploads/2023/02/CXO-Email-Database-Free-2023-uai-258x129.jpg" width="258" height="129" alt="" data-uniqueid="87716-110539" data-guid="https://salesleadsforever.com/wp-content/uploads/2023/02/CXO-Email-Database-Free-2023.jpg" data-path="2023/02/CXO-Email-Database-Free-2023.jpg" data-width="1200" data-height="628" data-singlew="4" data-singleh="2" data-crop="1" data-fixed="" /></a></div>
				</div>
			</div><div class="t-entry-text">
							<div class="t-entry-text-tc single-block-padding"><div class="t-entry"><p class="t-entry-meta"><span class="t-entry-date">February 7, 2023</span></p><h3 class="t-entry-title h5"><a href="https://salesleadsforever.com/cxos-email-list-computer-software-it-companies-2023/" target="_self">CXO’s Email Details of IT Companies</a></h3><div class="t-entry-excerpt "><p>When you are alone for days or weeks at…</p></div><hr class="separator-extra" /><p class="t-entry-author"><a href="https://salesleadsforever.com/author/salesleadsforever/" class="tmb-avatar-size-md"><img alt='' src='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=40&#038;d=mm&#038;r=g' srcset='https://secure.gravatar.com/avatar/b0c1dc184950397b646bb4cf7c40f6d9?s=80&#038;d=mm&#038;r=g 2x' class='avatar avatar-40 photo' height='40' width='40' decoding='async'/><span class="tmb-username-wrap"><span class="tmb-username-text">by Manjunath</span><span class="tmb-user-qualification"></span></span></a></p></div></div>
					</div></div>
					</div>		</div>

	</div>
	</div>
</div></div></div></div></div><script id="script-163923" data-row="script-163923" type="9dca68f643e17b109e1aaf43-text/javascript" class="vc_controls">UNCODE.initRow(document.getElementById("script-163923"));</script></div></div></div></div><div class="post-footer post-footer-light row-container"><div class="row-container">
		  					<div class="row row-parent style-light limit-width no-top-padding double-bottom-padding">
									<div class="post-share">
	          						<div class="detail-container margin-auto">
													<div class="share-button share-buttons share-inline only-icon"></div>
												</div>
											</div>
								</div>
							</div></div></div><div class="row-container row-navigation row-navigation-light">
		  					<div class="row row-parent style-light limit-width">
									<nav class="post-navigation">
									<ul class="navigation"><li class="page-prev"><span class="btn-container"><a class="btn btn-link text-default-color btn-icon-left" href="https://salesleadsforever.com/linkedin-industry-sector-list-2023/" rel="prev"><i class="fa fa-angle-left"></i><span>Prev</span></a></span></li><li class="nav-back"><span class="btn-container"><a class="btn btn-link text-default-color" href="https://salesleadsforever.com/blogs/">Main Blog</a></span></li><li class="page-next"><span class="btn-container"><a class="btn btn-link text-default-color btn-icon-right" href="https://salesleadsforever.com/cxos-email-list-computer-software-it-companies-2023/" rel="next"><span>Next</span><i class="fa fa-angle-right"></i></a></span></li></ul><!-- .navigation -->
							</nav><!-- .post-navigation -->
								</div>
							</div>
          </div>
        </article>								</div><!-- sections container -->
							</div><!-- page wrapper -->
												<footer id="colophon" class="site-footer">
							<div data-parent="true" class="vc_row style-color-jevc-bg row-container"><div class="row col-double-gutter double-top-padding exa-bottom-padding single-h-padding limit-width row-parent"><div class="wpb_row row-inner"><div class="wpb_column pos-top pos-center align_left column_parent col-lg-2 single-internal-gutter"><div class="uncol style-dark"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="vc_custom_heading_wrap "><div class="heading-text el-text" ><h5 class="h4 font-weight-300 text-color-xsdn-color" ><span><span class="font-762333">Who Are We</span></span></h5></div><div class="clear"></div></div><div class="uncode_text_column" ><p><span class="font-762333">Sales Leads Forever is a B2B Lead Generation &amp; B2B Company &amp; Contact Data Provider in Bengaluru.</span></p>
</div></div></div></div></div></div><div class="wpb_column pos-top pos-center align_left column_parent col-lg-2 single-internal-gutter"><div class="uncol style-dark"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="vc_custom_heading_wrap "><div class="heading-text el-text" ><h5 class="h4 font-weight-300 text-color-xsdn-color" ><span><span class="font-762333">Explore</span></span></h5></div><div class="clear"></div></div><div class="uncode-wrapper uncode-list" >
<ul class="icons">
 	<li><i class="fa fa-arrow-right3"></i><span class="font-762333"><a href="https://salesleadsforever.com/about-us/" rel="nofollow noopener">About Us</a></span></li>
 	<li><i class="fa fa-arrow-right3"></i><span class="font-762333"><a href="https://salesleadsforever.com/b2b-contact-database-solution/">Data as a Service</a></span></li>
 	<li><i class="fa fa-arrow-right3"></i><span class="font-762333"><a href="https://salesleadsforever.com/b2b-email-marketing/">B2B Lead Gen Service</a></span></li>
 	<li><i class="fa fa-arrow-right3"></i><span class="font-762333"><a href="https://salesleadsforever.com/seo-service-bangalore/">SEO Service</a></span></li>
 	<li><i class="fa fa-arrow-right3"></i><span class="font-762333"><a href="https://salesleadsforever.com/contact-us/">Contact Us</a></span></li>
 	<li><i class="fa fa-arrow-right3"></i><span class="font-762333"><a href="https://salesleadsforever.com/blogs/">Latest Blogs</a></span></li>
</ul>
</div></div></div></div></div></div><div class="wpb_column pos-top pos-center align_left column_parent col-lg-2 single-internal-gutter"><div class="uncol style-dark"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="vc_custom_heading_wrap "><div class="heading-text el-text" ><h5 class="h4 font-weight-300 text-color-xsdn-color" ><span><span class="font-762333">Address</span></span></h5></div><div class="clear"></div></div><div class="uncode_text_column" ><p><span class="font-762333">#26 Vinayaka Temple Road</span><br />
<span class="font-762333">Chikkalsandra, Bengaluru &#8211; 560061</span></p>
</div></div></div></div></div></div><div class="wpb_column pos-top pos-center align_left column_parent col-lg-2 single-internal-gutter"><div class="uncol style-dark"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="vc_custom_heading_wrap "><div class="heading-text el-text" ><h5 class="h4 font-weight-300 text-color-xsdn-color" ><span><span class="font-762333">Connect With Us</span></span></h5></div><div class="clear"></div></div><div class="uncode_text_column" ><p><span class="font-762333"><a href="/cdn-cgi/l/email-protection#731e121d19063300121f16001f16121700151c01160516015d101c1e"><span class="__cf_email__" data-cfemail="e08d818e8a95a093818c85938c85818493868f9285968592ce838f8d">[email&#160;protected]</span></a></span><br />
<span class="font-762333"><a href="tel:919353438617">91 93534 38617</a></span></p>
</div></div></div></div></div></div><script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script id="script-439277" data-row="script-439277" type="9dca68f643e17b109e1aaf43-text/javascript" class="vc_controls">UNCODE.initRow(document.getElementById("script-439277"));</script></div></div></div><div data-parent="true" class="vc_row style-color-xsdn-bg row-container"><div class="row limit-width row-parent"><div class="wpb_row row-inner"><div class="wpb_column pos-middle pos-center align_left column_parent col-lg-12 single-internal-gutter"><div class="uncol style-light font-762333"  ><div class="uncoltable"><div class="uncell no-block-padding"><div class="uncont"><div class="uncode_text_column" ><p>© 2023 Sales Leads Forever. All rights reserved</p>
</div></div></div></div></div></div><script id="script-547595" data-row="script-547595" type="9dca68f643e17b109e1aaf43-text/javascript" class="vc_controls">UNCODE.initRow(document.getElementById("script-547595"));</script></div></div></div>						</footer>
																	</div><!-- main container -->
				</div><!-- main wrapper -->
							</div><!-- box container -->
		</div><!-- box wrapper -->
		<div class="style-light footer-scroll-top"><a href="#" class="scroll-top"><i class="fa fa-angle-up fa-stack btn-default btn-hover-nobg"></i></a></div>
					<div class="overlay overlay-sequential style-dark style-dark-bg overlay-search" data-area="search" data-container="box-container">
				<div class="mmb-container"><div class="menu-close-search mobile-menu-button menu-button-offcanvas mobile-menu-button-dark lines-button x2 overlay-close close" data-area="search" data-container="box-container"><span class="lines"></span></div></div>
				<div class="search-container"><form action="https://salesleadsforever.com/" method="get">
	<div class="search-container-inner">
		<input type="search" class="search-field form-fluid no-livesearch" placeholder="Search…" value="" name="s" title="Search for:">
		<i class="fa fa-search3"></i>

			</div>
</form>
</div>
			</div>
		
	
		<script type="9dca68f643e17b109e1aaf43-text/javascript">
			window.RS_MODULES = window.RS_MODULES || {};
			window.RS_MODULES.modules = window.RS_MODULES.modules || {};
			window.RS_MODULES.waiting = window.RS_MODULES.waiting || [];
			window.RS_MODULES.defered = true;
			window.RS_MODULES.moduleWaiting = window.RS_MODULES.moduleWaiting || {};
			window.RS_MODULES.type = 'compiled';
		</script>
		<div class="gdpr-overlay"></div><div class="gdpr gdpr-privacy-preferences" data-nosnippet="true">
	<div class="gdpr-wrapper">
		<form method="post" class="gdpr-privacy-preferences-frm" action="https://salesleadsforever.com/wp-admin/admin-post.php">
			<input type="hidden" name="action" value="uncode_privacy_update_privacy_preferences">
			<input type="hidden" id="update-privacy-preferences-nonce" name="update-privacy-preferences-nonce" value="8d4d1de334" /><input type="hidden" name="_wp_http_referer" value="/free-list-of-companies-with-hr-email-details-of-indian-companies-2023" />			<header>
				<div class="gdpr-box-title">
					<h3>Privacy Preference Center</h3>
					<span class="gdpr-close"></span>
				</div>
			</header>
			<div class="gdpr-content">
				<div class="gdpr-tab-content">
					<div class="gdpr-consent-management gdpr-active">
						<header>
							<h4>Privacy Preferences</h4>
						</header>
						<div class="gdpr-info">
							<p></p>
													</div>
					</div>
				</div>
			</div>
			<footer>
				<input type="submit" class="btn-accent btn-flat" value="Save Preferences">
								<input type="hidden" id="uncode_privacy_save_cookies_from_banner" name="uncode_privacy_save_cookies_from_banner" value="false">
				<input type="hidden" id="uncode_privacy_save_cookies_from_banner_button" name="uncode_privacy_save_cookies_from_banner_button" value="">
							</footer>
		</form>
	</div>
</div>
<script type="text/html" id="wpb-modifications"></script>      <style>
        .njt-nofi-notification-bar .njt-nofi-hide-button {
          display: none;
        }
        .njt-nofi-notification-bar .njt-nofi-content {
          font-size : 15px;
        }
        /* body{
          padding-top: 49px;
        } */
      </style>
    <div class="njt-nofi-container-content">
<div class="njt-nofi-container" >
  <div class="njt-nofi-notification-bar njt-nofi-bgcolor-notification" style="background:#9af4cf">
    
    <div class="njt-nofi-content njt-nofi-text-color njt-nofi-align-content njt-nofi-content-deskop njt-display-deskop" style="max-width:100%">
      <div class="njt-nofi-text njt-nofi-padding-text">Elevate your sales and marketing team's performance with data-driven B2B leads</div>
      <div class="njt-nofi-button njt-nofi-padding-text " style="">
          <a target='_blank'  href="https://share.hsforms.com/1Ti_K2HXuT1m0Ikm0PRxNvA55wcz" class="njt-nofi-button-text njt-nofi-padding-text" style="background:#1919cf;border-radius:3px;font-weight:400">Get a Free Trail Data</a>
      </div>
    </div>

    <div class="njt-nofi-content njt-nofi-text-color njt-nofi-align-content njt-display-none njt-nofi-content-mobile njt-display-mobile" style="max-width:100%">
      <div class="njt-nofi-text njt-nofi-padding-text">Get a Free Sample Data</div>
      <div class="njt-nofi-button njt-nofi-padding-text " style="">
          <a target='_blank'  href="" class="njt-nofi-button-text njt-nofi-padding-text" style="background:#1919cf;border-radius:3px;font-weight:400">Learn more</a>
      </div>
    </div>

    <a href="javascript:void(0)" class="njt-nofi-toggle-button njt-nofi-hide njt-nofi-text-color njt-nofi-hide-admin-custom">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 386.667 386.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class="njt-nofi-close-icon"><g><path xmlns="http://www.w3.org/2000/svg" d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z" fill="#ffffff" data-original="#000000" style="" class=""/></g></svg>
      </span>
    </a>
    <a href="javascript:void(0)" class="njt-nofi-close-button njt-nofi-hide njt-nofi-text-color njt-nofi-hide-admin-custom">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 386.667 386.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class="njt-nofi-close-icon"><g><path xmlns="http://www.w3.org/2000/svg" d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z" fill="#ffffff" data-original="#000000" style="" class=""/></g></svg>
      </span>
    </a>  
  </div>
  <div>
    <a href="javascript:void(0)" class="njt-nofi-display-toggle njt-nofi-text-color njt-nofi-bgcolor-notification" style="background:#9af4cf">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 386.667 386.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class="njt-nofi-display-toggle-icon"><g><path xmlns="http://www.w3.org/2000/svg" d="m386.667 45.564-45.564-45.564-147.77 147.769-147.769-147.769-45.564 45.564 147.769 147.769-147.769 147.77 45.564 45.564 147.769-147.769 147.769 147.769 45.564-45.564-147.768-147.77z" fill="#ffffff" data-original="#000000" style="" class=""/></g></svg>
      </span>
    </a>
  </div>
</div>
</div>


      <input type="hidden" id="njt_nofi_checkDisplayReview" name="njt_nofi_checkDisplayReview" value='{"is_home":false,"is_page":false,"is_single":true,"id_page":87712}'>
    <link rel='stylesheet' id='rs-plugin-settings-css' href='https://salesleadsforever.com/wp-content/plugins/revslider/public/assets/css/rs6.css?ver=6.6.8' type='text/css' media='all' />
<style id='rs-plugin-settings-inline-css' type='text/css'>
#rs-demo-id {}
</style>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="ht_ctc_app_js-js-extra">
/* <![CDATA[ */
var ht_ctc_chat_var = {"number":"919845777023","pre_filled":"Hi there,\r\n\r\nThanks for visiting. How can I help you?","dis_m":"show","dis_d":"show","css":"display: none; cursor: pointer; z-index: 99999999;","pos_d":"position: fixed; bottom: 15px; right: 15px;","pos_m":"position: fixed; bottom: 10px; right: 10px;","schedule":"no","se":"150","ani":"no-animations","url_target_d":"popup","ga":"yes","fb":"yes","display":"no","g_init":"default","g_an_event_name":"chat: {number}","pixel_event_name":"Click to Chat by HoliThemes"};
var ht_ctc_variables = {"g_an_event_name":"chat: {number}","pixel_event_type":"trackCustom","pixel_event_name":"Click to Chat by HoliThemes","g_an_params":["g_an_param_1","g_an_param_2","g_an_param_3"],"g_an_param_1":{"key":"number","value":"{number}"},"g_an_param_2":{"key":"title","value":"{title}"},"g_an_param_3":{"key":"url","value":"{url}"},"pixel_params":["pixel_param_1","pixel_param_2","pixel_param_3","pixel_param_4"],"pixel_param_1":{"key":"Category","value":"Click to Chat for WhatsApp"},"pixel_param_2":{"key":"ID","value":"{number}"},"pixel_param_3":{"key":"Title","value":"{title}"},"pixel_param_4":{"key":"URL","value":"{url}"}};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/click-to-chat-for-whatsapp/new/inc/assets/js/app.js?ver=4.8" id="ht_ctc_app_js-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/contact-form-7/includes/swv/js/index.js?ver=5.7.7" id="swv-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="contact-form-7-js-extra">
/* <![CDATA[ */
var wpcf7 = {"api":{"root":"https:\/\/salesleadsforever.com\/wp-json\/","namespace":"contact-form-7\/v1"}};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/contact-form-7/includes/js/index.js?ver=5.7.7" id="contact-form-7-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/revslider/public/assets/js/rbtools.min.js?ver=6.6.8" defer async id="tp-tools-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/revslider/public/assets/js/rs6.min.js?ver=6.6.8" defer async id="revmin-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/uncode-privacy/assets/js/js-cookie.min.js?ver=2.2.0" id="js-cookie-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="uncode-privacy-js-extra">
/* <![CDATA[ */
var Uncode_Privacy_Parameters = {"accent_color":"#006cff"};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/uncode-privacy/assets/js/uncode-privacy-public.min.js?ver=2.2.2" id="uncode-privacy-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="njt-nofi-js-extra">
/* <![CDATA[ */
var wpData = {"admin_ajax":"https:\/\/salesleadsforever.com\/wp-admin\/admin-ajax.php","nonce":"f99681e44c","isPositionFix":"1","hideCloseButton":"close_button","isDisplayButton":"1","presetColor":"1","alignContent":"center","textColorNotification":"#1919cf","textButtonColor":"#ffffff","wp_is_mobile":"","is_customize_preview":"","wp_get_theme":"Uncode"};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/notibar/assets/frontend/js/notibar.js?ver=2.1.4" id="njt-nofi-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="mediaelement-core-js-before">
/* <![CDATA[ */
var mejsL10n = {"language":"en","strings":{"mejs.download-file":"Download File","mejs.install-flash":"You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https:\/\/get.adobe.com\/flashplayer\/","mejs.fullscreen":"Fullscreen","mejs.play":"Play","mejs.pause":"Pause","mejs.time-slider":"Time Slider","mejs.time-help-text":"Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds.","mejs.live-broadcast":"Live Broadcast","mejs.volume-help-text":"Use Up\/Down Arrow keys to increase or decrease volume.","mejs.unmute":"Unmute","mejs.mute":"Mute","mejs.volume-slider":"Volume Slider","mejs.video-player":"Video Player","mejs.audio-player":"Audio Player","mejs.captions-subtitles":"Captions\/Subtitles","mejs.captions-chapters":"Chapters","mejs.none":"None","mejs.afrikaans":"Afrikaans","mejs.albanian":"Albanian","mejs.arabic":"Arabic","mejs.belarusian":"Belarusian","mejs.bulgarian":"Bulgarian","mejs.catalan":"Catalan","mejs.chinese":"Chinese","mejs.chinese-simplified":"Chinese (Simplified)","mejs.chinese-traditional":"Chinese (Traditional)","mejs.croatian":"Croatian","mejs.czech":"Czech","mejs.danish":"Danish","mejs.dutch":"Dutch","mejs.english":"English","mejs.estonian":"Estonian","mejs.filipino":"Filipino","mejs.finnish":"Finnish","mejs.french":"French","mejs.galician":"Galician","mejs.german":"German","mejs.greek":"Greek","mejs.haitian-creole":"Haitian Creole","mejs.hebrew":"Hebrew","mejs.hindi":"Hindi","mejs.hungarian":"Hungarian","mejs.icelandic":"Icelandic","mejs.indonesian":"Indonesian","mejs.irish":"Irish","mejs.italian":"Italian","mejs.japanese":"Japanese","mejs.korean":"Korean","mejs.latvian":"Latvian","mejs.lithuanian":"Lithuanian","mejs.macedonian":"Macedonian","mejs.malay":"Malay","mejs.maltese":"Maltese","mejs.norwegian":"Norwegian","mejs.persian":"Persian","mejs.polish":"Polish","mejs.portuguese":"Portuguese","mejs.romanian":"Romanian","mejs.russian":"Russian","mejs.serbian":"Serbian","mejs.slovak":"Slovak","mejs.slovenian":"Slovenian","mejs.spanish":"Spanish","mejs.swahili":"Swahili","mejs.swedish":"Swedish","mejs.tagalog":"Tagalog","mejs.thai":"Thai","mejs.turkish":"Turkish","mejs.ukrainian":"Ukrainian","mejs.vietnamese":"Vietnamese","mejs.welsh":"Welsh","mejs.yiddish":"Yiddish"}};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-includes/js/mediaelement/mediaelement-and-player.min.js?ver=4.2.17" id="mediaelement-core-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-includes/js/mediaelement/mediaelement-migrate.min.js?ver=6.5.2" id="mediaelement-migrate-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" id="mediaelement-js-extra">
/* <![CDATA[ */
var _wpmejsSettings = {"pluginPath":"\/wp-includes\/js\/mediaelement\/","classPrefix":"mejs-","stretching":"responsive","audioShortcodeLibrary":"mediaelement","videoShortcodeLibrary":"mediaelement"};
/* ]]> */
</script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-includes/js/mediaelement/wp-mediaelement.min.js?ver=6.5.2" id="wp-mediaelement-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/themes/Uncode/uncode/library/js/plugins.js?ver=1766631995" id="uncode-plugins-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/themes/Uncode/uncode/library/js/app.js?ver=1766631995" id="uncode-app-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-includes/js/comment-reply.min.js?ver=6.5.2" id="comment-reply-js" async="async" data-wp-strategy="async"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript" src="https://salesleadsforever.com/wp-content/plugins/tablepress/js/jquery.datatables.min.js?ver=2.1.8" id="tablepress-datatables-js"></script>
<script type="9dca68f643e17b109e1aaf43-text/javascript">
jQuery(function($){
var DT_language={"en_US":{}};
$('#tablepress-19').DataTable({"language":DT_language["en_US"],"stripeClasses":["even","odd"],"ordering":false,"paging":false,"info":false});
});
</script><!-- Google Tag Manager -->
<script type="9dca68f643e17b109e1aaf43-text/javascript">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MHCQ3C4J');</script>
<!-- End Google Tag Manager --><script src="/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js" data-cf-settings="9dca68f643e17b109e1aaf43-|49" defer></script></body>
</html>

`;

// Sanitize the emails and save them to an Excel file
sanitizeEmailsAndSaveToExcel(htmlResponse);
