// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Borrowed extends ethereum.Event {
  get params(): Borrowed__Params {
    return new Borrowed__Params(this);
  }
}

export class Borrowed__Params {
  _event: Borrowed;

  constructor(event: Borrowed) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _cTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class BorrowerPositionUpdated extends ethereum.Event {
  get params(): BorrowerPositionUpdated__Params {
    return new BorrowerPositionUpdated__Params(this);
  }
}

export class BorrowerPositionUpdated__Params {
  _event: BorrowerPositionUpdated;

  constructor(event: BorrowerPositionUpdated) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _cTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amountAddedOnPool(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _amountAddedInP2P(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _amountRemovedFromPool(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _amountRemovedFromP2P(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get _p2pExchangeRate(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get _borrowIndex(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class Liquidated extends ethereum.Event {
  get params(): Liquidated__Params {
    return new Liquidated__Params(this);
  }
}

export class Liquidated__Params {
  _event: Liquidated;

  constructor(event: Liquidated) {
    this._event = event;
  }

  get _liquidator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _liquidatee(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amountRepaid(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _cTokenBorrowedAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get _amountSeized(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _cTokenCollateralAddress(): Address {
    return this._event.parameters[5].value.toAddress();
  }
}

export class Repaid extends ethereum.Event {
  get params(): Repaid__Params {
    return new Repaid__Params(this);
  }
}

export class Repaid__Params {
  _event: Repaid;

  constructor(event: Repaid) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _cTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Supplied extends ethereum.Event {
  get params(): Supplied__Params {
    return new Supplied__Params(this);
  }
}

export class Supplied__Params {
  _event: Supplied;

  constructor(event: Supplied) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _cTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SupplierPositionUpdated extends ethereum.Event {
  get params(): SupplierPositionUpdated__Params {
    return new SupplierPositionUpdated__Params(this);
  }
}

export class SupplierPositionUpdated__Params {
  _event: SupplierPositionUpdated;

  constructor(event: SupplierPositionUpdated) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _cTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amountAddedOnPool(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _amountAddedInP2P(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _amountRemovedFromPool(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _amountRemovedFromP2P(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get _p2pExchangeRate(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get _cTokenExchangeRate(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class Withdrawn extends ethereum.Event {
  get params(): Withdrawn__Params {
    return new Withdrawn__Params(this);
  }
}

export class Withdrawn__Params {
  _event: Withdrawn;

  constructor(event: Withdrawn) {
    this._event = event;
  }

  get _account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _cTokenAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PositionsManagerForCompound__borrowBalanceInOfResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PositionsManagerForCompound__supplyBalanceInOfResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class PositionsManagerForCompound extends ethereum.SmartContract {
  static bind(address: Address): PositionsManagerForCompound {
    return new PositionsManagerForCompound(
      "PositionsManagerForCompound",
      address
    );
  }

  CTOKEN_DECIMALS(): i32 {
    let result = super.call("CTOKEN_DECIMALS", "CTOKEN_DECIMALS():(uint8)", []);

    return result[0].toI32();
  }

  try_CTOKEN_DECIMALS(): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "CTOKEN_DECIMALS",
      "CTOKEN_DECIMALS():(uint8)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  NMAX(): i32 {
    let result = super.call("NMAX", "NMAX():(uint16)", []);

    return result[0].toI32();
  }

  try_NMAX(): ethereum.CallResult<i32> {
    let result = super.tryCall("NMAX", "NMAX():(uint16)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  accountMembership(param0: Address, param1: Address): boolean {
    let result = super.call(
      "accountMembership",
      "accountMembership(address,address):(bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBoolean();
  }

  try_accountMembership(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "accountMembership",
      "accountMembership(address,address):(bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  borrowBalanceInOf(
    param0: Address,
    param1: Address
  ): PositionsManagerForCompound__borrowBalanceInOfResult {
    let result = super.call(
      "borrowBalanceInOf",
      "borrowBalanceInOf(address,address):(uint256,uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return new PositionsManagerForCompound__borrowBalanceInOfResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_borrowBalanceInOf(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<PositionsManagerForCompound__borrowBalanceInOfResult> {
    let result = super.tryCall(
      "borrowBalanceInOf",
      "borrowBalanceInOf(address,address):(uint256,uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PositionsManagerForCompound__borrowBalanceInOfResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  comptroller(): Address {
    let result = super.call("comptroller", "comptroller():(address)", []);

    return result[0].toAddress();
  }

  try_comptroller(): ethereum.CallResult<Address> {
    let result = super.tryCall("comptroller", "comptroller():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createMarket(_cTokenAddress: Address): Array<BigInt> {
    let result = super.call(
      "createMarket",
      "createMarket(address):(uint256[])",
      [ethereum.Value.fromAddress(_cTokenAddress)]
    );

    return result[0].toBigIntArray();
  }

  try_createMarket(
    _cTokenAddress: Address
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "createMarket",
      "createMarket(address):(uint256[])",
      [ethereum.Value.fromAddress(_cTokenAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  enteredMarkets(param0: Address, param1: BigInt): Address {
    let result = super.call(
      "enteredMarkets",
      "enteredMarkets(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_enteredMarkets(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "enteredMarkets",
      "enteredMarkets(address,uint256):(address)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  marketsManagerForCompound(): Address {
    let result = super.call(
      "marketsManagerForCompound",
      "marketsManagerForCompound():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_marketsManagerForCompound(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "marketsManagerForCompound",
      "marketsManagerForCompound():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  supplyBalanceInOf(
    param0: Address,
    param1: Address
  ): PositionsManagerForCompound__supplyBalanceInOfResult {
    let result = super.call(
      "supplyBalanceInOf",
      "supplyBalanceInOf(address,address):(uint256,uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return new PositionsManagerForCompound__supplyBalanceInOfResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_supplyBalanceInOf(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<PositionsManagerForCompound__supplyBalanceInOfResult> {
    let result = super.tryCall(
      "supplyBalanceInOf",
      "supplyBalanceInOf(address,address):(uint256,uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PositionsManagerForCompound__supplyBalanceInOfResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }

  threshold(param0: Address): BigInt {
    let result = super.call("threshold", "threshold(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_threshold(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("threshold", "threshold(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  updatePositions(): Address {
    let result = super.call(
      "updatePositions",
      "updatePositions():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_updatePositions(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "updatePositions",
      "updatePositions():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _compoundMarketsManager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _proxyComptrollerAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _updatePositionsAddress(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class BorrowCall extends ethereum.Call {
  get inputs(): BorrowCall__Inputs {
    return new BorrowCall__Inputs(this);
  }

  get outputs(): BorrowCall__Outputs {
    return new BorrowCall__Outputs(this);
  }
}

export class BorrowCall__Inputs {
  _call: BorrowCall;

  constructor(call: BorrowCall) {
    this._call = call;
  }

  get _cTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class BorrowCall__Outputs {
  _call: BorrowCall;

  constructor(call: BorrowCall) {
    this._call = call;
  }
}

export class CreateMarketCall extends ethereum.Call {
  get inputs(): CreateMarketCall__Inputs {
    return new CreateMarketCall__Inputs(this);
  }

  get outputs(): CreateMarketCall__Outputs {
    return new CreateMarketCall__Outputs(this);
  }
}

export class CreateMarketCall__Inputs {
  _call: CreateMarketCall;

  constructor(call: CreateMarketCall) {
    this._call = call;
  }

  get _cTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class CreateMarketCall__Outputs {
  _call: CreateMarketCall;

  constructor(call: CreateMarketCall) {
    this._call = call;
  }

  get value0(): Array<BigInt> {
    return this._call.outputValues[0].value.toBigIntArray();
  }
}

export class LiquidateCall extends ethereum.Call {
  get inputs(): LiquidateCall__Inputs {
    return new LiquidateCall__Inputs(this);
  }

  get outputs(): LiquidateCall__Outputs {
    return new LiquidateCall__Outputs(this);
  }
}

export class LiquidateCall__Inputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }

  get _cTokenBorrowedAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _cTokenCollateralAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _borrower(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class LiquidateCall__Outputs {
  _call: LiquidateCall;

  constructor(call: LiquidateCall) {
    this._call = call;
  }
}

export class RepayCall extends ethereum.Call {
  get inputs(): RepayCall__Inputs {
    return new RepayCall__Inputs(this);
  }

  get outputs(): RepayCall__Outputs {
    return new RepayCall__Outputs(this);
  }
}

export class RepayCall__Inputs {
  _call: RepayCall;

  constructor(call: RepayCall) {
    this._call = call;
  }

  get _cTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RepayCall__Outputs {
  _call: RepayCall;

  constructor(call: RepayCall) {
    this._call = call;
  }
}

export class SetMaxNumberOfUsersInTreeCall extends ethereum.Call {
  get inputs(): SetMaxNumberOfUsersInTreeCall__Inputs {
    return new SetMaxNumberOfUsersInTreeCall__Inputs(this);
  }

  get outputs(): SetMaxNumberOfUsersInTreeCall__Outputs {
    return new SetMaxNumberOfUsersInTreeCall__Outputs(this);
  }
}

export class SetMaxNumberOfUsersInTreeCall__Inputs {
  _call: SetMaxNumberOfUsersInTreeCall;

  constructor(call: SetMaxNumberOfUsersInTreeCall) {
    this._call = call;
  }

  get _newMaxNumber(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class SetMaxNumberOfUsersInTreeCall__Outputs {
  _call: SetMaxNumberOfUsersInTreeCall;

  constructor(call: SetMaxNumberOfUsersInTreeCall) {
    this._call = call;
  }
}

export class SetThresholdCall extends ethereum.Call {
  get inputs(): SetThresholdCall__Inputs {
    return new SetThresholdCall__Inputs(this);
  }

  get outputs(): SetThresholdCall__Outputs {
    return new SetThresholdCall__Outputs(this);
  }
}

export class SetThresholdCall__Inputs {
  _call: SetThresholdCall;

  constructor(call: SetThresholdCall) {
    this._call = call;
  }

  get _cTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _newThreshold(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetThresholdCall__Outputs {
  _call: SetThresholdCall;

  constructor(call: SetThresholdCall) {
    this._call = call;
  }
}

export class SupplyCall extends ethereum.Call {
  get inputs(): SupplyCall__Inputs {
    return new SupplyCall__Inputs(this);
  }

  get outputs(): SupplyCall__Outputs {
    return new SupplyCall__Outputs(this);
  }
}

export class SupplyCall__Inputs {
  _call: SupplyCall;

  constructor(call: SupplyCall) {
    this._call = call;
  }

  get _cTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SupplyCall__Outputs {
  _call: SupplyCall;

  constructor(call: SupplyCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _cTokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}