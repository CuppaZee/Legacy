
import { Platform } from 'react-native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'changelogs' or its correspondi... Remove this comment to see the full error message
import changelogs from 'changelogs';
export default `cuppazee_${Platform.OS}_1.3_${Math.max(...Object.keys(changelogs).map(Number))}`