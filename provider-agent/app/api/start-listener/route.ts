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
  } catch (error: any) {
    console.error('Failed to start ACP listener:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ listening: listenerStarted });
}
