import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export const firebaseService = {
  // Triage Records
  async saveTriage(data: any) {
    const colRef = collection(db, 'triages');
    return addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      userId: auth.currentUser?.uid || 'anonymous'
    });
  },

  // Patient Referrals
  async getMyReferrals(patientId: string) {
    const q = query(
      collection(db, `patients/${patientId}/referrals`),
      orderBy('issuedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Knowledge Base
  async searchKnowledge(searchTerm: string) {
    // Basic search simulation since Firestore doesn't support full-text native search without Algolia/Elastic
    // In a real app, we'd use a server-side search or a specialized index
    const q = query(collection(db, 'knowledge'), limit(20));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((item: any) => 
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
  },

  // Clinical Protocols
  async getProtocols() {
    const q = query(collection(db, 'protocols'), orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Real-time synchronization for triages (used in Doctor Dashboard)
  subscribeToTriages(callback: (triages: any[]) => void) {
    const q = query(collection(db, 'triages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }
};
