import { useEffect } from "react";

interface SEOProps {
  canonicalUrl: string;
  title?: string;
  description?: string;
  keywords?: string[];
}

export const SEO: React.FC<SEOProps> = ({
  canonicalUrl,
  title,
  description,
  keywords,
}) => {
  useEffect(() => {
    // Handle canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Handle title
    const originalTitle = document.title;
    if (title) {
      document.title = title;
    }

    // Handle meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDescription = metaDesc?.getAttribute("content") || "";
    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // Handle meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const originalKeywords = metaKeywords?.getAttribute("content") || "";
    if (keywords && keywords.length > 0) {
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords.join(", "));
    }

    // Cleanup function
    return () => {
      // Remove canonical if it matches our URL
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical?.getAttribute("href") === canonicalUrl) {
        existingCanonical.remove();
      }

      // Restore original title
      if (title && originalTitle) {
        document.title = originalTitle;
      }

      // Restore original meta description
      if (description && originalDescription) {
        const descElement = document.querySelector('meta[name="description"]');
        if (descElement) {
          descElement.setAttribute("content", originalDescription);
        }
      }

      // Restore original meta keywords
      if (keywords && originalKeywords) {
        const keywordsElement = document.querySelector('meta[name="keywords"]');
        if (keywordsElement) {
          keywordsElement.setAttribute("content", originalKeywords);
        }
      }
    };
  }, [canonicalUrl, title, description, keywords]);

  return null; // This component doesn't render anything
};
