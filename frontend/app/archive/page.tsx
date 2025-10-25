import { allProjectsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import ArchiveTable from './ArchiveTable';
import Footer from '../components/Footer';
import ArchiveHeader from './components/archiveHeader';

export default async function ArchivePage() {
  const projects = await client.fetch(allProjectsQuery);
  
  return (
    <>
      <ArchiveHeader />
      <div className="h-20 bg-[#0d0d0d]"></div>
      <div className="h-16 bg-[#0d0d0d]"></div>
      <ArchiveTable projects={projects} />
      <Footer backgroundColor="#0d0d0d" textColor="white" />
    </>
  );
}
