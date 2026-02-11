// When "Generate OTP" button is clicked
document.getElementById('generateBtn').addEventListener('click', async function() {
    const phone = document.getElementById('phone').value;

    if(!phone) {
        alert("Please enter your phone number");
        return;
    }

    // Call your backend API to generate OTP
    const res = await fetch('/api/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
    });

    const data = await res.json();

    if (data.success) {
        alert('OTP sent: ' + data.otp); // You can remove alert in production
        document.getElementById('otpSection').style.display = 'block';
    } else {
        alert('Error sending OTP');
    }
});

// When "Verify OTP" button is clicked
document.getElementById('verifyBtn').addEventListener('click', function() {
    const enteredOtp = document.getElementById('otpInput').value;

    // In production, verify OTP with backend
    if(enteredOtp === "1234"){ // replace with real verification
        window.location.href = 'index.html'; // redirect to main page
    } else {
        alert("Incorrect OTP");
    }
});