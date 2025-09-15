
import { NextResponse } from 'next/server';
import { tourCategories } from '@/lib/data';

const TOURS_PER_PAGE = 12; // Cập nhật limit theo yêu cầu

// Tạo một danh sách phẳng gồm TẤT CẢ các tour du lịch cụ thể (destinations)
const allDestinationTours = Object.entries(tourCategories).flatMap(([categorySlug, categoryData]) => 
  // Lặp qua mỗi nhóm tour (ví dụ: Hàn Quốc, Nhật Bản)
  categoryData.tours.flatMap(tourGroup => 
    // Lặp qua mỗi tour cụ thể trong nhóm đó
    tourGroup.destinations.map(destination => ({
      // Giữ lại tất cả thông tin của tour cụ thể
      ...destination,
      // Thêm các thông tin cần thiết để hiển thị và tạo link
      id: `${categorySlug}-${destination.slug}`, // ID duy nhất cho key của React
      category: categorySlug, // slug của danh mục cha (ví dụ: 'chau-a')
      tourName: tourGroup.name, // Tên nhóm tour (ví dụ: 'Hàn Quốc')
      tourSlug: tourGroup.slug, // slug của nhóm tour (ví dụ: 'han-quoc')
    }))
  )
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || `${TOURS_PER_PAGE}`, 10);

  const totalPages = Math.ceil(allDestinationTours.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedTours = allDestinationTours.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedTours,
    totalPages: totalPages,
    currentPage: page,
  });
}
