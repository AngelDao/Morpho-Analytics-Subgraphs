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

export class PricePosted extends ethereum.Event {
  get params(): PricePosted__Params {
    return new PricePosted__Params(this);
  }
}

export class PricePosted__Params {
  _event: PricePosted;

  constructor(event: PricePosted) {
    this._event = event;
  }

  get asset(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get previousPriceMantissa(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get requestedPriceMantissa(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get newPriceMantissa(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Oracle extends ethereum.SmartContract {
  static bind(address: Address): Oracle {
    return new Oracle("Oracle", address);
  }

  assetPrices(asset: Address): BigInt {
    let result = super.call("assetPrices", "assetPrices(address):(uint256)", [
      ethereum.Value.fromAddress(asset)
    ]);

    return result[0].toBigInt();
  }

  try_assetPrices(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "assetPrices",
      "assetPrices(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUnderlyingPrice(cToken: Address): BigInt {
    let result = super.call(
      "getUnderlyingPrice",
      "getUnderlyingPrice(address):(uint256)",
      [ethereum.Value.fromAddress(cToken)]
    );

    return result[0].toBigInt();
  }

  try_getUnderlyingPrice(cToken: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getUnderlyingPrice",
      "getUnderlyingPrice(address):(uint256)",
      [ethereum.Value.fromAddress(cToken)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isPriceOracle(): boolean {
    let result = super.call("isPriceOracle", "isPriceOracle():(bool)", []);

    return result[0].toBoolean();
  }

  try_isPriceOracle(): ethereum.CallResult<boolean> {
    let result = super.tryCall("isPriceOracle", "isPriceOracle():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class SetDirectPriceCall extends ethereum.Call {
  get inputs(): SetDirectPriceCall__Inputs {
    return new SetDirectPriceCall__Inputs(this);
  }

  get outputs(): SetDirectPriceCall__Outputs {
    return new SetDirectPriceCall__Outputs(this);
  }
}

export class SetDirectPriceCall__Inputs {
  _call: SetDirectPriceCall;

  constructor(call: SetDirectPriceCall) {
    this._call = call;
  }

  get asset(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetDirectPriceCall__Outputs {
  _call: SetDirectPriceCall;

  constructor(call: SetDirectPriceCall) {
    this._call = call;
  }
}

export class SetUnderlyingPriceCall extends ethereum.Call {
  get inputs(): SetUnderlyingPriceCall__Inputs {
    return new SetUnderlyingPriceCall__Inputs(this);
  }

  get outputs(): SetUnderlyingPriceCall__Outputs {
    return new SetUnderlyingPriceCall__Outputs(this);
  }
}

export class SetUnderlyingPriceCall__Inputs {
  _call: SetUnderlyingPriceCall;

  constructor(call: SetUnderlyingPriceCall) {
    this._call = call;
  }

  get cToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get underlyingPriceMantissa(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetUnderlyingPriceCall__Outputs {
  _call: SetUnderlyingPriceCall;

  constructor(call: SetUnderlyingPriceCall) {
    this._call = call;
  }
}
