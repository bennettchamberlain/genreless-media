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
      <div className="h-20 bg-[#000000]"></div>
      <ArchiveTable projects={projects} />
      <div className="border-t-1 border-[#575757]"></div>
      <Footer backgroundColor="#000000" textColor="white" />
    </>
  );
}
