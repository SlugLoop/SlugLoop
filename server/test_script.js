const {execSync} = require('child_process')
const killPort = require('kill-port')

// Define Jest configuration
const config = {
  verbose: true,
  runInBand: true,
  forceExit: true,
  detectOpenHandles: true,
  coverage: true,
}

// Set the environment variable
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'

// Run tests command
const runTestsCommand = `jest ${Object.entries(config)
  .map(([key, value]) => `--${key}=${value}`)
  .join(' ')}`

// Start emulator, run test, and stop emulator command
const firebaseTestCommand = `npx firebase emulators:exec --import=./firestore --only firestore "${runTestsCommand}"`

try {
  // Execute the test command
  execSync(firebaseTestCommand, {stdio: 'inherit'})
} catch (err) {
  console.error(err)
}

// Kill all running processes on port 8080
killPort(8080)
  .then(() => {
    console.log('All processes running on port 8080 have been killed.')

    // Exit the script
    process.exit()
  })
  .catch((err) => console.error('Error in killing processes: ', err))
