"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFadeIn } from "@/hooks/useFadeIn";
import projects from "@/data/projects.json";

export default function HomePage() {
  const releasedProjects = projects.filter((p) => p.status === "출시");
  const fadeRef = useFadeIn();

  return (
    <>
      <Header />
      <main className="flex-1" ref={fadeRef}>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-accent/8 rounded-full blur-[80px]" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center pt-24 pb-16 sm:pb-20">
            <div className="page-enter inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-sm text-muted mb-6 sm:mb-8">
              <Sparkles size={14} className="text-accent" />
              Engineering Solutions in Life&apos;s Gaps
            </div>

            <h1 className="page-enter page-enter-delay-1 text-3xl sm:text-5xl md:text-7xl font-bold leading-tight mb-5 sm:mb-6">
              기술로 채우는
              <br />
              <span className="gradient-text">일상의 빈틈</span>
            </h1>

            <p className="page-enter page-enter-delay-2 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              거대기업들이 수익성 때문에 놓친 작은 불편함들을
              <br className="hidden sm:block" />
              우리의 기술로 하나씩 해결해 나갑니다
            </p>

            <div className="page-enter page-enter-delay-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors duration-200 glow-sm"
              >
                회사 소개
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 glass hover:bg-surface-light text-foreground font-medium rounded-xl transition-colors duration-200"
              >
                프로젝트 보기
              </Link>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="fade-in text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                출시된 <span className="gradient-text">프로젝트</span>
              </h2>
              <p className="text-muted text-base sm:text-lg">
                일상의 빈틈을 채우는 혁신적인 솔루션들
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 fade-in-stagger">
              {releasedProjects.map((project) => (
                <div key={project.id} className="fade-in">
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block glass rounded-2xl overflow-hidden hover:glow transition-shadow duration-300"
                  >
                    <div className="relative h-44 sm:h-52 overflow-hidden">
                      <Image
                        src={project.bannerImage}
                        alt={project.projectName}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/20">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.projectName}
                      </h3>
                      <p className="text-muted text-sm mb-3 sm:mb-4 whitespace-pre-line">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs rounded-md bg-surface-lighter text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="fade-in text-center mt-10 sm:mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium"
              >
                모든 프로젝트 보기
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] bg-primary/8 rounded-full blur-[80px]" />
          </div>
          <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <div className="fade-in glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16">
              <Rocket size={36} className="text-primary mx-auto mb-5 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                함께 혁신을 만들어갑니다
              </h2>
              <p className="text-muted text-base sm:text-lg mb-6 sm:mb-8">
                LaMoss Tech와 함께 일상의 불편함을 해결하고
                <br className="hidden sm:block" />
                더 나은 삶을 만들어가요.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors duration-200 glow-sm"
              >
                문의하기
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
