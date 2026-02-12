// ===================== HOME PAGE (OTP) =====================

function generateOTP() {
  const phone = document.getElementById("phone").value;

  fetch('/api/generate-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  })
  .then(res => res.json())
  .then(data => {
    alert("Your OTP: " + data.otp);
  });
}

function bookSlot() {
  const data = {
    crop: document.getElementById("crop").value,
    industry: document.getElementById("industry").value,
    village: document.getElementById("village").value
  };

  fetch('/api/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      window.location.href = "success.html";
    }
  });
}


// ===================== INDEX PAGE DATA =====================

// Crop names
const crops = [
    "Rice",
    "Wheat",
    "Maize",
    "Sugarcane",
    "Cotton",
    "Turmeric"
];

// Industries with village & state
const industries = [
    { name: "Nizamabad Rice Mill", village: "Nizamabad", state: "Telangana" },
    { name: "Kamareddy Sugar Factory", village: "Kamareddy", state: "Telangana" },
    { name: "Karimnagar Food Processing Unit", village: "Karimnagar", state: "Telangana" },
    { name: "Warangal Oil Extraction Unit", village: "Warangal", state: "Telangana" }
];

window.addEventListener("load", function () {

    const cropSelect = document.getElementById("crop");
    const industrySelect = document.getElementById("industry");

    // Fill crops
    if (cropSelect) {
        crops.forEach(crop => {
            const option = document.createElement("option");
            option.value = crop;
            option.textContent = crop;
            cropSelect.appendChild(option);
        });
    }

    // Fill industries
    if (industrySelect) {
        industries.forEach((ind, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = ind.name;
            industrySelect.appendChild(option);
        });

        // Show location on select
        industrySelect.addEventListener("change", function () {
            const location = document.getElementById("location");
            const ind = industries[this.value];

            if (ind) {
                location.textContent =
                    "Location: " + ind.village + ", " + ind.state;
            } else {
                location.textContent = "";
            }
        });
    }
});


// ===================== BOOKING =====================

function bookSlot() {
    const farmerName = document.getElementById("farmerName").value;
    const village = document.getElementById("village").value;
    const crop = document.getElementById("crop").value;
    const industryIndex = document.getElementById("industry").value;

    const industry = industries[industryIndex];

    fetch('/api/api-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            farmerName,
            village,
            crop,
            industryName: industry.name,
            industryVillage: industry.village,
            industryState: industry.state
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.location.href = "success.html";
        } else {
            window.location.href = "home.html";
        }
    });
}