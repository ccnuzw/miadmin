import { NextResponse } from 'next/server';

interface UserData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const mockData: UserData[] = Array.from({ length: 100 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  age: 20 + (i % 50),
  email: `user${i + 1}@example.com`,
  status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
  createdAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const sortBy = searchParams.get('sortBy') || 'id';
  const sortOrder = searchParams.get('sortOrder') || 'asc'; // 'asc' or 'desc'
  const search = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || '';

  let filteredData = mockData;

  // Apply search filter
  if (search) {
    const lowerCaseSearch = search.toLowerCase();
    filteredData = filteredData.filter(item =>
      item.name.toLowerCase().includes(lowerCaseSearch) ||
      item.email.toLowerCase().includes(lowerCaseSearch)
    );
  }

  // Apply status filter
  if (statusFilter) {
    filteredData = filteredData.filter(item => item.status === statusFilter);
  }

  // Apply sorting
  filteredData.sort((a, b) => {
    const aValue = (a as any)[sortBy];
    const bValue = (b as any)[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const total = filteredData.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedData,
    total,
    page,
    pageSize,
  });
}
