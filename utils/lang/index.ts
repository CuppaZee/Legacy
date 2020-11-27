// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './cs.json'. Consider using '--... Remove this comment to see the full error message
import cs from './cs.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './da.json'. Consider using '--... Remove this comment to see the full error message
import da from './da.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './de.json'. Consider using '--... Remove this comment to see the full error message
import de from './de.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './en-gb.json'. Consider using ... Remove this comment to see the full error message
import en_gb from './en-gb.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './en-us.json'. Consider using ... Remove this comment to see the full error message
import en_us from './en-us.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './fi.json'. Consider using '--... Remove this comment to see the full error message
import fi from './fi.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './fr.json'. Consider using '--... Remove this comment to see the full error message
import fr from './fr.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './hu.json'. Consider using '--... Remove this comment to see the full error message
import hu from './hu.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './lt.json'. Consider using '--... Remove this comment to see the full error message
import lt from './lt.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './nl.json'. Consider using '--... Remove this comment to see the full error message
import nl from './nl.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './pt.json'. Consider using '--... Remove this comment to see the full error message
import pt from './pt.json'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './sv.json'. Consider using '--... Remove this comment to see the full error message
import sv from './sv.json'

var plural_list = ["","_plural"]

function s(a: any) {
    return a.replace(/\w/g,()=>Math.floor(Math.random()*36).toString(36));
}

function x(obj: any, key: any, scramble: any){
    var a = {};
    if(obj.other!==undefined) {
        for(var i = 0;i < Object.keys(obj).length;i++) {
            if(Object.keys(obj).length==2) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                if(Object.values(obj)[i]) a[`${key}${plural_list[i]}`] = scramble?s(Object.values(obj)[i]):Object.values(obj)[i].replace(/{([a-z0-9_]+)}/g,'{{$1}}');
            } else {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                if(Object.values(obj)[i]) a[`${key}_${i}`] = scramble?s(Object.values(obj)[i]):Object.values(obj)[i].replace(/{([a-z0-9_]+)}/g,'{{$1}}');
            }
        }
    } else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        a[key] = {};
        for(var i = 0;i < Object.keys(obj).length;i++) {
            let k = Object.keys(obj)[i];
            if(typeof obj[k] == "string") {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                if(obj[k]) a[key][k] = scramble?s(obj[k]):obj[k].replace(/{([a-z0-9_]+)}/g,'{{$1}}');
            } else {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                Object.assign(a[key],x(obj[k],k,scramble))
            }
        }
    }
    return a;
}
// Converts to i18next plural format

export default {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    cs:x(cs,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    da:x(da,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    de:x(de,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    "en-GB":x(en_gb,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    "en":x(en_us,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    fi:x(fi,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    fr:x(fr,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    hu:x(hu,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    lt:x(lt,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    nl:x(nl,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    pt:x(pt,"a").a,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    sv:x(sv,"a").a
}