const express = require("express");
const { getCourses, addOrUpdateCourse, deletecourse } = require("./dynamo");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world from herokugit ");
});
app.get("/getCourses", async (req, res) => {
  try {
    const course = await getCourses();
    res.json(course);
  } catch (error) {
    res.status(500).json({
      ERR: "something went wrong",
    });
  }
});
app.post("/addCourse", async (req, res) => {
  const course = req.body;
  try {
    const newcourse = await addOrUpdateCourse(course);
    res.json(course);
  } catch (error) {
    res.status(500).json({
      ERR: "something went wrong",
      error,
    });
  }
});
app.put("/updateCourse/:id", async (req, res) => {
  const course = req.body;
  const { id } = req.params;
  course.id = id;

  try {
    const newcourse = await addOrUpdateCourse(course);
    res.json(course);
  } catch (error) {
    res.status(500).json({
      ERR: "something went wrong",
      error,
    });
  }
});
app.delete("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await deletecourse(id));
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});
const port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});
