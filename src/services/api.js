import { sessions } from '../data/sessions';

// Helper function to create a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchSessions(forceError = false) {
  // Wait 1.5 seconds to simulate a network request
  await delay(1500); 

  if (forceError) {
    throw new Error("Failed to load classes. The server is down.");
  }
  
  return sessions;
}

export async function fetchSessionById(id) {
  await delay(800); 
  const session = sessions.find(s => s.id === id);
  
  if (!session) {
    throw new Error("Class not found");
  }
  
  return session;
}