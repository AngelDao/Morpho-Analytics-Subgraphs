import { BigInt } from "@graphprotocol/graph-ts"
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
import { updatePositionsDailyDataBorrow, updatePositionsDailyDataSupply, updatePositionsAllTimeDataBorrow, updatePositionsAllTimeDataSupply } from './updatePositions'


export function handleBorrowerPositionUpdated(
  event: BorrowerPositionUpdated
): void {

  let DailyData = updatePositionsDailyDataBorrow(event)
  DailyData.save()

  let AllData = updatePositionsAllTimeDataBorrow(event)
  AllData.save()

}


export function handleSupplierPositionUpdated(
  event: SupplierPositionUpdated
): void {

  let DailyData = updatePositionsDailyDataSupply(event)
  DailyData.save()

  let AllData = updatePositionsAllTimeDataSupply(event)
  AllData.save()

}

