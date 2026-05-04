// validation.js - Form validation logic

export const validateTaskInput = (value) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, error: 'Task cannot be empty.' };
  }

  if (trimmed.length < 3) {
    return { valid: false, error: 'Task must be at least 3 characters.' };
  }

  if (trimmed.length > 120) {
    return { valid: false, error: 'Task must be under 120 characters.' };
  }

  return { valid: true, error: null };
};