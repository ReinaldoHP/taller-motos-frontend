// Interfaz para el usuario
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string; // Opcional porque no siempre se devuelve en las respuestas
  email_verified_at?: string; // Opcional (solo si el backend lo incluye)
  created_at?: string; // Opcional (solo si el backend lo incluye)
  updated_at?: string; // Opcional (solo si el backend lo incluye)
}

// Interfaz para la respuesta de inicio de sesión
export interface LoginResponse {
  message: string;
  user: User; // Usa la interfaz User aquí
  token: string;
}

// Interfaz para la respuesta de registro
export interface RegisterResponse {
  message: string;
  user: User; // Usa la interfaz User aquí
}
