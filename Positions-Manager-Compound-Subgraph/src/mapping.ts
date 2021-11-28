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
import { updatePositionsDailyData, updatePositionsAllTimeData } from './updatePositions'


export function handleBorrowerPositionUpdated(
  event: BorrowerPositionUpdated
): void {

  let DailyData = updatePairDayData(BorrowerPositionUpdated)
  DailyData.save()

  let AllData = updatePositionsAllTimeData(BorrowerPositionUpdated)
  AllData.save()

}


export function handleSupplierPositionUpdated(
  event: SupplierPositionUpdated
): void {

  let DailyData = updatePairDayData(SupplierPositionUpdated)
  DailyData.save()

  let AllData = updatePositionsAllTimeData(SupplierPositionUpdated)
  AllData.save()
  
}

