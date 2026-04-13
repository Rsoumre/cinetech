import { type TVSHOW } from "../models/tv.model.ts";
import { type APIResponse } from "../models/api-response.model.ts";

export interface TVService {
    getpopular(page?: number): Promise<APIResponse<TVSHOW>>;
    getDetails(id: number): Promise<TVSHOW>;
    getRecommendations(id: number): Promise<TVSHOW>
}