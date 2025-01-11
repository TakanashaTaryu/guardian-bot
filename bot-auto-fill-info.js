(async () => {
    // Extract the sid from the current URL
    const currentUrl = window.location.href;
    const sidMatch = currentUrl.match(/orders\/([a-zA-Z0-9]+)/);
    if (!sidMatch) {
        console.error("SID not found in the URL.");
        return;
    }
    const sid = sidMatch[1];

    // Define the first API endpoint and payload
    const api1Url = "https://a.angelo.fyi/api/event";
    const payload1 = {
        n: "pageview",
        u: `https://community.furries.id/orders/${sid}/personal-information`,
        d: "community.furries.id",
        r: null
    };

    // Make the first POST request
    try {
        const response1 = await fetch(api1Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload1)
        });
        if (response1.ok) {
            const contentType = response1.headers.get("content-type");
            let responseData;
            if (contentType && contentType.includes("application/json")) {
                responseData = await response1.json();
            } else {
                responseData = await response1.text(); // Handle non-JSON response
            }
            console.log("First API call successful:", responseData);
        } else {
            console.error("First API call failed:", response1.status, await response1.text());
            return;
        }
    } catch (error) {
        console.error("Error during first API call:", error);
        return;
    }

    // Delay for 200ms
    await new Promise(resolve => setTimeout(resolve, 200));

    // Define the second API endpoint and payload
    const api2Url = "https://community.furries.id/api/contool/v1/pii/user/me";
    const payload2 = {
        first_name: "asdf",
        last_name: "asdf",
        birth_date: "2000-12-12",
        phone_number: "081234567890",
        contact_email: "asdf@gmail.com"
    };

    // Make the second PUT request
    try {
        const response2 = await fetch(api2Url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload2)
        });
        if (response2.ok) {
            const contentType = response2.headers.get("content-type");
            let responseData;
            if (contentType && contentType.includes("application/json")) {
                responseData = await response2.json();
            } else {
                responseData = await response2.text(); // Handle non-JSON response
            }
            console.log("Second API call successful:", responseData);
        } else {
            console.error("Second API call failed:", response2.status, await response2.text());
            return;
        }
    } catch (error) {
        console.error("Error during second API call:", error);
        return;
    }

    // Delay for 200ms
    await new Promise(resolve => setTimeout(resolve, 200));

    // Open a new tab with the checkout URL
    const checkoutUrl = `https://community.furries.id/orders/${sid}/checkout`;
    window.open(checkoutUrl, '_blank');
})();