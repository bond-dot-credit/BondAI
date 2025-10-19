import React from 'react';

const InfoSection = () => {
  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
      <h3 className="text-lg font-semibold mb-4">Developer Note</h3>
      <p className="text-sm text-gray-400">
        For some actions, like registering your agent with the ACP and creating jobs, we will be using the <a href="https://remix.ethereum.org/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Remix IDE</a> directly. This allows us to focus on the core functionality of the Provider Agent during this hackathon.
      </p>
      <p className="text-sm text-gray-400 mt-4">
        Please refer to the `docs/testing-guide.md` for detailed instructions on how to use Remix to interact with the smart contracts.
      </p>
    </div>
  );
};

export default InfoSection;
