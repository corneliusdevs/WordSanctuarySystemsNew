"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartementKpiIdValidator = exports.DepartmentKpiMetaData = void 0;
const z = __importStar(require("zod"));
exports.DepartmentKpiMetaData = z.object({
    department_id: z.string(),
    time_range_in_weeks: z.number().min(1, {
        message: "time_range_in_weeks cannot be less than 1 week"
    }),
    finance_details: z.object({
        cummulative_cash_flow: z.number(),
        cash_flow_duration_in_wks: z.number()
    }),
    operational_details: z.object({
        operational_punctuality_grade: z.number().min(-1, {
            message: "operational_punctuality_grade cannot be lower than -1"
        }).max(5, {
            message: "operational_punctuality_grade cannot be more than 5"
        }),
        operational_excellence_grade: z.number().min(-1, {
            message: "operational_excellence_grade cannot be lower than -1"
        }).max(5, {
            message: "operational_excellence_grade cannot be more than 5"
        }),
        operational_time_grade: z.number().min(-1, {
            message: "operational_time_grade cannot be lower than -1"
        }).max(5, {
            message: "operational_time_grade cannot be more than 5"
        }),
        operational_human_resource_grade: z.number().min(-1, {
            message: "operational_human_resource_grade cannot be lower than -1"
        }).max(5, {
            message: "operational_human_resource_grade cannot be more than 5"
        }),
        operational_finance_grade: z.number().min(-1, {
            message: "operational_finance_grade cannot be lower than -1"
        }).max(5, {
            message: "operational_finance_grade cannot be more than 5"
        }),
        attitude_score: z.number().min(-1, {
            message: "attitude_score cannot be lower than -1"
        }).max(5, {
            message: "attitude_score cannot be more than 5"
        })
    }),
    people_details: z.object({
        did_meeting_hold: z.boolean(),
        attendance_in_the_week: z.number(),
        number_that_took_life_class_in_week: z.number(),
    }),
});
exports.DepartementKpiIdValidator = z.object({
    department_id: z.string().min(7, {
        message: "invalid department_id",
    }),
});
