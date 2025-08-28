// components/ToggleSwitch.js
import React from 'react';

const ToggleSwitch = ({ enabled, setEnabled, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-indigo-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default ToggleSwitch;