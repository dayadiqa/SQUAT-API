export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface Support {
    url: string;
    text: string;
}

export interface MetaCTA {
    label: string;
    url: string;
}

export interface Meta {
    powered_by: string;
    docs_url: string;
    upgrade_url: string;
    example_url: string;
    variant: string;
    message: string;
    cta: MetaCTA;
    context: string;
}

export interface UsersResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: Support;
    _meta: Meta;
}

export interface UsersPaginationQuery {
    page: string;
}
