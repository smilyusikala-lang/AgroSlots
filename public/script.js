document.addEventListener('DOMContentLoaded', () => {

    // ---------------- Home Page OTP -----------------
    const registration = document.getElementById('registration');
    const generateBtn = document.getElementById('generateBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const registerBtn = document.getElementById('registerBtn');
    const otpSection = document.getElementById('otpSection');
    const phoneInput = document.getElementById('phone');
    const otpInput = document.getElementById('otpInput');

    let currentOTP = null;

    if(generateBtn){  // Only run if on home.html
        generateBtn.addEventListener('click', async () => {
            const phone = phoneInput.value.trim();
            if(!phone) return alert("Enter phone number");

            try {
                // Call backend OTP generation
                const res = await fetch('/api/generate-otp', {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({phone})
                });
                const data = await res.json();
                if(data.success){
                    currentOTP = data.otp;
                    alert("OTP: " + currentOTP); // For testing only
                    otpSection.style.display = 'block';
                } else alert("Failed to generate OTP");
            } catch(err){ console.error(err); alert("Server error"); }
        });

        verifyBtn.addEventListener('click', ()=>{
            if(otpInput.value.trim()===currentOTP.toString()){
                alert("OTP Verified!");
                registerBtn.disabled = false;
            } else {
                alert("Incorrect OTP");
                registerBtn.disabled = true;
            }
        });

        registerBtn.addEventListener('click', ()=>{
            window.location.href = "index.html";
        });
    }

    // ---------------- Index Page Booking Form -----------------
    const bookingFormSection = document.getElementById('bookingFormSection');
    const form = document.getElementById('slotForm');

    const cropIndustries = [
        { crop:"Rice", industry:"Rice Mills", village:"Nalgonda", state:"Telangana" },
        { crop:"Sugarcane", industry:"Sugar Factory", village:"Siddipet", state:"Telangana" },
        { crop:"Wheat", industry:"Food Processing Unit", village:"Warangal", state:"Telangana" },
        { crop:"Oilseeds", industry:"Oil Extraction Unit", village:"Medak", state:"Telangana" },
        { crop:"Fruits & Vegetables", industry:"Fruit & Vegetable Processing Unit", village:"Karimnagar", state:"Telangana" },
        { crop:"Milk", industry:"Dairy Cooperative", village:"Hyderabad", state:"Telangana" }
    ];

    if(form){ // Only run if on index.html
        const cropSelect = document.getElementById("cropSelect");
        const industrySelect = document.getElementById("industrySelect");
        const industryLocation = document.getElementById("industryLocation");

        // Populate crops
        [...new Set(cropIndustries.map(c=>c.crop))].forEach(c=>{
            const opt = document.createElement("option");
            opt.value=c; opt.textContent=c; cropSelect.appendChild(opt);
        });

        // Populate industries
        [...new Set(cropIndustries.map(i=>i.industry))].forEach(i=>{
            const opt = document.createElement("option");
            opt.value=i; opt.textContent=i; industrySelect.appendChild(opt);
        });

        // Update Industry Location
        function updateIndustryLocation(){
            const selectedCrop = cropSelect.value;
            const selectedIndustry = industrySelect.value;
            const item = cropIndustries.find(i=>i.crop===selectedCrop && i.industry===selectedIndustry);
            industryLocation.value = item ? `${item.village}, ${item.state}` : "";
        }
        cropSelect.addEventListener('change', updateIndustryLocation);
        industrySelect.addEventListener('change', updateIndustryLocation);

        // Booking submission
        form.addEventListener('submit', async e=>{
            e.preventDefault();
            const selectedCrop = cropSelect.value;
            const selectedIndustry = industrySelect.value;
            const selectedItem = cropIndustries.find(i=>i.crop===selectedCrop && i.industry===selectedIndustry);

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

            try{
                const res = await fetch('/api/book',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if(result.success) window.location.href="success.html?status=success";
                else window.location.href="success.html?status=failed";
            } catch(err){
                console.error(err);
                window.location.href="success.html?status=failed";
            }
        });
    }

    // ---------------- Success Page -----------------
    const statusSection = document.getElementById('statusSection');
    if(statusSection){  // Only run if on success.html
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        const statusMessage = document.getElementById('statusMessage');
        const goHomeBtn = document.getElementById('goHomeBtn');

        if(status === "success") statusMessage.textContent = "✅ Booking Successful!";
        else statusMessage.textContent = "❌ Booking Failed!";

        goHomeBtn.addEventListener('click', ()=>{
            window.location.href = "home.html";
        });
    }

});