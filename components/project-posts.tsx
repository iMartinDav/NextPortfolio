"use client";

import { useState, useEffect } from "react";
import { fetchProjects } from "@/lib/fetchers";
import ProjectShowcaseVertical from "@/components/project-showcase-vertical";
import { defaultDomains } from "@/lib/data";

// Define a type for the post data
interface Post {
  name: string;
  body: string;
  slug: string;
  image: string;
}

// Define a type for the data returned from fetchProjects
interface FetchProjectsResponse {
  postsData: {
    data: {
      title: string;
      description: string;
      image: string;
    };
    slug: string;
  }[];
}

const ProjectPosts: React.FC = () => {
  const [files, setFiles] = useState<Post[]>(defaultDomains);

  useEffect(() => {
    const getPosts = async () => {
      const postsData: FetchProjectsResponse | null = await fetchProjects();
      if (postsData && postsData.postsData) {
        const formattedPosts: Post[] = postsData.postsData.map((post) => ({
          name: post.data.title,
          body: post.data.description,
          slug: post.slug,
          image: post.data.image,
        }));
        setFiles(formattedPosts.slice(0, 10));
      }
    };

    getPosts();
  }, []);

  return <ProjectShowcaseVertical projects={files} />;
};

export default ProjectPosts;
