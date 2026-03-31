import { useState, useEffect } from 'react';

// Тип для критерия
interface Criterion {
  id: string;
  label: string;
  keywords: string[];
  weight: number;
}

// Тип для результата
interface EvaluationResult {
  score: number;
  grade: string;
  color: string;
  details: { label: string; passed: boolean }[];
}

export const useFileEvaluator = (content: string | undefined) => {
  const [result, setResult] = useState<EvaluationResult | null>(null);

  // Критерии на основе вашего методического пособия
  const criteria: Criterion[] = [
    { id: 'text', label: 'Оформление текста (h1, p, b, i)', keywords: ['<h1', '<p', '<b', '<i'], weight: 20 },
    { id: 'lists', label: 'Работа со списками (ul, ol, li)', keywords: ['<ul', '<ol', '<li'], weight: 20 },
    { id: 'images', label: 'Изображения и подписи (img, figure)', keywords: ['<img', '<figure', 'alt='], weight: 20 },
    { id: 'tables', label: 'Таблицы (table, tr, td, th)', keywords: ['<table', '<tr', '<td', '<th'], weight: 20 },
    { id: 'forms', label: 'Формы и ввод (form, input, label)', keywords: ['<form', '<input', '<label', 'type='], weight: 20 },
  ];

  useEffect(() => {
    if (!content) {
      setResult(null);
      return;
    }

    const lowerContent = content.toLowerCase();
    let totalScore = 0;
    const details = criteria.map(c => {
      const passed = c.keywords.some(kw => lowerContent.includes(kw));
      if (passed) totalScore += c.weight;
      return { label: c.label, passed };
    });

    // Логика определения оценки
    let grade = '2 (Неуд.)';
    let color = '#f44336'; // Red

    if (totalScore >= 90) {
      grade = '5 (Отлично)';
      color = '#4caf50'; // Green
    } else if (totalScore >= 70) {
      grade = '4 (Хорошо)';
      color = '#2196f3'; // Blue
    } else if (totalScore >= 50) {
      grade = '3 (Удовл.)';
      color = '#ff9800'; // Orange
    }

    setResult({ score: totalScore, grade, color, details });
  }, [content]);

  return result;
};