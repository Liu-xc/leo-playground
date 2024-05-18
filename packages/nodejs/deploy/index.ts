import { execSync } from "child_process";
import path from "path";

const secretPath = path.resolve('/users/leo/Documents/secret.json');
const { ALIBABA_CLOUD_ACCESS_KEY_ID, ALIBABA_CLOUD_ACCESS_KEY_SECRET } = require(secretPath);
const sendCommandPath = path.resolve(__dirname, './sendCommand.js');

const command = `ALIBABA_CLOUD_ACCESS_KEY_ID=${ALIBABA_CLOUD_ACCESS_KEY_ID} ALIBABA_CLOUD_ACCESS_KEY_SECRET=${ALIBABA_CLOUD_ACCESS_KEY_SECRET} node ${sendCommandPath}`;
const res = execSync(command, { encoding: 'utf-8' });
console.log(res)