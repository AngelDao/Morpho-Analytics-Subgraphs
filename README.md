
## Morpho Graph Setup

Initialize with address of positions manager

	graph init --product hosted-service --from-contract 0x8B40bbA14b0DcC3C824389433F4123D093a8f8CB

Login in with github on the dashboard:
https://thegraph.com/hosted-service/dashboard

Go to the dashboard and switch your account from personal GitHub to Morpho-labs organization

Click "Add Subgraph"

Make sure the `SUBGRAPH NAME` matches the one below (in the UI you can use spaces instead of dashes)

Input during the initialization. The first part of the subgraph name is the Github organization name. 

	Subgraph name · morpho-labs/Positions-Manager-For-Cream
	Directory to create the subgraph in · PositionManagerForCream
	Ethereum network · ropsten
	Contract address · 0x8B40bbA14b0DcC3C824389433F4123D093a8f8CB
	Contract Name · MorphoPositionsManagerForCream

Remove custom errors from the ABI, see here:
https://github.com/graphprotocol/graph-node/issues/2577

Run Codegen

	cd Positions-Manager-For-Cream
	yarn codegen
	
Deploy

	graph auth --product hosted-service <ACCESS_TOKEN>  
	graph deploy --product hosted-service morpho-labs/Positions-Manager-For-Cream
