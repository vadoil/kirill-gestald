import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

type Cat = "anxiety" | "burnout" | "relations" | "self";

type Option = { label: string; weights: Partial<Record<Cat, number>> };
type Question = { q: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    q: "Что чаще всего возникает у вас в последние недели?",
    options: [
      { label: "Тревога, беспокойство, «прокручивание» мыслей", weights: { anxiety: 2 } },
      { label: "Усталость, апатия, нет сил даже на привычное", weights: { burnout: 2 } },
      { label: "Сложности и напряжение в близких отношениях", weights: { relations: 2 } },
      { label: "Ощущение, что я потерял(а) контакт с собой", weights: { self: 2 } },
    ],
  },
  {
    q: "Как у вас со сном и восстановлением?",
    options: [
      { label: "Трудно засыпать, тревожные мысли мешают", weights: { anxiety: 2 } },
      { label: "Сплю, но не восстанавливаюсь — будто «выжат(а)»", weights: { burnout: 2 } },
      { label: "Сон зависит от того, что происходит с близкими", weights: { relations: 1, anxiety: 1 } },
      { label: "В целом нормально", weights: { self: 1 } },
    ],
  },
  {
    q: "Что вы чувствуете по утрам?",
    options: [
      { label: "Напряжение и тревогу за день", weights: { anxiety: 2 } },
      { label: "«Не хочу вставать» — внутри пусто", weights: { burnout: 2 } },
      { label: "Раздражение или обиду на близких", weights: { relations: 2 } },
      { label: "Растерянность — не понимаю, чего хочу", weights: { self: 2 } },
    ],
  },
  {
    q: "Что вам сейчас даётся тяжелее всего?",
    options: [
      { label: "Расслабиться и отпустить контроль", weights: { anxiety: 2 } },
      { label: "Чувствовать радость и интерес", weights: { burnout: 2 } },
      { label: "Говорить о своих чувствах вслух", weights: { relations: 1, self: 1 } },
      { label: "Принимать решения и слышать себя", weights: { self: 2 } },
    ],
  },
  {
    q: "Что вам сейчас хочется больше всего?",
    options: [
      { label: "Перестать тревожиться и выдохнуть", weights: { anxiety: 2 } },
      { label: "Вернуть силы и желание жить", weights: { burnout: 2 } },
      { label: "Разобраться в отношениях и границах", weights: { relations: 2 } },
      { label: "Понять себя и найти опору", weights: { self: 2 } },
    ],
  },
  {
    q: "Как давно это длится?",
    options: [
      { label: "Несколько недель", weights: { anxiety: 1, burnout: 1 } },
      { label: "Несколько месяцев", weights: { burnout: 1, self: 1 } },
      { label: "Больше полугода", weights: { self: 1, relations: 1, burnout: 1 } },
      { label: "Сложно сказать — то лучше, то хуже", weights: { anxiety: 1, self: 1 } },
    ],
  },
];

const RESULTS: Record<Cat, { title: string; summary: string; bullets: string[] }> = {
  anxiety: {
    title: "Похоже, сейчас вам ближе всего — тревога и внутреннее напряжение",
    summary:
      "Это не «слабость» и не «характер». Тревога — это сигнал, с которым можно бережно разобраться: научиться замечать её раньше, понимать, о чём она, и возвращать себе опору.",
    bullets: [
      "Работа с телесным напряжением и дыханием",
      "Понимание триггеров и «прокручивания» мыслей",
      "Возвращение чувства устойчивости и контроля",
    ],
  },
  burnout: {
    title: "Похоже, вы переживаете эмоциональное выгорание",
    summary:
      "Когда долго «надо», ресурс заканчивается тихо — и это нормально. В терапии мы аккуратно восстанавливаем чувствительность к себе и помогаем вернуть энергию без давления.",
    bullets: [
      "Бережное возвращение интереса и желаний",
      "Работа с границами и «должен/должна»",
      "Поиск опоры в себе, а не во внешних задачах",
    ],
  },
  relations: {
    title: "Похоже, ваш запрос — про отношения и близость",
    summary:
      "Сложности в отношениях редко бывают «про другого». Чаще — про то, как мы чувствуем себя рядом с другим. В терапии можно увидеть это спокойно и найти свой способ быть в близости.",
    bullets: [
      "Личные границы без чувства вины",
      "Конфликты и обиды — что за ними стоит",
      "Способность говорить о чувствах и быть услышанным",
    ],
  },
  self: {
    title: "Похоже, сейчас вам важно вернуть контакт с собой",
    summary:
      "Когда внутри размыто — трудно выбирать, чувствовать и опираться на себя. В гештальт-подходе мы аккуратно возвращаем этот контакт, шаг за шагом.",
    bullets: [
      "Понимание своих желаний и ориентиров",
      "Принятие себя — без оценки и сравнений",
      "Опора, которая не зависит от внешних обстоятельств",
    ],
  },
};

export function QuizSection() {
  const [step, setStep] = useState(1); // 1..N = questions, N+1 = result
  const [scores, setScores] = useState<Record<Cat, number>>({
    anxiety: 0,
    burnout: 0,
    relations: 0,
    self: 0,
  });
  const [form, setForm] = useState({ name: "", contact: "" });
  const [sent, setSent] = useState(false);

  const total = QUESTIONS.length;
  const isIntro = step === 0;
  const isResult = step > total;
  const qIndex = step - 1;

  const top = (Object.entries(scores) as [Cat, number][]).sort((a, b) => b[1] - a[1])[0][0];
  const result = RESULTS[top];

  const pick = (opt: Option) => {
    const next = { ...scores };
    for (const k of Object.keys(opt.weights) as Cat[]) {
      next[k] = (next[k] || 0) + (opt.weights[k] || 0);
    }
    setScores(next);
    setStep(step + 1);
  };

  const restart = () => {
    setStep(0);
    setScores({ anxiety: 0, burnout: 0, relations: 0, self: 0 });
    setSent(false);
    setForm({ name: "", contact: "" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) {
      toast.error("Оставьте имя и контакт — я свяжусь лично.");
      return;
    }
    setSent(true);
    toast.success("Заявка отправлена. Скидка 20% закреплена за вами.");
  };

  const progress = isIntro ? 0 : isResult ? 100 : Math.round((qIndex / total) * 100);

  return (
    <section id="quiz" className="relative pb-28 md:pb-40 pt-4">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-6">
              <Sparkles className="size-3.5 text-accent" />
              Короткий опрос · 1 минута
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              Что с вами <span className="italic text-accent">сейчас происходит</span>?
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground text-base leading-relaxed self-end">
            Ответьте на 6 коротких вопросов — я подскажу, в какой теме сейчас
            больше напряжения, и закреплю за вами{" "}
            <span className="text-foreground">скидку 20% на первую консультацию</span>.
          </p>
        </div>

        <div className="relative bg-secondary/40 border border-border rounded-sm overflow-hidden">
          {/* Progress */}
          <div className="h-1 w-full bg-border/60">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-8 md:p-14 min-h-[420px] flex flex-col">
            {isIntro && (
              <div className="max-w-2xl m-auto text-center">
                <div className="font-display text-3xl md:text-4xl leading-tight mb-6">
                  Анонимно. Без оценок. <span className="italic text-accent">Без диагнозов.</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Это не тест и не диагностика. Это бережное самонаблюдение, которое
                  поможет назвать то, что вы сейчас проживаете — и сделать первый шаг.
                </p>
                <Button
                  size="lg"
                  onClick={() => setStep(1)}
                  className="rounded-full h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Начать опрос
                  <ArrowUpRight className="size-4 ml-1" />
                </Button>
                <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  6 вопросов · ~1 минута · конфиденциально
                </div>
              </div>
            )}

            {!isIntro && !isResult && (
              <div className="max-w-3xl w-full mx-auto">
                <div className="flex items-baseline justify-between mb-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span>
                    Вопрос <span className="text-accent font-display text-base not-italic">
                      {String(qIndex + 1).padStart(2, "0")}
                    </span>{" "}
                    из {String(total).padStart(2, "0")}
                  </span>
                  <button
                    onClick={restart}
                    className="hover:text-foreground transition-colors"
                  >
                    Начать заново
                  </button>
                </div>
                <h3 className="font-display text-2xl md:text-3xl leading-snug mb-10">
                  {QUESTIONS[qIndex].q}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {QUESTIONS[qIndex].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => pick(opt)}
                      className="group text-left p-5 md:p-6 bg-background border border-border rounded-sm hover:border-foreground hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-accent/40 group-hover:bg-accent shrink-0 transition-colors" />
                        <span className="text-[15px] leading-relaxed text-foreground/90 group-hover:text-foreground">
                          {opt.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isResult && (
              <div className="grid lg:grid-cols-12 gap-10 w-full">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-accent mb-4">
                    Ваш мягкий ориентир
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight mb-6">
                    {result.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed mb-8">{result.summary}</p>
                  <ul className="space-y-3 mb-8">
                    {result.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px]">
                        <CheckCircle2 className="size-4 text-accent mt-1 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground max-w-md">
                    Это не диагноз и не медицинская оценка. Окончательное понимание
                    рождается в личной встрече.
                  </p>
                  <button
                    onClick={restart}
                    className="mt-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Пройти опрос заново
                  </button>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-primary text-primary-foreground rounded-sm p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-6 right-6 font-display text-5xl md:text-6xl text-accent leading-none">
                      −20%
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-primary-foreground/60 mb-3">
                      Скидка на первую встречу
                    </div>
                    <div className="font-display text-2xl md:text-3xl leading-tight mb-6 max-w-[18ch]">
                      Закрепить скидку за собой
                    </div>

                    {sent ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-accent">
                          <CheckCircle2 className="size-5" />
                          <span className="font-display text-lg">Заявка принята</span>
                        </div>
                        <p className="text-primary-foreground/75 text-sm leading-relaxed">
                          Я свяжусь с вами в течение дня и предложу удобное время.
                          Скидка 20% закреплена за вашей первой консультацией.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={submit} className="space-y-4">
                        <Input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Как к вам обращаться"
                          className="h-11 bg-transparent border-0 border-b border-primary-foreground/30 rounded-none px-0 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-0 focus-visible:border-accent"
                        />
                        <Input
                          value={form.contact}
                          onChange={(e) => setForm({ ...form, contact: e.target.value })}
                          placeholder="Телефон или мессенджер"
                          className="h-11 bg-transparent border-0 border-b border-primary-foreground/30 rounded-none px-0 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-0 focus-visible:border-accent"
                        />
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full rounded-full h-12 bg-accent text-primary hover:bg-accent/90 mt-2"
                        >
                          Получить скидку 20%
                          <ArrowUpRight className="size-4 ml-1" />
                        </Button>
                        <p className="text-[11px] text-primary-foreground/55 text-center">
                          Конфиденциально · отвечу лично
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
