"use client";

import { Users, Lightbulb, Star, Leaf } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFadeIn } from "@/hooks/useFadeIn";

const coreValues = [
  {
    icon: Users,
    title: "사용자 중심",
    description: "모든 결정의 중심에는 사용자가 있습니다",
  },
  {
    icon: Lightbulb,
    title: "혁신 추구",
    description: "끊임없는 도전과 혁신으로 새로운 가치를 창출합니다",
  },
  {
    icon: Star,
    title: "품질 우선",
    description: "완벽한 품질의 제품과 서비스를 제공합니다",
  },
];

export default function AboutPage() {
  const fadeRef = useFadeIn();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24" ref={fadeRef}>
        {/* Hero */}
        <section className="relative py-14 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="page-enter text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              LaMoss <span className="gradient-text">Tech</span>
            </h1>
            <p className="page-enter page-enter-delay-1 text-base sm:text-lg text-muted max-w-2xl mx-auto">
              일상의 빈틈을 자연스럽게 채우는 기술
            </p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-14 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-sm text-accent mb-5 sm:mb-6">
                  <Leaf size={14} />
                  Brand Story
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">
                  La<span className="text-primary">Moss</span> = Lacuna + Moss
                </h2>
                <p className="text-muted leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                  거대기업들이 수익성 때문에 놓친 작은 불편함들을 우리의 기술로
                  하나씩 해결해 나가는 테크 스타트업입니다.
                </p>
                <div className="glass rounded-xl p-5 sm:p-6 border-l-4 border-primary">
                  <p className="text-muted italic leading-relaxed text-sm sm:text-base">
                    &ldquo;이끼가 바위의 틈새에서 자라나듯, 우리는 일상의 빈틈을
                    자연스럽게 채워갑니다&rdquo;
                  </p>
                </div>
              </div>

              <div className="fade-in grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                    Lacuna
                  </div>
                  <p className="text-sm text-muted">일상의 빈틈</p>
                </div>
                <div className="glass rounded-2xl p-5 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                    Moss
                  </div>
                  <p className="text-sm text-muted">자연스럽게 채우다</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-14 sm:py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="fade-in text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                핵심 <span className="gradient-text">가치</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 fade-in-stagger">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="fade-in glass rounded-2xl p-6 sm:p-8 text-center"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                    <value.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
