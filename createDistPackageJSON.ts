import { readFileSync, writeFileSync } from "fs";

const packageJSONBuffer = readFileSync('./package.json');

const packageJSON = JSON.parse(packageJSONBuffer.toString());

const newPackageJSON = {
    scripts: {
        start: "node app.js"
    },
    dependencies: packageJSON.dependencies
}

writeFileSync('./dist/package.json', Buffer.from(JSON.stringify(newPackageJSON, null, 2)))

