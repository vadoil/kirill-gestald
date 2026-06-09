import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  MapPin,
  Lock,
  Heart,
  Send,
  Phone,
  MessageCircle,
  Clock,
  Video,
  Home as HomeIcon,
} from "lucide-react";
import heroAsset from "../assets/kirill-hero.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Кирилл Чебруков — гештальт-психолог в Тольятти" },
      {
        name: "description",
        content:
          "Частный гештальт-психолог в Тольятти. Очные и онлайн-консультации: тревога, выгорание, отношения, поиск опоры. Бережно и конфиденциально.",
      },
      { property: "og:title", content: "Кирилл Чебруков — гештальт-психолог в Тольятти" },
      {
        property: "og:description",
        content:
          "Частная практика. Очные встречи в Тольятти и онлайн в бережном гештальт-подходе.",
      },
      { property: "og:image", content: heroAsset.url },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Кирилл Чебруков — гештальт-психолог",
          description:
            "Частная практика гештальт-психолога в Тольятти. Очные и онлайн-консультации.",
          areaServed: "Тольятти",
          address: { "@type": "PostalAddress", addressLocality: "Тольятти", addressCountry: "RU" },
          image: heroAsset.url,
        }),
      },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#about", label: "О психологе" },
  { href: "#topics", label: "Запросы" },
  { href: "#how", label: "Как проходят" },
  { href: "#price", label: "Стоимость" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contact", label: "Записаться" },
];

const topics = [
  "Тревога и беспокойство",
  "Сложности в отношениях",
  "Эмоциональное выгорание",
  "Кризисы и сложные периоды",
  "Самооценка и принятие себя",
  "Личные границы",
  "Чувство одиночества",
  "Трудности с проживанием эмоций",
  "Внутреннее напряжение",
  "Поиск опоры и ясности",
];

const steps = [
  {
    n: "01",
    title: "Вы оставляете заявку",
    text: "Через форму на сайте, Telegram или WhatsApp — как удобно. Я отвечаю в течение дня.",
  },
  {
    n: "02",
    title: "Согласуем формат и время",
    text: "Очно в Тольятти или онлайн. Выбираем удобный день и подходящий формат.",
  },
  {
    n: "03",
    title: "Знакомимся на первой встрече",
    text: "Спокойно обсуждаем, что привело, и уточняем запрос. Без давления и обязательств.",
  },
  {
    n: "04",
    title: "Определяем формат работы",
    text: "Договариваемся о темпе и регулярности — комфортно вам, без жёстких рамок.",
  },
];

const faqs = [
  {
    q: "С чем можно ко мне обратиться?",
    a: "С тревогой, выгоранием, сложностями в отношениях, кризисами, утратой опоры, ощущением, что что-то идёт не так. Если сомневаетесь — напишите, мы вместе уточним.",
  },
  {
    q: "Что будет на первой консультации?",
    a: "Это встреча-знакомство. Мы спокойно поговорим о том, что вас привело, и решим, подходит ли вам формат работы со мной. Без обязательств продолжать.",
  },
  {
    q: "Сколько встреч обычно нужно?",
    a: "По-разному. Иногда хватает нескольких сессий, иногда нужна более длительная работа. На первой встрече я смогу сориентировать по примерному темпу.",
  },
  {
    q: "Можно ли работать онлайн?",
    a: "Да. Онлайн-сессии проходят в видеоформате и по бережности и эффективности не уступают очным.",
  },
  {
    q: "Всё ли остаётся конфиденциальным?",
    a: "Да. Всё, что вы рассказываете на сессии, остаётся между нами. Это профессиональный и этический стандарт.",
  },
  {
    q: "Что делать, если мне трудно говорить о чувствах?",
    a: "Это нормально и часто встречается. Мы движемся в вашем темпе, и я помогаю мягко находить слова — без принуждения и оценки.",
  },
  {
    q: "Как понять, подойдёт ли мне такой формат?",
    a: "Лучший способ — прийти на первую встречу. После неё вы почувствуете, насколько вам со мной комфортно и стоит ли продолжать.",
  },
  {
    q: "Как записаться?",
    a: "Оставьте заявку в форме ниже или напишите в Telegram/WhatsApp. Я отвечу и предложу удобное время.",
  },
];

function Index() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) {
      toast.error("Пожалуйста, оставьте имя и контакт");
      return;
    }
    toast.success("Спасибо. Я свяжусь с вами в течение дня.");
    setForm({ name: "", contact: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />

      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
          <a href="#top" className="font-display text-lg tracking-tight text-background/95 lg:text-background">
            Кирилл Чебруков
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-background/80">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-background transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center text-sm border border-background/40 text-background px-4 py-2 rounded-full hover:bg-background hover:text-foreground transition-colors"
          >
            Записаться
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Кирилл Чебруков — гештальт-психолог в кабинете"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 min-h-[100svh] flex items-center pt-32 pb-20">
          <div className="max-w-2xl text-background">
            <div className="animate-fade-up flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-background/70 mb-8">
              <span className="h-px w-10 bg-background/50" />
              Гештальт-психолог · Тольятти
            </div>
            <h1 className="animate-fade-up-d1 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-6">
              Пространство,
              <br />
              где можно
              <br />
              <em className="not-italic text-[color:var(--accent)]">остановиться</em>
              <span className="text-background"> и быть собой.</span>
            </h1>
            <p className="animate-fade-up-d2 text-base md:text-lg text-background/85 max-w-xl mb-10 leading-relaxed">
              Меня зовут Кирилл Чебруков. Помогаю взрослым людям разобраться с тревогой,
              выгоранием и сложными периодами — в бережном темпе и без оценок.
            </p>

            <div className="animate-fade-up-d2 flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 rounded-full h-12 px-7 text-sm"
              >
                <a href="#contact">Записаться на консультацию</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-7 text-sm bg-transparent border-background/50 text-background hover:bg-background/10 hover:text-background"
              >
                <a href="#contact">Задать вопрос</a>
              </Button>
            </div>

            <div className="animate-fade-up-d3 flex flex-wrap gap-x-8 gap-y-3 text-sm text-background/75">
              <span className="flex items-center gap-2">
                <Video className="size-4" /> Очно и онлайн
              </span>
              <span className="flex items-center gap-2">
                <Lock className="size-4" /> Конфиденциально
              </span>
              <span className="flex items-center gap-2">
                <Heart className="size-4" /> Бережный подход
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-36 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              О психологе
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Спокойная,
              <br /> уважительная
              <br /> работа.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Я частнопрактикующий гештальт-психолог. Работаю со взрослыми людьми, которые
              переживают тревогу, выгорание, сложности в отношениях или ощущение, что внутри
              что-то застряло и не двигается.
            </p>
            <p>
              Мой подход — это не советы и не «правильные» решения. Это совместная внимательная
              работа, в которой человек постепенно возвращает себе чувствительность, выбор и
              опору. В гештальт-подходе важен живой контакт: с собой, со своими чувствами и со
              своей жизнью.
            </p>
            <p className="text-foreground/70">
              Я не обещаю быстрых результатов и не даю гарантий. Но я обещаю внимание,
              профессиональную честность и пространство, в котором можно говорить о трудном
              без страха быть осужденным.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {[
                { t: "Гештальт-подход", d: "Современный, исследованный, человечный метод." },
                { t: "Частная практика", d: "Внимание к каждому клиенту, без потока." },
                { t: "Этика и супервизия", d: "Регулярная работа с супервизором." },
                { t: "Без давления", d: "Вы сами выбираете темп и глубину." },
              ].map((b) => (
                <div key={b.t} className="border-t border-border pt-4">
                  <div className="font-display text-xl mb-1">{b.t}</div>
                  <div className="text-sm text-muted-foreground">{b.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section id="topics" className="py-24 md:py-36 bg-secondary/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              С чем работаю
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Запросы, с которыми
              <br /> можно прийти.
            </h2>
            <p className="text-muted-foreground text-lg">
              Это не закрытый список. Если не уверены, подходит ли ваш запрос —
              <a href="#contact" className="text-foreground underline underline-offset-4 ml-1">
                напишите
              </a>
              , я подскажу.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/70 border border-border/70 rounded-xl overflow-hidden">
            {topics.map((t, i) => (
              <div
                key={t}
                className="bg-background p-6 md:p-8 flex items-start gap-4 hover:bg-secondary/40 transition-colors"
              >
                <span className="font-display text-sm text-accent mt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-display">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-24 md:py-36 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Как проходят встречи
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight">
                Без спешки.
                <br /> В вашем темпе.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-lg">
                Встречи проходят очно — в уютном кабинете в Тольятти, или онлайн — в видеоформате.
                Одна сессия длится 60 минут. Первая встреча — это пространство знакомства: на ней
                мы вместе уточняем, что именно вас привело, и как может быть устроена работа.
              </p>
              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <HomeIcon className="size-4 text-accent" /> Очно в Тольятти
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Video className="size-4 text-accent" /> Онлайн
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 text-accent" /> 60 минут
                </span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="border border-border rounded-2xl p-7 bg-card hover:border-accent/40 transition-colors"
              >
                <div className="font-display text-3xl text-accent mb-6">{s.n}</div>
                <div className="font-display text-xl mb-3">{s.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 md:py-36 bg-secondary/50">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Стоимость
            </div>
            <h2 className="font-display text-4xl md:text-5xl">Прозрачно и без скрытых условий.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Индивидуальная консультация",
                format: "Очно · Тольятти",
                dur: "60 минут",
                price: "3 500 ₽",
                icon: HomeIcon,
              },
              {
                title: "Онлайн-консультация",
                format: "Видеоформат",
                dur: "60 минут",
                price: "3 000 ₽",
                icon: Video,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-background border border-border rounded-2xl p-8 md:p-10 flex flex-col"
              >
                <p.icon className="size-6 text-accent mb-6" />
                <div className="font-display text-2xl mb-2">{p.title}</div>
                <div className="text-sm text-muted-foreground mb-8">
                  {p.format} · {p.dur}
                </div>
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="font-display text-4xl">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/ сессия</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-10 max-w-xl mx-auto">
            Если у вас остались вопросы перед первой встречей — вы можете написать мне заранее.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-36 bg-background">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Частые вопросы
            </div>
            <h2 className="font-display text-4xl md:text-5xl">
              То, о чём чаще всего спрашивают.
            </h2>
          </div>

          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="py-6 text-left font-display text-lg md:text-xl hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-36 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60 mb-4">
              Записаться
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
              Первый шаг — это
              <br /> уже многое.
            </h2>
            <p className="text-primary-foreground/75 leading-relaxed mb-10">
              Оставьте заявку, и я свяжусь с вами в течение дня, чтобы предложить удобное время.
              Если так комфортнее — напишите напрямую в мессенджере.
            </p>

            <div className="space-y-3 mb-10">
              <a
                href="https://t.me/"
                className="flex items-center gap-3 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="size-5 text-accent" /> Telegram · @kirill_psy
              </a>
              <a
                href="https://wa.me/"
                className="flex items-center gap-3 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                <Send className="size-5 text-accent" /> WhatsApp
              </a>
              <a
                href="tel:+70000000000"
                className="flex items-center gap-3 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
              >
                <Phone className="size-5 text-accent" /> +7 (000) 000-00-00
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/75 pt-2">
                <MapPin className="size-5 text-accent" /> Тольятти · кабинет и онлайн
              </div>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="md:col-span-7 bg-background text-foreground rounded-2xl p-8 md:p-10 space-y-5"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Как к вам обращаться</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Имя"
                className="h-12 bg-secondary/40 border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Удобный способ связи
              </label>
              <Input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="Телефон, Telegram или e-mail"
                className="h-12 bg-secondary/40 border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Коротко, что привело (по желанию)
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Можно несколькими словами — этого достаточно"
                rows={4}
                className="bg-secondary/40 border-border resize-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              Отправить заявку
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Ваше сообщение конфиденциально. Я отвечу лично.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-3 gap-8 text-sm text-muted-foreground">
          <div>
            <div className="font-display text-foreground text-lg mb-1">Кирилл Чебруков</div>
            <div>Гештальт-психолог · Тольятти</div>
          </div>
          <div className="space-y-1">
            <div>Telegram · WhatsApp</div>
            <div>+7 (000) 000-00-00</div>
            <div>Тольятти</div>
          </div>
          <div className="md:text-right">
            Всё, что обсуждается на сессиях, остаётся между нами. Бережно и с уважением.
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6 lg:px-10 mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Кирилл Чебруков</span>
          <span>Частная практика</span>
        </div>
      </footer>
    </div>
  );
}
