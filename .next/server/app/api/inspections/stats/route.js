/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/inspections/stats/route";
exports.ids = ["app/api/inspections/stats/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Finspections%2Fstats%2Froute&page=%2Fapi%2Finspections%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finspections%2Fstats%2Froute.ts&appDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Finspections%2Fstats%2Froute&page=%2Fapi%2Finspections%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finspections%2Fstats%2Froute.ts&appDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_capmission_Documents_carcheck_src_app_api_inspections_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/inspections/stats/route.ts */ \"(rsc)/./src/app/api/inspections/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/inspections/stats/route\",\n        pathname: \"/api/inspections/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/inspections/stats/route\"\n    },\n    resolvedPagePath: \"/Users/capmission/Documents/carcheck/src/app/api/inspections/stats/route.ts\",\n    nextConfigOutput,\n    userland: _Users_capmission_Documents_carcheck_src_app_api_inspections_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZpbnNwZWN0aW9ucyUyRnN0YXRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZpbnNwZWN0aW9ucyUyRnN0YXRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGaW5zcGVjdGlvbnMlMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmNhcG1pc3Npb24lMkZEb2N1bWVudHMlMkZjYXJjaGVjayUyRnNyYyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZjYXBtaXNzaW9uJTJGRG9jdW1lbnRzJTJGY2FyY2hlY2smaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJCO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvY2FwbWlzc2lvbi9Eb2N1bWVudHMvY2FyY2hlY2svc3JjL2FwcC9hcGkvaW5zcGVjdGlvbnMvc3RhdHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2luc3BlY3Rpb25zL3N0YXRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvaW5zcGVjdGlvbnMvc3RhdHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2luc3BlY3Rpb25zL3N0YXRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2NhcG1pc3Npb24vRG9jdW1lbnRzL2NhcmNoZWNrL3NyYy9hcHAvYXBpL2luc3BlY3Rpb25zL3N0YXRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Finspections%2Fstats%2Froute&page=%2Fapi%2Finspections%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finspections%2Fstats%2Froute.ts&appDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/inspections/stats/route.ts":
/*!************************************************!*\
  !*** ./src/app/api/inspections/stats/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n// app/api/inspections/stats/route.ts\n\n\nasync function GET() {\n    try {\n        const today = new Date();\n        today.setHours(0, 0, 0, 0);\n        // Get uninspected vehicles\n        const totalVehicles = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vehicle.count();\n        const inspectedToday = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.inspection.count({\n            where: {\n                date: {\n                    gte: today\n                }\n            }\n        });\n        // Get critical cases\n        const criticalCases = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vehicle.count({\n            where: {\n                parts: {\n                    some: {\n                        severity: 'critical'\n                    }\n                }\n            }\n        });\n        // Get historical data (last 7 days)\n        const sevenDaysAgo = new Date(today);\n        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);\n        const history = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.$queryRaw`\n      SELECT \n        DATE(date) as date,\n        COUNT(*) as inspected,\n        SUM(CASE WHEN status = 'critical' THEN 1 ELSE 0 END) as critical,\n        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending\n      FROM inspections\n      WHERE date >= ${sevenDaysAgo}\n      GROUP BY DATE(date)\n      ORDER BY date ASC\n    `;\n        const serializedHistory = history.map((item)=>({\n                ...item,\n                inspected: String(item.inspected)\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            uninspected: String(totalVehicles - inspectedToday),\n            critical: String(criticalCases),\n            history: serializedHistory\n        });\n    } catch (error) {\n        console.error('Error fetching inspection stats:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to fetch inspection stats'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9pbnNwZWN0aW9ucy9zdGF0cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxQ0FBcUM7QUFDTTtBQUNMO0FBRS9CLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxRQUFRLElBQUlDO1FBQ2xCRCxNQUFNRSxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUc7UUFFeEIsMkJBQTJCO1FBQzNCLE1BQU1DLGdCQUFnQixNQUFNTCwrQ0FBTUEsQ0FBQ00sT0FBTyxDQUFDQyxLQUFLO1FBQ2hELE1BQU1DLGlCQUFpQixNQUFNUiwrQ0FBTUEsQ0FBQ1MsVUFBVSxDQUFDRixLQUFLLENBQUM7WUFDbkRHLE9BQU87Z0JBQ0xDLE1BQU07b0JBQ0pDLEtBQUtWO2dCQUNQO1lBQ0Y7UUFDRjtRQUVBLHFCQUFxQjtRQUNyQixNQUFNVyxnQkFBZ0IsTUFBTWIsK0NBQU1BLENBQUNNLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDO1lBQy9DRyxPQUFPO2dCQUNMSSxPQUFPO29CQUNMQyxNQUFNO3dCQUNKQyxVQUFVO29CQUNaO2dCQUNGO1lBQ0Y7UUFDRjtRQUVBLG9DQUFvQztRQUNwQyxNQUFNQyxlQUFlLElBQUlkLEtBQUtEO1FBQzlCZSxhQUFhQyxPQUFPLENBQUNELGFBQWFFLE9BQU8sS0FBSztRQUU5QyxNQUFNQyxVQUFVLE1BQU1wQiwrQ0FBTUEsQ0FBQ3FCLFNBQVMsQ0FBQzs7Ozs7OztvQkFPdkIsRUFBRUosYUFBYTs7O0lBRy9CLENBQUM7UUFFRCxNQUFNSyxvQkFBb0JGLFFBQVFHLEdBQUcsQ0FBQ0MsQ0FBQUEsT0FBUztnQkFDN0MsR0FBR0EsSUFBSTtnQkFDUEMsV0FBV0MsT0FBT0YsS0FBS0MsU0FBUztZQUVsQztRQUVBLE9BQU8xQixxREFBWUEsQ0FBQzRCLElBQUksQ0FBQztZQUN2QkMsYUFBYUYsT0FBT3JCLGdCQUFnQkc7WUFDcENxQixVQUFVSCxPQUFPYjtZQUNqQk8sU0FBU0U7UUFDWDtJQUVGLEVBQUUsT0FBT1EsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsb0NBQW9DQTtRQUNsRCxPQUFPL0IscURBQVlBLENBQUM0QixJQUFJLENBQ3RCO1lBQUVHLE9BQU87UUFBbUMsR0FDNUM7WUFBRUUsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9jYXBtaXNzaW9uL0RvY3VtZW50cy9jYXJjaGVjay9zcmMvYXBwL2FwaS9pbnNwZWN0aW9ucy9zdGF0cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL2luc3BlY3Rpb25zL3N0YXRzL3JvdXRlLnRzXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB0b2RheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgIC8vIEdldCB1bmluc3BlY3RlZCB2ZWhpY2xlc1xuICAgIGNvbnN0IHRvdGFsVmVoaWNsZXMgPSBhd2FpdCBwcmlzbWEudmVoaWNsZS5jb3VudCgpO1xuICAgIGNvbnN0IGluc3BlY3RlZFRvZGF5ID0gYXdhaXQgcHJpc21hLmluc3BlY3Rpb24uY291bnQoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgZGF0ZToge1xuICAgICAgICAgIGd0ZTogdG9kYXksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gR2V0IGNyaXRpY2FsIGNhc2VzXG4gICAgY29uc3QgY3JpdGljYWxDYXNlcyA9IGF3YWl0IHByaXNtYS52ZWhpY2xlLmNvdW50KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHBhcnRzOiB7XG4gICAgICAgICAgc29tZToge1xuICAgICAgICAgICAgc2V2ZXJpdHk6ICdjcml0aWNhbCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBHZXQgaGlzdG9yaWNhbCBkYXRhIChsYXN0IDcgZGF5cylcbiAgICBjb25zdCBzZXZlbkRheXNBZ28gPSBuZXcgRGF0ZSh0b2RheSk7XG4gICAgc2V2ZW5EYXlzQWdvLnNldERhdGUoc2V2ZW5EYXlzQWdvLmdldERhdGUoKSAtIDcpO1xuXG4gICAgY29uc3QgaGlzdG9yeSA9IGF3YWl0IHByaXNtYS4kcXVlcnlSYXdgXG4gICAgICBTRUxFQ1QgXG4gICAgICAgIERBVEUoZGF0ZSkgYXMgZGF0ZSxcbiAgICAgICAgQ09VTlQoKikgYXMgaW5zcGVjdGVkLFxuICAgICAgICBTVU0oQ0FTRSBXSEVOIHN0YXR1cyA9ICdjcml0aWNhbCcgVEhFTiAxIEVMU0UgMCBFTkQpIGFzIGNyaXRpY2FsLFxuICAgICAgICBTVU0oQ0FTRSBXSEVOIHN0YXR1cyA9ICdwZW5kaW5nJyBUSEVOIDEgRUxTRSAwIEVORCkgYXMgcGVuZGluZ1xuICAgICAgRlJPTSBpbnNwZWN0aW9uc1xuICAgICAgV0hFUkUgZGF0ZSA+PSAke3NldmVuRGF5c0Fnb31cbiAgICAgIEdST1VQIEJZIERBVEUoZGF0ZSlcbiAgICAgIE9SREVSIEJZIGRhdGUgQVNDXG4gICAgYDtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZWRIaXN0b3J5ID0gaGlzdG9yeS5tYXAoaXRlbSA9PiAoe1xuICAgICAgLi4uaXRlbSxcbiAgICAgIGluc3BlY3RlZDogU3RyaW5nKGl0ZW0uaW5zcGVjdGVkKSwgLy8gQ29udmVydCBhbnkgQmlnSW50IHByb3BlcnRpZXMgdG8gc3RyaW5nXG4gICAgICAvLyBDb252ZXJ0IG90aGVyIEJpZ0ludCBwcm9wZXJ0aWVzIGlmIG5lY2Vzc2FyeVxuICAgIH0pKTtcbiAgICBcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgdW5pbnNwZWN0ZWQ6IFN0cmluZyh0b3RhbFZlaGljbGVzIC0gaW5zcGVjdGVkVG9kYXkpLFxuICAgICAgY3JpdGljYWw6IFN0cmluZyhjcml0aWNhbENhc2VzKSxcbiAgICAgIGhpc3Rvcnk6IHNlcmlhbGl6ZWRIaXN0b3J5LCAvLyBVc2UgdGhlIHNlcmlhbGl6ZWQgaGlzdG9yeVxuICAgIH0pO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgaW5zcGVjdGlvbiBzdGF0czonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBpbnNwZWN0aW9uIHN0YXRzJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIkdFVCIsInRvZGF5IiwiRGF0ZSIsInNldEhvdXJzIiwidG90YWxWZWhpY2xlcyIsInZlaGljbGUiLCJjb3VudCIsImluc3BlY3RlZFRvZGF5IiwiaW5zcGVjdGlvbiIsIndoZXJlIiwiZGF0ZSIsImd0ZSIsImNyaXRpY2FsQ2FzZXMiLCJwYXJ0cyIsInNvbWUiLCJzZXZlcml0eSIsInNldmVuRGF5c0FnbyIsInNldERhdGUiLCJnZXREYXRlIiwiaGlzdG9yeSIsIiRxdWVyeVJhdyIsInNlcmlhbGl6ZWRIaXN0b3J5IiwibWFwIiwiaXRlbSIsImluc3BlY3RlZCIsIlN0cmluZyIsImpzb24iLCJ1bmluc3BlY3RlZCIsImNyaXRpY2FsIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/inspections/stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createUser: () => (/* binding */ createUser),\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// Définir un type global pour Prisma\nconst globalForPrisma = globalThis;\n// Création ou récupération de l'instance Prisma\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        'error',\n        'warn'\n    ] : 0\n});\n// Stocker l'instance dans l'objet global en mode développement\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n// Fonction pour créer un nouvel utilisateur avec un mot de passe haché\nasync function createUser(firstName, lastName, email, password, role) {\n    try {\n        // Hachage du mot de passe avant de l'enregistrer\n        const hashedPassword = await bcrypt__WEBPACK_IMPORTED_MODULE_1___default().hash(password, 10);\n        return await prisma.user.create({\n            data: {\n                firstName,\n                lastName,\n                email,\n                password: hashedPassword,\n                role\n            }\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de la création de l'utilisateur:\", error);\n        throw new Error('Erreur lors de la création de l’utilisateur.');\n    }\n}\n// Exporter l'instance Prisma et la fonction createUser\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBb0Q7QUFDeEI7QUFFNUIscUNBQXFDO0FBQ3JDLE1BQU1FLGtCQUFrQkM7QUFFeEIsZ0RBQWdEO0FBQ2hELE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlKLHdEQUFZQSxDQUFDO0lBQ3hESyxLQUFLQyxLQUFzQyxHQUFHO1FBQUM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUM3RTtBQUVBLCtEQUErRDtBQUMvRCxJQUFJQSxJQUFxQyxFQUFFO0lBQ3pDSixnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0I7QUFFQSx1RUFBdUU7QUFDdkUsZUFBZUcsV0FDYkMsU0FBaUIsRUFDakJDLFFBQWdCLEVBQ2hCQyxLQUFhLEVBQ2JDLFFBQWdCLEVBQ2hCQyxJQUFVO0lBRVYsSUFBSTtRQUNGLGlEQUFpRDtRQUNqRCxNQUFNQyxpQkFBaUIsTUFBTVosa0RBQVcsQ0FBQ1UsVUFBVTtRQUVuRCxPQUFPLE1BQU1QLE9BQU9XLElBQUksQ0FBQ0MsTUFBTSxDQUFDO1lBQzlCQyxNQUFNO2dCQUNKVDtnQkFDQUM7Z0JBQ0FDO2dCQUNBQyxVQUFVRTtnQkFDVkQ7WUFDRjtRQUNGO0lBQ0YsRUFBRSxPQUFPTSxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyxnREFBZ0RBO1FBQzlELE1BQU0sSUFBSUUsTUFBTTtJQUNsQjtBQUNGO0FBRUEsdURBQXVEO0FBQ3pCIiwic291cmNlcyI6WyIvVXNlcnMvY2FwbWlzc2lvbi9Eb2N1bWVudHMvY2FyY2hlY2svc3JjL2xpYi9wcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50LCBSb2xlIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xuXG4vLyBEw6lmaW5pciB1biB0eXBlIGdsb2JhbCBwb3VyIFByaXNtYVxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB7IHByaXNtYT86IFByaXNtYUNsaWVudCB9O1xuXG4vLyBDcsOpYXRpb24gb3UgcsOpY3Vww6lyYXRpb24gZGUgbCdpbnN0YW5jZSBQcmlzbWFcbmNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCh7XG4gIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ2Vycm9yJywgJ3dhcm4nXSA6IFsnZXJyb3InXSxcbn0pO1xuXG4vLyBTdG9ja2VyIGwnaW5zdGFuY2UgZGFucyBsJ29iamV0IGdsb2JhbCBlbiBtb2RlIGTDqXZlbG9wcGVtZW50XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xufVxuXG4vLyBGb25jdGlvbiBwb3VyIGNyw6llciB1biBub3V2ZWwgdXRpbGlzYXRldXIgYXZlYyB1biBtb3QgZGUgcGFzc2UgaGFjaMOpXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVVc2VyKFxuICBmaXJzdE5hbWU6IHN0cmluZyxcbiAgbGFzdE5hbWU6IHN0cmluZyxcbiAgZW1haWw6IHN0cmluZyxcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgcm9sZTogUm9sZVxuKSB7XG4gIHRyeSB7XG4gICAgLy8gSGFjaGFnZSBkdSBtb3QgZGUgcGFzc2UgYXZhbnQgZGUgbCdlbnJlZ2lzdHJlclxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcblxuICAgIHJldHVybiBhd2FpdCBwcmlzbWEudXNlci5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBmaXJzdE5hbWUsXG4gICAgICAgIGxhc3ROYW1lLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLCAvLyBNb3QgZGUgcGFzc2UgaGFjaMOpXG4gICAgICAgIHJvbGUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgbG9ycyBkZSBsYSBjcsOpYXRpb24gZGUgbCd1dGlsaXNhdGV1cjpcIiwgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignRXJyZXVyIGxvcnMgZGUgbGEgY3LDqWF0aW9uIGRlIGzigJl1dGlsaXNhdGV1ci4nKTtcbiAgfVxufVxuXG4vLyBFeHBvcnRlciBsJ2luc3RhbmNlIFByaXNtYSBldCBsYSBmb25jdGlvbiBjcmVhdGVVc2VyXG5leHBvcnQgeyBwcmlzbWEsIGNyZWF0ZVVzZXIgfTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJiY3J5cHQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyIsImNyZWF0ZVVzZXIiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJyb2xlIiwiaGFzaGVkUGFzc3dvcmQiLCJoYXNoIiwidXNlciIsImNyZWF0ZSIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Finspections%2Fstats%2Froute&page=%2Fapi%2Finspections%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Finspections%2Fstats%2Froute.ts&appDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fcapmission%2FDocuments%2Fcarcheck&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();