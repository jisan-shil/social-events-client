export function validatePassword(password) {
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return null;
}