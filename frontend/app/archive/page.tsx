import { allProjectsQuery, allLogosQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import ArchiveTable from './ArchiveTable';
import Footer from '../components/Footer';
import ArchiveHeader from './components/archiveHeader';
import LogoMarquee from '../components/LogoMarquee';

export default async function ArchivePage() {
  const projects = await client.fetch(allProjectsQuery);
  const logos = await client.fetch(allLogosQuery);
  
  return (
    <>
      <ArchiveHeader />
      <div className="h-20 bg-[#0d0d0d]"></div>
      <div className="h-16 bg-[#0d0d0d]"></div>
      <ArchiveTable projects={projects} />
      <LogoMarquee logos={logos || []} />
      <div className="border-t-1 border-[#575757]"></div>
      <Footer backgroundColor="#0d0d0d" textColor="white" />
    </>
  );
}
