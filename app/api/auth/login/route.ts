import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // In a real application, you would validate credentials against a database
  if (username === 'admin' && password === 'admin') {
    return NextResponse.json({ message: 'Login successful', token: 'fake-jwt-token' });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
