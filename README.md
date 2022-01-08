
# Morpho Graph Setup

## Build
Run Codegen

	cd Morpho-Analytics-Subgraph-{protocol}
	yarn codegen
	
Deploy

	graph auth --product hosted-service <ACCESS_TOKEN>  
	graph deploy --product hosted-service morpho-labs/Morpho-Analytics-Subgraph-{protocol}

Note: This is as of graph-cli version 0.24, the commands change frequently

## Initial setup guide

Login in with github on the dashboard:
https://thegraph.com/hosted-service/dashboard

Go to the dashboard and switch your account from personal GitHub to Morpho-labs organization

Click "Add Subgraph"

Make sure the `SUBGRAPH NAME` matches the protocol folder name (in the UI you can use spaces instead of dashes)

Remove custom errors from the ABI if needed, see here:
https://github.com/graphprotocol/graph-node/issues/2577
