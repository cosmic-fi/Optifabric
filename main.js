const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function createFoldersAndJsonFiles() {
  try {
    const response = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json');
    const versions = response.data.versions;

    const versionPattern = /^1\.(1[2-9]|20(\.0|(\.[0-2])))(\.\d+)*$/;

    // Iterate through versions and create folders with an empty JSON file
    for (let i = 0; i < versions.length; i++) {
      const version = versions[i];
      const versionId = version.id;

      if (versionPattern.test(versionId) && !versionId.includes('pre') && !versionId.includes('beta') && !versionId.includes('alpha')) {
        const folderPath = path.join(__dirname, versionId);
        const jsonFilePath = path.join(folderPath, 'data.json');

        // Check if the folder doesn't exist, then create it
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
          console.log(`Folder created for version: ${versionId}`);
        }

        // Create an empty JSON file
        fs.writeFileSync(jsonFilePath, '{}');
        console.log(`JSON file created for version: ${versionId}`);
      }
    }
  } catch (error) {
    console.error('Error creating folders and JSON files:', error);
  }
}

// Run the function to create folders and JSON files
createFoldersAndJsonFiles();