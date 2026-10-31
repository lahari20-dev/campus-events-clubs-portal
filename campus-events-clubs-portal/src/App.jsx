import { useMemo, useState } from 'react';

const events = [
  { id: 1, day: '08', month: 'NOV', title: 'Design thinking, made simple', category: 'Workshop', club: 'Design Society', time: 'Sat · 10:30 AM', place: 'Innovation Lab', color: 'lilac', icon: '✳', people: 28 },
  { id: 2, day: '10', month: 'NOV', title: 'Open mic under the stars', category: 'Culture', club: 'Theatre & Arts Club', time: 'Mon · 6:00 PM', place: 'Central Lawn', color: 'peach', icon: '♫', people: 64 },
  { id: 3, day: '12', month: 'NOV', title: 'Build your first mini app', category: 'Tech', club: 'Code Collective', time: 'Wed · 4:00 PM', place: 'Block C · Room 204', color: 'mint', icon: '⌘', people: 19 },
  { id: 4, day: '15', month: 'NOV', title: 'Sunday morning run club', category: 'Wellness', club: 'Campus Run Crew', time: 'Sat · 7:00 AM', place: 'North Gate', color: 'blue', icon: '↗', people: 32 },
];
const clubs = [
  { id: 1, title: 'Design Society', tag: 'Design · Creative', members: '120 members', icon: '✳', color: 'lilac', description: 'Make things, share ideas, and learn by doing.' },
  { id: 2, title: 'Code Collective', tag: 'Technology', members: '86 members', icon: '⌘', color: 'mint', description: 'Curious minds building useful things together.' },
  { id: 3, title: 'Theatre & Arts Club', tag: 'Arts · Culture', members: '74 members', icon: '♫', color: 'peach', description: 'A welcoming stage for every kind of creativity.' },
];
const filters = ['All events', 'Workshop', 'Tech', 'Culture', 'Wellness'];

function App() {
  const [active, setActive] = useState('Discover');
  const [filter, setFilter] = useState('All events');
  const [query, setQuery] = useState('');
  const [registered, setRegistered] = useState([]);
  const [joined, setJoined] = useState([]);
  const shownEvents = useMemo(() => events.filter((event) => {
    const matchesFilter = filter === 'All events' || event.category === filter;
    const text = `${event.title} ${event.club} ${event.place} ${event.category}`.toLowerCase();
    return matchesFilter && text.includes(query.toLowerCase());
  }), [filter, query]);
  const toggle = (list, setList, id) => setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#home" onClick={() => setActive('Discover')}><span className="brand-mark">c</span><span>campusly<span className="brand-dot">.</span></span></a>
      <div className="school-chip"><span className="school-avatar">G7</span><span><b>Group 7 Campus</b><small>Student community</small></span><span className="chevron">⌄</span></div>
      <p className="nav-label">YOUR SPACE</p>
      <nav className="nav-list" aria-label="Main navigation">
        {[['Discover','⌂'],['Events','▦'],['Clubs','◉'],['My calendar','▣']].map(([name, icon]) => <button key={name} className={`nav-item ${active === name ? 'selected' : ''}`} onClick={() => { setActive(name); if (name === 'Events') setFilter('All events'); }}><span className="nav-icon">{icon}</span>{name}{name === 'Events' && <span className="nav-count">4</span>}</button>)}
      </nav>
      <div className="sidebar-note"><span className="sparkle">✦</span><b>Good things happen<br/>when you show up.</b><p>Find your people, try something new, make campus yours.</p><button onClick={() => setActive('Events')}>Explore events <span>↗</span></button></div>
      <div className="profile-mini"><div className="profile-avatar">TT</div><div><b>Thanusree T.</b><small>Student member</small></div><button aria-label="Profile menu">···</button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="breadcrumbs">Campus <span>/</span> <b>{active}</b></div><div className="top-actions"><span className="date-pill">◷ &nbsp; Saturday, Nov 1</span><button className="notification" aria-label="Notifications">♧<i></i></button><button className="mobile-profile">TT</button></div></header>
      <div className="content">
        <section className="welcome-row"><div><p className="eyebrow">YOUR CAMPUS, YOUR COMMUNITY</p><h1>Make room for <em>something new.</em></h1><p className="subhead">Find events and people that make this place feel like yours.</p></div><div className="welcome-sticker"><span>✳</span><small>MAKE<br/>MEMORIES</small></div></section>
        <section className="hero-card"><div className="hero-copy"><span className="hero-kicker"><i></i> THIS WEEK ON CAMPUS</span><h2>More than classes.<br/><em>It’s your story.</em></h2><p>Meet a new crew, learn a new thing, or just see what happens.</p><button onClick={() => { setActive('Events'); setFilter('All events'); }}>Find your next thing <span>↗</span></button></div><div className="hero-art" aria-hidden="true"><div className="sun"></div><div className="arch arch-one"></div><div className="arch arch-two"></div><div className="person p-one">✦</div><div className="person p-two">♫</div><div className="art-note">GOOD<br/>VIBES<br/>ONLY</div><div className="ground"></div></div><span className="hero-index">01 — 04</span></section>
        <section className="stats-row"><div className="stat"><span className="stat-icon icon-peach">▦</span><div><b>24</b><small>events this month</small></div></div><div className="stat"><span className="stat-icon icon-lilac">◉</span><div><b>18</b><small>active clubs</small></div></div><div className="stat"><span className="stat-icon icon-mint">↗</span><div><b>1.2k</b><small>students showing up</small></div></div><div className="stat-message"><span>“</span><p>Your people are out there.<br/><b>Go find them.</b></p></div></section>
        <section className="section-block" id="events"><div className="section-heading"><div><p className="eyebrow">SAVE YOUR SPOT</p><h2>Coming up <span>✳</span></h2></div><button className="text-link" onClick={() => { setActive('Events'); setFilter('All events'); }}>View all events <span>↗</span></button></div>
          <div className="controls"><div className="filter-list">{filters.map((item) => <button key={item} className={`filter-chip ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)}>{item}</button>)}</div><label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events" aria-label="Search events"/><kbd>⌘ K</kbd></label></div>
          <div className="event-grid">{shownEvents.map((event) => <article className="event-card" key={event.id}><div className={`event-art ${event.color}`}><div className="event-date"><b>{event.day}</b><span>{event.month}</span></div><span className="event-illustration">{event.icon}</span><span className="category-tag">{event.category}</span></div><div className="event-details"><p className="club-label">{event.club}</p><h3>{event.title}</h3><p className="event-meta">◷ &nbsp;{event.time}</p><p className="event-meta">⌖ &nbsp;{event.place}</p><div className="event-footer"><span><i className="attendee-dots">●●●</i> +{event.people} going</span><button className={registered.includes(event.id) ? 'registered' : ''} onClick={() => toggle(registered, setRegistered, event.id)}>{registered.includes(event.id) ? 'You’re in ✓' : 'I’m interested'} <span>↗</span></button></div></div></article>)}{shownEvents.length === 0 && <div className="empty-state">No events match that search yet. Try another filter.</div>}</div>
        </section>
        <section className="clubs-section"><div className="section-heading"><div><p className="eyebrow">YOUR KIND OF PEOPLE</p><h2>Find your crew <span>♡</span></h2></div><button className="text-link" onClick={() => setActive('Clubs')}>All clubs <span>↗</span></button></div><div className="club-grid">{clubs.map((club) => <article className="club-card" key={club.id}><div className={`club-icon ${club.color}`}>{club.icon}</div><span className="club-members">{club.members}</span><p className="club-tag">{club.tag}</p><h3>{club.title}</h3><p className="club-description">{club.description}</p><button className={`join-button ${joined.includes(club.id) ? 'joined' : ''}`} onClick={() => toggle(joined, setJoined, club.id)}>{joined.includes(club.id) ? 'Joined ✓' : 'Meet the club'} <span>↗</span></button></article>)}</div></section>
        <footer><span>campusly<span className="brand-dot">.</span></span><p>Made for students, by students. <span>✳</span></p><small>GROUP 7 · REACT PROJECT</small></footer>
      </div>
    </main>
  </div>;
}

export default App;
