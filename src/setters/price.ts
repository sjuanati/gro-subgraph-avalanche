// SPDX-License-Identifier: AGPLv3

//  ________  ________  ________
//  |\   ____\|\   __  \|\   __  \
//  \ \  \___|\ \  \|\  \ \  \|\  \
//   \ \  \  __\ \   _  _\ \  \\\  \
//    \ \  \|\  \ \  \\  \\ \  \\\  \
//     \ \_______\ \__\\ _\\ \_______\
//      \|_______|\|__|\|__|\|_______|

// gro protocol - avalanche subgraph: https://github.com/groLabs/gro-subgraph-avalanche

/// @notice Updates the Gro-related token prices

import { Price } from '../../generated/schema';
import { tokenToDecimal } from '../utils/tokens';
import { VaultAdaptorMK2_v1_0 as dai_v1_0 } from '../../generated/avaxdaivault_v1_0/VaultAdaptorMK2_v1_0';
import { VaultAdaptorMK2_v1_0 as usdc_v1_0 } from '../../generated/avaxusdcvault_v1_0/VaultAdaptorMK2_v1_0';
import { VaultAdaptorMK2_v1_0 as usdt_v1_0 } from '../../generated/avaxusdtvault_v1_0/VaultAdaptorMK2_v1_0';
import { VaultAdaptorMK2_v1_5 as dai_v1_5 } from '../../generated/avaxdaivault_v1_5/VaultAdaptorMK2_v1_5';
import { VaultAdaptorMK2_v1_5 as usdc_v1_5 } from '../../generated/avaxusdcvault_v1_5/VaultAdaptorMK2_v1_5';
import { VaultAdaptorMK2_v1_5 as usdt_v1_5 } from '../../generated/avaxusdtvault_v1_5/VaultAdaptorMK2_v1_5';
import { VaultAdaptorMK2_v1_6 as dai_v1_6 } from '../../generated/avaxdaivault_v1_6/VaultAdaptorMK2_v1_6';
import { VaultAdaptorMK2_v1_6 as usdc_v1_6 } from '../../generated/avaxusdcvault_v1_6/VaultAdaptorMK2_v1_6';
import { VaultAdaptorMK2_v1_6 as usdt_v1_6 } from '../../generated/avaxusdtvault_v1_6/VaultAdaptorMK2_v1_6';
import { VaultAdaptorMK2_v1_7 as dai_v1_7 } from '../../generated/avaxdaivault_v1_7/VaultAdaptorMK2_v1_7';
import { VaultAdaptorMK2_v1_7 as usdc_v1_7 } from '../../generated/avaxusdcvault_v1_7/VaultAdaptorMK2_v1_7';
import { VaultAdaptorMK2_v1_7 as usdt_v1_7 } from '../../generated/avaxusdtvault_v1_7/VaultAdaptorMK2_v1_7';
import {
    NUM,
    ADDR,
    TOKEN as Token,
} from '../utils/constants';
import {
    log,
    BigDecimal,
} from '@graphprotocol/graph-ts';
import {
    vaultDai_1_0_Address,
    vaultUsdc_1_0_Address,
    vaultUsdt_1_0_Address,
    vaultDai_1_5_Address,
    vaultUsdc_1_5_Address,
    vaultUsdt_1_5_Address,
    vaultDai_1_6_Address,
    vaultUsdc_1_6_Address,
    vaultUsdt_1_6_Address,
    vaultDai_1_7_Address,
    vaultUsdc_1_7_Address,
    vaultUsdt_1_7_Address,
} from '../utils/contracts';


/// @notice Initialises entity <Price> with default zero values if not created yet
/// @return price object created or loaded
const initPrice = (): Price => {
    let price = Price.load(ADDR.ZERO);
    if (!price) {
        price = new Price(ADDR.ZERO);
        price.groDAI_e_v1_0 = NUM.ZERO;
        price.groUSDC_e_v1_0 = NUM.ZERO;
        price.groUSDT_e_v1_0 = NUM.ZERO;
        price.groDAI_e_v1_5 = NUM.ZERO;
        price.groUSDC_e_v1_5 = NUM.ZERO;
        price.groUSDT_e_v1_5 = NUM.ZERO;
        price.groDAI_e_v1_6 = NUM.ZERO;
        price.groUSDC_e_v1_6 = NUM.ZERO;
        price.groUSDT_e_v1_6 = NUM.ZERO;
        price.groDAI_e_v1_7 = NUM.ZERO;
        price.groUSDC_e_v1_7 = NUM.ZERO;
        price.groUSDT_e_v1_7 = NUM.ZERO;
    }
    return price;
}

/// @notice Updates the latest price per share given a token
/// @param token the token for which the price will be updated
export const setLatestPrice = (token: string): void => {
    let price = initPrice();
    if (token === Token.GRO_DAI_E_VAULT_V1_0) {
        const contract = dai_v1_0.bind(vaultDai_1_0_Address);
        price.groDAI_e_v1_0 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDC_E_VAULT_V1_0) {
        const contract = usdc_v1_0.bind(vaultUsdc_1_0_Address);
        price.groUSDC_e_v1_0 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDT_E_VAULT_V1_0) {
        const contract = usdt_v1_0.bind(vaultUsdt_1_0_Address);
        price.groUSDT_e_v1_0 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_DAI_E_VAULT_V1_5) {
        const contract = dai_v1_5.bind(vaultDai_1_5_Address);
        price.groDAI_e_v1_5 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDC_E_VAULT_V1_5) {
        const contract = usdc_v1_5.bind(vaultUsdc_1_5_Address);
        price.groUSDC_e_v1_5 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDT_E_VAULT_V1_5) {
        const contract = usdt_v1_5.bind(vaultUsdt_1_5_Address);
        price.groUSDT_e_v1_5 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_DAI_E_VAULT_V1_6) {
        const contract = dai_v1_6.bind(vaultDai_1_6_Address);
        price.groDAI_e_v1_6 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDC_E_VAULT_V1_6) {
        const contract = usdc_v1_6.bind(vaultUsdc_1_6_Address);
        price.groUSDC_e_v1_6 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDT_E_VAULT_V1_6) {
        const contract = usdt_v1_6.bind(vaultUsdt_1_6_Address);
        price.groUSDT_e_v1_6 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_DAI_E_VAULT_V1_7) {
        const contract = dai_v1_7.bind(vaultDai_1_7_Address);
        price.groDAI_e_v1_7 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDC_E_VAULT_V1_7) {
        const contract = usdc_v1_7.bind(vaultUsdc_1_7_Address);
        price.groUSDC_e_v1_7 = callPricePerShare(contract, token);
    } else if (token === Token.GRO_USDT_E_VAULT_V1_7) {
        const contract = usdt_v1_7.bind(vaultUsdt_1_7_Address);
        price.groUSDT_e_v1_7 = callPricePerShare(contract, token);
    } else {
        log.error(
            'src/setters/price.ts->setLatestPrice(): token {} not found',
            [token]
        );
    }
    price.save();
}

/// @notice Retrieves the price per share given a token and its vault
/// @param contract the vault contract to retrieve the price per share from
/// @param token the token to retrieve the price for
function callPricePerShare<T>(contract: T, token: string): BigDecimal {
    if (contract) {
        //@ts-ignore
        const pps = contract.try_getPricePerShare();
        if (pps.reverted) {
            log.error('src/utils/price.ts->callPricePerShare(): call reverted on getPricePerShare()', []);
            return NUM.ZERO;
        } else {
            const base = token.includes('DAI')
                ? 18
                : 6;
            return tokenToDecimal(pps.value, base, 6);
        }
    } else {
        log.error('src/setters/price.ts->callPricePerShare(): no contract found', []);
        return NUM.ZERO;
    }
}
