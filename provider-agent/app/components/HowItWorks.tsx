import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Client Creates Job',
      description: 'Client submits agent address via ACP contract',
      icon: '📝',
      color: 'blue'
    },
    {
      number: '2',
      title: 'Listener Detects',
      description: 'Provider detects new job from blockchain events',
      icon: '🎧',
      color: 'purple'
    },
    {
      number: '3',
      title: 'TEE Computation',
      description: 'Giza scoring runs in iExec secure enclave',
      icon: '🔐',
      color: 'green'
    },
    {
      number: '4',
      title: 'Publish Score',
      description: 'Result published to ReputationRegistry on-chain',
      icon: '✅',
      color: 'yellow'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-900/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-900/20 text-purple-400 border-purple-500/30',
      green: 'bg-green-900/20 text-green-400 border-green-500/30',
      yellow: 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">How It Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 transition-all duration-300 hover:scale-105 ${getColorClasses(step.color)}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl">{step.icon}</div>
              <div className="text-xs font-mono opacity-60">Step {step.number}</div>
            </div>
            <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
