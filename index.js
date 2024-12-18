const cheerio = require("cheerio");
const ExcelJS = require("exceljs");
const fs = require("fs");

function logMessage(message) {
  try {
    if (typeof console === "undefined") return;
    console.error ? console.error(message) : console.log(message);
  } catch (error) {
    // Handle errors silently
  }
}

function hexToDecimal(hexString, startIndex) {
  const hexPair = hexString.substr(startIndex, 2);
  return parseInt(hexPair, 16);
}

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
  $("a").each((index, element) => {
    try {
      const href = $(element).attr("href");
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
  const worksheet = workbook.addWorksheet("Sanitized Emails");

  // Set column headers
  worksheet.columns = [{ header: "Email Address", key: "email", width: 30 }];

  // Add rows with email data
  emails.forEach((email) => {
    worksheet.addRow({ email });
  });

  // Write the workbook to a file
  await workbook.xlsx.writeFile("sanitized_emails.xlsx");
  console.log("Excel file saved as sanitized_emails.xlsx");
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
const htmlResponse = ` `;

// Sanitize the emails and save them to an Excel file
sanitizeEmailsAndSaveToExcel(htmlResponse);
