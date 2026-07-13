import Link from 'next/link'

type Post = {
  id: string
  title: string
  status: string
  author_name: string | null
  created_at: string
}

type Props = {
  posts: Post[]
}

export default function RecentPosts({
  posts,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold">
            Recent Articles
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest blog posts
          </p>

        </div>

        <Link
          href="/admin/blog"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>

      </div>

      {posts.length === 0 ? (

        <div className="rounded-xl border py-12 text-center text-muted-foreground">
          No articles found.
        </div>

      ) : (

        <div className="space-y-4">

          {posts.map((post) => (

            <Link
              key={post.id}
              href={`/admin/blog/edit/${post.id}`}
              className="block rounded-xl border p-4 transition hover:bg-muted"
            >

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  {post.title}
                </h3>

                <span
                  className={`
                    rounded-full
                    px-2
                    py-1
                    text-xs
                    capitalize
                    ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : post.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {post.status}
                </span>

              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                {post.author_name ?? 'Unknown Author'}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString()}
              </p>

            </Link>

          ))}

        </div>

      )}

    </div>
  )
}