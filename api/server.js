// pages/api/data.js (or your API route)
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({
            crops: ["Wheat", "Rice", "Maize", "Barley", "Millets", "Soybean"],
            industries: [
                { name: "Agro Flour Mill", village: "Shivpuri", district: "Ahmedabad", state: "Gujarat" },
                { name: "Rice Processing Plant", village: "Chikhli", district: "Surat", state: "Gujarat" },
                { name: "Maize Milling Factory", village: "Vagra", district: "Bharuch", state: "Gujarat" },
                { name: "Barley Storage & Processing", village: "Petlad", district: "Anand", state: "Gujarat" },
                { name: "Soybean Oil Plant", village: "Borsad", district: "Anand", state: "Gujarat" }
            ]
        });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}