//* events

const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, changeEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put("/:id", changeEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
