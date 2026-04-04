"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFadeIn } from "@/hooks/useFadeIn";
import projects from "@/data/projects.json";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    출시: "bg-green-500/20 text-green-400 border-green-500/20",
    개발중: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    기획: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/20"
      }`}
    >
      {status}
    </span>
  );
}

export default function ProjectsPage() {
  const fadeRef = useFadeIn();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24" ref={fadeRef}>
        {/* Hero */}
        <section className="relative py-14 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 grid-pattern" />
          <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-accent/5 rounded-full blur-[100px]" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="page-enter text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">프로젝트</span>
            </h1>
            <p className="page-enter page-enter-delay-1 text-base sm:text-lg text-muted">
              일상의 빈틈을 채우는 혁신적인 솔루션들
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 fade-in-stagger">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="fade-in group glass rounded-2xl overflow-hidden hover:glow transition-shadow duration-300"
                >
                  <Link href={`/projects/${project.id}`}>
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      {project.bannerImage ? (
                        <Image
                          src={project.bannerImage}
                          alt={project.projectName}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-accent/10 flex items-center justify-center">
                          <span className="text-3xl font-bold gradient-text">{project.projectName}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <StatusBadge status={project.status} />
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.projectName}
                      </h3>
                      <p className="text-sm text-muted mb-3 sm:mb-4 whitespace-pre-line line-clamp-2">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 sm:px-2 sm:py-1 text-xs rounded-md bg-surface-lighter text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                  {project.status === "출시" && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 flex gap-2 sm:gap-3">
                      {project.playstoreLink && (
                        <a
                          href={project.playstoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 rounded-lg bg-surface-lighter hover:bg-surface-light text-xs sm:text-sm font-medium transition-colors"
                        >
                          <Download size={13} />
                          Google Play
                        </a>
                      )}
                      {project.appstoreLink && (
                        <a
                          href={project.appstoreLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 rounded-lg bg-surface-lighter hover:bg-surface-light text-xs sm:text-sm font-medium transition-colors"
                        >
                          <ExternalLink size={13} />
                          App Store
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-20 relative">
          <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <div className="fade-in glass rounded-2xl sm:rounded-3xl p-8 sm:p-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                새로운 아이디어가 있으신가요?
              </h2>
              <p className="text-sm sm:text-base text-muted mb-6 sm:mb-8">
                일상의 불편함을 해결할 수 있는 기술적 솔루션에 대한 아이디어가
                있으시다면 언제든지 연락주세요.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors duration-200"
              >
                아이디어 제안하기
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
