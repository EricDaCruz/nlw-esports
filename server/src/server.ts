import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();
app.use(express.json());
app.use(cors())

const prisma = new PrismaClient({
   log: ["query"],
});
//Get Games
app.get("/games", async (req, res) => {
   const games = await prisma.game.findMany({
      include: {
         _count: {
            select: {
               ads: true,
            },
         },
      },
   });

   return res.json(games);
});

//List Ads By Game
app.get("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;
    
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceCHannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId,
        },
        orderBy: {
            createAt: 'desc'
        }
    });
    
    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd),
        }
    }));
});

//Get Discord By Ad
app.get("/ads/:id/discord", async (req, res) => {
    const adId = req.params.id;
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    
    return res.json({discord: ad.discord});
});

//Create Ads
app.post("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;
    const body = req.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceCHannel: body.useVoiceCHannel,
        }
    })

   return res.status(201).json(ad);
});
app.listen(3333, () => {
   console.log("Server running on port 3333");
});
