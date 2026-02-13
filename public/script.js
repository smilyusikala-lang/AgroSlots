/* -------------------------
   DROPDOWN DATA
------------------------- */
const crops = ["Wheat", "Rice", "Maize", "Barley"];
const industries = ["Dairy", "Sugar", "Textiles", "Food Processing"];

/* -------------------------
   POPULATE DROPDOWNS
------------------------- */
const cropSelect = document.getElementById("crop");
const industrySelect = document.getElementById("industry");

if (cropSelect) {
    crops.forEach(crop => {
        const option = document.createElement("option");
        option.value = crop;
        option.textContent = crop;
        cropSelect.appendChild(option);
    });
}

if (industrySelect) {
    industries.forEach(ind => {
        const option = document.createElement("option");
        option.value = ind;
        option.textContent = ind;
        industrySelect.appendChild(option);
    });
}

/* -------------------------
   OTP GENERATION & SIMULATION
------------------------- */
let generatedOtp = null;

function generateOtp() {
    const phone = prompt("Enter your phone number:");
    if (!phone) return alert("Phone number is required");

    // Generate a 4-digit OTP
    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    alert("Your OTP is: " + generatedOtp);

    // Optional: Ask user to enter OTP
    const otpInput = prompt("Enter the OTP:");
    if (parseInt(otpInput) === generatedOtp) {
        alert("OTP Verified! Redirecting to Booking Page.");
        window.location.href = "booking.html";
    } else {
        alert("Incorrect OTP. Try again.");
    }
}

/* -------------------------
   BOOKING FORM SUBMISSION
------------------------- */
const form = document.getElementById("slotForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect form data
        const data = {
            name: document.getElementById("name").value,
            crop: document.getElementById("crop").value,
            industry: document.getElementById("industry").value,
            location: document.getElementById("location").textContent || "Unknown",
            quantity: document.getElementById("quantity").value,
            rating: document.getElementById("rating").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };

        try {
            // Send booking data to backend
            const response = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                // Redirect to success page
                window.location.href = "success.html";
            } else {
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error connecting to server.");
        }
    });
}