"use client";
import useTranslation from "next-translate/useTranslation";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import styles from "./styles.module.css";

export const LangSwitcher = () => {
  const { lang } = useParams();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();
  const isAarabic = lang === "ar";

  const handleNavigate = (lang: string) =>
    router.push(
      pathname.replace(
        `/${isAarabic ? "ar" : "en"}`,
        `/${lang}?${params.toString()}`
      )
    );

  return (
    <div className={styles.langSwitcherWrapper}>
      <button
        className={styles.langSwitcher}
        onClick={() => router.push(`/${lang}?${params.toString()}`)}
      >
        {t("home")}
      </button>
      <button
        className={styles.langSwitcher}
        onClick={() => handleNavigate(isAarabic ? "en" : "ar")}
      >
        {t(isAarabic ? "en" : "ar")}
      </button>
    </div>
  );
};
