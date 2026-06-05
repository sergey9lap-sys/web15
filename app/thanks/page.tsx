"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, Send, Users } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";

const chatLink = "https://t.me/+djyQQoNSVDI5ZjZi";

const supportLinks = [
  { label: "ВКонтакте", short: "VK", href: "https://agkedu.getcourse.ru/vk_subscribe", icon: Users },
  { label: "Телеграм", short: "TG", href: "https://agkedu.getcourse.ru/tg_subscribe", icon: Send },
  { label: "Макс", short: "MAX", href: "https://agkedu.getcourse.ru/max_subscribe", icon: MessageCircle },
];

export default function ThanksPage() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cleanupSplit = () => {};

    const ctx = gsap.context(() => {
      const titleSplit = new SplitType(".thanks-title", { types: "lines" });
      cleanupSplit = () => titleSplit.revert();

      gsap.set(titleSplit.lines, { overflow: "hidden" });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".thanks-kicker", { y: 18, opacity: 0, duration: 0.5 })
        .from(titleSplit.lines, { yPercent: 110, opacity: 0, duration: 0.82, stagger: 0.08 }, "-=0.08")
        .from(".thanks-lead", { y: 22, opacity: 0, duration: 0.62 }, "-=0.18")
        .from(".thanks-primary", { y: 18, opacity: 0, scale: 0.98, duration: 0.52 }, "-=0.16")
        .from(".thanks-note", { y: 18, opacity: 0, duration: 0.55 }, "-=0.08")
        .from(".thanks-support", { y: 34, opacity: 0, duration: 0.75 }, "-=0.18")
        .from(".thanks-support-actions a", { y: 18, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.35");
    }, pageRef);

    return () => {
      ctx.revert();
      cleanupSplit();
    };
  }, []);

  return (
    <main className="thanks-page" ref={pageRef}>
      <section className="thanks-hero" aria-labelledby="thanks-title">
        <div className="thanks-copy">
          <p className="thanks-kicker">страница спасибо</p>
          <h1 className="thanks-title" id="thanks-title">Регистрация прошла успешно!</h1>
          <p className="thanks-lead">Присоединяйтесь к чату экспертного движа по кнопке ниже:</p>

          <a className="thanks-primary" href={chatLink} target="_blank" rel="noopener noreferrer">
            <span>Попасть в чат</span>
            <Send size={20} aria-hidden />
          </a>

          <p className="thanks-note">
            Ссылки на эфир и все анонсы только там. Напоминаем, что эфир пройдет 15 июня в 18:30 мск.
          </p>
        </div>
      </section>

      <section className="thanks-support">
        <div>
          <p>По всем вопросам обращайтесь в службу заботы</p>
          <div className="thanks-support-actions">
            {supportLinks.map(({ label, short, href, icon: Icon }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" key={label}>
                <Icon size={19} aria-hidden />
                <span>{short}</span>
                <small>{label}</small>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
