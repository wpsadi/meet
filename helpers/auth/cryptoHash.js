import crypto from 'crypto';

// Function to create a hash
export function createHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Function to verify a hash
export function verifyHash(data, hash) {
  const dataHash = createHash(data);
  return dataHash === hash;
}