"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_NODE_ENV = exports.get_root_user_email = exports.get_Data_Layer_POSTGRESS_Api_Endpoint = exports.get_Data_Layer_Base_Api_Endpoint = void 0;
const get_Data_Layer_Base_Api_Endpoint = () => {
    return process.env.DATA_LAYER_SYSTEMS_BASE_API;
};
exports.get_Data_Layer_Base_Api_Endpoint = get_Data_Layer_Base_Api_Endpoint;
const get_Data_Layer_POSTGRESS_Api_Endpoint = () => {
    return process.env.DATA_LAYER_POSTGRESS_ENDPOINT;
};
exports.get_Data_Layer_POSTGRESS_Api_Endpoint = get_Data_Layer_POSTGRESS_Api_Endpoint;
const get_root_user_email = () => {
    return process.env.ROOT_USER_EMAIL;
};
exports.get_root_user_email = get_root_user_email;
const get_NODE_ENV = () => {
    return process.env.NODE_ENV;
};
exports.get_NODE_ENV = get_NODE_ENV;
