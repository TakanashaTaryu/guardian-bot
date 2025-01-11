# Bot Claim and Auto Fill Info

This repository contains two JavaScript scripts designed to automate the process of claiming tickets and filling in personal information on the website.

## Overview

1. **bot-claim.js**: This script sends a POST request to claim a ticket at a specified time and opens a new tab with the terms URL once the claim is successful.
2. **bot-auto-fill-info.js**: This script extracts the session ID (SID) from the current URL, sends a series of API requests to log a page view and update personal information, and finally opens a checkout page.

## Prerequisites

- A modern web browser that supports JavaScript and the Fetch API.
- Access to the website.

## Usage

### bot-claim.js

1. **Set the Target Time**: When you run the script, it will prompt you to enter a target time in UTC format (HH:MM).
2. **Start the Bot**: The script will start sending POST requests every 300 milliseconds until a successful response is received.
3. **Open Terms URL**: Upon a successful claim, the script will open a new tab with the terms URL.

#### Configuration

input the tier id ticket
```javascript
    const payload = {
        ticket_tier_id: 17 //input tier id ticket
    }
```

input the delay time of the bot
```javascript
    if (delay > 0) {
        setTimeout(() => {
            startBot(300); // Start sending requests every 300 ms
        }, delay);
    } else {
        // If the target time is already passed, start immediately
        startBot(300);
    }
```

#### Usage Example

```javascript
// Run the script in the browser console
// Enter the target time in UTC (e.g., "14:30")
```

### bot-auto-fill-info.js

1. **Extract SID**: The script automatically extracts the SID from the current URL.
2. **Send API Requests**: It sends a POST request to log a page view and a PUT request to update personal information.
3. **Open Checkout URL**: After successfully updating the information, it opens the checkout page in a new tab.


#### Configuration

input your credential here
```javascript
    const payload2 = {
        first_name: "first_name",
        last_name: "last_name",
        birth_date: "YYYY-MM-DD",
        phone_number: "phone_number",
        contact_email: "contact_email"
    };
```

#### Usage Example

```javascript
// Run the script in the browser console on the personal information page
```

## Code Explanation

### bot-claim.js

- **sendPostRequest**: Sends a POST request to claim a ticket.
- **startBot**: Initiates the bot to send requests at a specified interval.
- **startAtTargetTime**: Calculates the delay until the target time and starts the bot.
- **Input Validation**: Ensures the user input is in the correct HH:MM format.

### bot-auto-fill-info.js

- **Extract SID**: Uses regex to extract the SID from the current URL.
- **API Calls**: Sends two API requests:
  - The first to log a page view.
  - The second to update personal information.
- **Open Checkout**: Opens the checkout page after successful updates.

## Error Handling

Both scripts include error handling to log issues with network requests or invalid user input.

## Disclaimer

- Use these scripts responsibly and ensure compliance with the website's terms of service.
- The scripts are intended for educational purposes and should not be used for malicious activities.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.