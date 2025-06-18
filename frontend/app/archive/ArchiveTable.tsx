'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  title: string;
  client: string;
  date: string;
  format: string;
  coverHover?: string;
  slug: string;
}

export default function ArchiveTable({ projects }: { projects: Project[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleRowClick = (slug: string) => {
    router.push(`/project/${slug}`);
  };

  // Large offset so cursor is in the upper left of the video
  const VIDEO_OFFSET_X = -30;
  const VIDEO_OFFSET_Y = -30;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#0d0d0d] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="overflow-x-auto relative z-10 flex justify-center">
        <table className="w-full max-w-[1500px] border-collapse" >
          <thead>
            <tr>
              <th className="text-left py-10 px-4 font-[Helvetica] font-bold" style={{ color: '#ffffff' }}>Project</th>
              <th className="text-left py-10 px-4 font-[Helvetica] font-bold" style={{ color: '#ffffff' }}>Client</th>
              <th className="text-left py-10 px-4 font-[Helvetica] font-bold" style={{ color: '#ffffff' }}>Year</th>
              <th className="text-left py-10 px-4 font-[Helvetica] font-bold" style={{ color: '#ffffff' }}>Genre</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="group border-b border-gray-800 cursor-pointer transition-colors" 
                style={{ transition: 'color 0.0s' }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleRowClick(project.slug)}
              >
                <td className="py-2 px-4 font-[Helvetica]" style={{ color: '#ffffff' }}>
                  {project.title}
                </td>
                <td className="py-2 px-4 font-[Helvetica]" style={{ color: '#ffffff' }}>{project.client}</td>
                <td className="py-2 px-4 font-[Helvetica]" style={{ color: '#ffffff' }}>{project.date ? new Date(project.date).getFullYear() : '-'}</td>
                <td className="py-2 px-4 font-[Helvetica]" style={{ color: '#ffffff' }}>{project.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hover Video */}
      {hoveredIdx !== null && projects[hoveredIdx]?.coverHover && (
        <video
          src={projects[hoveredIdx].coverHover}
          className="pointer-events-none fixed z-20"
          style={{
            left: mousePos.x + VIDEO_OFFSET_X,
            top: mousePos.y + VIDEO_OFFSET_Y,
            width: 640,
            height: 360,
            objectFit: 'cover',
            mixBlendMode: 'difference',
            opacity: 0.8,
          }}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    </div>
  );
} 