import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createHash } from 'crypto';

export interface FeedbackInstance {
  physician_id: string;
  encounter_id: string;
  ai_suggestion: {
    proposal: string;
    rationale: string;
    confidence: number;
  };
  physician_action: {
    action: 'ACCEPT' | 'REJECT';
    rejection_category?: 'CLINICAL_JUDGMENT' | 'PATIENT_INCOMPATIBLE' | 'FALSE_POSITIVE' | 'SYSTEM_ERROR';
  };
}

export const FeedbackLoopService = {
  async captureFeedback(data: FeedbackInstance) {
    const hashInput = JSON.stringify({
      physician_id: data.physician_id,
      encounter_id: data.encounter_id,
      proposal: data.ai_suggestion.proposal,
      timestamp: Date.now()
    });
    const hash = createHash('sha256').update(hashInput).digest('hex');

    const feedbackRecord = {
      ...data,
      timestamp: serverTimestamp(),
      audit_ledger: {
        hash: hash,
        status: 'PENDING'
      },
      training_status: 'PENDING'
    };

    try {
      const docRef = await addDoc(collection(db, 'feedback_loop_instances'), feedbackRecord);
      return docRef.id;
    } catch (error) {
      console.error("Error en Gobernanza Digital:", error);
      throw error;
    }
  }
};
