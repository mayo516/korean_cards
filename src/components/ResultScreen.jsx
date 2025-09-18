import React from "react";
import { useTranslation } from "react-i18next";

const ResultScreen = ({ score, totalQuestions, onRestart }) => {
  const { t } = useTranslation();
  const percentage = Math.round((score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return t("perfect");
    if (percentage >= 80) return t("great");
    if (percentage >= 70) return t("good");
    if (percentage >= 60) return t("nice");
    return t("tryAgain");
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "from-green-400 to-green-600";
    if (percentage >= 60) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getScoreEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 80) return "🥇";
    if (percentage >= 70) return "🥈";
    if (percentage >= 60) return "🥉";
    return "💪";
  };

  const getEncouragementMessage = () => {
    if (percentage >= 90) return t("master");
    if (percentage >= 80) return t("keepPracticing");
    if (percentage >= 70) return t("almostPerfect");
    if (percentage >= 60) return t("notBad");
    return t("encourage");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* 듀오링고 스타일 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">{t("koreanNumberQuiz")}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* 듀오링고 스타일 결과 카드 */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* 결과 헤더 */}
            <div className={`bg-gradient-to-r ${getScoreColor()} p-8 text-center`}>
              <div className="text-8xl mb-4">{getScoreEmoji()}</div>
              <h1 className="text-4xl font-bold text-white mb-2">{t("quizCompleted")}</h1>
              <p className="text-white text-xl opacity-90">{getScoreMessage()}</p>
            </div>

            {/* 점수 표시 */}
            <div className="p-8 text-center">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {score} / {totalQuestions}
                </div>
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}
                >
                  {percentage}%
                </div>
              </div>

              {/* 통계 카드 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 rounded-2xl p-6 text-center border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">{score}</div>
                  <div className="text-green-700 font-semibold">{t("correct")}</div>
                  <div className="text-green-600 text-sm mt-1">🎯 {t("questionsCorrect")}</div>
                </div>
                <div className="bg-red-50 rounded-2xl p-6 text-center border-2 border-red-200">
                  <div className="text-4xl font-bold text-red-600 mb-2">{totalQuestions - score}</div>
                  <div className="text-red-700 font-semibold">{t("incorrect")}</div>
                  <div className="text-red-600 text-sm mt-1">📚 {t("questionsPractice")}</div>
                </div>
              </div>

              {/* 격려 메시지 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
                <div className="text-center">
                  <div className="text-3xl mb-3">🌟</div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">{getEncouragementMessage()}</p>
                  <p className="text-gray-600">{t("dailyPracticeTip")}</p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="space-y-4">
                <button
                  onClick={onRestart}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  🔄 {t("retry")}
                </button>
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-semibold text-gray-700">{t("accuracy")}</div>
              <div className="text-lg font-bold text-green-600">{percentage}%</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-gray-700">{t("speed")}</div>
              <div className="text-lg font-bold text-blue-600">{t("fast")}</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-sm font-semibold text-gray-700">{t("streak")}</div>
              <div className="text-lg font-bold text-purple-600">{score}</div>
            </div>
          </div>

          {/* 추가 팁 */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t("learningTip")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t("practiceTip")}</p>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t("errorReport")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">dmsgk2323@naver.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
