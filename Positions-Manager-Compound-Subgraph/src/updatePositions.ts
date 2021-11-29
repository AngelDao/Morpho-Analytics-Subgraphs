import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  PositionsManagerForCompound,
  BorrowerPositionUpdated,
  SupplierPositionUpdated,
} from "../generated/PositionsManagerForCompound/PositionsManagerForCompound"
import { DailyDataForMarket, AllTimeDataForMarket } from "../generated/schema"

  // I tried to do this with two functions using event: ethereum.Event like:
  // export function updatePositionsDailyData(event: ethereum.Event): DailyDataForMarket {
  // but it was giving a bunch of errors

export function updatePositionsDailyDataBorrow(event: BorrowerPositionUpdated): DailyDataForMarket {

  // Daily Data

  // First we will create an ID based on the current date: this will effectively mean that data for each day will be mapped into a different entity
  // from: https://github.com/QuickSwap/QuickSwap-subgraph/blob/master/src/mappings/dayUpdates.ts
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayIDFormatted = event.params._cTokenAddress
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(dayID).toString())

  // Check if entity exists with current date, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let dayData = DailyDataForMarket.load(dayIDFormatted)
  if (dayData == null) {
    dayData = new DailyDataForMarket(dayIDFormatted)
    dayData.cTokenAddress = event.params._cTokenAddress
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  dayData.amountAddedOnPool = dayData.amountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate)
  dayData.amountAddedInP2P = dayData.amountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate)
  dayData.amountRemovedFromPool = dayData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  dayData.amountRemovedFromP2P = dayData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)

  return dayData as DailyDataForMarket

}
export function updatePositionsDailyDataSupply(event: SupplierPositionUpdated): DailyDataForMarket {

  // Daily Data

  // First we will create an ID based on the current date: this will effectively mean that data for each day will be mapped into a different entity
  // from: https://github.com/QuickSwap/QuickSwap-subgraph/blob/master/src/mappings/dayUpdates.ts
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayIDFormatted = event.params._cTokenAddress
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(dayID).toString())

  // Check if entity exists with current date, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let dayData = DailyDataForMarket.load(dayIDFormatted)
  if (dayData == null) {
    dayData = new DailyDataForMarket(dayIDFormatted)
    dayData.cTokenAddress = event.params._cTokenAddress
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  dayData.amountAddedOnPool = dayData.amountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate)
  dayData.amountAddedInP2P = dayData.amountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate)
  dayData.amountRemovedFromPool = dayData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  dayData.amountRemovedFromP2P = dayData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)

  return dayData as DailyDataForMarket

}
export function updatePositionsAllTimeDataBorrow(event: BorrowerPositionUpdated): AllTimeDataForMarket {
  // All time data

  // generate the ID based on the cToken address, so that we always have one entity per cToken
  let allTimeID = event.params._cTokenAddress
  let allTimeIDFormatted = allTimeID.toHexString()

  // Check if all time data entity exists, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let allData = AllTimeDataForMarket.load(allTimeIDFormatted)
  if (allData == null) {
    allData = new AllTimeDataForMarket(allTimeIDFormatted)
    allData.cTokenAddress = event.params._cTokenAddress
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  allData.amountAddedOnPool = allData.amountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate)
  allData.amountAddedInP2P = allData.amountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate)
  allData.amountRemovedFromPool = allData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  allData.amountRemovedFromP2P = allData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)
  allData.netAmountAddedOnPool = allData.netAmountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate).minus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  allData.netAmountAddedInP2P = allData.netAmountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate).minus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)

  return allData as AllTimeDataForMarket

}
export function updatePositionsAllTimeDataSupply(event: SupplierPositionUpdated): AllTimeDataForMarket {
  // All time data

  // generate the ID based on the cToken address, so that we always have one entity per cToken
  let allTimeID = event.params._cTokenAddress
  let allTimeIDFormatted = allTimeID.toHexString()

  // Check if all time data entity exists, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let allData = AllTimeDataForMarket.load(allTimeIDFormatted)
  if (allData == null) {
    allData = new AllTimeDataForMarket(allTimeIDFormatted)
    allData.cTokenAddress = event.params._cTokenAddress
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  allData.amountAddedOnPool = allData.amountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate)
  allData.amountAddedInP2P = allData.amountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate)
  allData.amountRemovedFromPool = allData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  allData.amountRemovedFromP2P = allData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)
  allData.netAmountAddedOnPool = allData.netAmountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate).minus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  allData.netAmountAddedInP2P = allData.netAmountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate).minus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)

  return allData as AllTimeDataForMarket

}
