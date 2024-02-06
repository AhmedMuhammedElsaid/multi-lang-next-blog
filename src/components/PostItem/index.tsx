import classes from "./item.module.css";
import { FaEye } from "react-icons/fa";
import { IPropsPost } from "@/app/[lang]/types";
import NavigationBtn from "../NavigationBtn";

const PostItem = ({ title, body, id, lang, showView }: IPropsPost) => {
  return (
    <li key={id} className={classes.listItem} data-testid={`test-${id}`}>
      <h2 data-testid="post-title" className={classes.title}>
        {title?.[lang]}
      </h2>
      <p data-testid="post-body" className={classes.body}>
        {body?.[lang]}
      </p>
      {showView && (
        <div className={classes.icons} data-testid="icons-wrapper">
          <NavigationBtn icon={<FaEye size="1.5rem" />} url={`/post/${id}`} />
        </div>
      )}
    </li>
  );
};

export default PostItem;
