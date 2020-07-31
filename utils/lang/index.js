import cs from './cs.json'
import da from './da.json'
import de from './de.json'
import en_gb from './en-gb.json'
import en_us from './en-us.json'
import fi from './fi.json'
import fr from './fr.json'
import hu from './hu.json'
import lt from './lt.json'
import nl from './nl.json'
import pt from './pt.json'
import sv from './sv.json'

var plural_list = ["","_plural"]

function x(obj, key){
    var a = {};
    if(obj.other!==undefined) {
        for(var i = 0;i < Object.keys(obj).length;i++) {
            if(Object.keys(obj).length==2) {
                if(Object.values(obj)[i]) a[`${key}${plural_list[i]}`] = Object.values(obj)[i].replace(/{([a-z0-9_]+)}/g,'{{$1}}');
            } else {
                if(Object.values(obj)[i]) a[`${key}_${i}`] = Object.values(obj)[i].replace(/{([a-z0-9_]+)}/g,'{{$1}}');
            }
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
    da:x(da,"a").a,
    de:x(de,"a").a,
    "en-GB":x(en_gb,"a").a,
    "en":x(en_us,"a").a,
    fi:x(fi,"a").a,
    fr:x(fr,"a").a,
    hu:x(hu,"a").a,
    lt:x(lt,"a").a,
    nl:x(nl,"a").a,
    pt:x(pt,"a").a,
    sv:x(sv,"a").a
}