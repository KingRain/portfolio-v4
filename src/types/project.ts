export interface I_Experience {
    company_link: string,
    company_logo: string,
    company_name: string,
    duration: string,
    job_title: string,
}

export interface I_Education {
    institute_link: string,
    institute_logo: string,
    course_title: string,
    ending_date: string,
    institute_name: string,
}

export interface ApiResponse {
    success: boolean;
    message: string;
};