'use client';

import { useState, useRef } from 'react';

interface Project {
  title: string;
  client: string;
  date: string;
  format: string;
  coverHover?: string;
}

export default function ArchiveTable({ projects }: { projects: Project[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Large offset so cursor is in the upper left of the video
  const VIDEO_OFFSET_X = -30;
  const VIDEO_OFFSET_Y = -30;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#000000] text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="overflow-x-auto relative z-10 flex justify-center">
        <table className="w-full max-w-[1200px] border-collapse" style={{ mixBlendMode: "difference" }}>
          <thead>
            <tr>
              <th className="text-left py-4 px-4 font-semibold">Project</th>
              <th className="text-left py-4 px-4 font-semibold">Client</th>
              <th className="text-left py-4 px-4 font-semibold">Year</th>
              <th className="text-left py-4 px-4 font-semibold">Genre</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="group border-b border-gray-800 cursor-pointer"
              >
                <td
                  className="py-4 px-4 font-medium"
                  style={{ transition: 'color 0.2s' }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {project.title}
                </td>
                <td className="py-4 px-4">{project.client}</td>
                <td className="py-4 px-4">{project.date ? new Date(project.date).getFullYear() : '-'}</td>
                <td className="py-4 px-4">{project.format}</td>
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
            mixBlendMode: 'normal',
            opacity: 0.8,
            transition: 'left 0.1s, top 0.1s',
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