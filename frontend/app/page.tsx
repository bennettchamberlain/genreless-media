import { Suspense } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { AllPosts } from "@/app/components/Posts";
import GetStartedCode from "@/app/components/GetStartedCode";
import SideBySideIcons from "@/app/components/SideBySideIcons";
import Hero from "@/app/components/Hero";
import Manifesto from "@/app/components/manifesto";
import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import HomePosts from "./components/home_posts";
import ProjectsGridContainer from "./components/projects_grid_container";
import ClientSplashWrapper from "./components/ClientSplashWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default async function Page() {
  // const { data: settings } = await sanityFetch({
  //   query: settingsQuery,
  // });

  return (
    <>
    <Header />
    <ClientSplashWrapper>
      <Hero />
      {/* Manifesto /> */}
      <ProjectsGridContainer />
      {/* <HomePosts />  */}
    </ClientSplashWrapper>
    <Footer  />
    </>
  );
}
