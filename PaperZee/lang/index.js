import cs from './cs.json'
import de from './de.json'
import en_gb from './en-gb.json'
import fi from './fi.json'
import fr from './fr.json'
import hu from './hu.json'
import lt from './lt.json'
import nl from './nl.json'
import pt from './pt.json'
import sv from './sv.json'

function x(obj, key){
    var a = {};
    if(obj.other) {
        for(var i = 0;i < Object.keys(obj).length;i++) {
            a[`${key}_${i}`] = Object.values(obj)[i];
        }
    } else {
        a[key] = {};
        for(var i = 0;i < Object.keys(obj).length;i++) {
            let k = Object.keys(obj)[i];
            if(typeof obj[k] == "string") {
                if(obj[k]) a[key][k] = obj[k].replace(/{([a-z0-9_]+)}/g,'{{$1}}');
            } else {
                Object.assign(a[key],x(obj[k],k))
            }
        }
    }
    return a;
}
// Converts to i18next plural format

export default {
    cs:x(cs,"a").a,
    de:x(de,"a").a,
    en_gb:x(en_gb,"a").a,
    fi:x(fi,"a").a,
    fr:x(fr,"a").a,
    hu:x(hu,"a").a,
    lt:x(lt,"a").a,
    nl:x(nl,"a").a,
    pt:x(pt,"a").a,
    sv:x(sv,"a").a
}