import { sanityFetch } from '@/sanity/lib/live';
import { allProjectsQuery } from '@/sanity/lib/queries';
import ProjectsGrid from './projects_grid';

export default async function ProjectsGridContainer() {
  const { data: projects } = await sanityFetch({
    query: allProjectsQuery,
  });

  if (!projects || projects.length === 0) {
    return null;
  }

  return <ProjectsGrid initialProjects={projects} />;
} 