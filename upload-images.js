// upload-images.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // use service role key for uploads

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const productsFolder = path.join(__dirname, 'public', 'images', 'products');

async function uploadAll() {
  const productFolders = fs.readdirSync(productsFolder);

  for (const folder of productFolders) {
    const folderPath = path.join(productsFolder, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      const remotePath = `products/${folder}/${file}`; // folder structure in bucket

      const { error } = await supabase.storage
        .from('products')
        .upload(remotePath, fileBuffer, {
          contentType: `image/${file.split('.').pop()}`,
          upsert: true, // overwrite if exists
        });

      if (error) {
        console.error(`Failed to upload ${remotePath}:`, error);
      } else {
        console.log(`Uploaded ${remotePath}`);
      }
    }
  }
}

uploadAll().then(() => console.log('All done!'));