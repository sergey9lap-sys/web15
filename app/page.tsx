"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, MessageCircle, Phone, Send, Users } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";

const pains = [
  "Есть опыт и результаты, стабильных продаж нет",
  "Клиенты приходят нестабильно, доход зависит от запусков или предсказания нумеролога",
  "Блог требует всё больше времени, заявок становится меньше",
  "Нужны клиенты сильнее и платежеспособнее, путь к ним пока неясен",
  "Есть ощущение, что текущие продукты уже переросли, следующий шаг пока неясен",
  "После разных форматов системы всё равно нет",
];

const agenda = [
  {
    title: "Почему старая модель роста перестала работать",
    text: "Что изменилось в поведении клиентов и на рынке. Почему то, что работало три года назад, сейчас даёт всё меньше результата",
  },
  {
    title: "Какие продукты позволяют расти сегодня",
    text: "Консалтинг, мастер-группы, клубы, стратегические программы, агентские модели. Разберём каждый формат: что это, кому подходит и как продаётся",
  },
  {
    title: "Как понять, какой формат подходит именно вам",
    text: "Как не копировать чужие схемы и выстроить модель под свой опыт, аудиторию и цель по доходу",
  },
  {
    title: "Как сформировать цену и не бояться, что не купят",
    text: "Почему высокий чек — это не про наглость, а про архитектуру продукта. Как объяснить ценность так, чтобы клиент сам попросил выставить счёт",
  },
  {
    title: "Как перейти в более высокий сегмент клиентов",
    text: "Даже если сейчас вы продаёте недорогие продукты, а блог остаётся маленьким",
  },
];

const map = [
  {
    role: "Эксперт-практик",
    avatar: "/avatar-practitioner.webp",
    state: "Ведёте консультации, работаете руками, продаёте своё время",
    products: "разовые консультации 3–10 тыс. р, диагностические сессии, курсы, интенсивы, PDF-гайды",
  },
  {
    role: "Наставник",
    avatar: "/avatar-mentor.webp",
    state: "Работаете с клиентами 1:1 на результат, есть повторные обращения",
    products: "наставничество 1:1 на 1–3 месяца, мастер-группы до 8 человек, менторские треки",
  },
  {
    role: "Консультант",
    avatar: "/avatar-consultant.webp",
    state: "Вас приглашают как эксперта в чужие проекты и бизнесы",
    products: "стратегические сессии, аудиты, трекинг, проектное сопровождение, корпоративные программы",
  },
  {
    role: "Предприниматель",
    avatar: "/avatar-entrepreneur.webp",
    state: "Строите систему, которая работает без вашего постоянного участия",
    products: "клубы по подписке, мастер-группы, агентская модель, партнёрские программы, команда кураторов",
  },
  {
    role: "Визионер",
    avatar: "/avatar-visionary.webp",
    state: "Создаёте рынок, а не просто работаете на нём",
    products: "акселераторы, B2B-контракты, образовательные экосистемы, партнёрства с корпорациями, лицензирование методологии",
  },
];

const caseStories = [
  {
    name: "Диана Семёнычева",
    role: "Лингвокоуч, AI-архитектор обучения",
    result: "550 000 р",
    photo: "/cases/image3.jpg",
    points: [
      "15+ лет обучала взрослых английскому языку",
      "создала две новые продуктовые линейки",
      "запустила продажи интенсивной программы",
      "разработала концепцию профессии «Нейроэффективный языковой ментор»",
      "получила запросы на премиальную личную работу",
    ],
  },
  {
    name: "Максим Шаргородский",
    role: "Эксперт по построению отделов продаж",
    result: "1 990 000 р",
    photo: "/cases/image8.png",
    points: [
      "запустил мастер-группу по увеличению прибыли",
      "усилил вовлеченность участников",
      "выстроил более сильную продуктовую систему",
    ],
  },
  {
    name: "Дания Ткачева",
    role: "Бизнес-консультант по управлению продажами",
    result: "739 300 р с запуска курса и 2,5 млн р на групповом наставничестве",
    photo: "/cases/image6.jpg",
    points: [
      "создала флагманский курс",
      "внедрила трехуровневую тарифную систему",
      "выстроила продуктовую линейку на несколько лет вперед",
    ],
  },
  {
    name: "Светлана Дуда",
    role: "Основатель Академии глубинного коучинга",
    result: "первый поток на 1,1 млн р",
    photo: "/cases/image10.jpg",
    points: [
      "упаковала авторскую методологию",
      "создала систему подготовки менторов",
      "разработала новый курс по собственному методу",
      "запустила новое образовательное направление",
    ],
  },
  {
    name: "Вадим Алиев",
    role: "Руководитель агентства «КурсМастер»",
    result: "система продуктов вокруг курса‑наставничества",
    photo: "/cases/image5.png",
    points: [
      "создал авторский курс по подготовке методологов",
      "разработал курс-наставничество",
      "собрал систему продуктов вокруг него",
    ],
  },
  {
    name: "Мария Новаторова",
    role: "Автор метода музыкально-сенсорной терапии",
    result: "650 000 р",
    photo: "/cases/image7.jpg",
    points: [
      "построила продуктовую лестницу",
      "трипваер, флагман, вторая ступень",
      "выстроила систему продаж и команду",
    ],
  },
  {
    name: "Алиса Задорожная",
    role: "Фасилитатор, экс-маркетинг-директор Яндекс Дзена",
    result: "45 участников на 1,5 млн р",
    photo: "/cases/image1.jpg",
    points: [
      "полностью пересобрала флагман",
      "внедрила новую структуру обучения",
      "усилила практику, домашние задания и геймификацию",
      "сформировала основу продуктовой линейки",
    ],
  },
  {
    name: "Ана Атман",
    role: "Основатель школы «Открытая Жизнь»",
    result: "300 000 р",
    photo: "/cases/image2.jpg",
    points: [
      "пересобрала продуктовую линейку",
      "запустила премиальный формат индивидуального сопровождения",
      "создала систему удержания клиентов внутри образовательной экосистемы",
    ],
  },
  {
    name: "Наталья Коваленко",
    role: "Психолог, коуч, автор трансформационных программ",
    result: "доход вырос в 2 раза за месяц",
    photo: "/cases/image4.jpg",
    points: [
      "создала новый авторский курс",
      "определила его как будущий флагман онлайн-школы",
      "подготовила запуск собственной образовательной платформы",
    ],
  },
  {
    name: "Константин Воробьев",
    role: "Тренер по плаванию, основатель сети клубов по обучению взрослых плаванию",
    result: "1 990 000 р",
    photo: "/константин_воробьев.jpg",
    points: [
      "разработан курс «Сила Воды» по онлайн-обучению взрослых плаванию",
      "проведен тестовый запуск с фокус-группой",
      "на запуске программы удалось заработать 1 990 000 р",
    ],
  },
];

const tariffs = [
  {
    name: "Слушатель",
    price: "0",
    oldPrice: "990",
    note: "Бесплатный формат для тех, кто хочет понять, какой продукт запускать дальше.",
    features: ["Доступ к эфиру 15 июня онлайн", "Запись на 48 часов", "Экспертный движ: 3 дня заданий в чате"],
    cta: "Зарегистрироваться бесплатно",
    widgetId: "c3dcb6887148156cd091960edd7e6154a3da24c3",
    widgetUrl: "https://agkedu.getcourse.ru/pl/lite/widget/widget?id=1614383",
  },
  {
    name: "Эксперт",
    price: "1 900",
    oldPrice: "3 900",
    note: "Для тех, кто привык принимать решения быстро и хочет начать масштабироваться прямо сейчас.",
    features: [
      "Доступ к эфиру 15 июня + запись",
      "Мастер-класс «Методология создания и запуска премиальных программ, консалтинга и агентства в реалиях 2026» — 18 июня",
      "Экспертный движ: 10 дней заданий",
      "Живые разборы ваших кейсов с Александрой в прямом эфире",
    ],
    cta: "Хочу на мастер-класс",
    widgetId: "7883e0043ed989dc88fe453567ec7b7e16f2c8e1",
    widgetUrl: "https://agkedu.getcourse.ru/pl/lite/widget/widget?id=1614463",
  },
];

const contactLinks = [
  { label: "+7 (989) 542-15-60", href: "tel:+79895421560", icon: Phone },
  { label: "Телеграм", href: "https://agkedu.getcourse.ru/tg_subscribe", icon: Send },
  { label: "Макс", href: "https://agkedu.getcourse.ru/max_subscribe", icon: MessageCircle },
  { label: "ВКонтакте", href: "https://agkedu.getcourse.ru/vk_subscribe", icon: Users },
];

const legalLinks = [
  {
    label: "Лицензия",
    href: "https://islod.obrnadzor.gov.ru/rlic/details/6009a6d6-0d6f-7d9f-197f-9f9286292347/",
  },
  { label: "Договор-оферта", href: "https://agkedu.getcourse.ru/oferta_methodology" },
  { label: "Политика конфиденциальности", href: "https://agkedu.ru/personaldata" },
];

type WidgetConfig = {
  title: string;
  widgetId: string;
  widgetUrl: string;
};

function TariffPrice({ value }: { value: string }) {
  return (
    <>
      {value}
      <span>р</span>
    </>
  );
}

function ButtonLink({
  children,
  dark = false,
  onClick,
}: {
  children: React.ReactNode;
  dark?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.a
      href="#tariffs"
      onClick={(event) => {
        if (!onClick) return;
        event.preventDefault();
        onClick();
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={dark ? "btn btn-dark" : "btn btn-wine"}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden size={18} />
    </motion.a>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const caseStageRef = useRef<HTMLDivElement | null>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [activeWidget, setActiveWidget] = useState<WidgetConfig | null>(null);
  const activeStory = caseStories[activeCase];

  const nextCase = () => setActiveCase((current) => (current + 1) % caseStories.length);
  const previousCase = () => setActiveCase((current) => (current - 1 + caseStories.length) % caseStories.length);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 0.82,
      smoothWheel: true,
      touchMultiplier: 1,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (reduceMotion) {
      return () => {
        lenis.destroy();
      };
    }

    let cleanupSplit = () => {};
    let cleanupHeroParallax = () => {};
    const cleanupCards: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const heroSplit = new SplitType(".split-title", { types: "lines" });
      const hostSplit = new SplitType(".host-copy .host-name", { types: "lines" });
      cleanupSplit = () => {
        heroSplit.revert();
        hostSplit.revert();
      };

      gsap.set([heroSplit.lines, hostSplit.lines], { overflow: "hidden" });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        if (el.closest(".hero, .host-section, .product-map, .pain-grid, .cases-section")) return;
        gsap.fromTo(
          el,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%" },
          },
        );
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-eyebrow", { y: 22, opacity: 0, duration: 0.55 })
        .from(heroSplit.lines, { yPercent: 115, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.18")
        .from(".hero-lead", { y: 24, opacity: 0, duration: 0.7 }, "-=0.25")
        .from(".hero-actions > *", { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.22")
        .from(".registration-bonus", { y: 20, opacity: 0, scale: 0.96, duration: 0.62 }, "-=0.18")
        .from(".bonus-media", { rotate: -4, scale: 0.9, opacity: 0, duration: 0.62 }, "-=0.46")
        .from(".hero-visual", { clipPath: "inset(0 0 0 74%)", opacity: 0, scale: 0.98, duration: 1.05 }, "-=0.52")
        .from(".hero-year", { y: 26, opacity: 0, duration: 0.55 }, "-=0.28")
        .from(".hero-line", { scaleX: 0, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.34");

      gsap.to(".bonus-media", {
        y: -5,
        rotate: 1.5,
        duration: 3.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-art", {
        yPercent: 8,
        scale: 1.035,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      const heroVisual = heroVisualRef.current;
      if (heroVisual) {
        const heroArt = heroVisual.querySelector(".hero-art");
        const year = heroVisual.querySelector(".hero-year");
        const move = (event: MouseEvent) => {
          const rect = heroVisual.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          gsap.to(heroArt, { x: x * 10, y: y * 8, duration: 0.8, ease: "power3.out" });
          gsap.to(year, { x: x * 14, y: y * 18, duration: 0.8, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to([heroArt, year], { x: 0, y: 0, duration: 0.8, ease: "power3.out" });
        };
        heroVisual.addEventListener("mousemove", move);
        heroVisual.addEventListener("mouseleave", leave);
        cleanupHeroParallax = () => {
          heroVisual.removeEventListener("mousemove", move);
          heroVisual.removeEventListener("mouseleave", leave);
        };
      }

      gsap.from(".pain-head > *", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pain-grid", start: "top 76%" },
      });

      const painCards = gsap.utils.toArray<HTMLElement>(".pain-card");
      if (window.matchMedia("(min-width: 981px)").matches) {
        gsap.fromTo(
          painCards,
          {
            x: (index) => [-32, 18, 34, -18, 28, -26][index] ?? 0,
            y: (index) => [24, -18, 30, -12, 22, -24][index] ?? 0,
            rotation: (index) => [-4, 2.5, 4, -2.8, 3.2, -3.5][index] ?? 0,
            opacity: 0,
            scale: 0.94,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            stagger: 0.035,
            scrollTrigger: {
              trigger: ".pain-list",
              start: "top 78%",
              end: "center 48%",
              scrub: 0.8,
            },
          },
        );
      } else {
        gsap.from(painCards, {
          y: 34,
          opacity: 0,
          scale: 0.96,
          stagger: 0.08,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pain-list", start: "top 78%" },
        });
      }

      gsap.from(".pain-action", {
        y: 22,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pain-action", start: "top 88%" },
      });

      gsap.from(".product-map .section-head", {
        y: 42,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".product-map", start: "top 76%" },
      });

      if (window.matchMedia("(min-width: 981px)").matches) {
        const mapCards = gsap.utils.toArray<HTMLElement>(".map-card");
        gsap.set(mapCards, {
          xPercent: (index) => [220, 108, 0, -108, -220][index] ?? 0,
          y: (index) => [28, 10, 0, 10, 28][index] ?? 0,
          rotation: (index) => [-13, -6, 0, 6, 13][index] ?? 0,
          scale: (index) => (index === 2 ? 0.98 : 0.92),
          zIndex: (index) => 20 - Math.abs(index - 2),
          transformOrigin: "50% 92%",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: ".product-map",
            start: "top top",
            end: "+=560",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
          },
        }).to(mapCards, {
          xPercent: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          stagger: 0.02,
          ease: "power2.inOut",
        });
      } else {
        gsap.from(".map-card", {
          y: 36,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".product-map", start: "top 72%" },
        });
      }

      gsap.fromTo(
        ".host-portrait",
        { clipPath: "inset(0 86% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".host-section", start: "top 70%" },
        },
      );
      gsap.fromTo(
        ".host-portrait img",
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".host-section", start: "top 70%" },
        },
      );
      gsap.from(".host-copy .host-section-title", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: ".host-section", start: "top 68%" },
      });
      gsap.from(hostSplit.lines, {
        yPercent: 115,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ".host-section", start: "top 66%" },
      });
      gsap.from(".host-copy p", {
        y: 22,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".host-section", start: "top 62%" },
      });
      gsap.from(".host-facts span", {
        y: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: ".host-section", start: "top 58%" },
      });
      gsap.to(".host-portrait img", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: ".host-section", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".host-facts", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: ".host-section", start: "top bottom", end: "bottom top", scrub: true },
      });

      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!canHover) return;

      gsap.utils.toArray<HTMLElement>(".card-motion").forEach((card) => {
        const lift = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3.out" });
        const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.35, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.35, ease: "power3.out" });
        const scale = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power3.out" });
        const isMapCard = card.classList.contains("map-card");
        const isPainCard = card.classList.contains("pain-card");

        const move = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          lift(-8);
          rotateX(y * -4);
          rotateY(x * 5);
          if (isMapCard) scale(1.03);
          if (isPainCard) scale(1.02);
        };

        const leave = () => {
          lift(0);
          rotateX(0);
          rotateY(0);
          if (isMapCard || isPainCard) scale(1);
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanupCards.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }, rootRef);

    return () => {
      cleanupHeroParallax();
      cleanupCards.forEach((cleanup) => cleanup());
      ctx.revert();
      cleanupSplit();
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const el = caseStageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".case-animate",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.58, stagger: 0.045, ease: "power3.out" },
      );
      gsap.fromTo(
        ".case-visual",
        { clipPath: "inset(0 0 0 96%)", scale: 1.03 },
        { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 0.78, ease: "power3.out" },
      );
    }, el);

    return () => ctx.revert();
  }, [activeCase]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".cases-title > *", {
        y: 30,
        opacity: 0,
        duration: 0.72,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cases-section", start: "top 76%" },
      });
      gsap.from(".case-list-item", {
        x: -24,
        opacity: 0,
        duration: 0.62,
        stagger: 0.035,
        ease: "power3.out",
        scrollTrigger: { trigger: ".case-showcase", start: "top 72%" },
      });
      gsap.from(".case-showcase-panel", {
        y: 42,
        opacity: 0,
        duration: 0.86,
        ease: "power3.out",
        scrollTrigger: { trigger: ".case-showcase", start: "top 72%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <CalendarDays size={17} />
            <span>Бесплатная онлайн-встреча</span>
            <strong>15 июня · 18:30 мск</strong>
          </div>
          <h1 className="split-title">
            Что запускать эксперту и предпринимателю <span className="nowrap">в 2026 году</span>, когда охваты больше не работают
          </h1>
          <p className="hero-lead reveal">
            Разберём продукты для масштабирования — без ежедневного ведения соцсетей и зависимости от запусков
          </p>
          <div className="hero-actions">
            <ButtonLink>Принять участие</ButtonLink>
          </div>
          <div className="registration-bonus reveal">
            <div className="bonus-media">
              <Image src="/hero-bonus.jpg" alt="Бонус за регистрацию" width={92} height={124} />
            </div>
            <p>
              За регистрацию вы получаете бонус: «25 идей <span className="nowrap">для премиального продукта</span>»
            </p>
          </div>
        </div>
        <div className="hero-visual" ref={heroVisualRef} aria-label="Фото Александры Горевой-Куртышевой">
          <div className="hero-year" aria-hidden>2026</div>
          <div className="hero-line hero-line-top" aria-hidden />
          <div className="hero-line hero-line-bottom" aria-hidden />
          <Image
            className="hero-art"
            src="/hero-expert.jpg"
            alt="Портрет Александры Горевой-Куртышевой"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="section pain-grid" id="for-whom">
        <div className="pain-head">
          <h2>Узнаёте себя?</h2>
        </div>
        <div className="pain-list">
          {pains.map((pain, index) => (
            <article className="pain-card card-motion" key={pain}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{pain}</p>
            </article>
          ))}
        </div>
        <div className="pain-action">
          <p>Если совпали хотя бы два пункта — встреча для вас</p>
          <ButtonLink dark>Зарегистрироваться</ButtonLink>
        </div>
      </section>

      <section className="section agenda-section" id="agenda">
        <div className="section-head full-head reveal">
          <h2>ЧТО ОБСУДИМ НА ВСТРЕЧЕ</h2>
        </div>
        <div className="agenda-list">
          {agenda.map((item, index) => (
            <article className="agenda-item reveal card-motion" key={item.title}>
              <div>{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="agenda-action reveal">
          <ButtonLink>Зарегистрироваться</ButtonLink>
        </div>
      </section>

      <section className="section product-map" id="map">
        <div className="section-head full-head reveal">
          <h2>КТО ВЫ СЕЙЧАС И КАКИЕ ПРОДУКТЫ ВАМ ПОДХОДЯТ</h2>
        </div>
        <div className="map-window reveal">
          <div className="map-rail">
            {map.map((item) => (
              <article className="map-card card-motion" key={item.role}>
                <div className="map-avatar" aria-hidden>
                  <Image
                    src={item.avatar}
                    alt=""
                    fill
                    sizes="42px"
                  />
                </div>
                <h3>{item.role.toUpperCase()}</h3>
                <p>{item.state}</p>
                <div className="map-products">
                  <small>Подходящие продукты</small>
                  <strong>{item.products}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cases-section">
        <div className="section-head full-head cases-title">
          <h2>У них получилось…</h2>
        </div>
        <div className="case-showcase-meta">
          <span>{String(activeCase + 1).padStart(2, "0")} / {String(caseStories.length).padStart(2, "0")}</span>
          <div className="case-active-line">
            <i style={{ width: `${((activeCase + 1) / caseStories.length) * 100}%` }} />
          </div>
        </div>
        <div className="case-showcase" ref={caseStageRef}>
          <div className="case-showcase-panel">
            <div className="case-copy">
              <p className="case-role case-animate">{activeStory.role}</p>
              <h3 className="case-animate">{activeStory.name}</h3>
              <ul className="case-points case-animate">
                {activeStory.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="case-result case-animate">
                <small>Результат</small>
                <strong>{activeStory.result}</strong>
              </div>
              <div className="case-controls case-animate" aria-label="Управление кейсами">
                <button type="button" onClick={previousCase} aria-label="Предыдущий кейс">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={nextCase} aria-label="Следующий кейс">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="case-visual">
              <Image
                key={activeStory.photo}
                src={activeStory.photo}
                alt={activeStory.name}
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section tariffs-section" id="tariffs">
        <div className="section-head full-head reveal">
          <h2>ДВА ФОРМАТА УЧАСТИЯ</h2>
        </div>
        <div className="tariff-grid">
          {tariffs.map((tariff, index) => (
            <article
              className={index === 1 ? "tariff-card featured reveal card-motion" : "tariff-card reveal card-motion"}
              key={tariff.name}
            >
              <div className="tariff-top">
                <span>{tariff.name}</span>
              </div>
              {tariff.note ? <p>{tariff.note}</p> : null}
              <ul>
                {tariff.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="tariff-price">
                {tariff.oldPrice ? <small><TariffPrice value={tariff.oldPrice} /></small> : null}
                <strong><TariffPrice value={tariff.price} /></strong>
              </div>
              <ButtonLink
                dark={index === 1}
                onClick={() =>
                  setActiveWidget({
                    title: tariff.name === "Слушатель" ? "Бесплатная регистрация" : "Оплата «Эксперт»",
                    widgetId: tariff.widgetId,
                    widgetUrl: tariff.widgetUrl,
                  })
                }
              >
                {tariff.cta}
              </ButtonLink>
            </article>
          ))}
        </div>
      </section>

      <section className="section host-section">
        <div className="host-portrait reveal">
          <Image
            src="/host-alexandra.jpg"
            alt="Александра Горева-Куртышева"
            width={832}
            height={1248}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
          <div className="portrait-frame" aria-hidden>
          </div>
        </div>
        <div className="host-copy reveal">
          <h2 className="host-section-title">КТО ВЕДЁТ ВСТРЕЧУ</h2>
          <h3 className="host-name">Александра Горева-Куртышева</h3>
          <p>EdTech-предприниматель, основатель крупнейшей школы по методологии и методического агентства.</p>
          <div className="host-facts">
            <span>С 2009 года в бизнес-обучении, с 2020 — <span className="nowrap">в онлайн-образовании</span></span>
            <span>Архитектор акселератора Бизнес 360 в Сбере</span>
            <span>40 000 участников</span>
            <span>Консультант Сбер, Роснефть, Норникель, Nestle, X5, ВкусВилл</span>
            <span>Вице-президент Ассоциации Спикеров СНГ</span>
            <span>Выпускница Сколково. Резидент Клуба Первых</span>
            <span>5 премий за вклад в образование. Победитель номинации «Лучшая школа методологии»</span>
            <span>Член попечительского совета МШУ Сколково</span>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="support-copy reveal">
          <h2 className="support-title">ОСТАЛИСЬ ВОПРОСЫ?</h2>
          <h3>Напишите нам в любой из мессенджеров</h3>
          <p>
            Выберите удобный канал: Телеграм, Макс или ВКонтакте. Ссылки можно будет подставить сразу,
            как пришлете.
          </p>
          <div className="support-actions">
            {contactLinks.slice(1).map(({ label, href, icon: Icon }) => (
              <a className="support-button" href={href} target="_blank" rel="noopener noreferrer" key={label}>
                <Icon size={20} />
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="support-visual reveal">
          <Image
            src="/botagkclub-portrait.webp"
            alt="Служба заботы клуба Александры Горевой-Куртышевой"
            width={560}
            height={996}
            sizes="(max-width: 900px) 82vw, 32vw"
          />
        </div>
      </section>

      <footer className="footer" id="contacts">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#">Академия Методологии</a>
            <p>
              Бесплатная онлайн-встреча для экспертов и предпринимателей о продуктах, которые помогают
              масштабироваться без ежедневной гонки за охватами.
            </p>
          </div>

          <div className="footer-meta">
            <h3>Данные</h3>
            <div>
              <span>Индивидуальный предприниматель</span>
              <span>Горева-Куртышева Александра Александровна</span>
              <span>ИНН: 246212538610</span>
            </div>
          </div>

          <div className="footer-column">
            <h3>Контакты</h3>
            <div className="footer-contact-grid">
              {contactLinks.map(({ label, href, icon: Icon }) => (
                <a
                  className="footer-contact"
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  key={label}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
            <nav className="footer-legal">
              {legalLinks.map((item) => (
                <a href={item.href} target="_blank" rel="noopener noreferrer" key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Академия Методологии. Все права защищены.</p>
          <div>
            <a href="https://t.me/lp_sergey" target="_blank" rel="noopener noreferrer">
              Разработка сайтов
            </a>
          </div>
        </div>
      </footer>
      {activeWidget ? (
        <div className="widget-modal" role="dialog" aria-modal="true" aria-label={activeWidget.title}>
          <button className="widget-backdrop" type="button" aria-label="Закрыть форму" onClick={() => setActiveWidget(null)} />
          <div className="widget-dialog">
            <div className="widget-head">
              <h2>{activeWidget.title}</h2>
              <button type="button" onClick={() => setActiveWidget(null)} aria-label="Закрыть форму">
                ×
              </button>
            </div>
            <iframe
              className="widget-frame"
              key={activeWidget.widgetId}
              src={activeWidget.widgetUrl}
              title={activeWidget.title}
              loading="eager"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
