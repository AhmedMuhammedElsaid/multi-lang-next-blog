export interface IPost {
    id: number;
    userId: number;
    title: {
        en: string;
        ar: string;
    };
    body: {
        en: string;
        ar: string;
    };
}
export interface IPostsList {
    posts: IPost[];
}
export interface IProps {
    params: {
        id: string;
    };
}

export enum Languages {
    AR = "ar",
    EN = "en",
}
export interface IParams {
    params: { lang: Languages };
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
    };
}

export interface IPropsList {
    lang: Languages;
    posts: IPost[];
}
export interface IPropsPost extends IPost {
    lang: Languages;
    showView?: boolean;
}

export interface IPropsPagination {
    postsPerPage: number;
    totalPosts: number;
}
