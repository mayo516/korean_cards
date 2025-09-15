import { useState, useEffect } from 'react'

const QuizCard = ({ 
  question, 
  options, 
  correctAnswer, 
  selectedAnswer, 
  onAnswerSelect, 
  onNextQuestion,
  isLastQuestion 
}) => {
  const [shuffledOptions, setShuffledOptions] = useState([])
  const [optionMapping, setOptionMapping] = useState({})

  // 보기 섞기 및 매핑 생성
  useEffect(() => {
    const shuffled = [...options].sort(() => Math.random() - 0.5)
    setShuffledOptions(shuffled)
    
    // 원본 인덱스와 섞인 인덱스 매핑
    const mapping = {}
    shuffled.forEach((option, newIndex) => {
      const originalIndex = options.indexOf(option)
      mapping[newIndex] = originalIndex
    })
    setOptionMapping(mapping)
  }, [question, options])

  const handleOptionClick = (shuffledIndex) => {
    if (selectedAnswer !== null) return
    onAnswerSelect(shuffledIndex, optionMapping[shuffledIndex])
  }

  const getOptionStyle = (shuffledIndex) => {
    if (selectedAnswer === null) {
      return "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300 hover:shadow-md transform hover:scale-[1.02] transition-all duration-200"
    }
    
    const originalIndex = optionMapping[shuffledIndex]
    const isSelected = selectedAnswer === shuffledIndex
    const isCorrect = originalIndex === correctAnswer
    
    if (isSelected) {
      return isCorrect 
        ? "bg-green-50 border-2 border-green-500 text-green-800 shadow-lg transform scale-[1.02]" 
        : "bg-red-50 border-2 border-red-500 text-red-800 shadow-lg transform scale-[1.02]"
    }
    
    if (isCorrect) {
      return "bg-green-50 border-2 border-green-500 text-green-800 shadow-lg transform scale-[1.02]"
    }
    
    return "bg-gray-50 border-2 border-gray-300 text-gray-500"
  }

  const getOptionIcon = (shuffledIndex) => {
    if (selectedAnswer === null) return null
    
    const originalIndex = optionMapping[shuffledIndex]
    const isSelected = selectedAnswer === shuffledIndex
    const isCorrect = originalIndex === correctAnswer
    
    if (isSelected) {
      return isCorrect ? "✅" : "❌"
    }
    
    if (isCorrect) {
      return "✅"
    }
    
    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 듀오링고 스타일 메인 카드 */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* 문제 카드 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
          <div className="text-6xl mb-4">🕐</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
            {question}
          </h2>
          <p className="text-blue-100 text-lg mt-2">정확한 한국어로 읽어보세요</p>
        </div>

        {/* 보기 카드들 */}
        <div className="p-8 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-[1000px] ">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={selectedAnswer !== null}
                className={`relative p-6 rounded-2xl text-left transition-all duration-300 disabled:cursor-not-allowed ${getOptionStyle(index)}`}
              >
                <div className="flex items-center justify-between max-w-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg flex items-center justify-center mr-4 shadow-lg">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-semibold">{option}</span>
                  </div>
                  {getOptionIcon(index) && (
                    <div className="text-2xl">
                      {getOptionIcon(index)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* 다음 문제 버튼 */}
          {selectedAnswer !== null && (
            <div className="text-center">
              <button
                onClick={onNextQuestion}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                {isLastQuestion ? '🎉 결과 보기' : '➡️ 다음 문제'}
              </button>
            </div>
          )}

          {/* 듀오링고 스타일 피드백 */}
          {selectedAnswer !== null && (
            <div className="mt-6 text-center">
              {optionMapping[selectedAnswer] === correctAnswer ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-green-700 font-bold text-xl mb-2">정답입니다!</div>
                  <div className="text-green-600 text-lg">훌륭해요! 계속해서 잘하고 있어요! 💪</div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                  <div className="text-4xl mb-2">💪</div>
                  <div className="text-red-700 font-bold text-xl mb-2">틀렸습니다</div>
                  <div className="text-red-600 text-lg">
                    정답은 <span className="font-bold">"{options[correctAnswer]}"</span>입니다.
                  </div>
                  <div className="text-gray-600 text-sm mt-2">괜찮아요! 다음에는 더 잘할 수 있어요!</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 듀오링고 스타일 하단 힌트 */}
      <div className="mt-6 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-4 inline-block">
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-2xl">💡</span>
            <span className="text-sm font-medium">팁: 정답이 여러 개인 경우도 있어요!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizCard