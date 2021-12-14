//----------DECLARATIONS----------
const baseUrl = "http://localhost:3000/articles/";
let blogPosts = null;
const navItems = [
  { link: "#updates", title: "Travel updates" },
  { link: "#reviews", title: "Reviews" },
  { link: "#about", title: "About" },
  { link: "#contact", title: "Contact" },
];

const actionButtons = ["Edit", "Delete"];
const indexFooterBtn = ["previous", "next"];
const articleFooterBtn = ["previous article", "next article"];
const modalInputs = [
  {
    id: "newTitle",
    cssClass: "input",
    type: "text",
    placehoder: "Please enter title",
  },
  {
    id: "newTag",
    cssClass: "input",
    type: "text",
    placehoder: "Please enter tag",
  },
  {
    id: "newAuthor",
    cssClass: "input",
    type: "text",
    placehoder: "Please enter author",
  },
  {
    id: "newDate",
    cssClass: "input",
    type: "text",
    placehoder: "Please enter date (DD/MM/YYY)",
  },
  {
    id: "newImg",
    cssClass: "input",
    type: "text",
    placehoder: "Please enter image url",
  },
  {
    id: "newQuote",
    cssClass: "input",
    type: "text",
    placehoder: "Please enter quote",
  },
];

//modal
let modal = null;

//routes for next/pevious articles
let nextRoute = null;
let previousRoute = null;

//----------FUNCTIONS----------
function generateNavbarItems(item) {
  //create list item
  let navItem = document.createElement("li");
  navItem.classList.add("nav__item");

  //create link inside list item
  let link = document.createElement("a");
  link.classList.add("nav__link");
  link.href = item.link;
  let linkText = document.createTextNode(item.title);

  //append text to link, link to list item
  link.appendChild(linkText);
  navItem.appendChild(link);
  return navItem;
}

function generateNavbarWhole() {
  //create nav element
  let navTag = document.createElement("nav");
  navTag.classList.add("nav");

  //create inside container of nav
  let navContainer = document.createElement("ul");
  navContainer.classList.add("nav__container");

  //create nav items
  navItems.forEach((navItem) => {
    navContainer.appendChild(generateNavbarItems(navItem));
  });
  navTag.appendChild(navContainer);

  return navTag;
}

function generateArticleContent(contentList, quote) {
  let contentContainer = document.createElement("div");
  contentContainer.classList.add("content__container");

  let middle = Math.round((contentList.length - 1) / 2);

  if (quote) {
    contentList.forEach((text, index) => {
      let paragraph = document.createElement("p");
      let paragraphText = null;

      if (index == middle) {
        paragraph.classList.add("saying");
        paragraphText = document.createTextNode(quote);
      } else {
        paragraphText = document.createTextNode(text);
      }
      paragraph.appendChild(paragraphText);
      contentContainer.appendChild(paragraph);
    });
  } else {
    contentList.forEach((text) => {
      let paragraph = document.createElement("p");
      let paragraphText = document.createTextNode(text);
      paragraph.appendChild(paragraphText);

      contentContainer.appendChild(paragraph);
    });
  }
  return contentContainer;
}

function generateArticle(item) {
  let article = document.createElement("article");

  //article title
  let articleTitle = document.createElement("h2");
  articleTitle.classList.add("title");
  let articleTitleText = document.createTextNode(item.title);
  articleTitle.appendChild(articleTitleText);

  //article about info
  let infoContainer = document.createElement("ul");
  infoContainer.classList.add("info__container");

  if (item.infoList.length !== 3) {
    console.log("You must have 3 arguments. Check the source.");
  } else {
    item.infoList.forEach((item, index) => {
      let infoContainerItem = document.createElement("li");
      infoContainerItem.classList.add("info__item");

      if (index == 1) {
        let addText = document.createTextNode("Added by ");
        infoContainerItem.appendChild(addText);
        let spanEl = document.createElement("span");
        spanEl.classList.add("info__mark");

        let addTextSpan = document.createTextNode(item);
        spanEl.appendChild(addTextSpan);
        infoContainerItem.appendChild(spanEl);
      } else {
        let infoItemText = document.createTextNode(item);
        infoContainerItem.appendChild(infoItemText);
      }

      infoContainer.appendChild(infoContainerItem);
    });
  }

  //article actions
  let actionsContainer = document.createElement("div");
  actionsContainer.classList.add("actions__container");

  actionButtons.forEach((btn) => {
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("actions__btn");
    let btnText = document.createTextNode(btn);
    button.appendChild(btnText);
    if (btn === "Edit") {
      button.onclick = () => editArticle();
    } else {
      button.onclick = () => deleteArticle(item.id);
    }
    actionsContainer.appendChild(button);
  });

  //article image
  let articleImg = document.createElement("img");
  articleImg.src = item.blogImg.src;
  articleImg.alt = item.blogImg.alt;

  //article content
  let contentContainer = generateArticleContent(item.frontContent);

  //readmorelink
  let readContainer = document.createElement("div");
  readContainer.classList.add("readmore__container");

  let btnRead = document.createElement("button");
  btnRead.route = "/details";
  btnRead.type = "button";
  btnRead.classList.add("button");

  let linkRead = document.createElement("a");
  linkRead.href = item.linkReadMore;
  let linkReadText = document.createTextNode("Read more");

  linkRead.appendChild(linkReadText);
  btnRead.appendChild(linkRead);
  readContainer.appendChild(btnRead);

  //link all article contents to parent article
  article.appendChild(articleTitle);
  article.appendChild(infoContainer);
  article.appendChild(actionsContainer);
  article.appendChild(articleImg);
  article.appendChild(contentContainer);
  article.appendChild(readContainer);

  return article;
}

function generateArticleDetails(item) {
  let article = document.createElement("article");

  //article title
  let articleTitle = document.createElement("h2");
  articleTitle.classList.add("title");
  let articleTitleText = document.createTextNode(item.title);
  articleTitle.appendChild(articleTitleText);

  //article about info
  let infoContainer = document.createElement("ul");
  infoContainer.classList.add("info__container");

  if (item.infoList.length !== 3) {
    console.log("You must have 3 arguments. Check the source.");
  } else {
    item.infoList.forEach((item, index) => {
      let infoContainerItem = document.createElement("li");
      infoContainerItem.classList.add("info__item");

      if (index == 1) {
        let addText = document.createTextNode("Added by ");
        infoContainerItem.appendChild(addText);
        let spanEl = document.createElement("span");
        spanEl.classList.add("info__mark");

        let addTextSpan = document.createTextNode(item);
        spanEl.appendChild(addTextSpan);
        infoContainerItem.appendChild(spanEl);
      } else {
        let infoItemText = document.createTextNode(item);
        infoContainerItem.appendChild(infoItemText);
      }

      infoContainer.appendChild(infoContainerItem);
    });
  }

  //article image
  let articleImg = document.createElement("img");
  articleImg.src = item.blogImg.src;
  articleImg.alt = item.blogImg.alt;

  //article content
  let contentContainer = generateArticleContent(item.fullContent, item.quote);

  //link all article contents to parent article
  article.appendChild(articleTitle);
  article.appendChild(infoContainer);
  article.appendChild(articleImg);
  article.appendChild(contentContainer);

  return article;
}

function generateFooter(footerButtons) {
  let footer = document.createElement("footer");
  footer.classList.add("footer");

  footerButtons.forEach((item) => {
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("footer__link");
    if (item === "next") button.classList.add("footer__link--next");
    let btnText = document.createTextNode(item);
    button.appendChild(btnText);
    footer.appendChild(button);
  });
  return footer;
}

function generateInput(id, classCSS, type, placehoder) {
  let input = document.createElement("input");
  input.classList.add(classCSS);
  input.type = type;
  input.placeholder = placehoder;
  input.id = id;
  return input;
}

function generateModal() {
  //create modal div
  let modalOverlay = document.createElement("div");
  modalOverlay.id = "addModal";
  modalOverlay.classList.add("modal__overlay");
  let modal = document.createElement("div");
  modal.classList.add("modal");
  let modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");

  //create modal title
  let modalTitle = document.createElement("h2");
  modalTitle.classList.add("title");
  let modalTitleText = document.createTextNode("Add/Edit article");
  modalTitle.appendChild(modalTitleText);

  //create inputs
  let inputsContainer = document.createElement("div");
  inputsContainer.classList.add("inputs__container");

  //create text area
  let textarea = document.createElement("textarea");
  textarea.classList.add("textarea");
  textarea.name = "content";
  textarea.placeholder = "Please enter content";
  textarea.style.maxHeight = "252px";
  textarea.id = "newContent";

  //create modal action buttons
  let modalButtons = document.createElement("div");
  modalButtons.classList.add("modal__buttons");

  let btnCancel = document.createElement("button");
  btnCancel.type = "button";
  btnCancel.id = "cancelBtn";
  btnCancel.classList.add("button");
  let btnTextCancel = document.createTextNode("Cancel");
  btnCancel.appendChild(btnTextCancel);

  let btnSave = document.createElement("button");
  btnSave.type = "button";
  btnSave.id = "saveBtn";
  btnSave.classList.add("button");
  btnSave.classList.add("button--pink");
  let btnTextSave = document.createTextNode("Save");
  btnSave.appendChild(btnTextSave);

  modalButtons.appendChild(btnCancel);
  modalButtons.appendChild(btnSave);

  //add all the elements to the modal
  modalInputs.forEach((item) =>
    inputsContainer.appendChild(
      generateInput(item.id, item.cssClass, item.type, item.placehoder)
    )
  );

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(inputsContainer);
  modalContent.appendChild(textarea);
  modalContent.appendChild(modalButtons);
  modal.appendChild(modalContent);
  modalOverlay.appendChild(modal);

  return modalOverlay;
}

function generateModalSwitch() {
  let modalSwitch = document.createElement("div");
  modalSwitch.classList.add("add__container");

  let switchBtn = document.createElement("button");
  switchBtn.type = "button";
  switchBtn.id = "addBtn";
  switchBtn.classList.add("button");

  let icon = document.createElement("span");
  let iconText = document.createTextNode("+");
  icon.appendChild(iconText);
  let switchBtnText = document.createTextNode(" Add Article");

  switchBtn.appendChild(icon);
  switchBtn.appendChild(switchBtnText);

  let switchTheme = generateThemeSwitch();
  modalSwitch.appendChild(switchTheme);

  modalSwitch.appendChild(switchBtn);

  return modalSwitch;
}

function generateThemeSwitch() {
  let themeSwitch = document.createElement("div");
  themeSwitch.classList.add("theme-switch-wrapper");

  let switchLabel = document.createElement("label");
  switchLabel.classList.add("theme-switch");
  switchLabel.for = "checkbox";

  let switchInput = document.createElement("input");
  switchInput.type = "checkbox";
  switchInput.id = "checkbox";

  let slider = document.createElement("div");
  slider.classList.add("slider");
  slider.classList.add("round");

  switchLabel.appendChild(switchInput);
  switchLabel.appendChild(slider);

  themeSwitch.appendChild(switchLabel);

  return themeSwitch;
}

function generateHomeButton() {
  let btnContainer = document.createElement("div");
  btnContainer.classList.add("add__container");
  btnContainer.classList.add("home");

  let btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("button");
  btn.onclick = function () {
    window.location.hash = "#home";
  };
  let btnText = document.createTextNode("home");

  btn.appendChild(btnText);
  btnContainer.appendChild(btn);

  return btnContainer;
}

function generateIndexPage() {
  let navbar = generateNavbarWhole();
  app.appendChild(navbar);

  let main = document.createElement("main");

  let modalSwitch = generateModalSwitch();
  main.appendChild(modalSwitch);

  //link all article children to parent main
  blogPosts.forEach((blogPost) => {
    let newBlogPost = generateArticle(blogPost);
    main.appendChild(newBlogPost);
  });
  app.appendChild(main);

  let footer = generateFooter(indexFooterBtn);
  app.appendChild(footer);

  let modal = generateModal();
  app.appendChild(modal);
}

function generateDetailsPage(article, currentIndex) {
  let navbar = generateNavbarWhole();
  app.appendChild(navbar);
  let main = document.createElement("main");

  let homeBtn = generateHomeButton();
  main.appendChild(homeBtn);

  let newBlogPost = generateArticleDetails(article, article.quote);
  main.appendChild(newBlogPost);

  app.appendChild(main);

  let footer = generateFooter(articleFooterBtn);

  if (currentIndex === blogPosts.length - 1) {
    footer.lastChild.style.display = "none";
  } else {
    nextRoute = blogPosts[currentIndex + 1].linkReadMore;
  }
  if (currentIndex === 0) {
    footer.firstChild.style.display = "none";
    footer.style.justifyContent = "end";
  } else {
    previousRoute = blogPosts[currentIndex - 1].linkReadMore;
  }

  if (footer.firstChild) {
    footer.firstChild.addEventListener("click", changeRoutePrev, false);
  }
  if (footer.lastChild) {
    footer.lastChild.addEventListener("click", changeRouteNext, false);
  }

  app.appendChild(footer);
}

function changeRouteNext() {
  window.location.hash = nextRoute;
}

function changeRoutePrev() {
  window.location.hash = previousRoute;
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

function saveArticle() {
  let newTitle = modal.querySelector("#newTitle");
  let newTag = modal.querySelector("#newTag");
  let newAuthor = modal.querySelector("#newAuthor");
  let newDate = modal.querySelector("#newDate");
  let newImg = modal.querySelector("#newImg");
  let newQuote = modal.querySelector("#newQuote");
  let newContent = modal.querySelector("#newContent");

  newImg.value =
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*";

  if (
    newTitle.value &&
    newTag.value &&
    newAuthor.value &&
    newDate.value &&
    newImg.value &&
    newQuote.value &&
    newContent.value
  ) {
    //get article details from inputs
    title = newTitle.value;
    tag = newTag.value;
    author = newAuthor.value;
    date = newDate.value;
    img = newImg.value;
    quote = newQuote.value;

    //get article content from textarea
    let allContent = newContent.value.split(/\r?\n/);
    let frontContent = null;
    if (allContent.length < 2) {
      generateSnackbar("Content must have at least two sentences");
    } else {
      frontContent = allContent.slice(0, 2);
    }

    //form the readmore link for the new article
    //link read more: initials of the 4 words + day + year
    let titleWords = title.split(" ");
    let dateNumbers = date.split("/");
    let linkText = "";
    let linkReadMore = "";
    if (titleWords.length < 4) {
      let words = titleWords[0].split("");
      linkText = (words[0] + words[1] + words[2] + words[3]).toLowerCase();
    } else {
      linkText = (
        titleWords[0][0] +
        titleWords[1][0] +
        titleWords[2][0] +
        titleWords[3][0]
      ).toLowerCase();
    }
    //putting it all together
    linkReadMore = "#articles/" + linkText + dateNumbers[0] + dateNumbers[1];
    console.log(linkReadMore);

    //create an article object to put in request body
    let article = {
      title: title,
      infoList: [tag, author, date],
      blogImg: {
        src: img,
        alt: "alt",
      },
      quote: quote,
      frontContent: frontContent,
      fullContent: allContent,
      linkReadMore: linkReadMore,
    };

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        generateSnackbar(`New article with title ${data.title} created`);
        modal.classList.toggle("show-modal");
        const initialHash = window.location.hash;
        window.location.hash = "#aa";
        window.location.hash = initialHash;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    generateSnackbar("please complete all fields");
  }
}

function dateInputMask(elm) {
  elm.addEventListener("keypress", function (e) {
    if (e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }

    var len = elm.value.length;

    // If we're at a particular place, let the user type the slash
    // i.e., 12/12/1212
    if (len !== 1 || len !== 3) {
      if (e.keyCode == 47) {
        e.preventDefault();
      }
    }

    // If they don't add the slash, do it for them...
    if (len === 2) {
      elm.value += "/";
    }

    // If they don't add the slash, do it for them...
    if (len === 5) {
      elm.value += "/";
    }
  });
}

function generateSnackbar(message) {
  console.log("aaaaaa");
  let snackbar = document.createElement("div");
  snackbar.id = "snackbar";

  let text = document.createTextNode(message);
  snackbar.appendChild(text);
  snackbar.classList.add("show");
  let app = document.getElementById("app");
  app.appendChild(snackbar);
  setTimeout(function () {
    snackbar.classList.remove("show");
  }, 3000);
}

function deleteArticle(articleId) {
  console.log(articleId);
  //9
  fetch(baseUrl + articleId, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const initialHash = window.location.hash;
      window.location.hash = "#aa";
      window.location.hash = initialHash;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function cancelArticle() {
  let newTitle = modal.querySelector("#newTitle");
  let newTag = modal.querySelector("#newTag");
  let newAuthor = modal.querySelector("#newAuthor");
  let newDate = modal.querySelector("#newDate");
  let newImg = modal.querySelector("#newImg");
  let newQuote = modal.querySelector("#newQuote");
  let newContent = modal.querySelector("#newContent");

  newTitle.value = "";
  newTag.value = "";
  newAuthor.value = "";
  newDate.value = "";
  newImg.value = "";
  newQuote.value = "";
  newContent.value = "";

  toggleClass();
}

function editArticle() {}

function cleanup(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//modal control
function toggleClass() {
  console.log(modal);
  if (modal) modal.classList.toggle("show-modal");
}

function addModalControl() {
  let actionBtn = document.querySelector("#addBtn");
  let saveBtn = document.querySelector("#saveBtn");
  let cancelBtn = document.querySelector("#cancelBtn");
  modal = document.querySelector("#addModal");

  actionBtn.addEventListener("click", toggleClass);
  cancelBtn.addEventListener("click", cancelArticle);
  saveBtn.addEventListener("click", saveArticle);
}

function addThemeControl() {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  toggleSwitch.addEventListener("change", switchTheme, false);
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }
}

//loading
function showLoading() {
  let loading = document.createElement("div");
  loading.classList.add("spinner");
  loading.id = "loadingContainer";

  let body = document.getElementsByTagName("body")[0];
  body.appendChild(loading);
}

function hideLoading() {
  let container = document.getElementById("loadingContainer");
  if (container) container.remove();
}

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

class MyHashRouter {
  constructor() {
    window.addEventListener("hashchange", (event) => this.onRouteChange(event));
    this.app = document.getElementById("app");
    console.log("inside constructor");
  }
  onRouteChange(event) {
    const hashLocation = window.location.hash.substring(1);

    console.log("inside routechange");
    this.loadContent(hashLocation);
  }
  //uri = partea de dupa /#
  loadContent(uri) {
    const contentUri = `${uri}`;

    cleanup(app);

    let message = document.createElement("h1");

    const regex = /articles\/[a-z]{4}[0-9]{4}/;

    switch (contentUri) {
      case "":
        //when the user first loads the page
        window.location.hash = "#home";
        break;
      case "home":
        //generate homepage
        generateIndexPage();

        //add mask for date input of modal
        const inputDate = document.getElementById("newDate");
        inputDate.maxLength = 10;
        dateInputMask(inputDate);

        //switch for night mode
        addThemeControl();

        //modal control
        addModalControl();
        break;

      //cgte0118
      case contentUri.match(regex)?.input:
        //generate one article
        let articleId = "#" + contentUri;
        let foundArticle = blogPosts.find(
          (item) => item.linkReadMore === articleId
        );
        let foundArticleIndex = blogPosts.findIndex(
          (item) => item.linkReadMore === articleId
        );
        generateDetailsPage(foundArticle, foundArticleIndex);
        window.scrollTo(0, 0);
        break;
      case "updates":
        message.innerText = "Updates page";
        app.appendChild(message);
        break;
      case "reviews":
        message.innerText = "Reviews page";
        app.appendChild(message);
        break;
      case "about":
        message.innerText = "About page";
        app.appendChild(message);
        break;
      case "contact":
        message.innerText = "Contact page";
        app.appendChild(message);
        break;
      default:
        message.innerText = "Not found";
        app.appendChild(message);
        break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showLoading();
  fetch(baseUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      blogPosts = data;
      hideLoading();
      let myRouter = new MyHashRouter();
      const initialHash = window.location.hash;
      window.location.hash = "#aa";
      window.location.hash = initialHash;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
