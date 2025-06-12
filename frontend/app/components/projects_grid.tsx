'use client';

import { useState } from 'react';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/utils';

type Project = {
  _id: string;
  title: string;
  slug: string;
  isSelected: boolean;
  projectTypes: string[];
  coverThumb: {
    asset: {
      _ref: string;
    };
  };
  coverHover: {
    asset: {
      _ref: string;
    };
  };
};

type ProjectsGridProps = {
  initialProjects: Project[];
};

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [projects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('selected');

  const filteredProjects = selectedCategory === 'selected'
    ? projects.filter(project => project.isSelected)
    : projects.filter(project => project.projectTypes.includes(selectedCategory));

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#e5e7e6] min-h-screen">
      {/* Filters Section */}
      <div className="max-w-[1300px] mx-auto pl-12 pt-20">
        
          <ul className="flex flex-col space-y-1">
            <li>
              <button
                onClick={() => setSelectedCategory('selected')}
                className={`text-left py-1 text-xs ${selectedCategory === 'selected' ? 'underline' : 'hover:underline'}`}
              >
                selected
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('musicVideo')}
                className={`text-left py-1 text-xs ${selectedCategory === 'musicVideo' ? 'underline' : 'hover:underline'}`}
              >
                music video
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('documentary')}
                className={`text-left py-1 text-xs ${selectedCategory === 'documentary' ? 'underline' : 'hover:underline'}`}
              >
                documentary
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('photography')}
                className={`text-left py-1 text-xs ${selectedCategory === 'photography' ? 'underline' : 'hover:underline'}`}
              >
                photography
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('commercial')}
                className={`text-left py-1 text-xs ${selectedCategory === 'commercial' ? 'underline' : 'hover:underline'}`}
              >
                commercial
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('genreless')}
                className={`text-left py-1 text-xs ${selectedCategory === 'genreless' ? 'underline' : 'hover:underline'}`}
              >
                genreless
              </button>
            </li>
          </ul>
       
      </div>

      {/* Projects Grid Section */}
      <div className="max-w-[1200px] mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/project/${project.slug}`}
              className="group flex flex-col items-center bg-[#e5e7e6] overflow-hidden"
            >
              <div className="relative w-full aspect-video bg-neutral-900">
                {project.coverThumb && (
                  <Image
                    src={project.coverThumb.toString()}
                    alt={project.title}
                    fill
                    className="object-cover w-full h-full group-hover:opacity-0 transition-opacity duration-300"
                  />
                )}
                {project.coverHover && (
                  <video
                    src={project.coverHover.toString()}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
              <div className="w-full px-4 py-3 bg-[#e5e7e6]">
                <h3 className="text-black text-xs font-mono tracking-wide">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
