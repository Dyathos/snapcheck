"use strict";(()=>{var e={};e.id=844,e.ids=[844],e.modules={3524:e=>{e.exports=require("@prisma/client")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3221:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>m,originalPathname:()=>w,patchFetch:()=>g,requestAsyncStorage:()=>h,routeModule:()=>l,serverHooks:()=>v,staticGenerationAsyncStorage:()=>p,staticGenerationBailout:()=>k});var i={};r.r(i),r.d(i,{GET:()=>u,POST:()=>d});var a=r(884),s=r(6132),n=r(1040),c=r(5798),o=r(9730);async function d(e,{params:t}){try{let r=await e.json(),i=r.updates;for(let e of i){let r=await o._.checkInPart.findUnique({where:{id:e.id}});if(r)await o._.checkInPart.update({where:{id:r.id},data:{status:e.status}});else{let r=await o._.checkInPart.create({data:{vehicleId:t.id,itemId:e.itemId,status:e.status}});await o._.checkInPartHistory.create({data:{checkInPartId:r.id,status:e.status,severity:e.severity,description:e.description,inspector:"User"}})}}let a=i.filter(e=>"warning"===e.status&&("critical"===e.severity||"high"===e.severity)),s="excellent";return a.length>0&&(s=a.some(e=>"critical"===e.severity)?"critical":"warning"),await o._.vehicle.update({where:{id:t.id},data:{healthStatus:s,lastInspection:new Date}}),c.Z.json({success:!0})}catch(e){return console.error("Error updating check-in:",e),c.Z.json({error:"Une erreur est survenue lors de la mise \xe0 jour."},{status:500})}}async function u(e,{params:t}){try{let e=await o._.checkInPart.findMany({where:{vehicleId:t.id},include:{item:!0,histories:{orderBy:{createdAt:"desc"}}},orderBy:{item:{category:"asc"}}});return c.Z.json(e)}catch(e){return console.error("Error fetching check-in parts:",e),c.Z.json({error:"Une erreur est survenue lors du chargement des donn\xe9es."},{status:500})}}let l=new a.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/vehicles/[id]/checkin/route",pathname:"/api/vehicles/[id]/checkin",filename:"route",bundlePath:"app/api/vehicles/[id]/checkin/route"},resolvedPagePath:"/Users/capmission/Documents/carcheck/src/app/api/vehicles/[id]/checkin/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:h,staticGenerationAsyncStorage:p,serverHooks:v,headerHooks:m,staticGenerationBailout:k}=l,w="/api/vehicles/[id]/checkin/route";function g(){return(0,n.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:p})}},9730:(e,t,r)=>{r.d(t,{_:()=>s});var i=r(3524);let a=globalThis,s=a.prisma||new i.PrismaClient({log:["error"]})}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[271,107],()=>r(3221));module.exports=i})();