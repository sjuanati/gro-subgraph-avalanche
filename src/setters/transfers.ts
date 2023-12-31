// SPDX-License-Identifier: AGPLv3

//  ________  ________  ________
//  |\   ____\|\   __  \|\   __  \
//  \ \  \___|\ \  \|\  \ \  \|\  \
//   \ \  \  __\ \   _  _\ \  \\\  \
//    \ \  \|\  \ \  \\  \\ \  \\\  \
//     \ \_______\ \__\\ _\\ \_______\
//      \|_______|\|__|\|__|\|_______|

// gro protocol - avalanche subgraph: https://github.com/groLabs/gro-subgraph-avalanche

/// @notice Stores gro token transfers in entity <TransferTx>

import { Bytes } from '@graphprotocol/graph-ts';
import { TransferEvent } from '../types/transfer';
import { TransferTx } from '../../generated/schema';
import {
    DECIMALS,
    TX_TYPE as TxType,
} from '../utils/constants';
import {
    tokenToDecimal,
    getPricePerShare,
} from '../utils/tokens';


/// @notice Stores transfers in entity <TransferTx>
/// @param ev the parsed transfer event
/// @param userAddress the user address
/// @param type the transfer type (core_deposit, core_withdrawal, transfer_in, transfer_out)
/// @param token the transfer token
/// @return transfer object created
export const setTransferTx = (
    ev: TransferEvent,
    userAddress: Bytes,
    type: string,
    token: string,
): TransferTx => {
    const transfer_tag = (type == TxType.TRANSFER_IN)
        ? 0
        : (type == TxType.TRANSFER_OUT)
            ? 1
            : 2;
    const id = ev.id.concatI32(transfer_tag);
    let tx = new TransferTx(id);
    const base = token.includes('DAI')
        ? 18
        : 6;
    const coinAmount = tokenToDecimal(ev.value, base, 0);
    const pricePerShare = getPricePerShare(token);
    tx.contract_address = ev.contractAddress;
    tx.block_number = ev.block.toI32();
    tx.block_timestamp = ev.timestamp.toI32();
    tx.token = token;
    tx.type = type;
    tx.hash = ev.hash;
    tx.user_address = userAddress;
    tx.from_address = ev.fromAddress;
    tx.to_address = ev.toAddress;
    tx.coin_amount = coinAmount.truncate(DECIMALS);
    tx.usd_amount = coinAmount.times(pricePerShare[2]).truncate(DECIMALS);
    tx.current_price_per_share = pricePerShare[0].truncate(DECIMALS);
    tx.estimated_price_per_share = pricePerShare[1].truncate(DECIMALS);
    tx.save();
    return tx;
}
