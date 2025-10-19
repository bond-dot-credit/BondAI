import { NextResponse } from 'next/server';
import { startAcpListener } from '../../lib/acp-listener';

let listenerStarted = false;

export async function POST() {
  try {
    if (!listenerStarted) {
      startAcpListener();
      listenerStarted = true;
      return NextResponse.json({ success: true, message: 'ACP Listener started successfully' });
    } else {
      return NextResponse.json({ success: true, message: 'ACP Listener already running' });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to start ACP listener:', error);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ listening: listenerStarted });
}
