const router = require("express").Router();

const usersRouter = require("./users");
const projectsRouter = require("./projects");
const systemsRouter = require("./systems");
const screensRouter = require("./screens");
const issuesRouter = require("./issues");
const notificationsRouter = require("./notifications");
const default_settingsRouter = require("./default_settings");
const user_screensRouter = require("./user_screens");
<<<<<<< HEAD
const user_systemsRouter = require("./user_systems");
const pdfRouter = require("./pdf");
=======
const authRouter = require("./auth");
>>>>>>> e825fe2d87a98bbb5130fdc601efcfb7904252a5

router.use("/users", usersRouter);
router.use("/projects", projectsRouter);
router.use("/systems", systemsRouter);
router.use("/screens", screensRouter);
router.use("/issues", issuesRouter);
router.use("/notifications", notificationsRouter);
router.use("/default_settings", default_settingsRouter);
router.use("/user_screens", user_screensRouter);
<<<<<<< HEAD
router.use("/user_systems", user_systemsRouter);
router.use("/pdf", pdfRouter);
=======
router.use("/auth", authRouter);
>>>>>>> e825fe2d87a98bbb5130fdc601efcfb7904252a5

module.exports = router;
