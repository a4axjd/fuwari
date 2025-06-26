import type { BlogPost } from '@/types/config'

// Mock data for demonstration - in a real app, this would fetch from an API or static files
const mockPosts: BlogPost[] = [
  {
    slug: 'markdown-example',
    title: 'Markdown Example',
    published: new Date('2023-10-01'),
    description: 'A simple example of a Markdown blog post.',
    tags: ['Markdown', 'Blogging', 'Demo'],
    category: 'Examples',
    image: '',
    draft: false,
    content: `# An h1 header

Paragraphs are separated by a blank line.

2nd paragraph. _Italic_, **bold**, and \`monospace\`. Itemized lists
look like:

- this one
- that one
- the other one`,
    excerpt: 'A simple example of a Markdown blog post with various formatting elements.',
    readingTime: {
      minutes: 3,
      words: 450
    }
  },
  {
    slug: 'guide',
    title: 'Simple Guides for Fuwari',
    published: new Date('2024-04-01'),
    description: 'How to use this blog template.',
    tags: ['Fuwari', 'Blogging', 'Customization'],
    category: 'Guides',
    image: '/assets/images/demo-banner.png',
    draft: false,
    content: `# Simple Guides for Fuwari

This blog template is built with modern web technologies.

## Front-matter of Posts

\`\`\`yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
\`\`\``,
    excerpt: 'Learn how to use this blog template effectively.',
    readingTime: {
      minutes: 5,
      words: 750
    }
  },
  {
    slug: 'markdown-extended',
    title: 'Markdown Extended Features',
    published: new Date('2024-05-01'),
    updated: new Date('2024-11-29'),
    description: 'Read more about Markdown features in Fuwari',
    tags: ['Demo', 'Example', 'Markdown', 'Fuwari'],
    category: 'Examples',
    image: '',
    draft: false,
    content: `# Markdown Extended Features

## Admonitions

Following types of admonitions are supported: \`note\` \`tip\` \`important\` \`warning\` \`caution\`

> **Note**
> Highlights information that users should take into account, even when skimming.

> **Tip**
> Optional information to help a user be more successful.`,
    excerpt: 'Explore advanced Markdown features and syntax.',
    readingTime: {
      minutes: 4,
      words: 600
    }
  }
]

export async function getPostsData(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockPosts
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const post = mockPosts.find(p => p.slug === slug && !p.draft)
  return post || null
}

export type Tag = {
  name: string
  count: number
}

export async function getTagList(): Promise<Tag[]> {
  const posts = await getPostsData()
  const countMap: { [key: string]: number } = {}
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      countMap[tag] = (countMap[tag] || 0) + 1
    })
  })

  return Object.keys(countMap)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(key => ({ name: key, count: countMap[key] }))
}

export type Category = {
  name: string
  count: number
}

export async function getCategoryList(): Promise<Category[]> {
  const posts = await getPostsData()
  const countMap: { [key: string]: number } = {}
  
  posts.forEach(post => {
    const category = post.category || 'Uncategorized'
    countMap[category] = (countMap[category] || 0) + 1
  })

  return Object.keys(countMap)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map(key => ({ name: key, count: countMap[key] }))
}