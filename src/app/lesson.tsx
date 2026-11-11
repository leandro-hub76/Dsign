
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import LessonIntro from '../components/LessonIntro';
import LessonResult from '../components/LessonResult';
import OptionCard, { OptionState } from '../components/OptionCard';
import QuizHeader from '../components/QuizHeader';
import { theme } from '../constants/theme';
import { LessonResult as SavedResult, loadResults, saveResults, today } from '../storage/data';

type Option = { id: string; label?: string; swatches?: string[] };
type Question = {
  id: string;
  text: string;
  layout: 'list' | 'grid';
  correctId: string;
  options: Option[];
};

const LESSON_ID = 'color';

const questions: Question[] = [
  {
    id: 'q1',
    text: '¿Cuál de estas propiedades define qué tan vivo o apagado se ve un color?',
    layout: 'list',
    correctId: 'B',
    options: [
      { id: 'A', label: 'Tono' },
      { id: 'B', label: 'Saturación' },
      { id: 'C', label: 'Brillo' },
      { id: 'D', label: 'Temperatura' },
    ],
  },
  {
    id: 'q2',
    text: '¿Cuál de estas paletas está hecha solo de colores fríos?',
    layout: 'grid',
    correctId: 'D',
    options: [
      { id: 'A', swatches: ['#EF4444', '#F97316', '#EAB308'] },
      { id: 'B', swatches: ['#3B82F6', '#EF4444', '#22C55E'] },
      { id: 'C', swatches: ['#8B5CF6', '#EC4899', '#F97316'] },
      { id: 'D', swatches: ['#06B6D4', '#3B82F6', '#8B5CF6'] },
    ],
  },
  {
    id: 'q3',
    text: '¿Qué combinación de colores tiene el mayor contraste?',
    layout: 'list',
    correctId: 'B',
    options: [
      { id: 'A', label: 'Azul / Azul claro', swatches: ['#1E3A6E', '#2F5B94'] },
      { id: 'B', label: 'Negro / Blanco', swatches: ['#000000', '#FFFFFF'] },
      { id: 'C', label: 'Violeta / Violeta', swatches: ['#7C3AED', '#6D28D9'] },
      { id: 'D', label: 'Verde oscuro / Verde', swatches: ['#0F6B50', '#10B981'] },
    ],
  },
];

type Stage = 'intro' | 'quiz' | 'result';

export default function Lesson() {
  const [stage, setStage] = useState<Stage>('intro');
  const [current, setCurrent] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [lastResult, setLastResult] = useState<SavedResult | null>(null);

  const total = questions.length;
  const question = questions[current];
  const isGrid = question.layout === 'grid';

  useFocusEffect(
    useCallback(() => {
      async function fetchLastResult() {
        const saved = await loadResults();
        setLastResult(saved[0] ?? null);
      }
      fetchLastResult();
    }, [])
  );

  function getState(option: Option): OptionState {
    if (isChecked && option.id === question.correctId) return 'correct';
    if (isChecked && option.id === selectedId) return 'wrong';
    if (option.id === selectedId) return 'selected';
    return 'idle';
  }

  async function finish() {
    const results = await loadResults();
    const newResult: SavedResult = {
      id: Date.now().toString(),
      lessonId: LESSON_ID,
      correct: correctCount,
      total,
      date: today(),
    };
    await saveResults([newResult, ...results]);
    setStage('result');
  }

  function handleButton() {
    if (selectedId === null) return;

    if (!isChecked) {
      setIsChecked(true);
      if (selectedId === question.correctId) {
        setCorrectCount(correctCount + 1);
      } else {
        setHearts(Math.max(hearts - 1, 0));
      }
      return;
    }

    setSelectedId(null);
    setIsChecked(false);

    if (hearts === 0 || current + 1 >= total) {
      finish();
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        {stage === 'intro' && (
          <LessonIntro
            total={total}
            lastResult={
              lastResult ? `${lastResult.correct}/${lastResult.total} correctas · ${lastResult.date}` : null
            }
            onBack={() => router.back()}
            onStart={() => setStage('quiz')}
          />
        )}

        {stage === 'quiz' && (
          <>
            <QuizHeader current={current} total={total} hearts={hearts} onClose={() => router.back()} />

            <Text style={styles.question}>{question.text}</Text>

            <View style={isGrid ? styles.grid : styles.options}>
              {question.options.map((option) => (
                <OptionCard
                  key={option.id}
                  letter={option.id}
                  label={option.label}
                  swatches={option.swatches}
                  variant={isGrid ? 'tile' : 'row'}
                  state={getState(option)}
                  disabled={isChecked}
                  onPress={() => setSelectedId(option.id)}
                />
              ))}
            </View>

            <View style={selectedId === null && styles.disabled}>
              <Button label={isChecked ? 'Continuar' : 'Comprobar'} onPress={handleButton} />
            </View>
          </>
        )}

        {stage === 'result' && (
          <LessonResult correct={correctCount} total={total} onContinue={() => router.back()} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, padding: theme.spacing.xl, gap: theme.spacing.lg },
  question: {
    marginTop: theme.spacing.lg,
    fontSize: theme.text.subtitle,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  options: { flex: 1, gap: theme.spacing.sm },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    rowGap: theme.spacing.sm,
  },
  disabled: { opacity: 0.4 },
});
