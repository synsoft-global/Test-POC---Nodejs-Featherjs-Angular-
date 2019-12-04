/*
 * Project: The Organized Mom Method
 * File: app.constants.ts
 *
 * Description:
 * ** IMP FILE ** this file contains the application configuration used globally
 */

// imports running environment
import { environment } from '../environments/environment';

// API base URL domain
export const BASE_URL = environment.Server; //It is used for api path


export const PAGE_No: number = 1; //Pagination Page No
export const Page_Size: number = 10; //Pagination Page limit



