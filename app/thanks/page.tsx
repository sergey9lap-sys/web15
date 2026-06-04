import { MessageCircle, Send, Users } from "lucide-react";

const chatLink = "https://t.me/+diyQQoNSVDI5ZjZi";

const supportLinks = [
  { label: "ВКонтакте", short: "VK", href: "https://agkedu.getcourse.ru/vk_subscribe", icon: Users },
  { label: "Телеграм", short: "TG", href: "https://agkedu.getcourse.ru/tg_subscribe", icon: Send },
  { label: "Макс", short: "MAX", href: "https://agkedu.getcourse.ru/max_subscribe", icon: MessageCircle },
];

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <section className="thanks-card" aria-labelledby="thanks-title">
        <div className="thanks-rule" aria-hidden />
        <p className="thanks-kicker">страница спасибо</p>
        <h1 id="thanks-title">Регистрация прошла успешно!</h1>
        <p className="thanks-lead">Присоединяйтесь к чату экспертного движа по кнопке ниже:</p>

        <a className="thanks-primary" href={chatLink} target="_blank" rel="noopener noreferrer">
          <span>Попасть в чат</span>
          <Send size={20} aria-hidden />
        </a>

        <a className="thanks-chat-link" href={chatLink} target="_blank" rel="noopener noreferrer">
          {chatLink}
        </a>

        <p className="thanks-note">
          Ссылки на эфир и все анонсы только там. Напоминание, что эфир пройдет 15 июня в 18:30 мск.
        </p>

        <div className="thanks-support">
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
