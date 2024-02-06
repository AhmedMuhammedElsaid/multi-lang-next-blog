"use client";
import { IPropsPagination } from "@/app/[lang]/types";
import styles from "./index.module.css";
import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination: FC<IPropsPagination> = ({ postsPerPage, totalPosts }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPaginationClick = (number: number) => {
    params.set("page", number.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  const isActiveBtn = searchParams.get("page")?.toString();
  return (
    <nav className={styles.paginationWrapper}>
      <ul className={styles.paginationWrapper}>
        {pageNumbers.map((number) => (
          <li className="mr-6" key={number}>
            <button
              className={`${styles.btn} ${
                isActiveBtn === number.toString() ? styles.active : ""
              }`}
              onClick={() => onPaginationClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
