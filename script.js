const fs = require("fs");
const ExcelJS = require("exceljs");
const nodemailer = require("nodemailer");

// File paths
const excelPath = "./test.xlsx";
const resumePath = "./Nitesh_Singh_FE.pdf";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "xyz@gmail.com",
    pass: "password",
  },
});

async function sendEmails() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);
  const worksheet = workbook.getWorksheet(1);

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber) {
      // Skip header row
      const email = row.getCell(1).value; // Adjust column index for emails if needed

      const mailOptions = {
        from: "xyz@gmail.com",
        to: email,
        subject: "Exploring Opportunities to Contribute with My Expertise",
        html: `
                <p>Dear HR,</p>
                <p>My name is <strong>Nitesh Singh</strong>, and I am a Software Development Engineer with over 3 years of experience in designing and implementing efficient, scalable, and secure software solutions.</p>
                <p>Throughout my career, I have successfully worked on:</p>
                <ul>
                    <li><strong>Advanced Technologies:</strong> Reverse Engineering, HTTPS Debugging Proxies, and Network Traffic Analysis for examining top-tier websites and aligning with business requirements.</li>
                    <li><strong>Backend Collaboration:</strong> Worked with Node.js/TypeScript teams to overcome anti-bot measures like Google ReCaptcha V2, V3, and H-Captcha.</li>
                    <li><strong>Complex Systems Expertise:</strong> APIs, session hijacking, screen scraping, web scraping, and security encryption.</li>
                    <li><strong>Frontend Development:</strong> Developed reusable UI components using Vue.js and contributed to the UI engineering team.</li>
                    <li><strong>Automation & Integration:</strong> Automated the importation of over 400 products into Contentful, integrated APIs for localized translations across 15+ countries, and implemented third-party Yotpo for customer reviews.</li>
                    <li><strong>Test Coverage:</strong> Achieved 80% coverage with Jest unit testing for robust software validation.</li>
                </ul>
                <p><strong>Technical Skills:</strong></p>
                <ul>
                    <li><strong>Programming Languages:</strong> C++17, JavaScript, TypeScript</li>
                    <li><strong>Frontend Frameworks:</strong> React.js, Vue.js, Next.js, Nuxt.js</li>
                    <li><strong>Store Management:</strong> Redux, Vuex, LocalStorage, Cookies</li>
                    <li><strong>Styling Tools:</strong> CSS3, SCSS, Bootstrap, Vuetify, TailwindCSS, Material UI</li>
                    <li><strong>Backend Technologies:</strong> Node.js, Express.js</li>
                    <li><strong>Testing & Deployment:</strong> Jest, Cypress, AWS (S3, EC2, Route 53, App Runner, CodeDeploy), Docker, CI/CD pipelines (Jenkins, Firebase, Netlify)</li>
                </ul>
                <p>I am confident my technical expertise and dedication to delivering high-quality solutions make me a strong candidate for roles that require both innovation and technical rigor.</p>
                <p>Please find my resume attached for your review. I would be delighted to discuss how my skills can benefit your team.</p>
                <p>Thank you for considering my application. Looking forward to hearing from you.</p>
                <p>Best regards,<br><strong>Nitesh Singh</strong><br>Frontend Developer<br>
                📧 <a href="mailto:nksingh.2907@gmail.com">nksingh.2907@gmail.com</a><br>
                📞 +91 7990063949<br>
                <a href="https://www.linkedin.com/in/nitesh-singh-197912217/">LinkedIn Profile</a></p>
                `,
        attachments: [
          {
            filename: "Nitesh_Singh_FE.pdf",
            path: resumePath,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Failed to send to ${email}:`, error);
        } else {
          console.log(`Email sent to ${email}:`, info.response);
        }
      });
    }
  });
}

sendEmails().catch((err) => console.error("Error:", err));
