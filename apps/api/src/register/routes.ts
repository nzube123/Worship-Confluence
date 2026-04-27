import { Router } from "express"
import { indivualRegistration } from "./indivRefistration.js";
import { choirRegistration } from "./choirRegistration.js";

export const getRegisterRoutes = () => {
    const router = Router();

    router.post("/individual", indivualRegistration);
    router.post("/choir", choirRegistration);

    return router
}