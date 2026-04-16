export interface IResponse<T> {
    succeeded: boolean;
    message?: string;
    data: T;
}