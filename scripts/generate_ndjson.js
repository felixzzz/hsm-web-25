

const carData = [
    {
        name: 'Hyundai Creta Prime',
        desc: { en: "The perfect SUV for urban adventures.", id: "SUV sempurna untuk petualangan perkotaan." },
        displayName: { en: "Hyundai Creta Prime", id: "Hyundai Creta Prime" }
    },
    {
        name: 'Hyundai Stargazer X',
        desc: { en: "Family comfort redefined.", id: "Kenyamanan keluarga yang didefinisikan ulang." },
        displayName: { en: "Hyundai Stargazer X", id: "Hyundai Stargazer X" }
    },
    {
        name: 'Hyundai Ioniq 5 Signature',
        desc: { en: "Future electric mobility, today.", id: "Mobilitas listrik masa depan, hari ini." },
        displayName: { en: "Hyundai Ioniq 5 Signature", id: "Hyundai Ioniq 5 Signature" }
    },
    {
        name: 'Hyundai Palisade Signature',
        desc: { en: "Premium flagship SUV.", id: "SUV flagship premium." },
        displayName: { en: "Hyundai Palisade Signature", id: "Hyundai Palisade Signature" }
    },
    {
        name: 'Hyundai Santa Fe Gas',
        desc: { en: "Bold and beautiful.", id: "Berani dan indah." },
        displayName: { en: "Hyundai Santa Fe Gas", id: "Hyundai Santa Fe Gas" }
    },
    {
        name: 'Hyundai Creta Trend',
        desc: { en: "Start your journey.", id: "Mulai perjalanan Anda." },
        displayName: { en: "Hyundai Creta Trend", id: "Hyundai Creta Trend" }
    },
    {
        name: 'Hyundai Staria 9-Seater',
        desc: { en: "Larger than life comfort.", id: "Kenyamanan luar biasa." },
        displayName: { en: "Hyundai Staria 9-Seater", id: "Hyundai Staria 9-Seater" }
    },
    {
        name: 'Hyundai Kona EV',
        desc: { en: "Compact electric SUV.", id: "SUV listrik kompak." },
        displayName: { en: "Hyundai Kona EV", id: "Hyundai Kona EV" }
    },
    {
        name: 'Hyundai Stargazer Active',
        desc: { en: "Active lifestyle choice.", id: "Pilihan gaya hidup aktif." },
        displayName: { en: "Hyundai Stargazer Active", id: "Hyundai Stargazer Active" }
    }
];

// Helper to read stdin
function readStdin() {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', chunk => data += chunk);
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', reject);
    });
}

async function main() {
    const userInput = await readStdin();
    let existingDocs;
    try {
        existingDocs = JSON.parse(userInput);
    } catch (e) {
        console.error("Failed to parse existing docs JSON:", e);
        process.exit(1);
    }

    if (!Array.isArray(existingDocs)) {
        console.error("Input is not an array");
        process.exit(1);
    }

    existingDocs.forEach(doc => {
        const updateData = carData.find(c => c.name === doc.name);
        if (updateData) {
            // Update fields
            doc.displayName = updateData.displayName;
            doc.description = updateData.desc;

            // Ensure specs exist
            if (!doc.specs) doc.specs = {};

            // We preserve doc.image
        }
        // Output NDJSON line
        console.log(JSON.stringify(doc));
    });
}

main();
