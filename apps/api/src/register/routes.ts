import { Router } from "express"
import { indivualRegistration } from "./indivRefistration";
import { choirRegistration } from "./choirRegistration";

export const getRegisterRoutes = () => {
    const router = Router();

    router.post("/individual", indivualRegistration);
    router.post("/choir", choirRegistration);

    return router
}