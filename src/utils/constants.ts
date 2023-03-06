import {
    Num,
    Addr,
} from '../types/constants';
import {
    Bytes,
    BigDecimal,
} from "@graphprotocol/graph-ts";


// Numbers
export const DECIMALS = 7;
export const LAUNCH_TIMESTAMP_AVAX = 1638483222;
export const NUM: Num = {
    ZERO: BigDecimal.fromString('0'),
    ONE: BigDecimal.fromString('1'),
    MINUS_ONE: BigDecimal.fromString('-1'),
    THIRTY_PERCENT: BigDecimal.fromString('0.3'),
    GVT_START_FACTOR: BigDecimal.fromString('0.005'),
    PWRD_START_FACTOR: BigDecimal.fromString('1'),
}

// Addresses
export const ADDR: Addr = {
    ZERO: Bytes.fromHexString('0x0000000000000000000000000000000000000000'),
}
