import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // 외부 JSON 불러오기
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["ko", "en"],
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json"
    }
  });

export default i18n;