import { BigInt, ethereum, Address } from "@graphprotocol/graph-ts"
import {
  PositionsManagerForAave,
  BorrowerPositionUpdated,
  SupplierPositionUpdated,
} from "../generated/PositionsManagerForAave/PositionsManagerForAave"

import { DailyDataForMarket, AllTimeDataForMarket, User } from "../generated/schema"
import { log } from "@graphprotocol/graph-ts/index";
  // I tried to do this with two functions using event: ethereum.Event like:
  // export function updatePositionsDailyData(event: ethereum.Event): DailyDataForMarket {
  // but it was giving a bunch of errors

export function updatePositionsDailyDataBorrow(event: BorrowerPositionUpdated): DailyDataForMarket {

  // Daily Data

  // First we will create an ID based on the current date: this will effectively mean that data for each day will be mapped into a different entity
  // from: https://github.com/QuickSwap/QuickSwap-subgraph/blob/master/src/mappings/dayUpdates.ts
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayIDFormatted = event.params._poolTokenAddress
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(dayID).toString())

  // Check if entity exists with current date, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let dayData = DailyDataForMarket.load(dayIDFormatted)
  if (dayData == null) {
    dayData = new DailyDataForMarket(dayIDFormatted)
    dayData.poolTokenAddress = event.params._poolTokenAddress
    dayData.startingBorrowBalanceOnPool = event.params._balanceOnPool
    dayData.startingBorrowBalanceInP2P = event.params._balanceInP2P
  }

  // for borrow position 
  dayData.netBorrowAddedOnPool = event.params._balanceOnPool.minus(dayData.startingBorrowBalanceOnPool)
  dayData.netBorrowAddedInP2P = event.params._balanceInP2P.minus(dayData.startingBorrowBalanceInP2P)

  //user and date
  const day = event.block.timestamp.toI32() / 86400
  const date = day * 86400

  if (!dayData.date) {
    dayData.date = date
  }

  let userData = User.load(event.params._account.toHexString())
  if (userData == null) {

    userData = new User(event.params._account.toHexString())
    userData.date = date
    userData.save()

    dayData.userCount = dayData.userCount.plus(BigInt.fromI32(1))
    dayData.newUsers = dayData.newUsers.plus(BigInt.fromI32(1))
    
    let allData = AllTimeDataForMarket.load(event.params._poolTokenAddress.toHexString())
    if (allData){
      allData.userCount = allData.userCount.plus(BigInt.fromI32(1))
      allData.save()
    }

  } else {
    if (userData.date <= dayData.date ){
      userData.date = date
      userData.save()
      dayData.userCount = dayData.userCount.plus(BigInt.fromI32(1))
    } else {
      userData.date = date
      userData.save()
    }
  }


  return dayData as DailyDataForMarket

}
export function updatePositionsDailyDataSupply(event: SupplierPositionUpdated): DailyDataForMarket {

  // Daily Data

  // First we will create an ID based on the current date: this will effectively mean that data for each day will be mapped into a different entity
  // from: https://github.com/QuickSwap/QuickSwap-subgraph/blob/master/src/mappings/dayUpdates.ts
  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayIDFormatted = event.params._poolTokenAddress
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(dayID).toString())

  // Check if entity exists with current date, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let dayData = DailyDataForMarket.load(dayIDFormatted)
  if (dayData == null) {
    dayData = new DailyDataForMarket(dayIDFormatted)
    dayData.poolTokenAddress = event.params._poolTokenAddress
    dayData.startingSupplyBalanceOnPool = event.params._balanceOnPool
    dayData.startingSupplyBalanceInP2P = event.params._balanceInP2P
  }

  // for supply position 
  dayData.netSupplyAddedOnPool = event.params._balanceOnPool.minus(dayData.startingSupplyBalanceOnPool)
  dayData.netSupplyAddedInP2P = event.params._balanceInP2P.minus(dayData.startingSupplyBalanceInP2P)

  //user and date

  const day = event.block.timestamp.toI32() / 86400
  const date = day * 86400

  if (!dayData.date) {
    dayData.date = date
  }

  let userData = User.load(event.params._account.toHexString())
  if (userData == null) {

    userData = new User(event.params._account.toHexString())
    userData.date = date
    userData.save()

    dayData.userCount = dayData.userCount.plus(BigInt.fromI32(1))
    dayData.newUsers = dayData.newUsers.plus(BigInt.fromI32(1))

    let allData = AllTimeDataForMarket.load(event.params._poolTokenAddress.toHexString())
    if (allData){
      allData.userCount = allData.userCount.plus(BigInt.fromI32(1))
      allData.save()
    }

  } else {
    if (userData.date <= dayData.date ){
      userData.date = date
      userData.save()
      dayData.userCount = dayData.userCount.plus(BigInt.fromI32(1))
    } else {
      userData.date = date
      userData.save()
    }
  }

  return dayData as DailyDataForMarket

}
export function updatePositionsAllTimeDataBorrow(event: BorrowerPositionUpdated): AllTimeDataForMarket {
  // All time data

  // generate the ID based on the cToken address, so that we always have one entity per cToken
  let allTimeID = event.params._poolTokenAddress
  let allTimeIDFormatted = allTimeID.toHexString()

  // Check if all time data entity exists, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let allData = AllTimeDataForMarket.load(allTimeIDFormatted)
  if (allData == null) {
    allData = new AllTimeDataForMarket(allTimeIDFormatted)
    allData.poolTokenAddress = event.params._poolTokenAddress
  }

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  allData.netBorrowAddedOnPool = event.params._balanceOnPool
  allData.netBorrowAddedInP2P = event.params._balanceInP2P

  return allData as AllTimeDataForMarket

}
export function updatePositionsAllTimeDataSupply(event: SupplierPositionUpdated): AllTimeDataForMarket {
  // All time data

  // generate the ID based on the cToken address, so that we always have one entity per cToken
  let allTimeID = event.params._poolTokenAddress
  let allTimeIDFormatted = allTimeID.toHexString()

  // Check if all time data entity exists, otherwise make one
  // from https://thegraph.com/docs/developer/assemblyscript-api#store-api
  let allData = AllTimeDataForMarket.load(allTimeIDFormatted)
  if (allData == null) {
    allData = new AllTimeDataForMarket(allTimeIDFormatted)
    allData.poolTokenAddress = event.params._poolTokenAddress
  }

  allData.netSupplyAddedOnPool = event.params._balanceOnPool
  allData.netSupplyAddedInP2P = event.params._balanceInP2P

  return allData as AllTimeDataForMarket

}
