"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import projects from "@/data/projects.json";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  if (!project) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center px-5">
            <h1 className="text-2xl font-bold mb-4">프로젝트를 찾을 수 없습니다</h1>
            <Link href="/projects" className="text-primary hover:text-primary-light">
              프로젝트 목록으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const screenshots = project.screenshots;

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4 sm:py-6">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              홈
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              프로젝트
            </Link>
            <span>/</span>
            <span className="text-foreground">{project.projectName}</span>
          </nav>
        </div>

        {/* Banner */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="page-enter relative h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden glow">
            {project.bannerImage ? (
              <Image
                src={project.bannerImage}
                alt={project.projectName}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-accent/10 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl font-bold gradient-text">{project.projectName}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        </section>

        {/* Project Info */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 page-enter page-enter-delay-1">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {project.projectName}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/20">
                  {project.status}
                </span>
              </div>

              <p className="text-base sm:text-lg text-muted mb-5 sm:mb-6 whitespace-pre-line">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-lg bg-surface-lighter text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Download Buttons */}
              {project.status === "출시" && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {project.playstoreLink && (
                    <a
                      href={project.playstoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors"
                    >
                      <Download size={18} />
                      Google Play
                    </a>
                  )}
                  {project.appstoreLink && (
                    <a
                      href={project.appstoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 glass hover:bg-surface-light text-foreground font-medium rounded-xl transition-colors"
                    >
                      <ExternalLink size={18} />
                      App Store
                    </a>
                  )}
                </div>
              )}

              {/* Screenshots */}
              {screenshots.length > 0 && (
                <div className="mb-8 sm:mb-10">
                  <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">스크린샷</h2>
                  <div className="relative">
                    <div className="relative h-[350px] sm:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden glass">
                      <Image
                        src={screenshots[currentScreenshot]}
                        alt={`Screenshot ${currentScreenshot + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {screenshots.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentScreenshot(
                              (prev) => (prev - 1 + screenshots.length) % screenshots.length
                            )
                          }
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center hover:bg-surface-light transition-colors"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentScreenshot(
                              (prev) => (prev + 1) % screenshots.length
                            )
                          }
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center hover:bg-surface-light transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Thumbnails */}
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                    {screenshots.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentScreenshot(idx)}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 transition-opacity ${
                          idx === currentScreenshot
                            ? "ring-2 ring-primary opacity-100"
                            : "opacity-40 hover:opacity-70"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.detailedDescription}
                </ReactMarkdown>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="page-enter page-enter-delay-2 glass rounded-2xl p-5 sm:p-6 sticky top-28 space-y-5 sm:space-y-6">
                <h3 className="font-bold text-base sm:text-lg">프로젝트 정보</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">버전</span>
                    <span className="text-sm font-medium">{project.version}</span>
                  </div>
                  <div className="border-t border-border" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted">최근 업데이트</span>
                    <span className="text-sm font-medium">{project.lastUpdate}</span>
                  </div>
                  <div className="border-t border-border" />

                  {project.rating > 0 && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted">평점</span>
                        <span className="text-sm font-medium flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          {project.rating}
                        </span>
                      </div>
                      <div className="border-t border-border" />
                    </>
                  )}

                  {project.downloadCount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted">다운로드</span>
                      <span className="text-sm font-medium">
                        {project.downloadCount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
                >
                  <ArrowLeft size={14} />
                  프로젝트 목록
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
