import axios from 'axios';
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateRandomID(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

async function checkURL(url) {
  try {
    const res = await axios.get(url, { timeout: 5000 });
    if (res.status === 200) {
      console.log(chalk.green(`----------------------------------- available: ${url}`));
    } else {
      console.log(chalk.red(`❌ Not available: ${url}`));
    }
  } catch {
    console.log(chalk.red(`❌ Not available: ${url}`));
  }
}

function startChecking() {
  rl.question("🔗 Link: https://example.com/): ", (baseUrl) => {
    rl.question("🔢 Number of letters ", async (charCount) => {
      const count = parseInt(charCount);
      if (isNaN(count) || count < 1) {
        console.log(chalk.red("❌ Invalid number"));
        rl.close();
        return;
      }

      rl.question("🔁 How many attempts? ", async (tries) => {
        const total = parseInt(tries);
        console.log(chalk.blue(`\n🚀Start checking: ${baseUrl}\n`));

        for (let i = 0; i < total; i++) {
          const randomID = generateRandomID(count);
          const fullURL = `${baseUrl}${randomID}`;
          await checkURL(fullURL);
        }

        console.log(chalk.yellow("\n🔍 Check completed"));
        rl.close();
      });
    });
  });
}

startChecking();
