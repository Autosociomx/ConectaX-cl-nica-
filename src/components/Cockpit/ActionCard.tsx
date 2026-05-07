import React from 'react';
import { FeedbackLoopService } from '../../services/FeedbackLoopService';
import { auth } from '../../firebase';

const ActionCard = ({ proposal, rationale, confidence, onAccept, onReject }) => {
  
  const handleReject = async () => {
    // Aquí integraríamos la lógica de categorización rápida
    await FeedbackLoopService.captureFeedback({
      physician_id: auth.currentUser?.uid || 'anonymous',
      encounter_id: 'enc_001', // ID dinámico
      ai_suggestion: { proposal, rationale, confidence },
      physician_action: { action: 'REJECT', rejection_category: 'CLINICAL_JUDGMENT' }
    });
    onReject();
  };

  return (
    <div className="bg-white border-l-4 border-blue-600 shadow-xl rounded-lg p-6 max-w-lg animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-800">Sugerencia del Copiloto</h3>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          Confianza: {confidence}%
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 text-base">{proposal}</p>
      
      <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 mb-6 italic border-l-2 border-gray-300">
        <span className="font-bold">Razonamiento:</span> {rationale}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onAccept}
          className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
        >
          Validar
        </button>
        <button 
          onClick={handleReject}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-bold hover:bg-gray-300 transition"
        >
          Descartar
        </button>
      </div>
    </div>
  );
};

export default ActionCard;
