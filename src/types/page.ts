// types/page.ts

// feature 아이템
export interface Feature {
  icon: string;
  title: string;
  text: string;
}

// hero 섹션
export interface Hero {
  title: string;
  subtitle: string;
  bg: string; // background CSS 값
}

// CTA 버튼
export interface Cta {
  href: string;
  label: string;
}

// Page 전체 구조
export interface Page {
  id: number;
  hero: Hero;
  image: string;
  sectionTitle: string;
  paragraphs: string[];
  features: Feature[];
  cta: Cta;
}
