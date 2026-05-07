import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const logErrorToTelemetry = async (error: any, context: { component: string; action: string; userId?: string }) => {
  console.error(`[TELEMETRY ERROR] [${context.component}] [${context.action}]:`, error);
  
  try {
    const errorRef = doc(collection(db, 'telemetry_errors'));
    await setDoc(errorRef, {
      ...context,
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null,
      timestamp: serverTimestamp(),
    });
  } catch (telemetryError) {
    console.error('Failed to log telemetry error:', telemetryError);
  }
};

export const logSystemEvent = async (event: string, details: any) => {
  console.log(`[TELEMETRY EVENT] [${event}]:`, details);
  try {
    const eventRef = doc(collection(db, 'telemetry_events'));
    await setDoc(eventRef, {
      event,
      details,
      timestamp: serverTimestamp(),
    });
  } catch (telemetryError) {
    console.error('Failed to log telemetry event:', telemetryError);
  }
};
