import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { projectQuery } from '@/sanity/lib/queries'
import ProjectPageContent from './ProjectPageContent'

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

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  return client.fetch(projectQuery, { slug })
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
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  return <ProjectPageContent project={project} />
}
