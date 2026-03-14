export type Difficulty = '初级' | '中级' | '高级';

export interface Question {
  id: string;
  sentenceParts: string[]; // e.g., ["", " tired, she still finished the report."]
  blanks: {
    id: string;
    correctAnswer: string;
    options: string[];
    explanation: {
      rule: string;
      example: string;
      commonMistakes: string;
    };
  }[];
  category: string;
  difficulty: Difficulty;
}

export const QUESTION_BANK: Question[] = [
  {
    id: '1',
    sentenceParts: ["", " tired, she still finished the report."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'Although',
        options: ['Because', 'Although', 'Unless', 'Since'],
        explanation: {
          rule: "Although 引导让步状语从句，表示'尽管'。句子表达的是尽管累了，她还是完成了报告，存在转折关系。",
          example: "Although it was raining, they went out for a walk.",
          commonMistakes: "容易误用 Because (因为)，但上下文逻辑是转折而非因果。"
        }
      }
    ],
    category: '状语从句',
    difficulty: '初级'
  },
  {
    id: '2',
    sentenceParts: ["The boy ", " is my brother."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'who is playing football',
        options: ['who is playing football', 'which is playing football', 'whom is playing football', 'whose is playing football'],
        explanation: {
          rule: "who 引导定语从句修饰人（The boy），在从句中作主语。",
          example: "The girl who is singing is my sister.",
          commonMistakes: "误用 which (修饰物) 或 whom (在从句中作宾语)。"
        }
      }
    ],
    category: '定语从句',
    difficulty: '初级'
  },
  {
    id: '3',
    sentenceParts: ["", " the homework, the student went out to play."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'Having finished',
        options: ['Finish', 'Finished', 'To finish', 'Having finished'],
        explanation: {
          rule: "现在分词的完成式 Having done 表示动作发生在主句动作之前。学生是先完成作业再出去玩的。",
          example: "Having seen the movie, I didn't want to see it again.",
          commonMistakes: "误用 Finished (被动) 或 To finish (目的)。"
        }
      }
    ],
    category: '非谓语动词',
    difficulty: '中级'
  },
  {
    id: '4',
    sentenceParts: ["I don't know ", "."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'where he lives',
        options: ['where does he live', 'where he lives', 'where did he live', 'where he live'],
        explanation: {
          rule: "宾语从句要用陈述语序（主语+谓语），不能用疑问语序。",
          example: "Can you tell me what time it is?",
          commonMistakes: "习惯性使用疑问语序 where does he live。"
        }
      }
    ],
    category: '宾语从句',
    difficulty: '初级'
  },
  {
    id: '5',
    sentenceParts: ["", " by the teacher, the boy felt very happy."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'Praised',
        options: ['Praising', 'Praised', 'To praise', 'Having praised'],
        explanation: {
          rule: "过去分词 done 表示被动和完成。男孩是被老师表扬，所以用 Praised。",
          example: "Seen from the hill, the city looks beautiful.",
          commonMistakes: "误用 Praising (主动) 或 To praise (将来/目的)。"
        }
      }
    ],
    category: '非谓语动词',
    difficulty: '中级'
  },
  {
    id: '6',
    sentenceParts: ["The news ", " our team won the game is exciting."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'that',
        options: ['which', 'that', 'what', 'whether'],
        explanation: {
          rule: "that 引导同位语从句，解释说明 news 的具体内容，that 在从句中不作成分。",
          example: "The fact that he failed the exam surprised us.",
          commonMistakes: "误认为定语从句而选用 which。which 在定语从句中需作成分。"
        }
      }
    ],
    category: '同位语从句',
    difficulty: '高级'
  },
  {
    id: '7',
    sentenceParts: ["It is important ", " English well."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'to learn',
        options: ['learn', 'learning', 'to learn', 'learned'],
        explanation: {
          rule: "It is + adj. + to do sth. 是固定句型，It 是形式主语，真正的主语是不定式。",
          example: "It is necessary to wear a mask.",
          commonMistakes: "误用动名词 learning。"
        }
      }
    ],
    category: '非谓语动词',
    difficulty: '初级'
  },
  {
    id: '8',
    sentenceParts: ["", " his age, he did a good job."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'Considering',
        options: ['Considered', 'Considering', 'To consider', 'Consider'],
        explanation: {
          rule: "Considering 是介词化的分词，意为'考虑到'，常作状语。",
          example: "Considering the weather, the event was a success.",
          commonMistakes: "误用 Considered。"
        }
      }
    ],
    category: '独立主格/分词状语',
    difficulty: '高级'
  },
  {
    id: '9',
    sentenceParts: ["He spoke so fast ", " I couldn't follow him."],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'that',
        options: ['which', 'that', 'as', 'than'],
        explanation: {
          rule: "so...that... 引导结果状语从句，意为'如此...以至于...'。",
          example: "She was so tired that she fell asleep immediately.",
          commonMistakes: "误用 which 或 as。"
        }
      }
    ],
    category: '状语从句',
    difficulty: '初级'
  },
  {
    id: '10',
    sentenceParts: ["", " weather it is!"],
    blanks: [
      {
        id: 'b1',
        correctAnswer: 'What fine',
        options: ['How fine', 'What fine', 'What a fine', 'How a fine'],
        explanation: {
          rule: "What + (adj.) + 不可数名词 + 主语 + 谓语！weather 是不可数名词，不能加 a。",
          example: "What beautiful music it is!",
          commonMistakes: "误用 How (修饰形容词) 或加了 a。"
        }
      }
    ],
    category: '感叹句',
    difficulty: '中级'
  }
];
