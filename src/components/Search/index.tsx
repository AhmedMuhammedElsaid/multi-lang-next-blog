"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./index.module.css";
import useTranslation from "next-translate/useTranslation";
import { useQueryState } from "nuqs";
import { useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { t } = useTranslation("common");
  const params = new URLSearchParams(searchParams.toString()); // Convert searchParams to string
  const [searchTerm, setSearchTerm] = useState(() =>
    searchParams.get("query")?.toString()
  );
  /**
   we handle the search query by this to avoid the losing of the search term input focus
   and also the value when the user navigate to another page and then back to the search page
   */
  const handleUpdateQuery = useDebouncedCallback(() => {
    params.set("page", "1");

    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }

    handleUpdatePathnameWithParams();
  }, 300);

  const handleUpdatePathnameWithParams = () =>
    replace(`${pathname}?${params.toString()}`);

  const handleFilterByCategories = (category: string) => {
    if (params.get("category") === category) {
      params.delete("category");
      handleUpdatePathnameWithParams();
      return;
    }
    params.set("category", category);
    handleUpdatePathnameWithParams();
  };

  const categoriesMap = ["tag1", "tag2"];
  const isSectionHidden = pathname.includes("post");
  const handleUpdatePath = useDebouncedCallback(() => handleUpdateQuery(), 300);
  if (isSectionHidden) return <></>;

  const activeClass = searchParams.get("category")?.toString();

  return (
    <div className={styles.searchTagsWrapper}>
      <label htmlFor="search" className={styles.label}>
        {t("search")}
      </label>
      <input
        name="search"
        className={styles.inputField}
        placeholder={t(placeholder)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleUpdatePath();
        }}
        value={searchTerm}
      />
      <div className={styles.tags}>
        <label htmlFor="search" className={styles.label}>
          {t("filter-tag")}
        </label>
        {categoriesMap?.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterByCategories(category)}
            className={`${styles.tagItem} ${
              activeClass === category ? styles.active : ""
            }`}
          >
            {t(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
