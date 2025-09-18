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

  useEffect(() => {
    const shuffled = [...options].sort(() => Math.random() - 0.5)
    setShuffledOptions(shuffled)
    const mapping = {}
    shuffled.forEach((option, newIndex) => {
      mapping[newIndex] = options.indexOf(option)
    })
    setOptionMapping(mapping)
  }, [question, options])

  const handleOptionClick = (shuffledIndex) => {
    if (selectedAnswer !== null) return
    onAnswerSelect(shuffledIndex, optionMapping[shuffledIndex])
  }

  const getOptionStyle = (shuffledIndex) => {
    const base =
      "p-4 rounded-xl border backdrop-blur-md bg-white/30 transition-colors text-left w-full text-gray-800 font-medium shadow-sm"

    if (selectedAnswer === null) {
      return base + " hover:border-indigo-400 hover:bg-white/40"
    }

    const originalIndex = optionMapping[shuffledIndex]
    const isSelected = selectedAnswer === shuffledIndex
    const isCorrect = originalIndex === correctAnswer

    if (isSelected) {
      return isCorrect
        ? base + " border-green-400 bg-green-200/30 text-green-800"
        : base + " border-red-400 bg-red-200/30 text-red-800"
    }

    if (isCorrect) {
      return base + " border-green-400 bg-green-200/30 text-green-800"
    }

    return base + " border-gray-300 bg-gray-100/20 text-gray-400"
  }

  return (
    <div className="max-w-[80%] mx-auto text-center">
      {/* 문제 카드 */}
     <div className="min-h-[200px] backdrop-blur-lg bg-white/30 border border-white/40  shadow-lg p-6 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          {question}
        </h2>
        <p className="text-gray-600 text-sm">정확한 한국어로 읽어보세요</p>
      </div>

      {/* 보기 */}
      <div className="space-y-3 mb-6">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={selectedAnswer !== null}
            className={getOptionStyle(index)}
          >
            <span className="mr-2 font-semibold text-indigo-600">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {/* 다음 문제 버튼 */}
      {selectedAnswer !== null && (
        <div className="text-center">
          <button
            onClick={onNextQuestion}
            className="px-6 py-3 backdrop-blur-lg bg-indigo-500/70 hover:bg-indigo-600/70 text-white rounded-xl font-semibold transition-colors shadow-md border border-white/30"
          >
            {isLastQuestion ? '🎉 결과 보기' : '다음 문제'}
          </button>
        </div>
      )}

      {/* 피드백 */}
      {selectedAnswer !== null && (
        <div className="mt-6">
          {optionMapping[selectedAnswer] === correctAnswer ? (
            <div className="p-4 rounded-xl border border-green-300/60 backdrop-blur-md bg-green-100/30 text-green-700 text-center">
              <p className="font-bold">정답이에요 🎉</p>
              <p className="text-sm">잘하셨습니다! 계속 이렇게 해보세요.</p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-red-300/60 backdrop-blur-md bg-red-100/30 text-red-700 text-center">
              <p className="font-bold">아쉬워요 💡</p>
              <p className="text-sm">
                정답은 <span className="font-semibold">{options[correctAnswer]}</span> 입니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuizCard