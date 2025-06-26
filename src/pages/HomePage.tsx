import React from 'react'
import { useParams } from 'react-router-dom'
import { usePosts } from '@/hooks/usePosts'
import MainGridLayout from '@/layouts/MainGridLayout'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/control/Pagination'
import { PAGE_SIZE } from '@/constants/constants'

const HomePage: React.FC = () => {
  const { page: pageParam } = useParams()
  const currentPage = pageParam ? parseInt(pageParam) : 1
  const { data: posts, isLoading } = usePosts()

  if (isLoading) {
    return (
      <MainGridLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </MainGridLayout>
    )
  }

  if (!posts) {
    return (
      <MainGridLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">No posts found</div>
        </div>
      </MainGridLayout>
    )
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE
  const endIndex = startIndex + PAGE_SIZE
  const paginatedPosts = posts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(posts.length / PAGE_SIZE)

  const paginationData = {
    currentPage,
    lastPage: totalPages,
    data: paginatedPosts,
    url: {
      prev: currentPage > 1 ? (currentPage === 2 ? '/' : `/${currentPage - 1}`) : null,
      next: currentPage < totalPages ? `/${currentPage + 1}` : null,
    }
  }

  return (
    <MainGridLayout>
      <div className="transition flex flex-col rounded-[var(--radius-large)] bg-[var(--card-bg)] py-1 md:py-0 md:bg-transparent md:gap-4 mb-4">
        {paginatedPosts.map((post, index) => (
          <PostCard
            key={post.slug}
            post={post}
            className="onload-animation"
            style={{ animationDelay: `calc(var(--content-delay) + ${index * 50}ms)` }}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          page={paginationData}
          className="mx-auto onload-animation"
          style={{ animationDelay: `calc(var(--content-delay) + ${paginatedPosts.length * 50}ms)` }}
        />
      )}
    </MainGridLayout>
  )
}

export default HomePage