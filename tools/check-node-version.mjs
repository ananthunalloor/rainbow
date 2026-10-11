import process from 'node:process';

const [major, minor] = process.versions.node.split('.').map(Number);
const supported = major > 22 || (major === 22 && minor >= 18);

if (!supported) {
  console.error(
    `Rainbow requires Node.js >=22.18.0; found ${process.versions.node}.`,
  );
  process.exit(1);
}

console.log(`Node.js ${process.versions.node} satisfies the Rainbow engine requirement.`);
