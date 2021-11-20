import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LangSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState('en');
    const changeLanguage = (event) => {
      setSelectedLang(event.target.value);
      i18n.changeLanguage(event.target.value);
      document.getElementsByTagName('html')[0].setAttribute("dir", selectedLang === "ar" ? "ltr" : "rtl")
  }

  return (
    <div onChange={changeLanguage}>
      <label className="mr10"><input type="radio" value="en" name="language" defaultChecked={selectedLang === 'en'} /> English</label>
      <label><input type="radio" value="ar" name="language" defaultChecked={selectedLang === 'ar'} /> العربية</label>
    </div>
  )
}

export default LangSelector;