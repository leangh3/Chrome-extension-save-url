// chrome://extensions/

let myLeads = []
const saveButton = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteEl = document.getElementById("delete-btn")
const tabEl = document.getElementById("tab-btn")

// console.log(window.location);

function chromeExtension() {

    const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

    if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage
        renderLeads(myLeads)
    }



    tabEl.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            renderLeads(myLeads)
        })
    })


    deleteEl.addEventListener("dblclick", function () {
        localStorage.clear()
        myLeads = []
        renderLeads(myLeads)
    })


    saveButton.addEventListener("click", function () {
        myLeads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)

        console.log(localStorage.getItem("myLeads"));
    })

    function renderLeads(leads) {

        let listItems = ""
        for (let i = 0; i < leads.length; i++) {
            listItems += `
        <li>
            <a target= '_blank' href="${leads[i]}"> 
            ${leads[i]} 
            </a>
        </li>
        `
        }
        ulEl.innerHTML = listItems
    }

}

chromeExtension()