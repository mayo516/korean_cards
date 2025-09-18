import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import QuizCard from './components/QuizCard'
import ResultScreen from './components/ResultScreen'

function App() {
  const { t, i18n } = useTranslation()

  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 문제 데이터 로드
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.json')
        const allQuestions = await response.json()
        const shuffled = allQuestions.sort(() => Math.random() - 0.5)
        setQuestions(shuffled)
      } catch (error) {
        console.error(t('errorTitle'), error)
      } finally {
        setIsLoading(false)
      }
    }
    loadQuestions()
  }, [t])

  const shuffleOptions = (options) => [...options].sort(() => Math.random() - 0.5)

  const handleAnswerSelect = (selectedIndex, correctIndex) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(selectedIndex)
    if (selectedIndex === correctIndex) setScore(prev => prev + 1)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizCompleted(false)
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('loadingTitle')}</h2>
            <p className="text-gray-600">{t('loadingText')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-4">
            <div className="text-6xl mb-6">😅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('errorTitle')}</h2>
            <p className="text-gray-600 mb-6">{t('errorText')}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              {t('retryButton')}
            </button>
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

  const currentQuestion = questions[currentQuestionIndex]
  const shuffledOptions = shuffleOptions(currentQuestion.options)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">{t('appTitle')}</h1>
          <div className="flex items-center gap-10">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-500">{score}</div>
              <div className="text-xs text-gray-500">{t('score')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{questions.length - currentQuestionIndex - 1}</div>
              <div className="text-xs text-gray-500">{t('remaining')}</div>
            </div>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="block border rounded px-2 py-1"
            >
              <option value="ko">{t('selectLanguage')} - 한국어</option>
              <option value="en">{t('selectLanguage')} - English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">
              {t('questionProgress', { current: currentQuestionIndex + 1, total: questions.length })}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {t('completionPercent', { percent: Math.round(((currentQuestionIndex + 1) / questions.length) * 100) })}
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
