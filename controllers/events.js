const { response } = require("express");

const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  try {
    console.log(req);
    const event = new Event(req.body);
    event.user = req.uid;
    const savedEvent = await event.save();
    res.status(200).json({
      ok: true,
      savedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "talk witn administrator",
    });
  }
};

const changeEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "theres no event with this ID",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "user doesnt have the privileges to make changes",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true });
    res.status(200).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "talk witn administrator",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "theres no event with this ID",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "user doesnt have the privileges to delete",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventID);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "talk witn administrator",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  changeEvent,
  deleteEvent,
};
