import { setUser } from '../setters/users'
import { setDepoWithdrawTx } from '../setters/depowithdraw';
import { DepoWithdraw } from '../types/depowithdraw';
import { setTotals } from '../setters/totals';


// Withdrawal from Labs
export const manageWithdrawal = (
    ev: DepoWithdraw,
    token: string,
): void => {

    // Step 1: Manage User
    setUser(ev.userAddress);

    //Step 2: Manage Transaction
    const tx = setDepoWithdrawTx(ev, token);

    //Step 3: Manage Totals
    setTotals(
        'core_withdrawal',
        token,
        tx.user_address,
        tx.coin_amount,
        tx.usd_amount,
    );
}
