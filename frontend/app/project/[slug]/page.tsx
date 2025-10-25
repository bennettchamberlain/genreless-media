import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { projectQuery, allProjectSlugsQuery } from '@/sanity/lib/queries'
import ProjectPageContent from './ProjectPageContent'
import ArchiveHeader from '@/app/archive/components/archiveHeader'

interface Project {
  _id: string
  title: string
  description: string | null
  slug: string
  client?: string | null
  format?: string | null
  projectTypes?: string[]
  isSelected: boolean | null
  coverThumb?: string | null
  coverHover?: string | null
  mainGalleryMedia: {
    type: 'image' | 'videoUpload' | 'vimeo' | 'youtube'
    image?: string | null
    videoFile?: string | null
    vimeoUrl?: string | null
    youtubeUrl?: string | null
  }
  content: Array<{
    aspectRatio: string
    items: Array<{
      type: 'text' | 'image' | 'videoUpload' | 'vimeo' | 'youtube'
      text?: string | null
      image?: string | null
      videoFile?: string | null
      vimeoUrl?: string | null
      youtubeUrl?: string | null
    }>
  }>
  date: string
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(projectQuery, { slug })
}

async function getAllProjectSlugs(): Promise<string[]> {
  const slugs = await client.fetch(allProjectSlugsQuery)
  return slugs.map((item: { slug: string }) => item.slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }
  return {
    title: project.title,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, allSlugs] = await Promise.all([
    getProject(slug),
    getAllProjectSlugs()
  ])
  
  if (!project) notFound()

  const currentIndex = allSlugs.indexOf(slug)
  const prevSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null
  const nextSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null

  return (
    <>
      <ArchiveHeader />
      <ProjectPageContent 
        project={project} 
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </>
  )
}
