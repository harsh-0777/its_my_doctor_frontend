// ─── Sub-components ───────────────────────────────────────────────────────────
const FeaturedCard = ({ category, title, excerpt, author, authorRole, date, readTime, initials, color }) => (
  <article className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden md:flex">
    <div className="md:w-2/5 bg-gradient-to-br from-emerald-50 to-blue-100 flex items-center justify-center min-h-48 md:min-h-auto">
      <span className="text-5xl font-bold text-emerald-200">✦</span>
    </div>
    <div className="p-8 md:w-3/5">
      <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-700">
        {category}
      </span>
      <h3 className="mt-3 text-xl font-bold text-gray-900 leading-snug">{title}</h3>
      <p className="mt-3 text-sm text-gray-500 leading-relaxed">{excerpt}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${color}`}>
          {initials}
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800">{author}</p>
          <p className="text-xs text-gray-400">{authorRole} · {date} · {readTime} read</p>
        </div>
      </div>
    </div>
  </article>
);

const BlogCard = ({ category, title, excerpt, author, authorRole, date, readTime, initials, color }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
      {category}
    </span>
    <h3 className="mt-3 font-semibold text-gray-900 leading-snug">{title}</h3>
    <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">{excerpt}</p>
    <div className="mt-5 flex items-center gap-2.5">
      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${color}`}>
        {initials}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-700">{author}</p>
        <p className="text-xs text-gray-400">{date} · {readTime} read</p>
      </div>
    </div>
  </article>
);

// ─── Body ─────────────────────────────────────────────────────────────────────
const BlogBody = ({ categories, activeCategory, onCategoryChange, featured, filtered }) => (
  <main>
    {/* ── Hero ─────────────────────────────────────────────────── */}
    <section className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 py-20 px-4 text-center">
      <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
        ItsMyDoc Blog
      </span>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Health insights &amp; product stories
      </h1>
      <p className="mt-4 mx-auto max-w-xl text-lg text-gray-600">
        Written by doctors, engineers, and patients. Evidence-based,
        jargon-free, and always practical.
      </p>
    </section>

    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* ── Featured ─────────────────────────────────────────────── */}
      {featured && (
        <div className="mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Featured
          </p>
          <FeaturedCard {...featured} />
        </div>
      )}

      {/* ── Category filter ──────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeCategory === c
                ? "bg-emerald-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-600",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => <BlogCard key={post.id} {...post} />)}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">
          No posts in this category yet — check back soon!
        </p>
      )}
    </div>

    {/* ── Newsletter CTA ───────────────────────────────────────── */}
    <section className="bg-white py-16 px-4">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold text-gray-900">Stay in the know</h2>
        <p className="mt-2 text-gray-500">
          Get our best health articles and product updates, once a week.
        </p>
        <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </main>
);

export default BlogBody;
