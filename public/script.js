/* -------------------------
   DROPDOWN DATA
------------------------- */
const crops = ["Wheat", "Rice", "Maize", "Barley", "Millets", "Soybean"];

const industries = [
    { name: "Agro Flour Mill", village: "Shivpuri", district: "Ahmedabad", state: "Gujarat" },
    { name: "Rice Processing Plant", village: "Chikhli", district: "Surat", state: "Gujarat" },
    { name: "Maize Milling Factory", village: "Vagra", district: "Bharuch", state: "Gujarat" },
    { name: "Barley Storage & Processing", village: "Petlad", district: "Anand", state: "Gujarat" },
    { name: "Soybean Oil Plant", village: "Borsad", district: "Anand", state: "Gujarat" }
];

/* -------------------------
   POPULATE DROPDOWNS
------------------------- */
const cropSelect = document.getElementById("crop");
const industrySelect = document.getElementById("industry");

// Populate crop dropdown
if (cropSelect) {
    crops.forEach(crop => {
        const option = document.createElement("option");
        option.value = crop;
        option.textContent = crop;
        cropSelect.appendChild(option);
    });
}

// Populate industry dropdown
if (industrySelect) {
    industries.forEach(ind => {
        const option = document.createElement("option");
        option.value = ind.name;
        option.textContent = `${ind.name} - ${ind.village}, ${ind.district}, ${ind.state}`;
        industrySelect.appendChild(option);
    });
}

/* -------------------------
   OTP GENERATION
------------------------- */
let generatedOtp = null;

document.getElementById("generateOtp")?.addEventListener("click", () => {
    const phone = document.getElementById("phone").value;
    if (!phone) return alert("Enter your phone number");

    generatedOtp = Math.floor(1000 + Math.random() * 9000);
    alert("Your OTP is: " + generatedOtp);

    document.getElementById("otpInput").style.display = "block";
    document.getElementById("verifyBtn").style.display = "block";
});

document.getElementById("verifyBtn")?.addEventListener("click", () => {
    const otp = document.getElementById("otpInput").value;
    if (parseInt(otp) === generatedOtp) {
        alert("OTP Verified! You can now book your crop.");
        window.location.href = "booking.html";
    } else {
        alert("Incorrect OTP");
    }
});

/* -------------------------
   BOOKING FORM SUBMISSION
------------------------- */
const form = document.getElementById("slotForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const selectedIndustry = industries.find(
            ind => ind.name === industrySelect.value
        );

        const data = {
            name: document.getElementById("name").value,
            crop: cropSelect.value,
            industry: selectedIndustry.name,
            village: selectedIndustry.village,
            district: selectedIndustry.district,
            state: selectedIndustry.state,
            quantity: document.getElementById("quantity").value,
            rating: document.getElementById("rating").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value
        };

        try {
            const response = await fetch("/api/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
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