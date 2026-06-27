import React from 'react';
import ContextZone from './ContextZone';
import ExecutionZone from './ExecutionZone';
import PrecisionZone from '../PrecisionZone';
import NeuralMap from '../Elite/NeuralMap';

export default function CockpitLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[25%_45%_30%] gap-6 h-[calc(100vh-140px)] bg-transparent">
      {/* Left: Context & Patient Intelligence */}
      <div className="flex flex-col gap-6 overflow-hidden">
        <ContextZone />
      </div>

      {/* Center: Neural Core & Execution */}
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="h-[40%] flex-shrink-0">
          <NeuralMap />
        </div>
        <div className="flex-grow overflow-hidden">
          <ExecutionZone />
        </div>
      </div>

      {/* Right: Precision Insights & Prediction */}
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="h-full">
           <PrecisionZone />
        </div>
      </div>
    </div>
  );
}
