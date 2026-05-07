import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Lazy initialization of Firebase Admin
let adminApp: any = null;
function getAdminApp() {
  if (!adminApp) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccount) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is required');
    }
    adminApp = initializeApp({
      credential: cert(JSON.parse(serviceAccount)),
    });
  }
  return adminApp;
}

// Governance Policy Definition
const GovernancePolicy = {
  dataPrivacy: "Federated",
  consentRequired: true,
  auditLog: "Immutable",
  aiTransparency: "Required",
  compliance: "NOM-024-SSA3-2012"
};

// GovernanceGuard Middleware
const GovernanceGuard = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[GOVERNANCE GUARD] Request received: ${req.method} ${req.path}`);
  
  // 1. Authenticate Request using Firebase Auth Token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token." });
  }
  const token = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await getAdminApp().auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    
    // 2. Audit Log (Immutable - Writing to Firestore)
    await getAdminApp().firestore().collection('audit_logs').add({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      method: req.method,
      path: req.path,
      userId: userId,
      policy: GovernancePolicy
    });

    // 3. Compliance Check (NOM-024 simulation - Querying Firestore for consent)
    if (req.path.startsWith('/api/clinical')) {
      const userDoc = await getAdminApp().firestore().collection('users').doc(userId).get();
      if (!userDoc.exists || !userDoc.data()?.consentGranted) {
        return res.status(403).json({ error: "Compliance Violation: Consent required for clinical data access." });
      }
    }
    
    // Attach userId to request for downstream use
    (req as any).userId = userId;
    next();
  } catch (error) {
    console.error('[GOVERNANCE GUARD] Auth Error:', error);
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Apply GovernanceGuard to all API routes
  app.use('/api', GovernanceGuard);

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", governance: GovernancePolicy });
  });

  // Triage API endpoint (Protected by GovernanceGuard)
  app.get("/api/clinical/triage", (req, res) => {
    // In a real scenario, this would query the database
    res.json({ patients: [
      { id: 'p1', name: 'Paciente A', severity: 'high', status: 'waiting' },
      { id: 'p2', name: 'Paciente B', severity: 'low', status: 'waiting' }
    ]});
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
