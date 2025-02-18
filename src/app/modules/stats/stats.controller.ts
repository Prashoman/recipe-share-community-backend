import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";

import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { StatsService } from "./stats.service";



const getAllStats = catchAsyn(async (req: Request, res: Response) => {
    
    const result = await StatsService.getAllStatsFormDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Stats fetched successfully",
        data: result,
    });
})

export const StatsController={
    getAllStats
}
