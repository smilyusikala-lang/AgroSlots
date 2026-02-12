export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({
            crops: ["Wheat", "Rice", "Corn"],
            industries: ["Food Factory", "Textile Mill", "Oil Industry"]
        });
    }
}