import { BigInt, ethereum, Address } from "@graphprotocol/graph-ts"
import {
  PositionsManagerForCompound,
  BorrowerPositionUpdated,
  SupplierPositionUpdated,
} from "../generated/PositionsManagerForCompound/PositionsManagerForCompound"
import { cERC20 } from "../generated/PositionsManagerForCompound/cERC20";
import { ERC20 } from "../generated/PositionsManagerForCompound/ERC20";
import { Comptroller } from "../generated/PositionsManagerForCompound/Comptroller";
import { Oracle } from "../generated/PositionsManagerForCompound/Oracle";
import { MarketsManager } from "../generated/PositionsManagerForCompound/MarketsManager";

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

  const marketAddress = event.params._cTokenAddress;

  // create contract instance to get on-chain data
  const cERC20Contract = cERC20.bind(marketAddress);
  const underlyingAddress = cERC20Contract.underlying();
  const ERC20Contract = ERC20.bind(underlyingAddress);

  const comptrollerContract = Comptroller.bind(cERC20Contract.comptroller());
  const oracleContractAddress = comptrollerContract.oracle();

  const oracleContract = Oracle.bind(oracleContractAddress);
  const marketsManagerContract = MarketsManager.bind(Address.fromString("0x5bae704A7Ee0B670c65461F2E15A4c93676190c9"));

  const usd = oracleContract.getUnderlyingPrice(marketAddress);
  log.info(
    "USD price underlying {}",
    [usd.toString()]
  );

  const midRate = marketsManagerContract.p2pBPY(marketAddress);
  log.info(
    "midRate {}",
    [midRate.toString()]
  );

  const minBorrowAPY = cERC20Contract.borrowRatePerBlock()
  log.info(
    "minBorrowAPY {}",
    [minBorrowAPY.toString()]
  );

  const minSupplyAPY = cERC20Contract.supplyRatePerBlock()
  log.info(
    "minSupplyAPY {}",
    [minSupplyAPY.toString()]
  );

  // multiply amounts by exchange rate
  // from https://www.notion.so/morpho-labs/Compound-Protocol-cfc633dc14e845d1b18b65b1658f77e2 
  dayData.amountAddedOnPool = dayData.amountAddedOnPool.plus(event.params._amountAddedOnPool)
  dayData.amountAddedInP2P = dayData.amountAddedInP2P.plus(event.params._amountAddedInP2P)
  dayData.amountRemovedFromPool = dayData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool)
  dayData.amountRemovedFromP2P = dayData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P)

  dayData.netAmountAddedOnPool = dayData.netAmountAddedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  dayData.netAmountAddedInP2P = dayData.netAmountAddedInP2P.plus(event.params._amountAddedInP2P).minus(event.params._amountRemovedFromP2P)

  // for borrow position 
  dayData.netAmountBorrowedOnPool = dayData.netAmountBorrowedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  dayData.amountBorrowedOnPool = dayData.amountBorrowedOnPool.plus(event.params._amountAddedOnPool)

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
    
    let allData = AllTimeDataForMarket.load(event.params._cTokenAddress.toHexString())
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
  dayData.amountAddedOnPool = dayData.amountAddedOnPool.plus(event.params._amountAddedOnPool)
  dayData.amountAddedInP2P = dayData.amountAddedInP2P.plus(event.params._amountAddedInP2P)
  dayData.amountRemovedFromPool = dayData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool)
  dayData.amountRemovedFromP2P = dayData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P)

  // for supplier position 
  dayData.netAmountSuppliedOnPool = dayData.netAmountSuppliedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  dayData.amountSuppliedOnPool = dayData.amountSuppliedOnPool.plus(event.params._amountAddedOnPool)

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

    let allData = AllTimeDataForMarket.load(event.params._cTokenAddress.toHexString())
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
  allData.amountAddedOnPool = allData.amountAddedOnPool.plus(event.params._amountAddedOnPool)
  allData.amountAddedInP2P = allData.amountAddedInP2P.plus(event.params._amountAddedInP2P)
  allData.amountRemovedFromPool = allData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool)
  allData.amountRemovedFromP2P = allData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P)
  allData.netAmountAddedOnPool = allData.netAmountAddedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  allData.netAmountAddedInP2P = allData.netAmountAddedInP2P.plus(event.params._amountAddedInP2P).minus(event.params._amountRemovedFromP2P)

  //borrower
  allData.netAmountBorrowedOnPool = allData.netAmountBorrowedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  allData.amountBorrowedOnPool = allData.amountBorrowedOnPool.plus(event.params._amountAddedOnPool)

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
  allData.amountAddedOnPool = allData.amountAddedOnPool.plus(event.params._amountAddedOnPool)
  allData.amountAddedInP2P = allData.amountAddedInP2P.plus(event.params._amountAddedInP2P)
  allData.amountRemovedFromPool = allData.amountRemovedFromPool.plus(event.params._amountRemovedFromPool)
  allData.amountRemovedFromP2P = allData.amountRemovedFromP2P.plus(event.params._amountRemovedFromP2P)
  allData.netAmountAddedOnPool = allData.netAmountAddedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  allData.netAmountAddedInP2P = allData.netAmountAddedInP2P.plus(event.params._amountAddedInP2P).minus(event.params._amountRemovedFromP2P)

  //supplier
  allData.netAmountSuppliedOnPool = allData.netAmountSuppliedOnPool.plus(event.params._amountAddedOnPool).minus(event.params._amountRemovedFromPool)
  allData.amountSuppliedOnPool = allData.amountSuppliedOnPool.plus(event.params._amountAddedOnPool)

  return allData as AllTimeDataForMarket

}
