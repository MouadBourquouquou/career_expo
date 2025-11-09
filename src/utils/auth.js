const ADMIN_EMAIL = 'mouad@example.com';
// Temporary: will be updated with correct Web Crypto hash
const ADMIN_PASSWORD_HASH = 'temp';

// Generate correct hash for 'Mouad1234'
const generateCorrectHash = async () => {
  const hash = await hashPassword('Mouad1234');
  console.log('Correct hash for Mouad1234:', hash);
  return hash;
};

// Call this once to get the correct hash
// generateCorrectHash();

export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const authenticateAdmin = async (email, password) => {
  console.log('Email check:', email, '===', ADMIN_EMAIL, '?', email === ADMIN_EMAIL);
  if (email !== ADMIN_EMAIL) return false;
  
  // Temporary: check password directly while we get correct hash
  if (password === 'Mouad1234') {
    const hashedPassword = await hashPassword(password);
    console.log('Generated hash for Mouad1234:', hashedPassword);
    console.log('Copy this hash and update ADMIN_PASSWORD_HASH');
    return true;
  }
  
  return false;
};

export const isAuthenticated = () => {
  return localStorage.getItem('adminAuthenticated') === 'true';
};

export const login = () => {
  localStorage.setItem('adminAuthenticated', 'true');
};

export const logout = () => {
  localStorage.removeItem('adminAuthenticated');
};

// Helper function to generate password hash (for development only)
export const generatePasswordHash = async (password) => {
  const hash = await hashPassword(password);
  console.log(`Password: "${password}" -> Hash: "${hash}"`);
  return hash;
};

// Common passwords and their hashes (for reference)
// generatePasswordHash('admin123') -> 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
// generatePasswordHash('password') -> 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
// generatePasswordHash('emje2025') -> 12d23d5bf31712f1d40f2a44026743e4b4bf8efe9246f183267df9d95f7b77b2
