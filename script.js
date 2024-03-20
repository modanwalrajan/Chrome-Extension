let myLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");


let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") );

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

// function to save current tab 
tabBtn.addEventListener("click", function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // console.log(tabs)
        myLeads.push(tabs[0].url); // now pushing it to myleads array
        localStorage.setItem("myLeads", JSON.stringify(myLeads)); 
        render(myLeads);
    })
})


// function to save copied url 
inputBtn.addEventListener('click', function () {
    
    myLeads.push(inputEl.value);
    inputEl.value = ""; // to clear out the input field:
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // saving myleads array to localStorage:
    render(myLeads);

})

//function to delete all saved tabs 
delBtn.addEventListener("dblclick", function () { 
myLeads = [];
localStorage.clear();
render(myLeads);
})

//function to arrenge url in list form and display
function render(leads) {
    let listItems = "";

for (let i = 0; i < leads.length; i++) {

    // listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
    listItems += `
    <li>
    <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
    </li>
    `;
}

ulEl.innerHTML = listItems;
}
