# LaMoss Tech 회사 웹사이트

## 프로젝트 개요

LaMoss Tech의 공식 회사 웹사이트. 회사 소개, 출시 프로젝트(모바일 앱) 쇼케이스, 개인정보 보호정책, 고객 문의 기능을 제공한다.

- **도메인**: https://www.lamoss.net
- **배포**: Vercel
- **언어**: 한국어 (개인정보 보호 페이지만 한/영 전환 지원)

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, TypeScript) |
| 스타일링 | Tailwind CSS v4 (`@theme inline` 방식) |
| 폰트 | Pretendard (CDN, `<link>` 로드) |
| 아이콘 | lucide-react |
| 마크다운 | react-markdown + remark-gfm |
| 이메일 | @emailjs/browser |
| 애니메이션 | CSS만 사용 (framer-motion 미사용, 성능 이유) |

## 디렉토리 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃, 메타데이터, Pretendard 폰트
│   ├── globals.css             # 디자인 시스템 (색상, 유틸리티 클래스)
│   ├── page.tsx                # 홈 (히어로 + 프로젝트 카드 + CTA)
│   ├── about/page.tsx          # 회사소개 (브랜드 스토리 + 핵심 가치 3개)
│   ├── projects/page.tsx       # 프로젝트 목록 (그리드 카드, 다운로드 링크)
│   ├── projects/[id]/page.tsx  # 프로젝트 상세 (배너, 스크린샷 캐러셀, 마크다운 설명, 사이드바)
│   ├── privacy/page.tsx        # 개인정보 보호 (프로젝트별 탭, 한/영 전환)
│   └── contact/page.tsx        # 고객센터 (EmailJS 연동 폼)
├── components/
│   ├── Header.tsx              # 고정 네비게이션, 스크롤 시 글래스 효과, 모바일 메뉴
│   └── Footer.tsx              # 회사 정보, 바로가기, 연락처
├── hooks/
│   └── useFadeIn.ts            # IntersectionObserver 기반 스크롤 fade-in 훅
└── data/                       # JSON 기반 컨텐츠 관리 (DB 미사용)
    ├── projects.json           # 프로젝트 데이터 (2개: recipe, trendly)
    ├── privacy.json            # 개인정보 보호정책 (일반, recipe, trendly / KO+EN)
    └── roadmap.json            # 로드맵 (현재 미사용, 데이터만 보존)
```

## 디자인 시스템

### 테마: 다크

| 토큰 | 값 | 용도 |
|------|-----|------|
| `background` | `#050510` | 페이지 배경 |
| `foreground` | `#e8e8f0` | 기본 텍스트 |
| `primary` | `#6366f1` (인디고) | 버튼, 링크, 포인트 |
| `primary-light` | `#818cf8` | 호버, 보조 포인트 |
| `primary-dark` | `#4f46e5` | 버튼 호버 |
| `accent` | `#22d3ee` (시안) | 그라디언트 보조색 |
| `surface` | `#0f0f23` | 카드 배경 |
| `surface-light` | `#1a1a35` | 입력 필드, 호버 배경 |
| `surface-lighter` | `#25254a` | 태그, 뱃지 배경 |
| `muted` | `#94a3b8` | 보조 텍스트 |
| `border` | `rgba(99,102,241,0.15)` | 테두리 |

### CSS 유틸리티 클래스

- `.glass` — 반투명 카드 배경 (`rgba(15,15,35,0.7)` + 테두리). backdrop-filter 미사용 (성능)
- `.glass-light` — 더 가벼운 글래스
- `.gradient-text` — 인디고→시안 그라디언트 텍스트
- `.glow` / `.glow-sm` — 인디고 계열 box-shadow 발광 효과
- `.grid-pattern` — 60px 그리드 배경 패턴
- `.fade-in` — 스크롤 시 나타나는 애니메이션 (`.visible` 클래스 토글)
- `.fade-in-stagger` — 자식 `.fade-in` 요소에 80ms 간격 딜레이
- `.page-enter` — 페이지 진입 시 한 번 재생되는 애니메이션
- `.markdown-content` — 마크다운 렌더링 스타일

### 애니메이션 규칙

- framer-motion 사용하지 않음 (스크롤 랙 원인)
- CSS `@keyframes` + `IntersectionObserver`만 사용
- 헤더 글래스 효과는 inline style + `transition` 으로 처리 (깜빡임 방지)
- `transition-all` 대신 `transition-colors`, `transition-shadow` 등 구체적 속성 사용

## 데이터 관리

DB를 사용하지 않고 `src/data/*.json` 파일로 모든 컨텐츠를 관리한다.

### projects.json 스키마

```typescript
interface Project {
  id: string;                  // URL 슬러그 ("recipe", "trendly")
  projectCode: string;
  projectName: string;         // 표시 이름 ("냉장고 털이", "트렌들리")
  status: "출시" | "개발중" | "기획";
  shortDescription: string;    // 카드에 표시되는 짧은 설명
  detailedDescription: string; // 마크다운 형식 상세 설명
  bannerImage: string;         // /images/projects/{id}/banner.{png|jpg}
  screenshots: string[];       // /images/projects/{id}/*.jpg
  releaseDate: string | null;
  tags: string[];
  version: string;
  lastUpdate: string;          // YYYY-MM-DD
  downloadCount: number;
  rating: number;              // 0.0 ~ 5.0
  playstoreLink: string;
  appstoreLink: string;
}
```

### privacy.json 스키마

```typescript
interface PrivacyPolicy {
  info: {
    id: string;        // "general" | "recipe" | "trendly"
    titleKo: string;
    titleEn: string;
    dateKo: string;
    dateEn: string;
  };
  itemsKo: PrivacyItem[];
  itemsEn: PrivacyItem[];
}

interface PrivacyItem {
  title: string;
  icon: string;   // 이모지
  text: string;   // 마크다운
}
```

## 이미지

모든 이미지는 `public/images/` 에 위치한다. Next.js `<Image>` 컴포넌트로 렌더링.

```
public/images/projects/
├── recipe/
│   ├── banner.png
│   └── 1.jpg ~ 6.jpg (스크린샷)
└── trendly/
    ├── banner.jpg
    └── screenshot1.jpg ~ screenshot7.jpg (스크린샷)
```

## 페이지별 구성

### 홈 (`/`)
- 히어로: 슬로건 "기술로 채우는 일상의 빈틈", CTA 버튼 2개
- 프로젝트 섹션: 출시된 프로젝트 카드 (projects.json에서 status=출시 필터)
- CTA 섹션: "함께 혁신을 만들어갑니다" + 문의하기 버튼

### 회사소개 (`/about`)
- 히어로: "LaMoss Tech"
- 브랜드 스토리: LaMoss = Lacuna(빈틈) + Moss(이끼) 설명
- 핵심 가치: 사용자 중심, 혁신 추구, 품질 우선 (3개 카드)

### 프로젝트 목록 (`/projects`)
- 그리드 카드 (1열 모바일 / 2열 태블릿 / 3열 데스크톱)
- 각 카드: 배너 이미지, 상태 뱃지, 설명, 태그, 다운로드 버튼

### 프로젝트 상세 (`/projects/[id]`)
- 배너 이미지
- 프로젝트 정보 + 다운로드 버튼 (Google Play, App Store)
- 스크린샷 캐러셀 (좌우 버튼 + 썸네일)
- 마크다운 상세 설명
- 사이드바: 버전, 업데이트 날짜, 평점, 다운로드 수

### 개인정보 보호 (`/privacy`)
- 탭: 일반 정책 / 냉장고 털이 / 트렌들리
- 한국어/English 토글
- 마크다운 렌더링된 각 섹션 (아이콘 + 제목 + 본문)

### 고객센터 (`/contact`)
- 연락처 정보 사이드바 (이메일, 웹사이트, 대표)
- 문의 유형 안내
- 폼: 이름, 이메일, 회사명, 문의유형, 제목, 메시지
- EmailJS 연동 (service_dfu9pzq / template_jn0zjxk)

## 회사 정보

- **회사명**: LaMoss Tech (라모스테크)
- **대표**: 이상윤
- **이메일**: kara090813@gmail.com
- **웹사이트**: https://www.lamoss.net
- **슬로건**: 기술로 채우는 일상의 빈틈, 혁신으로 만드는 더 나은 삶
- **영문**: Engineering Solutions in Life's Gaps
- **브랜드 의미**: LaMoss = Lacuna(일상의 빈틈) + Moss(자연스럽게 채우다)

## 출시 프로젝트

### 냉장고 털이 (recipe)
- AI 기반 개인 맞춤형 레시피 추천 앱
- Flutter / Firebase / AI 이미지 인식
- Google Play + App Store

### 트렌들리 (trendly)
- 실시간 트렌드 분석 & 토론 플랫폼
- Flutter / Django REST API / PostgreSQL
- Google Play + App Store

## 빌드 및 배포

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

Vercel에 GitHub 연동하여 자동 배포. 환경변수:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_dfu9pzq
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_jn0zjxk
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=MoXDZC3HQoIwTU43Z
```

## 주의사항

- 애니메이션에 framer-motion 사용 금지 (스크롤 랙 발생). CSS 기반만 사용할 것
- `.glass` 클래스에 `backdrop-filter` 사용 금지 (성능). 헤더만 inline style로 예외 적용
- 헤더 스크롤 상태 전환 시 CSS 클래스 토글 대신 inline style 사용 (보더 깜빡임 방지)
- `roadmap.json` 데이터는 보존되어 있으나 현재 UI에서는 사용하지 않음
- 개인정보 보호 텍스트는 반드시 기존 내용 그대로 유지할 것
