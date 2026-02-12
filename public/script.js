// ----------------- Elements -----------------
const registration = document.getElementById('registration'); // Home/OTP section
const generateBtn = document.getElementById('generateBtn');
const verifyBtn = document.getElementById('verifyBtn');
const registerBtn = document.getElementById('registerBtn');
const otpSection = document.getElementById('otpSection');
const phoneInput = document.getElementById('phone');
const otpInput = document.getElementById('otpInput');

const bookingFormSection = document.getElementById('bookingFormSection'); // Booking form
const form = document.getElementById('slotForm');

let currentOTP = null;

// ----------------- OTP Registration -----------------

generateBtn.addEventListener('click', async () => {
    const phone = phoneInput.value.trim();
    if (!phone) return alert("Please enter your phone number");

    try {
        const res = await fetch('/api/generate-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        const data = await res.json();
        if (data.success) {
            currentOTP = data.otp;
            alert("OTP sent: " + currentOTP); // remove in production
            otpSection.style.display = 'block';
        } else {
            alert("Error generating OTP");
        }
    } catch(err) {
        console.error(err);
        alert("Server error");
    }
});

verifyBtn.addEventListener('click', () => {
    if (otpInput.value.trim() === currentOTP.toString()) {
        alert("OTP verified!");
        registerBtn.disabled = false;
    } else {
        alert("Incorrect OTP");
        registerBtn.disabled = true;
    }
});

registerBtn.addEventListener('click', () => {
    alert(`Phone ${phoneInput.value} registered successfully!`);
    registration.style.display = 'none';
    bookingFormSection.style.display = 'block';
});

// ----------------- Crop & Industry Data -----------------
const cropIndustries = [
    { crop: "Rice", industry: "Rice Mills", village: "Nalgonda", state: "Telangana" },
    { crop: "Sugarcane", industry: "Sugar Factory", village: "Siddipet", state: "Telangana" },
    { crop: "Wheat", industry: "Food Processing Unit", village: "Warangal", state: "Telangana" },
    { crop: "Oilseeds", industry: "Oil Extraction Unit", village: "Medak", state: "Telangana" },
    { crop: "Fruits & Vegetables", industry: "Fruit & Vegetable Processing Unit", village: "Karimnagar", state: "Telangana" },
    { crop: "Milk", industry: "Dairy Cooperative", village: "Hyderabad", state: "Telangana" }
];

const cropSelect = document.getElementById("cropSelect");
const industrySelect = document.getElementById("industrySelect");
const industryLocation = document.getElementById("industryLocation");

// Populate dropdowns
[...new Set(cropIndustries.map(c => c.crop))].forEach(crop => {
    const opt = document.createElement("option");
    opt.value = crop; opt.textContent = crop; cropSelect.appendChild(opt);
});

[...new Set(cropIndustries.map(i => i.industry))].forEach(ind => {
    const opt = document.createElement("option");
    opt.value = ind; opt.textContent = ind; industrySelect.appendChild(opt);
});

// Update industry location automatically
function updateIndustryLocation() {
    const selectedCrop = cropSelect.value;
    const selectedIndustry = industrySelect.value;
    const selectedItem = cropIndustries.find(item => item.crop === selectedCrop && item.industry === selectedIndustry);
    industryLocation.value = selectedItem ? `${selectedItem.village}, ${selectedItem.state}` : "";
}

cropSelect.addEventListener('change', updateIndustryLocation);
industrySelect.addEventListener('change', updateIndustryLocation);

// ----------------- Booking Form Submission -----------------
form.addEventListener('submit', async e => {
    e.preventDefault();

    const selectedCrop = cropSelect.value;
    const selectedIndustry = industrySelect.value;
    const selectedItem = cropIndustries.find(item => item.crop === selectedCrop && item.industry === selectedIndustry);

    const data = {
        farmerName: document.getElementById('farmerName').value,
        village: document.getElementById('village').value,
        crop: selectedCrop,
        industryName: selectedIndustry,
        industryLocation: selectedItem ? `${selectedItem.village}, ${selectedItem.state}` : "",
        rating: document.getElementById('rating').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    try {
        const res = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();

        if(result.success) {
            window.location.href = "success.html?status=success";
        } else {
            window.location.href = "success.html?status=failed";
        }
    } catch(err) {
        console.error(err);
        window.location.href = "success.html?status=failed";
    }
});