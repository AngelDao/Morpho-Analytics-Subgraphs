import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  PositionsManagerForCompound,
  Borrowed,
  BorrowerPositionUpdated,
  Liquidated,
  Repaid,
  Supplied,
  SupplierPositionUpdated,
  Withdrawn
} from "../generated/PositionsManagerForCompound/PositionsManagerForCompound"
import { DailyDataForMarket, AllTimeDataForMarket } from "../generated/schema"

export function updatePositionsDailyData(event: ethereum.Event): void {

  // Daily Data

  // First we will create an ID based on the current date: this will effectively mean that data for each day will be mapped into a different entity
  // from: https://github.com/QuickSwap/QuickSwap-subgraph/blob/master/src/mappings/dayUpdates.ts
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayIDFormatted = BigInt.fromI32(dayID).toString()

  // Check if entity exists with current date, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let dayData = DailyDataForMarket.load(dayIDFormatted)
  if (dayData == null) {
    dayData = new DailyDataForMarket(dayIDFormatted)
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  dayData.amountAddedOnPool = dayData.amountAddedOnPool.plus(event.params._amountAddedOnPool * event.params._p2pExchangeRate)
  dayData.amountAddedInP2P = dayData.amountAddedInP2P.plus(event.params._amountAddedInP2P * event.params._p2pExchangeRate)
  dayData.amountRemovedFromPool = dayData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool * event.params._p2pExchangeRate)
  dayData.amountRemovedFromP2P = dayData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P * event.params._p2pExchangeRate)

  return dayData as DayData

}

export function updatePositionsAllTimeData(event: ethereum.Event): void {
  // All time data

  // generate the ID based on the cToken address, so that we always have one entity per cToken
  let allTimeID = event.params._cTokenAddress
  let allTimeIDFormatted = allTimeID.toHexString()

  // Check if all time data entity exists, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let allData = AllTimeDataForMarket.load(allTimeIDFormatted)
  if (allData == null) {
    allData = new DailyDataForMarket(allTimeIDFormatted)
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  allData.amountAddedOnPool = allData.amountAddedOnPool.plus(event.params.amountAddedOnPool * event.params._p2pExchangeRate)
  allData.amountAddedInP2P = allData.amountAddedInP2P.plus(event.params.amountAddedInP2P * event.params._p2pExchangeRate)
  allData.amountRemovedFromPool = allData.amountRemovedFromPool.plus(event.params.amountRemovedFromPool * event.params._p2pExchangeRate)
  allData.amountRemovedFromP2P = allData.amountRemovedFromP2P.plus(event.params.amountRemovedFromP2P * event.params._p2pExchangeRate)
  allData.netAmountAddedOnPool = allData.netAmountAddedOnPool.plus(event.params.amountAddedOnPool * event.params._p2pExchangeRate).minus(event.params.amountRemovedFromPool * event.params._p2pExchangeRate)
  allData.netAmountAddedInP2P = allData.netAmountAddedInP2P.plus(event.params.amountAddedInP2P * event.params._p2pExchangeRate).minus(event.params.amountRemovedFromP2P * event.params._p2pExchangeRate)

  return allData as AllData

}

