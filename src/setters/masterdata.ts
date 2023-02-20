import { MasterData } from '../../generated/schema';
import { LAUNCH_TIMESTAMP_AVAX } from '../utils/constants';


export const initMD = (): MasterData => {
    let md = MasterData.load('0x');
    if (!md) {
        md = new MasterData('0x');
        md.status = 'ok';
        md.network_id = i32(43114);
        md.network_name = 'avalanche';
        md.launch_timestamp = i32(LAUNCH_TIMESTAMP_AVAX);
    }
    return md;
}
