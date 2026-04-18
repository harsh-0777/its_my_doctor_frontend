import { useState } from "react";
import Header from "../../layouts/header/index.jsx";
import Footer from "../../layouts/footer/index.jsx";
import BlogBody from "./Body.jsx";
import { CATEGORIES, POSTS } from "./data.js";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = POSTS.find((p) => p.featured);
  const rest     = POSTS.filter((p) => !p.featured);
  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f7f3ee]">
      <Header />
      <BlogBody
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        featured={featured}
        filtered={filtered}
      />
      <Footer />
    </div>
  );
};

export default BlogPage;
