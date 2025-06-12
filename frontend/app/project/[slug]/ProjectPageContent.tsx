"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Project {
  _id: string
  title: string
  slug: string
  client?: string
  format?: string
  projectTypes?: string[]
  isSelected: boolean
  description: string
  coverThumb?: string
  coverHover?: string
  content: Array<{
    type: 'image' | 'video'
    image?: string
    videoUrl?: string
  }>
  date: string
}

const ProjectPageContent = (props: { project: Project }) => {
  function PlayButton() {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/60 rounded-full p-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.7" />
            <polygon points="20,16 34,24 20,32" fill="#111" />
          </svg>
        </div>
      </div>
    )
  }

  const { project } = props
  const [current, setCurrent] = useState(0)
  const currentItem = project.content[current]

  const handlePrev = () => setCurrent((prev: number) => (prev - 1 + project.content.length) % project.content.length)
  const handleNext = () => setCurrent((prev: number) => (prev + 1) % project.content.length)

  // Show up to 3 content items after the first (main) one
  const gridItems = project.content.slice(1, 4)

  return (
    <main className="bg-black text-white flex flex-col items-center pb-20">
      {/* Close Button Column */}
      <div className="w-full max-w-[1300px] mt-8">
        <Link 
          href="/"
          className="text-xstext-white underline hover:text-[#575757] transition-colors"
        >
          close
        </Link>
      </div>

      {/* Gallery Column */}
      <div className="w-full max-w-[1300px]">
        <div className="relative w-full h-[45vw] max-h-[60vh] bg-black flex items-center justify-center">
          {currentItem.type === 'image' && currentItem.image && (
            <Image
              src={currentItem.image}
              alt="Project media"
              fill
              className="object-contain rounded-md"
              priority
            />
          )}
          {currentItem.type === 'video' && currentItem.videoUrl && (
            <div className="w-full h-full flex items-center justify-center relative">
              <iframe
                src={`${currentItem.videoUrl}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=0&controls=1`}
                className="object-cover w-full h-full rounded-md"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Title and Navigation Column */}
      <div className="w-full max-w-[1100px] mt-8">
      <div className="w-full flex justify-end gap-4">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className={`text-white underline transition-colors ${
              current === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:text-[#e5e7e6]'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={current === project.content.length - 1}
            className={`text-white underline transition-colors ${
              current === project.content.length - 1 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:text-[#e5e7e6]'
            }`}
          >
            Next
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        
      </div>

      {/* Description and Grid Column */}
      <div className="w-full max-w-[1000px] mt-10">
        <div className="grid grid-cols-2 gap-6">
          {/* Description */}
          <div className="bg-black/80 text-white pl-6 pr-6 rounded-md row-span-1 col-span-1">
            <p className="text-base leading-relaxed">{project.description}</p>
          </div>
          {/* Content Thumbnails */}
          {project.content.map((item, idx) => (
            <button
              key={idx}
              className={`relative aspect-[4/3] bg-black/40 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-white ${current === idx ? 'ring-2 ring-white' : ''}`}
              onClick={() => setCurrent(idx)}
            >
              {item.type === 'image' && item.image && (
                <Image
                  src={item.image}
                  alt={`Project grid ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
              {item.type === 'video' && item.videoUrl && (
                <div className="w-full h-full relative">
                  <iframe
                    src={`${item.videoUrl}?background=1&loop=1&byline=0&title=0&muted=1&controls=0&autoplay=0`}
                    className="object-cover w-full h-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{ border: 'none' }}
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors cursor-pointer" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ProjectPageContent 