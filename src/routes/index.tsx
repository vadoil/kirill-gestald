import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Send,
  Phone,
  MessageCircle,
  Clock,
  Video,
  Home as HomeIcon,
  ArrowUpRight,
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
  { href: "#about", label: "О подходе" },
  { href: "#topics", label: "Запросы" },
  { href: "#how", label: "Встречи" },
  { href: "#price", label: "Стоимость" },
  { href: "#faq", label: "Вопросы" },
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
    title: "Заявка",
    text: "Через форму, Telegram или WhatsApp — как удобно. Отвечаю в течение дня.",
  },
  {
    n: "02",
    title: "Формат",
    text: "Очно в Тольятти или онлайн. Выбираем удобный день и подходящий формат.",
  },
  {
    n: "03",
    title: "Знакомство",
    text: "Спокойно обсуждаем, что привело, и уточняем запрос. Без давления и обязательств.",
  },
  {
    n: "04",
    title: "Темп работы",
    text: "Договариваемся о регулярности — комфортно вам, без жёстких рамок.",
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

const romans = ["I", "II", "III", "IV", "V", "VI"];

function Index() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Toaster />

      {/* TOP BAR */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="font-display text-xl tracking-tight">Кирилл&nbsp;Чебруков</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              гештальт · Тольятти
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-[13px] text-foreground/70">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-[13px] border border-foreground/30 hover:border-foreground px-4 py-2 rounded-full transition-colors"
          >
            Записаться
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      {/* SIDE BRAND RAIL */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-6 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
        <span className="vrule h-24" />
        <span className="rotate-180" style={{ writingMode: "vertical-rl" }}>
          Частная практика · с 2018
        </span>
        <span className="vrule h-24" />
      </div>

      {/* HERO */}
      <section id="top" className="relative pt-28 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-14 items-end pb-16 lg:pb-24">
          {/* Left — type */}
          <div className="lg:col-span-7 relative">
            <div className="animate-fade-up flex items-center gap-4 text-[11px] uppercase tracking-[0.35em] text-muted-foreground mb-8">
              <span className="h-px w-12 bg-foreground/30" />
              Гештальт-психолог
              <span className="text-foreground/30">/</span>
              Тольятти &amp; онлайн
            </div>

            <h1 className="animate-fade-up-d1 font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.98] tracking-tight">
              Пространство,
              <br />
              где можно
              <br />
              <span className="italic font-normal text-[color:var(--accent)]">остановиться&nbsp;—</span>
              <br />
              и быть собой.
            </h1>

            <div className="animate-fade-up-d2 mt-10 grid sm:grid-cols-[1fr_auto] gap-8 items-end">
              <p className="text-base md:text-lg text-foreground/75 max-w-lg leading-relaxed">
                Меня зовут Кирилл. Работаю со взрослыми людьми, которым важно
                спокойно разобраться с тревогой, выгоранием и сложными периодами — без
                советов, оценок и спешки.
              </p>
              <div className="hidden sm:flex flex-col items-end gap-1 text-right">
                <span className="font-display text-3xl italic text-accent">~ 8 лет</span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  частной практики
                </span>
              </div>
            </div>

            <div className="animate-fade-up-d3 mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 px-7 text-sm"
              >
                <a href="#contact">
                  Записаться на консультацию
                  <ArrowUpRight className="size-4 ml-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full h-12 px-7 text-sm hover:bg-foreground/5"
              >
                <a href="#about">О подходе</a>
              </Button>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] grain">
              <img
                src={heroAsset.url}
                alt="Кирилл Чебруков — гештальт-психолог, портрет в кабинете"
                className="absolute inset-0 h-full w-full object-cover scale-105 animate-fade-up"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-background">
                <div className="text-[10px] uppercase tracking-[0.35em] text-background/80">
                  Кирилл Чебруков
                </div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-background/80">
                  №&nbsp;01
                </div>
              </div>
            </div>
            <div className="absolute -left-4 -top-4 hidden md:block font-display italic text-7xl text-accent/20 select-none">
              k.
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="border-y border-border/60 bg-secondary/40 overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-4 flex flex-wrap items-center gap-x-10 gap-y-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="flex items-center gap-2"><Lock className="size-3.5" /> Конфиденциально</span>
            <span className="text-foreground/20">●</span>
            <span className="flex items-center gap-2"><Video className="size-3.5" /> Очно и онлайн</span>
            <span className="text-foreground/20">●</span>
            <span>Сессия 60 минут</span>
            <span className="text-foreground/20">●</span>
            <span>Без оценок и советов</span>
            <span className="text-foreground/20">●</span>
            <span>Этика и супервизия</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <SectionHeading roman="I" kicker="О подходе" />
      <section id="about" className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              Спокойная, уважительная <span className="italic text-accent">работа</span> — рядом с вами.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-px bg-border/70 border border-border/70 rounded-sm overflow-hidden text-sm">
              {[
                ["Подход", "Гештальт"],
                ["Формат", "1 на 1"],
                ["Длительность", "60 минут"],
                ["Город", "Тольятти"],
              ].map(([k, v]) => (
                <div key={k} className="bg-background p-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">{k}</div>
                  <div className="font-display text-lg">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p className="font-display text-2xl md:text-[1.7rem] leading-snug text-foreground">
              Гештальт — это не про советы и не про «правильные» решения. Это совместная
              внимательная работа, в которой постепенно возвращается чувствительность,
              выбор и опора.
            </p>
            <p className="text-foreground/75">
              Я работаю со взрослыми людьми, переживающими тревогу, выгорание, сложности
              в отношениях или ощущение, что внутри что-то застряло и не двигается.
              Часто это не «диагноз» — это просто этап, в котором важна поддержка.
            </p>
            <p className="text-foreground/65">
              Я не обещаю быстрых результатов и не даю гарантий. Я обещаю внимание,
              профессиональную честность и пространство, в котором можно говорить о
              трудном без страха быть осуждённым.
            </p>
            <div className="pt-6 flex items-center gap-4">
              <span className="hairline flex-1" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Регулярная супервизия · личная терапия
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <SectionHeading roman="II" kicker="Запросы" />
      <section id="topics" className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 mb-14">
            <h2 className="lg:col-span-7 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              С чем приходят и о чём <span className="italic text-accent">можно говорить</span>.
            </h2>
            <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground text-base leading-relaxed self-end">
              Это не закрытый список. Если не уверены, подходит ли ваш запрос —
              <a href="#contact" className="text-foreground underline underline-offset-4 decoration-accent ml-1">
                напишите
              </a>
              , я подскажу.
            </p>
          </div>

          <ul className="border-t border-border">
            {topics.map((t, i) => (
              <li
                key={t}
                className="group border-b border-border flex items-center gap-6 md:gap-10 py-5 md:py-7 hover:bg-secondary/40 transition-colors px-2"
              >
                <span className="font-display text-sm text-accent tabular-nums w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl md:text-3xl flex-1">{t}</span>
                <ArrowUpRight className="size-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW */}
      <SectionHeading roman="III" kicker="Как проходят встречи" />
      <section id="how" className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 mb-16">
            <h2 className="lg:col-span-7 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
              Без спешки. <span className="italic text-accent">В вашем темпе.</span>
            </h2>
            <div className="lg:col-span-4 lg:col-start-9 text-foreground/75 leading-relaxed self-end">
              <p>
                Сессия — 60 минут. Очно в кабинете в Тольятти или онлайн в видеоформате.
                Первая встреча — пространство знакомства и уточнения запроса.
              </p>
              <div className="flex flex-wrap gap-4 pt-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="flex items-center gap-2"><HomeIcon className="size-3.5 text-accent" /> Очно</span>
                <span className="flex items-center gap-2"><Video className="size-3.5 text-accent" /> Онлайн</span>
                <span className="flex items-center gap-2"><Clock className="size-3.5 text-accent" /> 60 мин</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/70 border border-border/70 rounded-sm overflow-hidden">
            {steps.map((s) => (
              <div
                key={s.n}
                className="bg-background p-8 md:p-10 min-h-[260px] flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-10">
                  <span className="font-display text-5xl text-accent">{s.n}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">шаг</span>
                </div>
                <div className="font-display text-2xl mb-3">{s.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="py-24 md:py-32 bg-secondary/40 border-y border-border/60">
        <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <div className="font-display text-accent text-5xl mb-4 leading-none">“</div>
          <p className="font-display text-2xl md:text-4xl leading-[1.2] tracking-tight">
            Иногда самое смелое — это{" "}
            <span className="italic text-accent">разрешить себе</span>{" "}
            быть услышанным.
          </p>
          <div className="mt-8 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Кирилл Чебруков · о терапии
          </div>
        </div>
      </section>

      {/* PRICE */}
      <SectionHeading roman="IV" kicker="Стоимость" />
      <section id="price" className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] max-w-3xl mb-14">
            Прозрачно и <span className="italic text-accent">без скрытых условий</span>.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-sm overflow-hidden">
            {[
              {
                title: "Индивидуальная консультация",
                format: "Очно · Тольятти",
                dur: "60 минут",
                price: "3 500",
                icon: HomeIcon,
              },
              {
                title: "Онлайн-консультация",
                format: "Видеоформат",
                dur: "60 минут",
                price: "3 000",
                icon: Video,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-background p-10 md:p-14 flex flex-col"
              >
                <div className="flex items-center justify-between mb-12">
                  <p.icon className="size-5 text-accent" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {p.format}
                  </span>
                </div>
                <div className="font-display text-2xl md:text-3xl mb-2 max-w-xs">
                  {p.title}
                </div>
                <div className="text-sm text-muted-foreground mb-12">{p.dur}</div>
                <div className="mt-auto flex items-baseline justify-between border-t border-border pt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl md:text-6xl">{p.price}</span>
                    <span className="font-display text-2xl text-muted-foreground">₽</span>
                  </div>
                  <a href="#contact" className="text-sm inline-flex items-center gap-1 hover:text-accent transition-colors">
                    Записаться <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground mt-10 max-w-xl">
            Если у вас остались вопросы перед первой встречей — напишите мне заранее.
            Я отвечу лично и спокойно.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <SectionHeading roman="V" kicker="Частые вопросы" />
      <section id="faq" className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02]">
            То, о чём чаще всего <span className="italic text-accent">спрашивают</span>.
          </h2>
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left font-display text-lg md:text-xl hover:no-underline gap-6">
                    <span className="flex items-baseline gap-5">
                      <span className="text-[11px] tabular-nums text-accent tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{f.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12 text-muted-foreground text-base leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <SectionHeading roman="VI" kicker="Записаться" dark />
      <section id="contact" className="bg-primary text-primary-foreground pb-28 md:pb-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] mb-8">
              Первый шаг — <span className="italic text-accent">это уже многое</span>.
            </h2>
            <p className="text-primary-foreground/75 leading-relaxed mb-12 max-w-md">
              Оставьте заявку, и я свяжусь в течение дня, чтобы предложить удобное время.
              Если так комфортнее — напишите напрямую в мессенджере.
            </p>

            <div className="space-y-1 mb-10 border-t border-primary-foreground/15">
              {[
                { Icon: MessageCircle, label: "Telegram", value: "@kirill_psy", href: "https://t.me/" },
                { Icon: Send, label: "WhatsApp", value: "напишите в чате", href: "https://wa.me/" },
                { Icon: Phone, label: "Телефон", value: "+7 (000) 000-00-00", href: "tel:+70000000000" },
                { Icon: MapPin, label: "Тольятти", value: "кабинет и онлайн" },
              ].map(({ Icon, label, value, href }) => {
                const Inner = (
                  <div className="flex items-center justify-between py-5 border-b border-primary-foreground/15 group">
                    <span className="flex items-center gap-4 text-primary-foreground/90">
                      <Icon className="size-4 text-accent" />
                      <span className="text-[11px] uppercase tracking-[0.3em] text-primary-foreground/60">{label}</span>
                    </span>
                    <span className="font-display text-lg group-hover:text-accent transition-colors">
                      {value}
                    </span>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block">{Inner}</a>
                ) : (
                  <div key={label}>{Inner}</div>
                );
              })}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="lg:col-span-6 lg:col-start-7 bg-background text-foreground rounded-sm p-8 md:p-12 space-y-6 relative grain"
          >
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-display text-2xl">Оставить заявку</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">конфиденциально</div>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                Как к вам обращаться
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Имя"
                className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                Удобный способ связи
              </label>
              <Input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="Телефон, Telegram или e-mail"
                className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                Коротко, что привело (по желанию)
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Можно несколькими словами — этого достаточно"
                rows={4}
                className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground text-base resize-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-13 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 mt-4"
            >
              Отправить заявку
              <ArrowUpRight className="size-4 ml-1" />
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Ваше сообщение конфиденциально. Я отвечу лично.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-14">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5">
            <div className="font-display text-3xl mb-1">Кирилл Чебруков</div>
            <div className="text-sm text-muted-foreground">
              Гештальт-психолог · Тольятти &amp; онлайн
            </div>
          </div>
          <div className="md:col-span-3 text-sm space-y-1 text-muted-foreground">
            <div>Telegram · WhatsApp</div>
            <div>+7 (000) 000-00-00</div>
            <div>Тольятти</div>
          </div>
          <p className="md:col-span-4 text-sm text-muted-foreground md:text-right max-w-xs md:ml-auto leading-relaxed">
            Всё, что обсуждается на сессиях, остаётся между нами. Бережно и с уважением.
          </p>
        </div>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Кирилл Чебруков · Частная практика</span>
          <a href="#top" className="hover:text-foreground transition-colors">Наверх ↑</a>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  roman,
  kicker,
  dark,
}: {
  roman: string;
  kicker: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${dark ? "bg-primary text-primary-foreground" : ""}`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-20 md:pt-28 pb-12 md:pb-14 flex items-baseline justify-between">
        <div className="flex items-baseline gap-6">
          <span className={`font-display italic text-3xl md:text-4xl ${dark ? "text-accent" : "text-accent"}`}>
            {roman}.
          </span>
          <span className={`text-[11px] uppercase tracking-[0.35em] ${dark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
            {kicker}
          </span>
        </div>
        <span className={`hidden md:block flex-1 mx-8 ${dark ? "" : ""}`}>
          <span className={`block h-px ${dark ? "bg-primary-foreground/20" : "bg-border"}`} />
        </span>
        <span className={`text-[11px] uppercase tracking-[0.35em] ${dark ? "text-primary-foreground/40" : "text-muted-foreground/70"}`}>
          {roman} / VI
        </span>
      </div>
    </div>
  );
}
