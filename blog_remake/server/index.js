// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const fs = require("fs");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// GET all articles
app.get("/articles", (req, res) => {
  const articlesList = readJSONFile();

  let indexStart = req.query.indexStart;
  let indexEnd = req.query.indexEnd;

  if (indexStart === undefined || indexEnd === undefined) {
    let articlesListObject = {
      articles: articlesList,
      numberOfArticles: articlesList.length,
    };
    res.json(articlesListObject);
  } else {
    let newArticlesList = articlesList.filter(
      (article, index) => indexStart <= index && indexEnd >= index
    );
    let articlesListObject = {
      articlesList: newArticlesList,
      numberOfArticles: articlesList.length,
    };
    res.json(articlesListObject);
  }
});

// GET one article
app.get("/articles/:id", (req, res) => {
  const articlesList = readJSONFile();
  let article = null;
  const id = req.params.id;
  for (let i = 0; i < articlesList.length; i++) {
    if (articlesList[i].id == id) {
      const nextId =
        i === articlesList.length - 1 ? null : articlesList[i + 1].id;
      const prevId = i === 0 ? null : articlesList[i - 1].id;

      article = {
        article: {
          ...articlesList[i],
        },
        info: { prevId: prevId, nextId: nextId },
      };
      console.log(article);
    }
  }

  res.status(200).json(article);
});

// POST one article
app.post("/articles", (req, res) => {
  const articlesList = readJSONFile();

  const {
    title,
    infoList,
    blogImg,
    quote,
    frontContent,
    fullContent,
    linkReadMore,
  } = req.body;

  let article = {
    id: uuidv4(),
    title: title,
    infoList: infoList,
    blogImg: blogImg,
    quote: quote,
    frontContent: frontContent,
    fullContent: fullContent,
    linkReadMore: linkReadMore,
  };

  // save dogsList to file

  articlesList.push(article);

  writeJSONFile(articlesList);
  res.status(201).json(article);
});

// PUT one article
app.put("/articles/:id", (req, res) => {
  const articlesList = readJSONFile();
  const updatedArticleId = req.params.id;
  let index = "";
  articlesList.forEach((element, indexElement) => {
    if (element.id == updatedArticleId) {
      index = indexElement;
    }
  });
  const updatedArticle = req.body;
  articlesList[index] = { ...updatedArticle, id: articlesList[index].id };
  writeJSONFile(articlesList);
  res.json(articlesList[index]);
});

// DELETE one article
app.delete("/articles/:id", (req, res) => {
  const articleList = readJSONFile();
  const articleId = req.params.id;

  let articleIndex = articleList.findIndex((item) => item.id == articleId);

  if (articleIndex !== -1) {
    let removed = articleList.splice(articleIndex, 1);
    writeJSONFile(articleList);
    res.status(200).json(`Article ${removed[0].title} deleted`);
  } else {
    res.status(404).send({ message: "Article not found" });
  }
});

// Reading function from db.json file
function readJSONFile() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, "db.json")))[
    "articles"
  ];
}

// Writing function from db.json file
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ articles: content }, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Starting the server
app.listen("3007", () =>
  console.log("Server started at: http://localhost:3007")
);
