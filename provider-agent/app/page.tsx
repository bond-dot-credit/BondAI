import { startAcpListener } from './lib/acp-listener';

export default function Home() {
  // Start the ACP listener as a side effect of rendering this server component.
  // In a production app, this should be handled in a more robust way,
  // such as a separate process or a background task manager.
  startAcpListener();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Provider Agent</h1>
        <p className="mt-4 text-lg text-gray-600">
          The ACP listener is running and listening for new job requests on the Base network.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Check the server console for logs.
        </p>
      </div>
    </main>
  );
}