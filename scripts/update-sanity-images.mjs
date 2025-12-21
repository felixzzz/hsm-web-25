import { getCliClient } from 'sanity/cli';
import { createReadStream } from 'fs';
import { readdir } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Move up from scripts/ to root
const ROOT_DIR = join(__dirname, '..');
const IMAGES_DIR = join(ROOT_DIR, 'public', 'images', 'cars');

// Use CLI client which inherits user login credentials
const client = getCliClient({ apiVersion: '2024-02-13' });

const MODEL_MAP = {
    'creta.png': 'Creta',
    'ioniq-5.png': 'Ioniq 5',
    'kona-ev.png': 'Kona',
    'palisade.jpg': 'Palisade',
    'santa-fe.png': 'Santa Fe',
    'stargazer.png': 'Stargazer',
    'staria.png': 'Staria',
};

async function uploadImage(filePath) {
    console.log(`Uploading ${basename(filePath)}...`);
    return client.assets.upload('image', createReadStream(filePath), {
        filename: basename(filePath)
    });
}

async function run() {
    console.log(`Scanning images in ${IMAGES_DIR}...`);
    let files;
    try {
        files = await readdir(IMAGES_DIR);
    } catch (e) {
        console.error(`Could not read directory ${IMAGES_DIR}`);
        process.exit(1);
    }

    for (const file of files) {
        const model = MODEL_MAP[file];
        if (!model) {
            // console.log(`Skipping ${file} ...`);
            continue;
        }

        console.log(`Processing ${file} for model ${model}...`);

        // Find car document
        const query = `*[_type == "car" && model == $model][0]`;
        const car = await client.fetch(query, { model });

        if (!car) {
            console.warn(`Car model "${model}" not found in Sanity database.`);
            continue;
        }

        try {
            const asset = await uploadImage(join(IMAGES_DIR, file));

            await client.patch(car._id)
                .set({
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id
                        }
                    }
                })
                .commit();

            console.log(`✅ Successfully updated ${model} with ${file}`);
        } catch (err) {
            console.error(`❌ Failed to update ${model}:`, err.message);
        }
    }
}

run();
