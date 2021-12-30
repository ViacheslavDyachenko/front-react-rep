import {ApiResponse, IApiStore, RequestParams, StatusHTTP} from "./types";

export class ApiStore implements IApiStore {
    readonly baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
        

    async request<SuccessT, ErrorT = any>(params: RequestParams): Promise<ApiResponse<SuccessT, ErrorT>> {
        
        let endpoint: string = `${this.baseUrl}${params.endpoint}`;
        let requestInit = {
            method: params.method,
            headers: params.headers
        }; 
        try {
            let response = await fetch(endpoint, requestInit);

            if(response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                    status: response.status
                }
            } else if(response.status === StatusHTTP.forbidden || StatusHTTP.notFound) {
                return {
                    success: false,
                    data: await response.json(),
                    status: response.status
                }
            }
            else {
                throw new Error('Unknown error')
            }
        } catch (e) {
            return {
                success: false,
                data: e,
                status: StatusHTTP.BAD_STATUS
            }
        }
    }
}