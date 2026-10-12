import { useEffect, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { ceoContact, competitors, navigation, okved, teamMembers, type PageKey } from './data'

const pageFromPath = (): PageKey => navigation.find((item) => item.path === window.location.pathname)?.key ?? 'home'

function App() {
  const [page, setPage] = useState<PageKey>(pageFromPath)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handle = () => { setPage(pageFromPath()); setMenuOpen(false); window.scrollTo(0, 0) }
    window.addEventListener('popstate', handle)
    return () => window.removeEventListener('popstate', handle)
  }, [])

  useEffect(() => {
    const current = navigation.find((item) => item.key === page)
    document.title = `${current?.label === 'Главная' ? 'Исследуйте Москву' : current?.label} — MoscowRealtime`
  }, [page])

  const go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', path)
    setPage(pageFromPath())
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return <>
    <header className="header">
      <div className="header-inner">
        <a href="/" onClick={go('/')} className="brand" aria-label="MoscowRealtime — главная">
          <BrandLogo />
          <span>Moscow<span className="brand-blue">Realtime</span></span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="sr-only">{menuOpen ? 'Закрыть меню' : 'Открыть меню'}</span><i /><i />
        </button>
        <nav id="main-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Основная навигация">
          {navigation.slice(1, 7).map((item) => <a key={item.key} href={item.path} onClick={go(item.path)} className={page === item.key ? 'nav-active' : ''}>{item.label}</a>)}
          <a href="/contacts" onClick={go('/contacts')} className="nav-contact">Связаться <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
    <main>{page === 'home' ? <Home go={go} /> : page === 'about' ? <About go={go} /> : page === 'product' ? <Product go={go} /> : page === 'team' ? <Team go={go} /> : page === 'documents' ? <Documents go={go} /> : page === 'advantages' ? <Advantages go={go} /> : page === 'partners' ? <Partners go={go} /> : <Contacts go={go} />}</main>
    <Footer go={go} />
  </>
}

type Go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => void

function BrandLogo() {
  return <img src="/moscowrealtime-logo.svg" className="brand-avatar" alt="" />
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return <section className="page-intro wrap"><p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{text}</p></section>
}

function SectionHead({ eyebrow, title, link, href, go }: { eyebrow?: string; title: string; link?: string; href?: string; go?: Go }) {
  return <div className="section-head"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2></div>{link && href && go && <a className="text-link" href={href} onClick={go(href)}>{link}<span>↗</span></a>}</div>
}

function Home({ go }: { go: Go }) {
  return <>
    <section className="hero wrap">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" />Цифровой туризм · Москва</p>
        <h1>Город, который<br /><span>можно исследовать</span></h1>
        <p className="hero-lead">MoscowRealtime — концепция мобильного продукта, которая превращает знакомство с Москвой в интерактивное путешествие.</p>
        <div className="hero-actions"><a className="button button-primary" href="/product" onClick={go('/product')}>Открыть концепцию <span>↗</span></a><a className="button button-quiet" href="/about" onClick={go('/about')}>О компании</a></div>
        <div className="hero-note"><span className="note-icon">✳</span><span>Миссия компании<br /><b>городской туризм в новом формате</b></span></div>
      </div>
      <CityIllustration />
      <span className="hero-index">55°45′ N&nbsp;&nbsp; 37°37′ E</span>
    </section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Знакомство с городом" title="Смотреть вокруг — значит замечать больше" link="О проекте" href="/about" go={go} /><p className="section-lead">Мы создаём идею цифрового слоя над городом: маршруты, рассказы о местах и игровые задания помогают взглянуть на знакомые улицы внимательнее.</p>
      <div className="feature-grid"><Feature number="01" title="Маршруты с интересом" text="Тематические прогулки помогают открыть город в своём темпе." icon="↗" /><Feature number="02" title="Истории рядом" text="Концепция приложения раскрывает контекст городских объектов." icon="◎" /><Feature number="03" title="Исследовать активно" text="Задания и игровые механики делают прогулку участием, а не наблюдением." icon="✳" /></div>
    </div></section>
    <section className="section wrap"><SectionHead eyebrow="Путь исследователя" title="Как это работает" /><div className="steps-grid"><Step n="01" title="Выберите направление" text="Найдите маршрут или тему, которая интересна сегодня." /><Step n="02" title="Откройте место" text="Узнайте больше о достопримечательности и её истории." /><Step n="03" title="Исследуйте город" text="Проходите задания, замечайте детали и двигайтесь дальше." /></div><p className="concept-note">Сценарий описывает концепцию будущего мобильного продукта.</p></section>
    <section className="dark-band"><div className="wrap dark-band-inner"><div><p className="eyebrow eyebrow-light">Наша идея</p><h2>Не просто смотреть<br />на город. Быть в нём.</h2></div><p>Цифровые инструменты должны усиливать живое впечатление от Москвы — её истории, архитектуры и деталей, мимо которых легко пройти.</p><a className="button button-light" href="/product" onClick={go('/product')}>О продукте <span>↗</span></a></div></section>
    <section className="section wrap"><SectionHead eyebrow="Люди и идея" title="Команда, которая меняет опыт прогулки" link="Познакомиться с командой" href="/team" go={go} /><div className="founder-strip"><BrandLogo/><div><p className="founder-title">Пять учредителей, одна идея</p><p className="muted">Цифровизация городского туризма через маршруты, истории и игровые механики.</p></div><a className="arrow-round" href="/team" onClick={go('/team')} aria-label="О команде">↗</a></div></section>
    <Cta go={go} />
  </>
}

function CityIllustration() {
  return <div className="city-art" aria-label="Иллюстрация карты и архитектуры Москвы" role="img">
    <div className="art-glow" /><div className="map-card"><div className="map-top"><span className="map-chip">МОСКВА · МАРШРУТ 01</span><span className="map-menu">•••</span></div>
      <svg className="map-lines" viewBox="0 0 500 370" aria-hidden="true"><path d="M-20 258C49 221 62 286 123 243s53-93 121-61 71 112 130 69 71-42 148-89" fill="none" stroke="#d4e3ef" strokeWidth="18"/><path d="M-20 258C49 221 62 286 123 243s53-93 121-61 71 112 130 69 71-42 148-89" fill="none" stroke="#fff" strokeWidth="8"/><path d="M37 85l72 48 55-25 72 44 52-67 84 41 81-57" fill="none" stroke="#dfe9ef" strokeWidth="3"/><path d="M54 311l55-63 47-72 92 6 61 69 69-36 70 42" fill="none" stroke="#b9d4e8" strokeWidth="2" strokeDasharray="4 8"/><path d="M86 274c56-6 65-49 119-65s77 13 107 42 55 15 104-10" fill="none" stroke="#2878e5" strokeWidth="4" strokeDasharray="7 8" strokeLinecap="round"/><circle cx="86" cy="274" r="8" fill="#fff" stroke="#2878e5" strokeWidth="4"/><circle cx="416" cy="241" r="8" fill="#fff" stroke="#2878e5" strokeWidth="4"/></svg>
      <div className="map-pin"><span>⌖</span></div><div className="map-caption"><span className="caption-dot"/><span>Культурный маршрут<br /><b>Исторический центр</b></span><span className="caption-arrow">↗</span></div>
    </div>
    <div className="landmark-card"><div className="landmark-illustration"><div className="sun"/><div className="moscow-skyline"><span className="tower"/><span className="spire"/><span className="dome dome-one"/><span className="dome dome-two"/><span className="building"/><span className="building low"/></div></div><div className="landmark-meta"><span>АРХИТЕКТУРА · МОСКВА</span><b>У каждого места — своя история</b></div></div>
    <span className="art-coordinate">MOSCOW / RUSSIA</span><span className="art-star">✳</span>
  </div>
}

function Feature({ number, title, text, icon }: { number: string; title: string; text: string; icon: string }) { return <article className="feature-card"><div className="feature-top"><span>{number}</span><span className="feature-icon">{icon}</span></div><h3>{title}</h3><p>{text}</p></article> }
function Step({ n, title, text }: { n: string; title: string; text: string }) { return <article className="step"><span className="step-number">{n}</span><div className="step-line"/><h3>{title}</h3><p>{text}</p></article> }
function Cta({ go }: { go: Go }) { return <section className="cta wrap"><div className="cta-card"><div><p className="eyebrow eyebrow-light">Открыты к диалогу</p><h2>Городские истории<br />лучше создавать вместе</h2><p>Ищем точки соприкосновения с туристическими, культурными и образовательными проектами.</p></div><a className="button button-light" href="/partners" onClick={go('/partners')}>Стать партнёром <span>↗</span></a><span className="cta-orbit orbit-one"/><span className="cta-orbit orbit-two"/></div></section> }

function About({ go }: { go: Go }) {
  return <><PageIntro eyebrow="О компании" title={<>Технологии, которые<br /><span>помогают увидеть город</span></>} text="ООО «Москоу Риалтайм» работает на пересечении IT и цифрового туризма. Компания развивает сервисы, которые помогают открывать Москву через достопримечательности, маршруты и интерактивные форматы." />
    <section className="section wrap content-split"><div><p className="eyebrow">Предпринимательская идея</p><h2>Цифровизация<br />городского туризма</h2></div><div className="prose"><p>Мы рассматриваем мобильное приложение как способ связать прогулку по Москве с историей её культурных объектов. Технологии помогают замечать город, а не отвлекаться от него.</p><p>В центре идеи — самостоятельное исследование: маршруты, информация о достопримечательностях, интерактивные форматы и персональный интерес пользователя.</p><a className="text-link" href="/product" onClick={go('/product')}>Посмотреть концепцию продукта <span>↗</span></a></div></section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Миссия компании" title="Открывать Москву через живой цифровой опыт"/><div className="mission-copy"><p>Мы создаём интерактивные цифровые сервисы, которые помогают узнавать Москву через достопримечательности, маршруты, игровые квесты и современные технологии. Мы стремимся поддерживать профессиональное развитие команды, устойчивое развитие компании, создавать ценность для собственников и партнёров, популяризировать культурное наследие, активный образ жизни и интерес к столице России.</p><div className="mission-callout"><span>Наша ценность</span><b>Превращать обычную прогулку по Москве в интерактивное путешествие-квест.</b></div></div></div></section>
    <section className="section wrap"><SectionHead eyebrow="Цели и задачи" title="Развивать продукт и интерес к городу"/><div className="goal-grid"><article className="goal-card"><span>ЦЕЛИ</span><h3>Быть приложением № 1 для активного отдыха</h3><p>Популяризировать здоровый образ жизни и культурное наследие России.</p></article><article className="goal-card"><span>ЗАДАЧИ</span><h3>Расширять продукт и партнёрства</h3><p>Заключить 50 соглашений с образовательными организациями, привлечь 45 000 Premium-пользователей и добавить 500 проверенных маршрутов.</p></article><article className="goal-card"><span>ПЕРСПЕКТИВА</span><h3>Масштабировать сервис</h3><p>Достичь безубыточности за счёт Premium-подписок и B2B-контрактов, выйти на 1 млн активных пользователей в месяц, снизить стоимость привлечения на 15% и развивать персональный подбор маршрутов.</p></article></div><p className="concept-note">Количественные показатели указаны как целевые ориентиры компании.</p></section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Направления деятельности" title="Разработка, туризм, исследования и издание ПО"/><div className="okved-list">{okved.map((item) => <OkvedRow key={item.code} item={item}/>)}</div></div></section><Cta go={go}/></>
}
function OkvedRow({ item }: { item: (typeof okved)[number] }) { return <div className={`okved-row ${item.category ? 'okved-category' : ''}`}><strong>{item.code}</strong><span><b>{item.name}</b><small>{item.description}</small></span>{item.main && <em>Основной</em>}</div> }

function Product({ go }: { go: Go }) {
  return <><PageIntro eyebrow="Наш продукт · концепция" title={<>Мобильный гид,<br /><span>который вовлекает</span></>} text="Идея приложения MoscowRealtime — сделать самостоятельное знакомство с Москвой интерактивным: через маршруты, истории мест и игровые задания." />
    <section className="section product-showcase"><div className="wrap product-layout"><div className="product-copy"><p className="eyebrow">От интереса — к прогулке</p><h2>Город становится<br />пространством открытий</h2><p>Выберите направление, узнайте больше о достопримечательности и исследуйте улицы с помощью заданий. Описания концепции включают AI и распознавание объектов — эти возможности пока не реализованы.</p><div className="product-tags"><span>Маршруты</span><span>Истории мест</span><span>Квесты</span></div><a className="text-link" href="/advantages" onClick={go('/advantages')}>Сравнить подходы <span>↗</span></a></div><PhoneMockup/></div></section>
    <section className="section wrap"><div className="download-card"><div className="download-icon">↓</div><div className="download-copy"><p className="eyebrow">Мобильное приложение</p><h2>APK для Android</h2><p>Откройте страницу файла на Яндекс Диске.</p></div><a className="button button-primary" href="https://disk.yandex.ru/d/eKvhExsjv252-w" target="_blank" rel="noreferrer">Открыть ссылку <span>↗</span></a></div></section>
    <section className="section wrap"><SectionHead eyebrow="Возможности в концепции" title="Несколько способов взаимодействовать с городом"/><div className="feature-grid product-features"><Feature number="01" title="Маршруты" text="Тематические направления для самостоятельного исследования." icon="⌁"/><Feature number="02" title="Распознавание" text="Концепция визуального знакомства с объектом через камеру." icon="◎"/><Feature number="03" title="AI-описания" text="Истории о местах с учётом контекста и интересов пользователя." icon="✳"/><Feature number="04" title="Игровой сценарий" text="Задания и квесты помогают замечать городские детали." icon="◇"/></div></section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Сценарий прогулки" title="Три шага, чтобы исследовать город"/><div className="steps-grid"><Step n="01" title="Выберите тему" text="Определите маршрут или направление исследования."/><Step n="02" title="Узнайте о месте" text="Откройте сведения о достопримечательности."/><Step n="03" title="Взаимодействуйте" text="Пройдите задание и продолжайте открывать город."/></div><div className="notice"><span>i</span><p>Это информационный сайт о концепции мобильного продукта. Навигация, распознавание и генерация маршрутов здесь не выполняются.</p></div></div></section><Cta go={go}/></>
}
function PhoneMockup() { return <div className="phone-scene"><div className="phone-shadow"/><div className="phone"><div className="phone-island"/><div className="phone-status"><span>9:41</span><span>•••</span></div><div className="phone-map"><svg viewBox="0 0 280 270" aria-hidden="true"><path d="M-10 157c56-8 47-65 99-53s48 93 101 62 57-4 103-55" fill="none" stroke="#d5e5f0" strokeWidth="28"/><path d="M-10 157c56-8 47-65 99-53s48 93 101 62 57-4 103-55" fill="none" stroke="white" strokeWidth="12"/><path d="M34 192c40-25 43-57 85-64s48 18 71 34 38 3 62-11" fill="none" stroke="#2878e5" strokeWidth="4" strokeDasharray="5 7" strokeLinecap="round"/></svg><span className="phone-pin">⌖</span><span className="map-label label-a">Переулки<br/>старой Москвы</span><span className="map-label label-b">●</span></div><div className="phone-card"><span className="small-label">ВАШ МАРШРУТ</span><b>Истории в центре</b><span className="phone-card-bottom">4 места <span>⏱ 35 мин</span></span></div><div className="phone-nav"><span>⌂</span><span>⌖</span><span>☆</span><span>☰</span></div></div><div className="phone-note"><span className="note-pulse"/>Концептуальный макет экрана</div></div> }

function Team({ go }: { go: Go }) {
  return <><PageIntro eyebrow="Команда и структура" title={<>Сильная идея начинается<br /><span>с совместной работы</span></>} text="Команда объединяет управление, разработку, маркетинг и операционную поддержку. Руководители направлений отвечают за развитие сервиса и ежедневную работу компании." />
    <section className="section wrap"><SectionHead eyebrow="Руководство и команда" title="Люди и направления ответственности"/><div className="staff-grid">{teamMembers.map((member, index) => <article className="staff-card" key={member.name}><span className="person-number">{String(index + 1).padStart(2, '0')}</span><div className="staff-avatar">{member.name.split(' ').slice(0, 2).map((part) => part[0]).join('')}</div><h3>{member.name}</h3><p>{member.role}</p>{member.founder && <span className="staff-founder">Учредитель</span>}</article>)}</div></section>
    <section className="section section-soft"><div className="wrap ceo-profile"><div className="ceo-heading"><p className="eyebrow">Генеральный директор</p><h2>Александр<br/>Владимирович<br/>Скурлатов</h2><p>Соучредитель MoscowRealtime</p></div><div className="ceo-details"><blockquote>«Создавать продукт, который одновременно полезен пользователю, технологичен и способен развиваться вместе с командой».</blockquote><p>Александр Скурлатов руководит компанией и участвует в развитии продукта и команды. Его профессиональные интересы включают тестирование и качество сервиса, продуктовый дизайн, разработку на Python и интернет-маркетинг.</p><div className="ceo-links"><a href={`tel:${ceoContact.phoneLink}`}>{ceoContact.phone}</a><a href={`mailto:${ceoContact.email}`}>{ceoContact.email}</a></div></div></div></section>
    <section className="section wrap"><SectionHead eyebrow="Направления компании" title="Три направления работы"/><div className="department-grid"><article className="department-card"><span className="department-no">01 / ТЕХНОЛОГИИ</span><div className="department-symbol">⌘</div><h3>IT-направление</h3><p>Backend, Frontend, DevOps и Mobile-разработка. Развитие продукта, архитектуры и IT-инфраструктуры.</p></article><article className="department-card"><span className="department-no">02 / РАЗВИТИЕ</span><div className="department-symbol">↗</div><h3>Коммерческое направление</h3><p>Маркетинг и PR, контент и финансовые процессы. Продвижение сервиса и работа с аудиторией.</p></article><article className="department-card"><span className="department-no">03 / ПОДДЕРЖКА</span><div className="department-symbol">◇</div><h3>Хозяйственная часть</h3><p>Хозяйственное обеспечение и повседневная поддержка работы компании.</p></article></div></section>
    <section className="section wrap content-split"><div><p className="eyebrow">IT-направление</p><h2>Разработка<br/>и инфраструктура</h2></div><div className="prose"><p>IT-команда развивает архитектуру и инфраструктуру MoscowRealtime, управляет backend-, frontend-, DevOps- и mobile-разработкой, отвечает за API, интеграции, безопасность данных и резервное копирование.</p><div className="responsibility-tags"><span>Backend</span><span>Frontend</span><span>DevOps</span><span>Mobile</span></div></div></section><Cta go={go}/></>
}

function Documents({ go }: { go: Go }) {
  return <><PageIntro eyebrow="Документы и сведения" title={<>Открытая информация<br /><span>о компании</span></>} text="Основные сведения об ООО «Москоу Риалтайм», организационно-правовой форме и направлениях деятельности." />
    <section className="section wrap"><SectionHead eyebrow="Сведения об организации" title="Основное"/><div className="facts-grid"><Fact label="Наименование" value="ООО «Москоу Риалтайм»"/><Fact label="Организационно-правовая форма" value="Общество с ограниченной ответственностью"/><Fact label="Учредители" value="5 участников с равными долями"/><Fact label="Основной код ОКВЭД" value="62.01 · Разработка ПО"/></div></section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Экономическая деятельность" title="Коды ОКВЭД"/><div className="okved-list">{okved.map((item) => <OkvedRow key={item.code} item={item}/>)}</div></div></section>
    <section className="section wrap"><div className="document-card"><div className="document-icon">↗</div><div><p className="eyebrow">Учредительный документ</p><h2>Устав компании</h2><p className="muted">Документ опубликован по ссылке на Яндекс Диске.</p></div><a className="button button-primary" href="https://disk.yandex.ru/i/B9mbnEop2lqSUQ" target="_blank" rel="noreferrer">Открыть устав <span>↗</span></a></div></section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Состав документа" title="Что регулирует устав"/><div className="doc-topics">{['Общие положения', 'Цели и направления деятельности', 'Уставный капитал и доли', 'Права и обязанности участников', 'Органы управления', 'Имущество и ответственность', 'Распределение прибыли', 'Реорганизация и ликвидация'].map((text, i) => <div key={text}><span>0{i + 1}</span>{text}</div>)}</div></div></section><Cta go={go}/></>
}
function Fact({ label, value }: { label: string; value: string }) { return <div className="fact"><span>{label}</span><b>{value}</b></div> }

function Advantages({ go }: { go: Go }) {
  return <><PageIntro eyebrow="Позиционирование" title={<>Знакомые сервисы.<br /><span>Новый опыт города.</span></>} text="MoscowRealtime рассматривает городские прогулки через интерактивность и персонализацию. Сравнение показывает разные форматы и продуктовые акценты на рынке." />
    <section className="section wrap"><SectionHead eyebrow="Карта рынка" title="Каждый сервис — со своим фокусом"/><div className="competitor-grid">{competitors.map((item, index) => <article className="competitor-card" key={item.name}><div className="competitor-top"><span className="competitor-no">0{index + 1}</span><span className="external-mark">↗</span></div><h3>{item.name}</h3><p className="competitor-focus">{item.focus}</p><p>{item.detail}</p><a href={item.url} target="_blank" rel="noreferrer">Сайт сервиса <span>↗</span></a></article>)}</div></section>
    <section className="section section-soft"><div className="wrap"><SectionHead eyebrow="Подход MoscowRealtime" title="Интерактивное исследование города"/><p className="section-lead">Сервис объединяет маршруты, распознавание объектов, AI-описания, персонализацию и игровые механики вокруг опыта прогулки.</p><div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Сервис</th><th>Основной фокус</th><th>Взаимодействие</th><th>Отличительный акцент</th></tr></thead><tbody>{competitors.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.focus}</td><td>{item.detail}</td><td>{item.angle}</td></tr>)}<tr className="our-row"><th scope="row">MoscowRealtime</th><td>Городские маршруты и достопримечательности</td><td>Квесты, задания, распознавание объектов</td><td>Исследование города через AI и компьютерное зрение</td></tr></tbody></table></div><p className="concept-note">Позиционирование конкурентов и MoscowRealtime приведено для общего ознакомления.</p></div></section>
    <section className="section wrap"><SectionHead eyebrow="Принципы продукта" title="На чём строится наша идея"/><div className="principle-grid"><div><span>01</span><h3>Понятное ядро</h3><p>Сосредоточиться на исследовании города, не разрастаясь в универсальную экосистему.</p></div><div><span>02</span><h3>Больше форматов</h3><p>Дополнять информацию визуальным взаимодействием и игровым сценарием.</p></div><div><span>03</span><h3>Технологии ради опыта</h3><p>Использовать цифровые инструменты, чтобы прогулка оставалась в центре внимания.</p></div></div><a className="text-link" href="/product" onClick={go('/product')}>О концепции продукта <span>↗</span></a></section><Cta go={go}/></>
}

function Partners({ go }: { go: Go }) {
  return <><PageIntro eyebrow="Сотрудничество" title={<>Вместе открывать<br /><span>город по-новому</span></>} text="MoscowRealtime ищет возможности для диалога с проектами, которые помогают людям узнавать Москву — через культуру, образование, городской досуг и путешествия." />
    <section className="section wrap"><SectionHead eyebrow="Кому может быть интересно" title="Сотрудничество вокруг городских впечатлений"/><div className="partner-grid">{[['01', 'Туристическим агентствам', 'Интеграция цифровых городских маршрутов в туристические программы.'], ['02', 'Кафе и ресторанам', 'Тематические остановки и городские маршруты рядом с локальными местами.'], ['03', 'Образовательным организациям', 'Форматы знакомства с историей и культурой города для молодёжных и студенческих групп.'], ['04', 'Культурным площадкам', 'Совместные активности, связанные с городскими объектами и событиями.']].map(([n, title, text]) => <article className="partner-card" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div><span className="partner-arrow">↗</span></article>)}</div></section>
    <section className="section section-soft"><div className="wrap partner-promo"><div><p className="eyebrow">Идеи для совместной работы</p><h2>Цифровые маршруты.<br />Тематические события.<br />Новые истории города.</h2></div><div className="promo-side"><span className="promo-symbol">✳</span><p>Мы открыты к совместным конкурсам, городским активностям, фестивалям, образовательным программам и digital-продвижению.</p><a className="text-link" href="/contacts" onClick={go('/contacts')}>Перейти к контактам <span>↗</span></a></div></div></section>
    <Cta go={go}/></>
}

function Contacts({ go }: { go: Go }) {
  return <><PageIntro eyebrow="Контакты" title={<>Давайте обсуждать<br /><span>идеи о городе</span></>} text="Свяжитесь с генеральным директором MoscowRealtime по телефону или электронной почте. По вопросам партнёрства также можно ознакомиться с направлениями сотрудничества." />
    <section className="section wrap contact-layout"><div className="contact-main"><p className="eyebrow">Генеральный директор</p><h2>Александр Скурлатов</h2><p>Открыт к предложениям о сотрудничестве в туристической, культурной и образовательной сферах.</p><div className="contact-methods"><a href={`tel:${ceoContact.phoneLink}`}><span>Телефон</span><b>{ceoContact.phone}</b></a><a href={`mailto:${ceoContact.email}`}><span>Электронная почта</span><b>{ceoContact.email}</b></a></div><a className="button button-primary" href="/partners" onClick={go('/partners')}>Направления сотрудничества <span>↗</span></a></div><div className="contact-card"><div className="contact-card-top"><BrandLogo/><span>MOSCOW REALTIME</span></div><div className="contact-graphic"><div className="contact-ring ring-a"/><div className="contact-ring ring-b"/><div className="contact-cross">+</div><span className="contact-coord">55°45′ N</span><span className="contact-city">Moscow<br/>Realtime</span></div><a className="contact-document" href="/documents" onClick={go('/documents')}><span>Документы компании</span><b>↗</b></a></div></section><Cta go={go}/></>
}

function Footer({ go }: { go: Go }) {
  return <footer className="footer"><div className="wrap"><div className="footer-main"><div className="footer-about"><a href="/" onClick={go('/')} className="brand"><BrandLogo/><span>Moscow<span className="brand-blue">Realtime</span></span></a><p>Интерактивные цифровые сервисы для тех, кто хочет исследовать Москву внимательнее.</p></div><div className="footer-links"><span>Компания</span><a href="/about" onClick={go('/about')}>О компании</a><a href="/product" onClick={go('/product')}>Продукт</a><a href="/team" onClick={go('/team')}>Команда</a></div><div className="footer-links"><span>Информация</span><a href="/documents" onClick={go('/documents')}>Документы</a><a href="/advantages" onClick={go('/advantages')}>Позиционирование</a><a href="/partners" onClick={go('/partners')}>Сотрудничество</a></div><div className="footer-next"><a href="/contacts" onClick={go('/contacts')}>Есть идея для города?<b>↗</b></a></div></div><div className="footer-bottom"><span>© ООО «Москоу Риалтайм»</span><span>Цифровой туризм · Москва</span><a href="/" onClick={go('/')}>Наверх ↑</a></div></div></footer>
}

export default App
