import React,{useState} from 'react';
import { LOCALES ,I18nPropvider} from "./i18nProvider";
import { FormattedMessage} from "react-intl";
import translate from "./i18nProvider/translate";
function Help(props) {
    const [locale,setLocale] = useState(LOCALES.ENGLISH);
    return (
        <I18nPropvider
        locale={locale}
        >
        <div className="container">
            <h1 className="text-center">
                {translate("hello")}
            </h1>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <button onClick={()=>setLocale(LOCALES.ENGLISH)} className="btn btn-success">English</button>
                    <button onClick={()=>setLocale(LOCALES.RUSSIAN)} className="btn btn-success">Russian</button>
                    <button onClick={()=>setLocale(LOCALES.UZBEK)} className="btn btn-success">Uzbek</button>
                </div>
            </div>

        </div>
        </I18nPropvider>
    );
}

export default Help;