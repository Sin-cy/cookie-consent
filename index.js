
const modal = document.getElementById("modal")
const modalCloseBtn = document.getElementById("modal-close-btn")
const consentForm = document.getElementById("consent-form")
const modalLoading = document.getElementById("modal-text")
const userName = document.getElementById("name")
const declineBtn = document.getElementById("decline-btn") 
const modalChoiceBtns = document.getElementById("modal-choice-btns")

setTimeout(function(){
	modal.style.display = "inline"
},1500)


modalCloseBtn.addEventListener("click", () => {
	console.log("cakdad"),
	modal.style.display = "none"
})


consentForm.addEventListener("submit", (e)=> {
	console.log("Form submitted")
	e.preventDefault()
	
	modalLoading.innerHTML = `
        <div class="modal-inner-loading">
            <img src="images/loading.svg" class="loading">
            <p id="uploadText">
                Uploading your data to the dark web...
            </p>
        </div>
	`

    setTimeout(function(){
        document.getElementById("uploadText").innerText = `Making the sale...`
    },1500)
    
    //Pull User name into Outro
    
    const userData = new FormData(consentForm).get("name")
    setTimeout(function() {
        document.getElementById("modal-inner").innerHTML = `
            <h2>Thanks <span class="modal-display-name">${userData}</span> you sucker! </h2>
            <p>We just sold the rights to your eternal soul.</p>
            <div class="idiot-gif">
                <img src="images/rickmorty.gif">
            </div> 
        `
        modalCloseBtn.disabled = false
    
    },3000)
})

declineBtn.addEventListener("mouseover",() => {
    modalChoiceBtns.classList.toggle('reverse-modal-choice-btns')
    console.log("hovered")
})

// NOTE:  Block Animation Logic

window.addEventListener("DOMContentLoaded",() => {

    const blockContainer = document.getElementById("blocks")
    const blockSize = 30

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    const numRows = Math.ceil(screenHeight / blockSize)
    const numCols = Math.ceil(screenWidth / blockSize)
    const numBlocks = numCols * numRows


    function blockBuilder() {
        for (let i = 0; i < numBlocks; i++ ){
            const block = document.createElement("div")
            block.classList.add("block")
            block.dataset.index = i
            block.addEventListener("mousemove", hlNeighborBlocks)
            blockContainer.appendChild(block)

        }
        console.log("block created")
    }

    function hlNeighborBlocks() {
        const index = parseInt(this.dataset.index);
        const neighbors = [
            index - 1,
            index + 1,
            index - numCols,
            index + numCols,
            index - numCols - 1,
            index - numCols + 1,
            index + numCols - 1,
            index + numCols + 1,
        ].filter(
            (i) => 
                i >= 0 &&
                i < numBlocks &&
                Math.abs((i % numCols) - (index % numCols)) <= 1
        );

        this.classList.add("highlight")
        setTimeout(() => {
            this.classList.remove("highlight")
        },500)

        shuffleList(neighbors)

            .slice(0,1)
            .forEach((nPosition) => {
                const neighbor = blockContainer.children[nPosition];

                if (neighbor) {
                    neighbor.classList.add("highlight")
                    setTimeout(() => {
                        neighbor.classList.remove("highlight")
                    },500)
                }
            })
    }

    function shuffleList(array) {
        for (let i = array.length -1; i > 0; i--) {
            const z = Math.floor(Math.random() * (i + 1));
            [array[i], array[z]] = [array[z], array[i]]
        }
        return array
    }
    blockBuilder()
})

