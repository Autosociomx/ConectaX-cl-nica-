import React from 'react';
import ContextZone from './ContextZone';
import ExecutionZone from './ExecutionZone';
import PrecisionZone from '../PrecisionZone';

export default function CockpitLayout() {
  return (
    <div className="grid grid-cols-[20%_50%_30%] h-screen bg-soft-bg overflow-hidden">
      <ContextZone />
      <ExecutionZone />
      <PrecisionZone />
    </div>
  );
}
