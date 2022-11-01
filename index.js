var globalData = [];

var currPage = 0;
// Creating the Header

const h1Ele = document.createElement("h1");
h1Ele.innerText = "PAGINATION ";
h1Ele.id = "title";

// Creating the Para

const pEle = document.createElement("p");
pEle.innerText = "Paginating the datum";
pEle.id = "description";

// creating the table responsive

const divEle = document.createElement("div");
divEle.className = "table-responsive";

// Creating the table

const tableEle = document.createElement("table");
tableEle.className = "table table-bordered";
tableEle.id = "table";

// Creating the Table head

const theadEle = document.createElement("thead");
theadEle.className = "table table-bordered table-dark";

// Creating the table row

const trEle = document.createElement("tr");

["Id", "Email", "Name"].forEach((columndata) => {
  const thEle = document.createElement("th");
  thEle.innerText = columndata;
  trEle.appendChild(thEle);
});

// Creating the th

theadEle.appendChild(trEle);

//  Creating the tbody

const tbodyEle = document.createElement("tbody");

tableEle.append(theadEle, tbodyEle);

divEle.append(tableEle);

// Creating a button

const btndiv = document.createElement("div");
btndiv.className = "d-flex justify-content-center";
btndiv.id = "buttons";

// Next button

const nextBtn = document.createElement("button");

nextBtn.innerText = "Next";

btndiv.append(nextBtn);
//prev button

const prevBtn = document.createElement("button");

prevBtn.innerText = "Prev";

const populatetable = (startIndex, endIndex) => {
  globalData.slice(startIndex, endIndex).forEach(({ email, id, name }) => {
    const innertr = document.createElement("tr");
    const innertdId = document.createElement("td");
    innertdId.innerText = id;
    const innertdEmail = document.createElement("td");
    innertdEmail.innerText = email;
    const innertdName = document.createElement("td");
    innertdName.innerText = name;

    innertr.append(innertdId, innertdEmail, innertdName);

    tbodyEle.appendChild(innertr);
  });
};

const pagebtns = [...Array(20).keys()].map((pageno) => {
  const pageBtn = document.createElement("button");

  pageBtn.innerText = pageno + 1;

  pageBtn.addEventListener("click", () => {
    currPage = pageno;
    tbodyEle.innerHTML = "";
    const startIndex = pageno * 5;

    const endIndex = pageno * 5 + 5;
    populatetable(startIndex, endIndex);
  });
  return pageBtn;
});
btndiv.append(prevBtn, ...pagebtns, prevBtn);

document.body.style.textAlign = "center";

// Appending the Html

document.body.append(h1Ele, pEle, divEle, btndiv);

// Requesting from API

const request = new XMLHttpRequest();

request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);

request.send(null);

request.onload = () => {
  const data = JSON.parse(request.responseText);
  globalData = data;
  globalData.slice(currPage, 5).forEach(({ email, id, name }) => {
    const innertr = document.createElement("tr");
    const innertdId = document.createElement("td");
    innertdId.innerText = id;
    const innertdEmail = document.createElement("td");
    innertdEmail.innerText = email;
    const innertdName = document.createElement("td");
    innertdName.innerText = name;

    innertr.append(innertdId, innertdEmail, innertdName);

    tbodyEle.appendChild(innertr);
  });
};

const showNextSetOfData = (prev = false) => {
  if (prev && currPage > 0) currPage--;
  else if (!prev && currPage < 19) currPage++;
  else return;
  tbodyEle.innerHTML = "";
  const startIndex = currPage * 5;
  const endIndex = currPage * 5 + 5;
  populatetable(startIndex, endIndex);
};

nextBtn.addEventListener("click", () => {
  showNextSetOfData();
});

prevBtn.addEventListener("click", () => {
  showNextSetOfData(true);
});
