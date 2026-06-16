"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, MessageCircle, Phone, Send, Users } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";
import { addTrackingParamsToUrl } from "./tracking";

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
    name: "Участник",
    price: "0",
    oldPrice: "13,85",
    note: "Бесплатный формат для тех, кто хочет получить запись эфира и собрать основу премиального продукта.",
    features: [
      "Запись эфира на 48 часов",
      (
        <span className="line-stack">
          <span>3 дня заданий в экспертном чате</span>
          <span>по построению премиального продукта</span>
        </span>
      ),
      "Бонус: «25 идей для премиального продукта»",
    ],
    cta: "ПОЛУЧИТЬ ЗАПИСЬ",
    widgetId: "b3ba4cfef0f862e9d59a7a80195d608acede5b28",
    widgetUrl: "https://agkedu.getcourse.ru/pl/lite/widget/widget?id=1615201",
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
  {
    label: "Договор-оферта",
    href: "https://docs.google.com/document/d/1t6jZzRgC6MbYSxAhUuTf2HJbVIn9GXzp/edit?usp=sharing&ouid=112592013953206750379&rtpof=true&sd=true",
  },
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
      <span>$</span>
      {value}
    </>
  );
}

function ButtonLink({
  children,
  dark = false,
  href = "#tariffs",
  target,
  rel,
  onClick,
}: {
  children: React.ReactNode;
  dark?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={(event) => {
        if (!onClick) return;
        onClick(event);
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
  const [activeWidget, setActiveWidget] = useState<WidgetConfig | null>(null);

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
        .from(".registration-bonus", { y: 20, opacity: 0, scale: 0.96, duration: 0.62 }, "-=0.25")
        .from(".bonus-media", { rotate: -4, scale: 0.9, opacity: 0, duration: 0.62 }, "-=0.46")
        .from(".hero-actions > *", { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, "-=0.24")
        .from(".hero-lead", { y: 24, opacity: 0, duration: 0.7 }, "-=0.18")
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
      gsap.from(".host-facts > span", {
        y: 20,
        opacity: 0,
        stagger: 0.06,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: { trigger: ".host-section", start: "top 58%" },
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

        const move = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          lift(-8);
          rotateX(y * -4);
          rotateY(x * 5);
          if (isMapCard) scale(1.03);
        };

        const leave = () => {
          lift(0);
          rotateX(0);
          rotateY(0);
          if (isMapCard) scale(1);
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

  return (
    <main ref={rootRef} className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <CalendarDays size={17} />
            <span className="hero-eyebrow-text">
              <span>Запись эфира для экспертов</span>
              <span>и предпринимателей</span>
              <span>+ 3 дня заданий в экспертном чате</span>
              <span>по построению премиального продукта</span>
            </span>
          </div>
          <h1 className="split-title">
            Что запускать эксперту и предпринимателю <span className="nowrap">в 2026 году</span>, когда охваты больше не работают
          </h1>
          <div className="registration-bonus reveal">
            <div className="bonus-media">
              <Image src="/hero-bonus.jpg" alt="Бонус за регистрацию" width={116} height={148} />
            </div>
            <p>
              За регистрацию вы получаете бонус: «25 идей <span className="nowrap">для премиального продукта</span>»
            </p>
          </div>
          <div className="hero-actions">
            <ButtonLink>Забрать подарок</ButtonLink>
          </div>
          <p className="hero-lead reveal line-stack">
            <span>Разберём продукты для масштабирования —</span>
            <span>без ежедневного ведения соцсетей и зависимости от запусков</span>
          </p>
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

      <section className="section host-section">
        <div className="host-copy reveal">
          <h2 className="host-section-title">КТО ВЕДЁТ ВСТРЕЧУ</h2>
          <h3 className="host-name">Александра Горева-Куртышева</h3>
          <p className="line-stack">
            <span>EdTech-предприниматель, основатель крупнейшей школы по методологии</span>
            <span>и методического агентства.</span>
          </p>
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

      <section className="section tariffs-section" id="tariffs">
        <div className="section-head full-head reveal">
          <h2>ФОРМАТ УЧАСТИЯ</h2>
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
                {tariff.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
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
                dark
                href={tariff.widgetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  event.preventDefault();
                  setActiveWidget({
                    title: "Получить запись эфира",
                    widgetId: tariff.widgetId,
                    widgetUrl: addTrackingParamsToUrl(tariff.widgetUrl),
                  });
                }}
              >
                {tariff.cta}
              </ButtonLink>
            </article>
          ))}
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
            <p className="line-stack">
              <span>Бесплатная онлайн-встреча для экспертов и предпринимателей</span>
              <span>о продуктах, которые помогают масштабироваться без ежедневной гонки за охватами.</span>
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
            <a className="widget-open-link" href={activeWidget.widgetUrl} target="_blank" rel="noopener noreferrer">
              Открыть форму в новой вкладке
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}
