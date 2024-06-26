import 'dotenv/config'
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("hellow from send method");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: 'first joke',
      content: 'this is first joke'
    },
    {
      id: 2,
      title: 'second joke',
      content: 'this is second joke'
    },
    {
      id: 3,
      title: 'third joke',
      content: 'this is third joke'
    },
    {
      id: 4,
      title: 'fourth joke',
      content: 'this is fourth joke'
    }
  ]

  res.send(jokes)
})

app.get("/login", (req, res) => {
  res.send("welcome to login page");
});

app.post("/teas", (req, res) => {
  //
  const { name, price } = req.body;
  const newData = {
    id: nextId++,
    name,
    price,
  };

  teaData.push(newData);
  res.status(201).send(newData);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

app.put("/teas/:id", (req, res) => {
  //
  const tea = teaData.find((tea) => tea.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(teaData);
});

app.delete("/teas/:id", (req, res) => {
  //
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id));
  if (index == -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send(teaData);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${port}...`);
});
