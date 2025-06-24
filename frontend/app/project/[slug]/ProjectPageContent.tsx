"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Project {
  _id: string
  title: string
  description: string
  slug: string
  client?: string
  format?: string
  projectTypes?: string[]
  isSelected: boolean
  coverThumb?: string
  coverHover?: string
  mainGalleryMedia: {
    type: 'image' | 'videoUpload' | 'vimeo' | 'youtube'
    image?: string
    videoFile?: string
    vimeoUrl?: string
    youtubeUrl?: string
  }
  content: Array<{
    type: 'text' | 'image' | 'videoUpload' | 'vimeo' | 'youtube'
    text?: string
    image?: string
    videoFile?: string
    vimeoUrl?: string
    youtubeUrl?: string
  }>
  date: string
}

interface Props {
  project: Project
  prevSlug: string | null
  nextSlug: string | null
}

const getYouTubeEmbedUrl = (url: string) => {
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  const videoId = match && match[2].length === 11 ? match[2] : null
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

const ProjectPageContent = ({ project, prevSlug, nextSlug }: Props) => {
  const router = useRouter()

  const handlePrev = () => {
    if (prevSlug) {
      router.push(`/project/${prevSlug}`)
    }
  }

  const handleNext = () => {
    if (nextSlug) {
      router.push(`/project/${nextSlug}`)
    }
  }

  return (
    <main className="bg-[#0d0d0d] text-white flex flex-col items-center pb-20 pt-20 font-['Helvetica']">
      {/* Main Gallery Media */}
      {project.mainGalleryMedia && (
        <div className="w-full max-w-[1400px]">
          <div className="relative w-full aspect-video">
            {project.mainGalleryMedia.type === 'image' && project.mainGalleryMedia.image && (
              <Image
                src={project.mainGalleryMedia.image}
                alt="Main gallery media"
                fill
                className="object-cover"
                priority
              />
            )}
            {project.mainGalleryMedia.type === 'videoUpload' && project.mainGalleryMedia.videoFile && (
              <video
                src={project.mainGalleryMedia.videoFile}
                className="w-full h-full object-cover"
                autoPlay
                muted={false}
                playsInline
                controls
              />
            )}
            {project.mainGalleryMedia.type === 'vimeo' && project.mainGalleryMedia.vimeoUrl && (
              <iframe
                src={`${project.mainGalleryMedia.vimeoUrl}?autoplay=1&muted=0&controls=1&showinfo=0&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ border: 'none' }}
              />
            )}
            {project.mainGalleryMedia.type === 'youtube' && project.mainGalleryMedia.youtubeUrl && (
              <iframe
                src={`${getYouTubeEmbedUrl(project.mainGalleryMedia.youtubeUrl)}?autoplay=1&muted=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=1&disablekb=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ border: 'none' }}
              />
            )}
          </div>
        </div>
      )}

      {/* Title and Navigation Column */}
      <div className="w-full max-w-[1300px] mt-8 mr-4 sm:mr-4 md:mr-4 lg:mr-4 xl:mr-0">
        <div className="w-full flex justify-end gap-4">
          
          
          <button
            onClick={handleNext}
            disabled={!nextSlug}
            className={`text-white underline transition-colors ${
              !nextSlug 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:text-[#e5e7e6]'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handlePrev}
            disabled={!prevSlug}
            className={`text-white underline transition-colors ${
              !prevSlug 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:text-[#e5e7e6]'
            }`}
          >
            Next
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mt-10 ml-4 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-0 font-['Helvetica']">{project.title}</h1>
        <p className="text-s mt-2 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-0 font-['Helvetica']">{project.description}</p>
      </div>

      {/* Grid Column */}
      <div className="w-full max-w-[1300px] mt-10 px-4 sm:px-4 md:px-4 lg:px-4 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {project.content.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] bg-black/40 overflow-hidden"
            >
              {item.type === 'image' && item.image && (
                <Image
                  src={item.image}
                  alt={`Project content ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
              {item.type === 'videoUpload' && item.videoFile && (
                <video
                  src={item.videoFile}
                  className="object-cover w-full h-full"
                  muted
                  playsInline
                  controls
                />
              )}
              {item.type === 'vimeo' && item.vimeoUrl && (
                <iframe
                  src={`${item.vimeoUrl}?loop=1&byline=0&title=0&muted=0&controls=1&autoplay=0&dnt=1&transparent=0&app_id=122963`}
                  className="object-cover w-full h-full"
                  allow="fullscreen"
                  allowFullScreen
                  style={{ border: 'none', width: '100%', height: '100%', aspectRatio: '4/3' }}
                />
              )}
              {item.type === 'youtube' && item.youtubeUrl && (
                <iframe
                  src={`${getYouTubeEmbedUrl(item.youtubeUrl)}?autoplay=0&controls=1&showinfo=1&rel=0&modestbranding=1&iv_load_policy=3&fs=1&disablekb=1`}
                  className="object-cover w-full h-full"
                  allow="fullscreen"
                  allowFullScreen
                  style={{ border: 'none', width: '100%', height: '100%' }}
                />
              )}
              {item.type === 'text' && item.text && (
                <div className="w-full h-full p-4 flex items-start justify-start">
                  <p className="text-sm text-left">{item.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ProjectPageContent 