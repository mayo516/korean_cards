import { useState, useEffect } from 'react'
import QuizCard from './components/QuizCard'
import ResultScreen from './components/ResultScreen'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // 문제 데이터 로드 및 랜덤 선택
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.json')
        const allQuestions = await response.json()
        
        // 10개 문제 랜덤 선택
        const shuffled = allQuestions.sort(() => Math.random() - 0.5)
        const selectedQuestions = shuffled.slice(0, 10)
        
        setQuestions(selectedQuestions)
        setIsLoading(false)
      } catch (error) {
        console.error('문제를 불러오는 중 오류가 발생했습니다:', error)
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [])

  // 보기 섞기 함수
  const shuffleOptions = (options) => {
    return options
    return [...options].sort(() => Math.random() - 0.5)
  }

  // 답안 선택 처리
  const handleAnswerSelect = (selectedIndex, correctIndex) => {
    if (selectedAnswer !== null) return // 이미 답을 선택한 경우 무시

    setSelectedAnswer(selectedIndex)
    
    if (selectedIndex === correctIndex) {
      setScore(prev => prev + 1)
    }
  }

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  // 퀴즈 재시작
  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizCompleted(false)
    setShowResult(false)
    
    // 새로운 문제 세트 로드
    const shuffled = questions.sort(() => Math.random() - 0.5)
    setQuestions([...shuffled])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">한</span>
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-500 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">문제를 준비하고 있어요</h2>
            <p className="text-gray-600">잠시만 기다려주세요...</p>
          </div>
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <ResultScreen 
        score={score} 
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4">
            <div className="text-6xl mb-6">😅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">문제를 불러올 수 없어요</h2>
            <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              🔄 다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const shuffledOptions = shuffleOptions(currentQuestion.options)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* 듀오링고 스타일 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">한</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">한국어 숫자 퀴즈</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{score}</div>
                <div className="text-xs text-gray-500">점수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{questions.length - currentQuestionIndex - 1}</div>
                <div className="text-xs text-gray-500">남은 문제</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 듀오링고 스타일 진행률 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">
              문제 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <QuizCard
          question={currentQuestion.question}
          options={shuffledOptions}
          correctAnswer={currentQuestion.answer}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  )
}

export default App