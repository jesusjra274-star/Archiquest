export default function ArcadeArchitectureQuiz() {
  return (
    <div className="min-h-screen bg-[#0b1020] text-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-sm mb-6">
            Trivia Arcade • Historia de la Arquitectura
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent">
            ARCHI
            <br />
            QUEST
          </h1>

          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Un videojuego interactivo sobre Grecia, Roma, Renacimiento,
            Barroco e Ilustración. Responde rápido, acumula puntos y sube al
            ranking.
          </p>

          <div className="flex gap-4 flex-wrap">
            <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
              ⚡ +100 puntos por respuesta correcta
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">
              ⏱️ Bonus por velocidad
            </div>
          </div>
        </div>

        <QuizCard />
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const QUESTIONS = [
  {
    id: 1,
    category: "Antigua Grecia",
    question: "¿Qué orden arquitectónico griego es el más simple?",
    options: ["Jónico", "Corintio", "Dórico", "Barroco"],
    answer: "Dórico",
  },
  {
    id: 2,
    category: "Antigua Grecia",
    question: "¿Qué edificio representa la arquitectura griega clásica?",
    options: ["Coliseo", "Partenón", "Panteón", "Versalles"],
    answer: "Partenón",
  },
  {
    id: 3,
    category: "Antigua Grecia",
    question: "¿Qué elemento sostenía los templos griegos?",
    options: ["Arcos", "Cúpulas", "Columnas", "Vidrio"],
    answer: "Columnas",
  },
  {
    id: 4,
    category: "Roma",
    question: "¿Qué estructura romana transportaba agua?",
    options: ["Acrópolis", "Acueducto", "Foro", "Basílica"],
    answer: "Acueducto",
  },
  {
    id: 5,
    category: "Roma",
    question: "¿Qué material popularizaron los romanos?",
    options: ["Mármol", "Concreto", "Madera", "Adobe"],
    answer: "Concreto",
  },
  {
    id: 6,
    category: "Roma",
    question: "¿Qué elemento arquitectónico usaban ampliamente los romanos?",
    options: ["Arcos", "Pirámides", "Techos planos", "Pagodas"],
    answer: "Arcos",
  },
  {
    id: 7,
    category: "Renacimiento",
    question: "¿Qué época retomó los ideales clásicos?",
    options: ["Gótico", "Renacimiento", "Barroco", "Modernismo"],
    answer: "Renacimiento",
  },
  {
    id: 8,
    category: "Renacimiento",
    question: "¿Qué arquitecto diseñó la cúpula de Florencia?",
    options: ["Miguel Ángel", "Brunelleschi", "Bernini", "Vitruvio"],
    answer: "Brunelleschi",
  },
  {
    id: 9,
    category: "Renacimiento",
    question: "¿Qué característica define al Renacimiento?",
    options: ["Simetría", "Minimalismo", "Caos visual", "Neón"],
    answer: "Simetría",
  },
  {
    id: 10,
    category: "Barroco",
    question: "¿Qué estilo usa exceso de ornamentación?",
    options: ["Modernismo", "Barroco", "Bauhaus", "Brutalismo"],
    answer: "Barroco",
  },
  {
    id: 11,
    category: "Barroco",
    question: "¿Qué sensación buscaba el Barroco?",
    options: ["Drama", "Silencio", "Vacío", "Minimalismo"],
    answer: "Drama",
  },
  {
    id: 12,
    category: "Barroco",
    question: "¿Qué arquitecto es famoso por obras barrocas?",
    options: ["Bernini", "Mies", "Le Corbusier", "Gaudí"],
    answer: "Bernini",
  },
  {
    id: 13,
    category: "Ilustración",
    question: "¿Qué valor promovía la Ilustración?",
    options: ["Razón", "Caos", "Oscuridad", "Misticismo"],
    answer: "Razón",
  },
  {
    id: 14,
    category: "Ilustración",
    question: "¿Qué estilo surgió inspirado en la antigüedad clásica?",
    options: ["Neoclásico", "Gótico", "Futurista", "Organicista"],
    answer: "Neoclásico",
  },
  {
    id: 15,
    category: "Ilustración",
    question: "¿Qué característica tenía la arquitectura ilustrada?",
    options: ["Orden", "Exceso decorativo", "Asimetría", "Caos"],
    answer: "Orden",
  },
]

function QuizCard() {
  const [started, setStarted] = useState(false)
  const [nickname, setNickname] = useState("")
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)

  const shuffled = useMemo(() => {
    return [...QUESTIONS].sort(() => Math.random() - 0.5)
  }, [])

  const question = shuffled[current]

  useEffect(() => {
    if (!started || finished) return

    if (timeLeft <= 0) {
      nextQuestion()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, started, finished])

  const nextQuestion = () => {
    setSelected(null)
    setTimeLeft(15)

    if (current + 1 >= shuffled.length) {
      setFinished(true)
      saveRanking()
    } else {
      setCurrent((prev) => prev + 1)
    }
  }

  const handleAnswer = (option) => {
    if (selected) return

    setSelected(option)

    if (option === question.answer) {
      setScore((prev) => prev + 100 + timeLeft * 2)
    }

    setTimeout(() => {
      nextQuestion()
    }, 1200)
  }

  const saveRanking = () => {
    const previous = JSON.parse(localStorage.getItem("archi-ranking") || "[]")

    previous.push({
      nickname,
      score,
    })

    previous.sort((a, b) => b.score - a.score)

    localStorage.setItem(
      "archi-ranking",
      JSON.stringify(previous.slice(0, 5))
    )
  }

  const ranking = JSON.parse(localStorage.getItem("archi-ranking") || "[]")

  const progress = ((current + 1) / shuffled.length) * 100

  const getMessage = () => {
    if (score >= 1400) return "🏛️ Maestro de la Arquitectura"
    if (score >= 900) return "⚡ Gran Historiador"
    return "🎮 Sigue practicando"
  }

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-black mb-6">Inicia la partida</h2>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Ingresa tu nickname"
          className="w-full bg-black/30 border border-cyan-500/30 rounded-2xl px-5 py-4 outline-none mb-6"
        />

        <button
          onClick={() => setStarted(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 font-bold text-lg hover:scale-105 transition-all shadow-[0_0_25px_rgba(34,211,238,0.5)]"
        >
          JUGAR
        </button>
      </motion.div>
    )
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-4xl font-black mb-2">Juego terminado</h2>
          <p className="text-cyan-300 text-xl">{getMessage()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/30 rounded-2xl p-5 text-center">
            <p className="text-slate-400 text-sm">Jugador</p>
            <p className="text-xl font-bold">{nickname}</p>
          </div>

          <div className="bg-black/30 rounded-2xl p-5 text-center">
            <p className="text-slate-400 text-sm">Puntaje</p>
            <p className="text-3xl font-black text-yellow-400">{score}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3">🏅 Ranking</h3>

          <div className="space-y-3">
            {ranking.map((player, index) => (
              <div
                key={index}
                className="flex justify-between bg-black/30 rounded-xl px-4 py-3"
              >
                <span>
                  {index + 1}. {player.nickname}
                </span>
                <span className="font-bold text-cyan-300">
                  {player.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 font-bold"
        >
          Jugar otra vez
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <p className="text-cyan-300 text-sm">{question.category}</p>
          <h2 className="text-xl font-bold">
            Pregunta {current + 1}/{shuffled.length}
          </h2>
        </div>

        <div className="flex gap-3">
          <div className="bg-black/30 rounded-xl px-4 py-2">
            ⏱️ {timeLeft}s
          </div>

          <div className="bg-black/30 rounded-xl px-4 py-2 text-yellow-400 font-bold">
            ⚡ {score}
          </div>
        </div>
      </div>

      <div className="w-full bg-black/30 rounded-full h-3 mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
        >
          <h3 className="text-3xl font-black mb-8 leading-snug">
            {question.question}
          </h3>

          <div className="grid gap-4">
            {question.options.map((option) => {
              const isCorrect = option === question.answer
              const isSelected = selected === option

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`p-5 rounded-2xl text-left transition-all border text-lg font-semibold
                    ${
                      selected
                        ? isCorrect
                          ? "bg-green-500/20 border-green-400 scale-105"
                          : isSelected
                          ? "bg-red-500/20 border-red-400"
                          : "bg-white/5 border-white/10"
                        : "bg-white/5 border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 hover:scale-[1.02]"
                    }
                  `}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
