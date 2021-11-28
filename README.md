
## Morpho Graph Setup

Initialize with address of positions manager

	graph init --product hosted-service --from-contract 0xdef2d58c17c340ad572e2c94549ba56e8c2e1c2f

For ABI enter
	
	PositionsManagerForCompound.json

For Contract name

	PositionsManagerForCompound

Input during the initialization. The first part of the subgraph name is the Github organization name. 

	Subgraph name · morpho-labs/Positions-Manager-Compound-Subgraph
	Directory to create the subgraph in · PositionsManagerForCompound
	Ethereum network · ropsten
	Contract address · 0xdef2d58c17c340ad572e2c94549ba56e8c2e1c2f
	Contract Name · PositionsManagerForCompound


Login in with github on the dashboard:
https://thegraph.com/hosted-service/dashboard

Go to the dashboard and switch your account from personal GitHub to Morpho-labs organization

Click "Add Subgraph"

Make sure the `SUBGRAPH NAME` matches the one above (in the UI you can use spaces instead of dashes)

Remove custom errors from the ABI if needed, see here:
https://github.com/graphprotocol/graph-node/issues/2577

Run Codegen

	cd Positions-Manager-Compound-Subgraph
	yarn codegen
	
Deploy

	graph auth --product hosted-service <ACCESS_TOKEN>  
	graph deploy --product hosted-service morpho-labs/Positions-Manager-Compound-Subgraph

Note: This is as of graph-cli version 0.24, the commands change frequently