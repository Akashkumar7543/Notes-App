export function validateLogin(email: string, password: string) {
    const errors: Record<string, string> = {};
  
    if (!email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = "Enter a valid email";
  
    if (!password.trim()) errors.password = "Password is required";
  
    return errors;
  }
  