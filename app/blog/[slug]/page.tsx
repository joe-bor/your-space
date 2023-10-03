export const revalidate = 500

interface Post {
    title: string,
    slug: string,
    content: string
}

interface Props {
    params: { slug: string }
}

// ISR - incremental static regeneration
// useful for updating dynamic data that does not change very often, ie. `blog posts`
// we use revalidate (top of the page) to rebuild the page if ever these data changes
export async function generateStaticParams() {
  const posts: Post[] = await fetch(`http://localhost:3000/api/content`).then( res => res.json())

  // returns the params we need to render in advance
  // { slug: post.slug }

  return posts.map( (post) => ({
    slug: post.slug
  }))
}

/*
- client requests for this page `url/blog/${dynamic-route}`
- generateStaticParams() is called, returns an array of objects
- returned value is used to create pre-rendered pages, cached in the server for quicker retrievals
- then every time client requests for this page, Next first checks if it is available in the cache
   
    - if it is, it serves the pre-rendered page (while valid)
      - invalidated after `export const revalidate = 500`
    
    - if not valid,  fetch is used to get desired data
*/

async function BlogPostPage( { params } : Props) {

    const posts: Post[] = await fetch(`http://localhost:3000/api/content`).then( res => res.json())

    const post = posts.find( (post) => post.slug === params.slug)!
  return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
    </div>
  )
}
export default BlogPostPage