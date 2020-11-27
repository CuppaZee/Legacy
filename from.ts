import { Platform } from 'react-native';
import changelogs from 'changelogs';
export default `cuppazee_${Platform.OS}_1.3_${Math.max(...Object.keys(changelogs).map(Number))}`