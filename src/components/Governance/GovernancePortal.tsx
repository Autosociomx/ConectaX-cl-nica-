import React from 'react';
import TepictuSalud from './TepictuSalud';
import AgroVision3D from './AgroVision3D';
import PublicWorksMonitor from './PublicWorksMonitor';
import DigitalRoadmap from './DigitalRoadmap';
import ClinicalIntelligenceHub from '../ClinicalIntelligenceHub';

interface GovernancePortalProps {
  activeSection: 'TepictuSalud' | 'AgroVisión 3D' | 'Monitor de Obra' | 'Dataset: Inteligencia Global';
}

export default function GovernancePortal({ activeSection }: GovernancePortalProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'TepictuSalud':
        return <TepictuSalud />;
      case 'AgroVisión 3D':
        return <AgroVision3D />;
      case 'Monitor de Obra':
        return <PublicWorksMonitor />;
      case 'Dataset: Inteligencia Global':
        return <ClinicalIntelligenceHub />;
      default:
        return <TepictuSalud />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-20">
      <div className="animate-fadeIn">
        {renderContent()}
      </div>
      <DigitalRoadmap />
    </div>
  );
}
