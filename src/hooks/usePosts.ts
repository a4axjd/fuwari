import { useQuery } from '@tanstack/react-query'
import type { BlogPost } from '@/types/config'
import { getPostsData, getPostBySlug } from '@/utils/content-utils'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPostsData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function usePostsByTag(tag: string) {
  const { data: posts } = usePosts()
  
  return {
    data: posts?.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    ) || [],
    isLoading: false,
  }
}

export function usePostsByCategory(category: string) {
  const { data: posts } = usePosts()
  
  return {
    data: posts?.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    ) || [],
    isLoading: false,
  }
}