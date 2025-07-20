// Simple script to help set up the environment variables
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Path to .env file
const envPath = path.join(__dirname, '.env');

// Function to read the current .env file
function readEnvFile() {
  try {
    if (fs.existsSync(envPath)) {
      return fs.readFileSync(envPath, 'utf8');
    }
    return '';
  } catch (error) {
    console.error('Error reading .env file:', error);
    return '';
  }
}

// Function to update the .env file
function updateEnvFile(content) {
  try {
    fs.writeFileSync(envPath, content);
    console.log('\n✅ .env file updated successfully!\n');
  } catch (error) {
    console.error('Error writing to .env file:', error);
  }
}

// Function to parse the .env file into key-value pairs
function parseEnvFile(content) {
  const envVars = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=');
      if (key) {
        envVars[key.trim()] = value.trim();
      }
    }
  }
  
  return envVars;
}

// Function to convert key-value pairs back to .env file format
function formatEnvFile(envVars, originalContent) {
  // Preserve comments and empty lines from the original content
  const lines = originalContent.split('\n');
  const newLines = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      newLines.push(line); // Preserve comments and empty lines
    } else {
      const key = line.split('=')[0].trim();
      if (envVars[key] !== undefined) {
        newLines.push(`${key}=${envVars[key]}`);
        delete envVars[key]; // Remove from object to track what's been processed
      } else {
        newLines.push(line); // Keep the original line if not in our update object
      }
    }
  }
  
  // Add any new environment variables that weren't in the original file
  for (const [key, value] of Object.entries(envVars)) {
    newLines.push(`${key}=${value}`);
  }
  
  return newLines.join('\n');
}

// Main function
async function main() {
  console.log('\n🔧 Environment Setup Helper 🔧');
  console.log('-------------------------------\n');
  
  const envContent = readEnvFile();
  const envVars = parseEnvFile(envContent);
  
  console.log('Current environment variables:');
  for (const [key, value] of Object.entries(envVars)) {
    console.log(`- ${key}: ${value.substring(0, 10)}${value.length > 10 ? '...' : ''}`);
  }
  
  console.log('\nChecking for missing required variables...');
  
  const requiredVars = [
    'VITE_APPWRITE_URL',
    'VITE_APPWRITE_PROJECT_ID',
    'VITE_APPWRITE_DB_ID',
    'VITE_APPWRITE_COLLECTION_ID',
    'VITE_APPWRITE_BUCKET_ID'
  ];
  
  const missingVars = requiredVars.filter(key => !envVars[key]);
  
  if (missingVars.length === 0) {
    console.log('✅ All required variables are present!\n');
    rl.close();
    return;
  }
  
  console.log(`❌ Missing variables: ${missingVars.join(', ')}\n`);
  
  // Ask for each missing variable
  for (const varName of missingVars) {
    const value = await new Promise(resolve => {
      rl.question(`Please enter a value for ${varName}: `, answer => {
        resolve(answer.trim());
      });
    });
    
    if (value) {
      envVars[varName] = value;
    }
  }
  
  // Update the .env file
  const updatedContent = formatEnvFile(envVars, envContent);
  updateEnvFile(updatedContent);
  
  console.log('Environment setup complete. You can now run the application.');
  rl.close();
}

main(); 