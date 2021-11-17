const blogPosts = [
  {
    id: 1,
    title: "The complete guide to explore Trasilvania, with your bike",
    infoList: ["Destination Europe", "Jonnathan Mercadina", "July 01, 2018"],
    blogImg: {
      src: "img/bike.jpg",
      alt: "Bike",
    },
    frontContent: [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est totam laboriosam debitis magnam voluptatum, incidunt neque. Totam ullam non quis, repellendus molestiae in itaque natus labore quos ipsum alias, veritatis nihil! Quisquam labore, sequi minima expedita necessitatibus omnis error amet recusandae atque commodi quia! Vel laborum recusandae voluptatum rerum id harum, fuga beatae ut, consequuntur repellendus ipsum temporibus libero itaque.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quod tempore quaerat deserunt. Voluptatibus possimus, magni quas rem adipisci, esse ipsa fuga, fugit eos repellendus quis? Dicta perferendis, doloremque provident repellendus natus fugit obcaecati, voluptate odio, nulla similique officia. Iure at aliquam dicta provident nulla modi optio maiores. Similique eos molestiae earum voluptatum nostrum porro, consequuntur nihil ex earum. Voluptatum placeat labore necessitatibus repellat. Repudiandae velit suscipit amet tenetur, mollitia aut dolor ipsa delectus a autem ut quibusdam incidunt? Nisi facilis voluptatem omnis debitis laborum cupiditate pariatur inventore molestiae eveniet!",
    ],
    fullContent: [],
    linkReadMore: "./details.html",
  },
];
const navItems = [
  { link: "/", title: "Travel updates" },
  { link: "/", title: "Reviews" },
  { link: "/", title: "About" },
  { link: "/", title: "Contact" },
];

const actionButtons = ["Edit", "Delete"];
const footerButtons = ["previous", "next"];
const modalInputs = [
  {
    cssClass: "input",
    type: "text",
    placehoder: "Please enter title",
  },
  {
    cssClass: "input",
    type: "text",
    placehoder: "Please enter tag",
  },
  {
    cssClass: "input",
    type: "text",
    placehoder: "Please enter author",
  },
  {
    cssClass: "input",
    type: "text",
    placehoder: "Please enter date",
  },
  {
    cssClass: "input",
    type: "text",
    placehoder: "Please enter image url",
  },
  {
    cssClass: "input",
    type: "text",
    placehoder: "Please enter quote",
  },
];
//point of entry for the application
let app = document.getElementById("app");

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

generateNavbarWhole();

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

  actionButtons.forEach((item) => {
    let button = document.createElement("button");
    button.type = "button";
    button.classList.add("actions__btn");
    let btnText = document.createTextNode(item);
    button.appendChild(btnText);
    actionsContainer.appendChild(button);
  });

  //article image
  let articleImg = document.createElement("img");
  articleImg.src = item.blogImg.src;
  articleImg.alt = item.blogImg.alt;

  //article content
  let contentContainer = document.createElement("div");
  contentContainer.classList.add("content__container");

  item.frontContent.forEach((text) => {
    let paragraph = document.createElement("p");
    let paragraphText = document.createTextNode(text);
    paragraph.appendChild(paragraphText);

    contentContainer.appendChild(paragraph);
  });

  //readmorelink
  let readContainer = document.createElement("div");
  readContainer.classList.add("readmore__container");

  let btnRead = document.createElement("button");
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
  article.appendChild(articleImg);
  article.appendChild(contentContainer);
  article.appendChild(readContainer);

  return article;
}

function generateFooter() {
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

function generateInput(classCSS, type, placehoder) {
  let input = document.createElement("input");
  input.classList.add(classCSS);
  input.type = type;
  input.placeholder = placehoder;
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
      generateInput(item.cssClass, item.type, item.placehoder)
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

function init() {
  let navbar = generateNavbarWhole();
  app.prepend(navbar);

  let main = document.createElement("main");
  //link all article children to parent main
  blogPosts.forEach((blogPost) => {
    let newBlogPost = generateArticle(blogPost);
    main.appendChild(newBlogPost);
  });
  app.appendChild(main);

  let footer = generateFooter();
  app.appendChild(footer);

  let modal = generateModal();
  app.appendChild(modal);
}

init();

//modal control
let actionBtn = document.querySelector("#addBtn");
let saveBtn = document.querySelector("#saveBtn");
let cancelBtn = document.querySelector("#cancelBtn");
let modal = document.querySelector("#addModal");

actionBtn.addEventListener("click", toggleClass);
cancelBtn.addEventListener("click", toggleClass);
saveBtn.addEventListener("click", saveArticle);

function toggleClass() {
  modal.classList.toggle("show-modal");
}

function saveArticle() {
  console.log("article saved");
  modal.classList.toggle("show-modal");
}
