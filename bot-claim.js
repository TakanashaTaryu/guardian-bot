// Function to send POST request
async function sendPostRequest() {
    const url = 'https://community.furries.id/api/contool/v1/orders/';
    const payload = {
        ticket_tier_id: 17
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error('Error: Network response was not ok');
            return; // Exit the function if there's an error
        }

        const data = await response.json();
        const sid = data.sid;

        if (sid) {
            // If sid is received, open a new tab with the terms URL
            const termsUrl = `https://community.furries.id/orders/${sid}/terms`;
            window.open(termsUrl, '_blank'); // Open the URL in a new tab
            clearInterval(intervalId); // Stop the interval to prevent further requests
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to start the bot with a custom interval
let intervalId; // Declare intervalId in a broader scope
function startBot(interval) {
    intervalId = setInterval(sendPostRequest, interval);
}

// Function to calculate the delay until the target time
function startAtTargetTime(targetTime) {
    const now = new Date();
    const delay = targetTime - now.getTime() - 2000; // Subtract 2 seconds

    if (delay > 0) {
        setTimeout(() => {
            startBot(300); // Start sending requests every 300 ms
        }, delay);
    } else {
        // If the target time is already passed, start immediately
        startBot(300);
    }
}

// Prompt the user for the target time in HH:MM format
const timeInput = prompt("Enter the target time in UTC (format: HH:MM):");

// Validate the input format
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex for HH:MM format
if (timePattern.test(timeInput)) {
    const [hour, minute] = timeInput.split(':').map(Number);
    const now = new Date();
    const targetTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hour, minute)).getTime();
    startAtTargetTime(targetTime);
} else {
    console.error("Please enter a valid time in HH:MM format.");
}