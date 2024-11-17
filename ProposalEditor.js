import { Proposal } from './Proposal.js';

class ProposalEditor extends HTMLElement {
    constructor() {
        super();
        this.proposals = [];

        this.innerHTML = `
        <div class="Proposals">
            <h2 id="Proposal-Title" contenteditable="true">Enter Proposal</h2>
            <textarea id="Proposal-Text" placeholder="Start Writing Proposal..."></textarea>
            <button id="Create-Proposal"> Create Proposal </button>
        </div>
        <div class="Proposal-Previews">
            <ul id="Proposals-List">
                <h3 id="Proposal-1" contenteditable="false">Sections </h3>
            </ul>
        </div>
        `;

        this.querySelector("#Create-Proposal").addEventListener('click', () => this.updateProposalList());
    }

    addProposal(proposal) {
        const propObj = new Proposal(proposal.getProposalText(), proposal.getProposalName());

        this.proposals.push(propObj);
    }

    findProposalByName(name) {
        console.log("Finding proposal " + name);
        for (let proposal of this.proposals) {
            if (proposal.getProposalName().toLowerCase() === name.toLowerCase()) {
                console.log("Found proposal" + proposal.getProposalName() + " " + proposal.getProposalText());
                return proposal;
            }
        }
    }

    updateProposalList() {
        self - this;
        console.log("Updating proposal list");
        const proposalName = document.getElementById("Proposal-Title").textContent;
        console.log("Adding proposal: " + proposalName);
        const proposalText = document.getElementById("Proposal-Text").value;
        console.log("Adding proposal: " + proposalText);

        const prop = new Proposal(proposalText, proposalName);
        this.addProposal(prop);

        const proposalsList = document.getElementById('Proposals-List');
        const newProposal = document.createElement('button');
        console.log(proposalName);
        newProposal.innerHTML = proposalName;
        newProposal.contentEditable = 'false';
        proposalsList.appendChild(newProposal);
        proposalsList.appendChild(document.createElement("br"));
        const temp = this.findProposalByName("Enter Proposal");
        console.log(`temp = ${temp.getProposalName()}`);
        console.log(`temp = ${temp.getProposalText()}`);
        
        newProposal.addEventListener("click", (event) => {
            const clickedProposal = event.target.textContent;
            console.log(`clickedProposalName, ${clickedProposal}`);

            const matchingProp = this.findProposalByName(clickedProposal);
    
            // Retrieve the content from the Map based on the header's text
            //const proposalContent = proposalMap.get(clickedProposal);
    
            //Update the current proposal textarea and title with the proposal name and content of the clicked element
            this.updateCurrentProposal(matchingProp);
    
            // Display the content
            // if (proposalContent != null) {
            //     document.getElementById('Proposal-Text').value = proposalContent;
            // } else {
            //     console.log("Proposal content not found.");
            // }
        });

        // newProposal.classList.add("Proposal-Header");
        
        // Set default text for the new proposal
        // newProposal.innerText = currentProposalTitle.textContent;
        // Append the new proposal to the proposals list
        
    };

    /* Helper method to update the title and text of the proposal currently being displayed */
    updateCurrentProposal(proposal) {
        document.getElementById("Proposal-Title").textContent = proposal.getProposalName();
        document.getElementById("Proposal-Text").value = proposal.getProposalText();
    }

    
}

customElements.define("proposal-editor", ProposalEditor);