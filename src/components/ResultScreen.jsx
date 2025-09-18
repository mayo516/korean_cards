const ResultScreen = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100)
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "완벽합니다! 🎉"
    if (percentage >= 80) return "훌륭합니다! 👏"
    if (percentage >= 70) return "잘했습니다! 👍"
    if (percentage >= 60) return "좋습니다! 😊"
    return "다시 도전해보세요! 💪"
  }

  const getScoreColor = () => {
    if (percentage >= 80) return "from-green-400 to-green-600"
    if (percentage >= 60) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-pink-500"
  }

  const getScoreEmoji = () => {
    if (percentage >= 90) return "🏆"
    if (percentage >= 80) return "🥇"
    if (percentage >= 70) return "🥈"
    if (percentage >= 60) return "🥉"
    return "💪"
  }

  const getEncouragementMessage = () => {
    if (percentage >= 90) return "당신은 한국어 숫자 마스터입니다!"
    if (percentage >= 80) return "정말 잘하고 있어요! 계속해서 연습해보세요!"
    if (percentage >= 70) return "좋은 성과입니다! 조금만 더 연습하면 완벽해질 거예요!"
    if (percentage >= 60) return "괜찮은 시작이에요! 더 많은 연습으로 실력을 키워보세요!"
    return "괜찮아요! 매일 조금씩 연습하면 분명 늘 거예요!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* 듀오링고 스타일 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {/* <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">한</span>
            </div> */}
            <h1 className="text-xl font-bold text-gray-800">한국어 숫자 퀴즈</h1>
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
              <h1 className="text-4xl font-bold text-white mb-2">
                퀴즈 완료!
              </h1>
              <p className="text-white text-xl opacity-90">
                {getScoreMessage()}
              </p>
            </div>

            {/* 점수 표시 */}
            <div className="p-8 text-center">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {score} / {totalQuestions}
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                  {percentage}%
                </div>
              </div>

              {/* 통계 카드들 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 rounded-2xl p-6 text-center border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">{score}</div>
                  <div className="text-green-700 font-semibold">정답</div>
                  <div className="text-green-600 text-sm mt-1">🎯 맞춘 문제</div>
                </div>
                <div className="bg-red-50 rounded-2xl p-6 text-center border-2 border-red-200">
                  <div className="text-4xl font-bold text-red-600 mb-2">{totalQuestions - score}</div>
                  <div className="text-red-700 font-semibold">오답</div>
                  <div className="text-red-600 text-sm mt-1">📚 더 연습할 문제</div>
                </div>
              </div>

              {/* 격려 메시지 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
                <div className="text-center">
                  <div className="text-3xl mb-3">🌟</div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    {getEncouragementMessage()}
                  </p>
                  <p className="text-gray-600">
                    매일 조금씩 연습하면 한국어 실력이 크게 향상될 거예요!
                  </p>
                </div>
              </div>

              {/* 버튼들 */}
              <div className="space-y-4">
                <button
                  onClick={onRestart}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  🔄 다시 도전하기
                </button>
                
                {/* <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  🆕 새로운 문제로 시작하기
                </button> */}
              </div>
            </div>
          </div>

          {/* 듀오링고 스타일 하단 정보 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-semibold text-gray-700">정확도</div>
              <div className="text-lg font-bold text-green-600">{percentage}%</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-gray-700">속도</div>
              <div className="text-lg font-bold text-blue-600">빠름</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-sm font-semibold text-gray-700">연속 정답</div>
              <div className="text-lg font-bold text-purple-600">{score}</div>
            </div>
          </div>

          {/* 추가 팁 */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">학습 팁</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                매일 10분씩 연습하면 한국어 숫자 읽기 실력이 크게 향상됩니다. 
                시계를 볼 때마다 한국어로 시간을 읽어보는 습관을 만들어보세요!
              </p>
              <h3 className="text-lg font-bold text-gray-800 mb-2">오류 보고</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                dmsgk2323@naver.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen