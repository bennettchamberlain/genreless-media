'use client';

import { useState, useRef } from 'react';
import { Image } from 'next-sanity/image';
import Link from 'next/link';

type Project = {
  _id: string;
  title: string;
  slug: string;
  isSelected: boolean | null;
  projectTypes: string[];
  coverThumb?: string | null;
  coverHover?: string | null;
};

type ProjectsGridProps = {
  initialProjects: Project[];
};

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [projects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('selected');
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleVideoHover = (projectId: string) => {
    const video = videoRefs.current[projectId];
    if (video) {
      video.currentTime = 0;
    }
  };

  const filteredProjects = selectedCategory === 'selected'
    ? projects.filter(project => project.isSelected === true)
    : projects.filter(project => project.projectTypes.includes(selectedCategory));

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#dadad6] min-h-screen">
      {/* Mobile Layout - Filters above grid */}
      <div className="md:hidden">
        {/* Filters Section */}
        <div className="max-w-[1800px] mx-auto pl-4 pt-4 pb-6">
          <ul className="flex flex-col space-y-1">
            <li>
              <button
                onClick={() => setSelectedCategory('selected')}
                className={`text-left pb-2 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'selected' ? 'underline' : 'hover:underline'}`}
              >
                Featured
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('musicVideo')}
                className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'musicVideo' ? 'underline' : 'hover:underline'}`}
              >
                Music Video
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('documentary')}
                className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'documentary' ? 'underline' : 'hover:underline'}`}
              >
                Documentary
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('photography')}
                className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'photography' ? 'underline' : 'hover:underline'}`}
              >
                Photography
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('commercial')}
                className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'commercial' ? 'underline' : 'hover:underline'}`}
              >
                Commercial
              </button>
            </li>
          </ul>
        </div>

        {/* Projects Grid Section */}
        <div className="max-w-[1800px] mx-auto pl-4 pr-4 pt-2">
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                href={`/project/${project.slug}`}
                className="group flex flex-col items-center bg-[#dadad6] overflow-hidden"
              >
                <div className="relative w-full aspect-video bg-neutral-900">
                  {project.coverThumb && (
                    <Image
                      src={project.coverThumb}
                      alt={project.title}
                      fill
                      className="object-cover w-full h-full opacity-0 transition-opacity duration-300"
                    />
                  )}
                  {project.coverHover && (
                    <video
                      ref={(el) => {
                        videoRefs.current[project._id] = el;
                      }}
                      src={project.coverHover}
                      className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onMouseEnter={() => handleVideoHover(project._id)}
                    />
                  )}
                </div>
                <div className="w-full py-2 bg-[#dadad6]">
                  <h3 className="text-black text-s font-[Helvetica] tracking-wide hover:text-[#fe2e2e]">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Sidebar with filters and main content */}
      <div className="hidden md:flex max-w-[1800px] mx-auto">
        {/* Sticky Filter Sidebar */}
        <div className="w-48 flex-shrink-0 pl-14 pt-10">
          <div className="sticky top-24">
            <ul className="flex flex-col space-y-1">
              <li>
                <button
                  onClick={() => setSelectedCategory('selected')}
                  className={`text-left pb-2 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'selected' ? 'underline' : 'hover:underline'}`}
                >
                  Featured
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('musicVideo')}
                  className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'musicVideo' ? 'underline' : 'hover:underline'}`}
                >
                  Music Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('documentary')}
                  className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'documentary' ? 'underline' : 'hover:underline'}`}
                >
                  Documentary
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('photography')}
                  className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'photography' ? 'underline' : 'hover:underline'}`}
                >
                  Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('commercial')}
                  className={`text-left py-0 text-s font-[Helvetica] hover:text-[#fe2e2e] ${selectedCategory === 'commercial' ? 'underline' : 'hover:underline'}`}
                >
                  Commercial
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content - Projects Grid */}
        <div className="flex-1 pl-8 pr-14 pt-10">
          <div className="grid grid-cols-2 gap-12">
            {filteredProjects.map((project) => (
              <Link
                key={project._id}
                href={`/project/${project.slug}`}
                className="group flex flex-col items-center bg-[#dadad6] overflow-hidden"
              >
                <div className="relative w-full aspect-video bg-neutral-900">
                  {project.coverThumb && (
                    <Image
                      src={project.coverThumb}
                      alt={project.title}
                      fill
                      className="object-cover w-full h-full group-hover:opacity-0 transition-opacity duration-300"
                    />
                  )}
                  {project.coverHover && (
                    <video
                      ref={(el) => {
                        videoRefs.current[project._id] = el;
                      }}
                      src={project.coverHover}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onMouseEnter={() => handleVideoHover(project._id)}
                    />
                  )}
                </div>
                <div className="w-full py-2 bg-[#dadad6]">
                  <h3 className="text-black text-s font-[Helvetica] tracking-wide hover:text-[#fe2e2e]">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
