'use client';

import ClientOnly from './components/ClientOnly';
import PixelBlast from './components/PixelBlast';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <ClientOnly>
          <PixelBlast
            variant="circle"
            pixelSize={6}
            color="#B19EEF"
            patternScale={3}
            patternDensity={1.2}
            pixelSizeJitter={0.5}
            enableRipples={true} // Re-enabled for debugging
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false} // Still disabled
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        </ClientOnly>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold">Provider Agent</h1>
            <p className="mt-4 text-2xl">
              ERC-8004 Score-as-a-Service
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}