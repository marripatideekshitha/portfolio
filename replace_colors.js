const fs = require('fs');

const files = [
    "c:/Users/hp/Downloads/portfolyo-main/portfolyo-main/src/components/Admin/AdminDashboard.jsx",
    "c:/Users/hp/Downloads/portfolyo-main/portfolyo-main/src/components/Admin/AdminDashboard.css"
];

const replacements = {
    "#00e5ff": "#10b981",
    "rgba(0, 229, 255": "rgba(16, 185, 129",
    "rgba(0,229,255": "rgba(16,185,129",
    "#0ea5e9": "#10b981",
    "#0284c7": "#059669",
    "#38bdf8": "#34d399",
    "rgba(14, 165, 233": "rgba(16, 185, 129",
    "rgba(14,165,233": "rgba(16,185,129"
};

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        for (const [oldVal, newVal] of Object.entries(replacements)) {
            content = content.split(oldVal).join(newVal);
            content = content.split(oldVal.toUpperCase()).join(newVal);
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
});
console.log('Finished updating colors.');
