const axios = require("axios");

/**
 * This script fetches data from two APIs on the "https://www.gia.edu/" website.
 *
 * First, it makes a GET request to the report check landing page to retrieve the `rdwb-token` cookie.
 * Then, it uses this token to make a second GET request to the `rdwb` API to retrieve report data.

 *
 * **Technical Notes:**
 *
 * The GIA APIs utilize the HTTP/2 protocol, which is sensitive to header order.
 * Any changes to the header order in this script may result in the server not responding as expected.
 * The client and server handshake process relies on a specific header sequence for proper communication.
 *
 * **Key Points:**
 * - The `Rdwb-Token` header is crucial for the second API request and must be included.
 * - The `Referer` header is important for security and should be set to the originating website (www.gia.edu).
 * - The `User-Agent` header provides information about the client browser and should be set to a realistic value.
 *
 */
axios
    .get("https://www.gia.edu/report-check-landing?locale=en_US", {
        headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "en-US,en;q=0.9",
            Referer: "https://www.gia.edu/",
            "Sec-Ch-Ua":
                '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "Accept-Encoding": "gzip, deflate, br",
        },
    })
    .then((response) => {
        const cookies = response.headers["set-cookie"];
        let rdwbToken = null;

        if (cookies) {
            cookies.forEach((cookie) => {
                if (cookie.startsWith("rdwb-token=")) {
                    console.log("cookie", cookie);
                    rdwbToken = cookie.split("exp=")[1].split(";")[0];
                }
            });
        }

        console.log("rdwb token: ", rdwbToken);

        if (rdwbToken) {
            axios
                .get(
                    "https://rdwb.gia.edu/?reportno=457895&locale=en_US&env=prod&USEREG=1&qr=false",
                    {
                        headers: {
                            Accept: "application/json",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Cache-Control": "no-cache",
                            Origin: "https://www.gia.edu",
                            Priority: "u=1, i",
                            "Rdwb-Token": `exp=${rdwbToken}`,
                            Referer: "https://www.gia.edu/",
                            "Sec-Ch-Ua":
                                '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                            "Sec-Ch-Ua-Mobile": "?0",
                            "Sec-Ch-Ua-Platform": '"Windows"',
                            "Sec-Fetch-Dest": "empty",
                            "Sec-Fetch-Mode": "cors",
                            "Sec-Fetch-Site": "same-site",
                            "User-Agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                            "Accept-Encoding": "gzip, deflate, br",
                        },
                    },
                )
                .then((response) => {
                    console.log("Second API Response:", response.data);
                })
                .catch((error) => {
                    console.error("Error with second API request:", error);
                });
        } else {
            console.error(
                "Failed to extract rdwb-token from the first response",
            );
        }
    })
    .catch((error) => {
        console.error("Error with first API request:", error);
    });
