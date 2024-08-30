'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Function to dynamically import a component after a delay
const loadWithDelay = (importFunc, delay) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const Component = await importFunc();
      resolve(Component.default || Component);
    }, delay);
  });
};

const UseDelayedExport = () => {
  const [DelayedUserTracker, setDelayedUserTracker] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      const DelayedComponent = dynamic(() => loadWithDelay(() => import('./UserTracker'), 10000));
      setDelayedUserTracker(() => DelayedComponent);
    };

    loadComponent();
  }, []);

  return (
    <div>
      {DelayedUserTracker ? <DelayedUserTracker /> : <p></p>}
    </div>
  );
};

export default UseDelayedExport;
