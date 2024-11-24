import express from "express";
const router = express.Router();

///json example
let users = [
  { id: "1", name: "data1" },
  { id: "2", name: "data2" },
  { id: "3", name: "data3" },
];

///get single post // request params
router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    const error = new Error("Post " + userId + " not found");
    error.status = 404;
    return next(error);
  }
});

///limit response // querry string
router.get("/", (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(users.slice(0, limit));
  } else {
    res.status(200).json(users);
  }
});

///post new user
router.post("/", (req, res, next) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  if (newUser.name) {
    users.push(newUser);
    res.status(200).json(newUser);
  } else {
    const error = new Error("name is required");
    error.status = 404;
    return next(error);
  }
});
///put/update user
router.put("/:id", (req, res, next) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.name = req.body.name;
    res.status(200).json(user);
  } else {
    const error = new Error("user not found");
    error.status = 404;
    return next(error);
  }
});
///delete user
router.delete("/:id", (req, res, next) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);
  if (user) {
    users = users.filter((user) => user.id != userId);
    res.status(200).json(users);
  } else {
    const error = new Error("user not found");
    error.status = 404;
    return next(error);
  }
});

export default router;
