import express from "express";
import { shortenUrl, redirectToUrl, getUrlStats } from "../controllers/urlController";

const router = express.Router({mergeParams:true});

router.post("/api/shorten", shortenUrl);
router.get("/:shortCode", redirectToUrl);
router.get("/api/stats/:code", getUrlStats);

export default router;
