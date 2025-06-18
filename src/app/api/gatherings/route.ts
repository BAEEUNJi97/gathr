import { NextRequest, NextResponse } from 'next/server';

/**
 * 모임 생성 API
 * @param req 클라이언트에서 받은 formData (모임 정보 + 이미지)
 * @returns 모임 생성 결과 응답 (성공 시 201)
 */
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization');
    if (!token) {
      return NextResponse.json(
        { code: 'UNAUTHORIZED', message: '토큰이 없습니다.' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    console.log('📥 모임 생성 요청 formData:', formData);

    // 서버에 보내기 전에 필요한 파라미터 확인 및 매핑
    const type = formData.get('type');
    if (!['DALLAEMFIT', 'WORKATION', 'OFFICE_STRETCHING', 'MINDFULNESS'].includes(type as string)) {
      return NextResponse.json(
        { code: 'VALIDATION_ERROR', parameter: 'type', message: '유효한 서비스 종류를 입력하세요' },
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/gatherings`, {
      method: 'POST',
      headers: {
        Authorization: token,  // 유효한 토큰을 포함
        // Content-Type 생략 → fetch가 자동으로 boundary 처리함
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('❌ 모임 생성 실패 응답:', data);
      return NextResponse.json(data, { status: res.status });
    }

    console.log('✅ 모임 생성 성공:', data);
    return NextResponse.json(data, { status: 201 });

  } catch (error: unknown) {
    console.error('🔥 모임 생성 요청 중 예외 발생:', error);
    return NextResponse.json(
      { code: 'SERVER_ERROR', message: '모임 생성 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
